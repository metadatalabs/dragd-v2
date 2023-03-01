import { CryptoAuthProvider } from '@/components/CryptoAuth'
import {QueryClientProvider} from '@/components/DataProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <CryptoAuthProvider>
    <QueryClientProvider>
      <Component {...pageProps} />
    </QueryClientProvider>
  </CryptoAuthProvider>
}
