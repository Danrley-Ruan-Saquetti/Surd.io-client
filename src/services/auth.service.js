import ControlLocalStorage from "../util/control-local-storage.js"
import { socket } from "./../services/socket.js"

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
    const createItem = ({ _id, authToken }) => {
        return controlLocalStorage.createItem(KEY, { _id, authToken })
    }

    const removeItem = (clear = false) => {
        return controlLocalStorage.removeItem(KEY, clear)
    }

    const updateItem = ({ _id, authToken }) => {
        return controlLocalStorage.updateItem(KEY, { _id, authToken })
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