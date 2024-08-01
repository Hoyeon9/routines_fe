import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = e => {
        e.preventDefault();
        fetch(`${serverAddress}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'userId': id, password, username, email})
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            alert("Register succesful!")
            navigate('/')
        })
    }
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>ID</label>
                    <input type="text" id="id" name="id" placeholder="Enter your ID" value={id} onChange={e => setId(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <button type="submit">Register</button>
                <button onClick={(e) => {e.preventDefault(); navigate('/login')}}>Login</button>
            </form>
        </div>
    )
}