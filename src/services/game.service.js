import dataGame from "./data-game.js"
import { socket } from "./socket.js"

export default function GameService() {
    let canvas = document.getElementById("canvas")

    const initData = (data) => {
        dataGame.startData({...data.data, mapKeys: data.mapKeys })
    }

    const initComponents = () => {
        canvas = document.getElementById("canvas")

        window.addEventListener("keydown", keyDown)
        window.addEventListener("keyup", keyUp)
        canvas.addEventListener("click", click)
    }

    // Player
    const keyDown = ({ key }) => {
        const keyValid = dataGame.getData().keysValid.find(mKey => { return `${mKey.key}` == `${key}` })

        if (!keyValid) { return }

        socket.emit("games/players/move", { data: { key, action: "keyDown" }, idServer: dataGame.getData().idServer })
    }

    const keyUp = ({ key }) => {
        const keyValid = dataGame.getData().keysValid.find(mKey => { return `${mKey.key}` == `${key}` })

        if (!keyValid) { return }

        socket.emit("games/players/move", { data: { key, action: "keyUp" }, idServer: dataGame.getData().idServer })
    }

    const click = ({ x, y }) => {
        const pointerRealPosition = { x: x + getXMaster(), y: y + getYMaster() }

        socket.emit("games/players/shoot-projectile", { data: pointerRealPosition, idServer: dataGame.getData().idServer })
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

    const addXps = (data) => {
        dataGame.addXps(data)
    }

    const removeXp = (data) => {
        dataGame.removeXp(data)
    }

    // Potion
    const addPotion = (data) => {
        dataGame.addPotion(data)
    }

    const addPotions = (data) => {
        dataGame.addPotions(data)
    }

    const removePotion = (data) => {
        dataGame.removePotion(data)
    }

    // Projectile
    const addProjectile = (data) => {
        dataGame.addProjectile(data)
    }

    const addProjectiles = (data) => {
        dataGame.addProjectiles(data)
    }

    const removeProjectile = (data) => {
        dataGame.removeProjectile(data)
    }

    const updateProjectile = (data) => {
        dataGame.updateProjectile(data)
    }

    // Window
    const getXMaster = () => {
        let xM = (dataGame.getCurrentPlayer().player.position.x + (dataGame.getCurrentPlayer().player.dimension.width / 2)) - (canvas.width / 2)

        if (xM < 0) {
            xM = 0
        } else if (xM + canvas.width > dataGame.getData().map.dimension.width) {
            xM = dataGame.getData().map.dimension.width - canvas.width
        }

        return xM
    }

    const getYMaster = () => {
        let yM = (dataGame.getCurrentPlayer().player.position.y + (dataGame.getCurrentPlayer().player.dimension.height / 2)) - (canvas.height / 2)

        if (yM < 0) {
            yM = 0
        } else if (yM + canvas.height > dataGame.getData().map.dimension.width) {
            yM = dataGame.getData().map.dimension.width - canvas.height
        }

        return yM
    }

    socket.on("$/games/players/current/data", initData)
    socket.on("$/games/players/current/level-up", (data) => {
        dataGame.addLog({ content: "Level up!", type: "level" })
        updatePlayer(data)
    })
    socket.on("$/games/players/current/earn-xp", (data) => {
        dataGame.addLog({ content: `+${data.xp.value} xp`, type: "xp" })
    })
    socket.on("$/games/players/current/upgrade", updatePlayer)
    socket.on("$/games/players/new", addPlayer)
    socket.on("$/games/players/quit", removePlayer)
    socket.on("$/games/players/move", updatePlayer)
    socket.on("$/games/players/update", updatePlayer)
    socket.on("$/games/xps/create", addXp)
    socket.on("$/games/xps/update", addXps)
    socket.on("$/games/xps/remove", removeXp)
    socket.on("$/games/potions/create", addPotion)
    socket.on("$/games/potions/update", addPotions)
    socket.on("$/games/potions/remove", removePotion)
    socket.on("$/games/projectiles/create", addProjectile)
    socket.on("$/games/projectiles/update", updateProjectile)
    socket.on("$/games/projectiles/remove", removeProjectile)

    return {
        initComponents,
    }
}