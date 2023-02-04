import "./style.css"

export default function Icon({ className, children }) {

    return (
        <>
            <div className={"icon material-symbols-outlined " + className}>{children}</div>
        </>
    )
}