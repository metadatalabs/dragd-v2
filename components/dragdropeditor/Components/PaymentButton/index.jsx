import React, { useContext, useEffect, useRef, useState } from "react";
import EditItem from "../DDEditor/EditItem";
import SiteContext from "../../siteContext";
import PanelControls from "./PanelControls";
import { CryptoAuthContext } from "../../../CryptoAuth";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { parseEther, formatEther } from "ethers/lib/utils.js";
import { GetShortenedString } from "../../../ui-helpers";

function PaymentButton(props) {
  const { elemData, selected } = props;
  const { isConnected, address } = useAccount();
  const { config, error } = usePrepareSendTransaction({
    request: {
      to: elemData?.paymentAddress,
      value: parseEther(elemData?.amountToSend || "0"),
    },
  });
  const {
    data: txnData,
    isLoading: isTxnLoading,
    isSuccess: isTxnSuccess,
    sendTransaction,
  } = useSendTransaction(config);
  const { setShowAuthModal } = React.useContext(CryptoAuthContext);

  const siteData = useContext(SiteContext);
  const {
    setSelected: onSelect,
    onUpdateDiv: onUpdated,
    mode,
    setModal,
  } = siteData;

  const [hydrated, setHydrated] = React.useState(false);
  const [isTestTxnSuccess, setTestTxnSuccess] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (isTxnSuccess) {
      postTxnActions();
    }
  }, [isTxnSuccess]);

  React.useEffect(() => {
    if (isTestTxnSuccess) {
      postTxnActions();
      setTestTxnSuccess(false);
    }
  }, [isTestTxnSuccess]);

  const postTxnActions = () => {
    try {
      eval(elemData?.postTxnHook);
    } catch (e) {
      console.log(e);
    }

    setModal(
      <PaymentSuccessModal
        amount={config.request.value}
        toAddress={config.request.to}
      />
    );
  };

  const sendTransactionOrTest = async () => {
    try {
      if (elemData.testMode) {
        setTestTxnSuccess(true);
      } else {
        sendTransaction?.();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!hydrated) return null;

  return (
    <>
      <EditItem
        key={elemData.id}
        elemData={elemData}
        onSelect={onSelect}
        onUpdated={onUpdated}
        selected={props.selected}
        renderPanel={PanelControls}
        mode={mode}
      >
        {!isConnected && (
          <button
            key={elemData.id}
            className={"btn btn-primary h-full w-full"}
            style={{
              ...elemData.style,
            }}
            onClick={() => {
              setShowAuthModal({ connect: true, sign: false });
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xl">{elemData.label}</span>
              <span className="text-sm">Connect Wallet</span>
            </div>
          </button>
        )}

        {isConnected && (
          <button
            className="btn btn-outline h-full w-full"
            disabled={!sendTransaction}
            onClick={() => {
              sendTransactionOrTest?.();
            }}
            style={{
              ...elemData.style,
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xl">{elemData.label}</span>
              <span className="text-sm">{elemData.amountToSend} ETH</span>
            </div>
          </button>
        )}

        {isTxnSuccess && <div>Transaction: {JSON.stringify(txnData)}</div>}
      </EditItem>
    </>
  );
}

const PaymentSuccessModal = ({ amount, toAddress }) => {
  return (
    <div className="flex flex-col items-center">
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        className="text-green-400 w-10 h-10"
      >
        <path d="M2.5 8a5.5 5.5 0 018.25-4.764.5.5 0 00.5-.866A6.5 6.5 0 1014.5 8a.5.5 0 00-1 0 5.5 5.5 0 11-11 0z" />
        <path d="M15.354 3.354a.5.5 0 00-.708-.708L8 9.293 5.354 6.646a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l7-7z" />
      </svg>
      <span className="text-xl text-success pb-2">Payment Success!</span>
      <div className="flex flex-col items-center border rounded-lg bg-secondary-content p-2">
        <span className="text-md text-success">
          Paid {formatEther(amount.toString())}
        </span>
        <span className="text-sm text-success">
          To {GetShortenedString(toAddress)}
        </span>
      </div>
    </div>
  );
};

export default PaymentButton;
