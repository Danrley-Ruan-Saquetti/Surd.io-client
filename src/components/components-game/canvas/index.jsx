import { useEffect } from "react"
import RendererGame from "./renderer-game.js"

const rendererGame = RendererGame()

export default function CanvasGame() {

    const startRender = () => {
        if (document.getElementById("canvas")) {
            rendererGame.startRender()
        }
    }

    useEffect(() => {
        startRender()
    }, [])

    return (
        <>
            <div className="canvas" id="canvas"></div>
        </>
    )
}