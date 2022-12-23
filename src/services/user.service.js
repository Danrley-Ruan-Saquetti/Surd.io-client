import AuthService from "./auth.service.js"
import { socket } from "./socket.js"

export default function UserService() {
    const authService = AuthService()

    const getUsers = ({ res, isLobby }) => {
        socket.emit(!isLobby ? "users" : "users/connected", authService.getToken())

        socket.on("users/res", (data) => {
            res(data)
        })

        socket.on("users/connected/res", (data) => {
            res(data)
        })
    }

    const getPosts = ({ res }) => {
        socket.emit("chat", authService.getToken())

        socket.on("chat/res", (data) => {
            res(data)
        })
    }

    return {
        getUsers,
        getPosts
    }
}