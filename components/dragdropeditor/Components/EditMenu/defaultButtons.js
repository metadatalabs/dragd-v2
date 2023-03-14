const defaultButtons = {
    text: {
        icon: 'fas fa-font',
        label: 'Text',
        action: 'add',
        object: {
            type: 'text',
            text: 'click to edit!',
            style: {
                fontFamily: 'Lato',
                fontSize: '32px',
                color: 'black',
            },
            size: {
                width: 200,
                height: 100,
            },
        },
    },
    button: {
        icon: 'fas fa-link',
        action: 'modal',
        selector: 'button',
        label: 'Button',
    },
    shapes: {
        icon: 'fas fa-shapes',
        label: 'Shape',
        action: 'menu',
        objects: {
            square: {
                icon: 'fas fa-square-full',
                label: 'Rectangle',
                action: 'add',
                object: {
                    type: 'color',
                    size: {
                        width: 100,
                        height: 100,
                    },
                    style: {
                        backgroundColor: 'grey',
                    },
                },
            }
        },
    },
    ethereum: {
        icon: 'fas fa-gem',
        label: 'Smart Contract',
        action: 'modal',
        selector: 'eth',
    },
    media: {
        icon: 'fas fa-photo-video',
        label: 'Media',
        action: 'menu',
        objects: {
            image: {
                icon: 'fas fa-image',
                label: 'Image',
                action: 'add',
                object: {
                    type: 'image',
                    size: {
                        width: 100,
                        height: 100,
                    },
                    imageUri:
                        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
                },
            },
            diffusion: {
                icon: 'fas fa-project-diagram',
                label: 'Stable Diffusion Image',
                action: 'add',
                object: {
                    type: 'diffusion',
                    size: {
                        width: 512,
                        height: 512,
                    },
                    imageUri:
                        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
                },
            },
            video: {
                icon: 'fas fa-film',
                label: 'Video',
                action: 'add',
                object: {
                    type: 'video',
                    size: {
                        width: 100,
                        height: 100,
                    },
                    videoUri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                },
            },
            audio: {
                icon: 'fas fa-volume-up',
                label: 'Audio',
                action: 'add',
                object: {
                    type: 'audio',
                    size: {
                        width: 200,
                        height: 100,
                    },
                    audioUri:
                        'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
                },
            },
        },
    },
    // form: {
    //     icon: 'fas fa-poll-h',
    //     label: 'Form',
    //     action: 'add',
    //     object: {
    //         type: 'form',
    //         size: {
    //             width: 200,
    //             height: 150,
    //         },
    //         style: { textAlign: 'left' },
    //     },
    // },
    giphy: {
        icon: 'far fa-laugh-beam',
        action: 'selector',
        selector: 'giphy',
        label: 'Sticker',
    },
    code: {
        icon: 'fas fa-code',
        label: 'Code',
        action: 'add',
        object: {
            type: 'code',
            size: {
                width: 100,
                height: 100,
            },
            text: 'your code here!',
        },
    },
    template: {
        icon: 'far fa-object-group',
        action: 'modal',
        selector: 'template',
        label: 'Template',
    },
    head: {
        icon: 'fas fa-sliders-h',
        label: 'Head',
        selector: 'headconf',
        action: 'selector',
    },
};

export default defaultButtons;
