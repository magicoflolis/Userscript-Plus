export type UserJSMeta = {
  name?: string;
  description?: string;
  namespace?: string;
  icon?: string;
  match?: string[];
  'exclude-match'?: string[];
  include?: string[];
  exclude?: string[];
  version?: string;
  'run-at'?: string;
  noframes?: boolean;
  grant?: string[];
  downloadURL?: string;
  supportURL?: string;
  homepageURL?: string;
  license?: string;
  resource?: {
    [name: string]: string;
  };
  require?: string[];
  'inject-into'?: string;
  unwrap?: boolean;
  'top-level-await'?: boolean;
  [key: string]: any;
};

export type GSForkQuery = {
  id: number;
  created_at: string;
  daily_installs: number;
  total_installs: number;
  code_updated_at: string;
  support_url: string;
  fan_score: string;
  namespace: string;
  contribution_url: any;
  contribution_amount: any;
  good_ratings: number;
  ok_ratings: number;
  bad_ratings: number;
  users: {
    id: number;
    name: string;
    url: string;
  }[];
  name: string;
  description: string;
  url: string;
  code_url: string;
  license: string;
  version: string;
  locale: string;
  deleted: boolean;
  _mujs: {
    info: {
      engine: UserJSEngine;
      host?: string;
    };
    code: {
      antifeatures: string[];
      data?: string;
      code_size?: string[];
      translated?: boolean;
      grant: string[];
      match: string[];
      meta: UserJSMeta | null;
      request(): Promise<GSForkQuery['_mujs']['code']>;
    };
    root?: HTMLTableRowElement;
  };
};

export type GSFork = {
  model: 'Script';
  term: string;
  options: {
    fields: string[];
    boost_by: string[];
    where: {
      script_type: number;
      locale: number;
      site_application_id: number;
      available_as_js: boolean;
    };
    order: { daily_installs: string };
    page: number;
    per_page: number;
    includes: string[];
  };
  query: GSForkQuery[];
};

export type UserJSEngine = {
  enabled: boolean;
  name: string;
  url: string;
  token?: string;
  query?: string;
};

export interface FilterLayout {
  enabled: boolean;
  name: string;
  flag?: string;
  regExp: string;
}

export interface Filters extends FilterLayout {
  reg: RegExp;
  keyReg: RegExp;
  valueReg: RegExp;
}

export type config = {
  /**
   * List sorting on load
   */
  autoSort: string;
  /**
   * Fetch from engines on load
   */
  autofetch: boolean;
  /**
   * Inject list on load
   */
  autoinject: boolean;
  /**
   * Clear cache on tab close
   */
  clearTabCache: boolean;
  /**
   * `UserScript:` Sync config with UserScript manager
   */
  cache?: boolean;
  /**
   * Fetch all UserScript code on load
   */
  codePreview: boolean;
  /**
   * `UserScript:` Fullscreen list on load
   */
  autoexpand?: boolean;
  /**
   * Filter UserScripts that match `navigator.language`
   */
  filterlang: boolean;
  /**
   * Redirect UserScript from GreasyFork to SleazyFork
   */
  sleazyredirect: boolean;
  /**
   * `UserScript:` Miliseconds before list closes
   */
  time?: number;
  /**
   * Webpage and host blacklist
   */
  blacklist:
    | string[]
    | {
        enabled: boolean;
        regex: boolean;
        flags: string;
        name: string;
        url: string | string[];
      }[];
  /**
   * Search engines
   */
  engines: UserJSEngine[];
  /**
   * Menu theme
   */
  theme: {
    'even-row': string;
    'odd-row': string;
    'even-err': string;
    'odd-err': string;
    'background-color': string;
    'gf-color': string;
    'sf-color': string;
    'border-b-color': string;
    'gf-btn-color': string;
    'sf-btn-color': string;
    'sf-txt-color': string;
    'txt-color': string;
    'chck-color': string;
    'chck-gf': string;
    'chck-git': string;
    'chck-open': string;
    placeholder: string;
    'position-top': string;
    'position-bottom': string;
    'position-left': string;
    'position-right': string;
    'font-family': string;
    // [key: string ]: string;
  };
  /**
   * Highlight UserScripts recommended by the author or UserScripts created by the author
   */
  recommend: {
    author: boolean;
    others: boolean;
  };
  /**
   * Taken from https://greasyfork.org/scripts/12179
   */
  filters: {
    ASCII: FilterLayout;
    Latin: FilterLayout;
    Games: FilterLayout;
    SocialNetworks: FilterLayout;
    Clutter: FilterLayout;
  };
};

export declare function objToStr<O>(obj: O): string;

/**
 * Object is typeof `RegExp`
 */
export declare function isRegExp<O>(obj: O): boolean;

/**
 * Object is typeof `Element`
 */
export declare function isElem<O>(obj: O): boolean;

/**
 * Object is typeof `object` / JSON Object
 */
export declare function isObj<O>(obj: O): boolean;

/**
 * Object is typeof `Function`
 */
export declare function isFN<O>(obj: O): boolean;

/**
 * Object is `null` or `undefined`
 */
export declare function isNull<O>(obj: O): boolean;

/**
 * Object is Blank
 */
export declare function isBlank<O>(obj: O): boolean;

/**
 * Object is Empty
 */
export declare function isEmpty<O>(obj: O): boolean;

/**
 * Type is not 100% accurate
 */
export declare function normalizeTarget<T>(
  target: T,
  toQuery?: boolean,
  root?: Document | Element
): T[];
// export declare function normalizeTarget<T>(
//   target: T,
//   toQuery?: boolean,
//   root?: Document | Element
// ): T[];

export declare function halt(evt: Event): void;

declare global {
  interface HTMLElementTagNameMap {
    'main-userjs': HTMLElement;
    'count-frame': HTMLElement;
    'mu-js': HTMLElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mu-jsbtn': HTMLElement; // wtf y did I do this to myself
    /**
     * Made to "look like" a `HTMLAnchorElement`
     */
    'mujs-a': HTMLElement;
    'mujs-addtab': HTMLElement;
    'mujs-body': HTMLElement;
    /**
     * Made to "look like" a `HTMLButtonElement`
     */
    'mujs-btn': HTMLElement; // wtf y did I do this to myself
    'mujs-column': HTMLElement;
    'mujs-elem': HTMLElement;
    'mujs-header': HTMLElement;
    'mujs-host': HTMLElement;
    'mujs-main': HTMLElement;
    'mujs-root': HTMLElement;
    'mujs-row': HTMLElement;
    'mujs-section': HTMLElement;
    'mujs-tabs': HTMLElement;
    'mujs-tab': HTMLElement;
    'mujs-toolbar': HTMLElement;
    'mujs-url': HTMLElement;
  }
}

/**
 * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
 *
 * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
 *
 * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
 *
 * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
 *
 * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
 *
 * If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.
 *
 * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
 */
export declare function ael<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  el: E,
  type: K,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean
): void;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends HTMLElement, S extends string>(selector: S, root: E): E | null;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends HTMLElement, S extends string>(
  selectors: S,
  root: E
): ReturnType<E['querySelectorAll']>;

/**
 * Set attributes for an element.
 */
export declare function formAttrs<E extends HTMLElement>(elem: E, attr: keyof E): E;

/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of an element.
 * @param cname A className for the element.
 * @param attrs Set attributes for the element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
 */
export declare function make<
  K extends keyof HTMLElementTagNameMap,
  A extends keyof HTMLElementTagNameMap[K]
>(
  tagName: K,
  cname?: string | {
    [key in A]: Record<string, unknown>;
  },
  attrs?: {
    [key in A]: Record<string, unknown>;
  }
): HTMLElementTagNameMap[K];

/**
 * Based on uBlock Origin by Raymond Hill (https://github.com/gorhill/uBlock)
 *
 * [uBlock Origin Reference](https://github.com/gorhill/uBlock/blob/master/src/js/dom.js)
 */
export interface dom {
  attr<T extends HTMLElement, A extends string, V extends unknown>(
    target: T,
    attr: A,
    value?: V
  ): V extends ReturnType<T['getAttribute']> ? V : void;
  prop<T extends HTMLElement, P extends keyof T, V extends T[keyof T]>(
    target: T,
    prop: P,
    value?: V
  ): V | undefined;
  text<T extends HTMLElement, V extends unknown>(target: T, text?: V): string | null | undefined;
  cl: {
    add<T extends HTMLElement>(target: T, token: string | string[]): boolean;
    remove<T extends HTMLElement>(target: T, token: string | string[]): boolean;
    toggle<T extends HTMLElement>(target: T, token: string | string[], force?: boolean): boolean;
    has<T extends HTMLElement>(target: T, token: string | string[]): boolean;
  };
}
