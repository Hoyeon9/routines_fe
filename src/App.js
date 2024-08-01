import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./views/Home"
import LoginPage from "./views/LoginPage"
import RoutinePage from "./views/RoutinePage"
import './App.css';

function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  return (
    <>
    <header>
      <div className='navbar'>
        <button className='home-btn' onClick={() => navigate('/')}>Home</button>
        {userId ?
          <button className='logout-btn' onClick={() => {sessionStorage.removeItem('userId'); setUserId(null); navigate('/')}}>로그아웃</button>
          : <button className='login-btn' onClick={() => {navigate("/login")}}>로그인</button>}
      </div>
    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage setUserId={setUserId} />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/routines" element={<RoutinePage />} />
    </Routes>
    </>
  );
}

export default App;
