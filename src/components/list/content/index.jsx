import "./style.scss"

export default function ListContent({ className, children }) {

    return (
        <>
            <div className={"list-content" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}