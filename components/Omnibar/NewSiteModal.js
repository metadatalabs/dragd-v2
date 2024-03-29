import React from "react";
import { createSite, getSites } from "../../components/DataProvider";
import GenericModal from "../UI/GenericModal";
import { DownChevron, ErrorText } from "../ui-helpers";
import { useRouter } from "next/navigation";
import { useSitesByOwner } from "../DataProvider";

export default function NewSiteModal({ site, onComplete }) {
  const router = useRouter();
  const {
    data: siteListData,
    status: itemsStatus,
    error: itemsError,
  } = useSitesByOwner();

  const uniqueSites = siteListData?.data?.reduce((acc, item) => {
    if (!acc[item.siteName]) {
      acc[item.siteName] = [];
    }
    acc[item.siteName].push(item);
    return acc;
  }, {});

  const [siteName, setSiteName] = React.useState(site);
  const [newSiteName, setNewSiteName] = React.useState(undefined);
  const [pageName, setPageName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const createSiteSubmit = async () => {
    setLoading(true);
    var query = createSite({ siteName: siteName, pageName: pageName });
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
        <div className="form-control text-md">
          <label className="label">Page Name</label>
          <label className="input-group border border-neutral rounded-lg">
            <span className="bg-transparent pr-0">dra.gd/</span>
            {/* dropdown for site name */}
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn w-auto border-none bg-base-100 hover:bg-base-200"
              >
                <div className="flex flex-row text-black">
                  <span className="bg-transparent p-0">{siteName} </span>
                  <DownChevron />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto"
              >
                {Object.keys(uniqueSites).map((site) => {
                  return (
                    <li key={site}>
                      <a
                        className={`${site == siteName && "bg-base-200"}`}
                        onClick={() => {
                          setSiteName(site);
                        }}
                      >
                        {site}
                      </a>
                    </li>
                  );
                })}
                {/* <li>
                  <div className="flex flex-row">
                    <input
                      placeholder="create a new site"
                      type="text"
                      value={newSiteName}
                      onChange={(e) => {
                        setNewSiteName(e.target.value.replace(" ", "-"));
                      }}
                      className="input w-full pl-1"
                    />
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        // todo:
                        // check availability first and then do this
                        if (!newSiteName) return;
                        setSiteName(newSiteName);
                      }}
                    >
                      Check <br />
                      Availability
                    </button>
                  </div>
                </li> */}
              </ul>
            </div>

            <span className={"p-0 bg-transparent"}>/</span>
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
