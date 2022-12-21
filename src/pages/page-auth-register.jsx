import AuthRegisterSession from "../components/sessions/session-auth-register.jsx"
import Preload from "../preload.jsx"

export default function AuthRegisterPage() {
    return (
        <>
            <Preload content={<><AuthRegisterSession /></>} />
        </>
    )
}