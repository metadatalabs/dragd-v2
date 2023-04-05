import React, { useState } from "react";
import {
  useConnect,
  useDisconnect,
  useAccount,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { SiweMessage } from "siwe";
import { CryptoAuthContext } from "./CryptoAuth";

import GenericModal from "./UI/GenericModal";
import { ModalHeading, ShinyButton } from "./ui-helpers";
import { useRouter } from "next/router";

function WalletModal(props) {
  const { setShowAuthModal } = React.useContext(CryptoAuthContext);
  const { isConnected } = useAccount();

  return (
    <GenericModal onDone={() => setShowAuthModal(false)}>
      <div className="card lg:card-side">
        <figure>
          <div className={"flex flex-grow items-center justify-center"}>
            <span className={"text-7xl animate-bounce"}>🛸</span>
          </div>
        </figure>
        <div className="card-body">
          {!isConnected && <ConnectWalletPage />}
          {isConnected && <SignLoginPage />}
        </div>
      </div>
    </GenericModal>
  );
}

function ConnectWalletPage(props) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      <ModalHeading>Connect your Wallet</ModalHeading>
      <div className={"flex flex-col"}>
        <div className={"text-left"}>
          {connectors.map((connector) => (
            <>
              <button
                className={
                  "button bg-gray-100/10 transition duration-150 hover:ring-2 hover:ring-dragd/50 hover:bg-gray-200/20 px-2 py-1 my-1 rounded-sm"
                }
                style={{ justifyContent: "flex-start" }}
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading && connector.id === pendingConnector?.id && (
                  <div
                    class="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                )}
              </button>
              <br />
            </>
          ))}
        </div>
      </div>
      {error && <div>{error.message}</div>}
    </div>
  );
}

function SignLoginPage(props) {
  const router = useRouter();

  const { session, setSession, setShowAuthModal } =
    React.useContext(CryptoAuthContext);

  return (
    <>
      <ModalHeading>Sign in with your Wallet</ModalHeading>

      <center>
        <SignInButton
          onSuccess={({ address }) => {
            console.log("setting session ", address);
            setSession((x) => ({ ...x, address, error: undefined }));
            setShowAuthModal(false);
            // redirect to dashboard
            router.push("/" + address);
          }}
          onError={({ error }) => setSession((x) => ({ ...x, error }))}
        />
        {session?.error && <div>{session.error.message}</div>}
      </center>
    </>
  );
}

function SignInButton({ onSuccess, onError }) {
  const [state, setState] = React.useState({});

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch("/api/auth/nonce");
      const nonce = await nonceRes.text();
      setState((x) => ({ ...x, nonce }));
    } catch (error) {
      setState((x) => ({ ...x, error }));
    }
  };

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  React.useEffect(() => {
    fetchNonce();
  }, []);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, loading: true }));
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        // chainId,
        nonce: state.nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      setState((x) => ({ ...x, loading: false }));
      onSuccess({ address });
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }));
      onError({ error: error });
      fetchNonce();
    }
  };

  return (
    <ShinyButton disabled={!state.nonce || state.loading} onClick={signIn}>
      Sign-In with Ethereum
    </ShinyButton>
  );
}

export default WalletModal;
