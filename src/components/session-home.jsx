import { useNavigate } from "react-router-dom"
import useListUsers from "../hooks/useListUsers.js"
import AuthService from "../services/auth.service.js"
import Chat from "./templates/chat/index.jsx"
import useCurrentUser from "./../hooks/useCurrentUser.js"
import UserService from "../services/user.service.js"
import useListServers from "../hooks/useListServers.js"

const authService = AuthService()
const userService = UserService()

export default function HomeSession() {
    const [currentUser] = useCurrentUser()
    const [users] = useListUsers()
    const [servers] = useListServers()
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
            <h1>Perfil {currentUser.username}</h1>
            <p>Email: {currentUser.email}</p>
            <p>Server connected: {currentUser.serverConnected}</p>

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
                    currentUser._id != user._id ? stateFriend(user) : <></>} {user._id != currentUser._id && user.serverConnected != currentUser.serverConnected && (<><p>Playing</p></>)}<br /></div>
            })} <br /><br />

            <Chat /><br />

            <h3>Servers</h3>
            {servers.length != 0 && servers.map(server => {
                return <div key={server._id}>
                    <p>{server.name} <span>Players online {server.playersOnline}</span></p>
                    {currentUser.serverConnected != server._id ? (<button onClick={() => {
                        userService.startGame({ idServer: server._id })
                    }}>Enter server</button>) : (<><button onClick={() => {
                        userService.quitGame({})
                    }}>Leave</button></>)}
                </div>
            })}
        </>
    )
}