const { useState, useEffect, useContext } = require("react");
import { Input } from "../../helpers/helper";
import ColorPicker from "../../helpers/ui/ColorPicker";
import SiteContext from "../../siteContext";
import StylePanelControls, { TabSwitcher } from "../EditMenu/StyleControlPanel";
import { useNetwork, useSwitchNetwork } from "wagmi";

export default function PanelControls({ id, setPanelControls = () => {} }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);
  const { chains } = useSwitchNetwork();

  return (
    <TabSwitcher
      tabs={[
        <>
          <div key={elemData.id}>
            <label className="label">
              <span className="label-text">Payment Address</span>
            </label>
            <input
              type="text"
              defaultValue={elemData.paymentAddress}
              onChange={(e) => {
                onLocalUpdate({ paymentAddress: e.target.value });
              }}
              disabled={true}
              placeholder={"0x000..."}
              className="input input-bordered"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                className="checkbox"
                checked={elemData.testMode}
                onChange={(e) =>
                  onLocalUpdate({
                    testMode: e.target.checked,
                  })
                }
              />

              <label className="label">
                <span className="label-text">Test Mode</span>
              </label>
            </div>

            <label className="label">
              <span className="label-text">Payment Network</span>
            </label>
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                {elemData?.paymentNetwork?.name || "Select a Network"}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {chains.map((x) => (
                  <button
                    // disabled={!switchNetwork || x.id === chain?.id}
                    key={x.id}
                    onClick={() => {
                      onLocalUpdate({ paymentNetwork: x });
                    }}
                  >
                    <li>
                      <a>{x.name}</a>
                    </li>
                  </button>
                ))}
              </ul>
            </div>

            <label className="label">
              <span className="label-text">Payment Amount</span>
            </label>
            <input
              type="number"
              step={0.01}
              defaultValue={elemData.amountToSend}
              onChange={(e) => {
                onLocalUpdate({ amountToSend: e.target.value });
              }}
              placeholder={"Amount to Pay"}
              className="input input-bordered"
            />

            <label className="label">
              <span className="label-text">Button Label</span>
            </label>
            <input
              type="text"
              defaultValue={elemData.label}
              onChange={(e) => {
                onLocalUpdate({ label: e.target.value });
              }}
              placeholder={"Button Label"}
              className="input input-bordered"
              key={elemData.id + "-input"}
            />

            <>
              <label className="label">
                <span className="label-text">Post Payment Hook</span>
              </label>
              <input
                key={"link"}
                type="text"
                className="input input-bordered"
                value={elemData.postTxnHook}
                placeholder="function()"
                onChange={(e) => {
                  onLocalUpdate({ postTxnHook: e.target.value });
                }}
              ></input>
            </>
          </div>
        </>,
        <StylePanelControls id={id} />,
      ]}
      tabicons={["Properties", "Style"]}
    />
  );
}
