import "./style.css"

export default function InputBox({ className = "", children }) {

    return (
        <>
            <div className={"input-box " + className}>{children}</div>
        </>
    )
}