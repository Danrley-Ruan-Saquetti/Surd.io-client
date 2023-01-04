import Tooltip from "../../templates/tooltip"
import Icon from "../../templates/icon"
import { useNavigate } from "react-router-dom"
import { UserService } from "../../../services/user.service.js"
import "./style.css"

const userService = UserService()

export default function MenuGame() {
    const navigate = useNavigate()

    const redirectPage = (url) => {
        navigate(url)
    }

    const actions = {
        leave: () => {
            userService.quitGame(null, res => {
                if (res.success) {
                    redirectPage("/home")
                }
            })
        }
    }

    return (
        <>
            <div className="menu-game-content">
                <div className="menu-game-actions">
                    <Tooltip
                        content={<><Icon
                            name="logout"
                            className="action-icon"
                        /></>}
                        tooltipMsg="Quit Game"
                        direction="right"
                        className="action leave"
                        onClick={actions.leave}
                    />
                </div>
            </div>
        </>
    )
}