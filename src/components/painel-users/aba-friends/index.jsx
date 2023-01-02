import { useState } from "react"
import ListFriends from "./friends"
import ListInvites from "./invites"
import "./style.css"

export default function AbaFriends() {
    const [abaActive, setAbaActive] = useState(0)

    const toggleAba = (value = true) => {
        setAbaActive(value)
    }

    return (
        <>
            <div className="friend-content">
                <div className="aba-content friend-abas">
                    <div onClick={() => toggleAba(0)} className={"aba " + (abaActive == 0 ? "active" : "")}>Friends</div>
                    <div onClick={() => toggleAba(1)} className={"aba " + (abaActive == 1 ? "active" : "")}>Invites</div>
                    <div onClick={() => toggleAba(2)} className={"aba " + (abaActive == 2 ? "active" : "")}>Hold on</div>
                    <div onClick={() => toggleAba(3)} className={"aba " + (abaActive == 3 ? "active" : "")}>Denied</div>
                </div>
                {abaActive == 0 ? (<>
                    <ListFriends />
                </>) : abaActive == 1 ? (<>
                    <ListInvites />
                </>) : abaActive == 2 ? (<>

                </>) : (<>

                </>)}
            </div>
        </>
    )
}