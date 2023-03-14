import React, { useState, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import { Input } from '../../helpers/helper';
import EditItem from '../DDEditor/EditItem';

import SiteContext from '../../siteContext';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const PanelControls = dynamic(() => import('./PanelControls'));

const defaultTextSize = 24;

function DraggableHtml(props) {
    const { elemData, selected } = props;

    const siteData = useContext(SiteContext);
    const {
        setSelected: onSelect,
        mode,
    } = siteData;

    const onLocalUpdate = (newProps) => siteData.onUpdateDiv(elemData.id, newProps);


    return (
        <>
            <EditItem
                elemData={elemData}
                onSelect={onSelect}
                onUpdated={siteData.onUpdated}
                selected={selected}
                onLocalUpdate={onLocalUpdate}
                renderPanel={selected && PanelControls}
                mode={mode}
            >
            {elemData.subtype == "html" && <div style={{width: '100%', height: '100%'}}
                dangerouslySetInnerHTML={{ __html: elemData.text }}
            ></div>}
            {elemData.subtype == "md" && <div className={"content"}>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    children={elemData.text}
                    allowDangerousHtml
                />
            </div>}
            </EditItem>
        </>
    );
}

export default DraggableHtml;


