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
        <div className="w-full -mt-4 mb-2 ">
          <div className="card-title text-md">Enter wallet address</div>
          <div className="join w-full py-2">
            <input
              type="text"
              placeholder="0xbb8d...."
              style={{ fontFamily: "Courier New" }}
              className={`input input-bordered grow join-item ${
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
              className={"btn btn-square join-item"}
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
              →
            </button>
          </div>
          <p className="text-sm">You will receive payments on this address.</p>
        </div>
      </div>
    </>
  );
}
