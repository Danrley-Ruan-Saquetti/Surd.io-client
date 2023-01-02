import { useEffect } from "react"
import { useState } from "react"
import useAuthenticate from "../../../hooks/useAuthenticate"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import { socket } from "../../../services/socket"
import { UserService } from "../../../services/user.service"
import "./style.css"

const userService = UserService()

export default function Chat(props = { isServer: true, idChat: null, posts: [{ body, info, user: { username, level, _id }, _id }] }) {
    const [user] = useCurrentUser()
    const [data, setData] = useState({ body: "" })

    const handleData = ({ target }) => {
        setData({ ...data, [target.name]: target.value })
    }

    const sendPost = () => {
        userService[props.isServer ? "sendPost" : "sendPostPrivate"]({ ...data, ...props })
        setData({ body: "" })
    }

    const scrollDown = () => {
        const tag = document.getElementById("list-posts-content")
        if (!tag) { return }

        tag.scrollTop = tag.scrollHeight
    }

    const [] = useAuthenticate(scrollDown)

    useEffect(() => {
        if (props.isServer) {
            socket.on("$/chat/send-post", () => {
                setTimeout(scrollDown, 200)
            })
        } else {
            socket.on("$/chat/private/send-post", () => {
                setTimeout(scrollDown, 200)
            })
        }
        socket.on("$/users/current/update", () => {
            setTimeout(scrollDown, 200)
        })
        socket.on("auth/login/reconnect/res", () => {
            setTimeout(scrollDown, 200)
        })

        setTimeout(scrollDown, 500)
        setTimeout(scrollDown, 1000)

        return () => {
            if (props.isServer) {
                socket.off("$/chat/send-post")

            } else {
                socket.off("$/chat/private/send-post")

            }
            socket.off("$/users/current/update")
            socket.off("auth/login/reconnect/res")
        }
    }, [])

    return (
        <>
            <div className={"chat chat-" + (props.isServer ? "server" : "friend")}>
                <div id="list-posts-content" className="list-posts-content">
                    <div className="list-posts">
                        {props.posts.map(post => {
                            return <div key={post._id} className={"post " + (!post.info ? " user " : "") + (!post.info ? post.user._id == user._id ? "this" : "other" : "info")}>
                                <p className="post-info">{props.isServer && !post.info && post.user._id != user._id && (<><span className="from level-content"><span className="level sm">{post.user.level}</span>{post.user.username}</span></>)}</p>
                                <p className="post-body"><span className="body">{post.body}</span></p>
                                <p className="post-time">{!post.info && (function () {
                                    const date = new Date(post.createAt)
                                    const now = new Date(Date.now())

                                    if (now.getFullYear() - date.getFullYear() > 0) {
                                        return `${now.getFullYear() - date.getFullYear()} years ago`
                                    }
                                    if (now.getMonth() - date.getMonth() > 0) {
                                        return `${now.getMonth() - date.getMonth()} months ago`
                                    }
                                    if (now.getDate() - date.getDate() > 0) {
                                        return `${now.getDate() - date.getDate()} days ago`
                                    }

                                    return `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}`
                                }())}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="fill-send-post">
                    <textarea name="body" className="input-body" cols="30" rows="1" onChange={handleData} value={data.body} required="required"></textarea>
                    <button className="bt-send-post" onClick={() => sendPost()}>Send</button>
                </div>
            </div>
        </>
    )
}

// import { useState } from "react"
// import useCurrentUser from "../../../hooks/useCurrentUser.js"
// import useListFriends from "../../../hooks/useListFriends.js"
// import ChatLobby from "./lobby/index.jsx"
// import ChatPrivate from "./private/index.jsx"

// export default function Chat() {
//     const [currentUser] = useCurrentUser()
//     const [friends] = useListFriends()
//     const [chatState, setChatState] = useState(null)

//     return (
//         <>
//             {[...friends, { idChat: null }].map((u, i) => {
//                 return <div key={u.idChat || i}><h3>{!u.idChat ? currentUser.serverConnected.name : `${u.user.username} - ${u.user.online ? `Online` : `Offline`}`} <button onClick={() => {
//                     setChatState(u.idChat)
//                 }}>Select</button> </h3></div>
//             })}
//             {!chatState ? (<><ChatLobby /></>) : (<><ChatPrivate idChat={chatState} /></>)}
//         </>
//     )
// }