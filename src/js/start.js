'use strict'
import { log } from './logger.js'
// import { qs, qsA } from './querySelector.js';

const messenger = MU.hermes.getPort()
const win = self ?? window
const doc = win.document
let config = {}

function loadSetup() {
  log(config)
}

messenger.onMessage.addListener((root = {}) => {
  const m = root.msg
  log('Start', root)
  if (root.channel === 'Config' && MU.isEmpty(config)) {
    config = m.cfg || config
    if (Object.is(doc.readyState, 'interactive')) {
      loadSetup()
    } else {
      MU.ael(doc, 'readystatechange', (event) => {
        const evt = event.target ?? doc
        if (Object.is(evt.readyState, 'interactive')) {
          loadSetup()
        }
      })
    }
  }
})

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
