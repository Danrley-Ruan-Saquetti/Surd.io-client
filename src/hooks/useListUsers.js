import { useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEvents from "./useEvents.js"

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

    const [] = UseEvents({
        observer: getUsers,
        events: [
            { ev: "$/users/connected" },
            { ev: "$/users/disconnected" },
            { ev: "$/users/current/update" },
            { ev: "$/users/current/update/serverConnected" },
            { ev: "$/friends/send-invite" },
            { ev: "$/friends/denied-invite" },
            { ev: "$/friends/accept-invite" },
            { ev: "$/friends/cancel-invite" },
            { ev: "$/friends/remove-friendship" },
        ],
        options: { $uniqueObserver: true }
    })

    return [users]
}