import "./style.scss"

export default function Panel({ className, children }) {

    return (
        <>
            <div className={"panel" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}