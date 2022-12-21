import { useNavigate } from "react-router-dom"

export default function useRedirect() {
    const navigate = useNavigate()

    const redirect = (url) => {
        navigate(url)
    }

    return [redirect]
}