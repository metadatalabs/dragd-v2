import { createContext, useEffect, useState } from "react";
import { WagmiConfig, createClient, configureChains } from "wagmi";

import {
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  arbitrum,
} from "wagmi/chains";

import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import dynamic from "next/dynamic";

const WalletModal = dynamic(() => import("./WalletModal"));

export const CryptoAuthContext = createContext(null);

const session_persist_key = "CRYPTO_SESSION";

export function CryptoAuthProvider(props) {
  const [session, setSession] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false); // uses object to determine what auth methods to show

  useEffect(() => {
    if (session == null) return;
    console.log("persisting session ", session);
    saveSession();
  }, [session]);

  useEffect(() => {
    const handler = async () => {
      try {
        const persistedSession =
          window.localStorage.getItem(session_persist_key);
        if (persistedSession) {
          setSession(JSON.parse(persistedSession));
        } else {
          const res = await fetch("/api/me");
          const json = await res.json();
          if (!json.data.siwe) {
            // console.log("No session found, showing auth modal");
            // setShowAuthModal(true);
            return;
          }

          console.log("Fetching latest session: ", json);
          setSession((x) => ({ ...x, address: json.data.siwe.address }));
        }
      } catch (_error) {}
    };

    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  globalThis.showAuthModal = (params) => {
    setShowAuthModal({ ...params });
  };

  const saveSession = () => {
    window.localStorage.setItem(session_persist_key, JSON.stringify(session));
  };

  const { chains, provider, webSocketProvider } = configureChains(
    // defaultChains
    [mainnet, arbitrum, polygon],
    [
      jsonRpcProvider({
        rpc: (thisChain) => {
          if (thisChain.id == mainnet.id)
            return {
              http: `https://ethereum.publicnode.com`,
              // ws: `wss://rpc.flashbots.net/ws`,
            };
          else if (thisChain.id == polygon.id)
            return {
              http: `https://rpc-mumbai.maticvigil.com/`,
            };
          else if (thisChain.id == arbitrum.id)
            return {
              http: `https://arbitrum-one.publicnode.com`,
            };

          return {
            http: `https://${thisChain.id}.example.com`,
            webSocket: `wss://${thisChain.id}.example.com`,
          };
        },
      }),
      publicProvider(), // commented for now as it errors out during testing
    ]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
      new MetaMaskConnector({ chains }),
      // new WalletConnectLegacyConnector({
      //   chains,
      //   options: {
      //     qrcode: true,
      //   },
      // }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: "1711c1747051d53005c6ab33182f13c2",
        },
      }),
      new CoinbaseWalletConnector({ chains }),
      new InjectedConnector({ chains, options: { appName: "dragd" } }),
    ],
  });

  const providerValues = {
    session,
    setSession,
    saveSession,
    showAuthModal,
    setShowAuthModal,
  };

  return (
    <WagmiConfig client={client}>
      <CryptoAuthContext.Provider value={providerValues}>
        {props.children}
        {showAuthModal && <WalletModal initProps={showAuthModal} />}
      </CryptoAuthContext.Provider>
    </WagmiConfig>
  );
}
