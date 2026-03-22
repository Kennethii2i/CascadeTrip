// src/pages/TripDetail.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';

export function TripDetail() {
  const navigate = useNavigate();
  
  const [phase, setPhase] = useState('planning');
  const [newLocation, setNewLocation] = useState('');
  
  const [route, setRoute] = useState([
    { id: 1, type: 'spot', location: "東京駅", duration: 60, transitMode: 'train' },
    { id: 2, type: 'spot', location: "浅草寺", duration: 90, transitMode: 'train' }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setRoute((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddSpot = (e) => {
    e.preventDefault();
    if (newLocation.trim() === '') return;
    const newItem = { id: Date.now(), type: 'spot', location: newLocation, duration: 60, transitMode: 'train' };
    setRoute([...route, newItem]);
    setNewLocation('');
  };

  const handleAddDayBreak = () => {
    const newItem = { id: Date.now(), type: 'day-break', location: '🌙 宿泊（ここから次の日）' };
    setRoute([...route, newItem]);
  };

  const handleDurationChange = (id, newDuration) => {
    setRoute(route.map(item => item.id === id ? { ...item, duration: Number(newDuration) } : item));
  };

  const handleTransitChange = (id, newMode) => {
    setRoute(route.map(item => item.id === id ? { ...item, transitMode: newMode } : item));
  };

  const handleDelete = (id) => {
    setRoute(route.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      <button onClick={() => navigate('/trips')} className="back-button">← 旅行一覧に戻る</button>
      
      {/* ★新規: トグルスイッチによるモード切替 UI */}
      <div className="mode-toggle-container">
        <button 
          className={`mode-toggle-btn ${phase === 'planning' ? 'active' : ''}`}
          onClick={() => setPhase('planning')}
        >
          📍 1. ルート・順番
        </button>
        <button 
          className={`mode-toggle-btn ${phase === 'scheduling' ? 'active' : ''}`}
          onClick={() => setPhase('scheduling')}
        >
          ⏰ 2. 時間・移動・宿泊
        </button>
      </div>

      <p className="phase-subtitle" style={{ textAlign: 'center', marginBottom: '20px' }}>
        {phase === 'planning' ? '行きたい場所を追加して、順番を並び替えましょう' : '各スポットの滞在時間と、移動手段を設定しましょう'}
      </p>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={route} strategy={verticalListSortingStrategy}>
          <div className="timeline">
            {route.map((item, index) => {
              const prevItem = index > 0 ? route[index - 1] : null;
              const showTransit = phase === 'scheduling' && index > 0 && prevItem?.type !== 'day-break' && item.type !== 'day-break';

              return (
                <SortableItem 
                  key={item.id}
                  item={item}
                  phase={phase}
                  showTransit={showTransit}
                  onDurationChange={handleDurationChange}
                  onTransitChange={handleTransitChange}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* ★変更: コントロールパネルをスッキリさせました */}
      <div className="control-panel">
        <form onSubmit={handleAddSpot} className="add-spot-form" style={{ marginTop: 0 }}>
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="行きたい場所を追加..."
            className="add-spot-input"
          />
          <button type="submit" className="add-spot-button">追加</button>
        </form>
        
        {/* ★変更: 宿泊ボタンは「時間・移動モード」の時だけ表示する */}
        {phase === 'scheduling' && (
          <button onClick={handleAddDayBreak} className="secondary-button" style={{ marginTop: '10px' }}>
            ＋ 宿泊（次の日）をリストに追加
          </button>
        )}
      </div>
    </div>
  );
}