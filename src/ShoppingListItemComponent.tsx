import React from 'react';
import './ShoppingListItemComponent.css'; // Assuming the same CSS file is used
import { ShoppingListItem } from './ShoppingListItem';

interface ShoppingListItemProps {
    item: ShoppingListItem;
    onEdit: (item: ShoppingListItem) => void;
    onRemove: (item: ShoppingListItem) => void;
}

const ShoppingListItemComponent: React.FC<ShoppingListItemProps> = ({ item, onRemove, onEdit }) => {
    return (
        <li key={item.key} className="shopping-list-item">
            <span className="shopping-list-item-text">{item.name}</span>
            <button className="shopping-list-item-edit" onClick={() => onEdit(item)}></button>
            <button className="shopping-list-item-remove" onClick={() => onRemove(item)}></button>
        </li>
    );
};

export default ShoppingListItemComponent;