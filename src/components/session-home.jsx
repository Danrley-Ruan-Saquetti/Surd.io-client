import Header from "./header/index.jsx"
import Panel from "./panel/index.jsx"
import SideBar from "./side-bar/index.jsx"
import "./session-styles/home.css"
import { useState } from "react"

export default function HomeSession() {
    const [action, setAction] = useState("")

    const updateAction = (ac = "") => {
        setAction(ac)
    }

    return (
        <>
            <Header />
            <div className="main">
                <SideBar
                    actionFunction={updateAction}
                />
                <Panel
                    action={action}
                />
            </div>
        </>
    )
}

/*
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
            <p>Server connected: {currentUser.serverConnected.name}</p>

            <button onClick={(ev) => {
                ev.preventDefault()
                authService.logout((res) => {
                    if (res.success) {
                        navigate("/auth/login")
                        return
                    }
                })
            }}>Logout</button><br /><br />

            <h3>Users Online: {users.length}</h3>
            {users.length != 0 && users.map(user => {
                if (currentUser._id != user._id) {
                    return <div key={user._id} className="users">{user.username} {stateFriend(user)} {
                        user.serverConnected != currentUser.serverConnected._id && (<><p>Playing</p></>)
                    }</div>
                }
            })} <br /><br />

            <Chat /><br />

            <h3>Servers</h3>
            {servers.length != 0 && servers.map(server => {
                return <div key={server._id}>
                    <p>{server.name} <span>Players online {server.playersOnline}</span></p>
                    {currentUser.serverConnected._id != server._id ? (<button onClick={() => {
                        userService.startGame({ idServer: server._id })
                    }}>Enter server</button>) : (<><button onClick={() => {
                        userService.quitGame({})
                    }}>Leave</button></>)}
                </div>
            })}
        </>
    )
*/