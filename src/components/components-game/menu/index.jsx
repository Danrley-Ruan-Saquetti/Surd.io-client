import Tooltip from "../../templates/tooltip"
import Icon from "../../templates/icon"
import { useNavigate } from "react-router-dom"
import { UserService } from "../../../services/user.service.js"
import dataGame from "../../../services/data-game.js"
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
        },
        getData: () => {
            userService.getData(res => {
                console.log("");
                console.log(res);
                console.log(dataGame.getData());
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
                    <Tooltip
                        content={<><Icon
                            name="close"
                            className="action-icon"
                        /></>}
                        tooltipMsg="Get Data"
                        direction="right"
                        className="action data"
                        onClick={actions.getData}
                    />
                </div>
            </div>
        </>
    )
}