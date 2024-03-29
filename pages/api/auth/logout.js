import { withSessionRoute } from '/util/auth'
 
const handler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      req.session.destroy()
      res.send({ ok: true })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withSessionRoute(handler)