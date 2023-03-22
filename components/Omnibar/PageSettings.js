import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteSite } from "../DataProvider";
import { ThreeDots, UserIcon } from "../ui-helpers";
import GenericDropdown from "../UI/GenericDropdown";

export default function PageSettings({siteData})
{
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  useEffect(() => setIsReady(true), []);
  const deleteSiteSubmit = async (id) => {
    var query = deleteSite({id});
    query.then((result) => {
        // console.log(result);
    }).catch((error) => {
        // setError(error.message);
    });
}

  if (!isReady) return null;
  return <div className="flex flex-row items-center">
                    <GenericDropdown 
                CollapseButton={<UserIcon className={"w-6 h-6 hover:bg-gray-500 p-1 rounded-full"}/>}
                options={[<div className={"hover:text-red-500"} onClick={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                    deleteSiteSubmit(siteData._id);
                }}>Delete</div>]}
                />
            
    </div>
}