import React, { useContext } from "react";
import Head from "next/head";
// import { useForm } from "react-hook-form";
import SiteContext from "../siteContext";
import ThemeSelector from "./EditMenu/ThemeSelector";
import FilePicker, { loadImageToUri } from "../helpers/ui/FilePicker";

function NextHead(props) {
  const { elemData, onSelect, onUpdated, selected, mode } = props;

  if (!elemData) return <></>;
  return (
    <>
      <Head>
        {elemData.title && <title>{elemData.title}</title>}
        {elemData.description && (
          <meta name="description" content={elemData.description}></meta>
        )}
        {elemData.favicon && (
          <link rel="icon" type="image/x-icon" href={elemData.favicon}></link>
        )}
      </Head>
    </>
  );
}

export function HeadConfigurator({ addItemToList }) {
  const { items, onUpdateDiv } = useContext(SiteContext);
  const styleData = items["style"];

  const onLocalUpdate = (newProps) => onUpdateDiv("style", newProps);

  // const onSubmit = (data) => {
  //   addItemToList(
  //     {
  //       type: "head",
  //       size: {
  //         width: 100,
  //         height: 100,
  //       },
  //       head: { title: data.title },
  //     },
  //     "theme"
  //   );
  // };

  console.log("current head is ", styleData);

  return (
    <div className="p-2 w-auto">
      {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div style={{fontSize: 14, fontWeight: "bold"}}>Page Title</div>
                <input defaultValue={headData?.head?.title} {...register("title")} />
            </div>
            {errors.length > 0 && <span>{JSON.stringify(errors)}</span>}
            
            <input type="submit" value="Save"/>
            </form> */}
      <label className="label">
        <span className="label-text"> Page Theme</span>
      </label>
      <ThemeSelector
        selectedTheme={styleData?.theme}
        onSelect={(theme) => {
          onLocalUpdate({ theme });
        }}
      />
      <div>
        <label className="label">
          <span className="label-text"> Background Settings</span>
        </label>
        <div>
          Color Picker
          {[
            "red",
            "blue",
            "green",
            "yellow",
            "purple",
            "pink",
            "indigo",
            "gray",
            "white",
            "black",
          ].map((color) => (
            <button
              className={`btn btn-circle btn-sm`}
              style={{ backgroundColor: color }}
              onClick={() => {
                onLocalUpdate({
                  ...styleData,
                  background: { backgroundColor: color },
                });
              }}
            ></button>
          ))}
        </div>
        <FilePicker
          selected={styleData?.background?.backgroundImage}
          setSelected={(dataUrl) => {
            onLocalUpdate({
              ...styleData,
              background: { backgroundImage: dataUrl },
            });
          }}
        />
        <div>Reset to theme default</div>
      </div>
    </div>
  );
}

export default NextHead;
