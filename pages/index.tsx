import type { NextPage } from 'next'

import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Player from "../components/Player";

const Home: NextPage = () => {
    return (
        <>
            <div className="min-h-full">
                <Sidebar/>
                <Main />
            </div>
            <div className="sticky bottom-0">
                <Player />
            </div>
        </>
    )
}

export default Home;
