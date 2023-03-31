import { updateSite } from "/components/DataProvider";
import { useRouter } from "next/router";
import EditView from "../components/editor/EditView";
import Omnibar from "../components/Omnibar";
import { useContext } from "react";
import { CryptoAuthContext } from "../components/CryptoAuth";
import { getItemByName, getItemsBySiteName } from "./api/_db";

function GenericPage(props) {
  const router = useRouter();
  const { session, setSession, showAuthModal, setShowAuthModal } =
    useContext(CryptoAuthContext);

  const siteDataJson = props.data || {};
  const currentPath = props.sitePath;

  const isPageOwner = session?.address && true;
  const isDemoPage = currentPath == "index/index";

  // if user is not logged in, we dont show the omnibar or the edit view
  return (
    <main className="flex w-full min-h-screen flex-1 flex-col text-center">
      {(isPageOwner || isDemoPage) && (
        <Omnibar siteData={siteDataJson} currentPath={currentPath} />
      )}

      <EditView
        demo={isDemoPage}
        immutable={!isPageOwner}
        siteData={siteDataJson}
        currentPath={currentPath}
      />
    </main>
  );
}

export async function getStaticProps({ params, preview, previewData }) {
  const { siteRoute } = params;

  // this is the visible path, now we get the actual site name to display
  var siteName = siteRoute || [];

  if (process.env.APP_MODE == "static") {
    siteName = [process.env.BASE_SITE, ...siteName];
  }
  // eg. for https://dra.gd/ we need to get the index/index page
  if (siteName.length == 0) {
    siteName[0] = process.env.BASE_SITE;
  }
  if (siteName.length <= 1) {
    siteName[1] = "index";
  }
  siteName = siteName.join("/");

  var data;
  try {
    const fetchRes = await getItemByName(`${siteName}`);
    data = fetchRes[0];
    data && (data.preload = true); // set this flag so we know the data is preloaded
  } catch (error) {}

  return {
    props: {
      sitePath: siteName,
      data: data ? data : {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const baseSite = process.env.BASE_SITE;

  const pages = await getItemsBySiteName(`${baseSite}`);

  const paths = pages.map((page) => {
    var pagePath = [];

    if (process.env.APP_MODE !== "static") {
      if (page.siteName != baseSite) pagePath.push(page.siteName);
    }

    if (page.pageName != "index") pagePath.push(page.pageName);

    // this is the visible path that we will pre-render
    return {
      params: {
        siteRoute: pagePath,
      },
    };
  });

  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths,
    fallback: process.env.APP_MODE === "static" ? false : "blocking",
  };
}

export default GenericPage;
