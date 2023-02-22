import { AddressBadge, ShinyButton } from '@/components/ui-helpers';
import * as React from 'react'
import { useConnect, useDisconnect, useAccount, useNetwork, useSignMessage } from 'wagmi'
import { CryptoAuthContext } from '../../CryptoAuth'

import WalletModal from '../../WalletModal'

 
export default function LoginButton(props) {
    const { session, setSession, showAuthModal, setShowAuthModal } = React.useContext(CryptoAuthContext);
    const { disconnect } = useDisconnect()
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => setIsReady(true), []);

    if (!isReady) return null;
    return <div>
        {session?.address ? (
            <div className={"rounded-sm inline-flex items-center p-1 ring-black ring-offset-2 ring-2"}>
            <AddressBadge address={session.address} />
            <button
                onClick={async () => {
                await fetch('/api/logout')
                setSession({})
                disconnect();
                }}
                className={"ring-2 ring-black rounded-sm ring-offset-2 ml-1 hover:bg-red-200"}
            >
                Sign Out
            </button>
            </div>
        ) : <ShinyButton onClick={()=>{setShowAuthModal(true)}}>
            {showAuthModal ? 'Connecting...' : 'Connect Wallet'}
        </ShinyButton>}
    </div>
}

