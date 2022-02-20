import type { NextPage } from 'next'
import Head from "next/head";

import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const Home: NextPage = () => {
    return (
        <>
            <Head>

                <title>Spotify</title>
            </Head>
            <div className="min-h-full">
                <Sidebar/>
                <Main />
            </div>
        </>
    )
}

export default Home
