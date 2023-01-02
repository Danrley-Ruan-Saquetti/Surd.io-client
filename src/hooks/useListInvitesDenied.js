import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js";
import UseEventsInvitesDenied from "./useEventsInvitesDenied.jsx";

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

    const [] = UseEventsInvitesDenied({
        observer: getInvites,
    })

    useEffect(() => {
        getInvites()
    }, [])

    return [invites]
}