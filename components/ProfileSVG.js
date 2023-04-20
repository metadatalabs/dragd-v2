export default function ProfileSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="290"
      height="500"
      viewBox="0 0 290 500"
    >
      <defs>
        <filter id="f1">
          <feImage
            result="p0"
            xlink:href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjkwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI5MCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzI5MHB4JyBoZWlnaHQ9JzUwMHB4JyBmaWxsPScjNjk4MjUwJy8+PC9zdmc+"
          />
          <feImage
            result="p1"
            xlink:href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjkwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI5MCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGNpcmNsZSBjeD0nMTUwJyBjeT0nMjY3JyByPScxMjBweCcgZmlsbD0nIzUwMjZmMCcvPjwvc3ZnPg=="
          />
          <feImage
            result="p2"
            xlink:href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjkwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI5MCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGNpcmNsZSBjeD0nMTgyJyBjeT0nMzQ1JyByPScxMjBweCcgZmlsbD0nIzMxMTkzMycvPjwvc3ZnPg=="
          />
          <feImage
            result="p3"
            xlink:href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjkwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI5MCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGNpcmNsZSBjeD0nMjM0JyBjeT0nNDMxJyByPScxMDBweCcgZmlsbD0nIzZjOWFhYicvPjwvc3ZnPg=="
          />
          <feBlend mode="overlay" in="p0" in2="p1" />
          <feBlend mode="exclusion" in2="p2" />
          <feBlend mode="overlay" in2="p3" result="blendOut" />
          <feGaussianBlur in="blendOut" stdDeviation="42" />
        </filter>{" "}
        <clipPath id="corners">
          <rect width="290" height="500" rx="42" ry="42" />
        </clipPath>
        <path
          id="text-path-a"
          d="M40 12 H250 A28 28 0 0 1 278 40 V460 A28 28 0 0 1 250 488 H40 A28 28 0 0 1 12 460 V40 A28 28 0 0 1 40 12 z"
        />
        <path id="minimap" d="M234 444C234 457.949 242.21 463 253 463" />
        <filter id="top-region-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="24" />
        </filter>
        <linearGradient id="grad-up" x1="1" x2="0" y1="1" y2="0">
          <stop offset="0.0" stop-color="white" stop-opacity="1" />
          <stop offset=".9" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="grad-down" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0.0" stop-color="white" stop-opacity="1" />
          <stop offset="0.9" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="fade-up" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#grad-up)" />
        </mask>
        <mask id="fade-down" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#grad-down)" />
        </mask>
        <mask id="none" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="white" />
        </mask>
        <linearGradient id="grad-symbol">
          <stop offset="0.7" stop-color="white" stop-opacity="1" />
          <stop offset=".95" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <mask id="fade-symbol" maskContentUnits="userSpaceOnUse">
          <rect width="290px" height="200px" fill="url(#grad-symbol)" />
        </mask>
      </defs>
      <g clip-path="url(#corners)">
        <rect fill="698250" x="0px" y="0px" width="290px" height="500px" />
        <rect
          style="filter: url(#f1)"
          x="0px"
          y="0px"
          width="290px"
          height="500px"
        />{" "}
        <g style="filter:url(#top-region-blur); transform:scale(1.5); transform-origin:center top;">
          <rect fill="none" x="0px" y="0px" width="290px" height="500px" />
          <ellipse
            cx="50%"
            cy="0px"
            rx="180px"
            ry="120px"
            fill="#000"
            opacity="0.85"
          />
        </g>
        <rect
          x="0"
          y="0"
          width="290"
          height="500"
          rx="42"
          ry="42"
          fill="rgba(0,0,0,0)"
          stroke="rgba(255,255,255,0.2)"
        />
      </g>
      <text text-rendering="optimizeSpeed">
        <textPath
          startOffset="-100%"
          fill="white"
          font-family="'Courier New', monospace"
          font-size="10px"
          xlink:href="#text-path-a"
        >
          0x5026f006b85729a8b14553fae6af249ad16c9aab • WOJAK{" "}
          <animate
            additive="sum"
            attributeName="startOffset"
            from="0%"
            to="100%"
            begin="0s"
            dur="30s"
            repeatCount="indefinite"
          />
        </textPath>{" "}
        <textPath
          startOffset="0%"
          fill="white"
          font-family="'Courier New', monospace"
          font-size="10px"
          xlink:href="#text-path-a"
        >
          0x5026f006b85729a8b14553fae6af249ad16c9aab • WOJAK{" "}
          <animate
            additive="sum"
            attributeName="startOffset"
            from="0%"
            to="100%"
            begin="0s"
            dur="30s"
            repeatCount="indefinite"
          />{" "}
        </textPath>
        <textPath
          startOffset="50%"
          fill="white"
          font-family="'Courier New', monospace"
          font-size="10px"
          xlink:href="#text-path-a"
        >
          0x6982508145454ce325ddbe47a25d4ec3d2311933 • PEPE{" "}
          <animate
            additive="sum"
            attributeName="startOffset"
            from="0%"
            to="100%"
            begin="0s"
            dur="30s"
            repeatCount="indefinite"
          />
        </textPath>
        <textPath
          startOffset="-50%"
          fill="white"
          font-family="'Courier New', monospace"
          font-size="10px"
          xlink:href="#text-path-a"
        >
          0x6982508145454ce325ddbe47a25d4ec3d2311933 • PEPE{" "}
          <animate
            additive="sum"
            attributeName="startOffset"
            from="0%"
            to="100%"
            begin="0s"
            dur="30s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
      <g mask="url(#fade-symbol)">
        <rect fill="none" x="0px" y="0px" width="290px" height="200px" />{" "}
        <text
          y="70px"
          x="32px"
          fill="white"
          font-family="'Courier New', monospace"
          font-weight="200"
          font-size="36px"
        >
          PEPE/WOJAK
        </text>
        <text
          y="115px"
          x="32px"
          fill="white"
          font-family="'Courier New', monospace"
          font-weight="200"
          font-size="36px"
        >
          1%
        </text>
      </g>
      <rect
        x="16"
        y="16"
        width="258"
        height="468"
        rx="26"
        ry="26"
        fill="rgba(0,0,0,0)"
        stroke="rgba(255,255,255,0.2)"
      />
      <g mask="url(#none)" style="transform:translate(72px,189px)">
        <rect x="-16px" y="-16px" width="180px" height="180px" fill="none" />
        <path
          d="M1 1C9 81 65 137 145 145"
          stroke="rgba(0,0,0,0.3)"
          stroke-width="32px"
          fill="none"
          stroke-linecap="round"
        />
      </g>
      <g mask="url(#none)" style="transform:translate(72px,189px)">
        <rect x="-16px" y="-16px" width="180px" height="180px" fill="none" />
        <path
          d="M1 1C9 81 65 137 145 145"
          stroke="rgba(255,255,255,1)"
          fill="none"
          stroke-linecap="round"
        />
      </g>
      <circle cx="73px" cy="190px" r="4px" fill="white" />
      <circle cx="217px" cy="334px" r="4px" fill="white" />{" "}
      <g style="transform:translate(29px, 384px)">
        <rect
          width="98px"
          height="26px"
          rx="8px"
          ry="8px"
          fill="rgba(0,0,0,0.6)"
        />
        <text
          x="12px"
          y="17px"
          font-family="'Courier New', monospace"
          font-size="12px"
          fill="white"
        >
          <tspan fill="rgba(255,255,255,0.6)">ID: </tspan>492007
        </text>
      </g>{" "}
      <g style="transform:translate(29px, 414px)">
        <rect
          width="133px"
          height="26px"
          rx="8px"
          ry="8px"
          fill="rgba(0,0,0,0.6)"
        />
        <text
          x="12px"
          y="17px"
          font-family="'Courier New', monospace"
          font-size="12px"
          fill="white"
        >
          <tspan fill="rgba(255,255,255,0.6)">Min Tick: </tspan>61000
        </text>
      </g>{" "}
      <g style="transform:translate(29px, 444px)">
        <rect
          width="133px"
          height="26px"
          rx="8px"
          ry="8px"
          fill="rgba(0,0,0,0.6)"
        />
        <text
          x="12px"
          y="17px"
          font-family="'Courier New', monospace"
          font-size="12px"
          fill="white"
        >
          <tspan fill="rgba(255,255,255,0.6)">Max Tick: </tspan>74800
        </text>
      </g>
      <g style="transform:translate(226px, 433px)">
        <rect
          width="36px"
          height="36px"
          rx="8px"
          ry="8px"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
        />
        <path
          stroke-linecap="round"
          d="M8 9C8.00004 22.9494 16.2099 28 27 28"
          fill="none"
          stroke="white"
        />
        <circle
          style="transform:translate3d(21px, 27px, 0px)"
          cx="0px"
          cy="0px"
          r="4px"
          fill="white"
        />
      </g>
    </svg>
  );
}
