import { useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEvents from "./useEvents.js"

const userService = UserService()

export default function useListPendingAwaiting() {
    const [invites, setInvites] = useState([])

    const getInvites = () => {
        userService.getPendingAwaiting(null, res => {
            if (!res.error) {
                setInvites(res.invites)
            }
        })
    }

    const [] = UseEvents({
        observer: getInvites,
        events: [
            { ev: "$/friends/send-invite" },
            { ev: "$/friends/denied-invite" },
            { ev: "$/friends/accept-invite" },
            { ev: "$/friends/cancel-invite" },
            { ev: "$/friends/connected" },
            { ev: "$/friends/disconnected" },
        ],
        options: { $uniqueObserver: true }
    })

    return [invites]
}