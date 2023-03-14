import React, { useState, useRef, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EditItem from '../DDEditor/EditItem';
import SiteContext from '../../siteContext';
const PanelControls = dynamic(() => import('./PanelControls'));

const defaultTextSize = 24;

const fontList = ['Arial', 'Times New Roman', 'Courier New'];

function DraggableText(props) {
    const { elemData, mode, selected } = props;
    const siteData = useContext(SiteContext);

    const fontSource = !fontList.includes(elemData.style?.fontFamily)
        ? 'google'
        : '';

    const onLocalUpdate = (newProps) => siteData.onUpdateDiv(elemData.id, newProps);

    return (
        <>
            <EditItem
                elemData={elemData}
                selected={props.selected}
                renderPanel={props.selected && PanelControls}
                onLocalUpdate={onLocalUpdate}
                mode={mode}
            >
                {fontSource == 'google' && (
                    <>
                        <link
                            rel="preconnect"
                            href="https://fonts.googleapis.com"
                        ></link>
                        <link
                            rel="preconnect"
                            href="https://fonts.gstatic.com"
                        ></link>
                        <link
                            href={`https://fonts.googleapis.com/css2?family=${elemData.style?.fontFamily
                                ?.split(' ')
                                .join('+')}&display=swap`}
                            rel="stylesheet"
                        ></link>
                    </>
                )}
                <EditableDiv
                    value={elemData.text}
                    contentEditable={props.selected}
                    key={elemData.id + '-' + elemData.fontSize + '-'}
                    onChange={(text) => {
                        console.log(text)
                        onLocalUpdate({ text: text });
                    }}
                    style={{
                        ...elemData.style,
                    }}
                />
            </EditItem>
        </>
    );
}

export default DraggableText;

function EditableDiv(props) {
    const { value, contentEditable, onChange, style } = props;
    const [text, setText] = useState(value);
    const [cursor, setCursor] = useState(null);
    const [dragMove, setDragMove] = useState(false);
    const inputRef = useRef();

    useEffect(()=>{
        if(document.activeElement !== inputRef.current) 
        setText(value)
    }, [value])

    function emitChange() {
        var value = inputRef.current.innerHTML;
        onChange && onChange(value);
    }

    function onPaste(e) {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHtml', false, text);
    }

    return (<>
        {<div
            ref={inputRef}
            onPaste={onPaste}
            onInput={emitChange}
            // onBlur={emitChange}
            contentEditable={contentEditable}
            onTouchStart={() => {
                !contentEditable && setDragMove(true);
            }}
            onTouchMove={()=> {
                setDragMove(true);
            }}
            onTouchEndCapture={()=>{
                setDragMove(false);
            }}
            onFocus={() => {
                setCursor('pointer');
            }}
            onBlur={() => {
                setCursor(undefined);
                emitChange();
            }}
            style={{ cursor: cursor, ...style }}
            dangerouslySetInnerHTML={{ __html: text }}
        >
            {/* {text} */}
        </div>}
        </>
    );
}
