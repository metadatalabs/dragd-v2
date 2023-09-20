import { useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { DownChevron } from "../../../ui-helpers";
import { FloatingCard } from "./ImagePicker";
import fonts from "./fonts.json";
const googleFonts = fonts["googleFonts"];
const fontList = ["Arial", "Times New Roman", "Courier New", ...googleFonts];

export default function FontPicker({ style, onChange, onClose }) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="inline-block">
      <div
        onMouseLeave={() => {
          setSelected(false);
        }}
      >
        <div
          onClick={() => {
            setSelected(!selected);
          }}
          tabIndex={0}
          className="flex items-center p-1 m-1 border border-primary rounded text-sm bg-base-100 hover:bg-base-200"
          style={{
            cursor: "pointer",
          }}
        >
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin
          ></link>
          <link
            href={`https://fonts.googleapis.com/css2?family=${style?.fontFamily
              ?.split(" ")
              .join("+")}&display=swap`}
            rel="stylesheet"
          ></link>
          <span
            style={{
              fontFamily: style?.fontFamily,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {style?.fontFamily}
          </span>
          <DownChevron />
        </div>
        {selected && (
          <FloatingCard>
            Font Picker
            <div
              className={
                "p-2 flex flex-col max-h-64 overflow-y-auto items-center"
              }
              style={{
                width: 220,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              {fontList.map((font) => {
                return (
                  <button
                    className="btn btn-sm btn-ghost w-44 whitespace-nowrap"
                    onClick={async () => {
                      // await signOut();
                      onChange({ fontFamily: font });
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
            </div>
            <button
              className="btn btn-sm btn-error"
              onClick={() => {
                onChange({ fontFamily: null });
              }}
            >
              Clear
            </button>
          </FloatingCard>
        )}
      </div>
    </div>
  );
}
