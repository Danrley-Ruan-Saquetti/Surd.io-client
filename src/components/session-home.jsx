import { useNavigate } from "react-router-dom"
import useListUsers from "../hooks/useListUsers.js"
import AuthService from "../services/auth.service.js"
import Chat from "./templates/chat/index.jsx"

const authService = AuthService()

export default function HomeSession() {
    const navigate = useNavigate()
    const [users] = useListUsers()

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
                return <div key={user._id} className="users">{user.username}</div>
            })} <br /><br />

            <Chat />
        </>
    )
}