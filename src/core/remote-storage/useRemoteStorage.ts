import { createUid } from "src/utils/createUid";
import { deepMerge } from "src/utils/deepMerge";
import type { Optional } from "src/utils/Optional";

import { useBrowserStorage } from "../browser-storage/useBrowserStorage";

interface RemoteStorable {
  id: string;
}

// TODO: use real remote storage
export function useRemoteStorage() {
  const browserStorage = useBrowserStorage();

  async function create<T extends RemoteStorable>(collection: string, payload: Optional<T, "id">): Promise<T> {
    const id = payload.id ?? createUid();
    const entity = { id, ...payload } as T;

    const existingEntities = ensureCollection<T>(collection);
    if (existingEntities.find((existingEntity) => existingEntity.id === id)) {
      // TODO: error notification
      const error = new Error(`Entity with id "${id}" already exists in collection "${collection}"`);
      console.error(error);
      throw error;
    }
    const updatedEntities: T[] = [...existingEntities, entity];
    browserStorage.update(collection, updatedEntities);

    return entity;
  }

  async function read<T extends RemoteStorable>(collection: string, id: T["id"]): Promise<T | null> {
    const entities = await readMany<T>(collection);
    return entities.find((entity) => entity.id === id) ?? null;
  }

  async function readMany<T extends RemoteStorable>(collection: string): Promise<T[]> {
    const existingEntities = ensureCollection<T>(collection);
    return existingEntities;
  }

  async function update<T extends RemoteStorable>(collection: string, id: T["id"], payload: Partial<T>): Promise<T> {
    const existingEntities = ensureCollection<T>(collection);
    const existingEntity = existingEntities.find((entity) => entity.id === id);
    if (!existingEntity) {
      // TODO: error notification
      const error = new Error(`Entity with id "${id}" not found in collection "${collection}".`);
      console.error(error);
      throw error;
    }

    const updatedEntity = deepMerge<T>(existingEntity, payload);
    const updatedEntities: T[] = [...existingEntities.filter((entity) => entity.id !== id), updatedEntity];
    browserStorage.update(collection, updatedEntities);
    return updatedEntity;
  }

  async function remove<T extends RemoteStorable>(collection: string, id: string): Promise<void> {
    const existingEntities = ensureCollection<T>(collection);
    const existingEntity = existingEntities.find((entity) => entity.id === id);
    if (!existingEntity) {
      // TODO: error notification
      const error = new Error(`Entity with id "${id}" not found in collection "${collection}".`);
      console.error(error);
      throw error;
    }

    const filteredEntities = existingEntities.filter((entity) => entity.id !== id);
    browserStorage.update(collection, filteredEntities);
    void filteredEntities;
  }

  function ensureCollection<T>(collection: string): T[] {
    const existingCollection = browserStorage.read<T[]>(collection);
    if (!existingCollection) browserStorage.create<T[]>(collection, []);
    return existingCollection!;
  }

  return { create, read, readMany, update, remove };
}
