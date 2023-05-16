import React, { useContext } from "react";
import Head from "next/head";
// import { useForm } from "react-hook-form";
import SiteContext from "../siteContext";
import ThemeSelector from "./EditMenu/ThemeSelector";

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
    <div className="p-2">
      {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div style={{fontSize: 14, fontWeight: "bold"}}>Page Title</div>
                <input defaultValue={headData?.head?.title} {...register("title")} />
            </div>
            {errors.length > 0 && <span>{JSON.stringify(errors)}</span>}
            
            <input type="submit" value="Save"/>
            </form> */}
      <ThemeSelector
        selectedTheme={styleData?.theme}
        onSelect={(theme) => {
          onLocalUpdate({ theme });
        }}
      />
    </div>
  );
}

export default NextHead;
