// import React, { useState, useRef, useContext, useEffect } from 'react';
// import EditItem from '../DDEditor/EditItem';

// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import FormTest from './FormEditor';
// import SiteContext from '../../siteContext';

// const defaultTextSize = 24;

// function DraggableForm(props) {
//     const { elemData, selected } = props;

//     const siteData = useContext(SiteContext);
//     const {
//         setSelected: onSelect,
//         mode,
//         setModal,
//     } = siteData;

//     const onLocalUpdate = (newProps) => siteData.onUpdateDiv(elemData.id, newProps);

//     function setForm(value) {
//         onLocalUpdate({ formInputs: value });
//     }
//     let renderCount = 0;

//     function PanelControls() {
//         return (
//             <>
//                 <button
//                     onClick={() => {
//                         setModal(
//                             <>
//                             <FormTest
//                             id={elemData.id}
//                             fields={elemData.formInputs}
//                             onSave={(form)=>{
//                                 setForm(form);
//                                 setModal(null);
//                             }}/>
//                             </>
//                         );
//                     }}
//                 >
//                     Edit Form
//                 </button>

//                 <div style={{ padding: 2 }} />
//             </>
//         );
//     }

//     return (
//         <>
//             <EditItem
//                 elemData={elemData}
//                 onSelect={onSelect}
//                 onUpdated={onUpdated}
//                 selected={props.selected}
//                 renderPanel={PanelControls}
//                 mode={mode}
//             >
//                 <FormTest 
//                     id={elemData.id}
//                     fields={elemData.formInputs}
//                 />
//             </EditItem>
//         </>
//     );
// }

    
// export default DraggableForm;