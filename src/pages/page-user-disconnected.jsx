import UserDisconnectedSession from "../components/session-user-disconnected";
import Preload from "../preload";

export default function UserDisconnectedPage() {

    return (
        <>
            <Preload content={<><UserDisconnectedSession /></>} />
        </>
    )
}