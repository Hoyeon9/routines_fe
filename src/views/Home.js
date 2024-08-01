import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'))
    return(
        <div>
            {userId ?
                <>
                <button onClick={() => {navigate("/routines")}}>내 루틴</button>
                <button onClick={() => {sessionStorage.removeItem('userId'); setUserId(null);}}>로그아웃</button>
                </>
                : <button onClick={() => {navigate("/login")}}>로그인</button>
            }
        </div>
    )
}