import GenericDropdown from '/components/UI/GenericDropdown';
import { AddressBadge, ShinyButton } from '/components/ui-helpers';
import * as React from 'react'
import { useDisconnect, useEnsName } from 'wagmi'
import { CryptoAuthContext } from '../CryptoAuth'

import WalletModal from '../WalletModal'
import { useRouter } from 'next/router';

 
export default function LoginButton(props) {
    const { session, setSession, showAuthModal, setShowAuthModal } = React.useContext(CryptoAuthContext);
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address: session?.address })
    const [isReady, setIsReady] = React.useState(false);
    const router = useRouter();
    React.useEffect(() => setIsReady(true), []);

    if (!isReady) return null;
    return <div>
        {session?.address ? (
            <div>
            <GenericDropdown 
                label={<AddressBadge address={ensName || session.address} />}
                options={[<textarea>{JSON.stringify(session)}</textarea>, 
                <button
                    className={"text-red-900"}
                    onClick={async () => {
                    await fetch('/api/auth/logout')
                    setSession({})
                    disconnect();
                    router.push("/");
                }}>
                    Sign Out
                </button>]}
                />
            </div>
        ) : <button className={"neonButton"} onClick={()=>{setShowAuthModal(true)}}>
            {showAuthModal ? 'Connecting...' : 'Connect Wallet'}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
        </button>}
    </div>
}

