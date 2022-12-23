import AuthService from "./auth.service.js"
import socket from "./socket.js"

export default function UserService() {
    const authService = AuthService()

    const getUsers = (res) => {
        socket.emit("users", authService.getToken())

        socket.on("users/res", (data) => {
            res(data)
        })
    }

    return {
        getUsers
    }
}