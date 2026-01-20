import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, folders, selectedCategory, selectedFolder, onToggleTodo, onEditTodo, onDeleteTodo }) {
  // 날짜 필터링 함수
  const filterByCategory = (todo) => {
    if (!todo.dueDate) {
      return selectedCategory === 'later';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (selectedCategory === 'today') {
      return dueDate.getTime() === today.getTime();
    } else if (selectedCategory === 'week') {
      // 이번 주 (월요일 ~ 일요일)
      const startOfWeek = new Date(today);
      const day = today.getDay();
      const diff = day === 0 ? -6 : 1 - day; // 월요일로 조정
      startOfWeek.setDate(today.getDate() + diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return dueDate >= startOfWeek && dueDate <= endOfWeek;
    } else if (selectedCategory === 'later') {
      const endOfWeek = new Date(today);
      const day = today.getDay();
      const diff = day === 0 ? 0 : 7 - day;
      endOfWeek.setDate(today.getDate() + diff);
      
      return dueDate > endOfWeek;
    }
    
    return true;
  };

  // 폴더 필터링
  const filterByFolder = (todo) => {
    if (selectedFolder === null) return true;
    return todo.folderId === selectedFolder;
  };

  // 필터링된 할일
  const filteredTodos = todos
    .filter(filterByCategory)
    .filter(filterByFolder)
    .sort((a, b) => {
      // 완료된 항목은 아래로
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // 날짜순 정렬
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateCompare !== 0) return dateCompare;
      
      // 시간순 정렬
      if (!a.dueTime && !b.dueTime) return 0;
      if (!a.dueTime) return 1;
      if (!b.dueTime) return -1;
      return a.dueTime.localeCompare(b.dueTime);
    });

  // 카테고리 이름
  const getCategoryName = () => {
    if (selectedCategory === 'today') return '오늘';
    if (selectedCategory === 'week') return '이번주';
    return '나중에';
  };

  // 폴더 이름
  const getFolderName = () => {
    if (selectedFolder === null) return null;
    const folder = folders.find(f => f.id === selectedFolder);
    return folder ? folder.name : null;
  };

  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <h3>
          {getFolderName() ? `${getFolderName()} - ${getCategoryName()}` : getCategoryName()}
        </h3>
        <span className="todo-count">{filteredTodos.length}개</span>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="todo-list-empty">
          <p>할일이 없습니다</p>
        </div>
      ) : (
        <div className="todo-items">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              folder={folders.find(f => f.id === todo.folderId)}
              onToggle={() => onToggleTodo(todo.id)}
              onEdit={() => onEditTodo(todo)}
              onDelete={() => onDeleteTodo(todo.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
