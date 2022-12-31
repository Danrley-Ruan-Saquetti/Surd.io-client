import { useState } from "react"
import ChatPrivate from "./private"
import ChatServer from "./server"
import "./style.css"

export default function Chat() {
    const [isServer, setIsServer] = useState(true)

    const toggleChatServer = (value = true) => {
        setIsServer(value)
    }

    return (
        <>
            <div className="chat-content">
                <div className="aba-content chat-aba">
                    <div onClick={() => toggleChatServer(true)} className={"aba aba-lobby " + (isServer ? "active" : "")}>Server</div>
                    <div onClick={() => toggleChatServer(false)} className={"aba aba-friend " + (!isServer ? "active" : "")}>Friends</div>
                </div>

                {isServer ? <><ChatServer /></> : <ChatPrivate />}
            </div>
        </>
    )
}