import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { currentUser } from "../../services/auth.service.js"
import { UserService } from "../../services/user.service.js"
import useListServers from "../../hooks/useListServers.js"
import Loading from "../templates/loading"
import Icon from "../templates/icon"
import "./style.css"

const userService = UserService()

export default function PainelGame() {
    const [servers] = useListServers()
    const [idServerSelected, setIdServerSelected] = useState(null)
    const [loading, setLoading] = useState(<></>)
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const toggleServerSelected = ({ _id = null }) => {
        setIdServerSelected(_id)
    }

    const startGame = () => {
        setLoading(<><Loading /></>)

        userService.startGame({ idServer: idServerSelected }, res => {
            setLoading(<></>)
            if (res.success) {
                currentUser.user.isPlaying = true
                redirectPage("/game")
            }
        })
    }

    const findServerById = () => {
        if (!idServerSelected) {
            if (servers.length != 0) {
                setIdServerSelected(servers[0]._id)
            }
            return null
        }

        const server = servers.find(server => server._id == idServerSelected)

        return server
    }

    const serverSelected = findServerById()

    return (
        <>
            {loading}
            <div className="game-content">
                <div className="aba-content game-aba">
                    <Icon
                        className="aba-header"
                        name="sports_esports"
                    />
                    <div className="aba aba-game active">Servers</div>
                </div>
                <div className="list-servers-content">
                    <div className="list-servers">
                        {servers.length != 0 && servers.map(server => {
                            return <div key={server._id} className="server" onClick={() => toggleServerSelected(server)}>
                                <div className="server-info">
                                    <div className="server-name">{server.name}</div>
                                    <div className="server-players-online">{server.playersOnline} players online</div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                {serverSelected && (<>
                    <div className="server-info-content">
                        <div className="server-info">
                            <div className="server-name">{serverSelected.name}</div>
                            <div className="server-players-online">{serverSelected.playersOnline} players online</div>
                        </div>
                        <div className="server-action">
                            <button className="start-game bt" onClick={() => startGame()}>Start Game</button>
                        </div>
                    </div>
                </>)}
            </div>
        </>
    )
}