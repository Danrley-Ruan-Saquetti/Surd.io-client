import { useEffect, useState } from "react";
import { socket } from "../services/socket.js"
import UserService from "../services/user.service.js"
import useAuthenticate from "./useAuthenticate.js";

const userService = UserService()

export default function useListPosts() {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPosts(data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [isAuthenticate] = useAuthenticate(getPosts)

    useEffect(() => {
        socket.on("$/chat/send-post", (data) => {
            getPosts()
        })
        socket.on("auth/login/reconnect/res", () => {
            setTimeout(getPosts, 0)
        })
        socket.on("auth/login/res", () => {
            setTimeout(getPosts, 0)
        })
        socket.on("$/users/connected", (data) => {
            setTimeout(getPosts, 0)
        })
        socket.on("$/users/current/update", (data) => {
            setTimeout(getPosts, 0)
        })

        getPosts()

        return () => {
            socket.off("$/chat/send-post")
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
            socket.off("$/users/connected")
            socket.off("$/users/current/update")
        }
    }, [])

    return [posts]
}