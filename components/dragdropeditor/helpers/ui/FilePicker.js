export default function FilePicker({ selected, setSelected }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center w-full">
        <input
          value={selected}
          className="input input-bordered input-sm"
        ></input>
        <button
          className={"btn btn-ghost btn-sm btn-outline"}
          onClick={() => {
            loadImageToUri(setSelected);
          }}
        >
          <img className="h-6 w-6" src="https://i.imgur.com/rFn3Kjx.png" />
        </button>
      </div>

      <div className="w-24 h-24 m-2 bg-gray-200">
        <img src={selected} className="w-full"></img>
      </div>
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
