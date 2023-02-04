import "./style.css"

export default function Aba({ className = "", children }) {

    return (
        <>
            <>
                <div className={"aba " + (className)}>{children}</div>
            </>
        </>
    )
}