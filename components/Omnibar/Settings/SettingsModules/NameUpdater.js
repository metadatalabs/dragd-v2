import { useRouter } from "next/router";
import React from "react";
import { GetShortenedString } from "../../../ui-helpers";

export default function NameUpdater({ siteData }) {
  const router = useRouter();

  const [pageName, setPageName] = React.useState(siteData.pageName);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const updateSiteSubmit = async () => {
    setLoading(true);
    const updatedSite = {
      ...siteData,
      pageName,
    };

    var query = updateSite(siteData._id, updatedSite);

    query
      .then((result) => {
        setError(null);
        setLoading(false);
        router.push(updatedSite.siteName + "/" + updatedSite.pageName);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="w-full">
        <label className="input-group input-group-sm flex flex-row justify-center">
          <span className="input input-bordered input-sm">
            {GetShortenedString(siteData.siteName, 10)}/
          </span>
          <input
            type="text"
            className="input input-bordered input-sm"
            placeholder="your page name"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          {pageName != siteData.pageName ? (
            <button
              onClick={async () => updateSiteSubmit()}
              className={`btn btn-sm ${loading ? "loading" : ""}`}
            >
              Save
            </button>
          ) : null}
        </label>
      </div>

      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
}
