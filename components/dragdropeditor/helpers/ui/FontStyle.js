import fonts from "../../helpers/ui/fonts.json";
import ColorPicker from "../../helpers/ui/ColorPicker";
import FontPicker from "../../helpers/ui/FontPicker";
import { useContext, useEffect, useState } from "react";
import SiteContext from "../../siteContext";
import { Row, SliderWithInput, StyleToggleButton } from "../../helpers/helper";
import GenericDropdown from "../../../UI/GenericDropdown";
import StylePanelControls, {
  TabSwitcher,
} from "../../Components/EditMenu/StyleControlPanel";
import {
  CloseIcon,
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
} from "../../Components/DDEditor/EditorIcons";
import { FloatingCard } from "./ImagePicker";

export default function FontStyle({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const [editFont, setEditFont] = useState(false);

  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  let alignDirections = ["left", "center", "right"];
  let alignIcons = [<IconAlignLeft />, <IconAlignCenter />, <IconAlignRight />];
  let currentDirection = alignDirections.indexOf(elemData?.style?.textAlign);
  currentDirection = currentDirection < 0 ? 1 : currentDirection;

  return (
    <>
      <label
        tabIndex={0}
        className="btn btn-sm m-1"
        onClick={() => {
          setEditFont(!editFont);
        }}
      >
        Edit Font
      </label>
      {editFont && (
        <FloatingCard>
          <div className="flex flex-row justify-between w-full">
            <span>Edit Font</span>
            <CloseIcon
              className="w-5 h-5 active:scale-90 transition-all"
              onClick={(e) => {
                setEditFont(false);
                e.stopPropagation();
              }}
            />
          </div>{" "}
          <div
            className="p-2 w-52"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <table style={{ margin: 2 }}>
              <tr>
                <td className={"w-2/6 text-sm py-3"}>Font</td>
                <td>
                  <FontPicker
                    style={elemData.style}
                    onChange={(newStyle) => {
                      onLocalUpdate({
                        style: {
                          ...elemData.style,
                          fontFamily: newStyle.fontFamily,
                        },
                      });
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className={"w-2/6 text-sm"}>Color</td>
                <td>
                  <ColorPicker
                    color={elemData.style?.color || "black"}
                    onChange={(color) => {
                      console.log("color", color);
                      onLocalUpdate({
                        style: { ...elemData.style, color: color },
                      });
                      // analytics.track('editor_change_text_color');
                    }}
                    onClose={() => {
                      // setPanelControls(null);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className={"w-2/6 text-sm"}>Size</td>
                <td>
                  <SliderWithInput
                    value={elemData.style?.fontSize}
                    onChange={(value) => {
                      onLocalUpdate({ style: { fontSize: value + "px" } });
                    }}
                    symbol="px"
                  />
                </td>
              </tr>

              <tr>
                <td className={"w-2/6 text-sm"}>Line Height</td>
                <td>
                  <SliderWithInput
                    value={elemData.style?.lineHeight}
                    onChange={(value) => {
                      onLocalUpdate({
                        style: { lineHeight: value + "px" },
                      });
                    }}
                    symbol="px"
                  />
                </td>
              </tr>
            </table>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <StyleToggleButton
                className={`font-bold ${
                  elemData.style?.fontWeight === "bold"
                    ? "btn-active outline"
                    : ""
                }`}
                onClick={() => {
                  elemData.style.fontWeight === "bold"
                    ? onLocalUpdate({ style: { fontWeight: "normal" } })
                    : onLocalUpdate({ style: { fontWeight: "bold" } });
                }}
              >
                B
              </StyleToggleButton>

              <StyleToggleButton
                className={`italic ${
                  elemData.style?.fontStyle === "italic"
                    ? "btn-active outline"
                    : ""
                }`}
                onClick={() => {
                  elemData.style.fontStyle === "italic"
                    ? onLocalUpdate({ style: { fontStyle: "normal" } })
                    : onLocalUpdate({ style: { fontStyle: "italic" } });
                }}
              >
                i
              </StyleToggleButton>

              <StyleToggleButton
                className={`underline ${
                  elemData.style?.textDecoration === "underline"
                    ? "btn-active outline"
                    : ""
                }`}
                onClick={() => {
                  onLocalUpdate({
                    style: {
                      textDecoration:
                        elemData.style.textDecoration === "underline"
                          ? ""
                          : "underline",
                    },
                  });
                }}
              >
                U
              </StyleToggleButton>

              <StyleToggleButton
                onClick={() => {
                  onLocalUpdate({
                    style: {
                      textAlign:
                        alignDirections[
                          (currentDirection + 1) % alignDirections.length
                        ],
                    },
                  });
                }}
              >
                {alignIcons[currentDirection]}
              </StyleToggleButton>
            </div>
          </div>
        </FloatingCard>
      )}
    </>
  );
}
