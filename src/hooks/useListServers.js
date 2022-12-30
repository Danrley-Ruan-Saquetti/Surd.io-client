import { useEffect, useState } from "react";
import { socket } from "../services/socket.js";
import UserService from "../services/user.service.js"
import useAuthenticate from "./useAuthenticate.js";

const userService = UserService()

export default function useListServers() {
    const [servers, setServers] = useState([])

    const getServers = async() => {
        userService.getServers(data => {
            data.servers && setServers(data.servers)
        })
    }

    const [] = useAuthenticate(getServers)

    useEffect(() => {
        socket.on("$/users/connected", () => {
            getServers()
        })
        socket.on("$/users/disconnected", () => {
            getServers()
        })

        getServers()

        return () => {
            socket.off("$/users/connected")
            socket.off("$/users/disconnected")
        }
    }, [])

    return [servers]
}