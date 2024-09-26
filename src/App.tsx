import React, { useRef, useEffect } from 'react';
import { useImmer } from 'use-immer';
import './App.css';
import { ShoppingList } from './ShoppingList';
import { ShoppingListItem } from './ShoppingListItem';
import ShoppingListComponent from './ShoppingListComponent';

function App() {
  const [shoppingList, updateShoppingList] = useImmer(new ShoppingList());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addItem = () => {
    if (inputRef.current !== null && inputRef.current.value && inputRef.current.value.trim() !== '') {
      const newValue = inputRef.current.value.trim();
      updateShoppingList(draft => {
        draft.addItem(new ShoppingListItem(newValue));
      });
      inputRef.current.value = '';
    }
  };

  const removeItem = (item: ShoppingListItem) => {
    const key = item.key;
    const confirmRemove = window.confirm(`Are you sure you want to remove the item "${item.name}"?`);
    if (confirmRemove) {
      updateShoppingList(draft => {
        draft.removeItem(key);
      });
    }
  };

  const editItem = (item: ShoppingListItem) => {
    const key = item.key;
    const newName = prompt("Edit item name:", item.name);
    if (newName && newName.trim() !== '') {
      updateShoppingList(draft => {
        draft.editItem(key, newName.trim());
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <span className='App-header-text'>
          1 min Shopping List
        </span>
      </header>
      <div className="input-container">
        <input
          type="text"
          className="item-input"
          placeholder="Add a new item..."
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />
        <button className="add-button" onClick={addItem}></button>
      </div>
      <div className='shopping-list-separator'>
        <span className='shopping-list-separator-text'>
          {shoppingList.length()} items
        </span>
      </div>
      <ShoppingListComponent shoppingList={shoppingList} onRemove={removeItem} onEdit={editItem} />
    </div>
  );
}

export default App;