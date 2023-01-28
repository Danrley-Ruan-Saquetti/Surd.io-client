import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthenticateContext } from "../Contexts/Authenticated"
import AuthService from "../services/auth.service.js"

const authService = AuthService()

export default function ControlRouters() {
    const { authenticated, connected, isLoading } = useContext(AuthenticateContext)
    const navigate = useNavigate()

    const redirectPage = (url = "/") => {
        navigate(`${url}`)
    }

    const userConnectServer = () => {
        if (isLoading) { return }

        if (!connected) { return redirectPage("/server-disconnect") }

        return userAuthenticate()
    }

    const userAuthenticate = () => {
        if (!authService.isUserLogged()) {
            if (window.location.pathname == "/auth/login" || window.location.pathname == "/auth/register") { return }

            return redirectPage("/auth/login")
        }

        if (!authenticated) { return }

        return redirectPage("/home")
    }

    useEffect(() => {
        userConnectServer()
    }, [isLoading, connected, authenticated])

    return []
}