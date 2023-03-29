const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { execSync, spawn } = require('child_process');
const { upsertSite, getItemByName } = require('./pages/api/_db');
const { File, getFilesFromPath, Web3Storage } = require('web3.storage');

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

const runOne = (line, env) => {
    execSync(line, { stdio: 'inherit', env });
};

const changeDirectory = (dirLoc) => {
    console.log('Current directory', process.cwd());
    process.chdir(dirLoc);
    console.log('Changed directory', process.cwd());
};


const readEnvFile =(file) => {
    const filePath = path.resolve(__dirname, file);
    const envObject = {};
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    const envLines = fileContents.split('\n');
  
    envLines.forEach(line => {
      if (line) {
        const [key, value] = line.split('=');
        envObject[key] = value;
      }
    });
  
    return envObject;
}

// Entrypoint that allows you to build a site and generate static html/css/js artifacts
app.post('/buildSiteToIpfs', async(req, res) => {
    if (!req.body.siteName) {
        return res.status(400).send("No Site Name Provided");
      }
    
    const { siteName } = req.body;

    const sites = await getItemByName(siteName + "/index");
    if (sites.length == 0) {
        return res.status(400).send("Site Does Not Exist");
    }

    const env = {
        ...process.env,
        ...readEnvFile('.env.local'),
        "BASE_SITE": siteName.toString(),
    };

    // Run the build commands
    runOne('npm run build-static', env);
    runOne('npm run export', env);

    const files = await getFilesFromPath('./out');

    const client = new Web3Storage({ token: env.WEB3_STORAGE_KEY });
    const rootCid = await client.put(files, {
        name: siteName,
        maxRetries: 3,
        wrapWithDirectory: false,
        onRootCidReady: (cid) => {
        console.log('[Deployed CID to IPFS]: ', siteName, cid);
        }
    });

    await upsertSite(siteName, { cid: rootCid });

    res.status(200).send(`Job added to queue with id ${job.id}`);
});

app.listen(port, () => {
    console.log(`Ultron listening at http://0.0.0.0:${port}`);
    (async () => {
        // something that would happen once on startup
    })();
});