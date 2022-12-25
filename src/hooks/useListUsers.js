import { useEffect, useState } from "react";
import UserService from "../services/user.service.js";
import { socket } from "../services/socket.js"

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

    useEffect(() => {
        socket.on("$/users/connected", (data) => {
            getUsers()
        })
        socket.on("$/users/disconnected", (data) => {
            getUsers()
        })
        socket.on("auth/login/reconnect/res", () => {
            setTimeout(getUsers, 0)
        })
        socket.on("auth/login/res", () => {
            setTimeout(getUsers, 0)
        })

        getUsers()

        return () => {
            socket.off("$/users/connected")
            socket.off("$/users/connected")
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
        }
    }, [])

    return [users]
}