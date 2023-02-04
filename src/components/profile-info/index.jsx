import "./style.css"

export default function ProfileInfo({ className = "", children }) {

    return (
        <>
            <div className={"profile-info " + className}>{children}</div>
        </>
    )
}