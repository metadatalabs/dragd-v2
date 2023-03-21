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
            className={'tile cbutton'}
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
            {/* {item[1].label && (
                <span className="tooltiptext">{item[1].label}</span>
            )} */}
            <Column className={'panel-shadow'} style={{height: 90, width: 90,
                justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey', border: '2px solid rgba(200,200,200)',
                borderRadius: 10,
                }}>
                <i style={{fontSize: 26,}} className={`${item[1].icon}`}>
                    {item[1].iconURL && <img style={{maxHeight: "70px"}} src={item[1].iconURL} />}
                </i>
            </Column>

            {item[1].label}
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
            {!selected && <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none',
                marginTop: -30,
                marginBottom: 10,
            }}>
                <div style={{pointerEvents: 'all', cursor: 'pointer', margin: "0 10px", width: 8}}
                    onClick={()=>{setParentSelected?.(null); setSelector(null); setSelectedItem('bg');}}>
                        {(selector || parentSelected ) && `←`}
                </div>
                <div>blocks {selected}</div>
                <div style={{pointerEvents: 'all', cursor: 'pointer', width: 8, margin: "0 10px"}}
                    onClick={()=>{
                        setMinimized(true);
                    }}>
                    <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="black" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path></svg>
                </div>
                </div>
            </>}

            {Array.isArray(parentSelected)? <div style={{padding: "0px 10px"}}>
                {controlPanel}
            </div>

            :!selected && !selector && <>
            <div className={'tile cpanel-col'} style={{height: 'calc(100% - 44px)', overflowY: 'scroll', padding: "0px 10px"
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
        <div className={'cpanel'}
            style={{
                zIndex: 9999999,
                height: isMinimized? 50: '70vh',
                marginBottom: -pos.y,
                marginRight: -pos.x,
                maxWidth: '80vw',
                transition: `width 0.2s, height 0.2s ${isMinimized ? `, all 0.1s` : ``}`,
            }}
        >
            {isMinimized ? <Column style={{alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 10, cursor: 'pointer'}} 
                onClick={()=>{setMinimized(false)}}>
                <div style={{fontWeight: 500, fontSize: 20}}>+</div>
                blocks
            </Column> : 
            <div style={{width: 'calc(100%)', 
                height: 40,
                cursor: 'grab'
            }}
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
