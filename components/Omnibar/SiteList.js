import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { useSitesByOwner } from "../DataProvider";
import { DownChevron } from "../ui-helpers";
import GenericDropdown from "../UI/GenericDropdown";
import dynamic from "next/dynamic";
import Link from "next/link";

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
    <div className="flex flex-row items-center">
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
      <button
        onClick={(e) => {
          setModal(
            <NewSiteModal
              site={currentPath.split("/")[0]}
              onComplete={() => {
                setModal(false);
              }}
            />
          );
        }}
        className="btn btn-xs btn-circle btn-outline"
      >
        <div className="flex flex-row h-full w-full justify-center items-center text-2xl">
          +
        </div>
      </button>
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
          className="btn btn-xs btn-circle btn-outline"
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
          <div className="flex flex-row h-full w-full justify-center items-center text-2xl">
            +
          </div>
        </button>
      </div>

      <div className={"flex flex-col w-full pb-2"}>
        {item.map((pageItem, index) => {
          return (
            <div key={index}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

function GetShortenedString(word, max_length = 13, ending_length = 4) {
  if (word?.length > max_length)
    return (
      word.slice(0, max_length - ending_length) +
      "..." +
      word.slice(-ending_length)
    );
  else return word;
}
