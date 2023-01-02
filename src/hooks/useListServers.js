import { useState } from "react";
import { UserService } from "../services/user.service.js"
import UseEvents from "./useEvents.js"

const userService = UserService()

export default function useListServers() {
    const [servers, setServers] = useState([])

    const getServers = async() => {
        userService.getServers(data => {
            data.servers && setServers(data.servers)
        })
    }

    const [] = UseEvents({
        observer: getServers,
        events: [
            { ev: "$/users/connected" },
            { ev: "$/users/disconnected" },
            { ev: "$/users/current/update" },
            { ev: "$/users/current/update/serverConnected" },
        ],
        options: { $uniqueObserver: true }
    })

    return [servers]
}