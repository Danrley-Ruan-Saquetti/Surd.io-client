function DataGame() {
    const data = { players: {}, xps: {} }

    const getData = () => { return data }

    // Data
    const resetData = () => {
        data.players = {}
        data.xps = {}
    }

    const startData = ({ players, xps }) => {
        resetData()
        data.players = players
        data.xps = xps
    }

    // Player
    const addPlayer = ({ player }) => {
        data.players[`${player.idSocket}`] = player
    }

    const removePlayer = ({ player }) => {
        delete data.players[`${player.idSocket}`]
    }

    const updatePlayer = ({ player }) => {
        data.players[`${player.idSocket}`] = player
    }

    // Xp
    const addXp = ({ xp }) => {
        data.xps[`${xp.idSocket}`] = xp
    }

    const removeXp = ({ xp }) => {
        delete data.xps[`${xp.idSocket}`]
    }

    return {
        getData,
        startData,
        resetData,
        addPlayer,
        removePlayer,
        updatePlayer,
        addXp,
        removeXp,
    }
}

const dataGame = DataGame()

export default dataGame