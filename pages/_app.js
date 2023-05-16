import { CryptoAuthProvider } from "../components/CryptoAuth";
import { QueryClientProvider } from "../components/DataProvider";
import "/styles/globals.css";
// import { Space_Grotesk } from '@next/font/google'
// const space_font = Space_Grotesk({ subsets: ['latin'] })
import "../components/dragdropeditor/App.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <CryptoAuthProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-46S27RB587"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-46S27RB587');
        `}
      </Script>

      <QueryClientProvider>
        {/* <div className={space_font.className}> */}
        <Component {...pageProps} />
        {/* </div> */}
      </QueryClientProvider>
    </CryptoAuthProvider>
  );
}
