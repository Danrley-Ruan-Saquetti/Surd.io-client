import "./style.css"

export default function Icon(props = { name: "", className: "", onclick }) {

    return (
        <>
            <span onClick={() => props.onclick ? props.onclick() : () => { }} className={"icon material-symbols-outlined " + props.className}>{props.name}</span>
        </>
    )
}