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

  export async function getServerSideProps({ req, res, query }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=2000',
    );
  
    var sitePath = query.siteRoute;
    if(sitePath.length == 1) {sitePath[1] = 'index'}
    var siteName = sitePath.join('/');
  
    const fetchRes = await fetch(
        apiEndpoint + `/api/item-public?name=${siteName}`,
    );
    const data = await fetchRes.json();
  
    data.preload = true;
    return { props: { sitePath: siteName, data: data.data ? data.data : null } };
  }
  
  export default Store;