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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter amount</span>
            </label>
            <label className="input-group">
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
            </label>
          </div>
          <div className={"clabel"}>Button color</div>
          <ColorPicker
            color={elemData.style?.backgroundColor || "black"}
            onChange={(color) => {
              onLocalUpdate({
                ...{
                  style: { backgroundColor: color },
                },
              });
            }}
            onClose={() => {}}
          />
        </>,
        <StylePanelControls id={id} />,
      ]}
      tabicons={["Properties", "Style"]}
    />
  );
}
