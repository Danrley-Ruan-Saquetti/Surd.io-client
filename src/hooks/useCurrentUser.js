import { useEffect, useState } from "react"
import { AuthService, currentUser } from "../services/auth.service.js"
import { socket } from "../services/socket.js"
import useAuthenticate from "./useAuthenticate.js"
import useLocalStorage from "./useLocalStorage.js"

const authService = AuthService()

export default function useCurrentUser() {
    const [, setCurrentUser] = useLocalStorage("user", authService.getCurrentUser().user)
    const [user, setUser] = useState(currentUser.user)
    const [] = useAuthenticate()

    const updateCurrentUser = (u) => {
        setUser(u)
        setCurrentUser(u)
        currentUser.user = u
    }

    useEffect(() => {
        socket.on("user/select/res", (data) => {
            updateCurrentUser(data.user)
        })
        socket.on("auth/login/reconnect/res", (data) => {
            updateCurrentUser(data.user)
        })
        socket.on("auth/login/res", (data) => {
            updateCurrentUser(data.user)
        })
        socket.on("$/users/current/update", (data) => {
            updateCurrentUser(data.user)
        })

        return () => {
            socket.off("auth/login/res")
            socket.off("auth/login/reconnect/res")
            socket.off("user/select/res")
            socket.off("$/users/current/update")
        }
    }, [])

    return [user]
}