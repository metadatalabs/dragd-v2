import Head from 'next/head'
import React, { useEffect } from 'react'
import { CryptoAuthContext } from '/components/CryptoAuth'
import { useRouter } from 'next/router';
import Dragdrop from '../components/dragdropeditor/index.tsx';
import Omnibar from '../components/Omnibar'

export default function Home(props) {
  const router = useRouter();
  const { session } = React.useContext(CryptoAuthContext);
  useEffect((lastSession) => {
    if (session?.address && session.address !== lastSession?.address) {
      router.push('/'+ session.address);
    }
  }, [session])

  let pageJson = props.data[0]
  console.log(props)
  return (
    <>
      <Head>
        <title>dragd - create a web3 site</title>
        <meta name="description" content="Create a decentralised web3 website with dragd" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Omnibar />
      <Dragdrop 
        initialState={pageJson?.page || {}}
        onChangedCallback={(data) => {}}
        saveCallback={(data) => {}}
        immutable={false}
        pending={false}
        />
    </>
  )
}

const apiEndpoint = 'http://127.0.0.1:3000';

export async function getStaticProps() {
    var sitePath = "prnth.eth/index";

    let pageJson;
    try {
        const fetchRes = await fetch(
            apiEndpoint + `/api/item-public?name=${sitePath}`,
        );
        pageJson = await fetchRes.json();
        pageJson.preload = true;

    } catch (e) {}
    return {
      props: { data: pageJson?.data || {data:[{}]} },
      revalidate: 60,
    }
  }