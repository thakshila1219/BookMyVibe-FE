
import './App.css';
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import { Login } from "./view/pages/Login/Login.tsx";
import { useEffect } from "react";
import { isTokenExpired } from "./auth/auth.ts";
import { Unauthorized } from "./auth/Unauthorized.tsx";
import { Register } from "./view/pages/Register/Register.tsx";
import { Chatbot } from "./view/component/Chatbot/Chatbot.tsx";
function App() {
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        }
    }, []);

    return (
        <>
            <Routes>
                <Route path="/*" element={<DefaultLayout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>

            <Chatbot />
        </>
    );
}

export default App;
