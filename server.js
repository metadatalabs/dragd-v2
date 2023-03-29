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
    if(!req.body.siteName) {
        return res.status(400).send("No Site Name Provided");
        
    }

    const sites = await getItemByName(req.body.siteName + "/index");
    if(sites.length == 0) {
        return res.status(400).send("Site Does Not Exist");
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Building Site</h1>');

    const env =  {
        ...process.env,
        ...readEnvFile('.env.local'),
        "BASE_SITE": req.body.siteName.toString(),
    }

    console.log("USING ENV=", env);
    runOne('npm run build-static', env);
    runOne('npm run export', env);

    res.write('<h1>Uploading To IPFS</h1>');

    const files = await getFilesFromPath('./out');

    const client = new Web3Storage({ token: env.WEB3_STORAGE_KEY });
    const rootCid = await client.put(files, {
        name: req.body.siteName,
        maxRetries: 3,
        wrapWithDirectory: false,
        onRootCidReady: (cid) => {
            console.log('[Deployed CID to IPFS]: ', req.body.siteName, cid);
        }
      });

    res.write(`<h1>Uploaded to IPFS, CID: </h1>${rootCid}`);

    await upsertSite(req.body.siteName, {cid: rootCid});

    res.end();
});

app.listen(port, () => {
    console.log(`Ultron listening at http://0.0.0.0:${port}`);
    (async () => {
        // something that would happen once on startup
    })();
});