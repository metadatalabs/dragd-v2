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
import { GiphySelector } from "../DraggableGiphy/GiphySelector";
import { HeadConfigurator } from "../PageStyle";
import SiteContext from "../../siteContext";
import { ButtonSelector } from "../DraggableButton/ButtonSelector";
import { TemplateSelector } from "../DraggableTemplate";
import { EthContractSelector } from "../DraggableEth/EthContractSelector";
import analytics from "../../../../util/analytics";

export function AddButton({ item, showMenu, setSelector }) {
  const siteData = useContext(SiteContext);

  const SELECTORS: any = {
    giphy: <GiphySelector addItemToList={siteData.addItemToList} />,
    headconf: <HeadConfigurator addItemToList={siteData.addItemToList} />,
  };

  const FUNCS: any = {
    button: (
      <ButtonSelector
        addItemToList={siteData.addItemToList}
        close={() => siteData.setModal(null)}
      />
    ),
    template: (
      <TemplateSelector
        addItemToList={siteData.addItemToList}
        close={() => siteData.setModal(null)}
      />
    ),
    eth: (
      <EthContractSelector
        addItemToList={siteData.addItemToList}
        close={() => siteData.setModal(null)}
      />
    ),
  };

  return (
    <li className="tooltip tooltip-left w-12" data-tip={item[1].label}>
      <a
        className="flex items-center justify-center px-0"
        onClick={(e) => {
          switch (item[1].action) {
            case "add":
              siteData.addItemToList(item[1].object);
              showMenu(null);
              // analytics.track('editor_add_item', item[1].object.type);
              break;
            case "menu":
              showMenu(item[1].objects);
              break;
            case "selector":
              setSelector(SELECTORS[item[1].selector]);
              break;
            case "modal":
              siteData.setModal(FUNCS[item[1].selector]);
              break;
          }
          e.stopPropagation();
        }}
      >
        {item[1].icon}
      </a>
    </li>
  );
}

function Menu({ addItemToList, selected }) {
  const siteData = useContext(SiteContext);
  const { setSelected } = siteData;
  const [isMinimized, setMinimized] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <FloatingPanel isMinimized={isMinimized} setMinimized={setMinimized}>
        <NestedMenu
          data={defaultButtons}
          addItemToList={siteData.addItemToList}
          parentSelected={selected.length == 0 ? null : selected}
          setMinimized={setMinimized}
          setParentSelected={setSelected}
        />
      </FloatingPanel>
      {/* <Row>
                
            </Row> */}
    </div>
  );
}

function NestedMenu({
  data,
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
      {!selected && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
            marginTop: -30,
            marginBottom: 10,
            height: 20,
          }}
        >
          {(selector || parentSelected) && (
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
          )}
          <div className="px-2">
            <DragHandle />
            {selected}
          </div>
          <div
            className={
              "cursor-pointer w-5 px-1 mr-1 hover:bg-gray-200 rounded-full"
            }
            style={{ pointerEvents: "all" }}
            onClick={() => {
              setMinimized(true);
            }}
          >
            <CloseIcon />
          </div>
        </div>
      )}

      {Array.isArray(parentSelected) ? (
        <div className="flex flex-grow px-3 text-left">{controlPanel}</div>
      ) : (
        !selected &&
        !selector && (
          <>
            <ul className="menu bg-base-100 p-2 rounded-box">
              {Object.entries(data).map((item) => {
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
          </>
        )
      )}

      {selector && (
        <Column
          className={"w-max items-center cpanel-col h-[90%] overflow-y-auto"}
        >
          {selector}
        </Column>
      )}
      {/* todo make this truly recursive by adding editmenu again */}
      {selected != null && (
        <NestedMenu
          data={selected}
          addItemToList={addItemToList}
          parentSelected={selected}
          setParentSelected={setSelected}
        />
      )}
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
      className={"flex flex-col card bg-base-100 border transition-all"}
      style={{
        height: isMinimized ? "50px" : "70vh",
        maxWidth: "80vw",
        marginBottom: -pos.y,
        marginRight: -pos.x,
        transition: `width 0.2s, height 0.2s ${
          isMinimized ? `, all 0.1s` : ``
        }`,
      }}
    >
      {isMinimized ? (
        <div
          className="pt-3 px-4"
          onClick={() => {
            setMinimized(false);
          }}
        >
          <AppsIcon />
        </div>
      ) : (
        <div
          className="h-10 cursor-grab"
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
        ></div>
      )}
      {!isMinimized && children}
    </div>
  );
}

export default Menu;

const DragHandle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};
