import Chat from "../chat"
import PainelUsers from "../painel-users"
import "./style.css"

export default function Panel(props = { action: "" }) {

    return (
        <>
            <div className="panel">
                <div className="panel-action">
                    {
                        props.action &&
                        (props.action == "home" && (<><p>home</p></>)) ||
                        (props.action == "profile" && (<><p>profile</p></>)) ||
                        (props.action == "game" && (<><p>game</p></>)) ||
                        (props.action == "user" && (<><PainelUsers /></>)) ||
                        (props.action == "shop" && (<><p>shop</p></>)) ||
                        (props.action == "setting" && (<><p>setting</p></>))
                    }
                </div>

                <div className="panel-chat"><Chat /></div>
            </div>
        </>
    )
}