import React, { useState, useContext } from 'react';
import { Row } from '../../helpers/helper';

function RowItem({a, b}){
    return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 4}}>
    <div>{a}</div>
    <div>{b}</div>
</div>
}

function KeyboardButton(props){
    return <div style={{borderColor: "grey black black grey", borderStyle: "solid",
    borderWidth: '1px', borderRadius: 6, padding: 4}}>
        {props.children}
    </div>
}
function CodeBlock(props){
    return <div style={{borderRadius: 6, backgroundColor: '#eeeeee', padding: 5}}>{props.children}</div>
}

function HelpLink(props){
    return <a href={props.href} target="_blank"><div style={{borderRadius: 6, backgroundColor: '#eeeeee', padding: 5, margin: 5, fontWeight: 500}}>{props.children}</div></a>
}

function Divider()
{
    return <div style={{background: 'grey', height: 1, width: 'calc(100% + 50px)', margin: "10px -25px 10px -25px"}}></div>
}

export default function HelpDesk()
{
    var x = [[<KeyboardButton>BACKSPACE</KeyboardButton>, <CodeBlock>Delete Block</CodeBlock>],
    [<KeyboardButton>DELETE</KeyboardButton>, <CodeBlock>Delete Block</CodeBlock>],
    [<Row><KeyboardButton>CTRL</KeyboardButton><b> + </b><KeyboardButton>Z</KeyboardButton></Row>, <CodeBlock>Undo Changes</CodeBlock>],
    [<Row><KeyboardButton>CTRL</KeyboardButton><b> + </b><KeyboardButton>Y</KeyboardButton></Row>, <CodeBlock>Redo Changes</CodeBlock>]
    ];

    var y = [[<Row><KeyboardButton>SHIFT</KeyboardButton><b> + </b>Click</Row>, <CodeBlock>Select Many</CodeBlock>],
    [<Row><KeyboardButton>←</KeyboardButton> <KeyboardButton>↑</KeyboardButton> <KeyboardButton>→</KeyboardButton> <KeyboardButton>↓</KeyboardButton></Row>, <CodeBlock>Move Blocks</CodeBlock>],
    [<Row><KeyboardButton>ESC</KeyboardButton></Row>, <CodeBlock>Unselect All</CodeBlock>],
    ];


    return <div style={{maxWidth: '100%', width: 550}}>
        <div className={'clabel'}>HOW TO USE DRAGD</div>
        <ul style={{listStyle: 'inside'}}>
            <li>Click and drag blocks on the page to move them around.</li>
            <li>Add new blocks from the menu on the right.</li>
            <li>When you are done, click the "Save" button to save your work.</li>
        </ul>
        
        <Divider />
        
        <div className={'clabel'}>EDITOR SHORTCUTS</div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '48%'}}>
                {x.map((y, i) => {
                    return <RowItem a={y[0]} b={y[1]} />
                })}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: '48%'}}>
                {y.map((y, i) => {
                    return <RowItem a={y[0]} b={y[1]} />
                })}
            </div>
        </div>

        <Divider />
        <div className={'clabel'}>SUPPORT & UPDATES</div>
        dragd is in alpha and many features are not production-ready.<br />
        For fastest response, try Discord or Twitter DM.

        <Row>
        <HelpLink href="https://discord.gg/vf5SmxzjVr">Discord</HelpLink>
        <HelpLink href="https://twitter.com/dragd__">Twitter</HelpLink>
        <HelpLink href="https://twitter.com/prnth_">DM @prnth_</HelpLink>

        </Row>

    </div>
}