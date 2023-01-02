import { useEffect, useState } from "react"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import UseEvents from "../../../hooks/useEvents.js"
import { UserService } from "../../../services/user.service.js"
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

    const getTimeOfPost = ({ createAt = Date.now() }) => {
        const date = new Date(createAt)
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

        return <div className="post-time">{("00" + date.getHours()).slice(-2)}:{("00" + date.getMinutes()).slice(-2)}</div>
    }

    const [] = UseEvents({
        observer: scrollDown,
        events: [
            { ev: props.isServer ? "$/chat/send-post" : "$/chat/private/send-post" },
            { ev: "$/users/current/update/serverConnected" }
        ],
        options: { $uniqueObserver: true }
    })

    useEffect(scrollDown, [])

    return (
        <>
            <div className={"chat chat-" + (props.isServer ? "server" : "friend")}>
                <div id="list-posts-content" className="list-posts-content">
                    <div className="list-posts">
                        {props.posts.map(post => {
                            return <div key={post._id} className={"post " + (!post.info ? "user" + (post.user._id == user._id ? " this" : "") : "info")}>
                                {props.isServer && !post.info && post.user._id != user._id && (<>
                                    <p className="post-info"><span className="from level-content"><span className="level sm">{post.user.level}</span>{post.user.username}</span></p>
                                </>)}
                                <p className="post-body"><span className="body">{post.body}</span></p>
                                {!post.info && getTimeOfPost(post)}
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