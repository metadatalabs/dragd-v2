import {
  IconLinkBoxOutline,
  CodeIcon,
  ImageIcon,
  LabsIcon,
  LinkIcon,
  PuzzleIcon,
  SmartContractIcon,
  StylesIcon,
  WindowIcon,
  IconStickerEmoji,
  IconVideo,
  IconCurrencyEthereum,
  IconSound,
  FormIcon,
  MoreIcon,
} from "../DDEditor/EditorIcons";

const defaultButtons = {
  text: {
    icon: <div className={"font-bold text-xl"}>Aa</div>,
    label: "Text",
    action: "add",
    object: {
      type: "text",
      text: "click to edit!",
      style: {
        fontFamily: "Lato",
        fontSize: "32px",
      },
      size: {
        width: 200,
        height: 100,
      },
    },
  },
  image: {
    icon: <ImageIcon />,
    label: "Image",
    action: "add",
    object: {
      type: "image",
      size: {
        width: 100,
        height: 100,
      },
      style: {
        image:
          "https://raw.githubusercontent.com/metadatalabs/static-assets/main/logos/dragd_logo.png",
      },
    },
  },
  button: {
    icon: <IconLinkBoxOutline />,
    action: "modal",
    selector: "button",
    label: "Button",
  },
  media: {
    label: "Media",
    action: "menu",
    icon: (
      <div className="stack">
        <IconStickerEmoji />
        <IconSound />
      </div>
    ),
    objects: {
      giphy: {
        icon: <IconStickerEmoji />,
        action: "add",
        label: "Sticker",
        object: {
          type: "giphy",
          size: {
            width: 100,
            height: 100,
          },
          giphyUri: "fpXxIjftmkk9y",
        },
      },

      video: {
        icon: <IconVideo />,
        label: "Video",
        action: "add",
        object: {
          type: "video",
          size: {
            width: 100,
            height: 100,
          },
          videoUri: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      },
      audio: {
        icon: <IconSound />,
        label: "Audio",
        action: "add",
        object: {
          type: "audio",
          size: {
            width: 200,
            height: 100,
          },
          audioUri:
            "https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg",
        },
      },
      // shapes: {
      //   icon: "fas fa-shapes",
      //   label: "Shape",
      //   action: "menu",
      //   objects: {
      //     square: {
      //       icon: "fas fa-square-full",
      //       label: "Rectangle",
      //       action: "add",
      //       object: {
      //         type: "color",
      //         size: {
      //           width: 100,
      //           height: 100,
      //         },
      //         style: {
      //           backgroundColor: "grey",
      //         },
      //       },
      //     },
      //   },
      // },
    },
  },
  experimental: {
    label: "More",
    action: "menu",
    icon: <MoreIcon />,
    objects: {
      payButton: {
        icon: <IconCurrencyEthereum />,
        label: "Pay Button",
        action: "modal",
        selector: "payButton",
      },
      form: {
        icon: <FormIcon />,
        label: "Form",
        action: "add",
        object: {
          type: "form",
          size: {
            width: 200,
            height: 150,
          },
          style: { textAlign: "left" },
        },
      },
      code: {
        icon: <CodeIcon />,
        label: "Code",
        action: "add",
        object: {
          type: "code",
          size: {
            width: 100,
            height: 100,
          },
          text: "your code here!",
          subtype: "html",
        },
      },

      template: {
        icon: <WindowIcon />,
        action: "modal",
        selector: "template",
        label: "Template",
      },
      ethereum: {
        icon: <SmartContractIcon />,
        label: "Contract",
        action: "modal",
        selector: "eth",
      },

      // diffusion: {
      //   icon: <ImageIcon />,
      //   label: "Stable Diffusion Image",
      //   action: "add",
      //   object: {
      //     type: "diffusion",
      //     size: {
      //       width: 512,
      //       height: 512,
      //     },
      //     imageUri:
      //       "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
      //   },
      // },
    },
  },

  head: {
    icon: <StylesIcon />,
    label: "Page Theme",
    selector: "headconf",
    action: "selector",
  },
};

export default defaultButtons;
