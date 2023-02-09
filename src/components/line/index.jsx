import "./style.scss"

export default function Line({ className }) {

    return (
        <>
            <div className={"line" + (className ? ` ${className}` : "")}></div>
        </>
    )
}