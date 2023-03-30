import { useEffect, useState } from "react";
import analytics from "../../../../util/analytics";
import logo from "../../../../public/dragd_logo.png";

export default function DragdLogo({ pending }) {
  const [hover, setHover] = useState(pending);

  useEffect(() => {
    if (pending) onHover();
    else onLeave();
  }, [pending]);

  const onHover = () => {
    setHover(true);
    // analytics.track('bclogo_hover');
  };

  const onLeave = () => {
    setHover(false);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
          padding: "10px",
          zIndex: 999999,
          //   opacity: pending || hover ? 1 : undefined,
        }}
        className={"brocorpSaveSpinner"}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <a href={"https://dra.gd"} target={"_blank"} rel={"noreferrer"}>
          {
            <div
              className={`flex flex-row items-center text-black h-12 -mb-12 transition-all
              ${hover ? "opacity-100" : "opacity-0"} 
              ${hover ? "translate-x-16" : ""} text-sm font-bold`}
            >
              made with dragd
            </div>
          }
          {hover && (
            <div className="w-12 h-12 -mb-12 transition-all bg-dragd pointer-events-none"></div>
          )}
          <img
            className="w-12 transition-all hover:grayscale hover:brightness-0"
            src={logo.src}
          />
        </a>
      </div>
    </>
  );
}
