import { useState } from "react"
import dataGame from "../services/data-game.js"
import UseEvents from "./useEvents.js"

export default function useCurrentPlayer() {
    const [player, setPlayer] = useState(dataGame.getCurrentPlayer().player)

    const updateCurrentPlayer = (data) => {
        if (!data || !data.player) { return }

        setPlayer(data.player)
    }

    const [] = UseEvents({
        observer: updateCurrentPlayer,
        events: [
            { ev: "$/games/players/current/data" },
            { ev: "$/games/players/current/level-up" },
            { ev: "$/games/players/current/upgrade" },
            { ev: "$/games/players/current/earn-xp" },
        ],
        options: {
            $uniqueObserver: true,
            $alreadyExecuteObserver: false,
            $useAuthenticate: false
        }
    })

    return [player]
}