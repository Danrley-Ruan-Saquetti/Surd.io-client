import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLoginPage from "./pages/page-auth-login";
import AuthRegisterPage from "./pages/page-auth-register";
import HomePage from "./pages/page-home";

export default function Routers() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<><HomePage /></>}></Route>
                    <Route path="/home" element={<><HomePage /></>}></Route>
                    <Route path="/auth/register" element={<><AuthRegisterPage /></>}></Route>
                    <Route path="/auth/login" element={<><AuthLoginPage /></>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}