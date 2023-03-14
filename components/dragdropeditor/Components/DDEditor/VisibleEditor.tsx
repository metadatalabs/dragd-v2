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
        if(mode !== EditorModes.EDIT) return;

        // if delete button is pressed, delete item from items
        if (pressedKeys.includes('Backspace') || pressedKeys.includes('Delete')) {
            const newItems = { ...items };
            setControlPanel(null);
            selected.forEach((id) => {
                delete newItems[id];
            });
            setItems(newItems);
        } else if (pressedKeys.includes('Escape')) {
            setSelected([]);
        } // undo on pressing ctrl+z
        else if (pressedKeys.includes('z') && pressedKeys.includes('Control')) {
            undo(null);
        } // redo on pressing ctrl+y
        else if (pressedKeys.includes('y') && pressedKeys.includes('Control')) {
            console.log("doi g redo")
            redo(null);
        }
        // if up arrow, move item up
        else if (pressedKeys.includes('ArrowUp')) {
            const newItems = { ...items };
            selected.forEach((id) => {
                const item = newItems[id];
                if (item) {
                    item.pos.y = item.pos.y - 1;
                }
            })
            setItems(newItems);
        } // if down arrow, move item down
        else if (pressedKeys.includes('ArrowDown')) {
            const newItems = { ...items };
            selected.forEach((id) => {
                const item = newItems[id];
                if (item) {
                    item.pos.y = item.pos.y + 1;
                }
            })
            setItems(newItems);
        } // if left arrow, move item left
        else if (pressedKeys.includes('ArrowLeft')) {
            const newItems = { ...items };
            selected.forEach((id) => {
                const item = newItems[id];
                if (item) {
                    item.pos.x = item.pos.x - 1;
                }
            })
            setItems(newItems);
        } // if right arrow, move item right
        else if (pressedKeys.includes('ArrowRight')) {
            const newItems = { ...items };
            selected.forEach((id) => {
                const item = newItems[id];
                if (item) {
                    item.pos.x = item.pos.x + 1;
                }
            })
            setItems(newItems);
        }
    }, [pressedKeys])

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
                    left: '100px',
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
                        <i className="fas fa-undo"></i>
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
                        <i className="fas fa-redo"></i>
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
                            <i className="fas fa-pen"></i>
                        </PanelButton>
                    ) : (
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className="tooltip">
                        <PanelButton
                            onClick={showHelp}
                        >
                            <span className="tooltiptext">Help Center</span>
                            <i className="fas fa-question"></i>
                        </PanelButton>
                        </div>
                        <div style={{padding: 5}}></div>
                        <div className="tooltip">
                        <PanelButton
                            onClick={props.onSaveClicked}
                        >
                            <span className="tooltiptext">Save Changes</span>
                            <i className="fas fa-save"></i>
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
        'cbutton cbuttonmain hovershadow'
    }{...props}>
    {props.children}
</div>