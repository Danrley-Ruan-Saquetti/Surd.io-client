import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js"
import UseEventsPosts from "./useEventsPosts.jsx";
import UseEventsUsers from "./useEventsUsers.jsx";

const userService = UserService()

export default function useListPosts() {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPosts(data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [] = UseEventsUsers({
        observer: getPosts,
        events: [
            "$/users/current/update/serverConnected"
        ]
    })
    const [] = UseEventsPosts({
        observer: getPosts,
        events: [
            "$/chat/send-post"
        ]
    })

    useEffect(() => {
        getPosts()
    }, [])

    return [posts]
}