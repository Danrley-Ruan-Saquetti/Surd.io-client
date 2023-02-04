import "./style.css"

export default function Form({ className, children }) {

    return (
        <>
            <form className={"" + className} action="">
                {children}
            </form>
        </>
    )
}