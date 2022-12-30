import { useEffect } from "react"
import useCurrentUser from "./../../hooks/useCurrentUser.js"
import "./style.css"

export default function Header() {
    const [user] = useCurrentUser()

    const calcXpPercentual = () => {
        return (user.xp * 100) / user.xpUpLevel
    }

    const renderXpIndicator = () => {
        if (document.getElementById("xp-indicator")) {
            document.getElementById("xp-indicator").style.width = `${calcXpPercentual()}%`
        }
    }

    useEffect(() => {
        renderXpIndicator()
    }, [])

    return (
        <>
            <div className="header content-header">
                <div className="header-children logo">
                    <h1>Surd.io Online</h1>
                </div>

                <div className="header-children perfil">
                    <div className="perfil-info identification">
                        <span className="info-username"><strong>{user.username}</strong></span>
                    </div>
                    <div className="perfil-info level">
                        <span className="info-level"><span className="level">Level {user.level}</span> <span className="xp">{user.xp}/{user.xpUpLevel}</span></span>
                        <span className="xp-content"><i id="xp-indicator" className="xp-indicator" style={{ width: `${calcXpPercentual()}%` }}></i></span>
                    </div>
                </div>
            </div>
        </>
    )
}