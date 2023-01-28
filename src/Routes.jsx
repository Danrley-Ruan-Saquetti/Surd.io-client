import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnectionErrorPage from "./pages/page-connection-error";
import HomePage from "./pages/page-home";

export default function Routers() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<><HomePage /><h1>Page not found</h1></>}></Route>
                    <Route path="/server-disconnect" element={<><ConnectionErrorPage /></>}></Route>
                    <Route path="/home" element={<><HomePage /></>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}