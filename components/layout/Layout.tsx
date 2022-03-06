import Sidebar from "./sidebar/Sidebar"
import Player from "./player/Player"
import Header from "./Header"

export default function Layout({ children }) {
    return (
      <>
          <div className="min-h-full">
              <Sidebar/>
              <Header>
                  {children}
              </Header>
          </div>
          <div className="fixed w-full bottom-0 ">
              <Player />
          </div>
      </>
    )
}
