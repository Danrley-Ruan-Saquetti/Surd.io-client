import { createContext, useState } from "react";
import UseEvents from "../hooks/useEvents";

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState({ _id: null, username: "Guest", level: 1, xp: 0, xpUpLevel: 0 })

    const updateUser = ({ user: value }) => {
        setUser(value)
    }

    const [] = UseEvents({
        observer: updateUser,
        events: [
            { ev: "$/users/current/update" },
            { ev: "$/users/current/update/serverConnected" },
        ],
        options: { $uniqueObserver: true, $alreadyExecuteObserver: false }
    })

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
