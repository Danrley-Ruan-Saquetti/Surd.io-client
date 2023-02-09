import "./style.scss"

export default function Logo({ className, children }) {

    return (
        <>
            <div className={"logo-content" + (className ? ` ${className}` : "")}>
                {children}
            </div>
        </>
    )
}