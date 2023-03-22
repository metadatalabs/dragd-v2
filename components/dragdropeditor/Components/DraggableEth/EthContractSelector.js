import { useRef, useState, useEffect, useContext } from 'react';
import { Row } from '../../helpers/helper';
import { useAccount, useConnect, useEnsName, useContract, useContractRead, useContractWrite, useBalance, useSendTransaction, usePrepareContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { apiRequest } from '/util/network';
import SiteContext from '../../siteContext';

const linkRegEx = new RegExp(
    /^0x[a-fA-F0-9]{40}$/i,
);
const contractTemplates = [
    {name: "One-of-one NFT Deployment (ERC721)", 
    templateId: "sct_e851adefe4494fc991207b2c37ed8a83",
    params: ["name", "symbol", "baseUri", "uriSuffix", "ownerAddress"]},
    {name: "Fungible Token with fixed supply (ERC20)", 
    templateId: "sct_81d50607677241beac764bfadd31a3a7",
    params: ["name", "symbol", "intialSupply", "owner"]},
    ]

export function EthContractSelector(props) {
    const inputRef = useRef(null);
    const [contractAddress, setContractAddress] = useState('0x');
    const [chainType, setChainType] = useState('poly-mumbai');
    const [contractAbiJSON, setContractAbiJSON] = useState();
    const [ABIToCall, setABIToCall] = useState();
    const [valuesToCall, setValuesToCall] = useState([]);
    const [message, setMessage] = useState();

    // oh you choose to deploy a new contract
    const [contractDeployResponse, setContractDeployResponse] = useState();
    const [manuallyDeployedContract, setManuallyDeployedContract] = useState(false);
    
    
    const siteData = useContext(SiteContext);
    const {
        items
    } = siteData;
    const contractsInUse = Object.values(items)
        .filter(item => (item.type === 'smartcontract'))
        .map(item => item.contractAddress);
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })    

    ///////////////////////////////////// 
    // sending a transaction to loki wallet
    const {sendTransaction} = useSendTransaction({
        request: {
            to: "0xe5e98df807c3c4f8e57eeeed0968895b2ea5fefb", value: (0.1 * 1e18).toString(),
        }
    })
    ///////////////////////////////////// 

    // https://ethereum.stackexchange.com/questions/61821/how-to-dynamically-load-contracts-data-with-their-abi-from-etherscan-api
    // reading a value from a contract
    
    const contractConfig = {
    addressOrName: contractAddress,
    contractInterface: contractAbiJSON,
    };

    const { data, isError, isLoading, refetch } = useContractRead({
    ...contractConfig,
    functionName: ABIToCall?.name,
    });
    ///////////////////////////////////// 

    // writing a value to a contract
    const { config, error } = usePrepareContractWrite({
        ...contractConfig,
        functionName: ABIToCall?.name,
        args: valuesToCall,
      })
    
    const { writeData, write } = useContractWrite(config)

    const returnContractAbiFromScanner = async (scannerBaseUrl, contractAddress, apiKey = null) => {
        const response = await fetch(`${scannerBaseUrl}/api?module=contract${apiKey && ('&apikey=' + apiKey)}&action=getabi&address=${contractAddress}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        if(manuallyDeployedContract) return;
        setABIToCall();
        setContractAbiJSON()

        if (!isValidAddress) return;
        setMessage('Loading...');
        // check if address is a wallet or smart contract
        // Client.getContractCode(contractAddress).then((code) => {
        //     console.log('code', code);
        // });
        try {
        switch (chainType) {
            case 'eth-mainnet':
                returnContractAbiFromScanner('https://api.etherscan.io', contractAddress, "USIBW12S8SV3G1I69PR68EU6HH9V9WG32D").then((data) => {
                    handleContractAbiResponse(data);
                });
                break;
            case 'eth-goerli':
                returnContractAbiFromScanner('https://api-goerli.etherscan.io', contractAddress).then((data) => {
                    handleContractAbiResponse(data);
                });
                
                break;
            case 'poly-mainnet':
                returnContractAbiFromScanner('https://api.polygonscan.com', contractAddress, "9G974MJGGEC4ZB2TRNBEFB1S12G8H7RVIV").then((data) => {
                    handleContractAbiResponse(data);
                });
                break;
            case 'poly-mumbai':
                returnContractAbiFromScanner('https://api-testnet.polygonscan.com', contractAddress, "9G974MJGGEC4ZB2TRNBEFB1S12G8H7RVIV").then((data) => {
                    handleContractAbiResponse(data);
                });
                break;
            default:
                returnContractAbiFromScanner('https://api.etherscan.io', contractAddress).then((data) => {
                    handleContractAbiResponse(data);
                });
                break;
        }

        } catch (error) {
            console.log(error);
        }

    }, [contractAddress, chainType]);

    function handleContractAbiResponse(data) {
        try {
            setMessage(null);
            setContractAbiJSON(data && JSON.parse(data.result));
        } catch (e) {
            setMessage(<>{data.result}<br /><b>Check chain and contract address.</b> </>);
        }
    }

    async function onDeployContractClicked(templateName)
    {
        var params = {
            // template name, 
            // name, description, contractAddress, chainType
        };
        const response = await apiRequest(`vendor-contract-deploy`, 'POST', params);
        setManuallyDeployedContract(true)
        setContractDeployResponse({...response});
        setContractAbiJSON([...response?.smartContract?.abi])
        setContractAddress(response?.smartContract?.address)
    }

    useEffect(() => {
        setValuesToCall([])
        refetch();
    }, [ABIToCall]);
    

    // test value using regex to see if it is a valid url
    const isValidAddress = linkRegEx.test(contractAddress);

    return (
        <>
             <div className={'clabel'}>USE A SMART CONTRACT</div>

            <div style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{width: 200, textOverflow: 'ellipsis', overflow: "hidden", whiteSpace: 'nowrap'}}>
                    {isConnected ? 
                    ( <>Connected to {ensName ?? address}</>) : 
                    (<button onClick={() => connect()}>Connect Wallet</button>)}
                </div>
                <select value={chainType} onChange={(e)=>{setChainType(e.target.value)}}>
                    <option value="eth-mainnet">ETH Mainnet</option>
                    <option value="eth-goerli">ETH Goerli</option>
                    <option value="poly-mainnet">Polygon Mainnet</option>
                    <option value="poly-mumbai">Polygon Mumbai</option>
                </select>
            </div><br />
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={'clabel'}>Enter a contract address</div>

                <center>
                {manuallyDeployedContract ? <>
                        <select>
                            {contractTemplates?.map((template, index) => {
                                return <option value={template.name}>{template.name}</option>
                            })}
                        </select>
                            
                        <button onClick={async()=>{
                            await onDeployContractClicked();
                         }}>Deploy NFT Contract</button><br />
                    </>:<input
                    style={{
                        display: 'flex',
                        flexGrow: 1,
                        width: '80vw',
                        maxWidth: '500px',
                        fontFamily: 'Courier New',
                        fontSize: '1.2em',
                        color: isValidAddress ? 'green' : 'red',
                    }}
                    ref={inputRef}
                    autoFocus={true}
                    value={contractAddress}
                    onChange={(e) => {
                        setContractAddress(e.target.value);
                        setManuallyDeployedContract(false);
                    }}
                    list={"contractsInUse"} name="selectedContract" 
                ></input>}
                or <br />
                
                {manuallyDeployedContract ? <>
                    <a href="#" onClick={()=>{
                    // await onDeployContractClicked();
                    setManuallyDeployedContract(false);
                    setABIToCall();
                    setContractAbiJSON()
                    }}>Use an existing contract</a>
                </>: <>
                    <a href="#" onClick={()=>{
                    // await onDeployContractClicked();
                    setManuallyDeployedContract(true);
                    setABIToCall();
                    setContractAbiJSON()
                    }}>Deploy a new contract</a>
                </>}

                </center>
                <datalist id="contractsInUse">
                {[...new Set(contractsInUse)].map((contractAddress)=>{
                    return <option value={contractAddress}></option>
                })}
                </datalist>
                <br />

                {/* {JSON.stringify(contractDeployResponse)} */}
                
                {contractAbiJSON && <div className={'clabel'}>Contract ABI
                <span style={{marginLeft: 6, opacity: 0.5}}>Choose a function to call</span></div>}
                {/* <input style={{
                        display: 'flex',
                        flexGrow: 1,
                        width: '80vw',
                        maxWidth: '500px',
                        fontFamily: 'Courier New',
                        fontSize: '1.2em',}}
                        value={JSON.stringify(contractAbiJSON)}
                        onChange={(e) => {
                            try {
                                var json = JSON.parse(e.target.value);
                                setContractAbiJSON(json);
                            }
                        }}
                ></input> */}

                {contractAbiJSON && <div style={{maxHeight: 200, overflow: 'scroll'}}>
                    {contractAbiJSON.map((item, index) => { 
                        if(item && (item.name == undefined || 
                            item.type == "error")) return;

                        return <div style={{display: 'flex', justifyContent: 'space-between', padding: 4, backgroundColor: index % 2? '#ededed':''}} key={index}>  
                            <div style={{flexGrow: 1, overflow: 'hidden', textOverflow:'ellipsis', whiteSpace:'noWrap', marginRight: 5}}>
                                {item.name}
                                {item.inputs && item.inputs.length > 0 && <span style={{color: 'grey', marginLeft: 5, fontSize: 12}}>({item.inputs.map((input, index) => {
                                    return <span key={index}>{input.type} {input.name}{index < item.inputs.length - 1 && ', '}</span>
                                })})</span>}
                            </div>
                            <div>
                                {(item.name == ABIToCall?.name) ?
                                     "✅" : <button onClick={()=>{setABIToCall(item)}}>
                                        {item.outputs?.length > 0 ? "Read" : "Write"}
                                    </button>}
                            </div>
                        </div>
                    })}
                </div>}

            </div>
            
            {ABIToCall && <>
            <div style={{ width: '100%', height: 1, backgroundColor: `rgba(0,0,0,0.3)`,
                    margin: '15px 0px 15px',
            }}/>

            {ABIToCall?.inputs.length > 0 && <>
                <div className={'clabel'}>Input values</div>
                { ABIToCall?.inputs.map((item, index) => <div key={index} style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Row>{item.name}</Row>
                    <input key={item.name+index} value={valuesToCall && valuesToCall[index]} 
                        placeholder={item.type}
                        onChange={(e)=>{
                            var newValues = [...valuesToCall];
                            newValues[index] = e.target.value;
                            setValuesToCall(newValues);
                        }
                    }></input>
                </div>)}
            </>}
            

            <div className={'clabel'}>Simulated output</div>
            <Row>
                {/* <button onClick={() => sendTransaction()}>Send 10 ETH</button> */}
                {error && <textarea readonly style={{width: '100%'}}>{JSON.stringify(error)}</textarea>}
                {ABIToCall?.outputs?.length == 0 && <><br /><button disabled={!write} onClick={() => write?.()}>Write</button></>}
                {data && <textarea readonly style={{width: '100%'}}>{data}</textarea>}
            
            </Row>
            <button
                    className={'button'}
                    disabled={isValidAddress && ABIToCall ? false : true}
                    style={{ float: 'right' }}
                    onClick={() => {
                        props.addItemToList({
                            type: 'smartcontract',
                            size: {
                                width: 200,
                                height: 50,
                            },
                            contractAddress, chainType, contractAbiJSON, ABIToCall, valuesToCall,
                            write: ABIToCall?.inputs.length > 1 ? true : false,
                        });
                        props.close();
                    }}
                >
                    Add
                </button>
            </>}

            {message && message}
            
        </>
    );
}
