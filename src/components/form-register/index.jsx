import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../../services/auth.service.js"
import BTFormTemplate from "../templates/form/bt-form/index.jsx"
import FormLinkTemplate from "../templates/form/form-link/index.jsx"
import FormTemplate from "../templates/form/index.jsx"
import InputBoxTemplate from "../templates/form/input-box/index.jsx"

const authService = AuthService()

export default function FormRegister() {
    const [data, setData] = useState({ username: "", email: "", password: "" })
    const [response, setResponse] = useState(null)
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const register = () => {
        setResponse()

        authService.register(data, (res) => {
            if (res.success) {
                redirectPage("/home")
            }

            setResponse(res.error)
        })
    }

    return (
        <>
            <FormTemplate
                info="Register"
                inputBoxContent={<>
                    <InputBoxTemplate
                        handleData={({ name, value }) => setData({ ...data, [name]: value.trim() })}
                        label={"Username"}
                        type={"text"}
                        name={"username"}
                        value={data.username}
                        error={response && response.username ? response.username.msg : null}
                    />
                    <InputBoxTemplate
                        handleData={({ name, value }) => setData({ ...data, [name]: value.trim() })}
                        label={"E-mail"}
                        type={"text"}
                        name={"email"}
                        value={data.email}
                        error={response && response.email ? response.email.msg : null}
                    />
                    <InputBoxTemplate
                        handleData={({ name, value }) => setData({ ...data, [name]: value.trim() })}
                        label={"Password"}
                        type={"password"}
                        name={"password"}
                        value={data.password}
                        error={response && response.password ? response.password.msg : null}
                    />
                </>}
                linkContent={<>
                    <FormLinkTemplate
                        linkContent={"You already account? Login!"}
                        linkUrl={() => redirectPage("/auth/login")}
                    />
                </>}
                btContent={<><BTFormTemplate
                    btContent={"Register"}
                    onClick={register}
                    type={"submit"}
                /></>}
            />
        </>
    )
}