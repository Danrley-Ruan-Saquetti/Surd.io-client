import "./style.scss"

export default function ControlPainel({ className, children }) {

    return (
        <>
            <div className={"control-panel" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}