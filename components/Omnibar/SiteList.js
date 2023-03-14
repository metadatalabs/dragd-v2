import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { createSite, useSitesByOwner, deleteSite } from "../DataProvider";
import { Chevron, ThreeDots, ViewCount } from "../ui-helpers";
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
                <>
                <SiteCard key={index} item={groupedSites[item]} />
                {(index + 1) !== Object.keys(groupedSites).length && 
                <div className={"w-full h-0.5 bg-gray-400"}/>
                }
                </>
        )}
    ))
  
    return <div>
                <GenericDropdown 
                label={<div>{currentPath}</div>}
                options={siteList}
                />
          
      </div>
  }
  
const SiteCard = ({item}) => {
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

    return <div className={`w-full`}>
        <div className={"w-full flex flex-row justify-between items-center"}>
        <div className={"text-gray-600"}>dra.gd/{GetShortenedString(item[0].siteName)}<br /></div>
        
            <button className={"px-1.5 font-bold text-sm rounded-full bg-gray-300 hover:ring-1"} onClick={(e)=>{
                setShowModal(true);
            }}>+</button>
        </div>
        <div className={"grid md:grid-cols-1"}>
    {item.map((pageItem, index) =>{
        return <a
        href={`/${pageItem.siteName}/${pageItem.pageName}`}
        className={"w-full flex flex-row justify-between items-center transition-all p-2 rounded-md hover:bg-gray-300"}
    >
        <div>
            <h2>
            {pageItem.pageName != "index" && pageItem.pageName}
            </h2>
            <p>
            
            {(pageItem.fake || pageItem.pageName == 'index') && "index"}
            </p>
        </div>
        {/* <div className={"flex flex-row items-center"}>
            <div className={"flex flex-col justify-center align-center"}>
                <ViewCount className={"h-4 mt-0.5 -mb-1"} />
                <span className={"text-center"} style={{fontSize: 10}}>123</span>
            </div>
            
            <Chevron className={"w-6 h-6"}/>
        </div> */}
            
    </a>
    })}
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

