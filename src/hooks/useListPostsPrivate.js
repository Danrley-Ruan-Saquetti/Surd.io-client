import { useEffect, useState } from "react";
import { socket } from "../services/socket.js"
import UserService from "../services/user.service.js"
import useAuthenticate from "./useAuthenticate.js";

const userService = UserService()

export default function useListPostsPrivate(props = { idChat }) {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPostsPrivate(props, data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [isAuthenticate] = useAuthenticate(getPosts)

    useEffect(() => {
        getPosts()

        socket.on("$/chat/private/send-post", (data) => {
            getPosts()
        })

        return () => {
            socket.off("$/chat/send-post")
        }
    }, [])

    return [posts]
}