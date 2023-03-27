import { CryptoAuthProvider } from '../components/CryptoAuth'
import {QueryClientProvider} from '../components/DataProvider'
import '/styles/globals.css'
// import { Space_Grotesk } from '@next/font/google'
// const space_font = Space_Grotesk({ subsets: ['latin'] })
import '../components/dragdropeditor/App.css';

export default function App({ Component, pageProps }) {
  return <CryptoAuthProvider>
    <QueryClientProvider>
      {/* <div className={space_font.className}> */}
      <Component {...pageProps}/>
      {/* </div> */}
    </QueryClientProvider>
  </CryptoAuthProvider>
}
