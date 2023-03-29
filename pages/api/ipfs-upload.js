import { withSessionRoute } from '/util/auth'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from './_require-auth'
 
const { File, getFilesFromPath, Web3Storage } = require('web3.storage');
const { getItem, updateItem, createSiteBuilds, updateSiteBuilds, getSiteBuilds } = require('./_db.js');

const buildServer = process.env.NODE_ENV == 'production' ? "http://167.71.214.59:3002" : "http://localhost:3002";
const handler = requireAuth(async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
    // res.send({ address: req.session.siwe?.address })
      const authUser = req.user;
      const body = req.body;
      const { id } = body;
  

      const fetchedItem = await getItem(id);
      if (fetchedItem.length == 0) {
          return res.send({
              status: 'error',
              message: 'Site does not exist',
          });
      }
  
      const siteToBuild = fetchedItem[0].siteName;
      const builds = await getSiteBuilds(siteToBuild);
      if(builds.length > 0 )
      {
        if(builds[0].status == 'pending')
        {
          return res.send({
            status: 'error',
            message: 'Site build already in progress',
          });
        }
      }

      const siteBuildJob = {
        siteName: siteToBuild,
        status: 'pending',
        startTime: new Date(),
        buildCIDs: (builds[0]?.buildCIDs) || [],
      }

      if(builds[0])
        await updateSiteBuilds(builds[0]._id, siteBuildJob)
      else
        await createSiteBuilds(siteBuildJob)

      res.send({
          status: 'success',
          message: 'Site build job added to queue',
      });

      // ping the build server to start the build, ideally a redis consumer would be used here
      await fetch(buildServer + '/startBuildTillDone');
      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
export default withSessionRoute(handler)


const generateRedirectFile = (redirectUrl) => {
  const files = [
    new File([`    
    <html><head>
    <meta http-equiv="refresh" content="0; url=${redirectUrl}" />
    </head><body></body></html>
    `], 'index.html'),
    // new File([buffer], 'hello.json')
  ]
  return files
}