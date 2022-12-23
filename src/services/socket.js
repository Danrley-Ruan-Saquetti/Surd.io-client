import io from "socket.io-client"
import AuthService from "./auth.service.js"

const socket = io("http://localhost:8000")

const authService = AuthService()

socket.on("connect", () => {
    if (authService.isUserLogged()) {
        authService.reconnect()
    }
})

socket.on("disconnect", () => {
    console.log({ error: { msg: "Host disconnected", system: true } });
})

export default socket