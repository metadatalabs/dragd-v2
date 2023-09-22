import { useContext, useEffect, useState } from "react";
import { Column, isMobile, isMobileViewport, Row } from "../../helpers/helper";
import { CloseIcon, AppsIcon } from "../DDEditor/EditorIcons";
import defaultButtons from "./defaultButtons";
import { v4 as uuidv4 } from "uuid";
import { HeadConfigurator } from "../PageStyle";
import SiteContext from "../../siteContext";
import { ButtonSelector } from "../DraggableButton/ButtonSelector";
import { PaymentSelector } from "../PaymentButton/PaymentSelector";
import { TemplateSelector } from "../DraggableTemplate";
import { EthContractSelector } from "../DraggableEth/EthContractSelector";

export default function Menu({ selected }) {
  const siteData = useContext(SiteContext);
  const { setSelected } = siteData;
  const [isMinimized, setMinimized] = useState(false);

  return (
    <div
      className="pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <FloatingPanel isMinimized={isMinimized} setMinimized={setMinimized}>
        <NestedMenu
          buttonData={defaultButtons}
          parentSelected={selected}
          setMinimized={setMinimized}
          setParentSelected={setSelected}
        />
      </FloatingPanel>
    </div>
  );
}

function NestedMenu({
  buttonData,
  parentSelected,
  setParentSelected = null,
  setMinimized = null,
  depth = 0,
}) {
  const {
    addItemToList,
    setControlPanel,
    setSelected: setSelectedItem,
    controlPanel,
  } = useContext(SiteContext);

  const [selected, setSelected] = useState(null);
  const [selector, setSelector] = useState(null);

  useEffect(() => {
    setSelected(null);
    setSelector(null);
  }, [parentSelected]);

  useEffect(() => {
    if (selected) {
      setSelector(null);
      setControlPanel(null);
    }
  }, [selected]);

  useEffect(() => {
    if (selector) {
      setSelected(null);
      setControlPanel(null);
    }
  }, [selector]);

  return (
    <>
      {depth == 0 && (
        <div className="h-6 flex items-center justify-between">
          <div
            className={
              "cursor-pointer w-6 pl-1/2 hover:bg-gray-200 rounded-full"
            }
            style={{ pointerEvents: "all" }}
            onClick={() => {
              setParentSelected?.(null);
              setSelector(null);
              setSelectedItem("bg");
            }}
          >
            {`←`}
          </div>

          {depth == 0 && (
            <div>
              <div
                className={
                  "cursor-pointer w-5 px-1 mr-1 hover:bg-gray-200 rounded-full"
                }
                style={{ pointerEvents: "all" }}
                onClick={() => setMinimized(true)}
              >
                -
              </div>
            </div>
          )}
        </div>
      )}

      {/* stack of menus */}
      <div
        className="flex flex-row justify-center"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col max-h-[72vh]">
          {/* child menu in the stack */}

          {/* menu */}
          {selected && (
            <NestedMenu
              buttonData={selected}
              parentSelected={selected}
              setParentSelected={setSelected}
              depth={depth + 1}
            />
          )}

          {/* selector */}
          {selector != null && (
            <Column className={"w-max items-center cpanel-col"}>
              {selector}
            </Column>
          )}

          {/* control panel */}
          {Array.isArray(parentSelected) && parentSelected.length == 1 && (
            <div className="flex flex-grow px-3 text-left max-h-full">
              {controlPanel}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          {/* parent menu in the stack */}
          <ul className="menu p-0 pb-1">
            {Object.entries(buttonData).map((item) => {
              return (
                <AddButton
                  key={uuidv4()}
                  item={item}
                  showMenu={setSelected}
                  setSelector={setSelector}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

function FloatingPanel({ children, style = null, isMinimized, setMinimized }) {
  const originPos = { x: 0, y: 0 };

  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clickOffset, setClickOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPos(originPos);
  }, [isMinimized]);

  return (
    <div
      className={
        "flex flex-col border border-slate-300 bg-slate-100 rounded-md transition-all max-w-[90vw] max-h-[75vh]"
      }
      onMouseDown={(e) => {
        setDragging(true);
        // setClickOffset({ x: e.clientX - (window.innerWidth - pos.x), y: e.clientY - pos.y});
        setClickOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
      }}
      onMouseUp={(e) => {
        setDragging(false);
      }}
      onMouseMove={(e) => {
        if (dragging) {
          setPos({
            x: e.clientX - clickOffset.x,
            y: e.clientY - clickOffset.y,
          });
          // setPos({ x: window.innerWidth - (e.clientX - clickOffset.x), y: e.clientY - clickOffset.y});
        }
      }}
      style={{
        marginBottom: -pos.y,
        marginRight: -pos.x,
        transition: `width 0.2s, height 0.2s ${
          isMinimized ? `, all 0.1s` : ``
        }`,
      }}
    >
      {isMinimized && (
        <div
          className="p-2"
          onClick={() => {
            setMinimized(false);
          }}
        >
          <AppsIcon />
        </div>
      )}
      {!isMinimized && children}
    </div>
  );
}

export function AddButton({ item: [_, item], showMenu, setSelector }) {
  const { addItemToList, setModal } = useContext(SiteContext);

  const getSelectorComponent = (selector) => {
    const commonProps = {
      addItemToList,
      close: () => setModal(null),
    };

    switch (selector) {
      case "headconf":
        return <HeadConfigurator {...commonProps} />;
      case "button":
        return <ButtonSelector {...commonProps} />;
      case "template":
        return <TemplateSelector {...commonProps} />;
      case "eth":
        return <EthContractSelector {...commonProps} />;
      case "payButton":
        return <PaymentSelector {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <li className="tooltip tooltip-left px-1" data-tip={item.label}>
      <a
        className="flex items-center justify-center p-0 border m-1 border-slate-300 w-7 h-7 rounded-md hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          const { action, object, objects, selector } = item;
          switch (action) {
            case "add":
              addItemToList(object);
              showMenu(null);
              break;
            case "menu":
              showMenu(objects);
              break;
            case "selector":
            case "modal":
              const component = getSelectorComponent(selector);
              action === "selector"
                ? setSelector(component)
                : setModal(component);
              break;
          }
        }}
      >
        {item.icon}
      </a>
    </li>
  );
}
