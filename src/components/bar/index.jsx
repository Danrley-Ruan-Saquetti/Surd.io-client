import "./style.css"

export default function Bar({ className = "", children }) {

    return (
        <>
            <div className={"bar " + className}>{children}</div>
        </>
    )
}