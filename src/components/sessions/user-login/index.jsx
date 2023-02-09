import { useState } from "react";
import Button from "../../button";
import ButtonContent from "../../button/content";
import Form from "../../form";
import Input from "../../form/input"
import AuthService from "../../../services/auth.service.js"
import InputBox from "../../form/input-box";
import Label from "../../form/label";
import Link from "../../Link";
import Icon from "../../icon";
import "./style.scss"

const authService = AuthService()

export default function UserLoginSession() {
    const [data, setData] = useState({ login: "", password: "" })

    const performLogin = () => {
        authService.login(data, ({ error }) => {
            if (!error) { return }
        })
    }

    const handleData = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    return (
        <>
            <main className="session user-login">
                <Form className={"form-login props flex cl"}>
                    <h2 className="form-info">Login</h2>

                    <div className="input-box-content">
                        <InputBox>
                            <Input className="input" name={"login"} type={"text"} value={data.login} onChange={handleData} isRequired />
                            <Label name={"login"}>Login</Label>
                            <i></i>
                        </InputBox>
                        <InputBox>
                            <Input className="input" name={"password"} type={"password"} value={data.password} onChange={handleData} isRequired />
                            <Label name={"password"}>Password</Label>
                            <i></i>
                        </InputBox>
                    </div>

                    <div className="links">
                        <Link className="tertiary" to="/auth/register">Not have an account yet? Register!</Link>
                    </div>

                    <ButtonContent>
                        <Button className="primary icon-content" onClick={performLogin}>Login <Icon>login</Icon></Button>
                    </ButtonContent>
                </Form>
            </main>
        </>
    )
}