const Name = require("w3name");
const fs = require("fs");

async function doThings() {
  let name = await Name.create();
  const value =
    "/ipfs/bafkreiem4twkqzsq2aj4shbycd4yvoj2cx72vezicletlhi7dijjciqpui";
  let revision = await Name.v0(name, value);
  await Name.publish(revision, name.key);
  //   await fs.promises.writeFile("priv.key", name.key.bytes);

  var bytesVar = name.key.bytes;

  // later

  //   const bytes = await fs.promises.readFile("priv.key");
  name2 = await Name.from(bytesVar);
  const nextValue =
    "/ipfs/bafybeiauyddeo2axgargy56kwxirquxaxso3nobtjtjvoqu552oqciudrm";
  let revision0 = await Name.resolve(name);
  // Make a revision to the current record (increments sequence number and sets value)
  const nextRevision = await Name.increment(revision0, nextValue);

  await Name.publish(nextRevision, name2.key);
  console.log("Name:", name2.toString());
}

doThings();

