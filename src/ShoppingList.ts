import { immerable } from "immer";
import { ShoppingListItem } from './ShoppingListItem';

export class ShoppingList {
  [immerable] = true;
  private items: ShoppingListItem[] = [];

  constructor(items: ShoppingListItem[] = []) {
    this.items = items;
  }

  setItems(items: ShoppingListItem[]): void {
    this.items = items;
  }

  addItems(items: ShoppingListItem[]): void {
    this.items.push(...items);
  }

  addItem(item: ShoppingListItem): void {
    this.items.push(item);
  }

  editItem(key: string, newName: string): void {
    const item = this.items.find((item) => item.key === key);
    if (item) {
      item.name = newName;
    }
  }

  toggleItemPurchased(key: string): void { // Add this method
    const item = this.items.find((item) => item.key === key);
    if (item) {
      item.purchased = !item.purchased;
    }
  }

  purchasedItemsCount(): number {
    return this.items.filter((item) => item.purchased).length;
  }

  getItems(): ShoppingListItem[] {
    return this.items;
  }

  getSortedItems(): ShoppingListItem[] { // Add this method
    return this.items.slice().sort((a, b) => Number(a.purchased) - Number(b.purchased));
  }

  removeItem(key: string): void {
    this.items = this.items.filter((item) => item.key !== key);
  }

  length(): number {
    return this.items.length;
  }
}