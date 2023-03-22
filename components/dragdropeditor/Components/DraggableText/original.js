import React, { useState, useRef, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EditItem from '../DDEditor/EditItem';
import SiteContext from '../../siteContext';

import {Editor, EditorState, ContentState, RichUtils,getDefaultKeyBinding, KeyBindingUtil, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from 'draft-js-import-markdown';
import GenericDropdown from '../../../UI/GenericDropdown';

import fonts from '../../helpers/ui/fonts.json';
const googleFonts = fonts['googleFonts'];

const fontList = ['Arial', 'Times New Roman', 'Courier New', ...googleFonts];

const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        text: "",
        key: "foo",
        type: "unstyled",
        entityRanges: [],
      },
    ],
  });

const PanelControls = dynamic(() => import('./PanelControls'));

function DraggableText(props) {
    const { elemData, mode, selected } = props;
    const siteData = useContext(SiteContext);
    // let contentState = stateFromMarkdown(markdown);

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


    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(emptyContentState)
        );

        const rawContentState = convertToRaw(editorState.getCurrentContent());

    useEffect(() => {
        console.log(stateToMarkdown(editorState.getCurrentContent()))
        onChange(stateToMarkdown(editorState.getCurrentContent()))
        const rawContentState = convertToRaw(editorState.getCurrentContent());
    }, [editorState])
    
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

    function toggleInlineStyle (event) {
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
      }

      function toggleInlineStyleWithParams(attribute) 
      {
        // event.preventDefault();
        // let style = event.currentTarget.getAttribute('data-style');
        setEditorState(RichUtils.toggleInlineStyle(editorState, attribute));
      }


      function handleKeyCommand(command) {
        // inline formatting key commands handles bold, italic, code, underline
        var newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (!newState && command === 'strikethrough') {
          newState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
        }
    
        if (!newState && command === 'blockquote') {
          newState = RichUtils.toggleBlockType(editorState, 'blockquote');
        }
    newState
        if (!newState && command === 'ordered-list') {
          newState = RichUtils.toggleBlockType(editorState, 'ordered-list-item');
        }
    
        if (!newState && command === 'unordered-list') {
          newState = RichUtils.toggleBlockType(editorState, 'unordered-list-item');
        }
    
        if (newState) {
         setEditorState(newState);
          return 'handled';
        }
    
        return 'not-handled';
      }

      function toggleBlockType (event) {
        event.preventDefault();
    
        let block = event.currentTarget.getAttribute('data-block');
        setEditorState(RichUtils.toggleBlockType(editorState, block));
      }

    return (<>
    {contentEditable ? <>
    <div>
        <Editor editorState={editorState} onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFunction}
            placeholder={"Once upon a time there was a..."}
            customStyleMap={customStyleMap}
        />
        </div>
    <div>
        
{['BOLD', 'ITALIC', 'UNDERLINE', 'CODE'].map((style) => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();

    return <input
    type="button"
    key={style}
    value={style}
    className={currentInlineStyle.has(style) && 'ring-1'}
    data-style={style}
    onClick={toggleInlineStyle}
    onMouseDown={toggleBlockType}
  />
})}

<GenericDropdown 
                label={<>Font Size</>}
                options={['font_xs', 'font_sm', 'font_md', 'font_lg', 'font_xl', 'font_xxl'].map((font) => {
                    return <button
                    className='w-full hover:bg-gray-200'
                    onMouseDown={async (e) => {
                        toggleInlineStyleWithParams(font);
                        e.preventDefault();
                }}
            >
                    <span style={{fontSize: customStyleMap[font],fontFamily: font}}>{font}</span>
                </button>
                })}
                />

            <GenericDropdown 
                label={<>
                    {/* <link href={`https://fonts.googleapis.com/css2?family=${ elemData?.style?.fontFamily?.split(" ").join("+")}&display=swap`} rel="stylesheet"></link>
                    <span style={{fontFamily: elemData?.style?.fontFamily}}>{elemData?.style?.fontFamily}</span> */}
                    </>}
                options={fontList.map((font) => {
                    return <button
                    className='w-full hover:bg-gray-200'
                    onMouseDown={async (e) => {
                        toggleInlineStyleWithParams();
                        e.preventDefault();
                }}
            >
                    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
                    <link href={`https://fonts.googleapis.com/css2?family=${font?.split(" ").join("+")}&display=swap`} rel="stylesheet"></link>
                    <span style={{fontFamily: font}}>{font}</span>
                </button>
                })}
                />

</div></> : 

        <div
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
                setCursor('text');
            }}
            onBlur={() => {
                setCursor(undefined);
                emitChange();
            }}
            style={{ cursor: 'text', ...style }}
            dangerouslySetInnerHTML={{ __html: text }}
        >
            {/* {text} */}
        </div>}
        </>
    );
}

function keyBindingFunction(event) {
    if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === 'x') {
      return 'strikethrough';
    }
  
    if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === '7') {
      return 'ordered-list';
    }
  
    if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === '8') {
      return 'unordered-list';
    }
  
    if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === '9') {
      return 'blockquote';
    }
  
    return getDefaultKeyBinding(event);
  }

//   const inlineStyles = [
//     { label: "<strike>S</strike> ", style: "STRIKETHROUGH" },
//     { label: "I am your header", style: "FONT_SIZE_32" }
//   ];

  const customStyleMap = {
    STRIKETHROUGH: {
        textDecoration: "line-through"
    },
    font_xs: {
        fontSize: "12px"
    },
    font_sm: {
        fontSize: "14px"
    },
    font_md: {
        fontSize: "16px"
    },
    font_lg: {
        fontSize: "18px"
    },
    font_xl: {
        fontSize: "20px"
    },
    font_xxl: {
        fontSize: "24px"
    },
  };