import React, { useState, useEffect } from 'react';

function TodoForm({ todo, folders, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [folderId, setFolderId] = useState('');

  // 수정 모드일 때 데이터 로드
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setMemo(todo.memo || '');
      setDueDate(todo.dueDate || '');
      setDueTime(todo.dueTime || '');
      setFolderId(todo.folderId || '');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    onSave({
      title: title.trim(),
      memo: memo.trim(),
      dueDate: dueDate || null,
      dueTime: dueTime || null,
      folderId: folderId || null
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{todo ? '할일 수정' : '새 할일'}</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label>제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할일 제목을 입력하세요"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>날짜</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>시간</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>폴더</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
            >
              <option value="">폴더 선택 안함</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              취소
            </button>
            <button type="submit" className="btn-save">
              {todo ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
