import ControlLocalStorage from "../util/ControlLocalStorage.js"
import { socket } from "./../services/socket.js"

const controlLocalStorage = ControlLocalStorage()
const KEY = "user"

export const currentUser = {
    user: {
        username: "Guest",
        serverConnected: { _id: null, name: "Server" },
        _id: null,
        level: 1,
        xp: 0,
        xpUpLevel: 0,
        isPlaying: false
    }
}

export function AuthService() {

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

    const reconnect = (res = () => {}) => {
        socket.emit("auth/login/reconnect", {...getToken(), _id: getCurrentUser().user._id })

        socket.on("auth/login/reconnect/res", (data) => {
            if (data.success) {
                updateItem(data.user)
            }
            if (data.error) {
                console.log(data);
                removeItem()
            }

            res(data)
        })
    }

    const logout = (res = () => {}) => {
        socket.emit("auth/logout", getToken())

        socket.on("auth/logout/res", (data) => {
            if (data.success) {
                removeItem()
            }
            res(data)
        })
    }

    // Storage
    const createItem = (value) => {
        currentUser.user = value
        return controlLocalStorage.createItem(KEY, { _id: value._id, authToken: value.authToken })
    }

    const removeItem = (clear = false) => {
        return controlLocalStorage.removeItem(KEY, clear)
    }

    const updateItem = (value) => {
        currentUser.user = value
        return controlLocalStorage.updateItem(KEY, { _id: value._id, authToken: value.authToken })
    }

    const getCurrentUser = () => {
        const user = controlLocalStorage.getItem(KEY)

        return { user, valueOf: user != null }
    }

    const getToken = () => {
        const responseUser = getCurrentUser()


        if (!responseUser.valueOf) { return { authToken: null } }

        const { user } = responseUser

        const authToken = `Bearer ${user.authToken}`

        return { authToken }
    }

    const isUserLogged = () => {
        return getCurrentUser().valueOf
    }

    return {
        register,
        login,
        reconnect,
        logout,
        createItem,
        removeItem,
        updateItem,
        getCurrentUser,
        isUserLogged,
        getToken,
    }
}