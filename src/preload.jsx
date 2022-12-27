import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "./hooks/useCurrentUser.js"
import AuthService from "./services/auth.service.js"

const authService = AuthService()

export default function Preload(props) {
    const [currentUser] = useCurrentUser()
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const verifyIsLogged = () => {
        const { pathname } = window.location
        if (pathname != "/auth/login" && pathname != "/auth/register" && !authService.isUserLogged()) {
            redirectPage("/auth/login")
        }
    }

    useEffect(() => {
        verifyIsLogged()
    }, [])

    return (
        <>
            <main>
                {(currentUser || (!authService.isUserLogged() && (window.location.pathname == "/auth/login" || window.location.pathname == "/auth/register"))) && props.content}
            </main>
        </>
    )
}