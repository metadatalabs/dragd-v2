import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { updateSite, useSitesByOwner } from "../DataProvider";

export default function EditView (props) {
    const [siteData, setSiteData] = React.useState(JSON.stringify(props.siteData) || null);
    const saveSiteData = () => {
        updateSite(siteData[0]._id, JSON.parse(siteData));
    }

    return <div>
        <TopMenu />
        <textarea className={"w-60 text-sm text-gray-900 bg-gray-400 p-2 rounded-md"} rows={10} value={siteData} onChange={(e)=>{setSiteData(e.target.value)}}/>
        <button onClick={saveSiteData}>save</button>
    </div>
}

function TopMenu()
{
    return <div className={"flex flex-row w-full pt-4"}>
    <div className={"flex flex-row basis-1/5"}> 
        <a href={"/dashboard"}>
            <div className={"bg-dragd p-2 px-4 rounded-full"}>
                :)
            </div>
        </a>
    </div>
    <div className={"basis-3/5 bg-gray-500 bg-opacity-30 p-2 rounded-2xl"}>
        Header
    </div>
    <div className={"basis-1/5"}>
        
    </div>
</div>
}
