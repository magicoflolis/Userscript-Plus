import { readdir, readFile, stat } from 'node:fs/promises';
import { URL, fileURLToPath } from 'node:url';

/**
 * Loads all the structures in the provided directory.
 *
 * @template T
 * @param {import('node:fs').PathLike} dir - The directory to load the structures from
 * @param {boolean} recursive - Whether to recursively load the structures in the directory
 * @returns {Promise<T[]>}
 */
export async function loadLanguages(dir, recursive = true) {
  // Get the stats of the directory
  const statDir = await stat(dir);

  // If the provided directory path is not a directory, throw an error
  if (!statDir.isDirectory()) {
    throw new Error(`The directory '${dir}' is not a directory.`);
  }

  // Get all the files in the directory
  const files = await readdir(dir);

  // Create an empty array to store the structures
  /** @type {T[]} */
  const structures = [];

  // Loop through all the files in the directory
  for (const file of files) {
    // Get the stats of the file
    const statFile = await stat(new URL(`${dir}/${file}`));

    // If the file is a directory and recursive is true, recursively load the structures in the directory
    if (statFile.isDirectory() && recursive) {
      structures.push(...(await loadLanguages(new URL(`${dir}/${file}`), recursive)));
      continue;
    }

    if (!file.endsWith('.json')) {
      continue;
    }

    const filePath = fileURLToPath(`${dir}/${file}`);
    const reg = /_locales\\(.*?)\\messages\.json/g.exec(filePath);
    if (reg) {
      const structure = await readFile(filePath, 'utf-8');
      structures.push({
        [reg[1]]: JSON.parse(structure.toString('utf-8'))
      });
    }
  }

  return structures;
}
