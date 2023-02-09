import "./style.scss"

export default function ItemList({ className, children }) {

    return (
        <>
            <div className={"item-list" + (className ? ` ${className}` : "")}>{children}</div>
        </>
    )
}