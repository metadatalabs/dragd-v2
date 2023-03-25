// Ultron, a lite version of Edith's dragd-to-ipfs build script

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { execSync, spawn } = require('child_process');

const app = express();
const port = 8889;
app.use(cors());
app.use(express.json());

const runOne = (line) => {
    execSync(line, { stdio: 'inherit' });
};

const changeDirectory = (dirLoc) => {
    console.log('Current directory', process.cwd());
    process.chdir(dirLoc);
    console.log('Changed directory', process.cwd());
};

const runPinataCommand = (args, callback) => {
    console.log('🦄 🦄 🦄 [Pinata CLI] 🦄 🦄 🦄');

    const line = args.join(' ');

    const child = spawn('sh', ['-c', `pinata-cli ${line}`]);

    let scriptOutput = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        // console.log('stdout: ' + data);

        data = data.toString();
        scriptOutput += data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        // console.log('stderr: ' + data);

        data = data.toString();
        scriptOutput += data;
    });

    child.on('close', function (code) {
        callback(scriptOutput, code);
    });
};

const gPattern = /\ \ IpfsHash:\ \'(.*?)\',/g;

const regexExtractor = (ipfsHash) => {
    var arr = gPattern.exec(ipfsHash);
    // console.log(arr);
    return arr[1];
};

const runDragdToIpfsBuild = (siteName, elemData, callback) => {
    console.log('Logging into Pinata...');
    changeDirectory('../../scratch/dragd-lite');
    console.log('Change siteName in buildData.json, programatically...');
    const buildData = JSON.parse(
        fs.readFileSync('./buildData.json', {
            encoding: 'utf8',
            flag: 'r',
        }),
    );
    console.log('Hunk swap...');
    buildData['siteName'] = siteName;
    buildData['elemData'] = elemData;
    fs.writeFileSync('./buildData.json', JSON.stringify(buildData, null, 4));
    console.log('Purging old build...');
    runOne('rm -rf out');
    console.log('Triggering build...', buildData['siteName']);
    runOne('npm run export');
    runPinataCommand(['-u', 'out'], function (output, exitCode) {
        // console.log(output, exitCode);
        const regex = regexExtractor(output);
        console.log(regex);
        callback(regex);
    });
    changeDirectory('../../dragd-lite/utility');
};

// Entrypoint that allows you to build a site and generate static html/css/js artifacts

app.post('/runDragdLiteBuild', (req, res) => {
    // res.send('Ack!');
    // brobotPost(req.body['message']);
    runDragdToIpfsBuild(
        req.body.siteName,
        req.body.elemData,
        function (incomingRegex) {
            // Once we get the ipfs hash, we can send it back to the client
            // For downstream frontend .sol domain linking
            // https://www.npmjs.com/package/@bonfida/sns-deploy
            res.status(200).json({
                siteName: req.body.siteName,
                elemData: req.body.elemData,
                ipfsHash: incomingRegex,
            });
        },
    );
});

app.listen(port, () => {
    console.log(`Ultron listening at http://0.0.0.0:${port}`);
    // Async authentication with Pinata as soon as the server starts
    (async () => {
        runPinataCommand(
            ['-a', `${process.env.PINATA_TOKEN}`],
            function (output, exitCode) {
                console.log(output, exitCode);
            },
        );
    })();
});