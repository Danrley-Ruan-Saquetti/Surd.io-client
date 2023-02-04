import { createContext, useState } from "react";
import UseEvents from "../hooks/useEvents"
import AuthService from "../services/auth.service.js";

const AuthenticateContext = createContext()
const authService = AuthService()

function AuthenticatedProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [connected, setConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const updateAuthenticate = (value) => {
        setAuthenticated(value)
        setIsLoading(false)
    }

    const updateConnected = (value) => {
        setConnected(value)
        setIsLoading(false)
    }

    const successConnectionServer = () => {
        updateConnected(true)
        authService.isUserLogged() && authService.reconnect()
    }

    const errorConnectionServer = () => {
        updateConnected(false)
    }

    const userConnect = (data) => {
        if (data.error) { return updateAuthenticate(false) }

        if (data.success) { return updateAuthenticate(true) }
    }

    const [] = UseEvents({
        events: [
            { ev: "connect", observer: successConnectionServer },
            { ev: "connect_error", observer: errorConnectionServer },
            { ev: "disconnect", observer: errorConnectionServer },
            { ev: "auth/login/reconnect/res", observer: userConnect },
            { ev: "auth/login/res", observer: userConnect },
            { ev: "auth/register/res", observer: userConnect },
        ],
        options: {
            $alreadyExecuteObserver: false
        }
    })

    return (
        <AuthenticateContext.Provider value={{ authenticated, connected, isLoading }}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export { AuthenticatedProvider, AuthenticateContext }