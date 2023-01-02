import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEventsPendingAwaiting from "./useEventsPendingAwaiting.jsx";

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

    const [] = UseEventsPendingAwaiting({
        observer: getInvites,
    })

    useEffect(() => {
        getInvites()
    }, [])

    return [invites]
}