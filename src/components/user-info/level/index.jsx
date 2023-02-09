import "./style.scss"

export default function Level({ className, children }) {

    return (
        <>
            <div className={"level" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}