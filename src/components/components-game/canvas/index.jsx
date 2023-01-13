import { useEffect } from "react"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import dataGame from "../../../services/data-game.js"
import GameService from "../../../services/game.service.js"
import { socket } from "../../../services/socket.js"

const gameService = GameService()

export default function CanvasGame() {
    const [user] = useCurrentUser()
    let canvas = document.getElementById("canvas")
    let ctx

    let running = false

    const startRender = () => {
        canvas = document.getElementById("canvas")
        if (!canvas) { return }
        ctx = canvas.getContext("2d")

        running = true

        resizeCanvas()
        animate()
    }

    // Window
    const GET_DIMENSION_WINDOW = {
        width: () => { return window.innerWidth },
        height: () => { return window.innerHeight }
    }

    // Canvas
    const GET_DIMENSION_CANVAS = {
        width: () => { return canvas ? canvas.clientWidth : 0 },
        height: () => { return canvas ? canvas.clientHeight : 0 }
    }

    const resizeCanvas = () => {
        if (canvas) {
            canvas.width = GET_DIMENSION_WINDOW.width()
            canvas.height = GET_DIMENSION_WINDOW.height()
        }
    }

    // Update
    const animate = () => {
        if (GET_DIMENSION_CANVAS.width() != GET_DIMENSION_WINDOW.width || GET_DIMENSION_CANVAS.height() != GET_DIMENSION_WINDOW.height()) { resizeCanvas() }
        draw()
        running && requestAnimationFrame(animate)
    }

    // Draw
    const drawRect = ({ x, y, width, height, color = "#fff" }) => {
        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    }

    const draw = () => {
        drawRect(0, 0, GET_DIMENSION_CANVAS.width(), GET_DIMENSION_CANVAS.height())

        const { map } = dataGame.getData()

        drawRect(0, 0, map.dimension.width, map.dimension.height, "#000")
        drawRect(1, 1, map.dimension.width - 1, map.dimension.height - 1, "#fff")

        drawXps()
        drawPlayers()
    }

    const drawPlayers = () => {
        for (let i = 0; i < dataGame.getData().players.length; i++) {
            const player = dataGame.getData().players[i];

            if (player._id == user._id) { continue }

            drawRect({ x: player.position.x, y: player.position.y, width: player.dimension.width, height: player.dimension.height, color: "#727272" })
        }

        const { player: thisPlayer } = dataGame.getPlayer({ idSocket: socket.id })

        drawRect({ x: thisPlayer.position.x, y: thisPlayer.position.y, width: thisPlayer.dimension.width, height: thisPlayer.dimension.height, color: "#ff0000" })
    }

    const drawXps = () => {
        for (let i = 0; i < dataGame.getData().xps.length; i++) {
            const xp = dataGame.getData().xps[i];

            drawRect({ x: xp.position.x, y: xp.position.y, width: xp.dimension.width, height: xp.dimension.height, color: "yellow" })
        }
    }

    useEffect(() => {
        startRender()
    }, [])

    return (
        <>
            <canvas className="canvas" id="canvas"></canvas>
        </>
    )
}