import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../../services/auth.service.js"
import BTFormTemplate from "../templates/form/bt-form/index.jsx"
import FormLinkTemplate from "../templates/form/form-link/index.jsx"
import FormTemplate from "../templates/form/index.jsx"
import InputBoxTemplate from "../templates/form/input-box/index.jsx"

const authService = AuthService()

export default function FormLogin() {
    const [data, setData] = useState({ login: "", password: "" })
    const [response, setResponse] = useState(null)
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const login = () => {
        setResponse({})

        authService.login(data, (res) => {
            if (res.success) {
                redirectPage("/home")
            }

            setResponse(res.error)
        })
    }

    return (
        <>
            <FormTemplate
                info="Login"
                inputBoxContent={<>
                    <InputBoxTemplate
                        handleData={({ name, value }) => setData({ ...data, [name]: value.trim() })}
                        label={"Login"}
                        type={"text"}
                        name={"login"}
                        value={data.login}
                        error={response && response.login ? response.msg : null}
                    />
                    <InputBoxTemplate
                        handleData={({ name, value }) => setData({ ...data, [name]: value.trim() })}
                        label={"Password"}
                        type={"password"}
                        name={"password"}
                        value={data.password}
                        error={response && response.password ? response.msg : null}
                    />
                </>}
                linkContent={<>
                    <FormLinkTemplate
                        linkContent={"You haven't account? Register!"}
                        linkUrl={() => redirectPage("/auth/register")}
                    />
                </>}
                btContent={<><BTFormTemplate
                    btContent={"Login"}
                    onClick={login}
                    type={"submit"}
                /></>}
            />
        </>
    )
}