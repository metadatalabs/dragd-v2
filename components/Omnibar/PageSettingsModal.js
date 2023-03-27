import React, { useState } from 'react';
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
import { deleteSite, deployToIPFS, updateSite } from '../DataProvider';
import { useRouter } from 'next/router';

const pages = ['Page Settings', 'Site Settings', 'Delete']
export default function PageSettingsModal({siteData, onComplete}) {
    const [page, setPage] = useState(pages[0]);
    return <GenericModal onDone={()=>onComplete()}>

    <div className="tabs w-full">
    {pages.map((item, index) => {
        return <a className={`tab tab-lifted ${item == page ? 'tab-active' :''}`} 
        onClick={() => setPage(item)}>{item}</a>
    })}
    <a className="cursor-default tab tab-lifted flex grow"></a>
    </div>

    {page == pages[0] && <>
        <div className={"flex flex-col items-center space-y-2"}>
            <NameUpdater siteData={siteData}/>

            <DevTools siteData={siteData}/>


        </div>
    </>}

    {page == pages[1] && <>
        <div className={"flex flex-col items-center space-y-2"}>
            <DeployToIpfs siteData={siteData}/>
        </div>
    </>}

    {page == pages[2] && <>
        <div className={"flex flex-col items-center space-y-2"}>
        <DeletePage siteData={siteData}/>
        </div>
    </>}
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

    return <div className={"flex flex-col items-center w-full my-4"}>
        <span className='text-lg my-4'>Are you sure you want to delete {siteData.pageName}?</span>
        <button className='btn btn-error w-36' onClick={(e)=>{
            deleteSiteSubmit(siteData._id);
        }
        }>Delete Page</button>
    </div>
}

const DeployToIpfs = ({siteData}) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deployed, setDeployed] = React.useState(false);
    const [ipfsHash, setIpfsHash] = React.useState(null);
    const deployIpfs = async () => {
        setLoading(true);
        var query = deployToIPFS(siteData._id);

        query.then((result) => {
            setError(null);
            setLoading(false);
            setDeployed(true);
            setIpfsHash(result);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }
    return <>
        <div className="form-control">
  <label className="label">
    <span className="label-text">Deploy to IPFS</span>
  </label>
    <button onClick={async ()=>deployIpfs()}
                className={`btn ${loading ? 'loading': ''}`}>
                Deploy
            </button>
</div>
{deployed && <div className='text-center'>
    <span className='text-lg'>Deployed to IPFS</span>
    {JSON.stringify(ipfsHash.data)}
</div>
}
{error && <ErrorText>{error}</ErrorText>}
Current CID:
{JSON.stringify(siteData.cid)}

</>
}