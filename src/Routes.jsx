import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnectionErrorPage from "./pages/page-connection-error";
import HomePage from "./pages/page-home";
import UserLoginPage from "./pages/page-user-login";
import UserRegisterPage from "./pages/page-user-register";

export default function Routers() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<><HomePage /><h1>Page not found</h1></>}></Route>
                    <Route path="/server-disconnect" element={<><ConnectionErrorPage /></>}></Route>
                    <Route path="/home" element={<><HomePage /></>}></Route>
                    <Route path="/auth/login" element={<><UserLoginPage /></>}></Route>
                    <Route path="/auth/register" element={<><UserRegisterPage /></>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}