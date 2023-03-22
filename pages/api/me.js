import { withSessionRoute } from '/util/auth'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
 
const handler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      res.send({ data: req.session })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withSessionRoute(handler)