import { useNavigate } from "react-router-dom"
import { AuthService } from "../../services/auth.service.js"
import Chat from "../chat"
import PainelGame from "../painel-game/index.jsx"
import PainelUsers from "../painel-users"
import "./style.css"

const authService = AuthService()

export default function Panel(props = { action: "" }) {
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    return (
        <>
            <div className="panel">
                <div className="panel-action">
                    {
                        props.action &&
                        (props.action == "home" && (<><p>home</p></>)) ||
                        (props.action == "profile" && (<><p>profile</p></>)) ||
                        (props.action == "game" && (<><PainelGame /></>)) ||
                        (props.action == "user" && (<><PainelUsers /></>)) ||
                        (props.action == "shop" && (<><p>shop</p></>)) ||
                        (props.action == "setting" && (<><p><button onClick={() => {
                            authService.logout(res => {
                                if (res.success) {
                                    redirectPage("/auth/login")
                                }
                            })
                        }}>Logout</button></p></>))
                    }
                </div>

                <div className="panel-chat"><Chat /></div>
            </div>
        </>
    )
}