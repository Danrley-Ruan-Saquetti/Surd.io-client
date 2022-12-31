import { useEffect, useState } from "react";
import { UserService } from "../services/user.service.js";
import { socket } from "../services/socket.js"
import useAuthenticate from "./useAuthenticate.js";

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

    const [] = useAuthenticate(getFriends)

    useEffect(() => {
        getFriends()

        socket.on("$/friends/accept-invite", () => {
            getFriends()
        })
        socket.on("$/friends/remove-friendship", () => {
            getFriends()
        })
        socket.on("$/friends/connected", () => {
            getFriends()
        })
        socket.on("$/friends/disconnected", () => {
            getFriends()
        })
        socket.on("auth/login/reconnect/res", () => {
            getFriends()
        })

        return () => {
            socket.off("$/friends/accept-invite")
            socket.off("$/friends/remove-friendship")
            socket.off("$/friends/connected")
            socket.off("$/friends/disconnected")
            socket.off("auth/login/reconnect/res")
        }
    }, [])

    return [friends]
}