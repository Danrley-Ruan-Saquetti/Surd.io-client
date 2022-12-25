import { useState } from "react"
import useListPosts from "../../../hooks/useListPosts.js"
import UserService from "../../../services/user.service.js"

const userService = UserService()

export default function Chat() {
    const [data, setPost] = useState({ body: "" })
    const [posts] = useListPosts()

    const handleData = ({ target }) => {
        setPost({ ...data, [target.name]: target.value })
    }

    return (
        <>
            <h2>Chat</h2>
            {posts.length != 0 && posts.map(post => {
                return <div key={post._id} className="posts">{post.body}</div>
            })}
            <textarea name="body" id="input-body" cols="30" rows="10" onChange={handleData}></textarea>
            <button onClick={(ev) => {
                ev.preventDefault()

                userService.sendPost(data)
            }}>Send</button>
        </>
    )
}