import Icon from "../../../templates/icon/index.jsx"
import Tooltip from "../../../templates/tooltip/index.jsx"
import useListPendingOnHold from "../../../../hooks/useListPendingOnHold.js"
import { UserService } from "../../../../services/user.service.js"
import "./style.css"

const userService = UserService()

export default function ListPending() {
    const [friends] = useListPendingOnHold()

    return (
        <>
            <div className="list-friends">
                {friends.length != 0 && friends.map(friend => {
                    return <div key={friend._id} className="friend">
                        <div className="user-identification-content">
                            <div className="user-identification level-content">
                                <span className="friend-level level sm">{friend.user.level}</span>
                                <span className="friend-username">{friend.user.username}</span>
                            </div>
                            <div className="user-status-content">
                                <div className={"status " + (friend.user.online ? "online" : "offline")}></div>
                                {friend.user.online ? "Online" : "Offline"}
                            </div>
                        </div>
                        <div className="friend-action">
                            {<>
                                <Tooltip
                                    content={<><Icon
                                        name="cancel"
                                        onclick={() => userService.cancelInvite({ _id: friend._id })}
                                        className="bt-base"
                                    /></>}
                                    tooltipMsg="Cancel invite"
                                    direction="left"
                                /></>}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}