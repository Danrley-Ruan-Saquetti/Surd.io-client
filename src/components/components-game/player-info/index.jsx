import useCurrentPlayer from "../../../hooks/useCurrentPlayer"
import useLogGame from "../../../hooks/useLogGame"
import "./style.css"

export default function PlayerInfo() {
    const [logGame] = useLogGame()
    const [player] = useCurrentPlayer()

    const calcXpPercentual = () => {
        return (player.xp * 100) / player.xpUpLevel
    }

    const calcHpPercentual = () => {
        return (player.hp * 100) / player.hpMax
    }

    return (
        <>
            <div className="player-info-content">
                <div className="log-game">
                    {logGame.length > 0 && logGame.map((log, i) => {
                        return <div key={i} className={"log " + (log.type)}>{log.content}</div>
                    })}
                </div>
                <div className="player-header user-identification-content">
                    <span className="user-identification level-content">
                        <span className="level bg">{player.level}</span>
                        <span className="username">{player.username}</span>
                    </span>
                    <div className="bar-indicator-content">
                        <span className="info-indicator"><span>{player.xp}/{player.xpUpLevel}</span></span>
                        <span className="indicator-content"><i className="indicator" style={{ width: `${calcXpPercentual()}%` }}></i></span>
                    </div>
                    <div className="bar-indicator-content hp">
                        <span className="indicator-content"><i className="indicator" style={{ width: `${calcHpPercentual()}%` }}></i></span>
                    </div>
                </div>
            </div>
        </>
    )
}