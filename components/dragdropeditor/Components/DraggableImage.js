import React, { useState, useEffect, useContext } from "react";
import { Input } from "../helpers/helper";
import SiteContext from "../siteContext";
import EditItem from "./DDEditor/EditItem";
import StylePanelControls, { TabSwitcher } from "./EditMenu/StyleControlPanel";
import NextImage from "next/image";
import { loadImageToUri } from "../helpers/ui/FilePicker";

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
          <Prompter setImageUri={setImageUri} imageUri={elemData?.imageUri} />
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
          <NextImage
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

const Prompter = ({ imageUri, setImageUri }) => {
  // const [imageUri, setImageUri] = useState(props.imageUri);

  return (
    <>
      <center>
        <p class="title is-6 text-title">Choose or upload an image</p>
      </center>{" "}
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <input
          className="input input-bordered"
          placeholder={"Image URL"}
          value={imageUri}
          onChange={(e) => {
            setImageUri(e.target.value);
          }}
          style={{ overflow: "hidden" }}
        />
        <div style={{ width: 18 }} />
        <div className="tooltip" data-tip="Upload image">
          <button
            className={"btn btn-ghost btn-outline"}
            onClick={() => {
              loadImageToUri((dataUrl) => {
                setImageUri(dataUrl);
              });
            }}
          >
            <img className="h-6 w-11" src="https://i.imgur.com/rFn3Kjx.png" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center pt-4">
        <p
          class="subtitle is-7 text-subtitle"
          style={{ color: "#949494", marginBottom: 10 }}
        >
          Preview:
        </p>
        {imageUri ? (
          <img className="max-h-48 h-full" src={imageUri} />
        ) : (
          <center>No image selected</center>
        )}
      </div>
    </>
  );
};

export default DraggableImage;
