import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from "@giphy/react-components";
import { useContext } from "react";
import SiteContext from "../../siteContext";
import StylePanelControls, { TabSwitcher } from "../EditMenu/StyleControlPanel";
const webSDKKey = "6s6dfi1SuYlcbne91afF4rsD1b2DFDfQ";

export default function PanelControls({ id }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const elemData = items[id];
  const onLocalUpdate = (newProps) => onUpdateDiv(elemData.id, newProps);
  return (
    <TabSwitcher
      tabs={[
        <>
          <div className="flex flex-col">
            <SearchContextManager
              apiKey={webSDKKey}
              options={{
                type: "stickers",
              }}
            >
              <Components
                onSelect={(gif) =>
                  onLocalUpdate({
                    giphyUri: gif.id,
                  })
                }
              />
            </SearchContextManager>
          </div>
        </>,
        <StylePanelControls id={id} />,
      ]}
      tabicons={["Properties", "Style"]}
    />
  );
}

const Components = ({ onSelect }) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  return (
    <div className="w-full h-[600px] overflow-y-scroll">
      <SearchBar />
      <SuggestionBar />
      <Grid
        key={searchKey}
        columns={3}
        width={384}
        fetchGifs={fetchGifs}
        onGifClick={(gif, e) => {
          e.preventDefault();
          onSelect(gif);
        }}
      />
    </div>
  );
};
