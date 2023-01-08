import { socket } from "./socket.js"

function DataGame() {
    const data = { players: {} }

    const getData = () => { return data }

    // Data
    const resetData = () => {
        data.players = {}
    }

    const startData = ({ players }) => {
        resetData()
        data.players = players

        console.log("startData", data);
    }

    // Player
    const addPlayer = ({ player }) => {
        data.players[`${player._id}`] = player

        console.log("addPlayer", data);
    }

    const removePlayer = ({ player }) => {
        delete data.players[`${player._id}`]

        console.log("removePlayer", data);
    }

    socket.on("$/games/players/current/data", startData)
    socket.on("$/games/players/connected", addPlayer)
    socket.on("$/games/players/disconnected", removePlayer)

    return {
        getData,
        startData,
        resetData,
    }
}

const dataGame = DataGame()

export default dataGame