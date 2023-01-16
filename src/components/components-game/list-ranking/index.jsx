import useListRanking from "../../../hooks/useListRanking"
import useListUsers from "../../../hooks/useListUsers"
import dataGame from "../../../services/data-game"
import "./style.css"

export default function ListRanking() {
    const [ranking] = useListRanking()
    const [usersOnline] = useListUsers()

    return (
        <>
            <div className="ranking-content">
                <div className="info-list-ranking">Ranking</div>
                <div className="list-players-ranked">
                    {ranking.length != 0 && ranking.map((pR, i) => {
                        return <div key={pR.idSocket} className={"player-ranked " + (dataGame.getCurrentPlayer().player.idSocket == pR.idSocket ? "this" : "")}>
                            <span className="pr-info"><span className="pr-placing">{i + 1}º</span><span className="pr-username">{pR.username}</span></span>
                            <span className="pr-points">{pR.points}</span>
                        </div>
                    })}
                </div>
                <div className="info-players-online">{usersOnline.length} online</div>
            </div>
        </>
    )
}