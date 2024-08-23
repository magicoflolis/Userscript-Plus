# Magic Userscript+

> [!IMPORTANT]
> If the current webpage is set to block resources through CSP
>
> It will cause the userscript not work for that webpage!
>
> [https://developer.mozilla.org/docs/Web/HTTP/CSP](https://developer.mozilla.org/docs/Web/HTTP/CSP)

[![GitHub License](https://img.shields.io/github/license/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/blob/master/LICENSE)
[![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/issues)
[![GitHub Release](https://img.shields.io/github/release/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/releases/latest)
[![Greasy Fork Downloads](https://img.shields.io/greasyfork/dt/421603?style=flat-square)](https://greasyfork.org/scripts/421603)
[![GitHub Stars](https://img.shields.io/github/stars/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/stargazers)

*A complete rewrite of [Userscript+ : Show Site All UserJS](https://github.com/jae-jae/Userscript-Plus#userscript)*

Finds available Userscripts for the current webpage, the power of [Greasy Fork](https://greasyfork.org) on the go!

[Changelog](https://github.com/magicoflolis/Userscript-Plus/releases)

[List of known issues by Web Browser](https://github.com/magicoflolis/Userscript-Plus/blob/master/browser-issues.md)

## **Download**

**Userscript:**

[![Userscript](https://img.shields.io/badge/Userscript-Download-brightgreen.svg?style=flat-square&label=Greasy+Fork&logo=javascript&logoColor=white)](https://greasyfork.org/scripts/421603)
[![Userscript](https://img.shields.io/badge/Userscript-Download-brightgreen.svg?style=flat-square&label=GitHub+Repo&logo=javascript&logoColor=white)](https://github.com/magicoflolis/Userscript-Plus/blob/master/dist/magic-userjs.user.js?raw=1)

**Web Extension:**

| Version | Install | Alternative | Notes |
|:----------:|:----------:|:----------:|:----------:|
| Chrome/Edge/Opera | [GitHub](https://github.com/magicoflolis/Userscript-Plus/releases) | *N/A* | Work in progress |
| Firefox | [GitHub](https://github.com/magicoflolis/Userscript-Plus/releases) | [Add-on Store](https://addons.mozilla.org/firefox/addon/userscript-plus/) | Work in progress |

**(Not Recommended) Bookmarklet:**

Save this URL as a bookmark, clicking it will cause the userscript version to inject itself into the current webpage.

```JS
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/userscript/dist/magic-userjs.user.js'].map(s=>document.body.appendChild(document.createElement('script')).src=s)})();
```

---

| Demos |
|:----------:|
|![Using Tabs](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/using-tabs.gif)|
|![Installing Userscript](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/install-userscript.gif)|

---

## Features

* Designed for mobile and desktop devices
* Support multiple languages - date formats will match your current language
* Ability to customize theme
* Ability to import / export config and theme
* Ability to search for userscripts
* Ability to filter userscripts which do not match your current language
* Ability to query userscripts from any hostname
* Ability to sort userscripts, default sorting "Daily Installs"
* Available search engines [Greasy Fork](https://greasyfork.org), [Sleazy Fork](https://sleazyfork.org), [Open UserJS](https://openuserjs.org), [GitHub](https://github.com/search?l=JavaScript&o=desc&q="==UserScript==") ( requires a [Personal Access Token](https://github.com/settings/tokens), the token does not require any permissions )
* Built-in userscript [Greasyfork Search with Sleazyfork Results include](https://greasyfork.org/scripts/23840)
* Preview any userscript code before install
* Save any userscript to local file
* Highlights which userscripts are created by the [author](https://greasyfork.org/users/166061)
* Highlights recommended userscripts from the [author](https://greasyfork.org/users/166061)

**Userscript Features:**

> Tested and compatible with [TamperMonkey](https://www.tampermonkey.net/) or [ViolentMonkey](https://violentmonkey.github.io/)

* Ability to maximize, minimize, or exit the userscript list
* Ability to change the position of floating counter
* Sync config with Userscript Manager or choose to have site based configs

**Bookmarklet Features:**

* Ability to maximize, minimize, or exit the userscript list
* Ability to change the position of floating counter
* Ability to choose to have site based configs

**Webextension Features:**

* *N/A*

## FAQ / Troubleshooting

**How do I open the menu?:**

* Click or touch the bottom right of a webpage

**Nothing appears bottom right:**

> [List of known issues by Web Browser](https://github.com/magicoflolis/Userscript-Plus/blob/master/browser-issues.md)

* Try again on another webpage [[Test Page](https://youtube.com)]
* Default timeout is 10000ms before the count disappears
* If issue persists, see [Viewing UserJS Logs](#viewing-userjs-logs) or submit a [New Issue](https://github.com/magicoflolis/Userscript-Plus/issues/new/choose)

**Error occurred while injecting Container:**

* Try again on another webpage [[Test Page](https://youtube.com)]
* This error is caused by the current webpage not supporting [attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)

**Error occurred while loading UserJS for this webpage:**

* Reload the webpage or try again on a different webpage [[Test Page](https://youtube.com)]
* This error *may* be caused by
  * An error occurred in an enabled search engine while fetching content
  * Script is unable to fetch content on current or all webpages

**No available UserJS for this webpage:**

* This error *can* be caused when no UserJS could be found in enabled search engines
* If there are known UserJS to exist in enabled search engines, enable `Filter out other languages`

## Viewing UserJS Logs

* Open your web browsers Inspect Element and navigate to it's Console
* Locate the following **[UserJS] < message >** ( you can filter your Console by entering **UserJS** or **[** )
* **If nothing appears, this means the script is not executing at all!**
* For any additional help, submit a [New Issue](https://github.com/magicoflolis/Userscript-Plus/issues/new/choose)

## Build

> Developed in [VSCodium](https://vscodium.com)

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/). The version of Node.js should match `"node"` key in `package.json`.

``` sh
# Install dependencies
$ pnpm i
```

### Userscript Version

> Desktop version - developed using [ViolentMonkey](https://violentmonkey.github.io/), see [How to edit scripts with your favorite editor?](https://violentmonkey.github.io/posts/how-to-edit-scripts-with-your-favorite-editor/)
>
> Mobile version - developed using [FireFox Developer Edition](https://www.mozilla.org/firefox/developer/) "Responsive Design Mode" on desktop + [cromite](https://github.com/uazo/cromite) app on Android

``` sh
# Watch and compile to local HTTP server
$ pnpm run dev:UserJS

# Compile UserJS
$ pnpm run pub:UserJS
```

### Webextension Version

``` sh
# Compile webextension (dev version) for "Chromium" to "./tests/chrome"
$ pnpm run dev:Cr
# Compile webextension (dev version) for "Firefox" to "./tests/chrome"
$ pnpm run dev:FF
# Compile webextension (public version) for "Chromium" to "./tests/chrome"
$ pnpm run webpack:Cr
# Compile webextension (public version) for "Firefox" to "./tests/chrome"
$ pnpm run webpack:FF

# [ Testing ]
# Browsers can be launched via "Run and Debug" in VSCode.
# Edit runtimeExecutable in ".vscode/launch.json" to your Chrome executable.
# Recommended to create an additional profile "about:profiles" for Firefox.
```

### Roadmap

* Finish webextension version

### Source Code

* [https://github.com/magicoflolis/Userscript-Plus](https://github.com/magicoflolis/Userscript-Plus)
