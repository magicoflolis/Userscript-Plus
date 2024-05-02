// import GM from '@types/greasemonkey';
// import '@types/tampermonkey';
import '@violentmonkey/types';

/**
 * Some sites will alter or remove document functions
 * To get around this we bind them to the `userjs` object
 *
 * This method is based on uBlock Origin `scriptlets.js` file
 *
 * [Source Code](https://github.com/gorhill/uBlock/blob/master/assets/resources/scriptlets.js)
 */
export declare function safeSelf(): {
  XMLHttpRequest: typeof XMLHttpRequest;
  createElement: typeof document.createElement;
  createElementNS: typeof document.createElementNS;
  createTextNode: typeof document.createTextNode;
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
};

export declare function hasOwn(...args: any[]): boolean;

export declare function objToStr<O>(obj: O): string;

export declare function strToURL(str: string): URL;

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
  toQuery: boolean,
  root: Element | Document
): T[];

export declare function halt(evt: Event): void;

interface UserJSTagNameMap extends HTMLElementTagNameMap {
  "count-frame": HTMLElement;
  "mu-js": HTMLElement;
  "mu-jsbtn": HTMLElement; // wtf y did I do this to myself
  "mujs-a": HTMLElement;
  "mujs-addtab": HTMLElement;
  "mujs-body": HTMLElement;
  "mujs-btn": HTMLElement;
  "mujs-column": HTMLElement;
  "mujs-elem": HTMLElement;
  "mujs-header": HTMLElement;
  "mujs-host": HTMLElement;
  "mujs-jsbtn": HTMLElement; // wtf y did I do this to myself
  "mujs-main": HTMLElement;
  "mujs-root": HTMLElement;
  "mujs-row": HTMLElement;
  "mujs-section": HTMLElement;
  "mujs-tabs": HTMLElement;
  "mujs-tab": HTMLElement;
  "mujs-toolbar": HTMLElement;
  "mujs-url": HTMLElement;

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
  listener: (this: E, ev: HTMLElementEventMap[K]) => any,
  options?: AddEventListenerOptions | boolean
): void;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends HTMLElement>(selector: string, root: E): E | null;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends HTMLElement>(selectors: string, root: E): NodeListOf<E>;

/**
 * Form Attributes of Element
 * @template { keyof UserJSTagNameMap } K
 * @param { K } elem
 * @param { keyof HTMLElement } attr
 */

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
export declare function make<K extends keyof UserJSTagNameMap>(
  tagName: K,
  cname: string,
  attrs: keyof HTMLElement
): UserJSTagNameMap[K];

export declare function loadCSS(css: string, name: string): HTMLStyleElement | undefined;

export declare function observe<E extends Node>(
  element: E,
  listener: MutationCallback,
  options: MutationObserverInit
): MutationObserver;

export declare function setObj<X, Y>(objA: X, objB: Y): Y;

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

/**
 * Get information about the current userscript.
 *
 * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_info)
 */
export declare function getGMInfo(): typeof GM_info;

export interface StorageSystem {
  /**
   * Alias of `window.localStorage.getItem`
   */
  getItem(key: string): string | null;

  has(key: string): boolean;

  /**
   * Alias of `window.localStorage.setItem`
   */
  setItem(key: string, value: string): void;

  /**
   * Alias of `window.localStorage.removeItem`
   */
  remove(key: string): void;

  /**
   * Set value - Saves key to either GM managed storage or `window.localStorage`
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_setvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  setValue(key: string, v: object): Promise<void>;

  /**
   * Get value
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_getvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  getValue<D extends {}>(key: string, def?: D): Promise<D>;
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
  xmlRequest<T = string | Blob | ArrayBuffer | Document | object | Response>(
    details: VMScriptGMXHRDetails<T> | RequestInit
  ): Promise<T | typeof GM_xmlhttpRequest<T>>;
  bscStr<S extends string>(str: S, lowerCase: boolean): S;
}
