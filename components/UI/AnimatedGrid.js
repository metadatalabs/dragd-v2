import * as React from "react";
import {
  useTrail,
  useChain,
  useSprings,
  animated,
  useSpringRef,
} from "@react-spring/web";

const STROKE_WIDTH = 0.5;

const OFFSET = STROKE_WIDTH / 2;

const MAX_WIDTH = 150 + OFFSET * 2;
const MAX_HEIGHT = 60 + OFFSET * 2;

export default function App({ intro, animateGrid, COORDS }) {
  const gridApi = useSpringRef();

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: animateGrid ? MAX_WIDTH : 0,
      y2: animateGrid ? MAX_HEIGHT : 0,
    },
  });

  const boxApi = useSpringRef();

  const [boxSprings] = useSprings(7, (i) => ({
    ref: boxApi,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
      fill: intro ? "green" : "currentColor",
    },
    delay: i * 200,
    config: {
      mass: 2,
      tension: 220,
    },
  }));

  useChain([gridApi, boxApi], [0, 1], animateGrid ? 1500 : 0);

  return (
    <div>
      <div className="w-48">
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {gridSprings.map(({ x2 }, index) => (
              <animated.line
                x1={0}
                y1={index * 10 + OFFSET}
                x2={x2}
                y2={index * 10 + OFFSET}
                key={index}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              />
            ))}
            {gridSprings.map(({ y2 }, index) => (
              <animated.line
                x1={index * 10 + OFFSET}
                y1={0}
                x2={index * 10 + OFFSET}
                y2={y2}
                key={index}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              />
            ))}
          </g>
          {boxSprings.map(({ scale, fill }, index) => (
            <animated.rect
              key={index}
              width={10}
              height={10}
              fill="currentColor"
              style={{
                transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
                transform: `translate(${COORDS[index][0] + OFFSET}px, ${
                  COORDS[index][1] + OFFSET
                }px)`,
                scale,
                fill,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
