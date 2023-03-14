import React, { useContext, useState } from 'react';
import EditItem from './DDEditor/EditItem';
import ColorPicker from '../helpers/ui/ColorPicker';
import SiteContext from '../siteContext';
import DropDownMenu from '../helpers/ui/DropDownSelector';
import { Row } from '../helpers/helper';


function PanelControls({id,  setPanelControls = () => {} }) {
    const [active, setActive] = useState(false);
    const siteData = useContext(SiteContext);
    const {
        items,
        onUpdateDiv,
    } = siteData;
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    function setBgColor(color) {
        onLocalUpdate({
            style: {
                ...elemData.style,
                backgroundColor: color,
            },
        });
    }

    function setBorderColor(color) {
        onLocalUpdate({
            style: {
                ...elemData.style,
                borderColor: color,
            },
        });
    }
    return (
        <>
            <div className={'cpanellabel'}>Shape Colors</div>
            <Row>
                <ColorPicker
                color={
                    elemData.style
                        ?.backgroundColor
                }
                onChange={(color) => {
                    setBgColor(color);
                }}
                onClose={() => {
                    setActive(false);
                    setPanelControls(null);
                }}
            />
            <div style={{width: 10}} />
            <ColorPicker
                color={
                    elemData.style
                        ?.borderColor
                }
                onChange={(color) => {
                    setBorderColor(color);
                }}
                onClose={() => {
                    setActive(false);
                    setPanelControls(null);
                }}
            /></Row>
            <div style={{ padding: 5 }} />
            <div className={'cpanellabel'}>Border Radius</div>

            <DropDownMenu
                options={[20, 24, 30, 32, 36, 40, 48, 60, 72, 90]}
                selectedOption={elemData.style?.borderRadius?.replace(/[^0-9]/g, '')}
                onSelect={(selectedValue) => {
                    onLocalUpdate({ style: {borderRadius: selectedValue + 'px' }});
                }}
            />
        </>
    );
}

function DraggableImage(props) {
    const { elemData, selected } = props;

    return (
        <>
            <EditItem
               
                key={props.elemData.id + '__item'}
                elemData={elemData}
                selected={props.selected}
                renderPanel={props.selected && PanelControls}
                >
                <div
                    style={{ width: '100%', height: '100%', border: `1px solid ${elemData.style.borderColor}`,...elemData.style }}
                />
            </EditItem>
        </>
    );
}

export default DraggableImage;
