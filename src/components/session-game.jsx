import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "../hooks/useCurrentUser.js"
import CanvasGame from "./components-game/canvas"
import ChatGame from "./components-game/chat"
import ListRanking from "./components-game/list-ranking/index.jsx"
import MenuGame from "./components-game/menu"
import PlayerInfo from "./components-game/player-info/index.jsx"
import UpgradePanel from "./components-game/upgrade/index.jsx"
import "./session-styles/game.css"

export default function GameSession() {
    const [, isPlaying] = useCurrentUser()
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const verifyIsPlaying = () => {
        if (!isPlaying) {
            redirectPage("/home")
        }
    }

    useEffect(() => {
        verifyIsPlaying()
    }, [])

    return (
        <>
            <div className="app-game">
                {isPlaying && (<>
                    <MenuGame />
                    <UpgradePanel />
                    <ListRanking />
                    <PlayerInfo />
                    <CanvasGame />
                    {/* <ChatGame /> */}
                </>)}
            </div>
        </>
    )
}
