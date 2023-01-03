import useCurrentUser from "../../../hooks/useCurrentUser.js"
import useListUsers from "../../../hooks/useListUsers.js"
import { UserService } from "../../../services/user.service.js"
import Icon from "../../templates/icon/index.jsx"
import Tooltip from "../../templates/tooltip/index.jsx"
import "./style.css"

const userService = UserService()

export default function AbaUsers() {
    const [users] = useListUsers()
    const [currentUser] = useCurrentUser()

    const sendInvite = (_id) => {
        userService.sendInvite({ _id })
    }

    return (
        <>
            <div className="list-users-content">
                <div className="list-users">
                    {users.length != 0 && users.map(user => {
                        return <div key={user._id} className="user user-identification-content">
                            <p className="user-identification level-content">
                                <span className="level sm">{user.level}</span>
                                <span>{user.username}</span>
                            </p>
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