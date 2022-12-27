import AuthService from "./auth.service.js"
import { socket } from "./socket.js"

export default function UserService() {
    const authService = AuthService()

    // User
    const getUsers = ({ res, isLobby }) => {
        socket.emit(!isLobby ? "users" : "users/connected", authService.getToken())

        socket.on("users/res", (data) => {
            res(data)
        })

        socket.on("users/connected/res", (data) => {
            res(data)
        })
    }

    // Chat
    const getPosts = (res) => {
        socket.emit("chat", {...authService.getToken() })

        socket.on("chat/res", (data) => {
            res(data)
        })
    }

    const getPostsPrivate = (req, res) => {
        socket.emit("chat/private", {...authService.getToken(), ...req })

        socket.on("chat/private/res", (data) => {
            res(data)
        })
    }

    const sendPost = (req, res = (r) => {}) => {
        socket.emit("chat/send-post", {...authService.getToken(), ...req })

        socket.on("chat/send-post/res", (data) => {
            res(data)
        })
    }

    const sendPostPrivate = (req, res = (r) => {}) => {
        socket.emit("chat/private/send-post", {...authService.getToken(), ...req })

        socket.on("chat/private/send-post/res", (data) => {
            res(data)
        })
    }

    // Friend
    const getFriends = (req, res = (r) => {}) => {
        socket.emit("friends", {...authService.getToken() })

        socket.on("friends/res", (data) => {
            res(data)
        })
    }

    const sendInvite = (req, res = (r) => {}) => {
        socket.emit("friends/send-invite", {...authService.getToken(), ...req })

        socket.on("friends/send-invite/res", (data) => {
            res(data)
        })
    }

    const acceptInvite = (req, res = (r) => {}) => {
        socket.emit("friends/accept-invite", {...authService.getToken(), ...req })

        socket.on("friends/accept-invite/res", (data) => {
            res(data)
        })
    }

    const deniedInvite = (req, res = (r) => {}) => {
        socket.emit("friends/denied-invite", {...authService.getToken(), ...req })

        socket.on("friends/denied-invite/res", (data) => {
            res(data)
        })
    }

    const cancelInvite = (req, res = (r) => {}) => {
        socket.emit("friends/cancel-invite", {...authService.getToken(), ...req })

        socket.on("friends/cancel-invite/res", (data) => {
            res(data)
        })
    }

    const removeFriendship = (req, res = (r) => {}) => {
        socket.emit("friends/remove-friendship", {...authService.getToken(), ...req })

        socket.on("friends/remove-friendship/res", (data) => {
            res(data)
        })
    }

    // Server
    const getServers = (res = (r) => {}) => {
        socket.emit("servers", {...authService.getToken() })

        socket.on("servers/res", (data) => {
            res(data)
        })
    }

    // Game
    const startGame = (req, res = () => {}) => {
        socket.emit("games/start", {...authService.getToken(), ...req })

        socket.on("games/start/res", (data) => {
            res(data)
        })
    }

    const quitGame = (req, res = () => {}) => {
        socket.emit("games/quit", {...authService.getToken(), ...req })

        socket.on("games/quit/res", (data) => {
            res(data)
        })
    }

    return {
        getUsers,
        getPosts,
        getPostsPrivate,
        sendPost,
        sendPostPrivate,
        getFriends,
        sendInvite,
        acceptInvite,
        deniedInvite,
        cancelInvite,
        removeFriendship,
        getServers,
        startGame,
        quitGame
    }
}