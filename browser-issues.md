# Known issues by Web Browser

> Last updated: 5/2/2024

[Submit a New Issue](https://github.com/magicoflolis/Userscript-Plus/issues/new/choose)

- [Known issues by Web Browser](#known-issues-by-web-browser)
  - [Kiwi Browser](#kiwi-browser)
  - [Opera](#opera)

## Kiwi Browser

**Installed using (from .zip/.crx/.user.js):**

- Userscript version does not have access to Privileged APIs (`GM_*` or `GM.*`)
  - Recommended to install using a user script manager _[Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/)_

## Opera

**General:**

- Cannot load on search engine sites (common example: [google.com](https://www.google.com))
  - As stated using ViolentMonkey: _Violentmonkey cannot run userscripts in this page (common examples: browser UI, an extension, blocked via policies, a search engine site in Opera)_
