import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "./hooks/useCurrentUser.js"
import UseEvents from "./hooks/useEvents.js"
import { AuthService } from "./services/auth.service.js"
import { UserService } from "./services/user.service.js"

const authService = AuthService()
const userService = UserService()

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

    const verifyIsPlaying = () => {
        const { pathname } = window.location
        if (pathname == "/game") {
            userService.verifyIsPlaying(res => {
                if (res.error) {
                    redirectPage("/home")
                }
            })
        }
    }

    const [] = UseEvents({
        observer: () => {
            redirectPage("/user-disconnected")
        },
        events: [{ ev: "disconnect" }],
        options: {
            $uniqueObserver: true,
            $alreadyExecuteObserver: false,
            $useAuthenticate: false
        }
    })

    useEffect(() => {
        verifyIsLogged()
        verifyIsPlaying()
    }, [])

    return (
        <>
            <main>
                {(currentUser || (!authService.isUserLogged() && (window.location.pathname == "/auth/login" || window.location.pathname == "/auth/register"))) && props.content}
            </main>
        </>
    )
}