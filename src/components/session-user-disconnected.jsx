import { useNavigate } from "react-router-dom"
import UseEvents from "../hooks/useEvents.js"
import "./session-styles/user-disconnected.css"

export default function UserDisconnectedSession() {
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }
    const [] = UseEvents({
        observer: (res) => {
            if (res.success) {
                redirectPage("/home")
            } else {
                redirectPage("/auth/login")
            }
        },
        events: [{ ev: "auth/login/reconnect/res" }],
        options: {
            $uniqueObserver: true,
            $alreadyExecuteObserver: false,
            $useAuthenticate: false
        }
    })

    return (
        <>
            <div className="user-disconnected-session">
                <h1>Unable to connect to the server</h1>
                <p>Try again later</p>
            </div>
        </>
    )
}