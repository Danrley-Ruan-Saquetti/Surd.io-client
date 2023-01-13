import useListPowerUps from "../../../hooks/useListPowerUps"
import dataGame from "../../../services/data-game.js"
import { UserService } from "../../../services/user.service.js"
import Icon from "../../templates/icon"

const userService = UserService()

export default function UpgradePanel() {
    const [powerUps] = useListPowerUps()
    const mapPU = [
        { value: "damage", content: "Damage", level: { value: powerUps["damage"] || 0 } },
        { value: "criticalDamage", content: "Critical Damage", level: { value: powerUps["criticalDamage"] || 0 } },
        { value: "defense", content: "Defense", level: { value: powerUps["defense"] || 0 } },
        { value: "health", content: "Health", level: { value: powerUps["health"] || 0 } },
        { value: "size", content: "Size", level: { value: powerUps["size"] || 0 } },
        { value: "speed", content: "Speed", level: { value: powerUps["speed"] || 0 } },
        { value: "projectileSpeed", content: "Projectile Speed", level: { value: powerUps["projectileSpeed"] || 0 } },
        { value: "projectileSize", content: "Projectile Size", level: { value: powerUps["projectileSize"] || 0 } },
        { value: "projectileRange", content: "Projectile Range", level: { value: powerUps["projectileRange"] || 0 } },
        { value: "projectileReload", content: "Projectile Reload", level: { value: powerUps["projectileReload"] || 0 } },
    ]
    const powerUPContArray = (function () {
        let array = []

        for (let i = 0; i < dataGame.getData().powerUp.lengthUpgradesPU; i++) {
            array.push(0)
        }

        return array
    }())

    const updatePU = ({ data = "" }) => {
        userService.upgradePU({ data, idServer: dataGame.getData().idServer })
    }

    console.log(mapPU);

    return (
        <>
            <div className="panel-update-content">
                <div className="power-ups-content">
                    {mapPU.map((pu, i) => {
                        return <div key={i} className="power-up">
                            <div className="action-pu">
                                <span className="pu-info">{pu.content}</span>
                                <Icon
                                    className="upgrade-pu"
                                    name="add"
                                    onclick={() => updatePU({ data: pu.value })}
                                />
                            </div>
                            <div className="indicator-pu">
                                {powerUPContArray.map((a, i) => {
                                    return <div key={i} className={"i-pu " + (pu.level.value >= i + 1 ? "active" : "")}></div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}