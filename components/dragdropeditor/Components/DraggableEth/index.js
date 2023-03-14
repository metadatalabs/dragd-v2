import React, { useContext, useEffect, useRef, useState } from 'react';
import EditItem from '../DDEditor/EditItem';
import SiteContext from '../../siteContext';
import PanelControls from './PanelControls';
import { useAccount, useConnect, useEnsName, useContract, useContractRead, usePrepareContractWrite, useContractWrite, useBalance, useSendTransaction, Client } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected';

function DraggableEth(props) {
    const { elemData, selected } = props;
    const [valuesToCall, setValuesToCall] = useState(elemData.valuesToCall);

    const { address, isConnected } = useAccount()

    const contractConfig = {
        addressOrName: elemData.contractAddress,
        contractInterface: elemData.contractAbiJSON,
        };

    const { connect } = useConnect({
        connector: new InjectedConnector(),
        }); 

    const { data, isError, isLoading, refetch } = useContractRead({
        ...contractConfig,
        functionName: elemData.ABIToCall?.name,
        });

    const { config, error } = usePrepareContractWrite({
        ...contractConfig,
        functionName: elemData.ABIToCall?.name,
        args: valuesToCall,
        })
    
    const { writeData, write } = useContractWrite(config)
    

    return (
        <>
            <EditItem
                key={elemData.id}
                elemData={elemData}
                selected={props.selected}
                renderPanel={PanelControls}
            >

            {(!isConnected) ? <div>
                <button onClick={() => connect()}>Connect Wallet</button>
            </div> :
                <> {!elemData.write? <>
                    {JSON.stringify(data)}
                </>: <>
                    { elemData.ABIToCall?.inputs.map((item, index) => <div key={index}>
                        {item.name} ({item.type})
                        <input defaultValue={elemData.valuesToCall[index]}></input>
                    </div>) }
                    <button
                        key={elemData.id}
                        className={'button'}
                        style={{marginTop: 10}}
                        onClick={() => write?.()}
                    > Call
                    </button>
                </>
            }</>}
            </EditItem>
        </>
    );
}

export default DraggableEth;
