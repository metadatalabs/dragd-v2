import React, { useState } from "react";
import { CopyIcon } from "../dragdropeditor/Components/DDEditor/EditorIcons";
export default function CopyToClipboard({ textToCopy = "Copy default" }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };

  const btnStyle = copied ? "bg-gray-500 text-red" : "";

  return (
    <button
      onClick={copyToClipboard}
      className={btnStyle + "flex flex-row items-center rounded transition"}
    >
      {copied ? "Copied" : <CopyIcon className={"h-4"} />}
    </button>
  );
}
