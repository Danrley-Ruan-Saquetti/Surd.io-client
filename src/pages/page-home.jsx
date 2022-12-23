import HomeSession from "../components/session-home";
import Preload from "../preload";

export default function HomePage() {
    return (
        <>
            <Preload content={<><HomeSession /></>} />
        </>
    )
}