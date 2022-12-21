import { useState } from "react"
import useRedirect from "../hooks/useNavigate.js"
import Preload from "../preload.jsx"
import AuthService from "../service/auth.service.js"

const authService = AuthService()

export default function AuthLoginPage() {
    const [data, setData] = useState({ login: "", password: "" })
    const [response, setResponse] = useState({})
    const [redirect] = useRedirect()

    const login = (ev) => {
        ev.preventDefault()

        authService.login(data, (res) => {
            if (res.success) {

                redirect("/home")
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
            <Preload content={<>
                <form action="">
                    <input onChange={handleData} type="text" name="login" id="input-login" placeholder="Inform the username or e-mail" required="required" /><br />
                    <input onChange={handleData} type="password" name="password" id="input-password" placeholder="Inform the password" required="required" /><br />
                    <button type="submit" onClick={login}>Login</button><br />
                </form>
                {response.error ? (<div>Error: {response.error.msg}</div>) : <></>}
                {response.success ? (<div>Success: {response.success.msg}</div>) : <></>}
            </>} />
        </>
    )
}