import { useState } from "react";
import { UserService } from "../services/user.service.js"
import UseEvents from "./useEvents.js";

const userService = UserService()

export default function useListPosts() {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPosts(data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [] = UseEvents({
        observer: getPosts,
        events: [
            { ev: "$/chat/send-post" },
            { ev: "$/users/current/update/serverConnected" }
        ],
        options: { $uniqueObserver: true }
    })

    return [posts]
}