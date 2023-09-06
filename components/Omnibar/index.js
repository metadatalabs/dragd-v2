import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import GenericDropdown from "/components/UI/GenericDropdown";
import * as React from "react";
import { useDisconnect, useEnsName } from "wagmi";
import { CryptoAuthContext } from "../CryptoAuth";

const WalletModal = dynamic(() => import("../WalletModal"));
const LoginButton = dynamic(() => import("./LoginButton"));
const SiteList = dynamic(() => import("./SiteList"));
const TemplateModal = dynamic(() => import("./TemplateModal"));
const PageSettings = dynamic(() => import("./Settings/PageSettings"));

export default function Omnibar(props) {
  const { session } = React.useContext(CryptoAuthContext);
  const { siteData, currentPath } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const router = useRouter();

  // const isMyPage =
  const isLoggedIn = session?.address;
  React.useEffect(() => {
    setIsReady(true);
    globalThis.showTemplatePicker = () => {
      setModal(<TemplateModal site={siteData} onComplete={setModal} />);
    };

    // if (siteData && !siteData._id) globalThis.showTemplatePicker();
  }, [props?.currentPath]);
  console.log(currentPath);
  if (!isReady) return null;
  return (
    <>
      <div
        key={"omnibar-" + currentPath}
        className="navbar h-16 -mb-16 pointer-events-none"
        style={{ zIndex: 99999999 }}
      >
        <div className="flex-1" />
        {/* <a className="btn btn-ghost normal-case text-xl">dragd</a> */}

        <div className="flex-none rounded-xl gap-0.5 bg-base-100 pointer-events-auto shadow">
          {session?.address && currentPath && (
            <>
              <SiteList currentPath={currentPath} setModal={setModal} />
              {siteData?._id && <PageSettings siteData={siteData} />}
            </>
          )}
          <LoginButton />
        </div>
      </div>
      {modal}
    </>
  );
}
