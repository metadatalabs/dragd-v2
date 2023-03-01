import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import LoginButton from '@/components/dragdropeditor/blocks/LoginButton'
import React, { useEffect } from 'react'
import { apiRequest } from '@/util/network'
import { CryptoAuthContext } from '@/components/CryptoAuth'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { session } = React.useContext(CryptoAuthContext);
  useEffect((lastSession) => {
    if (session?.address && session.address !== lastSession?.address) {
      router.push('/dashboard');
    }
  }, [session])

  const [me, setMe] = React.useState({});

  return (
    <>
      <Head>
        <title>dragd - create a web3 site</title>
        <meta name="description" content="Create a decentralised web3 website with dragd" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ScrollingCardsBG />
        <div className={"w-full h-screen flex flex-col lg:flex-row justify-end items-center"}>
          <div className={"flex flex-col justify-between text-black bg-white w-4/5 h-2/5 lg:w-1/3 lg:h-4/5 mx-6 my-6 rounded-2xl p-8"}>
            <div className={"text-xl md:text-3xl lg:text-6xl font-black"}>
            <div className={"flex flex-row lg:flex-col space-x-1 lg:space-x-0"}>
            <div>OWN</div>
            <div>YOUR</div>
            <div>INTERNET</div>
            </div>
            <div className={"text-xl font-medium"}>
Build websites powered by Ethereum.
            </div>
            </div>
            <div className="text-center">
            <LoginButton />
            </div>
          </div>
        </div>
        <div className={"text-xl font-bold underline"}>
          <div>
            <button onClick={async ()=>{
              const res = await apiRequest('me')
              console.log(res)
              setMe(res)
            }}>Get Me</button><br />
            <button onClick={async ()=>{
              const res = await apiRequest('ipfs-upload').catch(err=>setMe(err))
              setMe(res)
            }}>Get IPFS</button><br />
            LOG: {JSON.stringify(me)}
          </div>
        </div>
      </main>
    </>
  )
}

const ScrollingCardsBG = () => {
  return (
    <div className={"flex flex-row w-full h-screen p-2"}>
    <div class="columns-3 w-full">
      <NiceRoundedImageCard image={"https://picsum.photos/200/300"} />
      <NiceRoundedImageCard image={"https://picsum.photos/200/300"} />
      <NiceRoundedImageCard image={"https://picsum.photos/200/300"} />
      <NiceRoundedImageCard image={"https://picsum.photos/200/300"} />
      <NiceRoundedImageCard image={"https://picsum.photos/200/300"} />
      <NiceRoundedImageCard image={"https://picsum.photos/200/300"} />
    </div>
    </div>
  )
}

const NiceRoundedImageCard = ({image}) => {
  const [init, setInit] = React.useState(false);
  
  React.useEffect(()=>{setInit(true)}, [])

  return <div className={`rounded-2xl bg-white w-full mb-4 overflow-hidden transition-all ease-in duration 300${init? '': 'scale-75'}`}>
    <img src={image} className={"w-full"} />
  </div>
}