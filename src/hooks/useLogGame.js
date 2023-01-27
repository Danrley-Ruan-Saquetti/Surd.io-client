import { useState } from "react";
import dataGame from "../services/data-game.js";
import UseEvents from "./useEvents.js"

export default function useLogGame() {
    const [logGame, setLogGame] = useState(dataGame.getData().log)

    const getLog = () => {
        setTimeout(() => setLogGame(dataGame.getData().log), 1)
        setTimeout(() => setLogGame(dataGame.getData().log), 1000)
        setTimeout(() => setLogGame(dataGame.getData().log), 1000 * 4 + 1)
    }

    const [] = UseEvents({
        observer: getLog,
        events: [
            { ev: "$/games/players/current/level-up" },
            { ev: "$/games/players/current/earn-xp" },
        ],
        options: {
            $uniqueObserver: true
        }
    })

    return [logGame]
}