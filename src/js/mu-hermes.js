'use strict';

userjs.hermes = {
  port: null,
  msgIdGenerator: 1,
  pending: new Map(),
  shuttingDown: false,

  shutdown: function () {
    this.shuttingDown = true;
    this.destroyPort();
  },
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
  destroyPort: function () {
    const port = this.port;
    if (port !== null) {
      port.disconnect();
      port.onMessage.removeListener(this.messageListenerBound);
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
      // this.disconnectListenerBound = this.disconnectListener.bind(this);
    }
    try {
      this.port = webext.runtime.connect({ name: 'hermes' }) || null;
    } catch (ex) {
      this.port = null;
    }
    if (this.port === null) {
      return null;
    }
    this.port.onMessage.addListener(this.messageListenerBound);
    return this.port;
  },
  getPort: function () {
    return this.port !== null ? this.port : this.createPort();
  },
  send: function (channel, msg) {
    if (this.pending.size > 50) {
      this.shutdown();
    }
    const port = this.getPort();
    if (port === null) {
      return Promise.resolve();
    }
    const msgId = this.msgIdGenerator++;
    const promise = new Promise((resolve) => {
      this.pending.set(msgId, resolve);
    });
    port.postMessage({ channel, msgId, msg });
    return promise;
  }
};
