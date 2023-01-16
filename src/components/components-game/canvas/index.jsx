import { useEffect } from "react"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import dataGame from "../../../services/data-game.js"
import GameService from "../../../services/game.service.js"
import "./style.css"

const gameService = GameService()

const PX_CANVAS_UPDATE = 5

export default function CanvasGame() {
    const [, isPlaying] = useCurrentUser()

    let canvas = document.getElementById("canvas")
    let ctx

    const startRender = () => {
        canvas = document.getElementById("canvas")

        if (!canvas) { return }

        ctx = canvas.getContext("2d")

        window.addEventListener("resize", resizeCanvas)

        resizeCanvas()
        animate()
    }

    const getCurrentPlayer = () => {
        return dataGame.getCurrentPlayer().player
    }

    // Camera
    const getPosition = (posObject) => {
        const x = posObject.x - getXMaster()
        const y = posObject.y - getYMaster()

        return { x, y }
    }

    const getXMaster = () => {
        let xM = (getCurrentPlayer().position.x + (getCurrentPlayer().dimension.width / 2)) - (GET_DIMENSION_CANVAS.width() / 2)

        if (xM < 0) {
            xM = 0
        } else if (xM + GET_DIMENSION_CANVAS.width() > dataGame.getData().map.dimension.width) {
            xM = dataGame.getData().map.dimension.width - GET_DIMENSION_CANVAS.width()
        }

        return xM
    }

    const getYMaster = () => {
        let yM = (getCurrentPlayer().position.y + (getCurrentPlayer().dimension.height / 2)) - (GET_DIMENSION_CANVAS.height() / 2)

        if (yM < 0) {
            yM = 0
        } else if (yM + GET_DIMENSION_CANVAS.height() > dataGame.getData().map.dimension.width) {
            yM = dataGame.getData().map.dimension.width - GET_DIMENSION_CANVAS.height()
        }

        return yM
    }

    // Window
    const GET_DIMENSION_WINDOW = {
        width: () => { return window.innerWidth },
        height: () => { return window.innerHeight }
    }

    // Canvas
    const GET_DIMENSION_CANVAS = {
        width: () => { return canvas ? canvas.width : 0 },
        height: () => { return canvas ? canvas.height : 0 }
    }

    const GET_REAL_DIMENSION_CANVAS = {
        width: () => {
            if (GET_DIMENSION_WINDOW.width() > GET_DIMENSION_WINDOW.height()) {
                return getCurrentPlayer().fov
            } else {
                return Math.round((GET_DIMENSION_WINDOW.width() * getCurrentPlayer().fov) / GET_DIMENSION_WINDOW.height())
            }
        },
        height: () => {
            if (GET_DIMENSION_WINDOW.height() > GET_DIMENSION_WINDOW.width()) {
                return getCurrentPlayer().fov
            } else {
                return Math.round((GET_DIMENSION_WINDOW.height() * getCurrentPlayer().fov) / GET_DIMENSION_WINDOW.width())
            }
        }
    }

    const updateDimensionCanvas = () => {
        if (GET_DIMENSION_CANVAS.width() != GET_REAL_DIMENSION_CANVAS.width()) {
            if (Math.abs(GET_DIMENSION_CANVAS.width() - GET_REAL_DIMENSION_CANVAS.width()) < 5) {
                canvas.width = GET_REAL_DIMENSION_CANVAS.width()
            } else {
                const value = (function () {
                    const dif = {
                        width: Math.abs(GET_DIMENSION_CANVAS.width() - GET_REAL_DIMENSION_CANVAS.width()),
                        height: Math.abs(GET_DIMENSION_CANVAS.height() - GET_REAL_DIMENSION_CANVAS.height())
                    }
                    if (dif.width > dif.height) {
                        return PX_CANVAS_UPDATE
                    }
                    return (dif.width * PX_CANVAS_UPDATE) / dif.height
                }())

                if (GET_DIMENSION_CANVAS.width() > GET_REAL_DIMENSION_CANVAS.width()) {
                    canvas.width -= value
                } else {
                    canvas.width += value
                }
            }
        }
        if (GET_DIMENSION_CANVAS.height() != GET_REAL_DIMENSION_CANVAS.height()) {
            if (Math.abs(GET_DIMENSION_CANVAS.height() - GET_REAL_DIMENSION_CANVAS.height()) < 5) {
                canvas.height = GET_REAL_DIMENSION_CANVAS.height()
            } else {
                const value = (function () {
                    const dif = {
                        width: Math.abs(GET_DIMENSION_CANVAS.width() - GET_REAL_DIMENSION_CANVAS.width()),
                        height: Math.abs(GET_DIMENSION_CANVAS.height() - GET_REAL_DIMENSION_CANVAS.height())
                    }
                    if (dif.width > dif.height) {
                        return PX_CANVAS_UPDATE
                    }
                    return (dif.width * PX_CANVAS_UPDATE) / dif.height
                }())
                if (GET_DIMENSION_CANVAS.height() > GET_REAL_DIMENSION_CANVAS.height()) {
                    canvas.height -= value
                } else {
                    canvas.height += value
                }
            }
        }
    }

    const resizeCanvas = () => {
        if (canvas) {
            canvas.width = GET_REAL_DIMENSION_CANVAS.width()
            canvas.height = GET_REAL_DIMENSION_CANVAS.height()
        }
    }

    // Update
    const animate = () => {
        if (!isPlaying) { return }

        try {
            if ((GET_DIMENSION_CANVAS.width() != GET_REAL_DIMENSION_CANVAS.width()) || (GET_DIMENSION_CANVAS.height() != GET_REAL_DIMENSION_CANVAS.height())) { updateDimensionCanvas() }

            draw()
            requestAnimationFrame(animate)
        } catch (err) {
            return
        }
    }

    // Draw
    const drawRect = ({ position, dimension }, color = "#fff") => {
        const x = position.x - getXMaster()
        const y = position.y - getYMaster()
        const width = dimension.width
        const height = dimension.height

        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    }

    const draw = () => {
        ctx.clearRect(0, 0, GET_DIMENSION_CANVAS.width(), GET_DIMENSION_CANVAS.height());
        drawXps()
        drawPotions()
        drawPlayers()
    }

    const drawPlayers = () => {
        const { player: thisPlayer } = dataGame.getCurrentPlayer()

        for (let i = 0; i < dataGame.getData().players.length; i++) {
            const player = dataGame.getData().players[i];

            if (player._id == thisPlayer._id) { continue }

            drawRect(player, "#727272")
        }

        drawRect(thisPlayer, "#ff0000")
    }

    const drawXps = () => {
        for (let i = 0; i < dataGame.getData().xps.length; i++) {
            const xp = dataGame.getData().xps[i];

            drawRect(xp, "yellow")
        }
    }

    const drawPotions = () => {
        for (let i = 0; i < dataGame.getData().potions.length; i++) {
            const potion = dataGame.getData().potions[i];

            drawRect(potion, "blue")
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