import "./style.scss"

export default function ButtonContent({ className, children }) {

    return (
        <>
            <div className={"button-content" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}