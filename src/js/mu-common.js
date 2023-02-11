'use strict';
if (typeof MU === 'undefined') {
  // eslint-disable-next-line no-unused-vars
  let MU = (self.MU = {});
}

if (typeof MU === 'object' && MU.isNull instanceof Function === false) {
  let win = self ?? window,
    doc = win.document;

  Object.assign(MU, {
    Timeout: class Timeout {
      constructor() {
        this.ids = [];
      }
      set = (delay, reason) =>
        new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            Object.is(reason, undefined) ? resolve() : reject(reason);
            this.clear(id);
          }, delay);
          this.ids.push(id);
        });
      wrap = (promise, delay, reason) =>
        Promise.race([promise, this.set(delay, reason)]);
      clear = (...ids) => {
        this.ids = this.ids.filter((id) => {
          if (ids.includes(id)) {
            clearTimeout(id);
            return false;
          }
          return true;
        });
      };
    },
    error: class MUError extends Error {
      /**
       * @param {string} fnName - (Optional) Function name
       * @param {...string} params - Extra error parameters
       */
      constructor(fnName = 'muError', ...params) {
        super(...params);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, MUError);
        } else {
          this.stack = new Error().stack;
        }
        this.fn = `[${fnName}]`;
        this.name = this.constructor.name;
      }
    },
    /**
     * Object is Null
     * @param {Object} obj - Object
     * @returns {boolean} Returns if statement true or false
     */
    isNull(obj) {
      return Object.is(obj, null) || Object.is(obj, undefined);
    },
    /**
     * Object is Blank
     * @param {(Object|Object[]|string)} obj - Array, object or string
     * @returns {boolean} Returns if statement true or false
     */
    isBlank(obj) {
      return (
        (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
        (typeof obj === 'object' && Object.is(Object.keys(obj).length, 0))
      );
    },
    /**
     * Object is Empty
     * @param {(Object|Object[]|string)} obj - Array, object or string
     * @returns {boolean} Returns if statement true or false
     */
    isEmpty(obj) {
      return this.isNull(obj) || this.isBlank(obj);
    },
    isMobile() {
      let a = navigator.userAgent || navigator.vendor || win.opera;
      return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        )
      );
    },
    ael(elm, event, callback) {
      elm = elm ?? doc;
      if (this.isMobile()) {
        if (event === 'click') {
          event = 'mouseup';
          elm.addEventListener('touchstart', callback);
          elm.addEventListener('touchend', callback);
        }
      }
      if (event === 'fclick') {
        event = 'click';
      }
      return elm.addEventListener(event, callback);
    },
    /** Can make various elements */
    make(element, cname, attrs = {}) {
      let el = doc.createElement(element);
      if (!this.isEmpty(cname)) {
        el.className = cname;
      }
      if (attrs) {
        for (let key in attrs) {
          if (key === 'onclick') {
            this.ael(el, 'click', attrs[key]);
          } else {
            el[key] = attrs[key];
          }
        }
      }
      return el;
    },
    makeImage(imgSrc = '', attrs = {}, cname) {
      let img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.src = imgSrc;
      if (!this.isEmpty(cname)) {
        img.className = cname;
      }
      if (!this.isEmpty(attrs)) {
        for (let key in attrs) {
          img[key] = attrs[key];
        }
      }
      return img;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async fetchURL(url, method = 'GET', responseType = 'json', params = {}) {
      return await new Promise((resolve, reject) => {
        fetch(url, {
          method: method,
          ...params,
        })
          .then((response) => {
            if (!response.ok) reject(response);
            if (responseType.includes('json')) {
              resolve(response.json());
            } else if (responseType.includes('text')) {
              resolve(response.text());
            } else if (responseType.includes('blob')) {
              resolve(response.blob());
            }
            resolve(response);
          })
          .catch((r) => {
            return console.error(
              '[%cUserJS%c] %cERROR',
              'color: rgb(29, 155, 240);',
              '',
              'color: rgb(249, 24, 128);',
              r
            );
          });
      });
    },
    halt(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    html: doc.documentElement,
    injScript(text, remove = true) {
      let inj = this.make('script', 'mu-injected', {
        type: 'text/javascript',
        innerHTML: text,
      });
      (doc.head || doc.documentElement || doc).appendChild(inj);
      if (!remove) {
        return inj;
      }
      this.delay(1000).then(() => inj.remove());
    },
    /**
     * @param {Node} element
     * @param {MutationCallback} callback
     * @param {MutationObserverInit} options
     */
    observe(element, callback, options = { subtree: true, childList: true }) {
      let observer = new MutationObserver(callback);
      callback([], observer);
      observer.observe(element, options);
      return observer;
    },
    /**
    * @param {string} url - URL of webpage to open
    * @param {object} params - GM parameters
    */
    openInTab(url,params = {}) {
      params = Object.is(params,{}) ? '_blank' : params;
      return win.open(url, params);
    },
    // page: {
    //   webpage: null,
    //   findPage: function () {
    //     let list = {};
    //     if (doc.location.origin.includes('pornhub')) {
    //       this.webpage = list.ph;
    //     } else if (doc.location.origin.includes('redtube')) {
    //       this.webpage = list.rt;
    //     } else if (doc.location.origin.includes('tube8')) {
    //       this.webpage = list.t8;
    //     } else if (doc.location.origin.includes('thumbzilla')) {
    //       this.webpage = list.tz;
    //     } else if (doc.location.origin.includes('youporn')) {
    //       this.webpage = list.yp;
    //     } else if (doc.location.origin.includes('onlyfans')) {
    //       this.webpage = list.ofs;
    //     }
    //     if (this.webpage === null) {
    //       return null;
    //     }
    //     return this.webpage;
    //   },
    //   getPage: function () {
    //     return this.webpage !== null ? this.webpage : this.findPage();
    //   },
    // },
  });
}

// clearModalCookie();
