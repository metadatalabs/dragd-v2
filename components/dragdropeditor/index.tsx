import React, { useState, useEffect, useCallback } from "react";
import ComponentSelector from "./Components/ComponentSelector";
import { mergeDeep, debounce, guidGenerator } from "./helpers/helper";
import SiteContext from "./siteContext";
import BCLogo from "./helpers/ui/BCLogo";
import analytics from "../../util/analytics";
import VisibleCanvas from "./Components/DDEditor/VisibleCanvas";
import VisibleEditor from "./Components/DDEditor/VisibleEditor";
import GenericModal from "../UI/GenericModal";

export enum EditorModes {
  EDIT = "edit",
  VIEW = "view",
}

function BCDragDrop({
  immutable,
  saveCallback,
  onChangedCallback,
  initialState,
  pending,
}: DragDropEditorProps) {
  const [items, setItems] = useState(initialState || {});
  const [pastItems, setPastItems] = useState([initialState || {}]);
  const [undoCount, setUndoCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [pageHeight, setPageHeight] = useState(0);
  const [mode, setMode] = useState(EditorModes.VIEW);
  const [modal, setModal] = useState(null);
  const [controlPanel, setControlPanel] = useState(null);

  useEffect(() => {
    setSelected([]);
  }, [mode]);

  function addItemToList(data: elemItem, id?: string) {
    const currentScrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;
    var newItem: elemItem = {
      id: id || guidGenerator(),
      pos: { x: 0, y: currentScrollPos + 200 },
      rot: { deg: 0 },
      zIndex: 10000 + Object.keys(items).length,
      type: "text",
      ...data,
    };
    const updatedItems = { ...items, [newItem.id]: newItem };
    setItems(updatedItems);
    debounceElemdataHistoryUpdate(pastItems, updatedItems, undoCount);
    setSelected([newItem.id]);
  }

  function deleteItemFromList(key: string) {
    var newItems = items;
    newItems[key] && delete newItems[key];
    setItems(newItems);
    debounceElemdataHistoryUpdate(pastItems, newItems, undoCount);
    setSelected([]);
  }

  const debounceElemdataHistoryUpdate = useCallback(
    debounce((oldItemsList, newItem, undoCount) => {
      if (undoCount > 0) {
        setPastItems([...oldItemsList.slice(0, -undoCount), newItem]);
        setUndoCount(0);
      } else {
        setPastItems([...oldItemsList, newItem]);
      }
      onChangedCallback && onChangedCallback(newItem);
    }, 20),
    []
  );

  function onUpdateDiv(divId: string, newProps: elemItem) {
    var oldItems = items[divId] || {};
    const updatedItems = {
      ...items,
      [divId]: { ...mergeDeep(oldItems, newProps) },
    };
    debounceElemdataHistoryUpdate(pastItems, updatedItems, undoCount);
    setItems(updatedItems);
  }

  function onUpdateSelected(newProps: elemItem["pos"]) {
    var oldItems = items || {};
    var updatedItems = { ...oldItems };
    selected.forEach((selectedItemId) => {
      // apply newprops to all selected items
      var selectedItem = items[selectedItemId];
      var newPos = {
        ...selectedItem?.pos,
        x: selectedItem?.pos?.x - newProps.x,
        y: selectedItem?.pos?.y - newProps.y,
      };
      updatedItems[selectedItemId] = {
        ...mergeDeep(oldItems[selectedItemId], { pos: newPos }),
      };
    });
    setItems(updatedItems);
  }

  const setItemSelected = (itemId: string) => {
    if (itemId == "bg") setSelected([]);
    else if (!pressedKeys.includes("Shift")) setSelected([itemId]);
    else if (selected?.find((i) => i == itemId)) {
      setSelected([...selected.filter((i) => i != itemId)]);
    } else {
      setSelected([...selected, itemId]);
    }
  };

  function onSaveClicked() {
    if (!immutable) {
      setMode(EditorModes.VIEW);
      saveCallback?.(items);
      // analytics.track('editor_save');
    }
  }

  function onEditClicked() {
    setMode(EditorModes.EDIT);
    // analytics.track('editor_edit');
  }

  const providerValues: DragDropEditorContext = {
    items: items,
    selected: selected,
    setSelected: setItemSelected,
    deleteItemFromList: deleteItemFromList,
    addItemToList: addItemToList,
    onUpdateDiv: onUpdateDiv,
    onUpdateSelected: onUpdateSelected,
    mode: mode,
    setModal: setModal,
    pressedKeys: pressedKeys,
    pageHeight,
    setPageHeight,
    setControlPanel,
    controlPanel,
  };

  return (
    <SiteContext.Provider value={providerValues}>
      <VisibleCanvas
        setSelectedItems={setSelected}
        setPressedKeys={setPressedKeys}
      >
        {Object.keys(items).map((key) => {
          var elem = items[key];
          if (elem.pos?.y + elem.size?.height / 2 > pageHeight) {
            setPageHeight(elem.pos.y + elem.size?.height / 2);
          }
          return (
            <ComponentSelector
              elem={elem}
              key={elem.id + "_component"}
              selected={selected}
            />
          );
        })}
      </VisibleCanvas>

      <VisibleEditor
        immutable={immutable}
        initialState={initialState}
        onEditClicked={onEditClicked}
        onSaveClicked={onSaveClicked}
        setItems={setItems}
        undoCount={undoCount}
        setUndoCount={setUndoCount}
        pastItems={pastItems}
        setPastItems={setPastItems}
      ></VisibleEditor>
      <aside>
        <BCLogo pending={pending} />
      </aside>
      {modal && (
        <GenericModal
          onDone={() => {
            setModal(null);
          }}
        >
          {modal}
        </GenericModal>
      )}
    </SiteContext.Provider>
  );
}

export default BCDragDrop;
