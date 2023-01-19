import { socket } from "./socket.js"

function DataGame() {
    const data = {
        idServer: null,
        map: { dimension: { width: 0, height: 0 } },
        players: [],
        xps: [],
        potions: [],
        projectiles: [],
        powerUp: { lengthUpgradesPU: 0 },
        keysValid: [],
        canvas: document.getElementById("")
    }

    // Data
    const getData = () => { return data }

    const resetData = () => {
        data.idServer = null
        data.players = []
        data.xps = []
        data.potions = []
        data.projectiles = []
        data.keysValid = []
        data.map = { dimension: { width: 0, height: 0 } }
        data.powerUp = { lengthUpgradesPU: 0 }
        data.canvas = document.getElementById("")
    }

    const startData = ({ players, xps, potions, projectiles, map, _id, powerUp, mapKeys }) => {
        resetData()
        data.idServer = _id
        data.players = players
        data.xps = xps
        data.potions = potions
        data.projectiles = projectiles
        data.map = map
        data.powerUp = powerUp
        data.keysValid = mapKeys
    }

    const updateCanvas = () => {
        data.canvas = document.getElementById("canvas")
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

    // Projectile
    const getProjectile = ({ _id }) => {
        const response = (function() {
            for (let i = 0; i < data.projectiles.length; i++) {
                const projectile = data.projectiles[i]

                if (projectile._id != _id) { continue }

                return { projectile, index: i }
            }

            return { projectile: null, index: -1 }
        }())

        return response
    }

    const addProjectile = ({ projectile }) => {
        data.projectiles.push(projectile)
    }

    const addProjectiles = ({ projectiles }) => {
        data.projectiles = projectiles
    }

    const removeProjectile = ({ projectile }) => {
        const { index } = getProjectile(projectile)

        if (index == -1) { return }

        data.projectiles.splice(index, 1)
    }

    const updateProjectile = ({ projectile }) => {
        const { index } = getProjectile(projectile)

        if (index == -1) { return }

        data.projectiles[index] = projectile
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
        updateCanvas,
        getProjectile,
        addProjectile,
        addProjectiles,
        removeProjectile,
        updateProjectile,
    }
}

const dataGame = DataGame()

export default dataGame