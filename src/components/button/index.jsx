import "./style.scss"

export default function Button({ className, children, type = "button", onClick = (ev) => { } }) {

    return (
        <>
            <button className={"bt" + (className ? ` ${className}` : "")} type={type} onClick={onClick}>{children}</button>
        </>
    )
}