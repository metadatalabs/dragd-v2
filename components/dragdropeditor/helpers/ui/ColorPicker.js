import { useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";

export default function ColorPicker ({color, onChange, onClose}) {
    const [selected, setSelected] = useState(false);

    return <div className="dropdown is-active" onMouseLeave={()=>{setSelected(false)}}>
    <div className={"dropdown-trigger"} 
        onClick={()=>{setSelected(!selected)}} 
        style={{
        borderRadius: 100,
        width: 25,
        height: 25,
        backgroundColor: color,
        border: '2px solid black',
        cursor: 'pointer',
    }} />
    {selected && <div class="dropdown-menu" id="dropdown-menu" role="menu" 
        style={{background: 'white', padding: 10, borderRadius: 10, border: '2px solid lightgrey'}}
        >
        <RgbaStringColorPicker
            color={color || 'black'}
            onChange={onChange}
        />
        <input style={{marginTop: 5}} className="input" value={color} onChange={(e)=>onChange(e.target.value)}></input>
    </div>}
    </div>
}