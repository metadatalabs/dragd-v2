import React, { useState, useEffect, useRef, useContext } from "react";
import { EditorModes } from "../../index";
import { debounce, getMobileScaleRatio } from "../../helpers/helper";
import SiteContext from "../../siteContext";

export default function VisibleCanvas(props) {
  const siteData = useContext(SiteContext);
  const {
    setSelected: setSelected,
    selected,
    onUpdateDiv: onUpdated,
    mode,
    setModal,
    pressedKeys,
    pageHeight,
    setPageHeight,
    items,
  } = siteData;

  const { setPressedKeys, setSelectedItems } = props;

  const [pageVisibleHeight, setVisiblePageHeight] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const x = typeof window !== "undefined" ? window.innerWidth / 2 : 200;

  useEffect(() => {
    setVisiblePageHeight(
      pageHeight * getMobileScaleRatio() + (mode === EditorModes.EDIT ? 100 : 0)
    );
  }, [pageHeight, pageWidth, mode]);

  const debouncedHandleResize = debounce(function handleResize() {
    setPageWidth(window.innerWidth);
  }, 100);

  const handleKeyAction = (event) => {
    if (event.target.nodeName == "INPUT" || event.target.nodeName == "TEXTAREA")
      return;
    if (event.target.isContentEditable) return;

    setPressedKeys([...pressedKeys, event.key]);
  };

  const handleKeyUpAction = (event) => {
    if (event.target.nodeName == "INPUT" || event.target.nodeName == "TEXTAREA")
      return;
    if (event.target.isContentEditable) return;

    setPressedKeys([...pressedKeys.filter((i) => i != event.key)]);
  };

  useEffect(() => {
    if (!isDragging) return;
    var itemsToSelect = {};
    Object.values(items).forEach((element) => {
      if (
        element.pos?.x < bottomRight.x &&
        element.pos?.x > topLeft.x &&
        element.pos?.y < bottomRight.y &&
        element.pos?.y > topLeft.y
      ) {
        itemsToSelect[element.id] = element;
      }
    });
    setSelectedItems(Object.keys(itemsToSelect));
  }, [currentPos]);

  const topLeft = {
    x: Math.min(startPos.x, currentPos.x),
    y: Math.min(startPos.y, currentPos.y),
  };

  const bottomRight = {
    x: Math.max(startPos.x, currentPos.x),
    y: Math.max(startPos.y, currentPos.y),
  };

  React.useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("keydown", handleKeyAction);
    window.addEventListener("keyup", handleKeyUpAction);
    setPageWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("keydown", handleKeyAction);
      window.removeEventListener("keyup", handleKeyUpAction);
    };
  });

  return (
    <div
      data-theme={items["style"]?.theme}
      style={{
        overflow: "hidden",
        height: pageVisibleHeight,
        minHeight: "100vh",
        backgroundImage:
          items["style"]?.background?.backgroundImage &&
          `url(${items["style"]?.background?.backgroundImage})`,
        backgroundColor:
          items["style"]?.background?.backgroundColor &&
          `${items["style"]?.background?.backgroundColor}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseDown={(e) => {
        if (mode !== EditorModes.EDIT) return;
        const mousePos = { x: e.pageX - x, y: e.pageY };
        setStartPos(mousePos);
        setCurrentPos(mousePos);
        setDragging(true);
      }}
      onMouseMove={(e) => {
        if (!isDragging) return;
        setCurrentPos({ x: e.pageX - x, y: e.pageY });
      }}
      onMouseUp={(e) => {
        setDragging(false);
      }}
    >
      <div
        style={{ transform: `scale(${pageWidth ? getMobileScaleRatio() : 1})` }}
      >
        <div style={{ transform: `translateX(50%)` }}>
          {props.children}
          {isDragging && (
            <SelectionBox topLeft={topLeft} bottomRight={bottomRight} />
          )}
        </div>
      </div>
    </div>
  );
}

const SelectionBox = (props) => {
  const { topLeft, bottomRight } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: topLeft.y,
        left: topLeft.x,
        width: bottomRight.x - topLeft.x,
        height: bottomRight.y - topLeft.y,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        border: "2px solid rgba(0,0,255,0.3)",
        borderRadius: 2,
        zIndex: 999999,
      }}
    ></div>
  );
};
