import React, { useContext } from 'react';
import { Input } from '../helpers/helper';
import ReactAudioPlayer from 'react-audio-player';
import EditItem from './DDEditor/EditItem';
import SiteContext from '../siteContext';


function PanelControls({id}) {
    const {items, onUpdateDiv} = useContext(SiteContext);
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    return (
        <>
            <Input
                placeholder={'url'}
                value={elemData.audioUri}
                onChange={(value) => {
                    onLocalUpdate({audioUri: value});
                }}
            />
        </>
    );
}

function DraggableAudio(props) {
    const { elemData, onSelect, onUpdated, } = props;

    return (
        <>
            <EditItem
                elemData={elemData}
                onSelect={onSelect}
                onUpdated={onUpdated}
                selected={props.selected}
                renderPanel={PanelControls}
            >
                {!elemData.audioUri ? (
                    <center>Set a audio URL</center>
                ) : (
                    <ReactAudioPlayer
                        style={{ width: '100%', height: '100%' }}
                        src={elemData.audioUri}
                        autoPlay
                        controls
                    />
                )}
            </EditItem>
        </>
    );
}

export default DraggableAudio;
