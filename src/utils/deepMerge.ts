import merge from "lodash.merge";

export const deepMerge = <T>(source: T, update: Partial<T>): T => merge(source, update);
