import React, { useState, useContext, useEffect } from 'react';
import analytics from '../../../../util/analytics';
import { guidGenerator } from '../../helpers/helper';
import SiteContext from '../../siteContext';

function DefaultControlPanel({
    saveElemJson,
    elemData,
    setModal,
    CustomPanel,
    onLocalUpdate,
}) {
    const {deleteItemFromList, addItemToList, setControlPanel, setSelected} = useContext(SiteContext);
    useEffect(() => {
        CustomPanel && setControlPanel(<CustomPanel id={elemData.id}/>)
    }, [])

    const handleEvent = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: elemData.pos.y - elemData.size?.height / 2,
                    left: elemData.pos.x,
                    zIndex: 99999999999,
                    display: 'flex',
                    justifyContent: 'center',
                }}
                onClick={handleEvent}
                onMouseDown={handleEvent}
                onTouchStart={handleEvent}
            >
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(0, calc(-100% - 20px))`,
                    }}
                >
                    <div
                        className={'cpanel cpanel-shadow'}
                        style={{
                            padding: 10,
                            position: 'relative',
                        }}
                    >
                        <div className={'flexRow'}>
                            <div
                                className={'cbutton cbuttoninner'}
                                onClick={() => {
                                    setModal(
                                        <UriInputModal
                                            prefill={elemData.href}
                                            onComplete={(data) => {
                                                saveElemJson({ href: data });
                                                setModal(null);
                                            }}
                                        />,
                                    );
                                }}
                            >
                                <LinkIcon />
                            </div>
                            <div
                                className={'cbutton cbuttoninner'}
                                onClick={() => {
                                    saveElemJson({
                                        zIndex: elemData.zIndex + 1000,
                                    });
                                }}
                            >
                                <LayerIcon />
                            </div>
                            <div
                                className={'cbutton cbuttoninner'}
                                onClick={() => {
                                    saveElemJson({
                                        zIndex: elemData.zIndex - 1000,
                                    });
                                }}
                            >
                                <LayerIcon />
                            </div>
                            <div
                                className={'cbutton cbuttoninner'}
                                onClick={() => {
                                    var dupeItem = {...elemData, 
                                        pos: {x: elemData.pos.x + 10, y: elemData.pos.y + 10}, 
                                        id: (guidGenerator())
                                    }
                                    addItemToList(dupeItem);
                                }}
                            >
                                <CopyIcon />
                            </div>
                            <div
                                className={'cbutton cbuttoninner'}
                                onClick={() => {
                                    setSelected('bg');
                                    setControlPanel(null);
                                    deleteItemFromList(elemData.id);
                                }}
                            >
                                <span style={{ color: 'darkred' }}>
                                <TrashIcon/> </span>
                                    
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function UriInputModal(props) {
    console.log(props);
    const [value, setValue] = useState(props.prefill || 'https://');
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
                className={'minimal-input'}
                style={{ display: 'flex', flexGrow: 1 }}
                autoFocus={true}
                defaultValue={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    // analytics.track('editor_update_link');
                }}
            ></input>
            <button
                className={'button'}
                onClick={() => {
                    props.onComplete(value);
                }}
            >
                Set
            </button>
            <div className="is-divider" data-content="OR"></div>
        </div>
    );
}

export default DefaultControlPanel;

const LinkIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
}  

const LayerIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>
}

const CopyIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
  </svg>  
}

const TrashIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
}  