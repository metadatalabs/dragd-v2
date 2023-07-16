import React, { useContext } from "react";
import SiteContext from "../siteContext";
import EditItem from "./DDEditor/EditItem";
import StylePanelControls, { TabSwitcher } from "./EditMenu/StyleControlPanel";
import Image from "next/image";
import FilePicker, { loadImageToUri } from "../helpers/ui/ImagePicker";

const imageFitModes = ["contain", "cover", "fill", "scale-down", "none"];

function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  function setImageUri(uri) {
    onLocalUpdate({ imageUri: uri });
  }
  return (
    <TabSwitcher
      tabs={[
        <>
          <FilePicker
            selected={elemData?.imageUri}
            setSelected={(dataUrl) => {
              setImageUri(dataUrl);
            }}
          />
          <button
            className="btn btn-sm"
            onClick={() => {
              onLocalUpdate({
                style: {
                  ...elemData.style,
                  objectFit:
                    imageFitModes[
                      (imageFitModes.indexOf(elemData.style?.objectFit) + 1) %
                        imageFitModes.length
                    ],
                },
              });
            }}
          >
            <p class="subtitle is-7 text-subtitle">
              {elemData.style?.objectFit}
            </p>
          </button>
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
        {!elemData.imageUri ? (
          <center>Set an image URL</center>
        ) : (
          <Image
            width={elemData.size.width}
            height={elemData.size.height}
            style={{ width: "100%", height: "100%", ...elemData.style }}
            src={elemData.imageUri}
          />
        )}
      </EditItem>
    </>
  );
}

export default DraggableImage;
