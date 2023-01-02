import Header from "./header/index.jsx"
import Panel from "./panel/index.jsx"
import SideBar from "./side-bar/index.jsx"
import "./session-styles/home.css"
import { useState } from "react"

export default function HomeSession() {
    const [action, setAction] = useState("user")

    const updateAction = (ac = "") => {
        setAction(ac)
    }

    return (
        <>
            <Header />
            <div className="main">
                <SideBar
                    actionFunction={updateAction}
                    itemActive={action}
                />
                <Panel
                    action={action}
                />
            </div>
        </>
    )
}
