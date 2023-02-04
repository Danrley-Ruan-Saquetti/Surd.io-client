import { useNavigate } from "react-router-dom"
import "./style.css"

export default function Link({ children, className = "", to = "/" }) {
    const navigate = useNavigate()

    const redirect = () => {
        navigate(to)
    }

    return (
        <>
            <a onClick={redirect} className={"link " + className}>{children}</a>
        </>
    )
}