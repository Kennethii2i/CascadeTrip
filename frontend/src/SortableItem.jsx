// src/SortableItem.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, location, duration, onDurationChange, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="location-box"
    >
      {/* ★新規追加: 削除ボタン */}
      <button 
        className="delete-button"
        onPointerDown={(e) => e.stopPropagation()} /* ドラッグ誤作動防止 */
        onClick={() => onDelete(id)} /* クリックで削除実行 */
      >
        x
      </button>

      <h3>{location}</h3>
      
      {/* 入力欄（input）をやめて、プルダウン（select）に変更 */}
      <div className="duration-wrapper">
        滞在の目安: 
        <select
          value={duration}
          onChange={(e) => onDurationChange(id, Number(e.target.value))} /* Number()で確実に数値に変換 */
          onPointerDown={(e) => e.stopPropagation()} /* ドラッグ誤作動防止の魔法 */
          className="duration-select"
        >
          <option value="0">通過するだけ (0分)</option>
          <option value="30">サクッと (30分)</option>
          <option value="60">標準 (60分)</option>
          <option value="90">ゆっくり (90分)</option>
          <option value="120">じっくり (120分)</option>
          <option value="180">半日 (180分)</option>
        </select>
      </div>
    </div>
  );
}