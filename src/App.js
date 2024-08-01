import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./views/Home"
import LoginPage from "./views/LoginPage"
import RoutinePage from "./views/RoutinePage"
import './App.css';

function App() {
  const navigate = useNavigate()
  return (
    <>
    <header><button onClick={() => navigate('/')}>Home</button></header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/routines" element={<RoutinePage />} />
    </Routes>
    </>
  );
}

export default App;
