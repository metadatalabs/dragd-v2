import { useRef, useState } from "react";
import { Row } from "../../helpers/helper";

const linkRegEx = new RegExp(
  /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
);

export function ButtonSelector(props) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("https://");

  // test value using regex to see if it is a valid url
  const isValidUrl = linkRegEx.test(value);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="form-control w-full -mt-4 mb-2">
          <label className="label">
            <span className="label-text">Open a Link</span>
          </label>
          <label className="input-group w-full">
            <input
              type="text"
              placeholder="Type here"
              style={{ fontFamily: "Courier New" }}
              className={`input input-bordered grow ${
                isValidUrl ? "text-green-500" : "text-red-500"
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
              disabled={isValidUrl ? false : true}
              onClick={() => {
                props.addItemToList({
                  type: "button",
                  size: {
                    width: 200,
                    height: 50,
                  },
                  url: value,
                });
                props.close();
              }}
            >
              Add
            </button>
          </label>
        </div>
      </div>
      <div className="flex flex-row overflow-y-none justify-center gap-x-2 sm:w-screen md:w-96">
        {[
          ["https://", "#", "Any Link"],
          ["https://opensea.com/", "OS", "Opensea"],
          ["https://etherscan.com/", "ES", "Etherscan"],
          ["https://discord.gg/", "D", "Discord"],
          ["https://www.youtube.com/channel/", "YT", "Youtube"],
          ["https://twitter.com/", "T", "Twitter"],
        ].map((elem) => {
          return (
            <div className="tooltip" data-tip={elem[2]}>
              <div
                className={
                  "bg-base-300 rounded-md flex align-center justify-center"
                }
                style={{ width: "30px", height: "20px" }}
                onClick={() => {
                  setValue(elem[0]);
                  inputRef.current?.focus();
                }}
              >
                {elem[1]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="divider">OR</div>
      <button
        className={"btn"}
        onClick={() => {
          props.addItemToList({
            type: "button",
            size: {
              width: 200,
              height: 50,
            },
            label: "Connect Wallet",
            variant: "function",
            function: "showAuthModal()",
          });
          props.close();
        }}
      >
        Javascript Function
      </button>
    </>
  );
}
