import { useState } from "react"
import { AuthService, currentUser } from "../services/auth.service.js"
import UseEventsCurrentUser from "./useEventsCurrentUser.jsx"
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

    const [] = UseEventsCurrentUser({
        observer: updateCurrentUser,
    })

    return [user]
}