import React, { useContext, useEffect, useState } from "react";
import { Input } from "../helpers/helper";

import EditItem from "./DDEditor/EditItem";
import SiteContext from "../siteContext";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"));

function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Enter a video URL</span>
        </label>
        <input
          type="text"
          placeholder={"Youtube/Twitch/Soundcloud URL"}
          value={elemData.videoUri}
          onChange={(value) => {
            onLocalUpdate({ videoUri: value });
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text-alt">
            Youtube | Twitch | Soundcloud | Vimeo
          </span>
        </label>
      </div>
    </>
  );
}

function DraggableVideo(props) {
  const { elemData } = props;

  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <>
      <EditItem
        elemData={elemData}
        selected={props.selected}
        renderPanel={PanelControls}
      >
        {!elemData.videoUri ? (
          <center>Set a video URL</center>
        ) : (
          hasWindow && (
            <ReactPlayer
              url={elemData.videoUri}
              width={elemData.size.width}
              height={elemData.size.height}
              playsinline={true}
            />
          )
        )}
      </EditItem>
    </>
  );
}

export default DraggableVideo;
