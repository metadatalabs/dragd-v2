const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { execSync, spawn } = require("child_process");
const {
  getItemByName,
  getAllPendingSiteBuilds,
  updateSiteBuilds,
} = require("./pages/api/_db");
const { File, getFilesFromPath, Web3Storage } = require("web3.storage");
const Name = require("w3name");

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

const runOne = (line, env) => {
  execSync(line, { stdio: "inherit", env });
};

const changeDirectory = (dirLoc) => {
  console.log("Current directory", process.cwd());
  process.chdir(dirLoc);
  console.log("Changed directory", process.cwd());
};

const readEnvFile = (file) => {
  const filePath = path.resolve(__dirname, file);
  const envObject = {};
  const fileContents = fs.readFileSync(filePath, { encoding: "utf8" });
  const envLines = fileContents.split("\n");

  envLines.forEach((line) => {
    if (line) {
      const [key, value] = line.split("=");
      envObject[key] = value;
    }
  });

  return envObject;
};

var is_currently_building = false;

const buildAndDeployToIPFS = async (siteBuildJob) => {
  const { _id, siteName, ipns } = siteBuildJob;

  // we check for / create an IPNS name first, so the linking flow can continue on the client
  var name;

  if (!ipns) {
    // name doesn't exist, create name
    name = await Name.create();
    console.log("[IPNS] Created name: ", name.toString());
    await fs.promises.writeFile("keys/" + name.toString(), name.key.bytes);
    await updateSiteBuilds(_id, {
      ipns: name.toString(),
    });
  } else {
    console.log("[IPNS] Reading name: ", ipns);
    const bytes = await fs.promises.readFile("keys/" + ipns);
    name = await Name.from(bytes);
    console.log("[IPNS] Read name from file: ", name.toString());
  }

  const env = {
    ...process.env,
    ...readEnvFile(".env.local"),
    BASE_SITE: siteName.toString(),
  };

  // Run the build commands
  runOne("npm run build-static", env);
  runOne("npm run export", env);

  const files = await getFilesFromPath("./out");

  const client = new Web3Storage({ token: env.WEB3_STORAGE_KEY });
  const rootCid = await client.put(files, {
    name: siteName,
    maxRetries: 3,
    wrapWithDirectory: false,
    onRootCidReady: (cid) => {
      console.log("[IPFS]: Deployed CID", siteName, cid);
    },
  });

  var revision;
  if (!ipnsKey) {
    const value = "/ipfs/" + rootCid;
    console.log("[IPNS] creating revision: ", value, name);
    revision = await Name.v0(name, value);
    console.log("[IPNS] created revision: ", revision.toString());
  } else {
    const oldRevision = await Name.resolve(name);
    const nextValue = "/ipfs/" + rootCid;
    revision = await Name.increment(oldRevision, nextValue);
    console.log("[IPNS] updated revision: ", revision.toString());
  }

  await Name.publish(revision, name.key);
  console.log("[IPNS] published revision: ", revision.toString());

  await updateSiteBuilds(_id, {
    cid: rootCid,
    status: "deployed",
    buildCIDs: [
      ...siteBuildJob.buildCIDs,
      { cid: rootCid, timestamp: new Date() },
    ],
  });
};

// Entrypoint that allows you to build a site and generate static html/css/js artifacts
app.get("/startBuildTillDone", async (req, res) => {
  if (is_currently_building)
    return res.status(200).send(`Job already in progress`);
  is_currently_building = true;
  var sitesToBuild = await getAllPendingSiteBuilds();
  while (sitesToBuild?.length > 0) {
    await buildAndDeployToIPFS(sitesToBuild[0]);
    sitesToBuild = await getAllPendingSiteBuilds();
  }
  is_currently_building = false;
  res.status(200).send(`All jobs done.`);
});

app.listen(port, () => {
  console.log(`Builder listening at http://0.0.0.0:${port}`);
  (async () => {
    // something that would happen once on startup
  })();
});
