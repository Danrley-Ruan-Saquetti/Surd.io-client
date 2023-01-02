import useListPendingAwaiting from "../../../../hooks/useListPendingAwaiting.js"
import Icon from "../../../templates/icon/index.jsx"
import Tooltip from "../../../templates/tooltip/index.jsx"
import { UserService } from "../../../../services/user.service.js"
import "./style.css"

const userService = UserService()

export default function ListInvites() {
    const [friends] = useListPendingAwaiting()

    console.log(friends);

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
                            {<><Tooltip
                                content={<><Icon
                                    name="done"
                                    onclick={() => userService.acceptInvite({ _id: friend._id })}
                                    className="bt-base"
                                /></>}
                                tooltipMsg="Accept invite"
                                direction="left"
                            />
                                <Tooltip
                                    content={<><Icon
                                        name="close"
                                        onclick={() => userService.deniedInvite({ _id: friend._id })}
                                        className="bt-base"
                                    /></>}
                                    tooltipMsg="Denied invite"
                                    direction="left"
                                /></>}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}