import React from "react";
import { CryptoAuthContext } from "../CryptoAuth";
import { createSite, useSitesByOwner, deleteSite } from "../DataProvider";
import { Chevron, ThreeDots } from "../ui-helpers";

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
      </div>
  }
  
const SiteCard = ({item}) => {
    const [newPageName, setNewPageName] = React.useState("");

    const createSiteSubmit = async (siteName, pageName="index") => {
        if(!siteName || !pageName) {
            // setError("Site Name and Page Name are required");
            return;
        };
        var query = createSite({siteName: siteName, pageName: pageName});
        query.then((result) => {
            console.log(result);
        }).catch((error) => {
            // setError(error.message);
        });
    }

    const deleteSiteSubmit = async (id) => {
        var query = deleteSite({id});
        query.then((result) => {
            console.log(result);
        }).catch((error) => {
            // setError(error.message);
        });    }

    return <div className={`w-full rounded-xl p-2 border border-gray-400/80 mb-2`}>
        <div className={" w-full flex flex-row justify-between"}>
        <div>{item[0].siteName}<br /></div>
        
        <div className={"flex flex-row"}>
            <input value={newPageName} onChange={(e)=>{setNewPageName(e.target.value)}} />
            <button className={"border-gray-500 border-2 p-1 rounded-tr-md rounded-br-md"} onClick={(e)=>{
            newPageName?.length > 0 && createSiteSubmit(item[0].siteName, newPageName)
            }}>+</button>
        </div>
        </div>
        <div className={"grid md:grid-cols-3 gap-4"}>
    {item.map((pageItem, index) =>{
        return <a
        href={`/editor/${pageItem.siteName}/${pageItem.pageName}`}
        className={"w-full flex flex-row justify-between items-center hover:border-gray-500 transition-all border-2 p-2 rounded-xl overflow-hidden"}
    >
        <div className={"overflow-hidden"}>
            <h2>
            {pageItem.siteName}/{pageItem.pageName}<span>-&gt;</span>
            </h2>
            <p>
            
            {pageItem.fake? "Not Created" : "Created"}
            </p>
        </div>
        <div className={"flex flex-row items-center text-gray-400"}>
            <div className={"hover:text-red-500"} onClick={(e)=>{
                e.stopPropagation();
                e.preventDefault();
                deleteSiteSubmit(pageItem._id);
            }}>Delete</div>
            <ThreeDots className={"w-6 h-4"}/>
            <Chevron className={"w-6 h-6"}/>
        </div>
            
    </a>
    })}
    </div>
    </div>
}


