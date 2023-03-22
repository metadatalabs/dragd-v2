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
 
export default function Omnibar(props) {
    const { session, setSession, showAuthModal, setShowAuthModal } = React.useContext(CryptoAuthContext);
    const {siteData, currentPath} = props;
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address: session?.address })
    const [isReady, setIsReady] = React.useState(false);
    const router = useRouter();
    React.useEffect(() => setIsReady(true), []);

    if (!isReady) return null;
    return <div className="flex flex-row justify-end w-full pt-2 pr-2 h-12 -mb-12">
        <div className={"flex flex-row space-x-2 items-center bg-gray-500 rounded-md"}>

        {session?.address && currentPath && <>
        <SiteList currentPath={currentPath}/>
        {siteData?._id && <PageSettings siteData={siteData} />}
        </>}
        <LoginButton />
        </div>


    </div>
}

