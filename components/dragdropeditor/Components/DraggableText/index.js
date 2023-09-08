import React, { useState, useRef, useContext, useEffect, use } from "react";
import dynamic from "next/dynamic";
import EditItem from "../DDEditor/EditItem";
import SiteContext from "../../siteContext";
import { getInputCoordinatesFromEvent } from "../../helpers/helper";
const PanelControls = dynamic(() => import("./PanelControls"));

const defaultTextSize = 24;

const fontList = ["Arial", "Times New Roman", "Courier New"];

function DraggableText(props) {
  const { elemData, mode, selected } = props;
  const siteData = useContext(SiteContext);

  const [isEditorFocused, setIsEditorFocused] = useState(false);

  const fontSource = !fontList.includes(elemData.style?.fontFamily)
    ? "google"
    : "";

  const onLocalUpdate = (newProps) =>
    siteData.onUpdateDiv(elemData.id, newProps);

  return (
    <>
      <EditItem
        elemData={elemData}
        selected={props.selected}
        renderPanel={props.selected && PanelControls}
        draggingDisabled={isEditorFocused}
      >
        {fontSource == "google" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link
              href={`https://fonts.googleapis.com/css2?family=${elemData.style?.fontFamily
                ?.split(" ")
                .join("+")}&display=swap`}
              rel="stylesheet"
            ></link>
          </>
        )}
        <EditableDiv
          value={elemData.text}
          id={elemData.id}
          key={elemData.id + "-" + elemData.fontSize + "-"}
          selected={selected && siteData.selected?.length == 1}
          onChange={(text) => {
            onLocalUpdate({ text: text });
          }}
          isEditorFocused={isEditorFocused}
          setIsEditorFocused={setIsEditorFocused}
          style={{
            ...elemData.style,
          }}
        />
        {isEditorFocused && (
          <div
            className={`absolute right-1 bottom-1 p-1 
                rounded-md bg-slate-500 text-xs font-bold text-gray-200 animate-pulse`}
          >
            EDITING
          </div>
        )}
      </EditItem>
    </>
  );
}

export default DraggableText;

function EditableDiv(props) {
  const {
    value,
    id,
    onChange,
    style,
    selected,
    isEditorFocused,
    setIsEditorFocused,
  } = props;
  const [startPos, setStartPos] = useState({ x: undefined, y: undefined });
  const inputRef = useRef();
  const inputValue = useRef(value);

  useEffect(() => {
    if (!selected) {
      setIsEditorFocused(false);
      inputValue.current = value;
    }
  }, [selected]);

  useEffect(() => {
    inputRef.current.innerHTML = value;
  }, [value]);

  function onPaste(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHtml", false, text);
  }

  const onMouseDown = (e) => {
    if (selected) {
      setStartPos(getInputCoordinatesFromEvent(e));
    }
    if (isEditorFocused) {
      e.stopPropagation();
    }
  };

  const onMouseUp = (e) => {
    const { x: xPos, y: yPos } = getInputCoordinatesFromEvent(e);
    if (selected && startPos && startPos?.x === xPos && startPos?.y === yPos) {
      setIsEditorFocused(true);
    }
    setStartPos(undefined);
  };

  return (
    <>
      {
        <div
          key={"selected-" + id}
          ref={inputRef}
          style={{ cursor: "cursor", ...style, height: "100%" }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onMouseDown}
          onTouchEnd={onMouseUp}
          onPaste={onPaste}
          contentEditable={selected && isEditorFocused}
          onInput={() => onChange(inputRef.current.innerHTML)}
          dangerouslySetInnerHTML={{ __html: inputValue.current }}
        >
          {/* {text} */}
        </div>
      }
    </>
  );
}
