import { createContext, useContext, useEffect, useState } from "react";
import UseEvents from "../hooks/useEvents.js";
import UserService from "../services/user.service.js";
import { AuthenticateContext } from "./Authenticated.jsx";

export const UsersContext = createContext()
const userService = UserService()

export function UsersProvider({ isLobby = false, children }) {
    const { authenticated } = useContext(AuthenticateContext)
    const [users, setUsers] = useState([])

    const getUsers = () => {
        userService.getUsers({
            isLobby, res: (data) => {
                if (!data.error) {
                    setUsers(data.users)
                }
            }
        })
    }

    const [] = UseEvents({
        observer: getUsers,
        events: [
            { ev: "$/users/connected" },
            { ev: "$/users/disconnected" },
            { ev: "$/users/current/update" },
            { ev: "$/users/current/update/serverConnected" },
            { ev: "$/friends/send-invite" },
            { ev: "$/friends/denied-invite" },
            { ev: "$/friends/accept-invite" },
            { ev: "$/friends/cancel-invite" },
            { ev: "$/friends/remove-friendship" },
        ],
        options: { $uniqueObserver: true }
    })

    useEffect(() => getUsers(), [authenticated])

    return (
        <UsersContext.Provider value={{ users }}>
            {children}
        </UsersContext.Provider>
    )
}