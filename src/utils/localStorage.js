// 로컬 스토리지 키
const TODOS_KEY = 'todoManager_todos';
const FOLDERS_KEY = 'todoManager_folders';

// 할일 저장
export const saveTodos = (todos) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('할일 저장 중 오류 발생:', error);
  }
};

// 할일 불러오기
export const loadTodos = () => {
  try {
    const todosJson = localStorage.getItem(TODOS_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  } catch (error) {
    console.error('할일 불러오기 중 오류 발생:', error);
    return [];
  }
};

// 폴더 저장
export const saveFolders = (folders) => {
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (error) {
    console.error('폴더 저장 중 오류 발생:', error);
  }
};

// 폴더 불러오기
export const loadFolders = () => {
  try {
    const foldersJson = localStorage.getItem(FOLDERS_KEY);
    if (foldersJson) {
      return JSON.parse(foldersJson);
    }
    // 기본 폴더 반환
    return [
      { id: 'work', name: '업무', color: '#A8D8EA' },
      { id: 'personal', name: '개인', color: '#FFB6C1' },
      { id: 'study', name: '공부', color: '#C7CEEA' }
    ];
  } catch (error) {
    console.error('폴더 불러오기 중 오류 발생:', error);
    return [
      { id: 'work', name: '업무', color: '#A8D8EA' },
      { id: 'personal', name: '개인', color: '#FFB6C1' },
      { id: 'study', name: '공부', color: '#C7CEEA' }
    ];
  }
};
