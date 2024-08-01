import React, { useState } from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    return(
        <div className="home-container">
            <h1>나만의 루틴 만들기</h1>
            {userId ?
                <div><button onClick={() => {navigate("/routines")}}>내 루틴 보러가기</button></div>
                : <button onClick={() => {navigate("/register")}}>회원가입으로 시작하기</button>
            }
        </div>
    )
}