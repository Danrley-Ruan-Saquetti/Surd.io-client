import { useEffect, useState } from "react";
import { socket } from "../services/socket.js"
import { UserService } from "../services/user.service.js"
import useAuthenticate from "./useAuthenticate.js";

const userService = UserService()

export default function useListPosts() {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPosts(data => {
            data.posts && setPosts(data.posts)
        })
    }

    const [] = useAuthenticate(getPosts)

    useEffect(() => {
        socket.on("$/chat/send-post", () => {
            getPosts()
        })
        socket.on("$/users/current/update", () => {
            getPosts()
        })
        socket.on("auth/login/reconnect/res", () => {
            getPosts()
        })

        getPosts()

        return () => {
            socket.off("$/chat/send-post")
            socket.off("$/users/current/update")
            socket.off("auth/login/reconnect/res")
        }
    }, [])

    return [posts]
}