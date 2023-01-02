import { useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEvents from "./useEvents.js"

const userService = UserService()

export default function useListInvitesDenied() {
    const [invites, setInvites] = useState([])

    const getInvites = () => {
        userService.getDenied(null, res => {
            if (!res.error) {
                setInvites(res.invites)
            }
        })
    }

    const [] = UseEvents({
        observer: getInvites,
        events: [
            { ev: "$/friends/denied-invite" },
            { ev: "$/friends/cancel-invite" },
            { ev: "$/friends/connected" },
            { ev: "$/friends/disconnected" },
        ],
        options: { $uniqueObserver: true }
    })

    return [invites]
}