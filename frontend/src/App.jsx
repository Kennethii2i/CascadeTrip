// src/App.jsx
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import './App.css';

function App() {
  const [itinerary, setItinerary] = useState([
    { id: 1, location: "東京駅", duration: 0 },
    { id: 2, location: "浅草寺", duration: 60 },
    { id: 3, location: "東京スカイツリー", duration: 120 }
  ]);

  // ★新規追加: 入力欄の文字を管理するステート
  const [newLocation, setNewLocation] = useState('');

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItinerary((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDurationChange = (id, newDuration) => {
    setItinerary((items) =>
      items.map((item) =>
        item.id === id ? { ...item, duration: Number(newDuration) } : item
      )
    );
  };

  const handleDeleteSpot = (idToDelete) => {
    // 削除したいID "以外" のものを残す（＝削除される）
    setItinerary((items) => items.filter((item) => item.id !== idToDelete));
  };

  // ★新規追加: 追加ボタンが押された時の処理
  const handleAddSpot = (e) => {
    e.preventDefault(); // 画面がリロードされるのを防ぐ
    if (newLocation.trim() === '') return; // 空欄の場合は何もしない

    const newItem = {
      id: Date.now(), // 現在の時刻を一時的なIDとして使う（かぶらないため）
      location: newLocation,
      duration: 60 // 初期値は「標準 (60分)」にする
    };

    // 今のリスト(itinerary)の後ろに、新しいアイテムを追加する
    setItinerary([...itinerary, newItem]);
    setNewLocation(''); // 入力欄を空に戻す
  };

  return (
    <div className="app-container">
      <h1>カスケード・トリップ・プランナー</h1>
      
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itinerary} strategy={verticalListSortingStrategy}>
          <div className="timeline">
            {itinerary.map((item, index) => (
              <div key={item.id} className="timeline-item">
                <SortableItem 
                  id={item.id} 
                  location={item.location} 
                  duration={item.duration} 
                  onDurationChange={handleDurationChange}
                  onDelete={handleDeleteSpot}
                />
                
                {index < itinerary.length - 1 && (
                  <div className="transit-box">
                    ↓ 移動時間（自動計算予定）
                  </div>
                )}
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* ★新規追加: スポット追加フォーム（タイムラインの下に配置） */}
      <form onSubmit={handleAddSpot} className="add-spot-form">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="行きたい場所を追加..."
          className="add-spot-input"
        />
        <button type="submit" className="add-spot-button">
          追加
        </button>
      </form>
    </div>
  );
}

export default App;