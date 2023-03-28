import GenericDropdown from '/components/UI/GenericDropdown';
import { AddressBadge, ShinyButton } from '/components/ui-helpers';
import * as React from 'react'
import { useDisconnect, useEnsName } from 'wagmi'
import { CryptoAuthContext } from '../CryptoAuth'

import WalletModal from '../WalletModal'
import { useRouter } from 'next/router';
import LoginButton from './LoginButton';
import SiteList from './SiteList';
import { ThreeDots } from '../ui-helpers';
import PageSettings from './PageSettings';
import { useSitesByOwner } from '../DataProvider';
 
export default function Omnibar(props) {
    const { session, setSession, showAuthModal, setShowAuthModal } = React.useContext(CryptoAuthContext);
    const {siteData, currentPath} = props;
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address: session?.address })
    const [isReady, setIsReady] = React.useState(false);
    const router = useRouter();

    // const isMyPage =
    const isLoggedIn = session?.address;
    React.useEffect(() => setIsReady(true), []);
    console.log(currentPath)
    if (!isReady) return null;
    return <>
    <div className="navbar h-16 -mb-16 z-50">
    <div className="flex-1">
        {/* <a className="btn btn-ghost normal-case text-xl">dragd</a> */}
    </div>

    
    <div className="flex-none rounded-xl gap-2 bg-base-100 ">
        {/* <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered" />
        </div> */}

        {session?.address && currentPath && <>
            <SiteList currentPath={currentPath}/>
            {siteData?._id && <PageSettings siteData={siteData} />}
        </>}
        <LoginButton />


    </div>
    </div>
    </>
}


