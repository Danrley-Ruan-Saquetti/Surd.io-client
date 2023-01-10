import dataGame from "./data-game.js"
import { socket } from "./socket.js"

export default function GameService() {
    let keysValid = []
    let idServer = null

    const initComponents = (data) => {
        idServer = data.data._id
        keysValid = data.mapKeys

        dataGame.startData(data.data)

        window.addEventListener("keydown", keyDown)
        window.addEventListener("keyup", keyUp)
    }

    // Player
    const keyDown = ({ key }) => {
        const keyValid = keysValid.find(mKey => { return `${mKey.key}` == `${key}` })

        if (!keyValid) { return }

        socket.emit("games/players/move", { data: { key, action: "keyDown" }, idServer })
    }

    const keyUp = ({ key }) => {
        const keyValid = keysValid.find(mKey => { return `${mKey.key}` == `${key}` })

        if (!keyValid) { return }

        socket.emit("games/players/move", { data: { key, action: "keyUp" }, idServer })
    }

    const addPlayer = (data) => {
        dataGame.addPlayer(data)
    }

    const removePlayer = (data) => {
        dataGame.removePlayer(data)
    }

    const updatePlayer = (data) => {
        dataGame.updatePlayer(data)
    }

    // Xp
    const addXp = (data) => {
        dataGame.addXp(data)
    }

    const removeXp = (data) => {
        dataGame.removeXp(data)
    }

    socket.on("$/games/players/current/data", initComponents)
    socket.on("$/games/players/new", addPlayer)
    socket.on("$/games/players/quit", removePlayer)
    socket.on("$/games/players/move", updatePlayer)
    socket.on("$/games/xps/create", addXp)
    socket.on("$/games/xps/remove", removeXp)
}