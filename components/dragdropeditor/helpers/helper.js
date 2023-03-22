import React, { useState, useRef, useEffect } from 'react';

export function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

export function isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        return true;
      }else{
        // false for not mobile device
        return false;
      }
}

export function isMobileViewport() {
    if(typeof window !== 'undefined' && window.innerWidth < 600) return true;
}

export function getMobileScaleRatio() {
    return (isMobileViewport() ? window.innerWidth / 600 : 1);
}

export function getElementOffset(element) {
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    var height = box.height;
    var width = box.width;
    return {
        top: top,
        left: left,
        height,
        width,
        center: { x: left + width / 2, y: top + height / 2 },
    };
}

export function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    );
}

export const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
    const dot = x1 * x2 + y1 * y2;
    const det = x1 * y2 - y1 * x2;
    const angle = (Math.atan2(det, dot) / Math.PI) * 180;
    return (angle + 360) % 360;
};

export const degToRadian = (deg) => (deg * Math.PI) / 180;

export const getLength = (x, y) => Math.sqrt(x * x + y * y);

export const Input = (props) => {
    const { value = '', onChange, placeholder, defaultValue, style } = props;
    const [text, setText] = useState(value);

    function update(event) {
        setText(event.target.value);
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    }

    return (
        <input
            type="text"
            {...props}
            placeholder={placeholder}
            onChange={update}
            defaultValue={defaultValue}
        />
    );
};

export const Column = (props) => {
    return (
        <div
            {...props}
            style={{ ...props.style, display: 'flex', flexDirection: 'column' }}
        >
            {props.children}
        </div>
    );
};

export const Row = (props) => {
    return (
        <div
            {...props}
            style={{ ...props.style, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
            {props.children}
        </div>
    );
};

export function debounce(func, wait) {
    var timeout;

    return (...args) => {
        var context = this;

        var later = () => {
            func.apply(context, args);
        };

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    };
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
 export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
export function mergeDeep(target, source) {
let output = Object.assign({}, target);
if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
    if (isObject(source[key])) {
        if (!(key in target))
        Object.assign(output, { [key]: source[key] });
        else
        output[key] = mergeDeep(target[key], source[key]);
    } else {
        Object.assign(output, { [key]: source[key] });
    }
    });
}
return output;
}

export function isDarkColor(bgColor) {
    if(typeof bgColor === 'undefined') return false;
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      false : true;
  }

  export const LinkIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
}  

export const LayerIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>
}

export const CopyIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
  </svg>  
}

export const TrashIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
}  

export const SmartContractIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg> 
}

export const CodeIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
}  

export const StyleToggleButton = (props) => {
    return <div 
        {...props}
        className={`cbutton cbuttoninner mx-2 ${props.className}`}
        style={{width: 20, height: 20, ...props.style}}
        >
    {props.children}
    </div>
}

export const SliderWithInput = ({value, onChange, min, max, step, symbol, defaultValue = 0}) => {
    return <div className={'flex flex-row items-center'}>
        <div className={'flex flex-row items-baseline p-1 bg-gray-300 rounded-sm'}>
            <input className='group w-8 bg-transparent text-center'
            value={value?.replace && value.replace(/[^0-9]/g, '') || defaultValue}
            onChange={(e)=>{
                onChange(e.target.value);
            }}>
            </input>
            {symbol}
        </div>
        <input id="steps-range" type="range" min={min} max={max} step={step} 
            value={value?.replace && value.replace(/[^0-9.]/g, '') || defaultValue} 
            onChange={(e)=>{
                onChange(e.target.value);
            }}
            class="h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
        />
    </div>
}
