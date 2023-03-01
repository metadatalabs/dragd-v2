import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import React from 'react'
import { apiRequest } from '@/util/network'
import LoginButton from '@/components/dragdropeditor/blocks/LoginButton'
import NewSiteForm from '@/components/dashboard/NewSiteForm'
import { useSitesByOwner } from '@/components/DataProvider'
import { CryptoAuthContext } from '@/components/CryptoAuth'
import SiteList from '@/components/dashboard/SiteList'

export default function Dash() {
  const [createToggle, setCreateToggle] = React.useState(false);

  return (
    <>
      <Head>
        <title>Dashboard | dragd</title>
        <meta name="description" content="Dashboard to manage your dragd websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} p-8`}>
        <div className={`${styles.description} w-full flex flex-row mb-8 justify-between`}>
          <p>
            Get started by &nbsp;
            <code className={styles.code}>creating a page</code>
          </p>
          <div>
            <LoginButton />
          </div>
        </div>

        <div className={"flex w-full flex-col rounded-xl bg-opacity-50 p-2 md:p-4"}>
        <div className="flex flex-row align-center justify-between p-2 text-xs font-medium leading-6">
            <div className={""}>
                {!createToggle && "YOUR DOMAINS"}
            </div>
            <div>
                <button className={"rounded-full bg-gray-300/20 px-2"}
                    onClick={()=>{setCreateToggle(!createToggle)}}>
                {createToggle ? 'CANCEL': 'CREATE'} 
                </button>
            </div>
        </div>
        {createToggle? <NewSiteForm />:<SiteList />}
        </div>
      </main>
    </>
  )
}

