import "./style.css"

export default function ButtonContent({ className = "", children }) {

    return (
        <>
            <div className={"button-content " + className}>{children}</div>
        </>
    )
}