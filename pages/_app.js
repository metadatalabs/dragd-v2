import { CryptoAuthProvider } from "../components/CryptoAuth";
import { QueryClientProvider } from "../components/DataProvider";
import "/styles/globals.css";
// import { Space_Grotesk } from '@next/font/google'
// const space_font = Space_Grotesk({ subsets: ['latin'] })
import "../components/dragdropeditor/App.css";
import Script from "next/script";
import Head from "next/head";

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

      <Head>
        <Script type="text/javascript">
          {`window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
    smartlook('init', 'a82dfff5fa5f68490a115592a528f6635b0452e1', { region: 'eu' });`}
        </Script>
      </Head>

      <QueryClientProvider>
        {/* <div className={space_font.className}> */}
        <Component {...pageProps} />
        {/* </div> */}
      </QueryClientProvider>
    </CryptoAuthProvider>
  );
}
