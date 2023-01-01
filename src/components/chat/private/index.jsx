import { useState } from "react"
import useListFriends from "../../../hooks/useListFriends"
import useCurrentUser from "../../../hooks/useCurrentUser"
import Icon from "../../templates/icon"
import SubChat from "./chat"
import "./style.css"

export default function ChatPrivate() {
    const [user] = useCurrentUser()
    const [friends] = useListFriends()
    const [idChatSelected, setIdChatSelected] = useState(null)

    const toggleChat = (idChat = null) => {
        setIdChatSelected(idChat)
    }

    const findFriendByIdChat = ({ idChat }) => {
        if (!idChat) { return null }

        const friend = friends.find(friend => friend.idChat == idChat)

        return friend
    }

    const friendSelected = findFriendByIdChat({ idChat: idChatSelected })

    return (
        <>
            <div className="chat-friend-content">
                {!friendSelected ?
                    (<>
                        <div className="list-friends">
                            {friends.length != 0 && friends.map(friend => {
                                return <div key={friend._id} className="friend" onClick={() => toggleChat(friend.idChat)}>
                                    <div className="friend-identification">
                                        <span className="friend-username">{friend.user.username}</span>
                                        <span className="friend-status">{friend.user.online ? "Online" : "Offline"}</span>
                                    </div>
                                    <span className="friend-last-post">{friend.lastPost && (<>{friend.lastPost.user == user._id ? "you" : "he"}: {friend.lastPost.body}</>)}</span>
                                </div>
                            })}
                        </div>
                    </>) : (<>
                        <div className="friend-header">
                            <Icon
                                className="close-chat-private"
                                name="arrow_back"
                                onclick={() => toggleChat(null)}
                            />
                            <span className="friend-username">{friendSelected.user.username}</span>
                            <span className="friend-status">{friendSelected.user.online ? "Online" : "Offline"}</span>
                        </div>
                        <SubChat
                            idChat={idChatSelected}
                        />
                    </>)
                }
            </div>
        </>
    )
}