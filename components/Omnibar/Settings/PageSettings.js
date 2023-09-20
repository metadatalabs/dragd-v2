import { useContext, useState } from "react";
import { CryptoAuthContext } from "../../CryptoAuth";
import { deleteSite } from "../../DataProvider";
import { ThreeDots, UserIcon } from "../../ui-helpers";
import dynamic from "next/dynamic";
const PageSettingsModal = dynamic(() => import("./PageSettingsModal"));

export default function PageSettings({ siteData }) {
  const { session } = useContext(CryptoAuthContext);
  const [modal, setModal] = useState(false);

  return (
    <>
      {" "}
      <button
        className="btn btn-sm btn-ghost flex flex-row items-center justify-center"
        onClick={() => setModal(true)}
      >
        <UserIcon />
      </button>{" "}
      {modal && (
        <PageSettingsModal
          siteData={siteData}
          onComplete={() => {
            setModal(false);
          }}
        />
      )}
    </>
  );
}
