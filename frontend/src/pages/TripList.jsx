// src/pages/TripList.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TripList() {
  const navigate = useNavigate();
  
  const [trips, setTrips] = useState([
    { id: 1, title: '東京日帰り旅行', date: '2026-04-10' },
    { id: 2, title: '京都2泊3日', date: '2026-05-01' }
  ]);

  const handleCreateTrip = () => {
    navigate('/trips/3');
  };

  // ★新規追加: ログアウトボタンが押された時の処理
  const handleLogout = () => {
    // ブラウザ標準の確認ダイアログを出す
    const isConfirmed = window.confirm('ログアウトしてログイン画面に戻りますか？');
    
    if (isConfirmed) {
      // 本来はここで「ログイン中」というデータ（トークンなど）を消去します
      navigate('/login');
    }
  };

  return (
    <div className="app-container">
      
      {/* ★変更: タイトルとログアウトボタンを横並びにするための箱（list-header） */}
      <div className="list-header">
        <h1>マイ・トラベル・プラン</h1>
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
      </div>
      
      <button className="new-trip-button" onClick={handleCreateTrip}>
        + 新しい旅行を計画する
      </button>

      <div className="trip-list">
        {trips.map((trip) => (
          <div 
            key={trip.id} 
            className="trip-card" 
            onClick={() => navigate(`/trips/${trip.id}`)}
          >
            <h2>{trip.title}</h2>
            <p>予定日: {trip.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}