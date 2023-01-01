import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js"
import UseEventsUsers from "./useEventsUsers.jsx";

const userService = UserService()

export default function useListServers() {
    const [servers, setServers] = useState([])

    const getServers = async() => {
        userService.getServers(data => {
            data.servers && setServers(data.servers)
        })
    }

    const [] = UseEventsUsers({
        observer: getServers,
        events: [
            "$/users/connected",
            "$/users/disconnected",
            "$/users/current/update",
            "$/users/current/update/serverConnected"
        ]
    })

    useEffect(() => {
        getServers()
    }, [])

    return [servers]
}