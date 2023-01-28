import HomeSession from "../components/session-home";
import Preload from "../Preload";

export default function HomePage() {

    return (
        <>
            <Preload>
                <HomeSession />
            </Preload>
        </>
    )
}