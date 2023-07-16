import React, { useState, useContext, useEffect, useRef } from "react";

export const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 ml-1 -mr-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};

export const SaveIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 ml-2 -mr-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
};

export const HelpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );
};

export const UndoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
      />
    </svg>
  );
};

export const RedoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
      />
    </svg>
  );
};

export const LinkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
};

export function IconLinkBoxOutline(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m0 16H5V5h14v14m-8-3h-1c-1.61 0-4-1.06-4-4 0-2.93 2.39-4 4-4h1v2h-1c-.46 0-2 .17-2 2 0 1.9 1.67 2 2 2h1v2m3 0h-1v-2h1c.46 0 2-.17 2-2 0-1.9-1.67-2-2-2h-1V8h1c1.61 0 4 1.07 4 4 0 2.94-2.39 4-4 4m1-3H9v-2h6v2z" />
    </svg>
  );
}

export const LayerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
      />
    </svg>
  );
};

export const LayerUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      fill="currentColor"
      class="bi bi-layer-forward"
      viewBox="0 0 16 16"
    >
      <path d="M8.354.146a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l1 1a.5.5 0 0 0 .708 0L7 4.207V12H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9V4.207l.646.647a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708l-3-3z"></path>
      <path d="M1 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5a.5.5 0 0 0 0-1H1V8h4.5a.5.5 0 0 0 0-1H1zm9.5 0a.5.5 0 0 0 0 1H15v2h-4.5a.5.5 0 0 0 0 1H15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4.5z"></path>
    </svg>
  );
};

export const LayerDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      fill="currentColor"
      class="bi bi-layer-backward"
      viewBox="0 0 16 16"
    >
      <path d="M8.354 15.854a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708l1-1a.5.5 0 0 1 .708 0l.646.647V4H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9v7.793l.646-.647a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-3 3z"></path>
      <path d="M1 9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.5a.5.5 0 0 1 0 1H1v2h4.5a.5.5 0 0 1 0 1H1zm9.5 0a.5.5 0 0 1 0-1H15V6h-4.5a.5.5 0 0 1 0-1H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4.5z"></path>
    </svg>
  );
};

export const CopyIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
      />
    </svg>
  );
};

export const TrashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
};

export const SmartContractIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  );
};

export const IconCurrencyEthereum = (props) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      className="w-6 h-6"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M6 12l6-9 6 9-6 9z" />
      <path d="M6 12l6-3 6 3-6 2z" />
    </svg>
  );
};

export const CodeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  );
};

export const PuzzleIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M9 13V5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v6h-3.43l-1.28-1.74a.14.14 0 00-.24 0L15.06 12c-.06.06-.18.07-.24 0l-1.43-1.75a.152.152 0 00-.23 0l-2.11 2.66c-.08.09-.01.24.11.24h6.34V15H11c-1.11 0-2-.89-2-2m-3 9v-1H4v1H2V2h2v1h2V2h2.39C7.54 2.74 7 3.8 7 5v8c0 2.21 1.79 4 4 4h4.7c-1.03.83-1.7 2.08-1.7 3.5 0 .53.11 1.03.28 1.5H6M4 7h2V5H4v2m0 4h2V9H4v2m0 4h2v-2H4v2m2 4v-2H4v2h2m17-6v2h-2v5.5a2.5 2.5 0 01-5 0 2.5 2.5 0 013.5-2.29V13H23z" />
    </svg>
  );
};

export function IconStickerEmoji(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M5.5 2C3.56 2 2 3.56 2 5.5v13C2 20.44 3.56 22 5.5 22H16l6-6V5.5C22 3.56 20.44 2 18.5 2h-13m.25 2h12.5A1.75 1.75 0 0120 5.75V15h-1.5c-1.94 0-3.5 1.56-3.5 3.5V20H5.75A1.75 1.75 0 014 18.25V5.75A1.75 1.75 0 015.75 4m8.69 2.77c-.16 0-.32.02-.47.06-.94.26-1.47 1.22-1.23 2.17.05.15.12.3.21.44l3.23-.88c0-.17-.02-.34-.06-.51-.21-.75-.9-1.28-1.68-1.28M8.17 8.5c-.17 0-.32 0-.47.05-.93.26-1.48 1.22-1.23 2.15.03.16.12.3.21.46l3.23-.88c0-.17-.02-.34-.06-.5A1.72 1.72 0 008.17 8.5m8.55 2.76l-9.13 2.51a5.266 5.266 0 005.36 1.64 5.273 5.273 0 003.77-4.15z" />
    </svg>
  );
}

export function IconVideo(props) {
  return (
    <svg fill="none" viewBox="0 0 15 15" className="w-6 h-6" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.764 3.122A32.656 32.656 0 017.5 3c.94 0 1.868.049 2.736.122 1.044.088 1.72.148 2.236.27.47.111.733.258.959.489.024.025.06.063.082.09.2.23.33.518.405 1.062.08.583.082 1.343.082 2.492 0 1.135-.002 1.885-.082 2.46-.074.536-.204.821-.405 1.054a2.276 2.276 0 01-.083.09c-.23.234-.49.379-.948.487-.507.12-1.168.178-2.194.264-.869.072-1.812.12-2.788.12-.976 0-1.92-.048-2.788-.12-1.026-.086-1.687-.144-2.194-.264-.459-.108-.719-.253-.948-.487a2.299 2.299 0 01-.083-.09c-.2-.233-.33-.518-.405-1.054C1.002 9.41 1 8.66 1 7.525c0-1.149.002-1.91.082-2.492.075-.544.205-.832.405-1.062.023-.027.058-.065.082-.09.226-.231.489-.378.959-.489.517-.122 1.192-.182 2.236-.27zM0 7.525c0-2.242 0-3.363.73-4.208.036-.042.085-.095.124-.135.78-.799 1.796-.885 3.826-1.056C5.57 2.05 6.527 2 7.5 2c.973 0 1.93.05 2.82.126 2.03.171 3.046.257 3.826 1.056.039.04.087.093.124.135.73.845.73 1.966.73 4.208 0 2.215 0 3.323-.731 4.168a3.243 3.243 0 01-.125.135c-.781.799-1.778.882-3.773 1.048C9.48 12.951 8.508 13 7.5 13s-1.98-.05-2.87-.124c-1.996-.166-2.993-.25-3.774-1.048a3.316 3.316 0 01-.125-.135C0 10.848 0 9.74 0 7.525zm5.25-2.142a.25.25 0 01.35-.23l4.828 2.118c.2.088.2.37 0 .458L5.6 9.846a.25.25 0 01-.35-.229V5.383z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconSound(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path d="M892.1 737.8l-110.3-63.7a15.9 15.9 0 00-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0021.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0021.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 00-21.7-5.9L746 287.8a15.99 15.99 0 00-5.8 21.8L760 344zm174 132H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1z" />
    </svg>
  );
}

export const LabsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    </svg>
  );
};

export const ImageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
};

export const WindowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
      />
    </svg>
  );
};

export const StylesIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
      />
    </svg>
  );
};

export const AppsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-6 h-6 main-grid-item-icon"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <rect height="7" width="7" x="3" y="3" />
      <rect height="7" width="7" x="14" y="3" />
      <rect height="7" width="7" x="14" y="14" />
      <rect height="7" width="7" x="3" y="14" />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
      ></path>
    </svg>
  );
};

export function IconCornerBottomRight(props) {
  return (
    <svg fill="none" viewBox="0 0 15 15" className="w-6 h-6" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.123 12H3.5a.5.5 0 010-1h1.6c1.128 0 1.945 0 2.586-.053.637-.052 1.057-.152 1.403-.329a3.5 3.5 0 001.53-1.529c.176-.346.276-.766.328-1.403C11 7.045 11 6.228 11 5.1V3.5a.5.5 0 011 0v1.623c0 1.1 0 1.958-.056 2.645-.057.698-.175 1.265-.435 1.775a4.5 4.5 0 01-1.966 1.966c-.51.26-1.077.378-1.775.435C7.08 12 6.224 12 5.123 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconPadding(props) {
  return (
    <svg fill="none" viewBox="0 0 15 15" className="w-6 h-6" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.857 2h9.286c.473 0 .857.384.857.857v9.286a.857.857 0 01-.857.857H2.857A.857.857 0 012 12.143V2.857C2 2.384 2.384 2 2.857 2zM1 2.857C1 1.831 1.831 1 2.857 1h9.286C13.168 1 14 1.831 14 2.857v9.286A1.857 1.857 0 0112.143 14H2.857A1.857 1.857 0 011 12.143V2.857zM7.5 5a.5.5 0 100-1 .5.5 0 000 1zm-3 6a.5.5 0 100-1 .5.5 0 000 1zM5 7.5a.5.5 0 11-1 0 .5.5 0 011 0zM4.5 5a.5.5 0 100-1 .5.5 0 000 1zm6.5 5.5a.5.5 0 11-1 0 .5.5 0 011 0zM10.5 8a.5.5 0 100-1 .5.5 0 000 1zm.5-3.5a.5.5 0 11-1 0 .5.5 0 011 0zM7.5 11a.5.5 0 100-1 .5.5 0 000 1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function IconSquareOpacity(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M19 13v-2h2v2h-2m2-4V7h-2v2h2m0-6h-2v2h2V3m-4 12h2v-2h-2v2m4 2v-2h-2v2h2m-8 0v-2h2v-2h-2v-2h2V9h-2V7h2V5h-2V3H3v18h10v-2h2v-2h-2m2 4h2v-2h-2v2m2-18h-2v2h2V3m0 8h2V9h-2v2m-2 6h2v-2h-2v2m2 2h2v-2h-2v2m4 2v-2h-2v2h2M15 9h2V7h-2v2m0 4h2v-2h-2v2m2-8v2h2V5h-2z" />
    </svg>
  );
}

export function TickIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
      <path d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}
