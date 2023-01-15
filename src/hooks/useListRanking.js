import { useState } from "react";
import UseEvents from "./useEvents.js"

export default function useListRanking() {
    const [ranking, setRanking] = useState([])

    const [] = UseEvents({
        observer: ({ ranking: r }) => {
            setRanking(r)
        },
        events: [
            { ev: "$/games/ranking" },
        ],
        options: {
            $uniqueObserver: true,
            $alreadyExecuteObserver: false,
            $useAuthenticate: false
        }
    })

    return [ranking]
}