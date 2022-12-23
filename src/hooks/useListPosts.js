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
            getPosts()
        })

        return () => {
            socket.off("$/chat/send-post")
        }
    }, [])

    return [posts]
}