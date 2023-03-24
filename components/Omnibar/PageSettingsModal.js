import React from 'react';
import { createSite, getSites } from '/components/DataProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import GenericModal from '../UI/GenericModal';
import { ErrorText } from '../ui-helpers';
import { updateSite } from '../DataProvider';
  
export default function PageSettingsModal({siteData, onComplete}) {
    return <GenericModal onDone={()=>onComplete()}>
        <div className={"flex flex-col w-full"}>
        <center className={"text-2xl"}>Page Settings</center>
        <div className={"flex flex-col items-start space-y-2"}>
            <NameUpdater siteData={siteData}/>

            <DevTools siteData={siteData}/>

        </div>

        
        </div>
    </GenericModal>
}

const NameUpdater = ({siteData}) => {
    const [pageName, setPageName] = React.useState(siteData.pageName);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const updateSiteSubmit = async () => {
        setLoading(true);
        const updatedSite = {
            ...siteData,
            pageName
        }

        console.log(updateSite)
        var query = updateSite(siteData._id, updateSite);

        query.then((result) => {
            setError(null);
            setLoading(false);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }
    return <label className="input-group group">
        <span className="px-2 bg-opacity-5">
            {trimIfLongerThan(siteData.siteName, 10)}/
        </span>
        <input className="input input-ghost flex grow" 
            type="text" placeholder="your page name" 
            value={pageName} onChange={(e)=>setPageName(e.target.value)}
        />
        {<span className='p-0'> 
            {loading ? <progress className="progress w-8"></progress> :
            <>
            {pageName != siteData.pageName ? <button onClick={async ()=>updateSiteSubmit()}
                className='btn'>
                Save
            </button>: <button className='btn'>
                Edit
            </button>}
            </>
            }
        
        </span>}
        
{error && <ErrorText>{error}</ErrorText>}

    </label>
}

const trimIfLongerThan = (str, maxLength) => {
    return str.length > maxLength ? "..." + str.slice(-maxLength) : str;
  }

const DevTools = ({siteData}) => {
    const [showCode, setShowCode] = React.useState(false);

    return <>
    <div className='w-full text-right'><button className={`rounded-sm ${showCode? 'bg-slate-300':''}`}
    onClick={()=>setShowCode(!showCode)}>
        ⚙️
    </button></div>
    {showCode && <div className="mockup-code text-left w-full overflow-x-scroll">
        <pre className='max-h-60 overflow-y-scroll overflow-x-hidden '>
        {JSON.stringify(siteData, null, 2)}
        </pre>
    </div>}</>
}