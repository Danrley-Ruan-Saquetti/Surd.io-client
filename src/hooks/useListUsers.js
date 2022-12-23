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
            isLobby: props.isLobby
        })
    }

    useEffect(() => {
        socket.on("$/users/connected", (data) => {
            getUsers()
        })
        socket.on("$/users/disconnected", (data) => {
            getUsers()
        })

        getUsers()

        return () => {
            socket.off("$/users/connected")
            socket.off("$/users/disconnected")
        }
    }, [])

    return [users]
}