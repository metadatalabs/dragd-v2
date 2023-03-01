import { withSessionRoute } from '@/util/auth'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { getItem, getItemByName, getItemsBySiteName } from './_db'
import requireAuth from './_require-auth'
 
const handler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      console.log("query: ", req.query)
      var site = await getItemByName(req.query.name);
      res.send({ data: site })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default handler