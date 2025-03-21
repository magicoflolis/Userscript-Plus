import { PathLike } from 'node:fs';

/**
 * Loads all the structures in the provided directory.
 *
 * @param dir - The directory to load the structures from
 */
export declare function loadLanguages(dir: PathLike, recursive?: boolean): Promise<Map<string, { [key: string]: string }>>;
// export declare function loadLanguages<T>(dir: PathLike, recursive?: boolean): Promise<T[]>;
