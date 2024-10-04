'use strict';
import { err, log, info } from './logger.js';
import { dom, normalizeTarget, qs, qsA } from './querySelector.js';
let cfg = {};

const { hermes, ael, make, isBlank, isNull, isEmpty, isObj, reqCode, parse_meta } = userjs;
const hasOwn = Object.hasOwn || Object.prototype.hasOwnProperty.call;

// Lets highlight me :)
const authorID = 166061;
// Some UserJS I personally enjoy
const goodUserJS = [
  423001,
  376510,
  23840,
  40525,
  6456,
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js',
  'https://github.com/jesus2099/konami-command/raw/master/INSTALL-USER-SCRIPT.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.user.js'
];
class Memorize {
  constructor() {
    /** @type { Map<string, Map<string, any>> } */
    this.cache = new Map();
  }
  /**
   * @template { string } S
   * @param { ...S } maps
   * @returns { S | S[] }
   */
  create(...maps) {
    const resp = [];
    for (const key of maps) {
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      this.cache.set(key, new Map());
      resp.push(this.cache.get(key));
    }
    return resp.length >= 2 ? resp : resp[0];
  }
}
const memory = new Memorize();
const memorized = memory.cache;
memory.create('cfg', 'container', 'userjs');

const iconSVG = {
  cfg: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="currentColor"></path></g>'
  },
  close: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" fill="currentColor"></path></g>'
  },
  filter: {
    viewBox: '0 0 24 24',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="currentColor"/></g>'
  },
  fsClose: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z" fill="currentColor"></path> <path d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z" fill="currentColor"></path> <path d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z" fill="currentColor"></path> <path d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z" fill="currentColor"></path></g>'
  },
  fsOpen: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z" fill="currentColor"></path> <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z" fill="currentColor"></path> <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z" fill="currentColor"></path> <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z" fill="currentColor"></path></g>'
  },
  fullscreen: {
    viewBox: '0 0 96 96',
    html: '<g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g>'
  },
  gf: {
    viewBox: '0 0 510.4 510.4',
    html: '<g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g>'
  },
  gh: {
    viewBox: '0 0 16 16',
    html: '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>'
  },
  hide: {
    viewBox: '0 0 24 24',
    html: '<g> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5L21 10.5C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="currentColor"></path></g>'
  },
  install: {
    viewBox: '0 0 16 16',
    html: '<g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g>'
  },
  issue: {
    viewBox: '0 0 24 24',
    html: '<path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/>'
  },
  nav: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="currentColor"></path> <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="currentColor"></path><path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="currentColor"></path></g>'
  },
  plus: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="currentColor"/></g>'
  },
  search: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill="currentColor"/></g>'
  },
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  refresh: {
    viewBox: '0 0 1024 1024',
    fill: 'currentColor',
    html: '<path d="M981.314663 554.296783a681.276879 681.276879 0 0 1-46.986468 152.746388q-105.706098 230.734238-360.983096 242.19829a593.06288 593.06288 0 0 1-228.689008-33.853939v-1.022615l-31.808709 79.979258a55.759429 55.759429 0 0 1-20.506122 22.551352 40.043451 40.043451 0 0 1-21.04434 5.382184 51.076928 51.076928 0 0 1-19.483507-5.382184 95.210839 95.210839 0 0 1-13.347817-7.158305 52.314831 52.314831 0 0 1-5.382184-4.628679L71.671707 731.908862a57.427906 57.427906 0 0 1-7.158305-21.528737 46.932646 46.932646 0 0 1 1.022615-17.438277 35.952991 35.952991 0 0 1 7.158305-13.347816 74.435608 74.435608 0 0 1 10.279972-10.279972 60.495751 60.495751 0 0 1 11.248765-7.373593 50.431066 50.431066 0 0 1 8.18092-3.606063 6.189512 6.189512 0 0 0 3.067845-1.776121l281.003839-74.866183a91.497132 91.497132 0 0 1 35.899168-2.583448 122.337047 122.337047 0 0 1 22.174599 6.404799 21.528737 21.528737 0 0 1 12.325202 12.325202 76.157907 76.157907 0 0 1 4.628679 14.854829 47.63233 47.63233 0 0 1 0 14.370431 55.167388 55.167388 0 0 1-2.04523 10.764369 10.764368 10.764368 0 0 0-1.022615 3.606063l-32.831324 79.979258a677.50935 677.50935 0 0 0 164.264262 39.505232q77.395809 7.696523 131.809692-3.606063a358.507291 358.507291 0 0 0 101.023598-36.921784 381.27393 381.27393 0 0 0 73.951211-50.753997 352.64071 352.64071 0 0 0 48.708767-55.382676 410.391547 410.391547 0 0 0 26.910921-41.550462c3.767529-7.481236 6.673908-13.616926 8.719139-18.460892zM40.885614 449.667121a685.69027 685.69027 0 0 1 63.563595-176.427998q118.0313-212.273346 374.330913-207.160271a571.803252 571.803252 0 0 1 207.160271 39.989629l33.853939-78.956643A75.619688 75.619688 0 0 1 735.187378 9.189165a37.67529 37.67529 0 0 1 15.393047-8.234742 42.303968 42.303968 0 0 1 14.854829-0.538219 47.578509 47.578509 0 0 1 13.347817 3.606064 102.907362 102.907362 0 0 1 11.302586 6.13569 49.569917 49.569917 0 0 1 6.673909 4.628678l3.067845 3.067845 154.84544 276.913379a81.970666 81.970666 0 0 1 6.13569 22.712817 46.986468 46.986468 0 0 1-1.022615 17.438277 32.293105 32.293105 0 0 1-7.696523 13.347817 69.322533 69.322533 0 0 1-10.764369 9.741753 92.142994 92.142994 0 0 1-11.302587 6.673909l-8.18092 4.09046a7.104483 7.104483 0 0 1-3.067845 1.022615l-283.049068 67.546412a112.003254 112.003254 0 0 1-46.125319-1.022615c-11.571696-3.390776-19.160576-8.019454-22.551352-13.832214a41.173709 41.173709 0 0 1-5.382184-21.04434 97.256069 97.256069 0 0 1 1.291724-17.438277 24.381295 24.381295 0 0 1 3.067845-8.234742L600.632773 296.81309a663.730958 663.730958 0 0 0-164.102797-43.057474q-77.987849-9.203535-131.809692 0a348.227319 348.227319 0 0 0-101.292707 33.853938 368.571976 368.571976 0 0 0-75.350579 49.246986 383.31916 383.31916 0 0 0-50.269601 54.360061 408.507783 408.507783 0 0 0-28.740863 41.012244A113.025869 113.025869 0 0 0 40.885614 449.667121z m0 0" fill="#ffffff" p-id="2275"></path>'
  },
  load(type, container) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svgElem = document.createElementNS(xmlns, 'svg');
    for (const [k, v] of Object.entries(iconSVG[type])) {
      if (k === 'html') {
        continue;
      }
      svgElem.setAttributeNS(null, k, v);
    }
    if (typeof iconSVG[type].html === 'string') {
      svgElem.innerHTML = iconSVG[type].html;
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};
const i18n$ = (txt) => webext.i18n.getMessage(txt);

const main = qs('mujs-main');
const cfgpage = qs('.mujs-cfg');
// const tbody = qs('.mujs-body');
const footer = qs('.mujs-footer');
const gfcounter = qs('count-frame[data-counter="gsfork"]');
const sfcounter = qs('count-frame[data-counter="custom"]');
const rateContainer = qs('.rate-container');

const table = qs('table');
const tabbody = qs('tbody');
const tabhead = qs('thead');

const urlBar = qs('.mujs-url-bar');
urlBar.placeholder = i18n$('search_placeholder');
const btncfg = qs('mujs-btn.settings');
const btngreasy = qs('mujs-btn.greasy');
const btnissue = qs('mujs-btn.issue');
const btnhome = qs('mujs-btn.github');

// const header = qs('mujs-header');
const toolbar = qs('mujs-toolbar');

const promptElem = make('mujs-row', 'mujs-prompt');
main.append(promptElem);

const makeTHead = (rows) => {
  const tr = make('tr');
  for (const r of normalizeTarget(rows)) {
    const tparent = make('th', r.class ?? '', r);
    tr.append(tparent);
  }
  tabhead.append(tr);
  table.append(tabhead, tabbody);
};
makeTHead([
  {
    class: 'mujs-header-name',
    textContent: i18n$('name')
  },
  {
    textContent: i18n$('createdby')
  },
  {
    textContent: i18n$('daily_installs')
  },
  {
    textContent: i18n$('updated')
  },
  {
    textContent: i18n$('install')
  }
]);

const renderTheme = (theme) => {
  theme = theme || cfg.theme;
  if (isEmpty(theme)) {
    return;
  }
  // if (theme === defcfg.theme) {
  //   return;
  // }
  const sty = qs('mujs-root').style;
  for (const [k, v] of Object.entries(theme)) {
    const str = `--mujs-${k}`;
    const prop = sty.getPropertyValue(str);
    if (isEmpty(v)) {
      theme[k] = prop;
    }
    if (prop === v) {
      continue;
    }
    sty.removeProperty(str);
    sty.setProperty(str, v);
  }
};
const cfgMap = memorized.get('cfg');
const rebuildCfg = () => {
  for (const engine of cfg.engines) {
    if (cfgMap.has(engine.name)) {
      const inp = cfgMap.get(engine.name);
      inp.checked = engine.enabled;
      if (engine.name === 'github') {
        const txt = cfgMap.get('github-token');
        dom.prop(txt, 'value', engine.token);
      }
    }
  }
  for (const [k, v] of Object.entries(cfg)) {
    if (typeof v === 'boolean') {
      if (cfgMap.has(k)) {
        const inp = cfgMap.get(k);
        if (inp.type === 'checkbox') {
          inp.checked = v;
        } else {
          dom.prop(inp, 'value', v);
        }
      }
    }
  }
  dom.prop(cfgMap.get('blacklist'), 'value', JSON.stringify(cfg.blacklist, null, ' '));
  dom.prop(cfgMap.get('theme'), 'value', JSON.stringify(cfg.theme, null, ' '));
  renderTheme(cfg.theme);
};
const getHost = (str = '') => {
  return str.split('.').splice(-2).join('.');
};
const ContainerHandler = class {
  constructor() {
    this.showError = this.showError.bind(this);
    // this.cleanup = this.cleanup.bind(this);
    try {
      this.webpage = new URL(window.top.document.location.href);
    } catch (ex) {
      err(ex, { cause: 'ContainerHandler' });
      this.webpage = window.location;
    }
    this.host = getHost(this.webpage.hostname);
    this.cache = memorized.get('container');
    this.userjsCache = memorized.get('userjs');
    this.unsaved = false;
    this.isBlacklisted = false;
    this.rebuild = false;
    this.forkCount = 0;
    this.customCount = 0;
  }

  checkBlacklist(str) {
    str = str || this.host;
    let blacklisted = false;
    for (const b of cfg.blacklist.filter((b) => b.enabled)) {
      if (b.regex === true) {
        const reg = new RegExp(b.url, b.flags);
        if (!reg.test(str)) continue;
        blacklisted = true;
      }
      if (Array.isArray(b.url)) {
        for (const c of b.url) {
          if (!str.includes(c)) continue;
          blacklisted = true;
        }
      }
      if (!str.includes(b.url)) continue;
      blacklisted = true;
    }
    if (blacklisted) {
      this.showError('Blacklisted');
    }
    this.isBlacklisted = blacklisted;
    return blacklisted;
  }

  addCustomCnt(cnt) {
    this.customCount += cnt;
    this.updateCounters();
  }

  addForkCnt(cnt) {
    this.forkCount += cnt;
    this.updateCounters();
  }

  updateCounters() {
    dom.text(sfcounter, this.customCount);
    dom.text(gfcounter, this.forkCount);
    webext.browserAction.setBadgeText({
      text: `${this.forkCount + this.customCount}`
    });
  }

  makePrompt(txt, dataset = {}, usePrompt = true) {
    if (qs('.prompt', promptElem)) {
      for (const elem of qsA('.prompt', promptElem)) {
        if (elem.dataset.prompt) {
          elem.remove();
        }
      }
    }
    const el = make('mu-js', 'prompt', {
      dataset: {
        prompt: txt
      }
    });
    const elHead = make('mu-js', 'prompt-head', {
      innerHTML: `${iconSVG.load('refresh')} ${txt}`
    });
    el.append(elHead);
    if (usePrompt) {
      const elPrompt = make('mu-js', 'prompt-body', { dataset });
      const elYes = make('mujs-btn', 'prompt-confirm', {
        innerHTML: 'Confirm',
        dataset: {
          command: 'prompt-confirm'
        }
      });
      const elNo = make('mujs-btn', 'prompt-deny', {
        innerHTML: 'Deny',
        dataset: {
          command: 'prompt-deny'
        }
      });
      elPrompt.append(elYes, elNo);
      el.append(elPrompt);
    }
    promptElem.append(el);
  }

  save() {
    this.unsaved = false;
    // MU.storage.setValue('Config', cfg);
    info('Saved:', cfg);
  }

  showError(...ex) {
    err(...ex);
    const error = make('mu-js', 'error');
    let str = '';
    for (const e of ex) {
      str += `${typeof e === 'string' ? e : `${e.message} ${e.stack}`}\n`;
    }
    error.appendChild(document.createTextNode(str));
    footer.append(error);
  }

  refresh() {
    urlBar.placeholder = i18n$('newTab');
    this.forkCount = 0;
    this.customCount = 0;
    this.updateCounters();
    dom.prop([tabbody, rateContainer, footer], 'innerHTML', '');
  }
};
const MUJS = new ContainerHandler();

class Tabs {
  constructor() {
    this.Tab = new Map();
    this.blank = 'about:blank';
    this.protocal = 'mujs:';
    this.protoReg = new RegExp(`${this.protocal}(.+)`);
    this.el = {
      add: make('mujs-addtab', '', {
        textContent: '+',
        dataset: {
          command: 'new-tab'
        }
      }),
      head: make('mujs-tabs')
    };
    this.el.head.append(this.el.add);
    toolbar.append(this.el.head);
  }
  hasTab(...params) {
    for (const p of params) {
      if (!this.Tab.has(p)) {
        return false;
      }
      const content = normalizeTarget(this.Tab.get(p)).filter((t) => p === t.dataset.host);
      if (isBlank(content)) {
        return false;
      }
    }
    return true;
  }
  storeTab(host) {
    const h = host ?? this.blank;
    if (!this.Tab.has(h)) {
      this.Tab.set(h, new Set());
    }
    return this.Tab.get(h);
  }
  cache(host, ...tabs) {
    const h = host ?? this.blank;
    const tabCache = this.storeTab(h);
    for (const t of normalizeTarget(tabs)) {
      if (tabCache.has(t)) {
        continue;
      }
      tabCache.add(t);
    }
    this.Tab.set(h, tabCache);
    return tabCache;
  }
  mujs(host) {
    if (!host.startsWith(this.protocal)) {
      return;
    }
    const type = host.match(this.protoReg)[1];
    if (type === 'settings') {
      dom.cl.remove([cfgpage], 'hidden');
      dom.cl.add(table, 'hidden');
      // if (!MUJS.supported) {
      //   dom.attr(MUJS.frame, 'style', 'height: 100%;');
      // }
    }
  }
  active(tab, build = true) {
    for (const t of normalizeTarget(tab, false)) {
      dom.cl.add([cfgpage], 'hidden');
      dom.cl.remove(table, 'hidden');
      dom.cl.remove(qsA('mujs-tab', this.el.head), 'active');
      dom.cl.add(t, 'active');
      if (!build) {
        continue;
      }
      const host = t.dataset.host ?? this.blank;
      if (host === this.blank) {
        MUJS.refresh();
      } else if (host.startsWith(this.protocal)) {
        this.mujs(host);
      } else {
        buildlist(host);
      }
    }
  }
  /** @param { HTMLElement } tab */
  close(tab) {
    for (const t of normalizeTarget(tab, false)) {
      const host = t.dataset.host;
      if (MUJS.cache.has(host)) {
        MUJS.cache.delete(host);
      }
      if (dom.cl.has(t, 'active')) {
        MUJS.refresh();
      }
      const sibling = t.previousElementSibling ?? t.nextElementSibling;
      if (sibling) {
        if (sibling.dataset.command !== 'new-tab') {
          this.active(sibling);
        }
      }
      if (this.Tab.has(host)) {
        this.Tab.delete(host);
      }
      t.remove();
    }
  }
  create(host = undefined) {
    if (typeof host === 'string') {
      if (host.startsWith(this.protocal) && this.hasTab(host)) {
        this.active(this.Tab.get(host));
        return;
      }
      const content = normalizeTarget(this.storeTab(host)).filter((t) => host === t.dataset.host);
      if (!isEmpty(content)) {
        return;
      }
    }
    const tab = make('mujs-tab', '', {
      dataset: {
        command: 'switch-tab'
      },
      style: `order: ${this.el.head.childElementCount};`
    });
    const tabClose = make('mu-js', '', {
      dataset: {
        command: 'close-tab'
      },
      title: i18n$('close'),
      textContent: 'X'
    });
    const tabHost = make('mujs-host');
    tab.append(tabHost, tabClose);
    this.el.head.append(tab);
    this.active(tab, false);
    this.cache(host, tab);
    if (isNull(host)) {
      MUJS.refresh();
      urlBar.placeholder = i18n$('newTab');
      tab.dataset.host = this.blank;
      tabHost.title = i18n$('newTab');
      tabHost.textContent = i18n$('newTab');
    } else if (host.startsWith(this.protocal)) {
      const type = host.match(this.protoReg)[1];
      tab.dataset.host = host || MUJS.host;
      tabHost.title = type || tab.dataset.host;
      tabHost.textContent = tabHost.title;
      this.mujs(host);
    } else {
      tab.dataset.host = host || MUJS.host;
      tabHost.title = host || MUJS.host;
      tabHost.textContent = tabHost.title;
    }
    return tab;
  }
}
const tab = new Tabs();

// const ntHead = qs('mujs-tabs');

const template = {
  id: 0,
  bad_ratings: 0,
  good_ratings: 0,
  ok_ratings: 0,
  daily_installs: 0,
  total_installs: 0,
  name: 'NOT FOUND',
  description: 'NOT FOUND',
  version: '0.0.0',
  url: 'about:blank',
  code_url: 'about:blank',
  created_at: Date.now(),
  code_updated_at: Date.now(),
  users: [
    {
      name: '',
      url: ''
    }
  ]
};
const mkList = (txt = '', obj = {}) => {
  if (!obj.root || !obj.type) {
    return;
  }
  const { root, type } = obj;
  const list = obj.list ?? [];
  const appliesTo = make('mu-js', 'mujs-list', {
    textContent: `${txt}: `
  });
  const applyList = make('mu-js', 'mujs-grants');
  const ujsURLs = make('mujs-column', 'mujs-list', {
    dataset: {
      el: 'matches',
      type
    }
  });
  ujsURLs.append(appliesTo, applyList);
  root.append(ujsURLs);
  if (isEmpty(list)) {
    const elem = make('mujs-a', '', {
      textContent: i18n$('listing_none')
    });
    applyList.append(elem);
    if (type === 'antifeatures') {
      dom.cl.add(ujsURLs, 'hidden');
    }
    return;
  }
  for (const c of list) {
    if (isObj(c)) {
      const elem = make('mujs-a', '', {
        textContent: c.text
      });
      if (c.domain) {
        elem.dataset.command = 'open-tab';
        elem.dataset.webpage = `https://${c.text}`;
      }
      applyList.append(elem);
    } else {
      const elem = make('mujs-a', '', {
        textContent: c
      });
      applyList.append(elem);
    }
  }
  if (type === 'antifeatures') {
    dom.cl.remove(ujsURLs, 'hidden');
  }
};
const toLocaleDate = (str = '') => {
  return new Intl.DateTimeFormat(navigator.language).format(new Date(str));
};
// #region Create UserJS
const createjs = (ujs, engine) => {
  for (const key in template) {
    if (hasOwn(ujs, key)) {
      continue;
    }
    ujs[key] = template[key];
  }
  // Lets not add this UserJS to the list
  if (ujs.id === 421603) {
    return;
  }
  if (!MUJS.userjsCache.has(ujs.id)) {
    MUJS.userjsCache.set(ujs.id, ujs);
  }
  const eframe = make('td', 'install-btn');
  const uframe = make('td', 'mujs-uframe');
  const fdaily = make('td', 'mujs-list', {
    textContent: ujs.daily_installs
  });
  const fupdated = make('td', 'mujs-list', {
    textContent: toLocaleDate(ujs.code_updated_at)
  });
  const fname = make('td', 'mujs-name');
  const fmore = make('mujs-column', 'mujs-list hidden', {
    dataset: {
      el: 'more-info'
    }
  });
  const fBtns = make('mujs-column', 'mujs-list hidden');
  const jsInfo = make('mujs-row', 'mujs-list');
  const jsInfoB = make('mujs-row', 'mujs-list');
  const ratings = make('mujs-column', 'mujs-list');
  const ftitle = make('mujs-a', 'mujs-homepage', {
    textContent: ujs.name,
    title: ujs.url,
    dataset: {
      command: 'open-tab',
      webpage: ujs.url
    }
  });
  const fver = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('version_number')}: ${ujs.version}`
  });
  const fcreated = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('created_date')}: ${toLocaleDate(ujs.created_at)}`
  });
  const flicense = make('mu-js', 'mujs-list', {
    title: ujs.license ?? i18n$('no_license'),
    textContent: `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`,
    style:
      'text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: fit-content; max-width: 20em;'
  });
  const ftotal = make('mu-js', 'mujs-list', {
    textContent: `${i18n$('total_installs')}: ${ujs.total_installs}`
  });
  const fratings = make('mu-js', 'mujs-list', {
    title: i18n$('ratings'),
    textContent: `${i18n$('ratings')}:`
  });
  const fgood = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('good'),
    textContent: ujs.good_ratings,
    dataset: {
      el: 'good'
    }
  });
  const fok = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('ok'),
    textContent: ujs.ok_ratings,
    dataset: {
      el: 'ok'
    }
  });
  const fbad = make('mu-js', 'mujs-list mujs-ratings', {
    title: i18n$('bad'),
    textContent: ujs.bad_ratings,
    dataset: {
      el: 'bad'
    }
  });
  const fdesc = make('mu-js', 'mujs-list mujs-pointer', {
    title: ujs.description,
    textContent: ujs.description,
    dataset: {
      command: 'list-description'
    }
  });
  const scriptInstall = make('mu-jsbtn', 'install', {
    innerHTML: `${iconSVG.load('install')} ${i18n$('install')}`,
    title: `${i18n$('install')} "${ujs.name}"`,
    dataset: {
      command: 'install-script',
      userjs: ujs.code_url
    }
  });
  const scriptDownload = make('mu-jsbtn', '', {
    innerHTML: `${iconSVG.load('install')} ${i18n$('saveFile')}`,
    dataset: {
      command: 'download-userjs',
      userjs: ujs.id,
      userjsName: ujs.name
    }
  });
  const tr = make('tr', 'frame', {
    dataset: {
      scriptId: ujs.id
    }
  });
  const codeArea = make('textarea', 'code-area hidden', {
    dataset: {
      name: 'code'
    },
    rows: '10',
    autocomplete: false,
    spellcheck: false,
    wrap: 'soft'
  });
  const loadCode = make('mu-jsbtn', '', {
    innerHTML: `${iconSVG.load('search')} ${i18n$('preview_code')}`,
    dataset: {
      command: 'load-userjs',
      userjs: ujs.id
    }
  });
  if (engine) {
    tr.dataset.engine = engine;
    if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
      tr.dataset.good = 'upsell';
    }
  }
  for (const u of ujs.users) {
    const user = make('mujs-a', '', {
      innerHTML: u.name,
      title: u.url,
      dataset: {
        command: 'open-tab',
        webpage: u.url
      }
    });
    if (cfg.recommend.author && u.id === authorID) {
      tr.dataset.author = 'upsell';
      dom.prop(user, 'innerHTML', `${u.name} ${iconSVG.load('verified')}`);
    }
    uframe.append(user);
  }
  if (engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.id)) {
    tr.dataset.good = 'upsell';
  }
  eframe.append(scriptInstall);
  ratings.append(fratings, fgood, fok, fbad);
  jsInfo.append(ftotal, ratings, fver, fcreated);
  mkList('Size', {
    list: ujs.code_size,
    type: 'size',
    root: jsInfo
  });

  jsInfoB.append(flicense);
  mkList(i18n$('antifeatures'), {
    list: ujs.antifeatures,
    type: 'antifeatures',
    root: jsInfoB
  });
  mkList(i18n$('applies_to'), {
    list: ujs.code_match,
    type: 'match-urls',
    root: jsInfoB
  });
  mkList('@grant', {
    list: ujs.code_grant,
    type: 'grants',
    root: jsInfoB
  });
  fmore.append(jsInfo, jsInfoB);
  fBtns.append(scriptDownload, loadCode);
  fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

  if (ujs.code_data) {
    codeArea.value = ujs.code_data;
  }

  for (const e of [fname, uframe, fdaily, fupdated, eframe]) {
    tr.append(e);
  }
  tabbody.append(tr);
};
// #endregion
const doInstallProcess = async (installLink) => {
  const jsStr = `
  var evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  var link = document.createElement('a');
  link.href = '${installLink}';
  link.dispatchEvent(evt);
  link.remove();
  `;
  webext.tabs.executeScript(null, { code: jsStr }).catch((ex) => {
    MUJS.showError(ex);
  });
};
ael(main, 'click', async (evt) => {
  try {
    /** @type { HTMLElement } */
    const target = evt.target.closest('[data-command]');
    if (!target) {
      return;
    }
    const prmpt = /prompt-/.test(target.dataset.command);
    let dataset = target.dataset;
    let cmd = dataset.command;
    let prmptChoice = false;
    if (prmpt) {
      dataset = target.parentElement.dataset;
      cmd = dataset.command;
      prmptChoice = /confirm/.test(target.dataset.command);
      target.parentElement.parentElement.remove();
    }
    if (cmd === 'install-script' && dataset.userjs) {
      let installCode = dataset.userjs;
      if (!prmpt && dataset.userjs.endsWith('.user.css')) {
        MUJS.makePrompt('Install as user style?', dataset);
        return;
      } else if (prmpt !== prmptChoice) {
        installCode = dataset.userjs.replace(/\.user\.css$/, '.user.js');
      }
      doInstallProcess(installCode);
    } else if (cmd === 'open-tab' && dataset.webpage) {
      userjs.openInTab(dataset.webpage);
    } else if (cmd === 'navigation') {
      if (dom.cl.has(btngreasy, 'hidden')) {
        dom.cl.remove([btncfg, btngreasy, btnhome, btnissue], 'hidden');
      } else {
        dom.cl.add([btncfg, btngreasy, btnhome, btnissue], 'hidden');
      }
    } else if (cmd === 'list-description') {
      const arr = [];
      const ignoreTags = new Set(['TD', 'MUJS-A', 'MU-JS']);
      for (const node of target.parentElement.childNodes) {
        if (ignoreTags.has(node.tagName)) {
          continue;
        }
        if (node.tagName === 'TEXTAREA' && isEmpty(node.value)) {
          continue;
        }
        arr.push(node);
      }
      if (target.nextElementSibling) {
        arr.push(target.nextElementSibling);
        if (target.nextElementSibling.nextElementSibling) {
          arr.push(target.nextElementSibling.nextElementSibling);
        }
      }
      if (dom.cl.has(arr[0], 'hidden')) {
        dom.cl.remove(arr, 'hidden');
      } else {
        dom.cl.add(arr, 'hidden');
      }
    } else if (cmd === 'show-filter') {
      dom.cl.toggle(qs('.mujs-fltlist').parentElement, 'hidden');
    } else if (cmd === 'save') {
      if (!dom.prop(target, 'disabled')) {
        MUJS.save();
        // sleazyRedirect();
        if (MUJS.rebuild) {
          MUJS.cache.clear();
          buildlist();
        }
        MUJS.unsaved = false;
        MUJS.rebuild = false;
      }
    } else if (cmd === 'reset') {
      // cfg = defcfg;
      MUJS.unsaved = true;
      MUJS.rebuild = true;
      rebuildCfg();
    } else if (cmd === 'settings') {
      if (MUJS.unsaved) {
        MUJS.showError('Unsaved changes');
      }
      tab.create('mujs:settings');
      // if (dom.cl.has(cfgpage, 'hidden')) {
      //   dom.cl.remove(cfgpage, 'hidden');
      //   dom.cl.add(table, 'hidden');
      // } else {
      //   dom.cl.add(cfgpage, 'hidden');
      //   dom.cl.remove(table, 'hidden');
      // }
      MUJS.rebuild = false;
    } else if (cmd === 'new-tab') {
      // newTab();
      tab.create();
    } else if (cmd === 'switch-tab') {
      tab.active(target);
      // dom.cl.add(cfgpage, 'hidden');
      // dom.cl.remove(table, 'hidden');
      // activeTab(target);
    } else if (cmd === 'close-tab' && target.parentElement) {
      tab.close(target.parentElement);
    } else if (cmd === 'download-userjs') {
      if (!MUJS.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const dataUserJS = MUJS.userjsCache.get(+dataset.userjs);
      const txt = await reqCode(dataUserJS);
      if (typeof txt !== 'string') {
        return;
      }
      const makeUserJS = new Blob([txt], { type: 'text/plain' });
      const dlBtn = make('a', 'mujs_Downloader');
      dlBtn.href = URL.createObjectURL(makeUserJS);
      dlBtn.download = `${dataset.userjsName ?? dataset.userjs}.user.js`;
      dlBtn.click();
      URL.revokeObjectURL(dlBtn.href);
      dlBtn.remove();
    } else if (cmd === 'load-userjs') {
      if (!MUJS.userjsCache.has(+dataset.userjs)) {
        return;
      }
      const codeArea = qs('textarea', target.parentElement.parentElement);
      if (!isEmpty(codeArea.value)) {
        dom.cl.toggle(codeArea, 'hidden');
        return;
      }
      const dataUserJS = MUJS.userjsCache.get(+dataset.userjs);
      const txt = await reqCode(dataUserJS);
      if (typeof txt !== 'string') {
        return;
      }
      codeArea.value = txt;
      dom.cl.remove(codeArea, 'hidden');

      const apTo = (name, elem) => {
        if (isEmpty(dataUserJS[name])) {
          const el = make('mujs-a', '', {
            textContent: i18n$('listing_none')
          });
          elem.append(el);
          if (name === 'antifeatures') {
            dom.cl.add(elem, 'hidden');
          }
        } else {
          for (const c of dataUserJS[name]) {
            if (isObj(c)) {
              const el = make('mujs-a', '', {
                textContent: c.text
              });
              if (c.domain) {
                el.dataset.command = 'open-tab';
                el.dataset.webpage = `https://${c.text}`;
              }
              elem.append(el);
            } else {
              const el = make('mujs-a', '', {
                textContent: c
              });
              elem.append(el);
            }
          }
          if (name === 'antifeatures') {
            dom.cl.remove(elem, 'hidden');
          }
        }
      };
      const matchElem = qs(
        '[data-type="match-urls"] > .mujs-grants',
        target.parentElement.parentElement
      );
      const grantElem = qs(
        '[data-type="grants"] > .mujs-grants',
        target.parentElement.parentElement
      );
      const afElem = qs(
        '[data-type="antifeatures"] > .mujs-grants',
        target.parentElement.parentElement
      );
      const sizeElem = qs('[data-type="size"] > .mujs-grants', target.parentElement.parentElement);
      dom.prop([matchElem, grantElem, afElem, sizeElem], 'innerHTML', '');
      apTo('code_match', matchElem);
      apTo('code_grant', grantElem);
      apTo('antifeatures', afElem);
      apTo('code_size', sizeElem);
    } else if (/export-/.test(cmd)) {
      const str = JSON.stringify(cmd === 'export-cfg' ? cfg : cfg.theme, null, ' ');
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
      const dlBtn = make('a', 'mujs-exporter', {
        href: URL.createObjectURL(blob),
        download: `Magic_Userscript_${cmd === 'export-cfg' ? 'config' : 'theme'}.json`
      });
      dlBtn.click();
      URL.revokeObjectURL(dlBtn.href);
    } else if (/import-/.test(cmd)) {
      if (qs('input', target.parentElement)) {
        qs('input', target.parentElement).click();
        return;
      }
      const inpJSON = make('input', 'hidden', {
        type: 'file',
        accept: '.json',
        onchange: (evt) => {
          try {
            [...evt.target.files].forEach((file) => {
              const reader = new FileReader();
              reader.readAsText(file);
              reader.onload = () => {
                const result = JSON.parse(reader.result);
                if (result.blacklist) {
                  log(`Imported config: { ${file.name} }`, result);
                  cfg = result;
                  MUJS.unsaved = true;
                  MUJS.rebuild = true;
                  rebuildCfg();
                  MUJS.save();
                  // sleazyRedirect();
                  MUJS.cache.clear();
                  buildlist();
                  MUJS.unsaved = false;
                  MUJS.rebuild = false;
                } else {
                  log(`Imported theme: { ${file.name} }`, result);
                  cfg.theme = result;
                  renderTheme(cfg.theme);
                }
                inpJSON.remove();
              };
              reader.onerror = () => {
                MUJS.showError(reader.error);
                inpJSON.remove();
              };
            });
          } catch (ex) {
            MUJS.showError(ex);
            inpJSON.remove();
          }
        }
      });
      target.parentElement.append(inpJSON);
      inpJSON.click();
    }
  } catch (ex) {
    MUJS.showError(ex);
  }
});
ael(main, 'auxclick', (evt) => {
  if (evt.button !== 1) {
    return;
  }
  /** @type { HTMLElement } */
  const target = evt.target.closest('[data-command]');
  if (!target) {
    return;
  }
  const dataset = target.dataset;
  const cmd = dataset.command;
  if (cmd === 'switch-tab' || cmd === 'close-tab') {
    tab.close(target);
  } else if (cmd === 'new-tab') {
    tab.create();
  }
});
renderTheme(cfg.theme);
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );
for (const th of tabhead.rows[0].cells) {
  if (dom.text(th) === i18n$('install')) continue;
  dom.cl.add(th, 'mujs-pointer');
  ael(th, 'click', () => {
    /** [Stack Overflow Reference](https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/53880407#53880407) */
    Array.from(tabbody.querySelectorAll('tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
      .forEach((tr) => tabbody.appendChild(tr));
  });
}
ael(urlBar, 'input', (evt) => {
  evt.preventDefault();
  if (urlBar.placeholder === i18n$('newTab')) {
    return;
  }
  const val = evt.target.value;
  if (isEmpty(val)) {
    dom.cl.remove(qsA('tr[data-engine]', tabbody), 'hidden');
    return;
  }
  const reg = new RegExp(val, 'gi');
  const finds = new Set();
  const userjsCache = MUJS.userjsCache;
  for (const [k, v] of userjsCache) {
    const elem = qs(`tr[data-script-id="${k}"]`, tabbody);
    if (!elem) {
      continue;
    }
    if (finds.has(elem)) {
      continue;
    }
    if (v.name && v.name.match(reg)) {
      finds.add(elem);
    }
    if (v.description && v.description.match(reg)) {
      finds.add(elem);
    }
    if (v.code_data) {
      const meta = parse_meta(v.code_data);
      for (const key of Object.keys(meta)) {
        if (/name|desc/i.test(key) && key.match(reg)) {
          finds.add(elem);
        }
      }
    }
  }
  dom.cl.add(qsA('tr[data-engine]', tabbody), 'hidden');
  dom.cl.remove([...finds], 'hidden');
});
ael(urlBar, 'change', (evt) => {
  evt.preventDefault();
  const val = evt.target.value;
  if (urlBar.placeholder === i18n$('newTab') && qs('mujs-tab.active', toolbar)) {
    const tabElem = qs('mujs-tab.active', toolbar);
    const tabHost = qs('mujs-host', tabElem);
    if (val.startsWith('mujs:')) {
      tab.close(tabElem);
      if (tab.hasTab(val)) {
        tab.active(tab.Tab.get(val));
      } else {
        tab.create(val);
      }
      return;
    } else if (val === '*') {
      tabElem.dataset.host = val;
      tabHost.title = '<All Sites>';
      tabHost.textContent = '<All Sites>';
      buildlist(val);
      return;
    }
    const value = getHost(val);
    if (MUJS.checkBlacklist(value)) {
      MUJS.showError(`Host blacklisted "${value}"`);
      return;
    }
    tabElem.dataset.host = value;
    tabHost.title = value;
    tabHost.textContent = value;
    buildlist(value);
    return;
  }
});

async function buildlist(host = undefined) {
  try {
    if (isEmpty(host)) {
      host = MUJS.host;
    }
    if (MUJS.checkBlacklist(host)) {
      return;
    }
    tab.create(host);
    // if (!qs(`mujs-tab[data-host="${host}"]`, ntHead)) {
    //   tab.create(host);
    // }
    MUJS.refresh();
    const data = await webext.runtime.sendMessage({
      location: host
    });
    primaryFN(data);
    urlBar.placeholder = i18n$('search_placeholder');
    urlBar.value = '';
  } catch (ex) {
    err(ex);
  }
}

function primaryFN(data) {
  try {
    if (isEmpty(data)) {
      return;
    }
    for (const tabData of data) {
      const { engine, host } = tabData;
      tab.create(host);
      // if (!qs(`mujs-tab[data-host="${host}"]`, ntHead)) {
      //   tab.create(host);
      // }
      if (engine.name.includes('fork')) {
        MUJS.addForkCnt(tabData.data.length);
      } else {
        MUJS.addCustomCnt(tabData.data.length);
      }
      for (const ujs of tabData.data) {
        createjs(ujs, engine.name);
      }
    }
  } catch (ex) {
    err(ex);
  }
}

hermes.getPort().onMessage.addListener((root = {}) => {
  const m = root.msg;
  if (root.channel === 'Config' && isEmpty(cfg)) {
    cfg = m.cfg || cfg;
  }
});
webext.runtime.sendMessage({}).then(primaryFN);
