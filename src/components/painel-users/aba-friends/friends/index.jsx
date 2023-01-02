import useListFriends from "../../../../hooks/useListFriends.js"
import { UserService } from "../../../../services/user.service.js"
import Icon from "../../../templates/icon/index.jsx"
import Tooltip from "../../../templates/tooltip/index.jsx"
import "./style.css"

const userService = UserService()

export default function ListFriends() {
    const [friends] = useListFriends()

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
                        {<>
                            <div className="friend-action">
                                <Tooltip
                                    content={<><Icon
                                        name="person_remove"
                                        onclick={() => userService.removeFriendship({ _id: friend._id })}
                                        className="bt-base"
                                    /></>}
                                    tooltipMsg="Remove friend"
                                    direction="left"
                                />
                            </div>
                        </>}
                    </div>
                })}
            </div>
        </>
    )
}