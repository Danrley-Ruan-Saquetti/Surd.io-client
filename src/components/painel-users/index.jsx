import { useState } from "react"
import AbaFriends from "./aba-friends"
import "./style.css"
import AbaUsers from "./aba-users"

export default function PainelUsers() {
    const [abaActive, setAbaActive] = useState(0)

    const toggleAba = (value = true) => {
        setAbaActive(value)
    }

    return (
        <>
            <div className="users-content">
                <div className="aba-content users-abas">
                    <div onClick={() => toggleAba(0)} className={"aba " + (abaActive == 0 ? "active" : "")}>Users</div>
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