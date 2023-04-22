import React, { useState } from "react";
import {
  deployToIPFS,
  invalidateSiteBuildCache,
  useSiteBuildByName,
} from "../../DataProvider";
import { ErrorText, GetShortenedString, LinkIcon } from "../../ui-helpers";
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
      <div className="overflow-x-auto w-full">
        <div className="flex flex-row justify-between items-center py-4 border-b">
          <div className="text-xl font-bold">Permaweb</div>
          <button
            onClick={async () => deployIpfs()}
            className={`btn sm:btn-sm md:btn-md ${loading ? "loading" : ""}`}
          >
            Publish To IPFS
          </button>
        </div>
        <table className="table w-full">
          <tbody>
            {/* row 1 */}
            {siteBuildData?.cid && (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">IPFS</div>
                    </div>
                  </div>
                </td>
                <td>
                  {GetShortenedString(siteBuildData.cid, 10)}
                  <br />
                </td>
                <th>
                  {siteBuildData.status == "deployed" ? (
                    <a
                      href={`https://ipfs.io/ipfs/${siteBuildData.cid}`}
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
                </th>
              </tr>
            )}

            {/* row 1 */}
            {siteBuildData?.ipns && (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">IPNS</div>
                    </div>
                  </div>
                </td>
                <td>{GetShortenedString(siteBuildData.ipns)}</td>
                <th>
                  {siteBuildData.ipns && (
                    <a
                      href={`https://ipfs.io/ipns/${siteBuildData.ipns}`}
                      target="_blank"
                    >
                      <div className={`badge badge-success h-auto`}>
                        Deployed to IPNS <LinkIcon />
                      </div>
                    </a>
                  )}
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && <ErrorText>{error}</ErrorText>}

      {siteBuildData && (
        <>
          <CIDViewer siteBuildData={siteBuildData} />
        </>
      )}
    </>
  );
};

const CIDViewer = ({ siteBuildData }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      tabIndex={0}
      className={`collapse ${
        collapsed ? "collapse-open" : "collapse-close"
      } collapse-plus border border-base-300 bg-base-100 rounded-box`}
    >
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="collapse-title text-xl font-medium cursor-pointer"
      >
        Publish History
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>CID</th>
                <th>DATE</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {siteBuildData.buildCIDs.map((cid, index) => (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      {/* <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div> */}
                      <div>
                        <div className="font-bold">
                          {GetShortenedString(cid)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>{" "}
                  </td>
                  <th>
                    <a
                      className="p-1"
                      href={`https://ipfs.io/ipfs/${cid}`}
                      target="_blank"
                    >
                      <LinkIcon />
                    </a>
                  </th>{" "}
                  <th>
                    <a
                      className="p-1"
                      href={`https://ipfs.io/ipfs/${cid}`}
                      target="_blank"
                    >
                      <LinkIcon />
                    </a>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
