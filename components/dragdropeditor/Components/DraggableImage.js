import React, { useState, useEffect, useContext } from 'react';
import { Input } from '../helpers/helper';
import SiteContext from '../siteContext';
import EditItem from './DDEditor/EditItem';


function PanelControls({id}) {
    const {items, onUpdateDiv} = useContext(SiteContext);
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    function setImageUri(uri) {
        onLocalUpdate({ imageUri: uri });
    }
    return (
        <>
                <Prompter
                    setImageUri={setImageUri}
                    imageUri={elemData.imageUri}
                />

            <div
                className={'btn'}
                style={{ marginLeft: '8px' }}
                onClick={() => {
                    onLocalUpdate({ maxWidth: !elemData.maxWidth });
                }}
            >
                <i className="fas fa-arrows-alt-h" />
            </div>
        </>
    );
}

function DraggableImage(props) {
    const { elemData, selected } = props;
    const siteData = useContext(SiteContext);
    const { setSelected: onSelect, onUpdateDiv: onUpdated, mode } = siteData;

    return (
        <>
            <EditItem
                elemData={elemData}
                onSelect={onSelect}
                onUpdated={onUpdated}
                selected={props.selected}
                renderPanel={PanelControls}
                mode={mode}
            >
                {!elemData.imageUri ? (
                    <center>Set an image URL</center>
                ) : (
                    <img
                        style={{ width: '100%', height: '100%' }}
                        src={elemData.imageUri}
                    />
                )}
            </EditItem>
        </>
    );
}


const Prompter = (props) => {
    const [imageUri, setImageUri] = useState(props.imageUri);

    function toDataURL(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS');
            // @ts-expect-error TODO: getContext exists on canvas, investigate
            var ctx = canvas.getContext('2d');
            var dataURL;
            // @ts-expect-error TODO: naturalHeight exists on canvas, investigate
            canvas.height = this.naturalHeight;
            // @ts-expect-error TODO: naturalWidth exists on canvas, investigate
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            // @ts-expect-error TODO: toDateURL exists on canvas, investigate
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            return dataURL;
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src =
                'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
            img.src = src;
        }
    }

    async function loadImageToUri() {
        // @ts-expect-error TODO: window fs access not allowed in strict
        try {
        const [file] = await window.showOpenFilePicker();
        const locFile = await file.getFile();
        console.log(locFile);
        const stream = await locFile.arrayBuffer();
        console.log(stream);
        var blob = new Blob([stream], { type: locFile.type });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);

        toDataURL(
            imageUrl,
            (dataUrl) => {
                console.log(dataUrl);
                setImageUri(dataUrl);
            },
            locFile.type,
        );
        } catch (e){}
    }

    return (
        <>
            <center>
                <p
                    class="title is-6 text-title"
                >
                    Choose or upload an image
                </p>
            </center> <br />
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <Input
                    placeholder={'Image URL'}
                    value={imageUri}
                    onChange={(value) => {
                        setImageUri(value);
                    }}
                    style={{overflow: 'hidden'}}
                />
                <div style={{width: 18}} />
                <div
                    className={'btn'}
                    onClick={() => {
                        loadImageToUri();
                    }}
                >
                    <img
                        style={{
                            width: '18px',
                            height: '18px',
                        }}
                        src="https://i.imgur.com/rFn3Kjx.png"
                    />
                </div>
            </div>

            <div style={{maxWidth: '100%', padding: 10}}>
                <p class="subtitle is-7 text-subtitle"
                    style={{ color: '#949494', marginBottom: 10}}>
                    Preview:
                </p>
                {imageUri ? (<img style={{ maxWidth: '350px', width: '100%', maxHeight: '100%' }} src={imageUri} />) : 
                <center>No image selected</center>}
            </div>

            <div style={{float: "right", marginBottom: 20}} >
                
                <button className={"button"} onClick={()=>{props.setImageUri(imageUri); }}>
                    Save
                </button>
            </div>
        </>
    );
};


export default DraggableImage;
