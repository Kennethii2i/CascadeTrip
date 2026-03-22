// src/pages/TripList.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TripList() {
  const navigate = useNavigate();
  
  const [trips, setTrips] = useState([
    { id: 1, title: '東京日帰り旅行', date: '2026-04-10' },
    { id: 2, title: '京都2泊3日', date: '2026-05-01' }
  ]);

  // ★新規追加: モーダル（ポップアップ）の開閉と入力内容の管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTransitMode, setNewTransitMode] = useState('train');

  const handleLogout = () => {
    const isConfirmed = window.confirm('ログアウトしてログイン画面に戻りますか？');
    if (isConfirmed) navigate('/login');
  };

  // ★変更: フォームを送信した時の処理
  const handleStartPlanning = (e) => {
    e.preventDefault();
    
    // タイトルが空の場合はデフォルト名を入れる
    const finalTitle = newTitle.trim() === '' ? '無題の旅行' : newTitle;
    
    // 次の画面（/trips/3）へ移動する際、裏側でデータ（state）を一緒に渡す魔法！
    navigate('/trips/3', { 
      state: { 
        title: finalTitle, 
        defaultTransitMode: newTransitMode 
      } 
    });
  };

  return (
    <div className="app-container">
      <div className="list-header">
        <h1>マイ・トラベル・プラン</h1>
        <button className="logout-button" onClick={handleLogout}>ログアウト</button>
      </div>
      
      {/* ★変更: 押すとモーダルが開くように変更 */}
      <button className="new-trip-button" onClick={() => setIsModalOpen(true)}>
        ＋ 新しい旅行を計画する
      </button>

      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card" onClick={() => navigate(`/trips/${trip.id}`)}>
            <h2>{trip.title}</h2>
            <p>予定日: {trip.date}</p>
          </div>
        ))}
      </div>

      {/* ★新規追加: 新規作成モーダル（isModalOpenがtrueの時だけ表示される） */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          {/* 中身をクリックした時はモーダルが閉じないようにする処理 */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>新しい旅行を作る</h2>
            <form onSubmit={handleStartPlanning} className="modal-form">
              
              <div className="form-group">
                <label>旅行のタイトル</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例：冬の北海道旅行" 
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>主な移動手段</label>
                <select 
                  value={newTransitMode}
                  onChange={(e) => setNewTransitMode(e.target.value)}
                  className="modal-select"
                >
                  <option value="train">🚃 電車・公共交通機関</option>
                  <option value="car">🚗 レンタカー・自家用車</option>
                  <option value="walk">🚶 徒歩メイン</option>
                </select>
                <p className="modal-hint">※設定すると、スポット追加時に自動で適用されます。</p>
              </div>

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setIsModalOpen(false)}>
                  キャンセル
                </button>
                <button type="submit" className="primary-action-button" style={{ marginTop: 0 }}>
                  計画を始める
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}