import { useState } from "react"
import useListFriends from "../../../hooks/useListFriends.js"
import useListPosts from "../../../hooks/useListPosts.js"
import UserService from "../../../services/user.service.js"
import ChatLobby from "./lobby/index.jsx"
import ChatPrivate from "./private/index.jsx"

const userService = UserService()

export default function Chat() {
    const [data, setPost] = useState({ body: "" })
    const [posts] = useListPosts()
    const [friends] = useListFriends()
    const [chatState, setChatState] = useState(null)

    const handleData = ({ target }) => {
        setPost({ ...data, [target.name]: target.value })
    }

    return (
        <>
            {[...friends, { idChat: null }].map((u, i) => {
                return <div key={u.idChat || i}><h3>{!u.idChat ? "Lobby" : u.user.username} <button onClick={() => {
                    setChatState(u.idChat)
                }}>Select</button> </h3></div>
            })}
            {!chatState ? (<><ChatLobby /></>) : (<><ChatPrivate idChat={chatState} /></>)}
        </>
    )
}