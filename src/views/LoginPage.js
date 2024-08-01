import React from "react";
import Login from "../Components/login/Login";
import Register from "../Components/login/Register";
import { useLocation } from "react-router-dom";

export default function LoginPage(){
    const location = useLocation();
    const isLogin = location.pathname.endsWith('login')
    const isRegister = location.pathname.endsWith('register')
    return (
        <div className="loginPage-container">
            {isLogin && <Login />}
            {isRegister && <Register />}
        </div>
    )
}