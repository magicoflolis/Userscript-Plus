import { PathLike } from 'node:fs';

/**
 * Loads all the structures in the provided directory.
 *
 * @param dir - The directory to load the structures from
 * @param recursive - Whether to recursively load the structures in the directory
 */
export declare function loadLanguages<T>(dir: PathLike, recursive?: boolean): Promise<T[]>;
