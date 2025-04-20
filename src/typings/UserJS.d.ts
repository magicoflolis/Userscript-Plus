// import GM from '@types/greasemonkey';
// import '@types/tampermonkey';
import '@violentmonkey/types';
import { config, FilterLayout, UserJSEngine, type GSForkQuery } from './types';
import './scheduler';

/** [i18n directory](https://github.com/magicoflolis/Userscript-Plus/tree/master/src/_locales) */
export const translations: {
  [i18n: string]: {
    [key: string]: string;
  };
};
/** [source code](https://github.com/magicoflolis/Userscript-Plus/blob/master/src/sass/_main.scss) */
export const main_css: string;

export interface safeHandles {
  XMLHttpRequest: typeof XMLHttpRequest;
  CustomEvent: typeof CustomEvent;
  customElements: typeof customElements;
  createElement: typeof document.createElement;
  createElementNS: typeof document.createElementNS;
  createTextNode: typeof document.createTextNode;
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
  navigator: typeof navigator;
  // customElements: typeof customElements;
  /** Taken from [scheduler-polyfill](https://github.com/GoogleChromeLabs/scheduler-polyfill) */
  scheduler: typeof scheduler;
  /**
   * Groups members of an iterable according to the return value of the passed callback.
   * @param items An iterable.
   * @param keySelector A callback which will be invoked for each item in items.
   */
  groupBy<K extends PropertyKey, T>(
    items: Iterable<T>,
    keySelector: (item: T, index: number) => K
  ): Partial<Record<K, T[]>>;
}

export class Safe {
  public constructor();
  public _self: safeHandles | null;
}

export interface Translations {
  createdby: string;
  name: string;
  daily_installs: string;
  close: string;
  filterA: string;
  max: string;
  min: string;
  search: string;
  search_placeholder: string;
  install: string;
  issue: string;
  version_number: string;
  updated: string;
  total_installs: string;
  ratings: string;
  good: string;
  ok: string;
  bad: string;
  created_date: string;
  redirect: string;
  filter: string;
  dtime: string;
  save: string;
  reset: string;
  preview_code: string;
  saveFile: string;
  newTab: string;
  applies_to: string;
  license: string;
  no_license: string;
  antifeatures: string;
  userjs_fullscreen: string;
  listing_none: string;
  export_config: string;
  export_theme: string;
  import_config: string;
  import_theme: string;
  code_size: string;
  prmpt_css: string;
  userjs_inject: string;
  userjs_close: string;
  userjs_sync: string;
  userjs_autoinject: string;
  auto_fetch: string;
}

export interface LanguageTranslations {
  ar: Translations;
  de: Translations;
  en: Translations;
  en_GB: Translations;
  es: Translations;
  fr: Translations;
  ja: Translations;
  nl: Translations;
  pl: Translations;
  ru: Translations;
  zh: Translations;
  zh_CN: Translations;
  zh_TW: Translations;
}

// export declare const translations: LanguageTranslations;

export declare function i18n$<K extends keyof Translations>(
  key: string
): Translations[K] | 'Unknown';

/**
 * Some sites will alter or remove document functions
 * To get around this we bind them to the `userjs` object
 *
 * This method is based on uBlock Origin [scriptlets.js](https://github.com/gorhill/uBlock/blob/master/assets/resources/scriptlets.js)
 */
export declare function safeSelf(): safeHandles;

export declare function loadCSS(css: string, name: string): HTMLStyleElement | undefined;

export declare function observe<E extends Node>(
  element: E,
  listener: MutationCallback,
  options: MutationObserverInit
): MutationObserver;

/**
 * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
 * @param url Specifies a MIME type for the document.
 *
 * [Violentmonkey Reference](https://violentmonkey.github.io/api/gm/#gm_openintab)
 *
 * [Greasespot Reference](https://wiki.greasespot.net/GM.openInTab)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/open)
 */
export declare function openTab(url: string | URL): WindowProxy | null;

export interface StorageSystem {
  prefix: string;
  events: Set<Function | number>;
  /**
   * Alias of `window.localStorage.getItem`
   */
  getItem<K extends string>(key: K): string | null;

  has<K extends string>(key: K): boolean;

  /**
   * Alias of `window.localStorage.setItem`
   */
  setItem<K extends string, V extends string>(key: K, value: V): void;

  /**
   * Alias of `window.localStorage.removeItem`
   */
  remove<K extends string>(key: K): void;

  addListener<T>(name: string, callback: VMScriptGMValueChangeCallback<T>): number | void;

  attach(): void;

  /**
   * Set value - Saves key to either GM managed storage or `window.localStorage`
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_setvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  setValue<K extends string, V>(key: K, v: V): Promise<void>;

  /**
   * Get value
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_getvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  getValue<K extends string, D>(key: K, def?: D): Promise<D>;
}

export interface Network {
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest)
   *
   * [XMLHttpRequest MDN Reference](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest)
   *
   * [Fetch MDN Reference](https://developer.mozilla.org/docs/Web/API/Fetch_API)
   */
  req<T = string | Blob | ArrayBuffer | Document | object | Response>(
    url: RequestInfo | URL,
    method: Request['method'],
    responseType: VMScriptResponseType,
    data: VMScriptGMXHRDetails<T> | RequestInit,
    useFetch: boolean
  ): Promise<T>;
  format(bytes: number, decimals: number): string;
  sizes: string[];
  xmlRequest<T = string | Blob | ArrayBuffer | Document | object | Response>(
    details: VMScriptGMXHRDetails<T> | RequestInit
  ): Promise<T | typeof GM_xmlhttpRequest<T>>;
  bscStr<S extends string>(str: S, lowerCase: boolean): S;
}
//#region Testing crap
export class Timeout {
  public constructor();
  public ids: number[];
  public set<R>(delay: number, reason?: R): Promise<void|R>;
  public clear(...ids: number[]): void;
}
export class Tabs {
  public constructor(root: HTMLElement);
  public pool: Set<HTMLElement>;
  public blank: 'about:blank';
  public protocal: 'mujs:';
  public protoReg: RegExp;
  public el: {
    add: HTMLElement;
    head: HTMLElement;
    root: HTMLElement;
  };
  public custom: () => void;
  public getTab<S extends string>(hostname: S): HTMLElement | undefined;
  public getActive(): HTMLElement | undefined;
  public intFN<S extends string>(hostname: S): void;
  public active<T extends HTMLElement>(tab: T, build?: boolean): void;
  public close<T extends HTMLElement>(tab: T): void;
  public create(hostname?: string): HTMLElement | undefined;
}

export interface mujsName extends HTMLTableCellElement {
  _mujs: {
    fmore: HTMLElement;
    fBtns: HTMLElement;
    codeArea: HTMLTextAreaElement;
  }
}

export interface cfgpage extends HTMLElement {
  _mujs: {
    base: {
      text: string;
      tag: string;
      value: string;
      type: HTMLInputElement['type'];
      attrs: object;
      default: string | boolean | number | UserJSEngine | FilterLayout;
      cache: string | boolean | number | UserJSEngine | FilterLayout;
      elem: HTMLInputElement | HTMLSelectElement;
      elemUrl?: HTMLInputElement;
      elemToken?: HTMLInputElement;
    }[];
    sections: Set<HTMLElement>;
  }
}

export class Container {
  public static prompts: HTMLElement[];
  public webpage: URL;
  public host: string;
  public domain: string;
  public ready: boolean;
  public injected: boolean;
  public shadowRoot?: ShadowRoot;
  public shadowSupport: boolean;
  public frame: HTMLElement;
  public hostCache?: Map<string, HTMLElement>;
  public userjsCache: Map<number, GSForkQuery>;
  public root: HTMLElement;
  public unsaved: boolean;
  public isBlacklisted: boolean;
  public rebuild: boolean;
  public opacityMin: string;
  public opacityMax: string;
  public elementsReady?: boolean;
  public timeouts?: {
    frame: Timeout;
    mouse: Timeout;
  };
  public Tabs?: Tabs;
  public mainframe?: HTMLElement;
  public countframe?: HTMLElement;
  public mainbtn?: HTMLElement;
  public urlBar?: HTMLInputElement;
  public rateContainer?: HTMLElement;
  public footer?: HTMLElement;
  public tabbody?: HTMLElement;
  public promptElem?: HTMLElement;
  public toolbar?: HTMLElement;
  public table?: HTMLTableElement;
  public tabhead?: HTMLTableSectionElement;
  public header?: HTMLElement;
  public tbody?: HTMLTableSectionElement;
  public cfgpage: cfgpage;
  public main?: HTMLElement;
  public urlContainer?: HTMLElement;
  public btnframe?: HTMLElement;
  public btnHandles?: HTMLElement;
  public btnHide?: HTMLElement;
  public btnfullscreen?: HTMLElement;
  public closebtn?: HTMLElement;
  public btncfg?: HTMLElement;
  public btnhome?: HTMLElement;
  public btnissue?: HTMLElement;
  public btngreasy?: HTMLElement;
  public btnnav?: HTMLElement;
  public injFN?: () => void;
  public inject(callback: (this: this, shadowRoot: this['shadowRoot']) => any, doc?: Document): void;
  public initFn(): void;
  public init(): boolean;
  public remove(): void;
  public save(): Promise<config>;
  /**
   * @param css - CSS to inject
   * @param name - Name of stylesheet
   * @return Style element
   */
  public loadCSS<C extends string, N extends string>(css: C, name?: N): HTMLStyleElement | undefined;
  public checkBlacklist<S extends string>(str: S): boolean;
  public setTheme(): void;
  public makePrompt<S extends string>(txt: S, dataset?: {}, usePrompt?: boolean): HTMLElement;
  public showError<E extends string | Error>(...ex: E[]): void;
  public refresh(): void;
  /**
   * Redirects sleazyfork userscripts from greasyfork.org to sleazyfork.org
   *
   * Taken from: https://greasyfork.org/scripts/23840
   */
  public redirect(): void;
  public timeoutFrame<N extends number>(time?: N): Promise<void>;
  public toElem(): HTMLElement[];
  public [Symbol.iterator](): Generator<GSForkQuery, void, undefined>;
}

export class List {
  public constructor(hostname?: string);
  private intEngines: UserJSEngine[];
  private intHost: string;
  public dispatch(ujs: GSForkQuery): void;
  public get engines(): UserJSEngine[];
  public get host(): string;
  public setEngines<E extends UserJSEngine>(engines?: E[]): E[];
  public setHost<S extends string>(hostname: S): S;
  public getDomain<S extends string>(str?: S): S;
  public build(): void;
  public sortRecords(): void;
  public groupBy(): Record<any, any[]>;
  public [Symbol.iterator](): Generator<GSForkQuery, void, undefined>;
}
//#endregion

declare global {
  let translations: {
    [i18n: string]: string;
  };
  let userjs: {
    /**
     * this should always be `true` otherwise the script won't execute
     */
    UserJS: boolean;
    isMobile?: boolean;
  };
}
