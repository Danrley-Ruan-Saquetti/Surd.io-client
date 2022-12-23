import AuthLoginSession from "../components/session-auth-login.jsx"
import Preload from "../preload.jsx"

export default function AuthLoginPage() {
    return (
        <>
            <Preload content={<><AuthLoginSession /></>} />
        </>
    )
}