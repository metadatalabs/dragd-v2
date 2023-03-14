import React, { useState } from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { createSite, updateSite, useSitesByOwner } from "../DataProvider";
import Omnibar from "../Omnibar";
import Dragdrop from "../dragdropeditor/index.tsx";
export default function EditView (props) {
    const { currentPath } = props;
    const [pending, setPending] = useState(false);

    const [siteData, setSiteData] = React.useState(JSON.stringify(props.siteData) || null);
    const saveSiteData = (data) => {
        var query;
        if(props.siteData._id == undefined)
        {
            console.log("creating new site")
            var siteName = currentPath.split("/")[0];
            var pageName = currentPath.split("/")[1];
            query = createSite({siteName: siteName, pageName: pageName});
        }
        else
        {
            console.log("updating existing site")
            var parsed = JSON.parse(siteData);
            parsed = {...parsed, ...props}
            query = updateSite(siteData._id, parsed[0]);
        }

        query.then((result) => {
            // console.log(result);
        }).catch((error) => {
            // setError(error.message);
        });
    }

    return <div className="bg-white">
        <Dragdrop 
                            initialState={props.siteData.page || {}}
                            onChangedCallback={(data) => {
                                
                            }}
                            saveCallback={(data) => {
                                console.log("saving", data)
                                onSubmit({ page: data });
                            }}
                            pending={pending}
                            // immutable={!(auth.user?.uid == itemData?.owner)}
        />
        <textarea className={"w-60 text-sm text-gray-900 bg-gray-400 p-2 rounded-md"} rows={10} value={siteData} onChange={(e)=>{setSiteData(e.target.value)}}/>
        {(siteData)}
        <button onClick={saveSiteData}>save</button> 
    </div>
}
