import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEventsCurrentUser from "./useEventsCurrentUser.jsx";
import UseEventsFriends from "./useEventsFriends.jsx";
import UseEventsUsers from "./useEventsUsers.jsx";

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

    const [] = UseEventsUsers({
        observer: getUsers,
    })
    const [] = UseEventsCurrentUser({
        observer: getUsers,
    })
    const [] = UseEventsFriends({
        observer: getUsers,
        events: [
            "$/friends/send-invite",
            "$/friends/denied-invite",
            "$/friends/accept-invite",
            "$/friends/remove-friendship",
        ]
    })

    useEffect(() => {
        setTimeout(getUsers, 1)
    }, [])

    return [users]
}