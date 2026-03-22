// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ログインボタンが押された時の処理
  const handleLogin = (e) => {
    e.preventDefault(); // 画面の再読み込みを防ぐ
    
    // 仮のログイン処理（本来はここでバックエンドのAPIに送信して確認します）
    if (email !== '' && password !== '') {
      // 両方入力されていれば、旅行一覧画面へ進む
      navigate('/trips');
    } else {
      alert('メールアドレスとパスワードを入力してください');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome!</h1>
        <p className="login-subtitle">カスケード・トリップ・プランナー</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="travel@example.com"
              required /* 空のまま送信できないようにする */
            />
          </div>
          
          <div className="form-group">
            <label>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            ログインして始める
          </button>
        </form>
      </div>
    </div>
  );
}