import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEventsFriends from "./useEventsFriends.jsx";
import UseEventsPosts from "./useEventsPosts.jsx";

const userService = UserService()

export default function useListFriends() {
    const [friends, setFriends] = useState([])

    const getFriends = () => {
        userService.getFriends(null, res => {
            if (!res.error) {
                setFriends(res.friends)
            }
        })
    }

    const [] = UseEventsPosts({
        observer: getFriends,
        events: [
            "$/chat/private/send-post"
        ]
    })
    const [] = UseEventsFriends({
        observer: getFriends,
        events: [
            "$/friends/accept-invite",
            "$/friends/remove-friendship",
            "$/friends/connected",
            "$/friends/disconnected"
        ]
    })

    useEffect(() => {
        getFriends()
    }, [])

    return [friends]
}