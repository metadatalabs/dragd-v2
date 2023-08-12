import { useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { DownChevron } from "../../../ui-helpers";
import { FloatingCard } from "./ImagePicker";

export default function ColorPicker({ color, onChange, onClose }) {
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
          <div
            className={`rounded w-4 h-4 border-2 border-primary`}
            style={{ backgroundColor: color }}
          ></div>
          <DownChevron />
        </div>
        {selected && (
          <FloatingCard>
            Color Picker
            <div
              className={"p-2"}
              style={{
                width: 220,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              <RgbaStringColorPicker
                color={color || "black"}
                onChange={onChange}
              />
              <input
                style={{ marginTop: 5 }}
                className="input input-sm input-bordered"
                value={color}
                onChange={(e) => onChange(e.target.value)}
              ></input>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => {
                onChange("transparent");
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
