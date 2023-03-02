import { updateSite } from "@/components/DataProvider";
import EditView from "@/components/editor/EditView";

function Store(props) {
  const updateSiteSubmit = async (siteName, pageName="index") => {
    if(!siteName || !pageName) {
        // setError("Site Name and Page Name are required");
        return;
    };
    var query = updateSite({siteName: siteName, pageName: pageName});
    query.then((result) => {
        // console.log(result);
    }).catch((error) => {
        // setError(error.message);
    });
}

    return (
        <main className="flex w-full min-h-screen flex-1 flex-col px-20 text-center">
          <EditView siteData={props.data} updateSiteSubmit={updateSiteSubmit} />
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
    console.log(sitePath)
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