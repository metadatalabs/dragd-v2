import React from 'react';
import dynamic from 'next/dynamic';
const EditItem = dynamic(() => import('./DDEditor/EditItem'));
const DraggableImage = dynamic(() => import('./DraggableImage'));
const DraggableDiffusion = dynamic(() => import('./DraggableDiffusion'));
const DraggableDiv = dynamic(() => import('./DraggableDiv'));
const DraggableText = dynamic(() => import('./DraggableText'));
const DraggableGiphy = dynamic(() => import('./DraggableGiphy'));
const DraggableVideo = dynamic(() => import('./DraggableVideo'));
const DraggableAudio = dynamic(() => import('./DraggableAudio'));
const DraggableButton = dynamic(() => import('./DraggableButton'));
const DraggableHtml = dynamic(() => import('./DraggableHtml'));
const DraggableForm = dynamic(() => import('./DraggableForm'));
const DraggableTemplate = dynamic(() => import('./DraggableTemplate'));
const DraggableEth = dynamic(() => import('./DraggableEth'));
const NextHead = dynamic(() => import('./NextHead.js'));

function ComponentSelector({ elem, selected }) {
    const isSelected = selected && selected.includes(elem.id);
    switch (elem.type) {
        case 'test':
            return (
                <EditItem elemData={elem} selected={isSelected}>
                    Drag Me!
                </EditItem>
            );
        case 'text':
            return <DraggableText elemData={elem} selected={isSelected} />;
        case 'button':
            return <DraggableButton elemData={elem} selected={isSelected} />;
        case 'image':
            return <DraggableImage elemData={elem} selected={isSelected} />;
        case 'diffusion':
            return <DraggableDiffusion elemData={elem} selected={isSelected} />;
        case 'giphy':
            return <DraggableGiphy elemData={elem} selected={isSelected} />;
        case 'video':
            return <DraggableVideo elemData={elem} selected={isSelected} />;
        case 'audio':
            return <DraggableAudio elemData={elem} selected={isSelected} />;
        case 'smartcontract':
            return <DraggableEth elemData={elem} selected={isSelected} />;
        case 'color':
            return <DraggableDiv elemData={elem} selected={isSelected} />;
        case 'markdown':
        case 'code':
            return <DraggableHtml elemData={elem} selected={isSelected} />;
        case 'form':
            return <DraggableForm elemData={elem} selected={isSelected} />;
        case 'head':
            return <NextHead elemData={elem} />;
        case 'template':
            return <DraggableTemplate elemData={elem} selected={isSelected} />;
        default:
            return <></>;
    }
}

export default ComponentSelector;
