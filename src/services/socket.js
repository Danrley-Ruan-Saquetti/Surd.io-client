import io from "socket.io-client"
import { AuthService } from "./auth.service.js"

export const socket = io("http://localhost:8000")
export const USER_AUTHENTICATE = { isAuthenticate: false }

const authService = AuthService()

socket.on("connect", () => {
    if (authService.isUserLogged()) {
        authService.reconnect()
    }
})

export const updateStateAuthenticate = (value) => {
    USER_AUTHENTICATE.isAuthenticate = value
}