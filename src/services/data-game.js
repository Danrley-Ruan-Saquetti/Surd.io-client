import { socket } from "./socket.js"

function DataGame() {
    const data = { players: [], xps: [], map: { dimension: { width: 0, height: 0 } }, idServer: null, powerUp: { lengthUpgradesPU: 0 } }

    const getData = () => { return data }

    // Data
    const resetData = () => {
        data.players = []
        data.xps = []
        data.map = { dimension: { width: 0, height: 0 } }
        data.idServer = null
        data.powerUp = { lengthUpgradesPU: 0 }
    }

    const startData = ({ players, xps, map, _id, powerUp }) => {
        resetData()
        data.idServer = _id
        data.players = players
        data.xps = xps
        data.map = map
        data.powerUp = powerUp
    }

    // Player
    const getPlayer = ({ idSocket }) => {
        const response = (function() {
            for (let i = 0; i < data.players.length; i++) {
                const player = data.players[i]

                if (player.idSocket != idSocket) { continue }

                return { player, index: i }
            }

            return { player: null, index: -1 }
        }())

        return response
    }

    const getCurrentPlayer = () => {
        const response = getPlayer({ idSocket: socket.id })

        return response
    }

    const addPlayer = ({ player }) => {
        data.players.push(player)
    }

    const removePlayer = ({ player }) => {
        const { index } = getPlayer(player)

        if (index == -1) { return }

        data.players.splice(index, 1)
    }

    const updatePlayer = ({ player }) => {
        const { index } = getPlayer(player)

        if (index == -1) { return }

        data.players[index] = player
    }

    // Xp
    const getXp = ({ _id }) => {
        const response = (function() {
            for (let i = 0; i < data.xps.length; i++) {
                const xp = data.xps[i]

                if (xp._id != _id) { continue }

                return { xp, index: i }
            }

            return { xp: null, index: -1 }
        }())

        return response
    }

    const addXp = ({ xp }) => {
        data.xps.push(xp)
    }

    const addXps = ({ xps }) => {
        data.xps = xps
    }

    const removeXp = ({ xp }) => {
        const { index } = getXp(xp)

        if (index == -1) { return }

        data.xps.splice(index, 1)
    }

    return {
        getData,
        startData,
        resetData,
        addPlayer,
        removePlayer,
        updatePlayer,
        addXp,
        addXps,
        removeXp,
        getPlayer,
        getCurrentPlayer,
    }
}

const dataGame = DataGame()

export default dataGame