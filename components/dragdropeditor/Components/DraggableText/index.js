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

    const [isEditorFocused, setIsEditorFocused] = useState(false);

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
                draggingDisabled={isEditorFocused}
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
                    selected={selected && siteData.selected?.length == 1}
                    onChange={(text) => {
                        onLocalUpdate({ text: text });
                    }}
                    isEditorFocused={isEditorFocused}
                    setIsEditorFocused={setIsEditorFocused}
                    style={{
                        ...elemData.style,
                    }}
                />
                {isEditorFocused && <div className={`absolute right-1 bottom-1 p-1 
                rounded-md bg-slate-500 text-xs font-bold text-gray-200 animate-pulse`}>
                    EDITING
                    </div>}
            </EditItem>
        </>
    );
}

export default DraggableText;

function EditableDiv(props) {
    const { value, contentEditable, onChange, style, selected, isEditorFocused, setIsEditorFocused } = props;
    const [text, setText] = useState(value);
    const [startPos, setStartPos] = useState({x: undefined, y: undefined});
    const inputRef = useRef();

    useEffect(()=>{
        if(document.activeElement !== inputRef.current) 
        setText(value)
    }, [value])

    useEffect(() => {
        if(isEditorFocused) {
            inputRef.current.focus();
        }
    }, [isEditorFocused])

    useEffect(() => {
        if(!selected) setIsEditorFocused(false);
    }, [selected])

    function emitChange() {
        var value = inputRef.current.innerHTML;
        onChange && onChange(value);
    }

    function onPaste(e) {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHtml', false, text);
    }

    const onMouseDown = (e) => {
        if(selected)
        {
            var xPos = e.pageX ? e.pageX : e?.changedTouches[0].pageX;
            var yPos = e.pageY ? e.pageY : e?.changedTouches[0].pageY;
            setStartPos({x: xPos, y: yPos});
        }
    }

    const onMouseUp = (e) => {
        var xPos = e.pageX ? e.pageX : e?.changedTouches[0].pageX;
        var yPos = e.pageY ? e.pageY : e?.changedTouches[0].pageY;
        if(startPos && startPos?.x === xPos && startPos?.y === yPos) 
            setIsEditorFocused(true);
        setStartPos(undefined);

    }

    return (<>
        {!isEditorFocused && <div
            key={'not-selected'}
            style={{ ...style, height: '100%' }}
            dangerouslySetInnerHTML={{ __html: value }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
        ></div>}
        {isEditorFocused && <div
            key={'selected-'+props.value}
            ref={inputRef}
            onPaste={onPaste}
            // onInput={emitChange}
            // onBlur={emitChange}
            contentEditable={contentEditable}
            onFocus={() => {
                // inputRef.current.focus();
            }}
            onBlur={() => {
                setIsEditorFocused(false);
                emitChange();
            }}
            onChange={emitChange}
            style={{ cursor: 'cursor', ...style, height: '100%' }}
            dangerouslySetInnerHTML={{ __html: text }}
        >
            {/* {text} */}
        </div>}
        </>
    );
}
