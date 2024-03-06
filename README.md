# Magic Userscript+

![GitHub License](https://img.shields.io/github/license/magicoflolis/Userscript-Plus)
[![GitHub Release](https://img.shields.io/github/release/magicoflolis/Userscript-Plus)](https://github.com/magicoflolis/Userscript-Plus/releases/latest)
[![Greasy Fork Downloads](https://img.shields.io/greasyfork/dt/421603)](https://greasyfork.org/scripts/421603)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/magicoflolis/Userscript-Plus)
[![GitHub Stars](https://img.shields.io/github/stars/magicoflolis/Userscript-Plus)](https://github.com/magicoflolis/Userscript-Plus/stargazers)

*Fork of [Userscript+ : Show Site All UserJS](https://github.com/jae-jae/Userscript-Plus#userscript). Source code & authors information found [here](https://github.com/jae-jae/Userscript-Plus).*

> The power of [Greasy Fork](https://greasyfork.org) on the go! Finds available UserJS for the current webpage, **does not work on every webpage**

## About

> [Changelog (GitHub)](https://github.com/magicoflolis/Userscript-Plus/releases)

Finds available UserJS for current webpage from various UserJS hosts (e.g, [Greasy Fork](https://greasyfork.org)), displays a found count bottom right of the webpage, automatically disappears after 10 seconds (can be configured).

| Preview(s) |
|:----------:|
|![Demo 1](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/demo4.gif)|
|![Demo 2](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/demo3.gif)|
|![Demo 3](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/demo2.gif)|
|![Demo 4](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/assets/demo1.png)|

## Downloads

***

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
| Userscript | [Greasy Fork](https://greasyfork.org/scripts/421603) | [Install (GitHub)](https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js) | - |
| Chrome/Edge/Opera | [GitHub](https://github.com/magicoflolis/Userscript-Plus/releases) | - | Work in progress |
| Firefox | [GitHub](https://github.com/magicoflolis/Userscript-Plus/releases) | [Add-on Store](https://addons.mozilla.org/firefox/addon/userscript-plus/) | Work in progress |

**(Optional) Mobile Bookmarklet:**

```JS
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/userscript/dist/magic-userjs.user.js'].map(s=>document.body.appendChild(document.createElement('script')).src=s)})();
```

***

## Features

> Tested and compatible with TamperMonkey and ViolentMonkey.

* Multilingual support.
* User can search + load results for UserJS on an entirely different webpage!
* Config can be synced with current user script manager.
* Automatically finds language through ``navigator.language``, all dates will match your current language.
* List displays the following information for each UserJS: name, description, creation date, author(s), version, daily installs, total installs, user ratings.
* List can be filtered through search.
* List is sorted by Daily Installs, highest to lowest.
* Designed for desktop and mobile devices.
* Available search engines: [Greasy Fork](https://greasyfork.org), [Sleazy Fork](https://sleazyfork.org), [Open UserJS](https://openuserjs.org), [GitHub](https://github.com/search?l=JavaScript&o=desc&q="==UserScript=="), [Gist (GitHub)](https://gist.github.com/search?l=JavaScript&o=desc&q="==UserScript==")
* Built-in [Greasyfork Search with Sleazyfork Results include](https://greasyfork.org/scripts/23840).

## FAQ / Troubleshooting

Nothing appears bottom right:

* Try again on another webpage [[Test Page](https://google.com)]
* Default timeout is 10000ms before the count disappears
* If issue persists, see [Viewing UserJS Logs](#viewing-userjs-logs)

Error occured while injecting Container:

* Try again on another webpage [[Test Page](https://google.com)]
* This error is caused by the current webpage not supporting [attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)

Error occured while loading UserJS for this webpage:

* Reload the webpage or try again on a different webpage [[Test Page](https://google.com)]
* This error *may* be caused by
  * An error occured in an enabled search engine while fetching content
  * Script is unable to fetch content on current or all webpages

No available UserJS for this webpage:

* This error *can* be caused when no UserJS could be found in enabled search engines
* If there are known UserJS to exist in enabled search engines, enable `Filter out other languages`

## Viewing UserJS Logs

* Open your web browsers Inspect Element and navigate to it's Console
* Locate the following **[UserJS] < message >** ( you can filter your Console by entering **UserJS** or **[** )
* Feel free to screenshot any error messages to the [GitHub](https://github.com/magicoflolis/Userscript-Plus/issues) for addition help
* If nothing appears, this means the script is not executing at all

## Workflows

### Development

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).
The version of Node.js should match `"node"` key in `package.json`.

``` sh
# Install dependencies
$ pnpm i
```

#### Userscript Version

``` sh
# Watch and compile to local HTTP server
$ pnpm run dev:UserJS

# Compile UserJS
$ pnpm run pub:UserJS
```

### Source Code

* [https://github.com/magicoflolis/Userscript-Plus](https://github.com/magicoflolis/Userscript-Plus)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
