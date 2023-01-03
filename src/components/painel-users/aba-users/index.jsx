import { useNavigate } from "react-router-dom"
import useCurrentUser from "../../../hooks/useCurrentUser.js"
import useListUsers from "../../../hooks/useListUsers.js"
import { UserService } from "../../../services/user.service.js"
import { currentUser as currentU } from "../../../services/auth.service.js"
import Icon from "../../templates/icon/index.jsx"
import Tooltip from "../../templates/tooltip/index.jsx"
import "./style.css"

const userService = UserService()

export default function AbaUsers() {
    const [users] = useListUsers()
    const [currentUser] = useCurrentUser()
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const sendInvite = (_id) => {
        userService.sendInvite({ _id })
    }

    const startGame = ({ idServer }) => {
        userService.startGame({ idServer }, res => {
            if (res.success) {
                currentU.user.isPlaying = true
                redirectPage("/game")
            }
        })
    }

    return (
        <>
            <div className="list-users-content">
                <div className="list-users">
                    {users.length != 0 && users.map(user => {
                        return <div key={user._id} className="user user-identification-content">
                            <span className="user-identification level-content">
                                <span className="level sm">{user.level}</span>
                                <span>{user.username}</span>
                            </span>
                            {!user.serverConnected.isLobby && (<>
                                <Tooltip
                                    className="server-connected-info"
                                    content={<span className="server-info-name">{user.serverConnected.name}</span>}
                                    direction="top"
                                    tooltipMsg={`Click to enter server`}
                                    onClick={() => startGame({ idServer: user.serverConnected._id })}
                                />
                            </>)}
                            {currentUser._id != user._id ? (<><span className="friend-action">
                                {user.friend.isFriend ? (<>Friend</>) :
                                    !user.friend.isPending ? (<><Tooltip
                                        content={<><Icon
                                            name="person_add"
                                            onclick={() => sendInvite(user._id)}
                                            className="bt-base"
                                        /></>}
                                        tooltipMsg="Send friend"
                                        direction="left"
                                    /></>) : currentUser._id == user.friend.to ? (<>Friend invite</>) : (<>Pending</>)}
                            </span></>) : (<></>)}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}