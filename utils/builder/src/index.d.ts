import { PathLike } from 'node:fs';

/**
 * Loads all the structures in the provided directory.
 *
 * @param dir - The directory to load the structures from
 * @param recursive - Whether to recursively load the structures in the directory
 */
export declare function loadLanguages<T>(dir: PathLike, recursive?: boolean): Promise<T[]>;
export declare function build(): Promise<void>;
export interface UserJS {
  name: string;
  description: string;
  version: string;
  license?: string;
  bugs?: URL;
  homepage?: URL;
  icon?: PathLike;
  downloadURL?: URL;
  updateURL?: URL;
  url_source?: URL;
  url?: URL;
  build: {
    source: {
      languageList: string;
      [source: string]: PathLike;
    };
    watch: {
      files: string[];
      dirs: PathLike[];
    };
    paths: {
      fileName: string;
      dir: PathLike;
      dev?: {
        fileName?: string;
        dir?: PathLike;
      };
    };
  };
  metadata: {
    compatible: string[];
    connect: string[];
    grant: string[];
    exclude: string[];
    include: string[];
    'exclude-match': string[];
    match: string[];
    noframes: boolean;
    resource: {
      [name: string]: string;
    };
    require: string[];
    'run-at': 'document-start' | 'document-body' | 'document-end' | 'document-idle';
  };
}
