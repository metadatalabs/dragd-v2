// import React, { useEffect } from 'react';
// import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
// import analytics from '../../../../util/analytics.js';
// import { createDatapoint } from '../../../../util/db.js';

// export default function FormCreator({ fields: initFields, onSave, id }) {
//     const { register, control, handleSubmit, reset, watch } = useForm({
//         defaultValues: {
//             test: initFields || [{ formInput: '', type: 'text' }],
//         },
//     });
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'test',
//     });
//     const watchFieldArray = watch('test');
//     const controlledFields = fields.map((field, index) => {
//         return {
//             ...field,
//             ...watchFieldArray[index],
//         };
//     });

//     const onSubmit = (data) => {
//         console.log('data', data);
//         createDatapoint({ formId: id, ...data });
//         analytics.track('form_submitted');
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <ul>
//                     {controlledFields.map((item, index) => {
//                         return (
//                             <li key={item.id}>
//                                 <InputTypeSelector
//                                     index={index}
//                                     item={item}
//                                     register={register}
//                                 />

//                                 {onSave && (
//                                     <>
//                                         <select
//                                             {...register(`test.${index}.type`)}
//                                         >
//                                             <option value="text">text</option>
//                                             <option value="date">date</option>
//                                             <option value="select">
//                                                 select
//                                             </option>
//                                             <option value="number">
//                                                 number
//                                             </option>
//                                             <option value="email">Email</option>
//                                         </select>
//                                         <i
//                                             className="far fa-trash-alt"
//                                             onClick={() => remove(index)}
//                                         />
//                                     </>
//                                 )}
//                             </li>
//                         );
//                     })}
//                 </ul>
//                 {onSave && (
//                     <section>
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 append({ formInput: '', type: 'text' });
//                             }}
//                         >
//                             Add Field
//                         </button>
//                     </section>
//                 )}
//                 <input type="submit" />
//             </form>

//             {onSave && (
//                 <button
//                     onClick={() => {
//                         onSave(controlledFields);
//                     }}
//                 >
//                     Complete
//                 </button>
//             )}
//         </>
//     );
// }

// function InputTypeSelector({ index, item, register }) {
//     switch (item.type) {
//         case 'text':
//         case 'number':
//         case 'date':
//             return (
//                 <input
//                     type={item.type}
//                     {...register(`test.${index}.formInput`)}
//                 />
//             );
//         case 'email':
//             return (
//                 <input
//                     type={item.type}
//                     {...register(`test.${index}.formInput`, {
//                         pattern:
//                             /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//                     })}
//                 />
//             );
//         case 'text':
//             return (
//                 <input
//                     type={item.type}
//                     {...register(`test.${index}.formInput`)}
//                 />
//             );
//     }
//     return <></>;
// }
