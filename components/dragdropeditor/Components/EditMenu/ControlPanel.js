import React, { useState, useContext, useEffect, useRef } from "react";
import analytics from "../../../../util/analytics";
import {
  CopyIcon,
  guidGenerator,
  LayerDownIcon,
  LayerIcon,
  LayerUpIcon,
  LinkIcon,
  TrashIcon,
} from "../../helpers/helper";
import SiteContext from "../../siteContext";

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
                    prefill={elemData.href}
                    onComplete={(data) => {
                      saveElemJson({ href: data });
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
  const [value, setValue] = useState(props.prefill || "https://");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <input
        className={"minimal-input"}
        style={{ display: "flex", flexGrow: 1 }}
        autoFocus={true}
        defaultValue={value}
        onChange={(e) => {
          setValue(e.target.value);
          // analytics.track('editor_update_link');
        }}
      ></input>
      <button
        className={"button"}
        onClick={() => {
          props.onComplete(value);
        }}
      >
        Set
      </button>
      <div className="is-divider" data-content="OR"></div>
    </div>
  );
}

export default DefaultControlPanel;
