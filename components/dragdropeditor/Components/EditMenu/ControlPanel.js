import React, { useState, useContext, useEffect, useRef } from "react";
import { guidGenerator } from "../../helpers/helper";
import SiteContext from "../../siteContext";

import {
  CopyIcon,
  LayerIcon,
  LayerUpIcon,
  LayerDownIcon,
  LinkIcon,
  TrashIcon,
} from "../DDEditor/EditorIcons";

function DefaultControlPanel({
  saveElemJson,
  elemData,
  setModal,
  CustomPanel,
  onLocalUpdate,
}) {
  const { deleteItemFromList, addItemToList, setControlPanel, setSelected } =
    useContext(SiteContext);
  useEffect(() => {
    CustomPanel && setControlPanel(<CustomPanel id={elemData.id} />);
  }, []);

  const handleEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: elemData.pos.y - elemData.size?.height / 2,
          left: elemData.pos.x,
          zIndex: 99999998,
          display: "flex",
          justifyContent: "center",
          transform: `translate(-50%, calc(-100% - 10px))`,
        }}
        onClick={handleEvent}
        onMouseDown={handleEvent}
        onTouchStart={handleEvent}
      >
        <div
          className={
            "card p-1 px-2 bg-base-100 bg-base-100 outline flex flex-row space-x-2"
          }
          style={{
            position: "relative",
          }}
        >
          {[
            {
              icon: <LinkIcon />,
              tooltip: "Add Link",
              onClick: () => {
                setModal(
                  <UriInputModal
                    prefill={elemData}
                    onComplete={(data) => {
                      saveElemJson({ ...data });
                      setModal(null);
                    }}
                  />
                );
              },
            },
            {
              icon: <LayerUpIcon />,
              tooltip: "Move Front",
              onClick: () => {
                saveElemJson({ zIndex: elemData.zIndex + 1000 });
              },
            },
            {
              icon: <LayerDownIcon />,
              tooltip: "Move Back",
              onClick: () => {
                saveElemJson({ zIndex: elemData.zIndex - 1000 });
              },
            },
            {
              icon: <CopyIcon />,
              tooltip: "Clone",
              onClick: () => {
                var dupeItem = {
                  ...elemData,
                  pos: { x: elemData.pos.x + 10, y: elemData.pos.y + 10 },
                  id: guidGenerator(),
                };
                addItemToList(dupeItem);
              },
            },
            {
              icon: (
                <span style={{ color: "darkred" }}>
                  <TrashIcon />{" "}
                </span>
              ),
              tooltip: "Delete",
              onClick: () => {
                setSelected("bg");
                setControlPanel(null);
                deleteItemFromList(elemData.id);
              },
            },
          ].map(({ icon, tooltip, ...props }, id) => {
            return (
              <div key={id} class="tooltip" data-tip={tooltip}>
                <button className="btn-outline p-0 h-8" {...props}>
                  {icon}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function UriInputModal(props) {
  console.log(props);
  const [value, setValue] = useState(props.prefill.href || "https://");
  const [target, setTarget] = useState(
    props.prefill.target == "_blank" || false
  );
  return (
    <div>
      <div className="card-body p-0">
        <input
          className={"input input-bordered"}
          style={{ display: "flex", flexGrow: 1 }}
          autoFocus={true}
          defaultValue={value}
          onChange={(e) => {
            setValue(e.target.value);
            // analytics.track('editor_update_link');
          }}
        ></input>
        <div
          className="flex flex-row items-center gap-x-2 px-2 cursor-pointer"
          onClick={(e) => {
            setTarget(!target);
          }}
        >
          <input type="checkbox" checked={target && true}></input>
          Open in new tab
        </div>
        <div className="card-actions justify-between pt-4">
          <button
            className="btn btn-sm btn-outline btn-accent"
            onClick={() => {
              props.onComplete({ href: false, target: false });
            }}
          >
            Remove Link
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              props.onComplete({ href: value, target: target && "_blank" });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default DefaultControlPanel;
