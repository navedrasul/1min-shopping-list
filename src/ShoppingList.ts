import { immerable } from "immer";
import { ShoppingListItem } from './ShoppingListItem';

export class ShoppingList {
  [immerable] = true;
  private items: ShoppingListItem[] = [];

  addItem(item: ShoppingListItem): void {
    this.items.push(item);
  }

  editItem(key: string, newName: string): void {
    const item = this.items.find((item) => item.key === key);
    if (item) {
      item.name = newName;
    }
  }

  getItems(): ShoppingListItem[] {
    return this.items;
  }

  removeItem(key: string): void {
    this.items = this.items.filter((item) => item.key !== key);
  }

  length(): number {
    return this.items.length;
  }
}