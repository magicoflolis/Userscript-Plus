'use strict';
import { log, info, err } from './logger.js';
import { dom, qs, SafeAnimationFrame } from './querySelector.js';

let cfg = {};

const messenger = userjs.hermes.getPort();

const sleazyRedirect = () => {
  if (!/greasyfork\.org/.test(window.location.hostname) && cfg.sleazyredirect) {
    return;
  }
  const otherSite = /greasyfork\.org/.test(window.location.hostname) ? 'sleazyfork' : 'greasyfork';
  qs('span.sign-in-link')
    ? /scripts\/\d+/.test(window.location.href)
      ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a'))
        ? window.location.assign(
            window.location.href.replace(
              /\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/,
              '//$1' + otherSite + '.org'
            )
          )
        : false
      : false
    : false;
};
const Container = class {
  constructor() {
    this.remove = this.remove.bind(this);
    this.onFrameLoad = this.onFrameLoad.bind(this);
    this.ready = false;
    this.supported = userjs.isFN(document.createElement('main-userjs').attachShadow);
    if (this.supported) {
      this.frame = userjs.make('main-userjs', '', {
        dataset: {
          insertedBy: 'userscript-plus',
          role: 'primary-container'
        }
      });
      /**
       * @type { ShadowRoot }
       */
      this.root = this.frame.attachShadow({ mode: 'open' });
      this.ready = true;
    } else {
      this.frame = userjs.make('iframe', 'mujs-iframe', {
        dataset: {
          insertedBy: 'userscript-plus',
          role: 'primary-iframe'
        },
        loading: 'lazy',
        src: 'about:blank',
        style:
          'position: fixed;bottom: 1rem;right: 1rem;height: 525px;width: 90%;margin: 0px 1rem;z-index: 100000000000000020 !important;',
        onload: this.onFrameLoad
      });
    }
    userjs.ael(window.self, 'beforeunload', this.remove);
    // dbg('Container:', this);
  }
  /**
   * @param { Function } callback
   * @param { document } doc
   */
  async inject(callback, doc) {
    if (!doc) {
      return;
    }
    while (this.ready === false) {
      await new Promise((resolve) => {
        const queryTimer = new SafeAnimationFrame(resolve);
        queryTimer.start(1);
      });
    }

    doc.documentElement.appendChild(this.frame);

    if (userjs.isFN(callback)) {
      callback.call({}, this.root);
    }
  }

  remove() {
    this.frame.remove();
  }

  onFrameLoad(iFrame) {
    /**
     * @type { HTMLIFrameElement }
     */
    const target = iFrame.target;
    this.root = target.contentDocument.documentElement;
    this.ready = true;

    dom.cl.add([this.root, target.contentDocument.body], 'mujs-iframe');
    // this.root.classList.add('mujs-iframe');
    // target.contentDocument.body.classList.add('mujs-iframe');
  }
};
const container = new Container();

const primaryFN = (injCon) => {
  log('injCon', injCon);
}

/**
 * @param { Function } callback
 * @returns { null | true }
 */
const loadDOM = (callback) => {
  if (!userjs.isFN(callback)) {
    return null;
  }
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    callback.call({}, document);
  }
  document.addEventListener('DOMContentLoaded', (evt) => callback.call({}, evt.target), {
    once: true
  });
  return true;
};

messenger.onMessage.addListener((root = {}) => {
  const m = root.msg;
  log('Start', root);
  if (root.channel === 'Config' && userjs.isEmpty(cfg)) {
    cfg = m.cfg || cfg;
    info('Config:', cfg);
    loadDOM((doc) => {
      try {
        if (window.location === null) {
          err('"window.location" is null, reload the webpage or use a different one');
          return;
        }
        if (doc === null) {
          err('"doc" is null, reload the webpage or use a different one');
          return;
        }
        sleazyRedirect();
        container.inject(primaryFN, doc);
      } catch (ex) {
        err(ex);
      }
    });
  }
});

// class MyCustomElement extends HTMLElement {
//   static observedAttributes = ['color', 'size']

//   constructor() {
//     // Always call super first in constructor
//     super()
//   }

//   connectedCallback() {
//     console.log('Custom element added to page.')
//   }

//   disconnectedCallback() {
//     console.log('Custom element removed from page.')
//   }

//   adoptedCallback() {
//     console.log('Custom element moved to new page.')
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     log(`Attribute ${name} has changed. ${oldValue} => ${newValue}`)
//   }
// }
// customElements.define('mujs-table', MyCustomElement)
