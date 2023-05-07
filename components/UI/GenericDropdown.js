import { useState } from "react";

export default function GenericDropdown({ children, border, ...props }) {
  const [isActive, setIsActive] = useState(false);
  const { label, options, CollapseButton } = props;

  return (
    <>
      <div
        className={`dropdown dropdown-end dropdown-bottom ${
          border && "outline rounded"
        }`}
      >
        <label tabIndex={0} className="btn btn-sm m-1">
          {props.label}
        </label>
        <ul
          tabIndex={0}
          className={`flex mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box min-w-full max-h-96 flex-nowrap overflow-y-scroll ${
            border && "outline"
          }`}
        >
          {children?.map((child, i) => (
            <li key={i}>
              {child}
              {/* <a>{child}</a> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
