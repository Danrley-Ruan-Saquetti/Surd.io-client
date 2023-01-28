import ConnectionErrorSession from "../components/session-connection-error";
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