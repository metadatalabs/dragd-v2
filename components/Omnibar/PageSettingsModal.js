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
import { deleteSite, updateSite } from '../DataProvider';
import { useRouter } from 'next/router';
  
export default function PageSettingsModal({siteData, onComplete}) {
    return <GenericModal onDone={()=>onComplete()}>
        <div className={"flex flex-col w-full"}>
        <center className={"text-2xl"}>Page Settings</center>
        <div className={"flex flex-col items-center space-y-2"}>
            <NameUpdater siteData={siteData}/>

            <DevTools siteData={siteData}/>

            <DeletePage siteData={siteData}/>

        </div>

        
        </div>
    </GenericModal>
}

const NameUpdater = ({siteData}) => {
    const router = useRouter();

    const [pageName, setPageName] = React.useState(siteData.pageName);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const updateSiteSubmit = async () => {
        setLoading(true);
        const updatedSite = {
            ...siteData,
            pageName
        }

        var query = updateSite(siteData._id, updatedSite);

        query.then((result) => {
            setError(null);
            setLoading(false);
            router.push(updatedSite.siteName + "/" + updatedSite.pageName)
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }
    return <>
        <div className="form-control">
  <label className="label">
    <span className="label-text">Page Name</span>
  </label>
  <label className="input-group">
    <span>{trimIfLongerThan(siteData.siteName, 10)}/</span>
    <input type="text" className="input input-bordered" 
    placeholder="your page name" 
    value={pageName} onChange={(e)=>setPageName(e.target.value)}/>
    {pageName != siteData.pageName ? <button onClick={async ()=>updateSiteSubmit()}
                className={`btn ${loading ? 'loading': ''}`}>
                Save
            </button>: <button className='btn'>
                Edit
            </button>}
  </label>
</div> 

        
{error && <ErrorText>{error}</ErrorText>}
</>
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

const DeletePage = ({siteData}) => {
    const deleteSiteSubmit = async (id) => {
        var query = deleteSite({id});
        query.then((result) => {
            // console.log(result);  
    
          router.push('/'+ session.address);
    
        }).catch((error) => {
            // setError(error.message);
        });
    }

    return <div className={"w-full text-right"}>
        <button className='btn btn-error' onClick={(e)=>{
            deleteSiteSubmit(siteData._id);
        }
        }>Delete</button>
    </div>
}