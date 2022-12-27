import { useNavigate } from "react-router-dom"
import useListUsers from "../hooks/useListUsers.js"
import AuthService from "../services/auth.service.js"
import Chat from "./templates/chat/index.jsx"
import useCurrentUser from "./../hooks/useCurrentUser.js"
import UserService from "../services/user.service.js"
import useListFriends from "../hooks/useListFriends.js"
import ChatPrivate from "./templates/chat/private/index.jsx"

const authService = AuthService()
const userService = UserService()

export default function HomeSession() {
    const [currentUser] = useCurrentUser()
    const [users] = useListUsers()
    const [friends] = useListFriends()
    const navigate = useNavigate()

    const sendInvite = (_id) => {
        userService.sendInvite({ _id })
    }

    const stateFriend = ({ friend, _id }) => {
        if (!friend.isInvited) {
            return <><button onClick={() => sendInvite(_id)}>Add</button></>
        }
        if (friend.isPending) {
            if (friend.to == currentUser._id) {
                return <><div><button onClick={() => {
                    userService.acceptInvite({ _id: friend._id })
                }}>Accept</button></div><div><button onClick={() => {
                    userService.deniedInvite({ _id: friend._id })
                }}>Denied</button></div></>
            }
            return <><div>Pending <button onClick={() => {
                userService.cancelInvite({ _id: friend._id })
            }}>Cancel</button></div></>
        }
        if (friend.isFriend) {
            return <><div>Friend <button onClick={() => {
                userService.removeFriendship({ _id: friend._id })
            }}>Remove</button></div></>
        }
        return <><button onClick={() => sendInvite(_id)}>Add</button></>
    }

    return (
        <>
            <button onClick={(ev) => {
                ev.preventDefault()
                authService.logout((res) => {
                    if (res.success) {
                        navigate("/auth/login")
                        return
                    }
                })
            }}>Logout</button>

            {users.length != 0 && users.map(user => {
                return <div key={user._id} className="users">{user.username} {
                    currentUser._id != user._id ? stateFriend(user) : <></>}</div>
            })} <br /><br />

            <Chat />
        </>
    )
}