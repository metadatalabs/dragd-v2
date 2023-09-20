import React, { useState } from "react";
import {
  deployToIPFS,
  invalidateSiteBuildCache,
  useSiteBuildByName,
} from "../../DataProvider";
import { ErrorText, GetShortenedString, LinkIcon } from "../../ui-helpers";
import {
  CopyIcon,
  TickIcon,
} from "../../dragdropeditor/Components/DDEditor/EditorIcons";
import CopyToClipboard from "../../UI/CopyToClipboard";
import dynamic from "next/dynamic";
import { timeDiff } from "../../dragdropeditor/helpers/helper";
const SetENSResolver = dynamic(() =>
  import("./SettingsModules/SetENSResolver")
);

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
      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-2 text-left">
          <div className="card card-compact border bg-base-200">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-left">Permaweb</div>
                {siteBuildData && (
                  <button
                    onClick={async () => deployIpfs()}
                    className={`btn btn-sm ml-4 ${loading ? "loading" : ""}`}
                  >
                    Publish
                  </button>
                )}
              </div>
              <div className="text-xs opacity-50 -mt-2">
                {siteBuildData?.buildCIDs?.[0]?.timestamp &&
                  `Last published ${timeDiff(
                    new Date(siteBuildData.buildCIDs[0].timestamp)
                  )} ago`}
              </div>

              {!siteBuildData && (
                <button
                  onClick={async () => deployIpfs()}
                  className={`btn btn-sm ${loading ? "loading" : ""}`}
                >
                  Publish to Permaweb
                </button>
              )}

              {siteBuildData?.ipns && (
                <div className="flex flex-row justify-between  items-center">
                  <h2>IPNS</h2>
                  <div>
                    <tr>
                      {/* <td>{GetShortenedString(siteBuildData.ipns)}</td> */}
                      <th>
                        {siteBuildData?.ipns && (
                          <div
                            className={`flex flex-row items-center space-x-2`}
                          >
                            <div
                              className={`badge badge-xs badge-success h-auto`}
                            >
                              <TickIcon />
                            </div>
                            <div
                              className="tooltip"
                              data-tip="Copy IPNS Content Hash"
                            >
                              <CopyToClipboard
                                textToCopy={"ipns://" + siteBuildData.ipns}
                              />
                            </div>
                            <a
                              href={`https://name.web3.storage/name/${siteBuildData.ipns}`}
                              target="_blank"
                            >
                              <LinkIcon />
                            </a>
                          </div>
                        )}
                      </th>
                    </tr>
                  </div>
                </div>
              )}

              {siteBuildData && (
                <div className="flex flex-row justify-between items-center">
                  <h2>IPFS</h2>
                  <div>
                    <tr>
                      <td>
                        {/* {siteBuildData.cid &&
                          GetShortenedString(siteBuildData.cid, 10)} */}
                      </td>
                      <th>
                        {siteBuildData.status == "deployed" ? (
                          <div
                            className={`flex flex-row items-center space-x-2`}
                          >
                            <div
                              className={`badge badge-xs badge-success h-auto`}
                            >
                              <TickIcon />
                            </div>
                            <div className="tooltip" data-tip="Copy IPFS">
                              <CopyToClipboard
                                textToCopy={"ipfs://" + siteBuildData.cid}
                              />
                            </div>
                            <a
                              href={`https://ipfs.io/ipfs/${siteBuildData.cid}`}
                              target="_blank"
                            >
                              <LinkIcon />
                            </a>
                          </div>
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
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card card-compact bg-base-200">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-left">ENS</div>
              </div>
              {siteBuildData?.ipns ? (
                <SetENSResolver latestRecord={siteBuildData?.ipns} />
              ) : (
                `Publish to Permaweb to set ENS`
              )}
            </div>
          </div>
        </div>
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
        <div className="w-full">
          <table className="table table-zebra table-compact w-full">
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
                      <div className="font-bold">
                        {GetShortenedString(cid.cid)}
                      </div>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <span className="badge badge-ghost badge-sm">
                      {cid?.timestamp}
                    </span>{" "}
                  </td>
                  <th>
                    <a
                      className="p-1"
                      href={`https://ipfs.io/ipfs/${cid?.cid}`}
                      target="_blank"
                    >
                      <CopyIcon className={"h-4"} />
                    </a>
                  </th>{" "}
                  <th>
                    <a
                      className="p-1"
                      href={`https://ipfs.io/ipfs/${cid?.cid}`}
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
