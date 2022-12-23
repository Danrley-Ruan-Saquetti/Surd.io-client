import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthenticate from "./hooks/useAuthenticate.js"
import AuthService from "./services/auth.service.js"

const authService = AuthService()

export default function Preload(props) {
    const [isAuthenticate] = useAuthenticate()
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
                {((!isAuthenticate && !authService.isUserLogged()) || (isAuthenticate)) && props.content}
            </main>
        </>
    )
}