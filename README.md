# Magics Userscript+

> Finds available UserJS for current site.

*Fork of [Userscript+ : Show Site All UserJS](https://greasyfork.org/scripts/24508-userscript-show-site-all-userjs). Source code & authors information found [here](https://github.com/jae-jae/Userscript-Plus#userscript).*

## Features

> Currently [Userscript+](https://github.com/jae-jae/Userscript-Plus#userscript) can only find userscripts through [GreasyFork](https://greasyfork.org), I've added support for [SleazyFork](https://sleazyfork.org) along with a few additional features and tweaks!

* Added [SleazyFork](https://sleazyfork.org).
* Tested and compatible with TamperMonkey n ViolentMonkey.
* [ Browser Extension ] Added Dark Theme.

![Preview](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/resources/preview.png)

***

**Chrome:**

> **There are no excluded websites, use at your own risk.**

* ~~Chrome Web Store~~
* [GitHub Releases](https://github.com/magicoflolis/Userscript-Plus/releases)

**Firefox:**

> **There are no excluded websites, use at your own risk.**

* [Add-ons web site](https://addons.mozilla.org/firefox/addon/userscript-plus)
* [GitHub Releases](https://github.com/magicoflolis/Userscript-Plus/releases)

**User Script:**

> The userscript **WON'T** work for all websites, [info.](#known-bugs)

* [Greasy Fork](https://greasyfork.org/scripts/421603)
* [GitHub Direct Link](https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjs.user.js)

**Manual:**

Chromium

* Download and unzip [latest release](https://github.com/magicoflolis/Userscript-Plus/releases) into desired folder.
* Go to chromium/chrome *Extensions*.
* Click to check *Developer mode*.
* Click *Load unpacked extension...*.
* In the file selector dialog:
  * Select the directory `userscriptplus-*` / desired folder.
  * Click *Open*.

Firefox

> See: [Temporary installation in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox)

* Download and unzip [latest release](https://github.com/magicoflolis/Userscript-Plus/releases) into desired folder.
* Copy and paste `about:debugging#/runtime/this-firefox` into your URL.
* Click *Load Temporary Add-on…*.
* In the file selector dialog:
  * Select the directory `userscriptplus-*` / desired folder.
  * Click *Open*.

***

## Known bugs

* May leave a opened tab when TamperMonkey is used alongside.
* **Will result in *i.table.noDataText* when no UserJS is found for current site OR is blocked.**
* [ User Script ] In some sites below the plug-in interface icon is not displayed，Such as: Github

> **Reason**：This is because the security policy of these sites to prevent the plug-in icon font file loading, resulting in the icon does not display properly.

## Build Setup

> [web-ext documentation](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)

```bash
# Install development dependencies
npm i -D
# Builds both User Script and Browser Extension
npm run build:all
# Recommended to create additional profile about:profiles
web-ext run -p <profile> -s ./extension/
# Run web-ext
web-ext run -s ./extension/
```

> Code is a bit of a mess right now

## License

MIT

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)