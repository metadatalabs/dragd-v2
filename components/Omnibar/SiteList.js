import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { createSite, useSitesByOwner, deleteSite } from "../DataProvider";
import { Chevron, DownChevron, ThreeDots, ViewCount } from "../ui-helpers";
import GenericDropdown from "../UI/GenericDropdown";
import NewSiteModal from "./NewSiteModal";

export default function SiteList ({siteData, currentPath}) {
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

    const siteList = itemsStatus === "loading" ? 
    [<div className={"w-full flex justify-center"}>Fetching your domains...</div>]:
    (groupedSites && Object.keys(groupedSites)?.map((item, index) => {
        return (
                <SiteCard key={index} index={index} item={groupedSites[item]} />

        )}
    ))
  
    return <div>
                <GenericDropdown 
                label={<>
                    {GetShortenedString((currentPath.split('/')[0]))}/
                    {(currentPath.split('/')[1])}
                    <DownChevron />
        </>}
                children={siteList}
                />
          
      </div>
  }
  
const SiteCard = ({index, item}) => {
    const [showModal, setShowModal] = React.useState(false);

    const createSiteSubmit = async (siteName, pageName="index") => {
        if(!siteName || !pageName) {
            // setError("Site Name and Page Name are required");
            return;
        };
        var query = createSite({siteName: siteName, pageName: pageName});
        query.then((result) => {
            // console.log(result);
        }).catch((error) => {
            // setError(error.message);
        });
    }

    return <div className={`flex flex-col w-full p-0 ${index == 0? 'pt-0': 'pt-4'} gap-y-0 items-start`}>
        <div className={"text-sm font-bold pl-2"}>
            dra.gd/{GetShortenedString(item[0].siteName)}
        </div>
        <div className={"flex flex-col w-full"}>
    {item.map((pageItem, index) =>{
        return <li key={index}><a
        onClick={(e)=>{ e.stopPropagation(); }}
        href={`/${pageItem.siteName}/${pageItem.pageName}`}
        className={"w-full flex flex-row justify-between transition-all pl-4"}
    >
        <div>
            <p>
            /{pageItem.fake ? "index":pageItem.pageName }
            </p>
        </div>
    </a></li>
    })}

<button className={"btn btn-sm btn-primary w-auto"} onClick={(e)=>{
                setShowModal(true);
            }}>NEW PAGE</button>
    </div>
    {showModal && <NewSiteModal site={item[0].siteName} onComplete={()=>{
        setShowModal(false);
    }}/>}
    </div>
}

function GetShortenedString(word) {
  if(word?.length > 10)
    return word.slice(0, 6) + '...' + word.slice(-4);
  else
    return word;
}

