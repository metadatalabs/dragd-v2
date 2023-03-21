import React, { useState, useEffect, useRef, useContext } from 'react';
import { EditorModes } from '../..';
import { Column, debounce, getMobileScaleRatio } from '../../helpers/helper';
import SiteContext from '../../siteContext';
import Menu from '../EditMenu/EditMenu';
import MobileBoundary from './MobileBoundary';
import HelpDesk from '../EditMenu/HelpDesk';
export default function VisibleEditor(props) {
    if(props.immutable) return <></>;

    const siteData = useContext(SiteContext);
    const {
        items,
        selected,
        setSelected,
        mode,
        setModal,
        pressedKeys,
        setControlPanel
    } = siteData;

    const { pastItems, setPastItems, undoCount, setUndoCount, setItems } = props;

    function undo(e: React.MouseEvent<HTMLElement>) {
        if(pastItems.length - undoCount - 1 <= 0) return;
        setItems(pastItems[pastItems.length - 1 - (undoCount + 1)]);
        setUndoCount(undoCount + 1);

        e?.stopPropagation();
        // analytics.track('editor_undo');
    }

    function redo(e: React.MouseEvent<HTMLElement>) {
        if(undoCount <= 0) return;
        setItems(pastItems[pastItems.length - 1 - (undoCount - 1)]);
        setUndoCount(undoCount - 1);

        e?.stopPropagation();
        // analytics.track('editor_redo');
    }

    function showHelp(e: React.MouseEvent<HTMLElement>) {
        setModal(<HelpDesk />)
        e?.stopPropagation();
    }

    //// KEYBOARD SHORTCUTS ////
    useEffect(() => {
        if (mode !== EditorModes.EDIT) return;
    
        const newItems = { ...items };
    
        const performAction = (action) => {
            selected.forEach((id) => {
                action(newItems, id);
            });
            setItems(newItems);
        };
    
        const deleteItem = (items, id) => {
            delete items[id];
            setControlPanel(null);
        };
    
        const moveItem = (axis, delta) => {
            return (items, id) => {
                const item = items[id];
                if (item) {
                    item.pos[axis] += delta;
                }
            };
        };
    
        if (pressedKeys.includes('Backspace') || pressedKeys.includes('Delete')) {
            performAction(deleteItem);
        } else if (pressedKeys.includes('Escape')) {
            setSelected([]);
        } else if (pressedKeys.includes('z') && pressedKeys.includes('Control')) {
            undo(null);
        } else if (pressedKeys.includes('y') && pressedKeys.includes('Control')) {
            redo(null);
        } else if (pressedKeys.includes('ArrowUp')) {
            performAction(moveItem('y', -1));
        } else if (pressedKeys.includes('ArrowDown')) {
            performAction(moveItem('y', 1));
        } else if (pressedKeys.includes('ArrowLeft')) {
            performAction(moveItem('x', -1));
        } else if (pressedKeys.includes('ArrowRight')) {
            performAction(moveItem('x', 1));
        }
    }, [pressedKeys]);

    return <div>
        {props.children}
        {mode == EditorModes.EDIT && selected[0]?.length > 20 && (
            <MobileBoundary />
        )}
        {mode == EditorModes.EDIT && pastItems.length > 1 && (
            <div
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '10px',
                    padding: '10px',
                    zIndex: 999999,
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {pastItems.length - undoCount - 1 > 0 ? 
                (
                    <PanelButton
                        onClick={undo}
                    >
                        <UndoIcon />
                    </PanelButton>
                ) : 
                (
                    <div style={{ width: 52 }} />
                )}
                <div style={{ padding: '6px' }} />
                {undoCount > 0 && (
                    <PanelButton
                        onClick={redo}
                    >
                        <RedoIcon />
                    </PanelButton>
                )}
            </div>
        )}

        {(
            <div
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    padding: '10px',
                    zIndex: 999999,
                }}
            >
                <Column style={{ alignItems: 'flex-end' }}>
                    {mode == EditorModes.EDIT && (
                        <Menu
                            selected={selected}
                            addItemToList={undefined}
                        />
                    )}

                    <div style={{ padding: 5 }}></div>

                    {mode == EditorModes.VIEW ? (
                        <PanelButton
                            onClick={props.onEditClicked}
                        >
                            <EditIcon />

                        </PanelButton>
                    ) : (
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className="tooltip">
                        <PanelButton
                            onClick={showHelp}
                        >
                            <span className="tooltiptext">Help Center</span>
                            <HelpIcon />
                        </PanelButton>
                        </div>
                        <div style={{padding: 5}}></div>
                        <div className="tooltip">
                        <PanelButton
                            onClick={props.onSaveClicked}
                        >
                            <span className="tooltiptext">Save Changes</span>
                            <SaveIcon />
                        </PanelButton>
                        </div>
                    </div>
                    )}
                </Column>
            </div>
        )}
    </div>
}

const PanelButton = (props) => <div className={
        'cbutton cbuttonmain'
    }{...props}>
    {props.children}
</div>

const EditIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
}

const SaveIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>  
}

const HelpIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
}

const UndoIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
  </svg>
}

const RedoIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
  </svg>
}