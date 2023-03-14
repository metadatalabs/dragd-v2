import React, { useContext } from 'react';
import { Input } from '../helpers/helper';
import ReactPlayer from 'react-player/lazy';
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
                value={elemData.videoUri}
                onChange={(value) => {
                    onLocalUpdate({videoUri: value});
                }}
            />
        </>
    );
}

function DraggableVideo(props) {
    const { elemData } = props;

    return (
        <>
            <EditItem
                elemData={elemData}
                selected={props.selected}
                renderPanel={PanelControls}
            >
                {!elemData.videoUri ? (
                    <center>Set a video URL</center>
                ) : (
                    <ReactPlayer
                        url={elemData.videoUri}
                        style={{ width: '100%', height: '100%' }}
                        playsinline={true}
                    />
                )}
            </EditItem>
        </>
    );
}

export default DraggableVideo;
