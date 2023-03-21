import React, { useState } from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { createSite, updateSite, useSitesByOwner } from "../DataProvider";
import Omnibar from "../Omnibar";
import Dragdrop from "../dragdropeditor/index.tsx";
export default function EditView (props) {
    const { currentPath } = props;
    const [pending, setPending] = useState(false);

    const [siteData, setSiteData] = React.useState(props.siteData || null);
    const saveSiteData = () => {
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
            // var parsed = siteData;
            // parsed = {...parsed, ...props}
            query = updateSite(siteData._id, siteData);
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
                                 setSiteData({
                                    ...siteData,
                                    page: data
                                })
                            }}
                            saveCallback={(data) => {
                                saveSiteData();
                            }}
                            pending={pending}
                            // immutable={!(auth.user?.uid == itemData?.owner)}
        />
    </div>
}
