import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    return(
        <div>
            {userId ?
                <button onClick={() => {navigate("/routines")}}>내 루틴</button>
                : <button onClick={() => {navigate("/login")}}>로그인</button>
            }
        </div>
    )
}