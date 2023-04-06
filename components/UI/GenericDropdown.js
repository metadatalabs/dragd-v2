import { useState } from "react";

export default function GenericDropdown({ children, border, ...props }) {
  const [isActive, setIsActive] = useState(false);
  const { label, options, CollapseButton } = props;

  return (
    <div className={`dropdown dropdown-end ${border && "outline rounded"}`}>
      <label tabIndex={0} className={`btn btn-ghost no-animation avatar`}>
        {props.label}
        {/* <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div> */}
      </label>
      <ul
        tabIndex={0}
        className={`flex mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box min-w-full max-h-96 flex-nowrap overflow-y-scroll ${
          border && "outline"
        }`}
        style={{
          boxShadow: `inset 0 -12px 4px -4px white`,
        }}
      >
        {/* <li>
            <a className="justify-between">
                Profile
                <span className="badge">New</span>
            </a>
            </li> */}
        {children?.map((child, i) => (
          <li key={i}>
            {child}
            {/* <a>{child}</a> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
