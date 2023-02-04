import "./style.css"

export default function Logo({ children }) {

    return (
        <>
            <div className="logo-content">
                {children}
            </div>
        </>
    )
}