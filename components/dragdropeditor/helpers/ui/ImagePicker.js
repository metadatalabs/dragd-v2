import { useEffect, useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { DownChevron } from "../../../ui-helpers";
import { CloseIcon } from "../../Components/DDEditor/EditorIcons";

const modes = ["image", "color"];
const imageFitModes = ["contain", "cover", "scale-down", "fill"];

export default function FilePicker({ styleObject, onStyleObjectChange }) {
  const [selected, setSelected] = useState(false);
  const [mode, setMode] = useState(modes[0]);

  return (
    <div className="inline-block">
      <div
        onClick={() => {
          setSelected(!selected);
        }}
        tabIndex={0}
        className="flex items-center p-1 m-1 border border-primary"
        style={{
          cursor: "pointer",
        }}
      >
        <div
          className={`rounded w-4 h-4 border-2 border-primary`}
          style={{ backgroundColor: styleObject?.backgroundColor }}
        ></div>
        <DownChevron />
      </div>
      {selected && (
        <FloatingCard>
          <div
            className={""}
            style={{
              width: 220,
            }}
          >
            <div className="tabs mb-2 w-full">
              <div>
                {modes.map((m) => (
                  <a
                    className={`tab tab-lifted ${
                      mode === m ? "tab-active" : ""
                    }`}
                    onClick={() => {
                      setMode(m);
                    }}
                  >
                    {m}
                  </a>
                ))}
              </div>
              <div className={"flex border-b grow justify-end pb-1"}>
                <button
                  className="btn btn-xs btn-ghost"
                  onClick={() => {
                    setSelected(false);
                  }}
                >
                  <CloseIcon className={"w-3"} />
                </button>
              </div>
            </div>
            <div
              className="cursor-default"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              {mode === "image" && (
                <>
                  <div className="flex justify-center">
                    <input
                      value={styleObject?.image || ""}
                      placeholder="Image URL"
                      onChange={(e) => {
                        onStyleObjectChange({
                          ...styleObject,
                          image: e.target.value,
                        });
                      }}
                      className="input input-bordered input-sm w-32 mr-2"
                    ></input>
                    <button
                      className={"btn btn-square btn-sm btn-outline"}
                      onClick={() => {
                        loadImageToUri((dataUrl) => {
                          onStyleObjectChange({
                            ...styleObject,
                            image: dataUrl,
                          });
                        });
                      }}
                    >
                      <img
                        className="h-6 w-6"
                        src="https://i.imgur.com/rFn3Kjx.png"
                      />
                    </button>
                  </div>

                  {
                    <div className="flex justify-center m-2">
                      <div className="flex flex-row w-24 h-24">
                        <img
                          src={styleObject?.image}
                          className="w-full bg-base-300"
                        ></img>

                        <button
                          className="btn btn-xs btn-circle btn-ghost -ml-6"
                          onClick={() => {
                            onStyleObjectChange({
                              ...styleObject,
                              image: undefined,
                            });
                          }}
                        >
                          <CloseIcon className={"w-3"} />
                        </button>
                      </div>
                    </div>
                  }

                  <center>
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        onStyleObjectChange({
                          ...styleObject,
                          objectFit:
                            imageFitModes[
                              (imageFitModes.indexOf(styleObject?.objectFit) +
                                1) %
                                imageFitModes.length
                            ],
                        });
                      }}
                    >
                      <p class="subtitle is-7 text-subtitle">
                        {styleObject?.objectFit || "Fill"}
                      </p>
                    </button>
                  </center>
                </>
              )}
              {mode === "color" && (
                <div className={"flex flex-col items-center"}>
                  <RgbaStringColorPicker
                    color={styleObject?.backgroundColor || "black"}
                    onChange={(e) =>
                      onStyleObjectChange({
                        ...styleObject,
                        backgroundColor: e,
                      })
                    }
                  />
                  <input
                    style={{ marginTop: 5 }}
                    className="input input-sm input-bordered"
                    value={styleObject?.backgroundColor}
                    onChange={(e) =>
                      onStyleObjectChange({
                        ...styleObject,
                        backgroundColor: e.target.value,
                      })
                    }
                  ></input>
                  <button
                    className="btn btn-xs btn-ghost mt-2"
                    onClick={() => {
                      onStyleObjectChange({
                        ...styleObject,
                        backgroundColor: undefined,
                      });
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </FloatingCard>
      )}
    </div>
  );
}

export function FloatingCard({ children }) {
  const originPos = { x: 0, y: 0 };

  const [pos, setPos] = useState(originPos);
  const [clickOffset, setClickOffset] = useState(originPos);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className="flex flex-col items-center absolute border border-black bg-base-100 rounded-md shadow-lg p-2"
      style={{
        zIndex: 99999,
        // transform: "translateX(calc(-100%))",
        bottom: -pos.y,
        right: -pos.x,
        cursor: "grabbing",
      }}
      onMouseDown={(e) => {
        setDragging(true);
        // setClickOffset({ x: e.clientX - (window.innerWidth - pos.x), y: e.clientY - pos.y});
        setClickOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
      }}
      onMouseUp={(e) => {
        setDragging(false);
      }}
      onMouseMove={(e) => {
        if (dragging) {
          setPos({
            x: e.clientX - clickOffset.x,
            y: e.clientY - clickOffset.y,
          });
          // setPos({ x: window.innerWidth - (e.clientX - clickOffset.x), y: e.clientY - clickOffset.y});
        }
      }}
    >
      {children}
    </div>
  );
}

export function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    // @ts-expect-error TODO: getContext exists on canvas, investigate
    var ctx = canvas.getContext("2d");
    var dataURL;
    // @ts-expect-error TODO: naturalHeight exists on canvas, investigate
    canvas.height = this.naturalHeight;
    // @ts-expect-error TODO: naturalWidth exists on canvas, investigate
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    // @ts-expect-error TODO: toDateURL exists on canvas, investigate
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    return dataURL;
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

export async function loadImageToUri(callback) {
  // @ts-expect-error TODO: window fs access not allowed in strict
  try {
    const [file] = await window.showOpenFilePicker();
    const locFile = await file.getFile();
    console.log(locFile);
    const stream = await locFile.arrayBuffer();
    console.log(stream);
    var blob = new Blob([stream], { type: locFile.type });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    toDataURL(
      imageUrl,
      (dataUrl) => {
        console.log("converted to ", dataUrl);
        callback(dataUrl);
      },
      locFile.type
    );
  } catch (e) {}
}
