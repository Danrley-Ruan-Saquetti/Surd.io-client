import ConnectionErrorSession from "../components/sessions/connection-server-error";
import Preload from "../Preload";

export default function ConnectionErrorPage() {

    return (
        <>
            <Preload>
                <ConnectionErrorSession />
            </Preload>
        </>
    )
}