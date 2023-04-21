import React, { useEffect, useState } from "react";
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
import NFTImage from "./UI/NFTImage";
function WalletModal(props) {
  const { setShowAuthModal } = React.useContext(CryptoAuthContext);
  const { isConnected, address } = useAccount();
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    setIsShowing(true);
  }, []);
  return (
    <div
      class="relative"
      style={{ zIndex: 99999999 }}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      <div
        class="fixed inset-0 overflow-y-auto"
        style={{ zIndex: 99999999 }}
        onClick={() => {
          setShowAuthModal && setShowAuthModal(false);
        }}
      >
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div
            class={`relative transform transition-all ${
              isShowing ? "" : "translate-y-96"
            } sm:my-8 w-min-sm w-max-full `}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <NFTImage
              isConnected={isConnected}
              borderText={
                isConnected ? address : "Connect your wallet to get started."
              }
            >
              {!isConnected && <ConnectWalletPage />}
              {isConnected && <SignLoginPage />}
              <ul className="steps lg:steps-horizontal mt-4">
                <li
                  className={`step text-xs ${
                    isConnected ? "step-primary" : ""
                  }`}
                >
                  Connect
                </li>
                <li className={`step text-xs`}>Sign</li>
              </ul>
            </NFTImage>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectWalletPage(props) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      <div className={"flex flex-col"}>
        <div className={"text-center"}>
          {connectors.map((connector) => (
            <>
              <button
                className={"btn px-2 py-1 my-1 -sm text-center"}
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name.replace(/(legacy)/gi, "")}
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
      {error && (
        <div className="alert alert-error shadow-lg p-2 pr-4">
          <ErrorIcon />
          {error.message}
        </div>
      )}
    </div>
  );
}

function SignLoginPage(props) {
  const { session, setSession, saveSession, setShowAuthModal } =
    React.useContext(CryptoAuthContext);
  const router = useRouter();

  return (
    <>
      <ModalHeading>
        Sign in with <br />
        your wallet
      </ModalHeading>

      <center>
        <SignInButton
          onSuccess={({ address }) => {
            console.log("setting session ", address);
            setSession((x) => ({ ...x, address, error: undefined }));
            saveSession();
            setShowAuthModal(false);
            // redirect to dashboard
            router.push("/" + address);
          }}
          onError={({ error }) => setSession((x) => ({ ...x, error }))}
        />
        {session?.error && (
          <div className="alert alert-error shadow-lg">
            <ErrorIcon />
            {session.error.message}
          </div>
        )}
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
      Sign Message
    </ShinyButton>
  );
}

export default WalletModal;

const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current flex-shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
