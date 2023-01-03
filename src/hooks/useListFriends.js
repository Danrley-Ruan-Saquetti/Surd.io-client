import { useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEvents from "./useEvents.js";

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

    const [] = UseEvents({
        observer: getFriends,
        events: [
            { ev: "$/chat/private/send-post" },
            { ev: "$/friends/accept-invite" },
            { ev: "$/friends/remove-friendship" },
            { ev: "$/friends/connected" },
            { ev: "$/friends/disconnected" },
            { ev: "$/friends/enter-server" },
            { ev: "$/friends/quit-server" },
        ],
        options: { $uniqueObserver: true }
    })

    return [friends]
}