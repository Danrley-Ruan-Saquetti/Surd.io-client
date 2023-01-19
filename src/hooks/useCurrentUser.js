import { useState } from "react"
import { AuthService, currentUser } from "../services/auth.service.js"
import UseEvents from "./useEvents.js"
import useLocalStorage from "./useLocalStorage.js"

const authService = AuthService()

export default function useCurrentUser() {
    const [, setCurrentUser] = useLocalStorage("user", authService.getCurrentUser().user)
    const [user, setUser] = useState(currentUser.user)
    const [isPlaying, setIsPlaying] = useState(currentUser.user.isPlaying)

    const updateCurrentUser = (data) => {
        if (!data || !data.user) { return }

        setUser(data.user)
        setCurrentUser(data.user)
        currentUser.user = data.user
    }

    const updateIsPlaying = (value) => {
        setIsPlaying(value)
        currentUser.user.isPlaying = value
    }

    const [isAuthenticate] = UseEvents({
        observer: updateCurrentUser,
        events: [
            { ev: "$/users/current/update" },
            { ev: "$/users/current/update/serverConnected" },
        ],
        options: { $uniqueObserver: true }
    })

    const [] = UseEvents({
        observer: (res) => updateIsPlaying(!(!res.success)),
        events: [
            { ev: "games/start/res" },
            { ev: "games/quit/res" },
        ],
        options: {
            $uniqueObserver: true,
            $alreadyExecuteObserver: false,
            $useAuthenticate: false
        }
    })

    return [user, isPlaying]
}