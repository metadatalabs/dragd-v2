import GenericDropdown from "/components/UI/GenericDropdown";
import { AddressBadge, ShinyButton } from "/components/ui-helpers";
import * as React from "react";
import { useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import { CryptoAuthContext } from "../CryptoAuth";
import { useRouter } from "next/navigation";

export default function LoginButton(props) {
  const { session, setSession, showAuthModal, setShowAuthModal } =
    React.useContext(CryptoAuthContext);
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: session?.address });
  const {
    data: ensImage,
    isError,
    isLoading,
  } = useEnsAvatar({ address: session?.address });
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => setIsReady(true), []);

  if (!isReady) return null;
  return (
    <div>
      {session?.address ? (
        <div>
          <GenericDropdown
            label={
              <div className="avatar -mx-2 ">
                <div className="w-8 bg-primary rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={ensImage} />
                </div>
              </div>
            }
            children={[
              <div className="badge bg-base-100 badge-outline w-60 pointer-events-none h-12">
                {ensName || session.address}
              </div>,
              // <textarea>{JSON.stringify(session)}</textarea>,
              <button
                className={"btn btn-sm btn-outline btn-error mt-2"}
                onClick={async () => {
                  await fetch("/api/auth/logout");
                  setSession({});
                  disconnect();
                  router.push("/");
                }}
              >
                Sign Out
              </button>,
            ]}
          />
        </div>
      ) : (
        <button
          onClick={() => {
            setShowAuthModal(true);
          }}
        >
          <a
            href="#_"
            class="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
          >
            <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
            <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
              <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
              <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
            </span>
            <span class="relative text-white">
              {showAuthModal ? "Connecting..." : "Connect Wallet"}
            </span>
          </a>
        </button>
      )}
    </div>
  );
}
