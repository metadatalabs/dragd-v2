import { useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";

export default function ColorPicker({ color, onChange, onClose }) {
  const [selected, setSelected] = useState(false);
  const [pos, setPos] = useState();

  return (
    <div className="dropdown is-active">
      <div
        className={"dropdown-trigger outline my-2"}
        onClick={() => {
          setSelected(!selected);
        }}
        style={{
          borderRadius: 100,
          width: 25,
          height: 25,
          backgroundColor: color,
          cursor: "pointer",
        }}
      />
      {selected && (
        <div
          class="card flex flex-col items-center outline"
          id="dropdown-menu"
          role="menu"
          style={{
            position: "absolute",
            zIndex: 99999999,
            right: 0,
            background: "white",
            padding: 10,
          }}
          onMouseLeave={() => {
            setSelected(false);
          }}
        >
          <RgbaStringColorPicker color={color || "black"} onChange={onChange} />
          <input
            style={{ marginTop: 5 }}
            className="input"
            value={color}
            onChange={(e) => onChange(e.target.value)}
          ></input>
        </div>
      )}
    </div>
  );
}
