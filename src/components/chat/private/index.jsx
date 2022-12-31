import { useState } from "react"
import useListFriends from "../../../hooks/useListFriends"
import SubChat from "./chat"
import Icon from "../../templates/icon"
import "./style.css"
import { useEffect } from "react"
import useCurrentUser from "../../../hooks/useCurrentUser"

export default function ChatPrivate() {
    const [user] = useCurrentUser()
    const [friends] = useListFriends()
    const [friendSelected, setFriendSelected] = useState(null)

    const toggleChat = (friend = null) => {
        setFriendSelected(friend)
    }

    useEffect(() => {
        friendSelected && friends.length != 0 && friends.map(friend => {
            if (friend._id != friendSelected._id) { return }
            friendSelected = friend
        })
    }, [])

    return (
        <>
            <div className="chat-friend-content">
                {!friendSelected ?
                    (<>
                        <div className="list-friends">
                            {friends.length != 0 && friends.map(friend => {
                                return <div key={friend._id} className="friend" onClick={() => toggleChat(friend)}>
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
                            idChat={friendSelected.idChat}
                        />
                    </>)
                }
            </div>
        </>
    )
}