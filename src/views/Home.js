import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <button onClick={() => {navigate("/login")}}>로그인</button>
            <button onClick={() => {navigate("/routines")}}>내 루틴</button>
        </div>
    )
}