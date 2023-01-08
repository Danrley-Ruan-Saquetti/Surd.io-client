import dataGame from "../../../services/data-game.js"

export default function RendererGame() {
    let canvas = document.getElementById("canvas")

    let running = false

    const startRender = () => {
        canvas = document.getElementById("canvas")
        running = true
        animate()
    }

    const animate = () => {

        running && requestAnimationFrame(animate)
    }

    return {
        startRender
    }
}