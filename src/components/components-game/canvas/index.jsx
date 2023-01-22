import { useEffect } from "react"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import dataGame from "../../../services/data-game.js"
import "./style.css"

const PX_CANVAS_UPDATE = 5

export default function CanvasGame() {
    const [, isPlaying] = useCurrentUser()

    let canvas = document.getElementById("canvas")
    let ctx

    const startRender = () => {
        canvas = document.getElementById("canvas")

        if (!canvas) { return }

        dataGame.updateCanvas()

        ctx = canvas.getContext("2d")

        window.addEventListener("resize", resizeCanvas)

        resizeCanvas()
        animate()
    }

    const getCurrentPlayer = () => {
        return dataGame.getCurrentPlayer().player
    }

    // Camera
    const getPosition = (positionObject) => {
        const x = positionObject.x - getXMaster()
        const y = positionObject.y - getYMaster()

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
    const drawArc = ({ position, size }, color) => {
        const { x, y } = getPosition(position)

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2, false)
        ctx.fillStyle = color
        ctx.fill()
    }

    const drawRect = ({ position, dimension }, color = "#fff") => {
        const { x, y } = getPosition(position)
        const width = dimension.width
        const height = dimension.height

        if (x + width < 0 || x > GET_DIMENSION_CANVAS.width()) { return }

        if (y + height < 0 || y > GET_DIMENSION_CANVAS.height()) { return }

        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    }

    const draw = () => {
        drawMap()
        drawXps()
        drawPotions()
        drawPlayers()
        drawProjectiles()
    }

    const drawMap = () => {
        ctx.clearRect(0, 0, GET_DIMENSION_CANVAS.width(), GET_DIMENSION_CANVAS.height());
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

    const drawProjectiles = () => {
        for (let i = 0; i < dataGame.getData().projectiles.length; i++) {
            const projectile = dataGame.getData().projectiles[i];

            drawArc(projectile, "#000")
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