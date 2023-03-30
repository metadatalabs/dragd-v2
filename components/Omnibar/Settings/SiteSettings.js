import React, { useState } from "react";
import {
  deployToIPFS,
  invalidateSiteBuildCache,
  useSiteBuildByName,
} from "../../DataProvider";
import { LinkIcon } from "../../ui-helpers";
export const DeployToIpfs = ({ siteData }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { data: buildData, isLoading: buildDataLoading } = useSiteBuildByName(
    siteData.siteName
  );

  const siteBuildData = buildData?.data[0];

  const deployIpfs = async () => {
    setLoading(true);
    var query = deployToIPFS(siteData._id);

    query
      .then((result) => {
        setError(null);
        setLoading(false);
        invalidateSiteBuildCache(siteData.siteName);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      {siteBuildData && (
        <>
          {siteBuildData.status && (
            <div className="p-4">
              {siteBuildData.status == "deployed" ? (
                <a
                  href={`https://${siteBuildData.cid}.ipfs.w3s.link`}
                  target="_blank"
                >
                  <div className={`badge badge-success h-auto`}>
                    Deployed to IPFS <LinkIcon />
                  </div>
                </a>
              ) : (
                <div className="badge badge-warning">
                  In Progress
                  <button
                    onClick={() => {
                      invalidateSiteBuildCache(siteData.siteName);
                    }}
                  >
                    🔄
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="form-control mt-4">
        {/* <label className="label">
              <span className="label-text">Deploy to IPFS</span>
          </label> */}
        <button
          onClick={async () => deployIpfs()}
          className={`btn sm:btn-sm md:btn-md ${loading ? "loading" : ""}`}
        >
          Publish To IPFS
        </button>
      </div>

      {error && <ErrorText>{error}</ErrorText>}

      {siteBuildData && (
        <>
          <div
            tabIndex={0}
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              Publish History
            </div>
            <div className="collapse-content">
              {siteBuildData.buildCIDs.map((cid, index) => (
                <p
                  className={`text-left p-1 ${
                    index % 2 == 0 ? "bg-base-100" : "bg-base-200"
                  }`}
                  key={index}
                >
                  {cid}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
