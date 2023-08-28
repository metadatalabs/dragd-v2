import React, { useContext, useState } from "react";
import SiteContext from "../../siteContext";
import EditItem from "../DDEditor/EditItem";
import StylePanelControls, { TabSwitcher } from "../EditMenu/StyleControlPanel";

function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const { form, submitEmail } = elemData;
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  return (
    <TabSwitcher
      tabs={[
        <>
          <div className="flex flex-col">
            <div>Form</div>
            <div className="flex flex-col gap-y-2">
              {form?.inputs.map((input, index) => {
                return (
                  <div>
                    <input
                      className="input input-bordered input-sm max-w-full"
                      placeholder={"Field Name"}
                      value={input.label}
                      onChange={(e) => {
                        var newInputs = form?.inputs || [];
                        newInputs[index].label = e.target.value;
                        onLocalUpdate({ form: { inputs: newInputs } });
                      }}
                    ></input>
                  </div>
                );
              })}

              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  var newField = {
                    type: "text",
                    name: "name",
                    label: "Name",
                    required: true,
                  };
                  var oldInputs = form?.inputs || [];
                  onLocalUpdate({
                    form: { inputs: [...oldInputs, newField] },
                  });
                }}
              >
                Add Field
              </button>

              <input
                className="input input-bordered input-sm max-w-full"
                placeholder={"Submission Email"}
                value={submitEmail}
                onChange={(e) => {
                  onLocalUpdate({ submitEmail: e.target.value });
                }}
              ></input>
            </div>
          </div>
        </>,
        <StylePanelControls id={id} />,
      ]}
      tabicons={["Properties", "Style"]}
    />
  );
}

function DraggableForm(props) {
  const { elemData, selected } = props;
  const { form, submitEmail } = elemData;
  const siteData = useContext(SiteContext);
  const { setSelected: onSelect, onUpdateDiv: onUpdated, mode } = siteData;

  return (
    <>
      <EditItem
        elemData={elemData}
        onSelect={onSelect}
        onUpdated={onUpdated}
        selected={props.selected}
        renderPanel={PanelControls}
        mode={mode}
      >
        <form
          action={`https://formsubmit.co/${submitEmail}`}
          method="POST"
          style={{
            ...elemData.style,
          }}
        >
          <div className="flex flex-col gap-y-2">
            {form?.inputs?.map((input) => {
              return (
                <input
                  className="input input-bordered input-sm max-w-full"
                  placeholder={input.label}
                  type={input.type}
                  name={input.name}
                  required={input.required}
                ></input>
              );
            })}
          </div>
          <div className="w-full py-2">
            <button className="btn btn-sm btn-primary w-full" type="submit">
              Send
            </button>
          </div>
        </form>
      </EditItem>
    </>
  );
}

export default DraggableForm;
