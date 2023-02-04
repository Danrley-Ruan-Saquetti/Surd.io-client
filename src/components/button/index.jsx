import "./style.css"

export default function Button({ className = "", children, type = "button", onClick = (ev) => { } }) {

    return (
        <>
            <button className={"bt " + className} type={type} onClick={onClick}>{children}</button>
        </>
    )
}