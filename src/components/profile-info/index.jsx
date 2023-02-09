import "./style.scss"

export default function ProfileInfo({ className, children }) {

    return (
        <>
            <div className={"profile-info" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}