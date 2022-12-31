import useCurrentUser from "../../../hooks/useCurrentUser.js"
import { UserService } from "../../../services/user.service.js"
import useListUsers from "./../../../hooks/useListUsers.js"
import Tooltip from "../../templates/tooltip"
import Icon from "../../templates/icon"
import "./style.css"

const userService = UserService()

export default function ListUsers() {
    const [users] = useListUsers()
    const [currentUser] = useCurrentUser()

    const sendInvite = (_id) => {
        userService.sendInvite({ _id })
    }

    const stateFriend = ({ friend, _id }) => {
        if (!friend.isInvited) {
            return <><Tooltip
                content={<><Icon
                    name="person_add"
                    onclick={() => sendInvite(_id)}
                    className="bt-base"
                /></>}
                tooltipMsg="Send friend"
                direction="left"
            /></>
        }
        if (friend.isPending) {
            if (friend.to == currentUser._id) {
                return <><Tooltip
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
                    /></>
            }
            return <><Tooltip
                content={<><Icon
                    name="cancel"
                    onclick={() => userService.cancelInvite({ _id: friend._id })}
                    className="bt-base"
                /></>}
                tooltipMsg="Cancel invite"
                direction="left"
            /></>
        }
        if (friend.isFriend) {
            return <><Tooltip
                content={<><Icon
                    name="person_remove"
                    onclick={() => userService.removeFriendship({ _id: friend._id })}
                    className="bt-base"
                /></>}
                tooltipMsg="Remove friend"
                direction="left"
            /></>
        }
        return <><><Tooltip
            content={<><Icon
                name="person_add"
                onclick={() => sendInvite(_id)}
                className="bt-base"
            /></>}
            tooltipMsg="Send friend"
            direction="left"
        /></></>
    }

    return (
        <>
            <div className="list-users-content">
                <div className="list-users">
                    {users.length != 0 && users.map(user => {
                        return <div key={user._id} className="user">
                            <p className="user-info-content">
                                <span className="user-info username">{user.username}</span>
                                <span className="user-info level">level {user.level}</span>
                            </p>
                            {currentUser._id != user._id && (<><div className="friend-action">{stateFriend(user)}</div></>)}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}