import { useNavigate } from "react-router-dom"
import "./style.scss"

export default function Link({ children, className, to = "/" }) {
    const navigate = useNavigate()

    const redirect = () => {
        navigate(to)
    }

    return (
        <>
            <a onClick={redirect} className={"link" + (className ? ` ${className}` : "")}>{children}</a>
        </>
    )
}