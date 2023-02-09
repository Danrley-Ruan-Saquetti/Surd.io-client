import "./style.scss"

export default function Bar({ className, children }) {

    return (
        <>
            <div className={"bar" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}