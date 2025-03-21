import { PathLike } from 'node:fs';

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
      i18n?: {
        default: string;
        dir: PathLike;
      };
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

export declare function build(): Promise<void>;
