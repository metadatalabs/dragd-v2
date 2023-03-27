import { withSessionRoute } from '/util/auth'
import { SiweMessage } from 'siwe'

const handler = async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body
        const siweMessage = new SiweMessage(message)
        const verificationResult = await siweMessage.verify({signature})

        if(!verificationResult.success)
          return res.status(422).json({ message: 'Invalid signature.' })
        if (siweMessage.nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' })
 

        console.log("logging in user with walletId: ", verificationResult.data.address)
        req.session.siwe = verificationResult.data
        await req.session.save()

        res.json({ ok: true })
      } catch (_error) {
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withSessionRoute(handler);