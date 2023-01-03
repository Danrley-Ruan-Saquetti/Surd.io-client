import GameSession from "../components/session-game";
import Preload from "../preload";

export default function GamePage() {
    return (
        <>
            <Preload content={<><GameSession /></>} />
        </>
    )
}