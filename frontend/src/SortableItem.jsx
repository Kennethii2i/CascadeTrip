// src/SortableItem.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ★引数に onTransitTimeChange を追加
export function SortableItem({ item, phase, showTransit, onDurationChange, onTransitChange, onTransitTimeChange, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (item.type === 'day-break') {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="day-break-wrapper">
        <div className="day-break-box">
          <span className="day-break-text">{item.location}</span>
          <button className="delete-button-small" onPointerDown={(e) => e.stopPropagation()} onClick={() => onDelete(item.id)}>×</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="item-wrapper">
      
      {showTransit && (
        <div className="transit-header">
          <select 
            className="transit-mode-select"
            value={item.transitMode}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => onTransitChange(item.id, e.target.value)}
          >
            <option value="train">🚃 電車</option>
            <option value="car">🚗 車</option>
            <option value="walk">🚶 徒歩</option>
          </select>
          
          <span style={{ margin: '0 5px' }}>で</span>

          {/* ★変更: 移動時間もプルダウンで選べるようにした */}
          <select
            className="transit-time-select"
            value={item.transitTime}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => onTransitTimeChange(item.id, e.target.value)}
          >
            <option value="auto">✨ 自動 ({item.calculatedTransitTime || '--'}分)</option>
            <option value="10">10分</option>
            <option value="20">20分</option>
            <option value="30">30分</option>
            <option value="60">1時間</option>
          </select>
        </div>
      )}

      <div className={`location-box ${phase === 'planning' ? 'compact-box' : ''}`}>
        <button className="delete-button" onPointerDown={(e) => e.stopPropagation()} onClick={() => onDelete(item.id)}>×</button>
        
        <h3>{item.location}</h3>
        
        {phase === 'scheduling' && (
          <div className="duration-wrapper">
            滞在: 
            <select
              value={item.duration}
              onChange={(e) => onDurationChange(item.id, e.target.value)}
              onPointerDown={(e) => e.stopPropagation()} 
              className="duration-select"
            >
              {/* ★変更: 滞在時間にも「自動」を追加 */}
              <option value="auto">✨ おまかせ ({item.calculatedDuration || '--'}分)</option>
              <option value="30">サクッと (30分)</option>
              <option value="60">標準 (60分)</option>
              <option value="90">ゆっくり (90分)</option>
              <option value="120">じっくり (120分)</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}