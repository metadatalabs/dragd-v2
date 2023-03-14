const { useState, useEffect, useContext } = require('react');
import { Input } from '../../helpers/helper';
import ColorPicker from '../../helpers/ui/ColorPicker';
import SiteContext from '../../siteContext';

export default function PanelControls({id, setPanelControls = () => {}}) {
    const { items, onUpdateDiv } = useContext(SiteContext);
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    return (
        <>
            <div className={'clabel'}>Button Label</div>
            <Input
                placeholder={'Button Label'}
                defaultValue={elemData.label}
                key={elemData.id + '-input'}
                onChange={(value) => {
                    onLocalUpdate({ label: value });
                }}
            /><br /><br />
            <div className={'clabel'}>Button color</div>
                <ColorPicker
                    color={
                        elemData.style?.backgroundColor || 'black'
                    }
                    onChange={(color) => {
                        onLocalUpdate({
                            ...{
                                style: { backgroundColor: color },
                            },
                        });
                    }}
                    onClose={() => {}}
                />
        </>
    );
}
