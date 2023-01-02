import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEventsPendingOnHold from "./useEventsPendingOnHold.jsx";

const userService = UserService()

export default function useListPendingOnHold() {
    const [invites, setInvites] = useState([])

    const getInvites = () => {
        userService.getPendingOnHold(null, res => {
            if (!res.error) {
                setInvites(res.invites)
            }
        })
    }

    const [] = UseEventsPendingOnHold({
        observer: getInvites,
    })

    useEffect(() => {
        getInvites()
    }, [])

    return [invites]
}