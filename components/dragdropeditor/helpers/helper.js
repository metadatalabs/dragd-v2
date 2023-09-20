import React, { useState, useRef, useEffect } from "react";

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // true for mobile device
    return true;
  } else {
    // false for not mobile device
    return false;
  }
}

export function isMobileViewport() {
  if (typeof window !== "undefined" && window.innerWidth < 600) return true;
}

export function getInputCoordinatesFromEvent(event) {
  var xPos = event.pageX ? event.pageX : event?.changedTouches?.[0]?.pageX;
  var yPos = event.pageY ? event.pageY : event?.changedTouches?.[0]?.pageY;
  return {
    x: xPos,
    y: yPos,
  };
}

export function getMobileScaleRatio() {
  return isMobileViewport() ? window.innerWidth / 600 : 1;
}

export function getElementOffset(element) {
  var de = document.documentElement;
  var box = element.getBoundingClientRect();
  var top = box.top + window.pageYOffset - de.clientTop;
  var left = box.left + window.pageXOffset - de.clientLeft;
  var height = box.height;
  var width = box.width;
  return {
    top: top,
    left: left,
    height,
    width,
    center: { x: left + width / 2, y: top + height / 2 },
  };
}

export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const dot = x1 * x2 + y1 * y2;
  const det = x1 * y2 - y1 * x2;
  const angle = (Math.atan2(det, dot) / Math.PI) * 180;
  return (angle + 360) % 360;
};

export const degToRadian = (deg) => (deg * Math.PI) / 180;

export const getLength = (x, y) => Math.sqrt(x * x + y * y);

export const Input = (props) => {
  const { value = "", onChange, placeholder, defaultValue, style } = props;
  const [text, setText] = useState(value);

  function update(event) {
    setText(event.target.value);
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  return (
    <input
      type="text"
      {...props}
      placeholder={placeholder}
      onChange={update}
      defaultValue={defaultValue}
    />
  );
};

export const Column = (props) => {
  return (
    <div
      {...props}
      style={{ ...props.style, display: "flex", flexDirection: "column" }}
    >
      {props.children}
    </div>
  );
};

export const Row = (props) => {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
};

export function debounce(func, wait) {
  var timeout;

  return (...args) => {
    var context = this;

    var later = () => {
      func.apply(context, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export function isDarkColor(bgColor) {
  if (typeof bgColor === "undefined") return false;
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? false : true;
}

export const StyleToggleButton = (props) => {
  return (
    <div
      {...props}
      className={`btn p-0 min-h-8 min-w-8 w-8 h-8 mx-2 ${props.className}`}
      style={{ ...props.style }}
    >
      {props.children}
    </div>
  );
};

export const SliderWithInput = ({
  value,
  onChange,
  min,
  max,
  step,
  symbol,
  defaultValue = 0,
}) => {
  return (
    <>
      <div className={"flex flex-row items-center p-1"}>
        <input
          id="steps-range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={
            (value?.replace && value.replace(/[^0-9.]/g, "")) || defaultValue
          }
          onChange={(e) => {
            onChange(e.target.value);
          }}
          class="range range-xs mx-2 w-8"
        />
        <div className="form-control text-xs">
          <label className="input-group">
            <input
              type="text"
              // placeholder="0.01"
              className="input input-bordered w-8 h-6 p-1"
              value={
                (value?.replace && value.replace(/[^0-9]/g, "")) || defaultValue
              }
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
            <span className="w-4 p-0">{symbol}</span>
          </label>
        </div>
      </div>
    </>
  );
};

export function timeDiff(date) {
  const now = new Date();
  const diffMilliseconds = now - date;
  const diffSeconds = diffMilliseconds / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  if (diffDays >= 1) {
    return Math.floor(diffDays) + " day(s)";
  } else if (diffHours >= 1) {
    return Math.floor(diffHours) + " hour(s)";
  } else {
    return Math.floor(diffMinutes) + " minute(s)";
  }
}
