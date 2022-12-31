import { useState } from "react"
import ListFriends from "./list-friends"
import ListUsers from "./list-users"
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
                    <div onClick={() => toggleAba(0)} className={"aba " + (abaActive == 0 ? "active" : "")}>Users</div>
                    <div onClick={() => toggleAba(1)} className={"aba " + (abaActive == 1 ? "active" : "")}>Friends</div>
                </div>
                {abaActive == 0 ? (<>
                    <ListUsers />
                </>) : (<>
                    <ListFriends />
                </>)}
            </div>
        </>
    )
}