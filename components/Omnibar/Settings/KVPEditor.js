import { useContext, useEffect, useState } from "react";

const KVPEditor = ({ initialObject = {}, onSubmit, loading }) => {
  const [inMemoryObject, setInMemoryObject] = useState(initialObject);
  return (
    <>
      <div className="flex flex-col">
        <div className="form-control">
          {Object.keys(inMemoryObject).map((item, index) => {
            return (
              <label key={"head-" + index} className="">
                <input
                  type="text"
                  className="input input-xs input-bordered rounded-none"
                  placeholder="key"
                  value={item}
                  onChange={(e) => {
                    let result = renameObjKey(
                      inMemoryObject,
                      item,
                      e.target.value
                    );
                    setInMemoryObject(result);
                  }}
                />
                <input
                  type="text"
                  className="input input-xs input-bordered rounded-none"
                  placeholder="value"
                  value={inMemoryObject[item]}
                  onChange={(e) => {
                    var newHead = { ...inMemoryObject };
                    newHead[item] = e.target.value;
                    setInMemoryObject(newHead);
                  }}
                />
                <button
                  className="btn btn-ghost btn-outline btn-xs rounded-none text-red-500"
                  onClick={() => {
                    var newHead = { ...inMemoryObject };
                    delete newHead[item];
                    setInMemoryObject(newHead);
                  }}
                >
                  -
                </button>
              </label>
            );
          })}
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              setInMemoryObject({
                ...inMemoryObject,
                ["key-" + Object.keys(inMemoryObject).length]: "",
              });
            }}
            className={`btn btn-ghost btn-outline btn-xs mt-2`}
          >
            Add Field
          </button>
          <button
            disabled={inMemoryObject == initialObject}
            onClick={() => onSubmit(inMemoryObject)}
            className={`btn btn-outline btn-xs mt-2 px-8 ${
              loading ? "loading" : ""
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

const renameObjKey = (oldObj, oldKey, newKey) => {
  const keys = Object.keys(oldObj);
  const newObj = keys.reduce((acc, val) => {
    if (val === oldKey) {
      acc[newKey] = oldObj[oldKey];
    } else {
      acc[val] = oldObj[val];
    }
    return acc;
  }, {});

  return newObj;
};
export default KVPEditor;
