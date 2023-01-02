import useCurrentUser from "../../../hooks/useCurrentUser"
import { UserService } from "../../../services/user.service.js"
import Icon from "../icon"
import Tooltip from "../tooltip"

const userService = UserService()

export default function StateFriend(props = { friend: null, _id: null }) {
    const [currentUser] = useCurrentUser()

    const sendInvite = (_id) => {
        userService.sendInvite({ _id })
    }

    const stateFriend = () => {
        if (!props.friend.isInvited) {
            return <><Tooltip
                content={<><Icon
                    name="person_add"
                    onclick={() => sendInvite(props._id)}
                    className="bt-base"
                /></>}
                tooltipMsg="Send friend"
                direction="left"
            /></>
        }
        if (props.friend.isPending) {
            if (props.friend.to == currentUser._id) {
                return <><Tooltip
                    content={<><Icon
                        name="done"
                        onclick={() => userService.acceptInvite({ _id: props.friend._id })}
                        className="bt-base"
                    /></>}
                    tooltipMsg="Accept invite"
                    direction="left"
                />
                    <Tooltip
                        content={<><Icon
                            name="close"
                            onclick={() => userService.deniedInvite({ _id: props.friend._id })}
                            className="bt-base"
                        /></>}
                        tooltipMsg="Denied invite"
                        direction="left"
                    /></>
            }
            return <><Tooltip
                content={<><Icon
                    name="cancel"
                    onclick={() => userService.cancelInvite({ _id: props.friend._id })}
                    className="bt-base"
                /></>}
                tooltipMsg="Cancel invite"
                direction="left"
            /></>
        }
        if (props.friend.isFriend) {
            return <><Tooltip
                content={<><Icon
                    name="person_remove"
                    onclick={() => userService.removeFriendship({ _id: props.friend._id })}
                    className="bt-base"
                /></>}
                tooltipMsg="Remove friend"
                direction="left"
            /></>
        }
        return <><><Tooltip
            content={<><Icon
                name="person_add"
                onclick={() => sendInvite(props._id)}
                className="bt-base"
            /></>}
            tooltipMsg="Send friend"
            direction="left"
        /></></>
    }

    return (
        <>
            <div className="friend-action">{stateFriend()}</div>
        </>
    )
}