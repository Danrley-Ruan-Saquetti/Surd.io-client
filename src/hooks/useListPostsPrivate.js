import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js"
import UseEventsPosts from "./useEventsPosts.jsx";

const userService = UserService()

export default function useListPostsPrivate(props = { idChat }) {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPostsPrivate(props, data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [] = UseEventsPosts({
        observer: getPosts,
        events: [
            "$/chat/private/send-post"
        ]
    })

    useEffect(() => {
        getPosts()
    }, [])

    return [posts]
}