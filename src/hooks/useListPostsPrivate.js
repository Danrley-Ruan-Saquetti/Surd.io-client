import { useState } from "react";
import { UserService } from "../services/user.service.js"
import UseEvents from "./useEvents.js"

const userService = UserService()

export default function useListPostsPrivate(props = { idChat }) {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPostsPrivate(props, data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [] = UseEvents({
        observer: getPosts,
        events: [
            { ev: "$/chat/private/send-post" },
        ],
        options: { $uniqueObserver: true }
    })

    return [posts]
}