import { use, useContext, useEffect, useState } from "react";
import { ENS } from "@ensdomains/ensjs";
import { useProvider, useConnect, useAccount, useSigner } from "wagmi";
import { useSitesByOwner } from "../../../DataProvider";
import { GetShortenedString } from "../../../ui-helpers";

export default function SetENSResolver({ latestRecord }) {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const {
    data: siteList,
    status: itemsStatus,
    error: itemsError,
  } = useSitesByOwner();

  const [fetchedENS, setFetchedENS] = useState(false);
  const [ensNameList, setEnsNameList] = useState([]);
  const unique = [...new Set(siteList?.data.map((item) => item.siteName))];
  const { address } = useAccount();

  const getMatchingENSName = () => {
    let matchingName = "";
    try {
      matchingName = ensNameList?.find(
        (item) => item.records?.contentHash?.decoded === latestRecord
      );
    } catch (e) {
      console.log("error is", e);
    }

    console.log("matching name is", matchingName);
    return matchingName;
  };
  async function getName() {
    const ENSInstance = new ENS();
    await ENSInstance.setProvider(provider);

    console.log("unique names are", unique);
    console.log("Connected to " + address);
    console.log("provider is", provider);
    const promises = unique.map((ensName) => {
      return ENSInstance.getProfile(ensName, {
        texts: true,
        coinTypes: true,
        contentHash: true,
      });
    });

    Promise.all(promises)
      .then((profiles) => {
        const filteredProfiles = profiles.filter((profile) => !!profile);
        console.log("filtered profiles are", filteredProfiles);
        setEnsNameList(filteredProfiles);
        setFetchedENS(true);
      })
      .catch((error) => {
        console.error("Error retrieving ENS profiles:", error);
      });
  }

  async function registerContentHashToName(name, contentHash) {
    const ENSInstance = new ENS();
    await ENSInstance.setProvider(signer.provider);
    // const ensnamehash = namehash(name);
    // const encodedContentHash = encodeContenthash("ipns://" + contentHash);
    // console.log("doing object ", {
    //   name,
    //   contentHash,
    //   encodedContentHash: encodedContentHash,
    // });
    try {
      const tx = await ENSInstance.setRecords(name, {
        records: { contentHash: "ipns://" + contentHash },
      });
      console.log("tx is", tx);
    } catch (e) {
      console.log("error is", e);
    }
  }
  useEffect(() => {
    if (!provider || unique.length === 0) return;
    getName();
  }, [provider, siteList]);

  return (
    <div className="text-center">
      Choose a name to link: <br />
      <div className="dropdown dropdown-center">
        <label tabIndex={0} className="btn m-1">
          {getMatchingENSName()?.decryptedName ||
            (fetchedENS && "Not Connected") ||
            "Loading..."}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {ensNameList.map(
            (item) =>
              item && (
                <li>
                  <div
                    className="flex flex-row w-full justify-between"
                    href="#"
                    onClick={() =>
                      registerContentHashToName(
                        item.decryptedName,
                        latestRecord
                      )
                    }
                  >
                    <div>{item.decryptedName}</div>
                    <div>
                      {item.records.contentHash?.decoded && (
                        <div
                          className="tooltip"
                          data-tip={
                            item.records.contentHash.protocolType +
                            "://" +
                            GetShortenedString(
                              item.records.contentHash?.decoded
                            )
                          }
                        >
                          <div
                            className={`badge ${
                              item.records.contentHash.decoded == latestRecord
                                ? "badge-success"
                                : "badge-warning"
                            } text-white flex flex-row align-center`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4 -ml-2 -mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
          )}
          {ensNameList.length === 0 && (
            <li>
              <div className="flex flex-row w-full justify-between">
                <div>No ENS names found</div>
              </div>
            </li>
          )}
        </ul>
      </div>
      {/* if record matches current ipns name, show that record as 'connected' */}
      {/* <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(isLoading)}</div>
      <div>{JSON.stringify(isError)}</div> */}
    </div>
  );
}
