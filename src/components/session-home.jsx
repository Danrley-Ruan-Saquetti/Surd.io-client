import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service.js"
import UserService from "../services/user.service.js"

const authService = AuthService()
const userService = UserService()

export default function HomeSession() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const getUsers = () => {
        userService.getUsers(res => {
            if (!res.error) {
                setUsers(res.users)
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    console.log(users);

    return (
        <>
            <button onClick={(ev) => {
                ev.preventDefault()
                authService.logout((res) => {
                    if (res.success) {
                        navigate("/auth/login")
                        return
                    }
                    console.log(res);
                })
            }}>Logout</button>

            {users.length != 0 && users.map(user => {
                return <div key={user._id} className="users">{user.username}</div>
            })}
        </>
    )
}