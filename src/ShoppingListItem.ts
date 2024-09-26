import { v4 as uuidv4 } from 'uuid';
import { immerable } from "immer";

export class ShoppingListItem {
  [immerable] = true;
  public key: string;

  constructor(public name: string) {
    this.key = uuidv4();
  }
}