import React, { useState, useRef, useContext, useEffect } from 'react';
import EditItem from '../DDEditor/EditItem';
import { useAuth } from '../../../../util/auth';

import SiteContext from '../../siteContext';
import ComponentSelector from '../ComponentSelector';
import { useSiteByName,} from "@/components/DataProvider";

function DraggableTemplate(props) {
    const { elemData, selected } = props;
    const auth = useAuth();

    const siteData = useContext(SiteContext);
    const {
        setSelected: onSelect,
        onUpdateDiv: onUpdated,
        mode,
        setModal,
    } = siteData;
    const { data: itemData, status: itemStatus } = useSiteByName(elemData.templateSiteId)
    return (
        <>
            <EditItem
                elemData={elemData}
                // onSelect={onSelect}
                onUpdated={onUpdated}
                selected={props.selected}
                // renderPanel={PanelControls}
                mode={mode}
            >
                <div style={{transform: `translateX(${elemData.size.width / 2}px)`}}>
                {itemData && (Object.keys(itemData?.page)).map((key) => {
                        var elem = itemData.page[key];

                        return elem && (
                            <ComponentSelector
                                elem={elem}
                                key={elem.id + '_component'}
                            />
                        );
                    })}
                </div>
                
            </EditItem>
        </>
    );
}

    
export default DraggableTemplate;

export function TemplateSelector(props) {
    const [value, setValue] = useState('dragdrop/index');
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
                className={'minimal-input'}
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    width: '80vw',
                    maxWidth: '500px',
                }}
                autoFocus={true}
                defaultValue={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            ></input>
            <button
                className={'button'}
                onClick={() => {
                    props.addItemToList({
                        type: 'template',
                        size: {
                            width: 100,
                            height: 100,
                        },
                        templateSiteId: value,
                    });
                    props.close();
                }}
            >
                Add
            </button>
            <div class="is-divider" data-content="OR"></div>
        </div>
    );
}