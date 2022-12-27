import { useEffect, useState } from "react";
import { socket } from "../services/socket.js";
import UserService from "../services/user.service.js"
import useAuthenticate from "./useAuthenticate.js";

const userService = UserService()

export default function useListServers() {
    const [servers, setServers] = useState([])

    const getServers = async() => {
        userService.getServers(data => {
            data.servers && setServers(data.servers)
        })
    }

    const [isAuthenticate] = useAuthenticate(getServers)

    useEffect(() => {
        socket.on("auth/login/reconnect/res", () => {
            setTimeout(getServers, 0)
        })
        socket.on("auth/login/res", () => {
            setTimeout(getServers, 0)
        })
        socket.on("$/users/current/update", (data) => {
            setTimeout(getServers, 0)
        })
        socket.on("$/users/connected", (data) => {
            setTimeout(getServers, 0)
        })
        socket.on("$/users/disconnected", (data) => {
            setTimeout(getServers, 0)
        })

        getServers()

        return () => {
            socket.off("$/chat/send-post")
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
            socket.off("$/users/current/update")
            socket.off("$/users/connected")
            socket.off("$/users/disconnected")
        }
    }, [])

    return [servers]
}