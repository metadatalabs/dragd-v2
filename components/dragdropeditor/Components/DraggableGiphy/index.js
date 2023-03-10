import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import EditItem from '../DDEditor/EditItem';
import { Gif } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useAsyncFn } from 'react-use';

const giphyFetch = new GiphyFetch(
    process.env.GIPHY_API_KEY
        ? process.env.GIPHY_API_KEY
        : '6s6dfi1SuYlcbne91afF4rsD1b2DFDfQ',
);

const mediaGiphyRegex = /media\d+.giphy.com/;

function DraggableGiphy(props) {
    const { elemData, onSelect, onUpdated, selected, mode } = props;

    const [gif, setGif] = useState(null);
    useAsyncFn(async () => {
        const { data } = await giphyFetch.gif(elemData.giphyUri);
        // console.log('gighylist', data);
        const tempGif = data.images.original
            ? data.images.original
            : data.images.preview_gif;
        const finalGif = { ...tempGif };
        finalGif['url'] = tempGif.url.replace(mediaGiphyRegex, 'i.giphy.com');
        console.log('giphyUri', finalGif);
        setGif(finalGif);
    }, []);
    return (
        <>
            <EditItem
                elemData={elemData}
                selected={props.selected}
            >
                {gif && (
                    <img
                        style={{ width: '100%', height: '100%' }}
                        src={gif.url}
                    />
                )}
            </EditItem>
        </>
    );
}
export default DraggableGiphy;
