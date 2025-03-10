[![Badge License](https://img.shields.io/github/license/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/blob/master/LICENSE)
[![Badge Issues](https://img.shields.io/github/issues/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/issues)
[![Badge Greasy Fork](https://img.shields.io/greasyfork/dt/421603?style=flat-square)](https://greasyfork.org/scripts/421603)
[![Badge Stars](https://img.shields.io/github/stars/magicoflolis/Userscript-Plus?style=flat-square)](https://github.com/magicoflolis/Userscript-Plus/stargazers)

---

<h1 align="center">
<sub>
<img src="https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/9aa3abea2e6d5caadf051edc9790657da91a1358/src/img/greasyfork.svg" height="38" width="38">
</sub>
Magic Userscript+
</h1>

*A complete rewrite of [Userscript+ : Show Site All UserJS](https://github.com/jae-jae/Userscript-Plus)*

Finds available UserScripts and UserStyles for the current webpage, the power of [Greasy Fork](https://greasyfork.org) on the go!

[UserScript Changelog](https://github.com/magicoflolis/Userscript-Plus/blob/master/CHANGELOG.user.md)

[Web Extension Changelog](https://github.com/magicoflolis/Userscript-Plus/releases)

[List of known issues by Web Browser](https://github.com/magicoflolis/Userscript-Plus/blob/master/browser-issues.md)

## **Download**

**UserScript:**

> [!IMPORTANT]
> The UserScript only works on `HTTPS` sites! ([https://example.com](https://example.com))

* [Greasy Fork](https://greasyfork.org/scripts/421603)
* [Open UserJS](https://openuserjs.org/scripts/Magic/Magic_Userscript+_Show_Site_All_UserJS) - outdated
* [GitHub Repo](https://github.com/magicoflolis/Userscript-Plus/blob/master/dist/magic-userjs.user.js?raw=1)

**Web Extension:**

*General:*

* [GitHub Repo](https://github.com/magicoflolis/Userscript-Plus/releases)

*Firefox:*

* [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/userscript-plus/)

*Chromium:*

* ~~[Chrome Web Store](https://chromewebstore.google.com/detail/kbelpalpbddhjhoakbjkfookjeiennbo)~~ - Under review

*Microsoft Edge:*

* ~~[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/golkolijobdaldjgefapmcknlmkjlhdh)~~ - Under review

**Bookmarklet (not recommended):**

Save this URL as a bookmark, clicking it will cause the **UserScript version** to inject itself into the current webpage.

```JS
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/userscript/dist/magic-userjs.user.js'].map(s=>document.body.appendChild(document.createElement('script')).src=s)})();
```

## Features

* General:
  * UI designed for mobile and desktop devices
  * Multiple language support - date formats are based on your current language
  * Import / export config and theme
  * Customize theme UI
* Query UserScripts and UserStyles from:
  * [Greasy Fork](https://greasyfork.org) - enabled by default
  * [Sleazy Fork](https://sleazyfork.org) - disabled by default
  * [GitHub](https://github.com/search?l=JavaScript&o=desc&q="==UserScript==") ( requires [Personal Access Token](https://github.com/settings/tokens), no permissions are required ) - disabled by default
* Built-in UserScripts:
  * [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) - disabled by default
  * [Greasyfork Search with Sleazyfork Results include](https://greasyfork.org/scripts/23840) - disabled by default
* Automation:
  * Fetch on load - query on page load
* Blacklist:
  * Attempts to exclude certain hosts from being queried - localhost, bank, government, etc.
* Menu:
  * Search for UserScripts - for shortcuts see [Wiki](https://github.com/magicoflolis/Userscript-Plus/blob/master/wiki/README.md#shortcuts)
  * Filter UserScripts which do not match your current language
  * Sort UserScripts, default sorting "Daily Installs"
  * Preview UserScripts code before install
  * Save UserScript as a local file
  * UserScript highlights:
    * UserScripts created by the [author](https://greasyfork.org/users/166061) - enabled by default
    * UserScript recommendations - enabled by default

**UserScript Features:**

> Tested and compatible with [TamperMonkey](https://www.tampermonkey.net/) or [ViolentMonkey](https://violentmonkey.github.io/)

* General:
  * Maximize, minimize, or close menu
  * Sync config with UserScript manager or per host
  * Customize timeout window - can be re-injected using your managers User Script Commands menu
* Query UserScripts and UserStyles from:
  * [Open UserJS](https://openuserjs.org) ( limited availability, will read `Too many requests...` if limit is reached ) - disabled by default
* Automation:
  * Inject on load - injects menu on page load
  * Automatic fullscreen - maximizes menu when opened
* UserScript Commands via `GM_registerMenuCommand`:
  * Inject Userscript+ - injects menu into the page
  * Close Userscript+ - removes menu from the page

**Web Extension Features:**

* General:
  * You can fullscreen the list and it will open it to a new tab

## Previews

<p>
  <img src="https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/using-tabs.gif">
  <img src="https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/install-userscript.gif">
</p>

## FAQ / Troubleshooting

**(UserScript) How do I open the menu?:**

* Click or touch the bottom right of a webpage

**(UserScript) Nothing appears bottom right:**

> [List of known issues by Web Browser](https://github.com/magicoflolis/Userscript-Plus/blob/master/browser-issues.md)

* Try again on another webpage [[Test Page](https://youtube.com)]
* Default timeout is 10000ms before the count disappears
* If issue persists, see [View Console Logs](#view-console-logs) or submit a [New Issue](https://github.com/magicoflolis/Userscript-Plus/issues/new/choose)

**(UserScript) Error occurred while injecting Container:**

* Try again on another webpage [[Test Page](https://youtube.com)]
* This error is caused by the current webpage not supporting [attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)

**(UserScript) Error occurred while loading UserJS for this webpage:**

* Reload the webpage or try again on a different webpage [[Test Page](https://youtube.com)]
* This error *may* be caused by
  * An error occurred in an enabled search engine while fetching content
  * Script is unable to fetch content on current or all webpages

**No available UserJS for this webpage:**

* This error *can* be caused when no UserJS could be found in enabled search engines
* If there are known UserJS to exist in enabled search engines, enable `Filter out other languages`

## View Console Logs

* Open your web browsers Inspect Element and navigate to it's Console
* Locate the following **[UserJS] < message >** ( you can filter your Console by entering **UserJS** or **[** )
* **If nothing appears, this means the script is not executing at all!**
* For any additional help, submit a [New Issue](https://github.com/magicoflolis/Userscript-Plus/issues/new/choose)

## Want to Contribute?

Fork this repo and open a [pull request](https://github.com/magicoflolis/Userscript-Plus/pulls) - [Rules](https://github.com/magicoflolis/Userscript-Plus/blob/master/wiki/Build.md#contribution-rules) - [Guide](https://github.com/magicoflolis/Userscript-Plus/blob/master/wiki/Build.md#contribution-guide)

How to add or edit translations? How to build? - [Build](https://github.com/magicoflolis/Userscript-Plus/blob/master/wiki/Build.md)

### Roadmap

* Finish WebExtension
* See TODO section in [UserScript Changelog](https://github.com/magicoflolis/Userscript-Plus/blob/master/CHANGELOG.user.md)

### Source Code

* [https://github.com/magicoflolis/Userscript-Plus](https://github.com/magicoflolis/Userscript-Plus)
