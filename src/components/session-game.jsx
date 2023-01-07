import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { currentUser } from "../services/auth.service"
import ChatGame from "./components-game/chat"
import MenuGame from "./components-game/menu"
import "./session-styles/game.css"

export default function GameSession() {
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const verifyIsPlaying = () => {
        if (!currentUser.user.isPlaying) {
            redirectPage("/home")
        }
    }

    useEffect(() => {
        verifyIsPlaying()
    }, [])

    return (
        <>
            <div className="app-game">
                <MenuGame />
                {/* <ChatGame /> */}
            </div>
        </>
    )
}
