import { useRef, useState } from "react";
import { Row } from "../../helpers/helper";

const walletRegex = /^0x[a-fA-F0-9]{40}$/;

export function PaymentSelector(props) {
  const inputRef = useRef(null);
  const [value, setValue] = useState(null);

  // test value using regex to see if it is a valid url
  const isValidWallet = walletRegex.test(value);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="form-control w-full -mt-4 mb-2">
          <label className="label">
            <span className="label-text">Enter payment address</span>
          </label>
          <label className="input-group w-full">
            <input
              type="text"
              placeholder="0xbb8d...."
              style={{ fontFamily: "Courier New" }}
              className={`input input-bordered grow ${
                isValidWallet ? "text-green-500" : "text-red-500"
              }`}
              ref={inputRef}
              autoFocus={true}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button
              className={"btn btn-square"}
              disabled={isValidWallet ? false : true}
              onClick={() => {
                props.addItemToList({
                  type: "payButton",
                  size: {
                    width: 200,
                    height: 50,
                  },
                  paymentAddress: value,
                });
                props.close();
              }}
            >
              Add
            </button>
          </label>
        </div>
      </div>
    </>
  );
}
