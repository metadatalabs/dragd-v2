import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef, useContext } from "react";
import { EditorModes } from "../..";
import {
  usePrevious,
  getElementOffset,
  degToRadian,
  isMobile,
  getMobileScaleRatio,
  getInputCoordinatesFromEvent,
} from "../../helpers/helper";
import SiteContext from "../../siteContext";

const ControlPanel = dynamic(() => import("../EditMenu/ControlPanel"));
const DragCoincideLines = dynamic(() => import("./dragCoincideLines.js"));

const dragHandleOffset = 5;
const pageCenterSnapDistance = 10;
const itemAlignSnapDistance = 10;

const dragCornerOffsets = [
  { top: -dragHandleOffset, left: -dragHandleOffset },
  { top: -dragHandleOffset, right: -dragHandleOffset },
  { bottom: -dragHandleOffset, left: -dragHandleOffset },
  { bottom: -dragHandleOffset, right: -dragHandleOffset },
];

const maxWidthDragCornerOffsets = [
  { top: -dragHandleOffset, left: "50%" },
  { bottom: -dragHandleOffset, left: "50%" },
];

function EditItem(props) {
  const { elemData, selected, draggingDisabled } = props;
  const x = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
  const siteData = useContext(SiteContext);
  const {
    selected: selectedItems,
    setSelected: onSelect,
    onUpdateDiv: onUpdated,
    mode,
    setModal,
    onUpdateSelected,
  } = siteData;

  const [state, setState] = useState<{
    rel?: { x: number; y: number; startX: number; startY: number };
    rot?: {
      startVector?: { x: number; y: number };
      center?: { x: number; y: number };
    };
    res?: { startX: number; startY: number; rect: any };
  }>({});
  const divRef = useRef<HTMLInputElement>();

  function saveElemJson(newProps: elemItem) {
    var updatedProps = {
      ...newProps,
    };
    onUpdated(elemData.id, updatedProps);
    // analytics.track('editor_save_item');
  }

  enum movementTypes {
    NOOP = 0,
    DRAGGING = 1,
    ROTATING = 2,
    RESIZING = 3,
  }

  const [movementType, setMovementType] = useState(movementTypes.NOOP);
  const prevMovementType = usePrevious(movementType);

  useEffect(() => {
    if (
      (movementType === movementTypes.DRAGGING ||
        movementType === movementTypes.RESIZING ||
        movementType === movementTypes.ROTATING) &&
      prevMovementType !== movementType
    ) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onMouseMove, {
        passive: false,
      });
      document.addEventListener("touchend", onMouseUp);
    }
  }, [movementType]);

  // calculate relative position to the mouse and set dragging=true
  function onMouseDown(e) {
    // only left mouse button
    if (mode != "edit") return;
    var pos = getElementOffset(divRef.current);

    const { x: startX, y: startY } = getInputCoordinatesFromEvent(e);

    var newState = {
      rel: {
        x: startX - pos.left - pos.width / 2,
        y: startY - pos.top - pos.height / 2,
        startX: pos.left,
        startY: pos.top,
      },
    };
    setState(newState);
    !selectedItems.includes(elemData?.id) && onSelect(elemData?.id);

    if (isMobile() && !selected) {
      return;
    }

    setMovementType(movementTypes.DRAGGING);

    // this prevents clicking elements below it, add conditions to enable clickthrough
    e.stopPropagation();
  }

  function onMouseDownRot(e) {
    var pos = getElementOffset(divRef.current);
    const rect = getElementOffset(divRef.current);

    const { x: startX, y: startY } = getInputCoordinatesFromEvent(e);

    const startVector = {
      x: startX - pos.left - pos.width / 2,
      y: startY - pos.top - pos.height / 2,
    };

    setState({ ...state, rot: { startVector, center: rect.center } });
    setMovementType(movementTypes.ROTATING);
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDownRes(e) {
    const rect = getElementOffset(divRef.current);

    const { x: startX, y: startY } = getInputCoordinatesFromEvent(e);

    setState({ ...state, res: { startX, startY, rect } });
    setMovementType(movementTypes.RESIZING);
    e.stopPropagation();
    e.preventDefault();
  }

  const [coincides, setCoincides] = useState([]);

  function SnapToGrid(toPosition) {
    const { pos } = toPosition;

    if (Math.abs(pos.x) < pageCenterSnapDistance) pos.x = 0;

    const coincidingItems = Object.values(siteData.items).filter((item) => {
      if (item.id === elemData.id) return false;

      const { pos: itemPos } = item;
      const deltaX = pos.x - itemPos?.x;
      const deltaY = pos.y - itemPos?.y;

      const xCoincides = Math.abs(deltaX) < itemAlignSnapDistance;
      const yCoincides = Math.abs(deltaY) < itemAlignSnapDistance;

      // Update pos if necessary
      if (xCoincides) pos.x = itemPos.x;
      if (yCoincides) pos.y = itemPos.y;

      // Return whether the item coincides
      return xCoincides || yCoincides;
    });

    setCoincides(coincidingItems);
    return toPosition;
  }

  function SnapToAngle(angle) {
    angle = angle % 360;
    let angleExcess = angle % 90;
    if (angleExcess > -10 && angleExcess < 10) angle -= angleExcess;
    return angle;
  }

  function onMouseMove(e) {
    const { x: clientX, y: clientY } = getInputCoordinatesFromEvent(e);

    if (selectedItems.length > 1) {
      var newPos = {
        x:
          elemData.pos.x -
          (clientX - state.rel.x - x) * (1 / getMobileScaleRatio()),
        y:
          elemData.pos.y -
          (clientY - state.rel.y) * (1 / getMobileScaleRatio()),
      };

      onUpdateSelected(newPos);
      return;
    }

    if (movementType == movementTypes.DRAGGING) {
      if (draggingDisabled) return;
      var toPosition = {
        pos: {
          x: (clientX - state.rel.x - x) * (1 / getMobileScaleRatio()),
          y: (clientY - state.rel.y) * (1 / getMobileScaleRatio()),
        },
      };

      var windowHeight = window.innerHeight;
      var scrollY = window.scrollY;

      if (clientY - scrollY > windowHeight * 0.9) {
        window.scrollBy(0, 10);
      } else if (clientY - scrollY < windowHeight * 0.1) {
        window.scrollBy(0, -10);
      }

      saveElemJson(SnapToGrid(toPosition));
    } else if (movementType == movementTypes.ROTATING) {
      const rotateVector = {
        x: clientX - state.rot.center.x,
        y: clientY - state.rot.center.y,
      };
      const startAngle = Math.atan2(
        state.rot.startVector.y,
        state.rot.startVector.x
      );
      const rotateAngle = Math.atan2(rotateVector.y, rotateVector.x);
      let angleChange = rotateAngle - startAngle;

      // Convert angleChange to degrees and ensure it is between -180 to 180.
      angleChange = (angleChange * 180) / Math.PI;
      if (angleChange > 180) angleChange -= 360;
      else if (angleChange < -180) angleChange += 360;

      let angle = elemData.rot.deg + angleChange;
      saveElemJson({ rot: { deg: SnapToAngle(angle) } });
    } else if (movementType == movementTypes.RESIZING) {
      var deltaX =
        (clientX - state.res.startX) * Math.cos(degToRadian(elemData.rot.deg));
      var deltaY =
        (clientY - state.res.startY) * Math.cos(degToRadian(elemData.rot.deg));

      var dx = 1,
        dy = 1;
      if (state.res.startX < state.res.rect.center.x) dx *= -1;
      if (state.res.startY < state.res.rect.center.y) dy *= -1;

      saveElemJson({
        size: {
          width: state.res.rect.width + dx * deltaX,
          height: state.res.rect.height + dy * deltaY,
        },
        pos: { x: elemData.pos.x + deltaX / 2, y: elemData.pos.y + deltaY / 2 },
      });
    } else return;

    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e) {
    setMovementType(movementTypes.NOOP);

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", onMouseUp);

    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <>
      {/* SECTION: ALIGNMENT GRIDS */}
      {selected && (
        <DragCoincideLines
          elemData={elemData}
          dragging={movementType == movementTypes.DRAGGING}
          coincides={coincides}
        />
      )}

      {/* SECTION: CONTROL PANEL */}
      {selected && selectedItems.length == 1 && (
        <>
          <ControlPanel
            elemData={elemData}
            saveElemJson={saveElemJson}
            setModal={setModal}
            CustomPanel={props.renderPanel}
            onLocalUpdate={props.onLocalUpdate}
          ></ControlPanel>
        </>
      )}

      {/* SECTION: DRAGGABLE RECT */}
      {mode == "edit" ? (
        <Rect
          ref={divRef}
          mode={mode}
          elemData={elemData}
          selected={selected}
          onMouseDownDrag={onMouseDown}
          onMouseDownRes={onMouseDownRes}
          onMouseDownRot={onMouseDownRot}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              cursor: mode == "edit" && !draggingDisabled ? "grab" : undefined,
              pointerEvents: elemData.type != "text" ? "none" : undefined,
              zIndex: elemData.zIndex,
            }}
          >
            {props.children}
          </div>
        </Rect>
      ) : (
        <LinkWrapper link={elemData.href} target={elemData.target}>
          <Rect elemData={elemData} mode={mode}>
            {props.children}
          </Rect>
        </LinkWrapper>
      )}
    </>
  );
}

const Rect = React.forwardRef(({ elemData, ...props }: any, ref) => {
  const { selected, mode, onMouseDownDrag, onMouseDownRes, onMouseDownRot } =
    props;
  const { pos, size, rot, zIndex } = elemData;
  var x = typeof window !== "undefined" ? window.innerWidth / 2 : 200;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={ref}
      onMouseDown={onMouseDownDrag}
      onTouchStart={onMouseDownDrag}
      key={elemData.id + "-rect"}
      className={mode == EditorModes.EDIT ? "draggable" : "undraggable"}
      style={{
        zIndex: zIndex,
        position: "absolute",
        transform: `translate(-50%, -50%) ${
          rot && rot.deg ? `rotate(${rot?.deg}deg)` : ``
        }`,
        left: pos?.x + "px",
        top: pos?.y + "px",
        width: (size?.width || 50) + "px",
        height: (size?.height || 50) + "px",
        textAlign: "center",
        border: selected && "1px solid black",
        userSelect: mode == EditorModes.EDIT ? "none" : undefined,
      }}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {props.children}
      </div>

      {/* RESIZE AND ROTATE HANDLES */}
      {selected && (
        <>
          {!elemData.maxWidth && (
            <div
              onMouseDown={onMouseDownRot}
              onTouchStart={onMouseDownRot}
              className={"dragHandle"}
              style={{
                top: elemData.size?.height + 20,
                left: elemData.size?.width / 2,
              }}
            />
          )}
          {(elemData.maxWidth
            ? maxWidthDragCornerOffsets
            : dragCornerOffsets
          ).map((elem, id) => {
            return (
              <div
                key={"rot-" + id}
                onMouseDown={onMouseDownRes}
                onTouchStart={onMouseDownRes}
                className={"dragHandle"}
                style={{ ...elem }}
              />
            );
          })}
        </>
      )}
    </div>
  );
});

function LinkWrapper({ children, link, target }) {
  return link ? (
    <a href={link} target={target}>
      {children}
    </a>
  ) : (
    <>{children}</>
  );
}

export default EditItem;
