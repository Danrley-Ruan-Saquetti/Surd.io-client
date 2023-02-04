import HomeSession from "../components/sessions/home";
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