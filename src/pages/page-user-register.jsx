import UserRegisterSession from "../components/sessions/user-register";
import Preload from "../Preload";

export default function UserRegisterPage() {

    return (
        <>
            <Preload>
                <UserRegisterSession />
            </Preload>
        </>
    )
}