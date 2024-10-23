'use strict';

class LanguageHandler {
  constructor() {
    this.current = (navigator.language ?? 'en').split('-')[0] ?? 'en';
    this.cache = [];

    const languages = navigator.languages ?? [];
    for (const nlang of languages) {
      const lg = nlang.split('-')[0];
      if (this.cache.indexOf(lg) === -1) {
        this.cache.push(lg);
      }
    }

    if (!this.cache.includes(this.current)) {
      this.cache.push(this.current);
    }
  }
}

const language = new LanguageHandler();

export {
  language
};