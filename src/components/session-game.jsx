import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "../hooks/useCurrentUser.js"
import UseEvents from "../hooks/useEvents.js"
import GameService from "../services/game.service.js"
import CanvasGame from "./components-game/canvas"
import ChatGame from "./components-game/chat"
import ListRanking from "./components-game/list-ranking/index.jsx"
import MenuGame from "./components-game/menu"
import PlayerInfo from "./components-game/player-info/index.jsx"
import UpgradePanel from "./components-game/upgrade/index.jsx"
import "./session-styles/game.css"

const gameService = GameService()

export default function GameSession() {
    const [, isPlaying] = useCurrentUser()
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const initComponents = () => {
        if (isPlaying) {
            gameService.initComponents()
        }
    }

    const verifyIsPlaying = () => {
        if (!isPlaying) {
            redirectPage("/home")
        }
    }

    const [] = UseEvents({
        observer: () => {
            redirectPage("/home")
        },
        events: [{ ev: "$/games/players/current/game-over" }],
        options: {
            $alreadyExecuteObserver: false,
            $uniqueObserver: true,
            $useAuthenticate: false
        }
    })

    useEffect(() => {
        verifyIsPlaying()
        initComponents()
    }, [])

    return (
        <>
            <div className="app-game">
                {isPlaying && (<>
                    <MenuGame />
                    <ListRanking />
                    <UpgradePanel />
                    <PlayerInfo />
                    <ChatGame />
                    <CanvasGame />
                </>)}
            </div>
        </>
    )
}
