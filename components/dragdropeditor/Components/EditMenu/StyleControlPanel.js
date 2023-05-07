import { useContext, useState } from "react";
import { SliderWithInput } from "../../helpers/helper";
import ColorPicker from "../../helpers/ui/ColorPicker";
import SiteContext from "../../siteContext";

export default function StylePanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  const ControlList = {
    Background: (
      <div className={"pl-8"}>
        <ColorPicker
          color={elemData.style?.backgroundColor || "transparent"}
          onChange={(color) => {
            onLocalUpdate({
              style: { ...elemData.style, backgroundColor: color },
            });
          }}
        />
      </div>
    ),
    Opacity: (
      <SliderWithInput
        value={elemData.style?.opacity || 1}
        onChange={(value) => {
          onLocalUpdate({ style: { ...elemData.style, opacity: value } });
        }}
        defaultValue={100}
        min={0}
        max={1}
        step={0.01}
        symbol={"%"}
      />
    ),
    Padding: (
      <SliderWithInput
        value={elemData.style?.padding || 0}
        onChange={(value) => {
          onLocalUpdate({
            style: { ...elemData.style, padding: value + "px" },
          });
        }}
        min={0}
        max={100}
        step={1}
        symbol={"px"}
      />
    ),
    Radius: (
      <SliderWithInput
        value={elemData.style?.borderRadius || 0}
        onChange={(value) => {
          onLocalUpdate({
            style: { ...elemData.style, borderRadius: value + "px" },
          });
        }}
        min={0}
        max={100}
        step={1}
        symbol={"px"}
      />
    ),
    Border: (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-sm m-1">
          Edit
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <ColorPicker
            color={elemData.style?.backgroundColor || "transparent"}
            onChange={(color) => {
              onLocalUpdate({
                style: { ...elemData.style, borderColor: `${color}` },
              });
            }}
          />
          <SliderWithInput
            value={elemData.style?.borderWidth || 0}
            onChange={(value) => {
              onLocalUpdate({
                style: { ...elemData.style, borderWidth: value + "px" },
              });
            }}
            min={0}
            max={32}
            step={1}
            symbol={"px"}
          />
          <ul>
            {["solid", "dotted", "dashed"].map((item) => {
              return (
                <li>
                  <a
                    onClick={() => {
                      onLocalUpdate({
                        style: { ...elemData.style, borderStyle: item },
                      });
                    }}
                  >
                    <div
                      className={"w-full"}
                      style={{
                        borderColor:
                          elemData.style?.borderColor || "transparent",
                        borderWidth: elemData.style?.borderWidth || 0,
                        borderStyle: item,
                        borderBottom: "none",
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    ></div>
                  </a>
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    ),
  };

  return (
    <>
      <div key={id} className={"font-semibold"}>
        Style
      </div>

      {/* backround */}
      <div>
        {Object.keys(ControlList).map((eachChild) => {
          return (
            <div
              key={id + "-" + eachChild}
              className="flex flex-row py-1 items-center"
            >
              <div className="w-2/6">{eachChild}</div>
              <div className="w-4/6">{ControlList[eachChild]}</div>
            </div>
          );
        })}
      </div>
      {/* <div>OpacityPaddingRadiusBlurBorderShadow</div> */}
    </>
  );
}

export const TabSwitcher = ({ tabs, tabicons, color = "green" }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col justify-between w-64 mb-3">
      <div className="flex flex-col max-h-full">{tabs[activeTab]}</div>
      <div className="tabs tabs-boxed justify-evenly">
        {tabs.map((tab, index) => {
          return (
            <a
              className={` tab  ${activeTab === index ? "tab-active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tabicons[index]}
            </a>
          );
        })}
      </div>
    </div>
  );
};
