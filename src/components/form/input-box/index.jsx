import "./style.scss"

export default function InputBox({ className, children }) {

    return (
        <>
            <div className={"input-box" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}