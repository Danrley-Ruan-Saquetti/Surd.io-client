import "./style.scss"

export default function Form({ className, children }) {

    return (
        <>
            <form className={"" + className} action="">
                {children}
            </form>
        </>
    )
}