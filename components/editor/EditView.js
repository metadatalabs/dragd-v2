import React, { useState } from "react";
import { createSite, updateSite } from "../DataProvider";
import Dragdrop from "../dragdropeditor/index.tsx";
export default function EditView(props) {
  const { currentPath, immutable, demo } = props;
  const [pending, setPending] = useState(false);

  // siteData is the data that is being edited, before it is saved
  const [siteData, setSiteData] = React.useState(props.siteData || null);
  const saveSiteData = () => {
    var query;
    setPending(true);
    if (props.siteData._id == undefined) {
      var siteName = currentPath.split("/")[0];
      var pageName = currentPath.split("/")[1];
      query = createSite({
        ...siteData,
        siteName: siteName,
        pageName: pageName,
      });
    } else {
      query = updateSite(siteData._id, siteData);
    }

    query
      .then((result) => {
        // console.log(result);
        setPending(false);
      })
      .catch((error) => {
        // setError(error.message);
      });
  };

  return (
    <div>
      <Dragdrop
        key={currentPath}
        initialState={props.siteData.page || {}}
        onChangedCallback={(data) => {
          setSiteData({
            ...siteData,
            page: data,
          });
        }}
        saveCallback={(data) => {
          !immutable && saveSiteData();
        }}
        pending={pending}
        immutable={immutable && !demo}
      />
    </div>
  );
}
