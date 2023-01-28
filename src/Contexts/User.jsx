import { createContext, useState } from "react";

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState({ _id: null, username: "Guest" })

    const updateUser = (value) => {
        setUser(value)
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }