import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "./service/auth.service.js"

const authService = AuthService()

export default function Preload(props) {
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
                {props.content}
            </main>
        </>
    )
}