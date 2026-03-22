// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login'; // ★追加: ログイン画面を読み込む
import { TripList } from './pages/TripList';
import { TripDetail } from './pages/TripDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ★変更: URLが "/" の時は、まず "/login" に飛ばす */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* ★追加: ログイン画面のURLルール */}
        <Route path="/login" element={<Login />} />
        
        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/:id" element={<TripDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;