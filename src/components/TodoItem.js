import React from 'react';

function TodoItem({ todo, folder, onToggle, onEdit, onDelete }) {
  // 날짜 포맷
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 오늘과 비교
  const isOverdue = () => {
    if (!todo.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && !todo.completed;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="todo-checkbox"
      />
      
      <div className="todo-content" onClick={onEdit}>
        <div className="todo-title">{todo.title}</div>
        {todo.memo && <div className="todo-memo">{todo.memo}</div>}
        
        <div className="todo-meta">
          {todo.dueDate && (
            <span className={`todo-date ${isOverdue() ? 'overdue' : ''}`}>
              {formatDate(todo.dueDate)}
              {todo.dueTime && ` ${todo.dueTime}`}
            </span>
          )}
          {folder && (
            <span 
              className="todo-folder-badge"
              style={{ backgroundColor: folder.color }}
            >
              {folder.name}
            </span>
          )}
        </div>
      </div>

      <button 
        className="todo-delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="삭제"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
