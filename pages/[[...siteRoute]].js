import { updateSite } from "/components/DataProvider";
import { useRouter } from "next/router";
import EditView from "../components/editor/EditView";
import Omnibar from "../components/Omnibar";

function Store(props) {
  const router = useRouter();
  const siteDataJson = props.data[0] || {};
  const currentPath = props.sitePath;

    return (
        <main className="flex w-full min-h-screen flex-1 flex-col text-center">
          <Omnibar siteData={siteDataJson} currentPath={currentPath}/>

          <EditView siteData={siteDataJson} currentPath={currentPath} />
        </main>
    );
  }
  
  // This gets called on every request
  const apiEndpoint = 'http://127.0.0.1:3000';

  export async function getStaticProps({ params, preview, previewData }) {  
    var sitePath = params["siteRoute"] || [];
    if(sitePath.length == 0) {sitePath[0] = 'index'}
    if(sitePath.length <= 1) {sitePath[1] = 'index'}
    var siteName = sitePath.join('/');
  
    const fetchRes = await fetch(
        apiEndpoint + `/api/item-public?name=${siteName}`,
    );
    const data = await fetchRes.json();
    data.preload = true; // set this flag so we know the data is preloaded

    return { 
      props: { 
        sitePath: siteName, data: data.data ? data.data : [] 
      },
      revalidate: 10 
    };
  }

  export async function getStaticPaths() {
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    const pages = [];
  
    // Get the paths we want to pre-render based on posts
    const paths = pages.map((page) => ({
      params: { id: page.id },
    }))

    console.log("[DRAGD] BUILD LOG: appmode " + process.env.APP_MODE);
  
    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, 
      fallback: process.env.APP_ENV === 'static' ? false: 'blocking', 
    }
  }
  
  export default Store;