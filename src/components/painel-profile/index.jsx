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
                            <span className="statistic"><span className="statistics-in">E-mail:</span> <div className="statistics-value">{currentUser.email}</div></span>
                            <span className="statistic"><span className="statistics-in">Record points:</span> <div className="statistics-value">{currentUser.recordPoints}</div></span>
                            <span className="statistic"><span className="statistics-in">Active since:</span> <div className="statistics-value">{(function () {
                                const date = new Date(currentUser.createAt)

                                return `${date.getFullYear()}-${("00" + (date.getMonth() + 1)).slice(-2)}-${("00" + date.getDay()).slice(-2)}`
                            }())}</div></span>
                            <span className="statistic"><span className="statistics-in">Coins:</span> <div className="statistics-value">0</div></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}