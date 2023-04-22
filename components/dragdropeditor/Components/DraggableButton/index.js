import React, { useContext, useEffect, useRef, useState } from "react";
import EditItem from "../DDEditor/EditItem";
import SiteContext from "../../siteContext";
import PanelControls from "./PanelControls";

function DraggableButton(props) {
  const { elemData, selected } = props;

  const siteData = useContext(SiteContext);
  const {
    setSelected: onSelect,
    onUpdateDiv: onUpdated,
    mode,
    setModal,
  } = siteData;

  return (
    <>
      <EditItem
        key={elemData.id}
        elemData={elemData}
        onSelect={onSelect}
        onUpdated={onUpdated}
        selected={props.selected}
        renderPanel={PanelControls}
        mode={mode}
      >
        {
          <button
            key={elemData.id}
            className={"btn btn-primary"}
            style={{
              width: "100%",
              height: "100%",
              fontSize: elemData.size.height / 2.2,
              fontWeight: 500,
              ...elemData.style,
            }}
            onClick={() => {
              if (mode != "edit") {
                if (elemData.variant == "function") {
                  if (elemData.function) {
                    eval(elemData.function);
                  }
                } else if (elemData.url) {
                  window.location.href = elemData.url;
                }
              }
            }}
          >
            {elemData.label}
          </button>
        }
      </EditItem>
    </>
  );
}

export default DraggableButton;
