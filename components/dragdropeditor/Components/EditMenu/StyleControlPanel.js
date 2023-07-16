import { useContext, useState } from "react";
import { SliderWithInput } from "../../helpers/helper";
import ColorPicker from "../../helpers/ui/ColorPicker";
import SiteContext from "../../siteContext";
import {
  IconCornerBottomRight,
  IconPadding,
  IconSquareOpacity,
} from "../DDEditor/EditorIcons";

export default function StylePanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  const ControlList = [
    {
      label: "Background",
      control: (
        <ColorPicker
          color={elemData.style?.backgroundColor || "transparent"}
          onChange={(color) => {
            onLocalUpdate({
              style: { ...elemData.style, backgroundColor: color },
            });
          }}
        />
      ),
    },
    {
      label: "Opacity",
      image: <IconSquareOpacity />,
      control: (
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
    },
    {
      label: "Padding",
      image: <IconPadding />,
      control: (
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
    },
    {
      label: "Radius",
      image: <IconCornerBottomRight />,
      control: (
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
    },
    {
      label: "Border",
      control: (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm m-1">
            Edit Border
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <ColorPicker
              color={elemData.style?.borderColor || "transparent"}
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
    },
  ];

  return (
    <>
      <div key={id} className={"font-semibold"}>
        Style
      </div>

      {/* backround */}
      <div>
        {ControlList.map((eachChild) => {
          return (
            <div
              key={id + "-" + eachChild}
              className="flex flex-row py-1 items-center"
            >
              <div className="w-1/6 text-xs">
                <div className="tooltip" data-tip={eachChild.label}>
                  {eachChild.image && eachChild.image}
                </div>
              </div>
              <div className="w-5/6">{eachChild.control}</div>
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
    <div className="flex flex-col justify-between w-64 my-2">
      <div className="flex flex-col max-h-full">{tabs[activeTab]}</div>
      <div className="tabs tabs-boxed justify-evenly">
        {tabs.map((tab, index) => {
          return (
            <a
              key={"tab-" + index}
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
