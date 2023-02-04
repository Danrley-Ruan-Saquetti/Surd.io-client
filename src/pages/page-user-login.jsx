import UserLoginSession from "../components/sessions/user-login";
import Preload from "../Preload";

export default function UserLoginPage() {

    return (
        <>
            <Preload>
                <UserLoginSession />
            </Preload>
        </>
    )
}