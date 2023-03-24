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
  const deleteSiteSubmit = async (id) => {
    var query = deleteSite({id});
    query.then((result) => {
        // console.log(result);  

      router.push('/'+ session.address);

    }).catch((error) => {
        // setError(error.message);
    });
}

  return <div className="flex flex-row items-center">
                <GenericDropdown 
                label={<UserIcon className={"w-6 h-6 hover:bg-gray-500 p-1 rounded-full"}/>}
                children={[<div className="flex w-full" onClick={() => setModal(<PageSettingsModal siteData={siteData}
                    onComplete={()=>{setModal(null)}} />)}>Page Settings</div>,
                <div className={"w-52"} onClick={(e)=>{

                    deleteSiteSubmit(siteData._id);
                }}>Delete</div>]}
        />
        {modal}
    </div>
}