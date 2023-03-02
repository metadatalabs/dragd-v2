import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { createSite, useSitesByOwner, deleteSite } from "../DataProvider";
import { Chevron, ThreeDots } from "../ui-helpers";
import GenericDropdown from "../UI/GenericDropdown";
import NewSiteModal from "./NewSiteModal";

export default function SiteList ({items}) {
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
  
    return <div>
          {groupedSites && Object.keys(groupedSites)?.map((item, index) => {
              return (
                      <SiteCard key={index} item={groupedSites[item]} />
              )}
          )}
          {itemsStatus === "loading" && <div className={"w-full flex justify-center"}>Fetching your domains...</div>}
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

    const deleteSiteSubmit = async (id) => {
        var query = deleteSite({id});
        query.then((result) => {
            // console.log(result);
        }).catch((error) => {
            // setError(error.message);
        });
    }

    return <div className={`w-full rounded-2xl my-8 p-4 neuomorphicIn`} style={{background: "#212121"}}>
        <div className={"w-full flex flex-row justify-between mb-2"}>
        <div className={"text-gray-500"}>dra.gd/{GetShortenedString(item[0].siteName)}<br /></div>
        
            <button className={"px-4 font-bold rounded-full neuomorphicOut"} onClick={(e)=>{
                setShowModal(true);
            }}>+</button>
        </div>
        <div className={"grid md:grid-cols-2 gap-4"}>
    {item.map((pageItem, index) =>{
        return <a
        href={`/editor/${pageItem.siteName}/${pageItem.pageName}`}
        className={"w-full flex flex-row justify-between items-center transition-all p-2 rounded-md neuomorphicOut"}
    >
        <div>
            <h2>
            {pageItem.pageName != "index" && pageItem.pageName}
            </h2>
            <p>
            
            {pageItem.fake && "Unclaimed"}
            </p>
        </div>
        <div className={"flex flex-row items-center"}>
            
            <GenericDropdown 
                CollapseButton={<ThreeDots className={"w-6 h-6 hover:bg-gray-500 p-1 rounded-full"}/>}
                options={[<div className={"hover:text-red-500"} onClick={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                    deleteSiteSubmit(pageItem._id);
                }}>Delete</div>]}
                />
            <Chevron className={"w-6 h-6"}/>
        </div>
            
    </a>
    })}
    </div>
    {showModal && <NewSiteModal site={item[0].siteName} onComplete={()=>{
        setShowModal(false);
    }}/>}
    </div>
}

function GetShortenedString(word) {
  if(word.length > 10)
    return word.slice(0, 6) + '...' + word.slice(-4);
  else
    return word;
}

