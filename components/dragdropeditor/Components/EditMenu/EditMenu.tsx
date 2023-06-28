import { useContext, useEffect, useState } from "react";
import {
  AppsIcon,
  CloseIcon,
  Column,
  isMobile,
  isMobileViewport,
  Row,
} from "../../helpers/helper";
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
          addItemToList={siteData.addItemToList}
          parentSelected={selected.length == 0 ? null : selected}
          setMinimized={setMinimized}
          setParentSelected={setSelected}
        />
      </FloatingPanel>
    </div>
  );
}

function NestedMenu({
  buttonData,
  addItemToList,
  parentSelected,
  setParentSelected = null,
  setMinimized = null,
}) {
  const [selected, setSelected] = useState(null);
  const [selector, setSelector] = useState(null);
  const siteData = useContext(SiteContext);

  const { items, controlPanel, setSelected: setSelectedItem } = siteData;
  useEffect(() => {
    setSelected(null);
    setSelector(null);
  }, [parentSelected]);

  useEffect(() => {
    setSelector(null);
  }, [selected]);

  return (
    <>
      <div className="h-8 flex items-center justify-between">
        <div
          className={
            "cursor-pointer w-6 px-0 ml-1 hover:bg-gray-200 rounded-full"
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
        <div>
          <div
            className={
              "cursor-pointer w-5 px-1 mr-1 hover:bg-gray-200 rounded-full"
            }
            style={{ pointerEvents: "all" }}
            onClick={() => setMinimized(true)}
          >
            <CloseIcon />
          </div>
        </div>
      </div>

      {/* stack of menus */}
      <div className="flex" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex flex-col bg-slate-500/10 overflow-y-scroll">
          {/* child menu in the stack */}

          {/* menu */}
          {selected != null && (
            <NestedMenu
              buttonData={selected}
              addItemToList={addItemToList}
              parentSelected={selected}
              setParentSelected={setSelected}
            />
          )}

          {/* selector */}
          {selector != null && (
            <Column
              className={
                "w-max items-center cpanel-col h-[90%] overflow-y-auto"
              }
            >
              {selector}
            </Column>
          )}

          {/* control panel */}
          {Array.isArray(parentSelected) && (
            <div className="flex flex-grow px-3 text-left max-h-full">
              {controlPanel}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          {/* parent menu in the stack */}
          <ul className="menu bg-base-100 p-2 rounded-box">
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

  const isMobile = isMobileViewport();

  return (
    <div
      className={
        "flex flex-col card bg-base-100 outline transition-all max-w-[80vw] max-h-[75vh]"
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
          className="pt-3 px-4"
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
    <li className="tooltip tooltip-left w-12" data-tip={item.label}>
      <a
        className="flex items-center justify-center px-0"
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
