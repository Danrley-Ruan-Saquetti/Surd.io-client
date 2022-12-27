import { useEffect, useState } from "react";
import UserService from "../services/user.service.js";
import { socket } from "../services/socket.js"
import useAuthenticate from "./useAuthenticate.js";

const userService = UserService()

export default function useListUsers(props = { isLobby: false }) {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        userService.getUsers({
            res: res => {
                if (!res.error) {
                    setUsers(res.users)
                }
            },
            ...props
        })
    }

    const [isAuthenticate] = useAuthenticate(getUsers)

    useEffect(() => {
        socket.on("$/users/connected", (data) => {
            getUsers()
        })
        socket.on("$/users/disconnected", (data) => {
            getUsers()
        })
        socket.on("$/friends/send-invite", (data) => {
            getUsers()
        })
        socket.on("$/friends/accept-invite", (data) => {
            getUsers()
        })
        socket.on("$/friends/denied-invite", (data) => {
            getUsers()
        })
        socket.on("$/friends/cancel-invite", (data) => {
            getUsers()
        })
        socket.on("$/friends/remove-friendship", (data) => {
            getUsers()
        })
        socket.on("$/users/current/update", (data) => {
            setTimeout(getUsers, 0)
        })
        socket.on("auth/login/reconnect/res", (data) => {
            setTimeout(getUsers, 0)
        })
        socket.on("auth/login/res", (data) => {
            setTimeout(getUsers, 0)
        })

        getUsers()

        return () => {
            socket.off("$/users/connected")
            socket.off("$/users/disconnected")
            socket.off("$/friends/send-invite")
            socket.off("$/friends/accept-invite")
            socket.off("$/friends/denied-invite")
            socket.off("$/friends/cancel-invite")
            socket.off("$/friends/remove-friendship")
            socket.off("$/users/current/update")
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
        }
    }, [])

    return [users]
}