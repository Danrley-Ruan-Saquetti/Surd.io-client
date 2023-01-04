import { useEffect } from "react"
import useCurrentUser from "../../hooks/useCurrentUser.js"
import Icon from "../templates/icon"
import "./style.css"

export default function PainelProfile() {
    const [currentUser] = useCurrentUser()

    const calcXpPercentual = () => {
        return (currentUser.xp * 100) / currentUser.xpUpLevel
    }

    const renderXpIndicator = () => {
        if (document.getElementById("profile-xp-indicator")) {
            document.getElementById("profile-xp-indicator").style.width = `${calcXpPercentual()}%`
        }
    }

    useEffect(() => {
        renderXpIndicator()
    }, [])

    return (
        <>
            <div className="painel-profile-content">
                <div className="aba-content profile-aba">
                    <Icon
                        className="aba-header"
                        name="account_circle"
                    />
                    <div className="aba aba-profile active">Profile</div>
                </div>

                <div className="profile-info-content">
                    <div className="profile-info">
                        <div className="profile-header user-identification-content">
                            <span className="user-identification level-content">
                                <span className="level bg">{currentUser.level}</span>
                                <span className="username">{currentUser.username}</span>
                            </span>
                            <div className="perfil-info xp-content-info">
                                <span className="info-level"><span className="xp">{currentUser.xp}/{currentUser.xpUpLevel}</span></span>
                                <span className="xp-content"><i id="profile-xp-indicator" className="xp-indicator" style={{ width: `${calcXpPercentual()}%` }}></i></span>
                            </div>
                        </div>
                        <div className="profile-statistics">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}