import React from "react";
import "./LoginPage.css"
import Login from "../Components/login/Login";
import Register from "../Components/login/Register";
import { useLocation } from "react-router-dom";

export default function LoginPage({setUserId}){
    const location = useLocation();
    const isLogin = location.pathname.endsWith('login')
    const isRegister = location.pathname.endsWith('register')
    return (
        <div className="loginPage-container">
            {isLogin && <Login setUserId={setUserId} />}
            {isRegister && <Register />}
        </div>
    )
}