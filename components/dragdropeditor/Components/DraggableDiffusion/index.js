import React, { useContext } from 'react';
import SiteContext from '../../siteContext';
import EditItem from '../DDEditor/EditItem';
import { useAsyncFn } from 'react-use';
import Prompter from './Prompter';

function DraggableDiffusion(props) {
    const { elemData, selected } = props;
    const siteData = useContext(SiteContext);
    const {
        setSelected: onSelect,
        onUpdateDiv: onUpdated,
        mode,
        setModal,
    } = siteData;

    function onLocalUpdate(newProps) {
        var updatedProps = {
            ...newProps,
        };
        onUpdated(elemData.id, updatedProps);
    }

    function setImagePrompt(prompt) {
        onLocalUpdate({ imagePrompt: prompt });
    }

    const [state, initBananaSD] = useAsyncFn(async (prompt) => {
        const result = await fetch('/api/image-get', {
            method: 'POST',
            body: JSON.stringify({ prompt }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resultJson = await result.json();
        console.log(resultJson);
        onLocalUpdate({ image: resultJson.data });
        return resultJson;
    }, []);

    function PanelControls() {
        return (
            <>
                <div style={{ marginLeft: '8px' }}>
                    <button
                        onClick={() => {
                            setModal(
                                <>
                                    <Prompter
                                        onLocalUpdate={onLocalUpdate}
                                        setModal={setModal}
                                        initBananaSD={initBananaSD}
                                    />
                                </>,
                            );
                        }}
                    >
                        Enter a prompt!
                    </button>
                </div>

                <div
                    className={'cbutton cbuttoninner'}
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
                {state.loading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <i className="fas fa-spinner fa-spin fa-5x" />
                    </div>
                ) : (
                    elemData.image && (
                        <img
                            style={{ width: '100%', height: '100%' }}
                            src={`data:image/png;base64,${elemData.image}`}
                        />
                    )
                )}
            </EditItem>
        </>
    );
}

export default DraggableDiffusion;
