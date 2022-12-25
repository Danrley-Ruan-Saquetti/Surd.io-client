import { useEffect, useState } from "react";
import { socket } from "../services/socket.js"
import UserService from "../services/user.service.js"

const userService = UserService()

export default function useListPosts() {
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        userService.getPosts({
            res: data => {
                data.posts && setPosts(data.posts)
            }
        })
    }

    useEffect(() => {
        getPosts()

        socket.on("$/chat/send-post", (data) => {
            console.log(data);
            getPosts()
        })

        socket.on("auth/login/reconnect/res", () => {
            setTimeout(getPosts, 0)
        })

        socket.on("auth/login/res", () => {
            setTimeout(getPosts, 0)
        })

        return () => {
            socket.off("$/chat/send-post")
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
        }
    }, [])

    return [posts]
}