import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { deleteSite } from "../DataProvider";
import { ThreeDots, UserIcon } from "../ui-helpers";
import GenericDropdown from "../UI/GenericDropdown";
import PageSettingsModal from "./PageSettingsModal";

export default function PageSettings({siteData})
{
    const { session } = useContext(CryptoAuthContext);
  const [modal, setModal] = useState(null);
  const router = useRouter();

  return <> <button className="btn btn-ghost px-2 mx-0" onClick={() => setModal(
                <PageSettingsModal 
                    siteData={siteData} 
                    onComplete={()=>{setModal(null)}} />)}
                >
            <UserIcon />
    </button>
           {modal}
    </>
}