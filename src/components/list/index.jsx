import "./style.scss"

export default function List({ className, children }) {

    return (
        <>
            <div className={"list" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}