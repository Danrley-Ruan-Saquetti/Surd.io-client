import "./style.scss"

export default function Aba({ onClick = () => { }, className, children }) {

    return (
        <>
            <>
                <div onClick={onClick} className={"aba props fs gd" + (className ? ` ${className}` : "")}>{children}</div>
            </>
        </>
    )
}