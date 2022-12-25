import { useEffect, useState } from "react"
import { socket, USER_AUTHENTICATE } from "../services/socket.js"

export default function useAuthenticate() {
    const [authenticate, setAuthenticate] = useState(USER_AUTHENTICATE.isAuthenticate)

    useEffect(() => {
        socket.on("auth/login/reconnect/res", () => {
            setAuthenticate(true)
            console.log("Host connected");
        })

        socket.on("auth/login/res", () => {
            setAuthenticate(true)
            console.log("Host connected!");
        })

        socket.on("disconnect", () => {
            setAuthenticate(false)
            console.log("Host disconnected");
        })

        return () => {
            socket.off("auth/login/reconnect/res")
            socket.off("auth/login/res")
            socket.off("disconnect")
        }
    }, [])

    return [authenticate]
}