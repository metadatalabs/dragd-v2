import DropDownMenu from '../../helpers/ui/DropDownSelector';
import fonts from '../../helpers/ui/fonts.json';
import ColorPicker from '../../helpers/ui/ColorPicker';
import analytics from '../../../../util/analytics';
import { useContext, useEffect, useState } from 'react';
import SiteContext from '../../siteContext';
import { Input, Row } from '../../helpers/helper';

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
    console.log(elemData)
    return (
        <>
            <div className={'cpanellabel'}>Text</div>
            <input value={elemData.text} onChange={(e) => {onLocalUpdate({ text: e.target.value })}} />
            <div className={'cpanellabel'}>Text Color</div>
            <ColorPicker
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
            />
            <div className={'cpanellabel'}>Font</div>
            <DropDownMenu
                            key={elemData.id+'-color'}
                options={fontList}
                selectedOption={elemData.style?.fontFamily}
                onSelect={(font) => {
                    onLocalUpdate({ style: {fontFamily: font} });
                    // analytics.track('editor_change_text_font_family');
                }}
                type={'font'}
            />
            <div className={'cpanellabel'}>Font Size</div>
            <DropDownMenu
                options={[16, 18, 20, 24, 28, 30, 32, 36, 40, 48, 60, 72, 90]}
                selectedOption={elemData.style?.fontSize?.replace(/[^0-9]/g, '')}
                onSelect={(selectedValue) => {
                    onLocalUpdate({ style: {fontSize: selectedValue + 'px' }});
                }}
            />

            <Row style={{justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
            <div className={`cbutton cbuttoninner ${elemData.style?.fontWeight === 'bold' ? 'cbuttoninner-selected' : ''}`}
            style={{width: 60, height: 60}}
            onClick={() => {
                elemData.style.fontWeight === 'bold'?
                onLocalUpdate({style: {fontWeight: 'normal'}}):
                onLocalUpdate({style: {fontWeight: 'bold'}});
                
            }}>
            <i className={`fas fa-bold`}/>
            bold
            </div>
            <div style={{ padding: 5 }} />

            <div className={`cbutton cbuttoninner ${elemData.style?.fontStyle === 'italic' ? 'cbuttoninner-selected' : ''}`}
                style={{width: 60, height: 60}}
                onClick={() => {
                elemData.style.fontStyle === 'italic'?
                onLocalUpdate({style: {fontStyle: 'normal'}}):
                onLocalUpdate({style: {fontStyle: 'italic'}});
                
            }}>
            <i className={`fas fa-italic`}/>
            italics
            </div>
            <div style={{ padding: 5 }} />

            <div className={`cbutton cbuttoninner`}
                style={{width: 60, height: 60}}
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
            <i className={`fas fa-${alignIcon[currentDirection]}`} />
            align
            </div>
            </Row>
        </>
    );
}
