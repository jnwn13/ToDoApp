import React from 'react';

function CategoryTabs({ selectedCategory, onSelectCategory }) {
  const categories = [
    { id: 'today', label: '오늘' },
    { id: 'week', label: '이번주' },
    { id: 'later', label: '나중에' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
