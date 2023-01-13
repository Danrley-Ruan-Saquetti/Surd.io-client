import { useState } from "react";
import dataGame from "../services/data-game.js";
import { socket } from "../services/socket.js";
import UseEvents from "./useEvents.js";

export default function useListPowerUps() {
    const [powerUps, setPowerUps] = useState(dataGame.getPlayer({ idSocket: socket.id }).player.powerUps)

    const getPowerUps = ({ player }) => {
        setPowerUps(player.powerUps)
    }

    const [] = UseEvents({
        observer: getPowerUps,
        events: [
            { ev: "$/games/players/current/upgrade" },
        ],
        options: {
            $uniqueObserver: true,
            $alreadyExecuteObserver: false,
            $useAuthenticate: false
        }
    })

    return [powerUps]
}