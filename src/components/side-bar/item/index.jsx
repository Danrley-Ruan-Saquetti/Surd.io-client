import "./style.scss"

export default function Item({ onClick = () => { }, className, children }) {

    return (
        <>
            <div onClick={onClick} className={"item" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}