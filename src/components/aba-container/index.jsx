import "./style.scss"

export default function AbaContent({ className, children }) {

    return (
        <>
            <div className={"aba-content" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}