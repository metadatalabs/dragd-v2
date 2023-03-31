interface DragDropEditorContext {
  items: ElemItemArray;
  selected: string[];
  setSelected: (string) => void;
  deleteItemFromList: (string) => void;
  addItemToList: (any) => void;
  onUpdateDiv: (string, any) => void;
  onUpdateSelected: (any) => void;
  mode: EditorModes;
  setModal: any;
  pressedKeys: string[];
  pageHeight: number;
  setPageHeight: (number) => void;
  setControlPanel: (any) => void;
  controlPanel: any;
}

interface DragDropEditorProps {
  immutable: boolean;
  saveCallback: (data: ElemItemArray) => void;
  onChangedCallback: (data: ElemItemArray) => void;
  initialState: ElemItemArray;
  pending: boolean;
  children: any;
}

type elemItem = {
  [x: string]: any;
  id?: string;
  pos?: { x: number; y: number };
  size?: { width: number; height: number };
  rot?: object;
  zIndex?: number;
  type?: string;
};

type ElemItemArray = { [key: string]: elemItem };
