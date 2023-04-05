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

const componentMap = {
  test: EditItem,
  text: DraggableText,
  button: DraggableButton,
  image: DraggableImage,
  diffusion: DraggableDiffusion,
  giphy: DraggableGiphy,
  video: DraggableVideo,
  audio: DraggableAudio,
  smartcontract: DraggableEth,
  markdown: DraggableHtml,
  code: DraggableHtml,
  form: DraggableForm,
  head: PageStyle,
  template: DraggableTemplate,
};

function ComponentSelector({ elem, selected }) {
  const isSelected = selected && selected.includes(elem.id);
  const Component = componentMap[elem.type];

  if (Component) {
    return <Component elemData={elem} selected={isSelected} />;
  }

  return <></>;
}

export default ComponentSelector;
