import { useEffect } from "react"
import "./style.scss"

export default function IndicatorBar({ id = "", className, valueMax = 0, value = 0 }) {

    const calculateIndicator = () => {
        return (value * 100) / valueMax
    }

    const renderXpIndicator = () => {
        if (document.getElementById(id)) {
            document.getElementById(id).style.width = `${calculateIndicator()}%`
        }
    }

    useEffect(() => {
        renderXpIndicator()
    }, [value, valueMax])

    return (
        <>
            <div id={id} className={"indicator-bar" + (className ? ` ${className}` : "")}></div>
        </>
    )
}