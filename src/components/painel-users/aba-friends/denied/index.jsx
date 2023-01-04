import Icon from "../../../templates/icon/index.jsx"
import Tooltip from "../../../templates/tooltip/index.jsx"
import useListInvitesDenied from "../../../../hooks/useListInvitesDenied.js"
import { UserService } from "../../../../services/user.service.js"
import "./style.css"

const userService = UserService()

export default function ListDenied() {
    const [invites] = useListInvitesDenied()

    return (
        <>
            <div className="list-friends">
                {invites.length != 0 ? invites.map(invite => {
                    return <div key={invite._id} className="friend">
                        <div className="user-identification-content">
                            <div className="user-identification level-content">
                                <span className="friend-level level sm">{invite.user.level}</span>
                                <span className="friend-username">{invite.user.username}</span>
                            </div>
                            <div className="user-status-content">
                                <div className={"status " + (invite.user.online ? "online" : "offline")}></div>
                                {invite.user.online ? "Online" : "Offline"}
                            </div>
                        </div>
                        <div className="friend-action">
                            {<>
                                <Tooltip
                                    content={<><Icon
                                        name="cancel"
                                        onclick={() => userService.cancelInvite({ _id: invite._id })}
                                        className="bt-base"
                                    /></>}
                                    tooltipMsg="Cancel invite"
                                    direction="left"
                                /></>}
                        </div>
                    </div>
                }) : (<>
                    <div className="info list-empty">
                        <span>
                            No invites denied
                        </span>
                    </div>
                </>)}
            </div>
        </>
    )
}