import ControlLocalStorage from "../util/ControlLocalStorage.js"
import socket from "./../service/socket.js"

const controlLocalStorage = ControlLocalStorage()
const KEY = "user"

export default function AuthService() {
    // Auth
    const register = (req, res = () => {}) => {
        socket.emit("auth/register", req)

        socket.on("auth/register/res", (data) => {
            if (data.success) {
                createItem(data.user)
            }
            res(data)
        })
    }

    const login = (req, res = () => {}) => {
        socket.emit("auth/login", req)

        socket.on("auth/login/res", (data) => {
            if (data.success) {
                createItem(data.user)
            }
            res(data)
        })
    }

    const logout = (res = () => {}) => {
        const { user } = getCurrentUser()

        socket.emit("auth/logout", user)

        socket.on("auth/logout/res", (data) => {
            if (data.success) {
                removeItem()
            }
            res(data)
        })
    }

    // Storage
    const createItem = (value) => {
        return controlLocalStorage.createItem(KEY, value)
    }

    const removeItem = () => {
        return controlLocalStorage.removeItem(KEY)
    }

    const updateItem = (value) => {
        return controlLocalStorage.updateItem(KEY, value)
    }

    const getCurrentUser = () => {
        const user = controlLocalStorage.getItem(KEY)

        return { user, valueOf: user != null }
    }

    const isUserLogged = () => {
        return getCurrentUser().valueOf
    }

    return {
        login,
        register,
        logout,
        createItem,
        removeItem,
        updateItem,
        getCurrentUser,
        isUserLogged,
    }
}