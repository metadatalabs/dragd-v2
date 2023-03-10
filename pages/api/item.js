import { getBlockchainNames, withSessionRoute } from '@/util/auth'
import { withIronSessionApiRoute } from 'iron-session/next'
import { createItem, deleteItem, getItem, getItemByName, getItemsBySiteName, updateItem } from './_db'
import requireAuth from './_require-auth'
import { fetchEnsName } from '@wagmi/core'

const handler = requireAuth(async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      if(req.query.owned == 'true')
      {
        var connectedWallet = req.session.siwe?.address;
        const walletNames = await getBlockchainNames(connectedWallet);
        
        var sites = []
        for (const name of walletNames) {
          var siteForName = await getItemsBySiteName(name);
          let hasIndex = false;
          for(const siteIndex in siteForName)
          {
            const site = siteForName[siteIndex];
            sites = [...sites, site];
            if(site.pageName == "index")
              hasIndex = true;
          }
          if(!hasIndex)
            sites = [{ siteName: name, pageName: "index", fake:true }, ...sites]
        }
        res.send({ data: sites })
      }
      else
      {
        var site = await getItemByName(req.query.id);
        res.send({ data: site })
      }
      break
    case 'POST':
      if(!req.body.pageName || !req.body.siteName)
      return res.send({
        status: 'error',
        message: 'No name provided',
      });

      var connectedWallet = req.session.siwe?.address;
      const walletNames = await getBlockchainNames(connectedWallet);

      if(walletNames.includes(req.body.siteName))
        null;
      else
        return res.send({
          status: 'error',
          message: "You don't own this name.",
        });

      var siteData = {
        ...req.body,
        creatorId: req.session.siwe.address,
        createdAt: Math.floor(Date.now() / 1000),
      }
      var site = await createItem(siteData);
      console.log("created site: ", site.pageName, "/", site.siteName)
      res.send({ site: site })
      break
    case 'PATCH':
      // todo enforce siteid and owner from existing site query
      var oldSite = await getItem(req.query.id);
      if(oldSite.creatorId != req.session.siwe.address)
        return res.send({
          status: 'error',
          message: 'Not authorized to edit this site',
        });

      var siteData = {
        ...req.body,
        creatorId: oldSite.creatorId,
        lastUpdated: Math.floor(Date.now() / 1000),
      }
      var site = await updateItem(req.body._id, siteData);
      res.send({ site: site })
      break;
    case 'DELETE':
      await deleteItem(req.body.id);
      res.send({ "deleted": true })
      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
 
export default withSessionRoute(handler)