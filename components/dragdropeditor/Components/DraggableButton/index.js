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
            className={"btn btn-primary w-full h-full text-lg"}
            style={{
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
