import { AuthService } from "./auth.service.js"
import { socket } from "./socket.js"

export function UserService() {
    const authService = AuthService()

    // User
    const getUsers = ({ res, isLobby }) => {
        socket.emit(!isLobby ? "users" : "users/connected", authService.getToken())

        socket.on("users/res", (data) => {
            res(data)
            socket.off("users/res")
        })

        socket.on("users/connected/res", (data) => {
            res(data)
            socket.off("users/connected/res")
        })
    }

    const verifyIsPlaying = (res = () => {}) => {
        socket.emit("users/verify-is-playing", authService.getToken())

        socket.on("users/verify-is-playing/res", (data) => {
            res(data)
            socket.off("users/verify-is-playing/res")
        })
    }

    // Chat
    const getPosts = (res) => {
        socket.emit("chat", {...authService.getToken() })

        socket.on("chat/res", (data) => {
            res(data)
            socket.off("chat/res")
        })
    }

    const getPostsPrivate = (req, res) => {
        socket.emit("chat/private", {...authService.getToken(), ...req })

        socket.on("chat/private/res", (data) => {
            res(data)
            socket.off("chat/private/res")
        })
    }

    const sendPost = (req, res = (r) => {}) => {
        socket.emit("chat/send-post", {...authService.getToken(), ...req })

        socket.on("chat/send-post/res", (data) => {
            res(data)
            socket.off("chat/send-post/res")
        })
    }

    const sendPostPrivate = (req, res = (r) => {}) => {
        socket.emit("chat/private/send-post", {...authService.getToken(), ...req })

        socket.on("chat/private/send-post/res", (data) => {
            res(data)
            socket.off("chat/private/send-post/res")
        })
    }

    // Friend
    const getFriends = (req, res = (r) => {}) => {
        socket.emit("friends", {...authService.getToken() })

        socket.on("friends/res", (data) => {
            res(data)
            socket.off("friends/res")
        })
    }

    const getDenied = (req, res = (r) => {}) => {
        socket.emit("friends/denied", {...authService.getToken() })

        socket.on("friends/denied/res", (data) => {
            res(data)
            socket.off("friends/denied/res")
        })
    }

    const getPendingAwaiting = (req, res = (r) => {}) => {
        socket.emit("friends/pending/awaiting", {...authService.getToken() })

        socket.on("friends/pending/awaiting/res", (data) => {
            res(data)
            socket.off("friends/pending/awaiting/res")
        })
    }

    const getPendingOnHold = (req, res = (r) => {}) => {
        socket.emit("friends/pending/on-hold", {...authService.getToken() })

        socket.on("friends/pending/on-hold/res", (data) => {
            res(data)
            socket.off("friends/pending/on-hold/res")
        })
    }

    const sendInvite = (req, res = (r) => {}) => {
        socket.emit("friends/send-invite", {...authService.getToken(), ...req })

        socket.on("friends/send-invite/res", (data) => {
            res(data)
            socket.off("friends/send-invite/res")
        })
    }

    const acceptInvite = (req, res = (r) => {}) => {
        socket.emit("friends/accept-invite", {...authService.getToken(), ...req })

        socket.on("friends/accept-invite/res", (data) => {
            res(data)
            socket.off("friends/accept-invite/res")
        })
    }

    const deniedInvite = (req, res = (r) => {}) => {
        socket.emit("friends/denied-invite", {...authService.getToken(), ...req })

        socket.on("friends/denied-invite/res", (data) => {
            res(data)
            socket.off("friends/denied-invite/res")
        })
    }

    const cancelInvite = (req, res = (r) => {}) => {
        socket.emit("friends/cancel-invite", {...authService.getToken(), ...req })

        socket.on("friends/cancel-invite/res", (data) => {
            res(data)
            socket.off("friends/cancel-invite/res")
        })
    }

    const removeFriendship = (req, res = (r) => {}) => {
        socket.emit("friends/remove-friendship", {...authService.getToken(), ...req })

        socket.on("friends/remove-friendship/res", (data) => {
            res(data)
            socket.off("friends/remove-friendship/res")
        })
    }

    // Server
    const getServers = (res = (r) => {}) => {
        socket.emit("servers", {...authService.getToken() })

        socket.on("servers/res", (data) => {
            res(data)
            socket.off("servers/res")
        })
    }

    // Game
    const startGame = (req, res = () => {}) => {
        socket.emit("games/start", {...authService.getToken(), ...req })

        socket.on("games/start/res", (data) => {
            res(data)
            socket.off("games/start/res")
        })
    }

    const quitGame = (req, res = () => {}) => {
        socket.emit("games/quit", {...authService.getToken(), ...req })

        socket.on("games/quit/res", (data) => {
            res(data)
            socket.off("games/quit/res")
        })
    }

    const getData = (res = () => {}) => {
        socket.emit("games/data", {...authService.getToken() })

        socket.on("games/data/res", (data) => {
            res(data)
            socket.off("games/data/res")
        })
    }

    return {
        getUsers,
        verifyIsPlaying,
        getPosts,
        getPostsPrivate,
        sendPost,
        sendPostPrivate,
        getFriends,
        getDenied,
        getPendingAwaiting,
        getPendingOnHold,
        sendInvite,
        acceptInvite,
        deniedInvite,
        cancelInvite,
        removeFriendship,
        getServers,
        startGame,
        quitGame,
        getData
    }
}