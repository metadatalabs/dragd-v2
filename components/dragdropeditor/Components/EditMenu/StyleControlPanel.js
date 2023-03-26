import { useContext, useState } from "react";
import { SliderWithInput } from "../../helpers/helper";
import ColorPicker from "../../helpers/ui/ColorPicker";
import SiteContext from "../../siteContext";

export default function StylePanelControls ({id}) {
    const { items, onUpdateDiv } = useContext(SiteContext);
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    const ControlList = {'Background': <ColorPicker
        color={ elemData.style?.backgroundColor || 'transparent' }
        onChange={(color) => {
            onLocalUpdate({ style: {...elemData.style, backgroundColor: color} });
        }}
    />,
    'Opacity': <SliderWithInput
        value={elemData.style?.opacity || 1}
        onChange={(value) => {
            onLocalUpdate({ style: {...elemData.style, opacity: value} });
        }}
        defaultValue={100}
        min={0}
        max={1}
        step={0.01}
        symbol={'%'}
    />,
    'Padding': <SliderWithInput
        value={elemData.style?.padding || 0}
        onChange={(value) => {
            onLocalUpdate({ style: {...elemData.style, padding: value + "px"} });
        }}
        min={0}
        max={100}
        step={1}
        symbol={'px'}
    />,
    'Radius': <SliderWithInput
        value={elemData.style?.borderRadius || 0}
        onChange={(value) => {
            onLocalUpdate({ style: {...elemData.style, borderRadius: value + "px"} });
        }}
        min={0}
        max={100}
        step={1}
        symbol={'px'}
    />
    }

    return <>
        <div key={id} className={'font-semibold'}>Style</div>

        {/* backround */}
        <div>
            {Object.keys(ControlList).map((eachChild) => {
                return <div key={id + "-"+eachChild} className='flex flex-row py-1'>
                <div className='w-2/6'>{eachChild}</div>
                    <div className='w-4/6'>
                        {ControlList[eachChild]}
                    </div>
                </div>
            })}
        </div>
        {/* <div>OpacityPaddingRadiusBlurBorderShadow</div> */}

    </>
}


export const TabSwitcher = ({tabs, tabicons, color = "green"}) => {
    const [activeTab, setActiveTab] = useState(0);
    return <div className="flex flex-col justify-between w-64 mb-3">
        {tabs[activeTab]}<br/>
        <div className={`tabs tabs-boxed justify-around`}>
            {tabs.map((tab, index) => {
                return (
                    <div
                        key={index}
                        className={`tab flex grow ${activeTab === index ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tabicons[index]}
                    </div>

                )
            })}
        </div>
    </div>
}