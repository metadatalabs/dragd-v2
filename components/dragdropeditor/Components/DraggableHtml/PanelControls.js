import { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import analytics from "../../../../util/analytics";
import SiteContext from "../../siteContext";

export default function PanelControls({ id }) {
  const { items, onUpdateDiv, setModal } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  return (
    <>
      <div>
        <button
          className="btn"
          onClick={() => {
            setModal(
              <CodeEditor
                elemData={elemData}
                onLocalUpdate={onLocalUpdate}
                setModal={setModal}
              />
            );
          }}
        >
          Edit Code
        </button>
      </div>
    </>
  );
}

function CodeEditor({ elemData, onLocalUpdate, setModal }) {
  const [fileType, setFileType] = useState(elemData.subtype || "html");
  const [code, setCode] = useState(elemData.text);

  const languages = { md: "markdown", html: "html" };

  return (
    <>
      <div style={{ width: "95vw", maxWidth: "70vw" }}>
        <div className="flex flex-row justify-between w-full">
          <div>Code Editor</div>
          <div
            style={{
              fontSize: "1.6rem",
              cursor: "pointer",
            }}
            onClick={() => {
              setModal(null);
            }}
          >
            x
          </div>
        </div>

        <div style={{ marginTop: "10px" }} />

        <div className="flex flex-col md:flex-row md:space-x-2">
          <div id="editor-container" className="h-96 w-full md:w-3/6">
            <Editor
              key={fileType}
              height="100%"
              width="100%"
              defaultLanguage={languages[fileType]}
              defaultValue={code}
              theme="vs-dark"
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onChange={(v, e) => {
                let data = {};
                if (fileType === "html") {
                  data = { text: v, subtype: "html" };
                }
                setCode(v);
                // console.log(data);
                // onLocalUpdate(data);
              }}
            />
          </div>
          <div className="bg-slate-200 w-full md:w-3/6 p-2 rounded-md">
            <div className="w-full text-left">Preview:</div>
            <div
              className="flex flex-col items-center justify-center w-full h-full"
              dangerouslySetInnerHTML={{ __html: code }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-end">
        <input
          className="btn"
          type="button"
          value="Save"
          onClick={() => {
            onLocalUpdate({ text: code, subtype: "html" });
            setModal(null);
          }}
        />
      </div>
    </>
  );
}
