import { useContext, useEffect, useState } from "react";
import { CryptoAuthContext } from "../../CryptoAuth";
import { deleteSite } from "../../DataProvider";
import { ThreeDots, UserIcon } from "../../ui-helpers";
import GenericDropdown from "../../UI/GenericDropdown";
import PageSettingsModal from "./PageSettingsModal";

export default function PageSettings({ siteData }) {
  const { session } = useContext(CryptoAuthContext);
  const [modal, setModal] = useState(false);

  return (
    <>
      {" "}
      <button
        className="btn btn-sm btn-ghost px-0"
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
