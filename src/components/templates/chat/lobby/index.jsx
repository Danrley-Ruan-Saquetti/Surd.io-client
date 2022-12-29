import { useState } from "react"
import useListPosts from "../../../../hooks/useListPosts.js"
import UserService from "../../../../services/user.service.js"

const userService = UserService()

export default function ChatLobby() {
    const [posts] = useListPosts([])
    const [data, setPost] = useState({ body: "" })

    const handleData = ({ target }) => {
        setPost({ ...data, [target.name]: target.value })
    }

    return (
        <>
            {posts.length != 0 && posts.map(post => {
                return <div key={post._id} className="posts">{!post.info ? `${post.user.username}:` : "[Server]:"} {post.body}</div>
            })}
            <br />
            <textarea name="body" id="input-body" cols="30" rows="2" onChange={handleData}></textarea>
            <button onClick={(ev) => {
                ev.preventDefault()

                userService.sendPost({ ...data })
            }}>Send</button>
        </>
    )
}