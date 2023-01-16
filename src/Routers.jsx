import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLoginPage from "./pages/page-auth-login";
import AuthRegisterPage from "./pages/page-auth-register";
import GamePage from "./pages/page-game";
import HomePage from "./pages/page-home";
import UserDisconnectedPage from "./pages/page-user-disconnected";

export default function Routers() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<><HomePage /></>}></Route>
                    <Route path="/home" element={<><HomePage /></>}></Route>
                    <Route path="/auth/register" element={<><AuthRegisterPage /></>}></Route>
                    <Route path="/auth/login" element={<><AuthLoginPage /></>}></Route>
                    <Route path="/game" element={<><GamePage /></>}></Route>
                    <Route path="/user-disconnected" element={<><UserDisconnectedPage /></>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}