import Tooltip from "../../templates/tooltip"
import Icon from "./../../templates/icon"
import "./style.css"

export default function Item(props = { isActive: false, content: "", action: "", name: "", actionFunction: (action = "") => { } }) {

    return (
        <>
            <Tooltip
                className={"item action-" + props.action + " " + (props.isActive ? "active" : "")} onClick={() => props.actionFunction(props.action)}
                tooltipMsg={props.content}
                content={<><Icon
                    name={props.name}
                    className={"action"}
                /></>}
                direction="right"
            />
        </>
    )
}