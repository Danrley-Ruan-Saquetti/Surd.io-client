import { useState } from "react";
import Button from "../../button";
import ButtonContent from "../../button/content";
import Form from "../../form";
import Input from "../../form/input"
import AuthService from "../../../services/auth.service.js"
import "./style.css"
import InputBox from "../../form/input-box";
import Label from "../../form/label";
import Link from "../../Link";

const authService = AuthService()

export default function UserRegisterSession() {
    const [data, setData] = useState({ username: "", email: "", password: "" })

    const performRegister = () => {
        authService.register(data, ({ error }) => {
            if (!error) { return }
        })
    }

    const handleData = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    return (
        <>
            <main className="session user-login">
                <Form className={"form-login prop flex cl"}>
                    <h2 className="form-info">Register</h2>

                    <div className="input-box-content">
                        <InputBox>
                            <Input className="input" name={"username"} type={"text"} value={data.username} onChange={handleData} isRequired />
                            <Label name={"username"}>Username</Label>
                            <i></i>
                        </InputBox>
                        <InputBox>
                            <Input className="input" name={"email"} type={"text"} value={data.email} onChange={handleData} isRequired />
                            <Label name={"email"}>Email</Label>
                            <i></i>
                        </InputBox>
                        <InputBox>
                            <Input className="input" name={"password"} type={"password"} value={data.password} onChange={handleData} isRequired />
                            <Label name={"password"}>Password</Label>
                            <i></i>
                        </InputBox>
                    </div>

                    <div className="links">
                        <Link className="tertiary" to="/auth/login">Already have an account? Login!</Link>
                    </div>

                    <ButtonContent>
                        <Button className="tertiary" onClick={performRegister}>Register</Button>
                    </ButtonContent>
                </Form>
            </main>
        </>
    )
}