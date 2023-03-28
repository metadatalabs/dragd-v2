import { withSessionRoute } from '/util/auth'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from './_require-auth'
 
const { File, getFilesFromPath, Web3Storage } = require('web3.storage');
const { getItem, updateItem } = require('./_db.js');


// Construct with token and endpoint
const apiToken = process.env.WEB3_STORAGE_KEY;

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
              message: 'Item does not exist',
          });
      }
  
      // Make sure authenticated user is the item owner
      if (fetchedItem[0].creatorId !== req.session.siwe?.address) {
          return res.send({
              status: 'error',
              message: "Cannot update an item that you don't own",
          });
      }
  
      const files = await getFilesFromPath('./out');

      const client = new Web3Storage({ token: apiToken });
      const rootCid = await client.put(files, {
          name: fetchedItem[0].siteName,
          maxRetries: 3,
          wrapWithDirectory: false,

        });
  
      await updateItem(fetchedItem[0]._id, {cid: rootCid});
  
      res.send({
          status: 'success',
          data: rootCid,
      });
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