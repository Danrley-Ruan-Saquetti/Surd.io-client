import { useEffect, useState } from "react"
import "./style.css"

export default function IndicatorBar({ className = "", valueMax = 0, value = 0 }) {
    const [indicator, setIndicator] = useState(0)

    const calculateIndicator = () => {
        setIndicator((value * 100) / valueMax)
    }

    useEffect(() => {
        calculateIndicator()
    }, [])

    return (
        <>
            <div style={{ width: `${indicator}%` }} className={"indicator-bar " + className}></div>
        </>
    )
}