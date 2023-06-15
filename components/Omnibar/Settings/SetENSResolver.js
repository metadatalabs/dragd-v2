import { use, useContext, useEffect, useState } from "react";
import { namehash } from "ethers/lib/utils";
import { ENS } from "@ensdomains/ensjs";
import { useProvider, useConnect, useAccount, useChainId } from "wagmi";
import { getNetwork } from "wagmi";
import { useSitesByOwner } from "../../DataProvider";
// import {
//   encodeContenthash,
//   decodeContenthash,
// } from "@ensdomains/ensjs/utils/contentHash";
import GenericDropdown from "../../UI/GenericDropdown";
import { GetShortenedString } from "../../ui-helpers";
import { getAccount } from "@wagmi/core";

export default function SetENSResolver({ latestRecord }) {
  const provider = useProvider();
  const chain = useChainId({ chainId: 1 });
  const {
    data: siteList,
    status: itemsStatus,
    error: itemsError,
  } = useSitesByOwner();

  const [ensNameList, setEnsNameList] = useState([]);
  const unique = [...new Set(siteList?.data.map((item) => item.siteName))];
  const { address } = useAccount();

  const getMatchingENSName = () => {
    const matchingName = ensNameList.find(
      (item) => item.records?.contentHash?.decoded === latestRecord
    );
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
      })
      .catch((error) => {
        console.error("Error retrieving ENS profiles:", error);
      });
  }

  async function registerContentHashToName(name, contentHash) {
    const ENSInstance = new ENS();
    await ENSInstance.setProvider(provider);
    // const ensnamehash = namehash(name);
    // const encodedContentHash = encodeContenthash(contentHash);
    const tx = await ENSInstance.setRecords(name, {
      records: { contentHash: contentHash },
    });
    console.log("tx is", tx);
  }
  useEffect(() => {
    if (!provider || unique.length === 0) return;
    getName();
  }, [provider, siteList]);

  return (
    <div>
      Choose a name to link:
      <GenericDropdown
        label={<div>{getMatchingENSName() || "Not Connected"}</div>}
        children={ensNameList.map(
          (item) =>
            item && (
              <div
                className="flex flex-row w-full justify-between"
                href="#"
                onClick={() => registerContentHashToName(item.decryptedName)}
              >
                <div>{item.decryptedName}</div>
                <div>
                  {item.records.contentHash?.decoded && (
                    <div
                      className="badge badge-success text-white tooltip"
                      data-tip={
                        item.records.contentHash.protocolType +
                        "://" +
                        GetShortenedString(item.records.contentHash?.decoded)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      />
      {/* if record matches current ipns name, show that record as 'connected' */}
      {/* <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(isLoading)}</div>
      <div>{JSON.stringify(isError)}</div> */}
    </div>
  );
}

const sampleEnsObject = {
  address: "0x88289ac519eFb1cba5F522970E63264a969BeD06",
  records: {
    contentHash: {
      protocolType: "ipns",
      decoded: "k51qzi5uqu5dli4pt62pv41rvnja26w19b40p273n7p34kqeiri5vexz8wi1a9",
    },
    coinTypes: [
      {
        key: "60",
        type: "addr",
        coin: "ETH",
        addr: "0x88289ac519eFb1cba5F522970E63264a969BeD06",
      },
    ],
  },
  resolverAddress: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
  isMigrated: true,
  createdAt: "1683542459",
  decryptedName: "miladycam.eth",
};
