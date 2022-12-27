import { useState } from "react"
import useListPostsPrivate from "../../../../hooks/useListPostsPrivate.js"
import UserService from "../../../../services/user.service.js"

const userService = UserService()

export default function ChatPrivate(props = { idChat: null }) {
    const [data, setPost] = useState({ body: "" })
    const [posts] = useListPostsPrivate(props)

    const handleData = ({ target }) => {
        setPost({ ...data, [target.name]: target.value })
    }

    return (
        <>
            {posts.length != 0 && posts.map(post => {
                return <div key={post._id} className="posts">{!post.info ? post.user.username : "[Server]"} {post.body}</div>
            })}
            <textarea name="body" id="input-body" cols="30" rows="10" onChange={handleData}></textarea>
            <button onClick={(ev) => {
                ev.preventDefault()

                userService.sendPostPrivate({ ...data, ...props })
            }}>Send</button>
        </>
    )
}