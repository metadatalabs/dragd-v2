import { useState } from "react";

export default function GenericDropdown(props){
    const [isActive, setIsActive] = useState(false);
    const {label, options, CollapseButton} = props;
    

    const onClick = (e) => {e.stopPropagation(); e.preventDefault(); setIsActive(!isActive)};
    const onMouseLeave = (e) => setIsActive(false);

    return <div className="relative inline-block text-left">
    <div>
      
      {CollapseButton ? 
      <div onClick={onClick}>
        {CollapseButton}
      </div> : 
      <button onClick={onClick} type="button" className="transition-all inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:outline-none hover:ring-2 hover:ring-dragd hover:ring-offset-2 hover:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {label}
        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>}
    </div>
  

    {isActive && <div onMouseLeave={onMouseLeave} className="transition-all absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div className="py-1" role="none">
        {options?.map((item, index) => {
            return <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id={`menu-item-${index}`}>{item}</a>
        })}
      </div>
    </div>}
  </div>  
}