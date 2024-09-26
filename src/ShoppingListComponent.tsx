import React from 'react';
import './ShoppingListComponent.css';
import { ShoppingList } from './ShoppingList';
import { ShoppingListItem } from './ShoppingListItem';
import ShoppingListItemComponent from './ShoppingListItemComponent';

interface ShoppingListProps {
    shoppingList: ShoppingList;
    onEdit: (item: ShoppingListItem) => void;
    onRemove: (item: ShoppingListItem) => void;
}

const ShoppingListComponent: React.FC<ShoppingListProps> = ({ shoppingList, onRemove, onEdit }) => {
    const items = shoppingList.getItems().slice().reverse();

    return (
        <ul className="shopping-list">
            {items.map((item: ShoppingListItem) => (
                <ShoppingListItemComponent key={item.key} item={item} onRemove={onRemove} onEdit={onEdit} />
            ))}
        </ul>
    );
};

export default ShoppingListComponent;