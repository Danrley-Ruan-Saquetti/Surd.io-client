import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../../services/auth.service.js"

const authService = AuthService()

export default function AuthLoginSession() {
    const [data, setData] = useState({ login: "", password: "" })
    const [response, setResponse] = useState({})
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const login = (ev) => {
        ev.preventDefault()
        setResponse({})

        authService.login(data, (res) => {
            if (res.success) {
                redirectPage("/home")
            }

            setResponse(res)
        })
    }

    const handleData = ({ target }) => {
        data[target.name] = target.value
        setData(data)
    }

    return (
        <>
            <form action="">
                <input onChange={handleData} type="text" name="login" id="input-login" placeholder="Inform the username or e-mail" required="required" /><br />
                <input onChange={handleData} type="password" name="password" id="input-password" placeholder="Inform the password" required="required" /><br />
                <button type="submit" onClick={login}>Login</button><br />
            </form>
            {response.error ? (<div>Error: {response.error.msg}</div>) : <></>}
            {response.success ? (<div>Success: {response.success.msg}</div>) : <></>}
        </>
    )
}