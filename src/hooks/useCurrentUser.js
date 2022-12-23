import { useEffect } from "react"
import { AuthService } from "../services/auth.service.js"
import socket from "../services/socket.js"
import useLocalStorage from "./useLocalStorage.js"

const authService = AuthService()

export default function useCurrentUser() {
    const [user, setUser] = useLocalStorage("user", authService.getCurrentUser().user)

    useEffect(() => {
        socket.on("user/select/res", (data) => {
            setUser(data.user)
        })

        return () => {
            socket.off("user/select/res")
        }
    }, [])

    return [user]
}