import React from "react";
import dynamic from "next/dynamic";

// I really tried to get rid of this list, but Nextjs
// doesn't allow dynamic imports inside components due to limitations
// with Nextjs' server-side rendering.  So, we have to do this. For static builds.

const EditItem = dynamic(() => import("./DDEditor/EditItem"));
const DraggableText = dynamic(() => import("./DraggableText"));
const DraggableButton = dynamic(() => import("./DraggableButton"));
const DraggableImage = dynamic(() => import("./DraggableImage"));
const DraggableDiffusion = dynamic(() => import("./DraggableDiffusion"));
const DraggableGiphy = dynamic(() => import("./DraggableGiphy"));
const DraggableVideo = dynamic(() => import("./DraggableVideo"));
const DraggableAudio = dynamic(() => import("./DraggableAudio"));
const DraggableEth = dynamic(() => import("./DraggableEth"));
const DraggableHtml = dynamic(() => import("./DraggableHtml"));
const DraggableForm = dynamic(() => import("./DraggableForm"));
const PageStyle = dynamic(() => import("./PageStyle.js"));
const DraggableTemplate = dynamic(() => import("./DraggableTemplate"));

function ComponentSelector({ elem, selected }) {
  const isSelected = selected && selected.includes(elem.id);

  switch (elem.type) {
    case "test":
      return <EditItem elemData={elem} selected={isSelected} />;
    case "text":
      return <DraggableText elemData={elem} selected={isSelected} />;
    case "button":
      return <DraggableButton elemData={elem} selected={isSelected} />;
    case "image":
      return <DraggableImage elemData={elem} selected={isSelected} />;
    case "diffusion":
      return <DraggableDiffusion elemData={elem} selected={isSelected} />;
    case "giphy":
      return <DraggableGiphy elemData={elem} selected={isSelected} />;
    case "video":
      return <DraggableVideo elemData={elem} selected={isSelected} />;
    case "audio":
      return <DraggableAudio elemData={elem} selected={isSelected} />;
    case "smartcontract":
      return <DraggableEth elemData={elem} selected={isSelected} />;
    case "markdown":
      return <DraggableHtml elemData={elem} selected={isSelected} />;
    case "code":
      return <DraggableHtml elemData={elem} selected={isSelected} />;
    case "form":
      return <DraggableForm elemData={elem} selected={isSelected} />;
    case "head":
      return <PageStyle elemData={elem} selected={isSelected} />;
    case "template":
      return <DraggableTemplate elemData={elem} selected={isSelected} />;
  }

  return <></>;
}

export default ComponentSelector;
