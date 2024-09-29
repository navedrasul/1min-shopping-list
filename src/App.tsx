import React, { useRef, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { produce } from 'immer';
import './App.css';
import { ShoppingList } from './ShoppingList';
import { ShoppingListItem } from './ShoppingListItem';
import ShoppingListComponent from './ShoppingListComponent';
import { getShoppingList, saveShoppingList } from './db';

function App() {
  const [shoppingList, setShoppingList] = useImmer(new ShoppingList());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadList() {
      const savedList = await getShoppingList();
      setShoppingList(draft => {
        draft.setItems(
          savedList.map(item => new ShoppingListItem(item.name))
        );
      });
    }
    loadList();
  }, [setShoppingList]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log('Focus set at input');
  }, []);


  const addItem = () => {
    if (inputRef.current !== null && inputRef.current.value && inputRef.current.value.trim() !== '') {
      const newValue = inputRef.current.value.trim();
      const newItem = new ShoppingListItem(newValue);

      // Use produce to create the new state and update it
      const newState = produce(shoppingList, draft => {
        draft.addItem(newItem);
      });

      // Update the state
      setShoppingList(newState);

      // Clear the input field
      inputRef.current.value = '';

      // Call saveShoppingList with the updated state
      saveShoppingList(newState.getItems());
    }
  };

  const removeItem = (item: ShoppingListItem) => {
    const key = item.key;
    const confirmRemove = window.confirm(`Are you sure you want to remove the item "${item.name}"?`);
    if (confirmRemove) {
      // Use produce to create the new state and update it
      const newState = produce(shoppingList, draft => {
        draft.removeItem(key);
      });

      // Update the state
      setShoppingList(newState);

      // Call saveShoppingList with the updated state
      saveShoppingList(newState.getItems());
    }
  };

  const editItem = (item: ShoppingListItem) => {
    const key = item.key;
    const newName = prompt("Edit item name:", item.name);
    if (newName && newName.trim() !== '') {
      // Use produce to create the new state and update it
      const newState = produce(shoppingList, draft => {
        draft.editItem(key, newName.trim());
      });

      // Update the state
      setShoppingList(newState);

      // Call saveShoppingList with the updated state
      saveShoppingList(newState.getItems());
    }
  };

  const clearList = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the list?');
    if (confirmClear) {
      // Use produce to create the new state and update it
      const newState = produce(shoppingList, draft => {
        draft.clearItems();
      });

      // Update the state
      setShoppingList(newState);

      // Call saveShoppingList with the updated state
      saveShoppingList(newState.getItems());
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  const toggleItemPurchased = (item: ShoppingListItem) => {
    const key = item.key;
    // Use produce to create the new state and update it
    const newState = produce(shoppingList, draft => {
      draft.toggleItemPurchased(key);
    });

    // Update the state
    setShoppingList(newState);

    // Call saveShoppingList with the updated state
    saveShoppingList(newState.getItems());
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
          onKeyUp={handleKeyUp}
        />
        <button className="add-button" onClick={addItem}></button>
      </div>
      <div className='shopping-list-separator'>
        <span className='shopping-list-separator-text'>
          <b>{shoppingList.purchasedItemsCount()}</b> purchesed out of <b>{shoppingList.length()}</b> items
        </span>
      </div>
      <ShoppingListComponent
        shoppingList={shoppingList}
        onRemove={removeItem}
        onEdit={editItem}
        onTogglePurchased={toggleItemPurchased}
      />
      <button className="clear-list-button" onClick={clearList}></button>
    </div>
  );
}

export default App;