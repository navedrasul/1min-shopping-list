import { openDB } from 'idb';
import { ShoppingListItem } from './ShoppingListItem';

const DB_NAME = 'shopping-list-db';
const STORE_NAME = 'shopping-list';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  },
});

export async function getShoppingList() {
  const db = await dbPromise;
  const list = db.getAll(STORE_NAME);
  console.log('Shopping list loaded:');
  console.log(list);
  return list;
}

export async function saveShoppingList(list: ShoppingListItem[]) {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  for (const item of list) {
    const { key, ...rest } = item;
    await tx.objectStore(STORE_NAME).add(rest);
  }
  await tx.done;
  console.log('Shopping list saved:');
  console.log(list);
}