import React, { useContext } from "react";
import SiteContext from "../siteContext";
import EditItem from "./DDEditor/EditItem";
import StylePanelControls, { TabSwitcher } from "./EditMenu/StyleControlPanel";
import Image from "next/image";
import FilePicker, { loadImageToUri } from "../helpers/ui/ImagePicker";

function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  return (
    <TabSwitcher
      tabs={[
        <>
          <div className="flex flex-col">
            <div>Image</div>

            <div className="flex flex-row justify-center">
              <FilePicker
                styleObject={elemData.style}
                onStyleObjectChange={(newStyle) => {
                  onLocalUpdate({ style: newStyle });
                }}
              />
            </div>
          </div>
        </>,
        <StylePanelControls id={id} />,
      ]}
      tabicons={["Properties", "Style"]}
    />
  );
}

function DraggableImage(props) {
  const { elemData, selected } = props;
  const siteData = useContext(SiteContext);
  const { setSelected: onSelect, onUpdateDiv: onUpdated, mode } = siteData;

  return (
    <>
      <EditItem
        elemData={elemData}
        onSelect={onSelect}
        onUpdated={onUpdated}
        selected={props.selected}
        renderPanel={PanelControls}
        mode={mode}
      >
        <Image
          width={elemData.size.width}
          height={elemData.size.height}
          style={{ width: "100%", height: "100%", ...elemData.style }}
          src={elemData.style?.image || elemData.imageUri}
        />
      </EditItem>
    </>
  );
}

export default DraggableImage;
