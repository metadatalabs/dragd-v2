import { CryptoAuthProvider } from '@/components/CryptoAuth'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <CryptoAuthProvider>
    <Component {...pageProps} />
  </CryptoAuthProvider>
}
