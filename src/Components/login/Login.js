import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({setUserId}){
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = e => {
        e.preventDefault();
        fetch(`${serverAddress}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'userId': id, password})
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            return res.json();
        })
        .then(res => {
            sessionStorage.setItem('userId', res.token);
            alert(res.message);
            setUserId(res.token)
            navigate('/')
        })
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>ID</label>
                    <input type="text" id="id" name="id" placeholder="Enter your ID" value={id} onChange={e => setId(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="btns">
                    <button className="submit-btn" type="submit">로그인</button>
                    <button className="alter-btn" onClick={(e) => {e.preventDefault(); navigate('/register') }}>회원가입</button>
                </div>
            </form>
        </div>
        
    )
}