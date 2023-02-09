import "./style.scss"

export default function SideBar({ className, children }) {

    return (
        <>
            <div className={"side-bar" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}