import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import GenericDropdown from "/components/UI/GenericDropdown";
import * as React from "react";
import { useDisconnect, useEnsName } from "wagmi";
import { CryptoAuthContext } from "../CryptoAuth";

const WalletModal = dynamic(() => import("../WalletModal"));
const LoginButton = dynamic(() => import("./LoginButton"));
const SiteList = dynamic(() => import("./SiteList"));
const PageSettings = dynamic(() => import("./Settings/PageSettings"));

export default function Omnibar(props) {
  const { session, setSession, showAuthModal, setShowAuthModal } =
    React.useContext(CryptoAuthContext);
  const { siteData, currentPath } = props;
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: session?.address });
  const [isReady, setIsReady] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const router = useRouter();

  // const isMyPage =
  const isLoggedIn = session?.address;
  React.useEffect(() => setIsReady(true), []);
  console.log(currentPath);
  if (!isReady) return null;
  return (
    <>
      <div
        key={"omnibar-" + currentPath}
        className="navbar h-16 -mb-16 pointer-events-none"
        style={{ zIndex: 99999999 }}
      >
        <div className="flex-1">
          {/* <a className="btn btn-ghost normal-case text-xl">dragd</a> */}
        </div>

        <div className="flex-none rounded-xl gap-2 bg-base-300 pointer-events-auto">
          {/* <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered" />
        </div> */}

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
