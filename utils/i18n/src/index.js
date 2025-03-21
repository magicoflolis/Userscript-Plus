'use strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { URL, fileURLToPath } from 'node:url';

/**
 *
 * @type { import('../typings/index.d.ts').loadLanguages }
 */
async function loadLanguages(dir, recursive = true, mapper = new Map()) {
  try {
    // Get the stats of the directory
    const statDir = await stat(dir);

    // If the provided directory path is not a directory, throw an error
    if (!statDir.isDirectory()) {
      throw new Error(`The directory '${dir}' is not a directory.`);
    }

    // Get all the files in the directory
    const files = await readdir(dir);

    // Loop through all the files in the directory
    for (const file of files) {
      // Get the stats of the file
      const statFile = await stat(new URL(`${dir}/${file}`));

      // If the file is a directory and recursive is true, recursively load the structures in the directory
      if (statFile.isDirectory() && recursive) {
        await loadLanguages(new URL(`${dir}/${file}`), recursive, mapper);
        continue;
      }

      if (!file.endsWith('.json')) {
        continue;
      }
      const filePath = fileURLToPath(`${dir}/${file}`);
      const reg = /_locales\\(.*?)\\messages\.json/g.exec(filePath);
      if (reg) {
        const structure = await readFile(filePath, 'utf-8');
        const obj = {};
        for (const [k, v] of Object.entries(JSON.parse(structure.toString('utf-8'))))
          obj[k] = v.message ?? '';
        mapper.set(reg[1], obj);
      }
    }
  } catch (ex) {
    console.error(ex);
  }

  return mapper;
}

export { loadLanguages };
export default loadLanguages;
