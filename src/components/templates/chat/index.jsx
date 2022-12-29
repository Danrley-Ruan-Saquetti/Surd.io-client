import { useState } from "react"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import useListFriends from "../../../hooks/useListFriends.js"
import ChatLobby from "./lobby/index.jsx"
import ChatPrivate from "./private/index.jsx"

export default function Chat() {
    const [currentUser] = useCurrentUser()
    const [friends] = useListFriends()
    const [chatState, setChatState] = useState(null)

    return (
        <>
            {[...friends, { idChat: null }].map((u, i) => {
                return <div key={u.idChat || i}><h3>{!u.idChat ? currentUser.serverConnected.name : `${u.user.username} - ${u.user.online ? `Online` : `Offline`}`} <button onClick={() => {
                    setChatState(u.idChat)
                }}>Select</button> </h3></div>
            })}
            {!chatState ? (<><ChatLobby /></>) : (<><ChatPrivate idChat={chatState} /></>)}
        </>
    )
}