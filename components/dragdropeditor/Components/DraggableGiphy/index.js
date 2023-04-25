import React, { useState } from "react";
import dynamic from "next/dynamic";
import EditItem from "../DDEditor/EditItem";
import PanelControls from "./PanelControls";
// const PanelControls = dynamic("./PanelControls");
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import { useAsync } from "react-async-hook";

const giphyFetch = new GiphyFetch("6s6dfi1SuYlcbne91afF4rsD1b2DFDfQ");

function DraggableGiphy(props) {
  const { elemData, onSelect, onUpdated, selected, mode } = props;
  const [gif, setGif] = useState(null);
  useAsync(async () => {
    setGif(null);
    const { data } = await giphyFetch.gif(elemData.giphyUri);
    setGif(data);
  }, [elemData.giphyUri]);
  return (
    <>
      <EditItem
        elemData={elemData}
        selected={props.selected}
        renderPanel={PanelControls}
      >
        <div
          className="w-full h-full overflow-hidden"
          style={{ ...elemData.style }}
        >
          {gif && (
            <Gif
              key={elemData.giphyUri}
              gif={gif}
              width={"100%"}
              height={"100%"}
              hideAttribution={true}
              backgroundColor={"transparent"}
            />
          )}
        </div>
      </EditItem>
    </>
  );
}
export default DraggableGiphy;
