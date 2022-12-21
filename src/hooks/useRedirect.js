import { useEffect } from "react"
import { redirect } from "react-router-dom"

export default function useRedirect(url) {
    const redirectPage = () => {
        redirect(url)
    }

    useEffect(() => {
        redirectPage()
    }, [])
}