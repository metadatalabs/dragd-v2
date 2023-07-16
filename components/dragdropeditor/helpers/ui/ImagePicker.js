export default function FilePicker({ selected, setSelected }) {
  return (
    <div className="inline-block bg-base-100 p-2">
      <div className="flex justify-center">
        <input
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          className="input input-bordered input-sm w-32 mr-2"
        ></input>
        <button
          className={"btn btn-square btn-sm btn-outline"}
          onClick={() => {
            loadImageToUri(setSelected);
          }}
        >
          <img className="h-6 w-6" src="https://i.imgur.com/rFn3Kjx.png" />
        </button>
      </div>

      {selected && (
        <div className="flex justify-center bg-gray-200">
          <div className="flex flex-row w-24 h-24">
            <img src={selected} className="w-full"></img>

            <button
              className="btn btn-xs btn-circle btn-ghost -ml-4 w-4 h-4 min-"
              onClick={() => {
                setSelected(undefined);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    // @ts-expect-error TODO: getContext exists on canvas, investigate
    var ctx = canvas.getContext("2d");
    var dataURL;
    // @ts-expect-error TODO: naturalHeight exists on canvas, investigate
    canvas.height = this.naturalHeight;
    // @ts-expect-error TODO: naturalWidth exists on canvas, investigate
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    // @ts-expect-error TODO: toDateURL exists on canvas, investigate
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    return dataURL;
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

export async function loadImageToUri(callback) {
  // @ts-expect-error TODO: window fs access not allowed in strict
  try {
    const [file] = await window.showOpenFilePicker();
    const locFile = await file.getFile();
    console.log(locFile);
    const stream = await locFile.arrayBuffer();
    console.log(stream);
    var blob = new Blob([stream], { type: locFile.type });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    toDataURL(
      imageUrl,
      (dataUrl) => {
        console.log("converted to ", dataUrl);
        callback(dataUrl);
      },
      locFile.type
    );
  } catch (e) {}
}
