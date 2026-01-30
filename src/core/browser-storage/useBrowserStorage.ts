import { deepMerge } from "src/utils/deepMerge";

interface UseBrowserStorageOptions {
  type?: "local" | "session";
}

export function useBrowserStorage(options?: UseBrowserStorageOptions) {
  const storage = options?.type === "session" ? sessionStorage : localStorage;

  function create<T>(key: string, payload: T): T {
    const existingItem = read<T>(key);
    if (existingItem) {
      // TODO: error notification
      const error = new Error(`Item with key "${key}" already exists.`);
      console.error(error);
      throw error;
    }

    storage.setItem(key, JSON.stringify(payload));
    return payload;
  }

  function read<T>(key: string): T | null {
    try {
      return JSON.parse(storage.getItem(key) ?? "") ?? null;
    } catch (error) {
      // TODO: error notification
      console.error(error);
      throw error;
    }
  }

  function update<T>(key: string, update: Partial<T>): T {
    const existingItem = read<T>(key);
    if (!existingItem) {
      // TODO: error notification
      const error = new Error(`Item with key "${key}" not found.`);
      console.error(error);
      throw error;
    }

    const updatedItem = deepMerge<T>(existingItem, update);
    storage.setItem(key, JSON.stringify(updatedItem));
    return updatedItem;
  }

  function remove(key: string): void {
    const existingItem = read(key);
    if (!existingItem) {
      // TODO: error notification
      const error = new Error(`Item with key "${key}" not found.`);
      console.error(error);
      throw error;
    }

    storage.removeItem(key);
  }

  return {
    create,
    read,
    update,
    remove,
  };
}
