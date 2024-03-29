import { getBlockchainNames, withSessionRoute } from "../../util/auth";
import {
  createItem,
  deleteItem,
  getItem,
  getItemByName,
  getItemsBySiteName,
  updateItem,
} from "./_db";
import requireAuth from "./_require-auth";

const handler = requireAuth(async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.query.owned == "true") {
        var connectedWallet = req.session.siwe?.address;
        const walletNames = await getBlockchainNames(connectedWallet);

        var sites = [];
        for (const name of walletNames) {
          var siteForName = await getItemsBySiteName(name);
          let hasIndex = false;
          for (const siteIndex in siteForName) {
            const site = siteForName[siteIndex];
            delete site.page;
            sites = [...sites, site];
            if (site.pageName == "index") hasIndex = true;
          }
          if (!hasIndex)
            sites = [
              { siteName: name, pageName: "index", fake: true },
              ...sites,
            ];
        }
        res.send({ data: sites });
      } else {
        var site = await getItemByName(req.query.id);
        res.send({ data: site });
      }
      break;
    case "POST":
      if (!req.body.pageName || !req.body.siteName)
        return res.send({
          status: "error",
          message: "No name provided",
        });

      var connectedWallet = req.session.siwe?.address;

      if (req.body.siteName?.includes(".eth")) {
        // case A: .eth
        const walletNames = await getBlockchainNames(connectedWallet);
        if (!walletNames.includes(req.body.siteName))
          return res.send({
            status: "error",
            message: "You don't own this name.",
          });
      } else if (req.body.siteName.startsWith("0x")) {
        // case B: wallet address
        if (req.body.siteName != connectedWallet)
          return res.send({
            status: "error",
            message: "You don't own this address.",
          });
      }

      var siteForName = await getItemByName(
        req.body.siteName + "/" + req.body.pageName
      );

      if (siteForName.length > 0)
        return res.send({
          status: "error",
          message: "This page already exists.",
        });

      var siteData = {
        ...req.body,
        creatorId: req.session.siwe.address,
        createdAt: Math.floor(Date.now() / 1000),
      };

      // get site template
      var template = await getItemByName("template");

      var site = await createItem(siteData);
      console.log("created site: ", site.pageName, "/", site.siteName);
      await res.revalidate(
        "/" + req.body.siteName + "/" + req.body.pageName + "/"
      );
      res.send({ site: site });
      break;
    case "PATCH":
      if (
        !(await getBlockchainNames(req.session.siwe.address)).includes(
          req.body.siteName
        )
      )
        return res.send({
          status: "error",
          message: "Not authorized to edit this site",
        });

      // var oldSite = await getItem(req.body._id);
      // oldSite = oldSite[0];
      var siteData = {
        ...req.body,
        // creatorId: oldSite.creatorId,
        lastUpdated: Math.floor(Date.now() / 1000),
      };

      var site = await updateItem(req.body._id, siteData);
      await res.revalidate(
        "/" + req.body.siteName + "/" + req.body.pageName + "/"
      );
      res.send({ site: site });
      break;
    case "DELETE":
      await deleteItem(req.body.id);
      res.send({ deleted: true });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default withSessionRoute(handler);
