import GenericDropdown from "../UI/GenericDropdown";
import * as React from "react";
import { useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import { CryptoAuthContext } from "../CryptoAuth";
import { useRouter } from "next/navigation";
import { GetShortenedString } from "../ui-helpers";

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
                <div className="w-5 bg-primary rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={ensImage} />
                </div>
              </div>
            }
            children={[
              <div className="badge bg-base-100 badge-outline w-60 pointer-events-none h-12">
                {ensName || GetShortenedString(session.address)}
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
          className={"btn btn-sm btn-outline"}
          onClick={() => {
            setShowAuthModal({ connect: true, sign: true });
          }}
        >
          <a href="#_">
            <span>{showAuthModal ? "Connecting..." : "Connect Wallet"}</span>
          </a>
        </button>
      )}
    </div>
  );
}
