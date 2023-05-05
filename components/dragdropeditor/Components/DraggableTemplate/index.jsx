import React, { useState, useRef, useContext, useEffect } from "react";
import EditItem from "../DDEditor/EditItem";
import SiteContext from "../../siteContext";
import ComponentSelector from "../ComponentSelector";
import { useSiteByNamePublic } from "../../../DataProvider";

function DraggableTemplate(props) {
  const { elemData, selected } = props;

  const siteData = useContext(SiteContext);
  const {
    setSelected: onSelect,
    onUpdateDiv: onUpdated,
    mode,
    setModal,
  } = siteData;
  const { data: itemData, status: itemStatus } = useSiteByNamePublic(
    elemData.templateSiteId
  );
  const page = itemData?.data[0]?.page;
  return (
    <>
      <EditItem
        elemData={elemData}
        // onSelect={onSelect}
        onUpdated={onUpdated}
        selected={props.selected}
        // renderPanel={PanelControls}
        mode={mode}
      >
        <div style={{ transform: `translateX(${elemData.size.width / 2}px)` }}>
          {page &&
            Object.keys(page).map((key) => {
              var elem = page[key];
              return (
                elem && (
                  <ComponentSelector elem={elem} key={elem.id + "_component"} />
                )
              );
            })}
        </div>
      </EditItem>
    </>
  );
}

export default DraggableTemplate;

export function TemplateSelector(props) {
  const [value, setValue] = useState("index/index");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <input
        className={"minimal-input"}
        style={{
          display: "flex",
          flexGrow: 1,
          width: "80vw",
          maxWidth: "500px",
        }}
        autoFocus={true}
        defaultValue={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button
        className={"button"}
        onClick={() => {
          props.addItemToList({
            type: "template",
            size: {
              width: 100,
              height: 100,
            },
            templateSiteId: value,
          });
          props.close();
        }}
      >
        Add
      </button>
      <div class="is-divider" data-content="OR"></div>
    </div>
  );
}
