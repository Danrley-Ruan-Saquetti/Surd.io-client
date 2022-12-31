import "./style.css"

export default function Tooltip(props = { onClick: (ev) => { }, className: "", content: "", tooltipMsg: "", direction: "top" }) {

    return (
        <>
            <div onClick={() => props.onClick()} className={"tooltip-content " + props.className}>{props.content}<span className={"tooltip " + props.direction}>{props.tooltipMsg}</span></div>
        </>
    )
}