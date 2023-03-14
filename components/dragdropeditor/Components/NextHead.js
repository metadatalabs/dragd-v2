import React, { useContext } from 'react';
import Head from 'next/head';
// import { useForm } from "react-hook-form";
import SiteContext from '../siteContext';

function NextHead(props) {
    const { elemData, onSelect, onUpdated, selected, mode } = props;

    return (
        <>
            <Head>
                {elemData?.head.title && <title>{elemData.head.title}</title>}
            </Head>
        </>
    );
}

export function HeadConfigurator({ addItemToList }) {
    // const siteData = useContext(SiteContext);
    // const { items: elemItems } = siteData;
    // const headData = elemItems["head"];

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => {
    //     addItemToList({
    //         type: 'head',
    //         size: {
    //             width: 100,
    //             height: 100,
    //         },
    //         head: { title: data.title },
    //     }, "head");
    // };

    return (
        <div style={{padding: 8}}>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div style={{fontSize: 14, fontWeight: "bold"}}>Page Title</div>
                <input defaultValue={headData?.head?.title} {...register("title")} />
            </div>
            {errors.length > 0 && <span>{JSON.stringify(errors)}</span>}
            
            <input type="submit" value="Save"/>
            </form> */}
        </div>
    );
}

export default NextHead;
