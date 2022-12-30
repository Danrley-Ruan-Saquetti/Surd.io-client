export default function Icon(props = { name: "", className: "" }) {

    return (
        <>
            <span className={"icon material-symbols-outlined " + props.className}>{props.name}</span>
        </>
    )
}