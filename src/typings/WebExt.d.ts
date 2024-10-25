/**
 * Prefix for `document.querySelector()` w/ Promise
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function query<E extends HTMLElement, S extends string>(selector: S, root: E): Promise<E | null>;