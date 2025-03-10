'use strict';

import { webext } from './ext.js';

export const hermes = {
  port: null,
  portTimer: null,
  portTimerDelay: 10000,
  msgIdGenerator: 1,
  pending: new Map(),
  waitStartTime: 0,
  shuttingDown: false,
  shutdown: function () {
    this.shuttingDown = true;
    this.destroyPort();
  },
  disconnectListener: function () {
    void webext.runtime.lastError;
    this.port = null;
    this.destroyPort();
  },
  disconnectListenerBound: null,
  messageListener: function (details) {
    if (typeof details !== 'object' || details === null) {
      return;
    }
    // Response to specific message previously sent
    if (details.msgId !== undefined) {
      const resolver = this.pending.get(details.msgId);
      if (resolver !== undefined) {
        this.pending.delete(details.msgId);
        resolver(details.msg);
        return;
      }
    }
  },
  messageListenerBound: null,
  canDestroyPort: function () {
    return this.pending.size === 0;
  },
  portPoller: function () {
    this.portTimer = null;
    if (this.port !== null && this.canDestroyPort()) {
      return this.destroyPort();
    }
    this.portTimer = setTimeout(this.portPollerBound, this.portTimerDelay);
    this.portTimerDelay = Math.min(this.portTimerDelay * 2, 60 * 60 * 1000);
  },
  portPollerBound: null,
  destroyPort: function () {
    if (this.portTimer !== null) {
      clearTimeout(this.portTimer);
      this.portTimer = null;
    }
    const port = this.port;
    if (port !== null) {
      port.disconnect();
      port.onMessage.removeListener(this.messageListenerBound);
      port.onDisconnect.removeListener(this.disconnectListenerBound);
      this.port = null;
    }
    // service pending callbacks
    if (this.pending.size !== 0) {
      const pending = this.pending;
      this.pending = new Map();
      for (const resolver of pending.values()) {
        resolver();
      }
    }
  },
  createPort: function () {
    if (this.shuttingDown) {
      return null;
    }
    if (this.messageListenerBound === null) {
      this.messageListenerBound = this.messageListener.bind(this);
      this.disconnectListenerBound = this.disconnectListener.bind(this);
      this.portPollerBound = this.portPoller.bind(this);
    }
    try {
      this.port = webext.runtime.connect({ name: 'hermes' }) || null;
      // eslint-disable-next-line no-unused-vars
    } catch (ex) {
      this.port = null;
    }
    if (this.port === null) {
      return null;
    }
    this.port.onMessage.addListener(this.messageListenerBound);
    this.port.onDisconnect.addListener(this.disconnectListenerBound);
    this.portTimerDelay = 10000;
    if (this.portTimer === null) {
      this.portTimer = setTimeout(this.portPollerBound, this.portTimerDelay);
    }
    return this.port;
  },
  getPort: function () {
    return this.port ?? this.createPort();
  },
  send: function (channel, msg) {
    // Too large a gap between the last request and the last response means
    // the main process is no longer reachable: memory leaks and bad
    // performance become a risk -- especially for long-lived, dynamic
    // pages. Guard against this.
    if (this.pending.size > 64) {
      if (Date.now() - this.waitStartTime > 60000) {
        this.shutdown();
      }
    }
    const port = this.getPort();
    if (port === null) {
      return Promise.resolve();
    }
    if (this.pending.size === 0) {
      this.waitStartTime = Date.now();
    }
    const msgId = this.msgIdGenerator++;
    const promise = new Promise((resolve) => {
      this.pending.set(msgId, resolve);
    });
    port.postMessage({ channel, msgId, msg });
    return promise;
  }
};
