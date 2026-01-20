import React from 'react';

function Dashboard({ todos, folders, onToggleTodo, onEditTodo }) {
  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // 오늘 마감인 할일 필터링
  const todayTodos = todos.filter(todo => {
    if (!todo.dueDate) return false;
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });

  // 시간순 정렬
  const sortedTodos = [...todayTodos].sort((a, b) => {
    if (!a.dueTime && !b.dueTime) return 0;
    if (!a.dueTime) return 1;
    if (!b.dueTime) return -1;
    return a.dueTime.localeCompare(b.dueTime);
  });

  // 통계
  const completedCount = sortedTodos.filter(todo => todo.completed).length;
  const totalCount = sortedTodos.length;

  // 폴더 찾기
  const getFolderById = (folderId) => {
    return folders.find(folder => folder.id === folderId);
  };

  // 날짜 포맷
  const formatDate = (date) => {
    const d = new Date(date);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>오늘의 일정</h2>
        <div className="dashboard-date">{formatDate(today)}</div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-item">
          <span className="stat-label">전체</span>
          <span className="stat-value">{totalCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">완료</span>
          <span className="stat-value completed">{completedCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">남은 일</span>
          <span className="stat-value remaining">{totalCount - completedCount}</span>
        </div>
      </div>

      {sortedTodos.length === 0 ? (
        <div className="dashboard-empty">
          <p>오늘 예정된 할일이 없습니다 ✨</p>
        </div>
      ) : (
        <div className="dashboard-todos">
          {sortedTodos.map(todo => {
            const folder = getFolderById(todo.folderId);
            return (
              <div 
                key={todo.id} 
                className={`dashboard-todo-item ${todo.completed ? 'completed' : ''}`}
                onClick={() => onEditTodo(todo)}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleTodo(todo.id);
                  }}
                  className="todo-checkbox"
                />
                <div className="dashboard-todo-content">
                  <div className="dashboard-todo-title">{todo.title}</div>
                  <div className="dashboard-todo-meta">
                    {todo.dueTime && <span className="todo-time">{todo.dueTime}</span>}
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
