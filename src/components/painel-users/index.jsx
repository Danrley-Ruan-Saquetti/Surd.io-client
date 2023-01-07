import { useState } from "react"
import AbaFriends from "./aba-friends"
import AbaUsers from "./aba-users"
import Icon from "../templates/icon"
import "./style.css"

export default function PainelUsers() {
    const [abaActive, setAbaActive] = useState(0)

    const toggleAba = (value = true) => {
        setAbaActive(value)
    }

    return (
        <>
            <div className="users-content">
                <div className="aba-content users-abas">
                    <Icon
                        className="aba-header"
                        name="group"
                    />
                    <div onClick={() => toggleAba(0)} className={"aba " + (abaActive == 0 ? "active" : "")}>Online</div>
                    <div onClick={() => toggleAba(1)} className={"aba " + (abaActive == 1 ? "active" : "")}>Friends</div>
                </div>
                {abaActive == 0 ? (<>
                    <AbaUsers />
                </>) : (<>
                    <AbaFriends />
                </>)}
            </div>
        </>
    )
}