import { useEffect, useState } from "react"
import { socket, USER_AUTHENTICATE, updateStateAuthenticate } from "../services/socket.js"

export default function useAuthenticate(observer = () => {}) {
    const [authenticate, setAuthenticate] = useState(USER_AUTHENTICATE.isAuthenticate)

    const updateState = (value) => {
        updateStateAuthenticate(value)
        setAuthenticate(USER_AUTHENTICATE.isAuthenticate)
        value && setTimeout(observer, 500)
    }

    useEffect(() => {
        observer()

        socket.on("auth/login/reconnect/res", (data) => {
            updateState(!data.error)
        })

        socket.on("auth/login/res", (data) => {
            updateState(!data.error)
        })

        socket.on("disconnect", () => {
            updateState(false)
        })

        return () => {
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
            socket.off("disconnect")
        }
    }, [])

    return [authenticate]
}