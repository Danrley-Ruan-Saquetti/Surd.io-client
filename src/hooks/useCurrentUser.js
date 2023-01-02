import { useState } from "react"
import { AuthService, currentUser } from "../services/auth.service.js"
import UseEvents from "./useEvents.js"
import useLocalStorage from "./useLocalStorage.js"

const authService = AuthService()

export default function useCurrentUser() {
    const [, setCurrentUser] = useLocalStorage("user", authService.getCurrentUser().user)
    const [user, setUser] = useState(currentUser.user)

    const updateCurrentUser = (data) => {
        if (!data || !data.user) { return }

        setUser(data.user)
        setCurrentUser(data.user)
        currentUser.user = data.user
    }

    const [] = UseEvents({
        observer: updateCurrentUser,
        events: [
            { ev: "$/users/current/update" },
            { ev: "$/users/current/update/serverConnected" }
        ],
        options: { $uniqueObserver: true }
    })

    return [user]
}