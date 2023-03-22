import DropDownMenu from '../../helpers/ui/DropDownSelector';
import fonts from '../../helpers/ui/fonts.json';
import ColorPicker from '../../helpers/ui/ColorPicker';
import analytics from '../../../../util/analytics';
import { useContext, useEffect, useState } from 'react';
import SiteContext from '../../siteContext';
import { Input, Row } from '../../helpers/helper';
import GenericDropdown from '/components/UI/GenericDropdown';

const googleFonts = fonts['googleFonts'];
const fontList = ['Arial', 'Times New Roman', 'Courier New', ...googleFonts];

export default function PanelControls({id}) {
    const { items, onUpdateDiv } = useContext(SiteContext);
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    let alignDirections = ['left', 'center', 'right'];
    let alignIcon = ['align-left', 'align-center', 'align-right'];
    let currentDirection = alignDirections.indexOf(elemData.style?.textAlign);
    currentDirection = currentDirection < 0 ? 1 : currentDirection;
    return (
        <>
            <TabSwitcher
            tabs={[
            <>
                <textarea 
                rows={4}
                className={'ring-1 rounded-md p-1'}
                value={elemData.text} 
                onChange={(e) => {onLocalUpdate({ text: e.target.value })}} 
                />
            
            
            <table style={{margin: 2}}>
            <tr>
                <td className={"w-2/6"}>Font</td>
                <td><GenericDropdown 
                label={<>
                     <link href={`https://fonts.googleapis.com/css2?family=${ elemData.style?.fontFamily?.split(" ").join("+")}&display=swap`} rel="stylesheet"></link>
                    <span style={{fontFamily: elemData.style?.fontFamily}}>{elemData.style?.fontFamily}</span>
                    </>}
                options={fontList.map((font) => {
                    return <button
                    className='w-full hover:bg-gray-200'
                    onClick={async () => {
                        // await signOut();
                        onLocalUpdate({ style: {fontFamily: font} });
                }}
            >
                    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
                    <link href={`https://fonts.googleapis.com/css2?family=${font?.split(" ").join("+")}&display=swap`} rel="stylesheet"></link>
                    <span style={{fontFamily: font}}>{font}</span>
                </button>
                })}
                /></td>
            </tr>


            <tr>
                <td>Color</td>
                <td><ColorPicker
                color={
                    elemData.style?.color ||
                    'black'
                }
                onChange={(color) => {
                    console.log("color", color);
                    onLocalUpdate({ style: {...elemData.style, color: color} });
                    // analytics.track('editor_change_text_color');
                }}
                onClose={() => {
                    // setPanelControls(null);
                }}
                /></td>
            </tr>


            <tr>
                <td>Size</td>
                <td>
                    <SliderWithInput 
                    value={elemData.style?.fontSize?.replace(/[^0-9]/g, '')}
                    onChange={(value)=>{
                        onLocalUpdate({ style: {fontSize: value + 'px' }});
                    }}
                    symbol="px"
                    />
                    </td>
            </tr>
            </table>
            <Row style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
            <StyleToggleButton className={`font-bold ${elemData.style?.fontWeight === 'bold' ? 'cbuttoninner-selected' : ''}`}
            onClick={() => {
                elemData.style.fontWeight === 'bold'?
                onLocalUpdate({style: {fontWeight: 'normal'}}):
                onLocalUpdate({style: {fontWeight: 'bold'}});
                
            }}>B
            </StyleToggleButton>
            <div style={{ padding: 5 }} />

            <StyleToggleButton className={`italic ${elemData.style?.fontStyle === 'italic' ? 'cbuttoninner-selected' : ''}`}
                onClick={() => {
                elemData.style.fontStyle === 'italic'?
                onLocalUpdate({style: {fontStyle: 'normal'}}):
                onLocalUpdate({style: {fontStyle: 'italic'}});
                
            }}>
            i
            </StyleToggleButton>
            <div style={{ padding: 5 }} />

            <StyleToggleButton className={`underline ${elemData.style?.textDecoration === 'underline' ? 'cbuttoninner-selected' : ''}`}
                onClick={() => {
                    onLocalUpdate({ style: {textDecoration: 
                        elemData.style.textDecoration === 'underline'?'': 'underline'} });
            }}>
            U
            </StyleToggleButton>
            <div style={{ padding: 5 }} />

            <StyleToggleButton
                onClick={() => {
                onLocalUpdate({
                    style: {
                        textAlign:
                            alignDirections[
                                (currentDirection + 1) %
                                    alignDirections.length
                            ],
                    },
                });
            }}>
            align
            </StyleToggleButton>
            </Row>
                </>,
                <StylePanelControls id={id} />]}
                tabicons={['Properties', 'Style']}
            />

        </>
    );
}

const StylePanelControls = ({id}) => {
    const { items, onUpdateDiv } = useContext(SiteContext);
    const elemData = items[id];
    const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

    return <>
        <div className={'font-semibold'}>Style</div>

        {/* backround */}
        <div>Background Color</div>
        <ColorPicker
            color={ elemData.style?.backgroundColor || 'transparent' }
            onChange={(color) => {
                onLocalUpdate({ style: {...elemData.style, backgroundColor: color} });
            }}
            />
    </>
}

const TabSwitcher = ({tabs, tabicons}) => {
    const [activeTab, setActiveTab] = useState(0);
    return <div className="flex flex-col content-between text-sm font-light w-64">
        {tabs[activeTab]}<br/>

        <div className={'flex flex-row justify-between px-4'}>
            {tabs.map((tab, index) => {
                return (
                    <div
                        key={index}
                        className={`${activeTab === index ? 'ring-2' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tabicons[index]}
                    </div>

                )
            })}
        </div>
    </div>
}

const SliderWithInput = ({value, onChange, min, max, step, symbol}) => {
    return <div className={'flex flex-row items-center'}>
        <div className={'flex flex-row items-baseline p-1 bg-gray-300 rounded-sm'}>
            <input className='group w-8 bg-transparent text-center'
            value={value}
            onChange={(e)=>{
                onChange(e.target.value);
            }}>
            </input>
            {symbol}
        </div>
        <input id="steps-range" type="range" min={min} max={max} step={step} 
            value={value} 
            onChange={(e)=>{
                onChange(e.target.value);
            }}
            class="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
        />
    </div>
}

const StyleToggleButton = (props) => {
    return <div 
        {...props}
        className={`cbutton cbuttoninner ${props.className}`}
        style={{width: 60, height: 60, ...props.style}}
        >
    {props.children}
    </div>
}
