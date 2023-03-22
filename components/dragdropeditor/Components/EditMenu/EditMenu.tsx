import { useContext, useEffect, useState } from 'react';
import { Column, isMobile, isMobileViewport, Row } from '../../helpers/helper';
import defaultButtons from './defaultButtons';
import { v4 as uuidv4 } from 'uuid';
import { GiphySelector } from '../DraggableGiphy/GiphySelector';
import { HeadConfigurator } from '../NextHead';
import SiteContext from '../../siteContext';
import { ButtonSelector } from '../DraggableButton/ButtonSelector';
import { TemplateSelector } from '../DraggableTemplate';
import { EthContractSelector } from '../DraggableEth/EthContractSelector';
import analytics from '../../../../util/analytics';

export function AddButton({ item, showMenu, setSelector }) {
    const siteData = useContext(SiteContext);

    const SELECTORS: any = {
        giphy: <GiphySelector addItemToList={siteData.addItemToList} />,
        headconf: <HeadConfigurator addItemToList={siteData.addItemToList} />,
    };

    const FUNCS: any = {
        button: (
            <ButtonSelector
                addItemToList={siteData.addItemToList}
                close={() => siteData.setModal(null)}
            />
        ),
        template: (
            <TemplateSelector
                addItemToList={siteData.addItemToList}
                close={() => siteData.setModal(null)}
            />
        ),
        eth: (
            <EthContractSelector
                addItemToList={siteData.addItemToList}
                close={() => siteData.setModal(null)}
            />
        ),
    };

    return (
        <div
            className={'tile cbutton tooltip'}
            style={{padding: "5px 0px", fontSize: 12, flexShrink: 1, textAlign: 'center', justifyContent: 'flex-start'}}
            onClick={(e) => {
                switch (item[1].action) {
                    case 'add':
                        siteData.addItemToList(item[1].object);
                        showMenu(null);
                        // analytics.track('editor_add_item', item[1].object.type);
                        break;
                    case 'menu':
                        showMenu(item[1].objects);
                        break;
                    case 'selector':
                        setSelector(SELECTORS[item[1].selector]);
                        break;
                    case 'modal':
                        siteData.setModal(FUNCS[item[1].selector]);
                        break;
                }
                e.stopPropagation();
            }}
        >
            <Column className={'panel-shadow bg-[#083300]'} style={{
                height: 40, width: 40,
                justifyContent: 'center', alignItems: 'center',
                borderRadius: 10,
                }}>
                {item[1].icon}
            </Column>
            {item[1].label && (
                <span className="tooltiptext">{item[1].label}</span>
            )}
        </div>
    );
}

function Menu({ addItemToList, selected }) {
    const siteData = useContext(SiteContext);
    const {setSelected} = siteData;
    const [isMinimized, setMinimized] = useState(false);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <FloatingPanel isMinimized={isMinimized} setMinimized={setMinimized}>
            <NestedMenu
                    data={defaultButtons}
                    addItemToList={siteData.addItemToList}
                    parentSelected={selected.length == 0? null: selected}
                    setMinimized={setMinimized}
                    setParentSelected={setSelected}
                />
            </FloatingPanel>
            {/* <Row>
                
            </Row> */}
        </div>
    );
}

function NestedMenu({ data, addItemToList, parentSelected, setParentSelected = null, setMinimized = null }) {
    const [selected, setSelected] = useState(null);
    const [selector, setSelector] = useState(null);
    const siteData = useContext(SiteContext);

    const {items, controlPanel, setSelected: setSelectedItem} = siteData;
    useEffect(() => {
        setSelected(null);
        setSelector(null);
    }, [parentSelected]);

    useEffect(() => {
        setSelector(null);
    }, [selected]);

    return (
        <>
            {!selected && 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none',
                marginTop: -30,
                marginBottom: 10,
                height: 20,
            }}>
                <div className={'cursor-pointer w-6 px-0 ml-1 hover:bg-gray-200 rounded-full'}
                    style={{pointerEvents: 'all'}}
                    onClick={()=>{setParentSelected?.(null); setSelector(null); setSelectedItem('bg');}}>
                        {(selector || parentSelected ) && `←`}
                </div>
                <div><DragHandle />{selected}</div>
                <div className={'cursor-pointer w-5 px-1 mr-1 hover:bg-gray-200 rounded-full'} 
                style={{pointerEvents: 'all'}}
                    onClick={()=>{
                        setMinimized(true);
                    }}>
                    <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="black" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path></svg>
                </div>
            </div>}

            {Array.isArray(parentSelected)? <div className="flex flex-grow px-3 text-left">
                {controlPanel}
            </div>

            :!selected && !selector && <>
            <div className={'tile cpanel-col'} style={{padding: "0px 10px"
            }}>
                <div className={"tile is-flex-wrap-wrap cpanel-col-buttons"} style={{alignContent: 'flex-start', justifyContent: 'flex-start'}}>

                    {Object.entries(data).map((item) => {
                        return (
                            <AddButton
                                key={uuidv4()}
                                item={item}
                                showMenu={setSelected}
                                setSelector={setSelector}
                            />
                        );
                    })}
                </div>
            </div></>}



            {selector && <Column style={{width: '100%', alignItems: 'center'}} className={'cpanel-col'}>{selector}</Column>}
            {/* todo make this truly recursive by adding editmenu again */}
            {selected != null && (
                <NestedMenu
                    data={selected}
                    addItemToList={addItemToList}
                    parentSelected={selected}
                    setParentSelected={setSelected}
                />
            )}
        </>
    );
}

function FloatingPanel({ children, style = null, isMinimized, setMinimized }) {
    const originPos = {x:0, y:0};
    
    const [dragging, setDragging] = useState(false);
    const [pos, setPos] = useState({x:0, y:0});
    const [clickOffset, setClickOffset] = useState({ x: 0, y: 0 });

    useEffect(()=>{
        setPos(originPos);
    }, [isMinimized])
    
    const isMobile = isMobileViewport();

    return (
        <div className={'cpanel flex flex-col'}
            style={{
                zIndex: 8888888,
                height: isMinimized? 55: '70vh',
                maxWidth: '80vw',
                marginBottom: -pos.y,
                marginRight: -pos.x,
                transition: `width 0.2s, height 0.2s ${isMinimized ? `, all 0.1s` : ``}`,
            }}
        >
            {isMinimized ? <Column className={'cbutton cbuttonmain'} style={{height: '100%', fontSize: 10, cursor: 'pointer'}} 
                onClick={()=>{setMinimized(false)}}>
                <div style={{fontWeight: 500, fontSize: 20}}>+</div>
                blocks
            </Column> : 
            <div className='h-10 cursor-grab' 
            onMouseDown={(e) => {
                setDragging(true);
                // setClickOffset({ x: e.clientX - (window.innerWidth - pos.x), y: e.clientY - pos.y});
                setClickOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y});
            }}
            onMouseUp={(e) => {
                setDragging(false);
            }}
            onMouseMove={(e) => {
                if (dragging) {
                    setPos({ x: e.clientX - clickOffset.x, y: e.clientY - clickOffset.y});
                    // setPos({ x: window.innerWidth - (e.clientX - clickOffset.x), y: e.clientY - clickOffset.y});
                }
            }}></div>}
            {!isMinimized && children}
        </div>
    );
}

export default Menu;

const DragHandle = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
  
}