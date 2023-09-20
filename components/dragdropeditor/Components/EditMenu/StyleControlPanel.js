import { useContext, useState } from "react";
import { SliderWithInput, StyleToggleButton } from "../../helpers/helper";
import ColorPicker from "../../helpers/ui/ColorPicker";
import SiteContext from "../../siteContext";
import {
  CloseIcon,
  IconCornerBottomRight,
  IconPadding,
  IconSquareOpacity,
} from "../DDEditor/EditorIcons";
import { FloatingCard } from "../../helpers/ui/ImagePicker";
import FontPicker from "../../helpers/ui/FontPicker";
import FontStyle from "../../helpers/ui/FontStyle";

export default function StylePanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  const ControlList = [
    {
      label: "Background Color",
      image: <b>BG</b>,
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
      control: <></>,
    },
  ];

  return (
    <div key={id}>
      <div key={id} className={"font-semibold text-center"}>
        Style
      </div>

      <div>
        <div className="flex flex-row items-center justify-center">
          <FontStyle id={elemData.id} />

          <BorderStyle elemData={elemData} onLocalUpdate={onLocalUpdate} />
        </div>

        <div class="grid gap-1 md:grid-cols-2">
          {ControlList.map((eachChild) => {
            return (
              <div
                key={id + "-" + eachChild}
                className="flex flex-row items-center"
              >
                <div className="w-6 text-xs">
                  <div className="tooltip" data-tip={eachChild.label}>
                    {eachChild.image && eachChild.image}
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  {eachChild.control}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div>OpacityPaddingRadiusBlurBorderShadow</div> */}
    </div>
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
              className={` tab tab-sm ${
                activeTab === index ? "tab-active" : ""
              }`}
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

const BorderStyle = ({ elemData, onLocalUpdate }) => {
  const [editBorder, setEditBorder] = useState(false);

  return (
    <div>
      <label
        tabIndex={0}
        className="btn btn-sm m-1"
        onClick={() => {
          setEditBorder(!editBorder);
        }}
      >
        Edit Border
      </label>
      {editBorder && (
        <FloatingCard>
          <div className="flex flex-row justify-between w-full">
            <span>Edit Border</span>
            <CloseIcon
              className="w-5 h-5 active:scale-90 transition-all"
              onClick={(e) => {
                setEditBorder(false);
                e.stopPropagation();
              }}
            />
          </div>
          <div
            className="p-2 w-52"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex md:flex-row justify-between">
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
            </div>
            <ul>
              {["solid", "dotted", "dashed"].map((item) => {
                return (
                  <li
                    className={
                      "h-6 m-1 rounded-sm flex flex-col justify-center bg-base-200 hover:bg-base-300"
                    }
                  >
                    <a
                      onClick={() => {
                        onLocalUpdate({
                          style: {
                            borderColor: "black",
                            ...elemData.style,
                            borderStyle: item,
                          },
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

            <div className="flex flex-row justify-center">
              <button
                className="btn btn-sm btn-warning"
                onClick={() =>
                  onLocalUpdate({
                    style: {
                      borderColor: undefined,
                      borderWidth: undefined,
                      borderStyle: undefined,
                    },
                  })
                }
              >
                Remove Border
              </button>
            </div>
          </div>
        </FloatingCard>
      )}
    </div>
  );
};
