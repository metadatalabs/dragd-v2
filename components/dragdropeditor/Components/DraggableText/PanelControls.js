import fonts from "../../helpers/ui/fonts.json";
import ColorPicker from "../../helpers/ui/ColorPicker";
import FontPicker from "../../helpers/ui/FontPicker";
import { useContext, useEffect, useState } from "react";
import SiteContext from "../../siteContext";
import { Row, SliderWithInput, StyleToggleButton } from "../../helpers/helper";
import GenericDropdown from "../../../UI/GenericDropdown";
import StylePanelControls, { TabSwitcher } from "../EditMenu/StyleControlPanel";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
} from "../DDEditor/EditorIcons";

const googleFonts = fonts["googleFonts"];
const fontList = ["Arial", "Times New Roman", "Courier New", ...googleFonts];

export default function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);

  return (
    <>
      <TabSwitcher
        tabs={[
          <>
            Text Block
            <textarea
              rows={4}
              className={"ring-1 rounded-md p-1 my-2"}
              value={elemData?.text}
              onChange={(e) => {
                onLocalUpdate({ text: e.target.value });
              }}
            />
          </>,
          <StylePanelControls id={id} />,
        ]}
        tabicons={["Properties", "Style"]}
      />
    </>
  );
}
