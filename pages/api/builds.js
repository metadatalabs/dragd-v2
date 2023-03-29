import { getBlockchainNames, withSessionRoute } from '../../util/auth'
import { getSiteBuilds } from './_db'
import requireAuth from './_require-auth'

const handler = requireAuth(async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      {
        var site = await getSiteBuilds(req.query.siteName);
        res.send({ data: site })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
 
export default withSessionRoute(handler)