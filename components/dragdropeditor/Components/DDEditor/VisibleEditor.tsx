import React, { useState, useEffect, useRef, useContext } from "react";
import { EditorModes } from "../..";
import SiteContext from "../../siteContext";
import Menu from "../EditMenu/EditMenu";
import MobileBoundary from "./MobileBoundary";
import HelpDesk from "../EditMenu/HelpDesk";
import {
  UndoIcon,
  RedoIcon,
  EditIcon,
  HelpIcon,
  SaveIcon,
  CloseIcon,
} from "./EditorIcons";
export default function VisibleEditor(props) {
  if (props.immutable) return <></>;

  const siteData = useContext(SiteContext);
  const {
    items,
    selected,
    setSelected,
    mode,
    setModal,
    pressedKeys,
    setControlPanel,
  } = siteData;

  const { pastItems, setPastItems, undoCount, setUndoCount, setItems } = props;

  function undo(e: React.MouseEvent<HTMLElement>) {
    if (pastItems.length - undoCount - 1 <= 0) return;
    setItems(pastItems[pastItems.length - 1 - (undoCount + 1)]);
    setUndoCount(undoCount + 1);

    e?.stopPropagation();
    // analytics.track('editor_undo');
  }

  function redo(e: React.MouseEvent<HTMLElement>) {
    if (undoCount <= 0) return;

    console.log("redo");
    setItems(pastItems[pastItems.length - 1 - (undoCount - 1)]);
    setUndoCount(undoCount - 1);

    e?.stopPropagation();
    // analytics.track('editor_redo');
  }

  const deleteItem = (items, id) => {
    delete items[id];
    setControlPanel(null);
  };

  const moveItem = (axis, delta) => {
    return (items, id) => {
      const item = items[id];
      if (item) {
        item.pos[axis] += delta;
      }
    };
  };

  function showHelp(e: React.MouseEvent<HTMLElement>) {
    setModal(<HelpDesk />);
    e?.stopPropagation();
  }

  //// KEYBOARD SHORTCUTS ////
  useEffect(() => {
    if (mode !== EditorModes.EDIT) return;

    const newItems = { ...items };

    const performAction = (action) => {
      selected.forEach((id) => {
        action(newItems, id);
      });
      setItems(newItems);
    };

    const conditions = [
      {
        condition:
          pressedKeys.includes("Backspace") || pressedKeys.includes("Delete"),
        action: () => performAction(deleteItem),
      },
      {
        condition: pressedKeys.includes("Escape"),
        action: () => setSelected([]),
      },
      {
        condition: pressedKeys.includes("z") && pressedKeys.includes("Control"),
        action: () => undo(null),
      },
      {
        condition: pressedKeys.includes("y") && pressedKeys.includes("Control"),
        action: () => redo(null),
      },
      {
        condition: pressedKeys.includes("ArrowUp"),
        action: () => performAction(moveItem("y", -1)),
      },
      {
        condition: pressedKeys.includes("ArrowDown"),
        action: () => performAction(moveItem("y", 1)),
      },
      {
        condition: pressedKeys.includes("ArrowLeft"),
        action: () => performAction(moveItem("x", -1)),
      },
      {
        condition: pressedKeys.includes("ArrowRight"),
        action: () => performAction(moveItem("x", 1)),
      },
    ];

    conditions.forEach(({ condition, action }) => {
      if (condition) {
        action();
      }
    });
  }, [pressedKeys]);

  return (
    <div
      data-theme={
        "winter"
        // items["style"]?.theme
      }
    >
      {props.children}
      {mode == EditorModes.EDIT && selected[0]?.length > 20 && (
        <MobileBoundary />
      )}
      {mode == EditorModes.EDIT && pastItems.length > 1 && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            padding: "10px",
            zIndex: 99999998,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {pastItems.length - undoCount - 1 > 0 ? (
            <PanelButton onClick={undo}>
              <UndoIcon />
            </PanelButton>
          ) : (
            <div style={{ width: 52 }} />
          )}
          <div style={{ padding: "6px" }} />
          {undoCount > 0 && (
            <PanelButton onClick={redo}>
              <RedoIcon />
            </PanelButton>
          )}
        </div>
      )}

      {
        <div
          className={"pointer-events-none"}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            padding: "10px",
            zIndex: 99999998,
          }}
        >
          <div className="flex flex-col" style={{ alignItems: "flex-end" }}>
            {mode == EditorModes.EDIT && <Menu selected={selected} />}

            <div style={{ padding: 5 }}></div>

            {mode == EditorModes.VIEW ? (
              <PanelButton onClick={props.onEditClicked}>
                EDIT <EditIcon />
              </PanelButton>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <PanelButton onClick={showHelp} data-tip="Help Center">
                  <HelpIcon className="w-6 h-6" />
                </PanelButton>
                <div style={{ padding: 5 }}></div>
                <PanelButton
                  onClick={props.onDiscardClicked}
                  data-tip="Discard changes"
                >
                  <CloseIcon className="w-3 h-5" />
                </PanelButton>
                <div style={{ padding: 5 }}></div>
                <PanelButton onClick={props.onSaveClicked}>
                  SAVE <SaveIcon />
                </PanelButton>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
}

const PanelButton = (props) => (
  <button
    className="btn btn-sm tooltip flex flex-row pointer-events-auto shadow"
    {...props}
  >
    {props.children}
  </button>
);
