import { useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";

export default function ColorPicker({ color, onChange, onClose }) {
  const [selected, setSelected] = useState(false);
  const [pos, setPos] = useState();

  return (
    <div className="inline-block">
      <div
        onMouseLeave={() => {
          setSelected(false);
        }}
      >
        <button
          onClick={() => {
            setSelected(!selected);
          }}
          tabIndex={0}
          className="outline m-1 btn btn-sm"
          style={{
            backgroundColor: color,
            cursor: "pointer",
          }}
        >
          Choose Color
        </button>
        {selected && (
          <div className="flex flex-col items-center">
            <div
              className={"p-2 mb-4 mt-0 bg-base-100 rounded-md shadow-lg"}
              style={{
                // position: "absolute",
                width: 220,
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
          </div>
        )}
      </div>
    </div>
  );
}
