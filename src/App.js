import React, { useState, useEffect } from 'react';
import { saveTodos, loadTodos, saveFolders, loadFolders } from './utils/localStorage';
import Dashboard from './components/Dashboard';
import CategoryTabs from './components/CategoryTabs';
import FolderSidebar from './components/FolderSidebar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  // 상태 관리
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('today'); // 'today', 'week', 'later'
  const [selectedFolder, setSelectedFolder] = useState(null); // null = 전체 보기
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    const loadedTodos = loadTodos();
    const loadedFolders = loadFolders();
    setTodos(loadedTodos);
    setFolders(loadedFolders);
  }, []);

  // 할일 변경 시 자동 저장
  useEffect(() => {
    if (todos.length > 0 || todos.length === 0) {
      saveTodos(todos);
    }
  }, [todos]);

  // 폴더 변경 시 자동 저장
  useEffect(() => {
    if (folders.length > 0) {
      saveFolders(folders);
    }
  }, [folders]);

  // 할일 추가
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      title: todoData.title,
      memo: todoData.memo || '',
      dueDate: todoData.dueDate || null,
      dueTime: todoData.dueTime || null,
      folderId: todoData.folderId || null,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
  };

  // 할일 수정
  const updateTodo = (id, todoData) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...todoData } : todo
    ));
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  // 할일 삭제
  const deleteTodo = (id) => {
    if (window.confirm('이 할일을 삭제하시겠습니까?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // 할일 완료 토글
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 폴더 추가
  const addFolder = (name) => {
    const colors = ['#A8D8EA', '#FFB6C1', '#C7CEEA', '#FFEAA7', '#DDA0DD', '#B5EAD7', '#FFD3B6'];
    const newFolder = {
      id: Date.now().toString(),
      name: name,
      color: colors[folders.length % colors.length]
    };
    setFolders([...folders, newFolder]);
  };

  // 폴더 삭제
  const deleteFolder = (id) => {
    if (window.confirm('이 폴더를 삭제하시겠습니까? (할일은 유지됩니다)')) {
      setFolders(folders.filter(folder => folder.id !== id));
      if (selectedFolder === id) {
        setSelectedFolder(null);
      }
    }
  };

  // 수정 시작
  const startEdit = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // 새 할일 추가 시작
  const startAddTodo = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  return (
    <div className="app">
      {/* 햄버거 메뉴 버튼 (모바일) */}
      <button 
        className="hamburger-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* 사이드바 */}
      <FolderSidebar
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onAddFolder={addFolder}
        onDeleteFolder={deleteFolder}
        todos={todos}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 메인 영역 */}
      <div className="main-content">
        {/* 대시보드 */}
        <Dashboard 
          todos={todos}
          folders={folders}
          onToggleTodo={toggleTodo}
          onEditTodo={startEdit}
        />

        {/* 카테고리 탭 */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 새 할일 추가 버튼 */}
        <button className="add-todo-btn" onClick={startAddTodo}>
          + 새 할일 추가
        </button>

        {/* 할일 목록 */}
        <TodoList
          todos={todos}
          folders={folders}
          selectedCategory={selectedCategory}
          selectedFolder={selectedFolder}
          onToggleTodo={toggleTodo}
          onEditTodo={startEdit}
          onDeleteTodo={deleteTodo}
        />
      </div>

      {/* 할일 추가/수정 폼 */}
      {isFormOpen && (
        <TodoForm
          todo={editingTodo}
          folders={folders}
          onSave={editingTodo ? (data) => updateTodo(editingTodo.id, data) : addTodo}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
