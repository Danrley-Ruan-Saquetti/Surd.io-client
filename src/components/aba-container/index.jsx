import "./style.css"

export default function AbaContent({ children }) {

    return (
        <>
            <div className="aba-content prop flex">
                {children}
            </div>
        </>
    )
}