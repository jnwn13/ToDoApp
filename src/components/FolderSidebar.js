import React, { useState } from 'react';

function FolderSidebar({ folders, selectedFolder, onSelectFolder, onAddFolder, onDeleteFolder, todos, isOpen, onClose }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // 폴더별 할일 개수 계산
  const getTodoCountByFolder = (folderId) => {
    return todos.filter(todo => todo.folderId === folderId && !todo.completed).length;
  };

  // 폴더 추가
  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setIsAdding(false);
    }
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      
      <div className={`folder-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>할일 관리</h1>
          <button className="close-sidebar-btn" onClick={onClose}>×</button>
        </div>

        <div className="folder-list">
          {/* 전체 보기 */}
          <button
            className={`folder-item ${selectedFolder === null ? 'active' : ''}`}
            onClick={() => {
              onSelectFolder(null);
              onClose();
            }}
          >
            <span className="folder-icon" style={{ backgroundColor: '#E0E0E0' }}>📋</span>
            <span className="folder-name">전체 보기</span>
            <span className="folder-count">{todos.filter(t => !t.completed).length}</span>
          </button>

          {/* 폴더 목록 */}
          {folders.map(folder => (
            <div key={folder.id} className="folder-item-wrapper">
              <button
                className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
                onClick={() => {
                  onSelectFolder(folder.id);
                  onClose();
                }}
              >
                <span 
                  className="folder-icon" 
                  style={{ backgroundColor: folder.color }}
                >
                  📁
                </span>
                <span className="folder-name">{folder.name}</span>
                <span className="folder-count">{getTodoCountByFolder(folder.id)}</span>
              </button>
              <button
                className="delete-folder-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder.id);
                }}
                title="폴더 삭제"
              >
                ×
              </button>
            </div>
          ))}

          {/* 폴더 추가 */}
          {isAdding ? (
            <div className="add-folder-form">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
                placeholder="폴더 이름"
                autoFocus
              />
              <button onClick={handleAddFolder}>추가</button>
              <button onClick={() => {
                setIsAdding(false);
                setNewFolderName('');
              }}>취소</button>
            </div>
          ) : (
            <button className="add-folder-btn" onClick={() => setIsAdding(true)}>
              + 새 폴더
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default FolderSidebar;
