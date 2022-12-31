import useListFriends from "../../../hooks/useListFriends"
import { useState } from "react"
import "./style.css"
import SubChat from "./chat"

export default function ChatPrivate() {
    const [friends] = useListFriends()
    const [idChat, setIdChat] = useState(null)

    const toggleChat = (_id) => {
        setIdChat(_id)
    }

    return (
        <>
            <div className="chat-friend-content">
                {!idChat ?
                    (<>
                        <div className="list-friends">
                            {friends.length != 0 && friends.map(friend => {
                                return <div key={friend._id} className="friend" onClick={() => toggleChat(friend.idChat)}>
                                    <span className="friend-username">{friend.user.username}</span>
                                    <span className="friend-status">{friend.user.online ? "Online" : "Offline"}</span>
                                    <span className="friend-last-post">{friend.lastPost.body}</span>
                                </div>
                            })}
                        </div>
                    </>) : (<>
                        <SubChat
                            idChat={idChat}
                        />
                    </>)
                }
            </div>
        </>
    )
}