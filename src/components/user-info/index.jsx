import "./style.css"

export default function UserInfo({ className = "", children }) {

    return (
        <>
            <div className={"user-info " + className}>
                {children}
            </div>
        </>
    )
}