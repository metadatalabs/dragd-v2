const { useState, useEffect, useContext } = require("react");
import { Input } from "../../helpers/helper";
import ColorPicker from "../../helpers/ui/ColorPicker";
import SiteContext from "../../siteContext";
import StylePanelControls, { TabSwitcher } from "../EditMenu/StyleControlPanel";

export default function PanelControls({ id, setPanelControls = () => {} }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  return (
    <TabSwitcher
      tabs={[
        <>
          <div>
            <label className="label">
              <span className="label-text">Button Label</span>
            </label>
            <input
              type="text"
              defaultValue={elemData.label}
              onChange={(e) => {
                onLocalUpdate({ label: e.target.value });
              }}
              placeholder={"Button Label"}
              className="input input-bordered"
              key={elemData.id + "-input"}
            />
            <div className="form-control pt-3">
              <label className="label cursor-pointer justify-center">
                <span className="label-text p-2">Link</span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={elemData.variant == "function"}
                  onClick={() => {
                    if (elemData.variant == "function")
                      onLocalUpdate({ variant: "link" });
                    else onLocalUpdate({ variant: "function" });
                  }}
                />
                <span className="label-text p-2">Function</span>
              </label>
            </div>

            {elemData.variant == "function" ? (
              <>
                <label className="label">
                  <span className="label-text">Function to call</span>
                </label>
                <input
                  key={"function"}
                  type="text"
                  className="input input-bordered"
                  placeholder="functionName()"
                  value={elemData.function}
                  onChange={(e) => {
                    onLocalUpdate({ function: e.target.value });
                  }}
                ></input>
              </>
            ) : (
              <>
                <label className="label">
                  <span className="label-text">Link URL</span>
                </label>
                <input
                  key={"link"}
                  type="text"
                  className="input input-bordered"
                  value={elemData.url}
                  placeholder="https://dra.gd"
                  onChange={(e) => {
                    onLocalUpdate({ url: e.target.value });
                  }}
                ></input>
                <label className="label cursor-pointer">
                  <span className="label-text">Open in new tab</span>
                  <input type="checkbox" checked className="checkbox" />
                </label>
              </>
            )}
          </div>
        </>,
        <StylePanelControls id={id} />,
      ]}
      tabicons={["Properties", "Style"]}
    />
  );
}
