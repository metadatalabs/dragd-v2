import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { useSitesByOwner } from "../DataProvider";
import { DownChevron } from "../ui-helpers";
import GenericDropdown from "../UI/GenericDropdown";
import dynamic from "next/dynamic";
const NewSiteModal = dynamic(() => import("./NewSiteModal"));

export default function SiteList({ siteData, currentPath, setModal }) {
  const { session } = React.useContext(CryptoAuthContext);

  const {
    data: data,
    status: itemsStatus,
    error: itemsError,
  } = useSitesByOwner();

  const groupedSites = data?.data?.reduce((acc, item) => {
    if (!acc[item.siteName]) {
      acc[item.siteName] = [];
    }
    acc[item.siteName].push(item);
    return acc;
  }, {});

  const siteList =
    itemsStatus === "loading"
      ? [
          <div className={"w-full flex justify-center"}>
            Fetching your domains...
          </div>,
        ]
      : groupedSites &&
        Object.keys(groupedSites)?.map((item, index) => {
          return (
            <SiteCard
              key={index}
              index={index}
              item={groupedSites[item]}
              setShowModal={setModal}
            />
          );
        });

  return (
    <div>
      <GenericDropdown
        label={
          <>
            {GetShortenedString(currentPath.split("/")[0])}/
            {currentPath.split("/")[1]}
            <DownChevron />
          </>
        }
        children={siteList}
      />
    </div>
  );
}

const SiteCard = ({ index, item, setShowModal }) => {
  return (
    <div
      className={`flex flex-col w-full p-0 gap-y-0 items-start border-t-2 border p-1 -my-1 bg-base-100 border-base-300`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className={"text-sm font-bold pl-2"}>
          dra.gd/{GetShortenedString(item[0].siteName)}
        </div>
        <button
          className={"btn btn-xs btn-primary min-h-6 h-2 p-1 ml-2"}
          onClick={(e) => {
            setShowModal(
              <NewSiteModal
                site={item[0].siteName}
                onComplete={() => {
                  setShowModal(false);
                }}
              />
            );
          }}
        >
          NEW
        </button>
      </div>

      <div className={"flex flex-col w-full pb-2"}>
        {item.map((pageItem, index) => {
          return (
            <li key={index}>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={`/${pageItem.siteName}/${pageItem.pageName}`}
                className={
                  "w-full flex flex-row justify-between transition-all pl-4"
                }
              >
                <div>
                  <p>/{pageItem.fake ? "index" : pageItem.pageName}</p>
                </div>
              </a>
            </li>
          );
        })}
      </div>
    </div>
  );
};

function GetShortenedString(word) {
  if (word?.length > 10) return word.slice(0, 6) + "..." + word.slice(-4);
  else return word;
}
