import { useState } from "react";

export default function NFTImage({
  isConnected,
  borderText,
  children,
  ...props
}) {
  const [isActive, setIsActive] = useState(false);

  const frameText = borderText || `0x6982508145454ce325ddbe47a25d4ec3d2311933`;

  return (
    <div
      className={`border border-black p-1 rounded-[36px] bg-white text-white`}
    >
      <svg
        class="svgwave"
        xmlns="http://www.w3.org/2000/svg"
        width="238"
        height="448"
        viewBox="0 0 238 448"
      >
        <path
          fill="none"
          id="wavepath"
          d="M 0 56 L 0 413 C 0 434 14 448 35 448 L 203 448 C 224 448 238 434 238 413 L 238 35 C 238 14 224 0 203 0 L 35 0 C 14 0 0 14 0 35 L 0 413"
        ></path>

        <path
          fill="none"
          id="wavepath1"
          d="M 238 392 L 238 35 C 238 14 224 0 203 0 L 35 0 C 14 0 -0 14 -0 35 L 0 413 C 0 434 14 448 35 448 L 203 448 C 224 448 238 434 238 413 L 238 35
          "
        ></path>

        <text text-anchor="middle" font-size="10px" fill="black">
          <textPath class="my-text" href="#wavepath" startOffset="50%">
            <animate
              attributeName="startOffset"
              from="11.3%"
              to="90%"
              begin="0s"
              dur="20s"
              repeatCount="indefinite"
            ></animate>
            {frameText}
          </textPath>

          <textPath class="my-text" href="#wavepath1" startOffset="50%">
            <animate
              attributeName="startOffset"
              from="11.3%"
              to="90%"
              begin="0s"
              dur="20s"
              repeatCount="indefinite"
            ></animate>
            {frameText}
          </textPath>
        </text>
      </svg>
      <div style={{ marginTop: "-448px", height: 448, padding: 11 }}>
        <div
          className={`border border-black/25 rounded-[22px] h-full flex flex-col items-center justify-between py-4 w-[216px]`}
          style={{ color: "black" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
