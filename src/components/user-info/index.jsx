import "./style.scss"

export default function UserInfo({ className, children }) {

    return (
        <>
            <div className={"user-info" + (className ? ` ${className}` : "")}>
                {children}
            </div>
        </>
    )
}