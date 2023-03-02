import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import React from 'react'
import { apiRequest } from '@/util/network'
import LoginButton from '@/components/dragdropeditor/blocks/LoginButton'
import NewSiteForm from '@/components/dashboard/NewSiteModal'
import { useSitesByOwner } from '@/components/DataProvider'
import { CryptoAuthContext } from '@/components/CryptoAuth'
import SiteList from '@/components/dashboard/SiteList'

export default function Dash() {
  return (
    <>
      <Head>
        <title>Dashboard | dragd</title>
        <meta name="description" content="Dashboard to manage your dragd websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} p-8 text-gray-200 dark:text-gray-700`} style={{backgroundColor: "#212121"}}>
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
                {"YOUR DOMAINS"}
            </div>
            <div>
                <button className={"rounded-full bg-gray-300/20 px-2"}>
                </button>
            </div>
        </div>
        {<SiteList />}
        <div className={"text-center border mx-auto p-2 rounded-md bg-gray-500/20"}>
          Coming Soon: Challenges!<br />
          Complete website goals to earn rewards.
        </div>
        </div>
      </main>
    </>
  )
}

