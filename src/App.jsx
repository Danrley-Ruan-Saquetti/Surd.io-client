import { AuthenticatedProvider } from "./Contexts/Authenticated";
import { UserProvider } from "./Contexts/User";
import Routers from "./Routes";

export default function App() {

    return (
        <>
            <AuthenticatedProvider>
                <UserProvider>
                    <Routers />
                </UserProvider>
            </AuthenticatedProvider>
        </>
    )
}