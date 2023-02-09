import "./style.scss"

export default function Icon({ className, children }) {

    return (
        <>
            <div className={"icon material-symbols-outlined" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}