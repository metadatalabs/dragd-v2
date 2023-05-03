import React from "react";
import { createSite, getSites } from "/components/DataProvider";
import GenericModal from "../UI/GenericModal";
import { ErrorText } from "../ui-helpers";
import { useRouter } from "next/navigation";

export default function NewSiteModal({ site, onComplete }) {
  const router = useRouter();
  const [pageName, setPageName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const createSiteSubmit = async () => {
    setLoading(true);
    var query = createSite({ siteName: site, pageName: pageName });
    query
      .then((result) => {
        const site = result.site;
        // router.push("/" + site.siteName + "/" + site.pageName);
        window.location = "/" + site.siteName + "/" + site.pageName;
        onComplete();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <GenericModal onDone={() => onComplete()}>
      <div className={"flex flex-col w-full"}>
        <center className={"text-2xl"}>Create a new page</center>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Page Name</span>
          </label>
          <label className="input-group border border-neutral rounded-lg">
            <span className="pr-0 bg-base-100">dra.gd/{site}/</span>
            <input
              placeholder="gallery"
              type="text"
              value={pageName}
              onChange={(e) => {
                setPageName(e.target.value);
              }}
              className="input w-full pl-1"
            />
            <span className="bg-base-100">
              <RandomSelector
                onSelect={(value) => {
                  setPageName(value);
                }}
              />
            </span>
          </label>
        </div>

        <button
          className={`btn mt-4 ${loading ? `loading` : ``}`}
          disabled={loading}
          onClick={async () => createSiteSubmit()}
        >
          Create
        </button>
        {error && <ErrorText>{error}</ErrorText>}
      </div>
    </GenericModal>
  );
}

const RandomSelector = React.memo(({ onSelect }) => {
  return (
    <div className={"flex flex-row text-xs font-thin justify-center"}>
      {["donate", "gallery", "blog"].map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              onSelect(item);
            }}
            className={"rounded-full hover:outline mx-1 px-1"}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
});
