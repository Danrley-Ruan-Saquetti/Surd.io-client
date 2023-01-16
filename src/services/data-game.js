import { socket } from "./socket.js"

function DataGame() {
    const data = {
        idServer: null,
        map: { dimension: { width: 0, height: 0 } },
        players: [],
        xps: [],
        potions: [],
        powerUp: { lengthUpgradesPU: 0 }
    }

    // Data
    const getData = () => { return data }

    const resetData = () => {
        data.players = []
        data.xps = []
        data.potions = []
        data.map = { dimension: { width: 0, height: 0 } }
        data.idServer = null
        data.powerUp = { lengthUpgradesPU: 0 }
    }

    const startData = ({ players, xps, potions, map, _id, powerUp }) => {
        resetData()
        data.idServer = _id
        data.players = players
        data.xps = xps
        data.potions = potions
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

    // Potion
    const getPotion = ({ _id }) => {
        const response = (function() {
            for (let i = 0; i < data.potions.length; i++) {
                const potion = data.potions[i]

                if (potion._id != _id) { continue }

                return { potion, index: i }
            }

            return { potion: null, index: -1 }
        }())

        return response
    }

    const addPotion = ({ potion }) => {
        data.potions.push(potion)
    }

    const addPotions = ({ potions }) => {
        data.potions = potions
    }

    const removePotion = ({ potion }) => {
        const { index } = getPotion(potion)

        if (index == -1) { return }

        data.potions.splice(index, 1)
    }

    return {
        getData,
        startData,
        resetData,
        getPlayer,
        getCurrentPlayer,
        addPlayer,
        removePlayer,
        updatePlayer,
        addXp,
        addXps,
        removeXp,
        getPotion,
        addPotion,
        addPotions,
        removePotion,
    }
}

const dataGame = DataGame()

export default dataGame