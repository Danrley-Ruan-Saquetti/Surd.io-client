import "./style.css"

export default function Tooltip(props = { className: "", content: "", tooltipMsg: "", direction: "top" }) {

    return (
        <>
            <div className={"tooltip-content " + props.className}>{props.content}<span className={"tooltip " + props.direction}>{props.tooltipMsg}</span></div>
        </>
    )
}