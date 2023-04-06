import DropDownMenu from "../../helpers/ui/DropDownSelector";
import fonts from "../../helpers/ui/fonts.json";
import ColorPicker from "../../helpers/ui/ColorPicker";
import analytics from "../../../../util/analytics";
import { useContext, useEffect, useState } from "react";
import SiteContext from "../../siteContext";
import { Row, SliderWithInput, StyleToggleButton } from "../../helpers/helper";
import GenericDropdown from "/components/UI/GenericDropdown";
import StylePanelControls, { TabSwitcher } from "../EditMenu/StyleControlPanel";

const googleFonts = fonts["googleFonts"];
const fontList = ["Arial", "Times New Roman", "Courier New", ...googleFonts];

export default function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  let alignDirections = ["left", "center", "right"];
  let alignIcon = ["align-left", "align-center", "align-right"];
  let currentDirection = alignDirections.indexOf(elemData?.style?.textAlign);
  currentDirection = currentDirection < 0 ? 1 : currentDirection;
  return (
    <>
      <TabSwitcher
        tabs={[
          <>
            <textarea
              rows={4}
              className={"ring-1 rounded-md p-1"}
              value={elemData?.text}
              onChange={(e) => {
                onLocalUpdate({ text: e.target.value });
              }}
            />

            <table style={{ margin: 2 }}>
              <tr>
                <td className={"w-2/6 text-sm"}>Font</td>
                <td>
                  <GenericDropdown
                    border={true}
                    label={
                      <>
                        <link
                          href={`https://fonts.googleapis.com/css2?family=${elemData.style?.fontFamily
                            ?.split(" ")
                            .join("+")}&display=swap`}
                          rel="stylesheet"
                        ></link>
                        <span
                          style={{ fontFamily: elemData.style?.fontFamily }}
                        >
                          {elemData.style?.fontFamily}
                        </span>
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    }
                    children={fontList.map((font) => {
                      return (
                        <button
                          className="w-44"
                          onClick={async () => {
                            // await signOut();
                            onLocalUpdate({ style: { fontFamily: font } });
                          }}
                        >
                          <link
                            rel="preconnect"
                            href="https://fonts.googleapis.com"
                          ></link>
                          <link
                            rel="preconnect"
                            href="https://fonts.gstatic.com"
                            crossorigin
                          ></link>
                          <link
                            href={`https://fonts.googleapis.com/css2?family=${font
                              ?.split(" ")
                              .join("+")}&display=swap`}
                            rel="stylesheet"
                          ></link>
                          <span style={{ fontFamily: font }}>{font}</span>
                        </button>
                      );
                    })}
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
                      onLocalUpdate({ style: { lineHeight: value + "px" } });
                    }}
                    symbol="px"
                  />
                </td>
              </tr>
            </table>
            <Row
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
                align
              </StyleToggleButton>
            </Row>
          </>,
          <StylePanelControls id={id} />,
        ]}
        tabicons={["Properties", "Style"]}
      />
    </>
  );
}
