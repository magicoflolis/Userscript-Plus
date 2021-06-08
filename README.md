# Magics Userscript+

> Finds available UserJS for current site.

*Fork of [Userscript+ : Show Site All UserJS](https://greasyfork.org/scripts/24508-userscript-show-site-all-userjs). Authors source code & information found [here](https://github.com/jae-jae/Userscript-Plus#userscript).*

- [Magics Userscript+](#magics-userscript)
  - [Installation](#installation)
    - [Manual](#manual)
  - [About](#about)
  - [Features](#features)
  - [Build Setup](#build-setup)
  - [Known bug](#known-bug)
  - [License](#license)

***

## Installation

> **There are no excluded websites, use at your own risk.**

- [Chrome](https://github.com/magicoflolis/Userscript-Plus)

- [Firefox AMO](https://addons.mozilla.org/firefox/addon/userscript-plus)

> The userscript **WON'T** work for all websites. [info](#known-bug).

- [Greasy Fork](https://greasyfork.org/scripts/421603)

### Manual

- Download the [zip](https://api.github.com/repos/magicoflolis/Userscript-Plus/zipball/master), load the [extension folder](https://github.com/magicoflolis/Userscript-Plus/tree/master/extension) as a [Temporary Extension](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

***

## About

Currently [Userscript+](https://github.com/jae-jae/Userscript-Plus#userscript) can only find userscripts through [GreasyFork](https://greasyfork.org), I've added support for [SleazyFork](https://sleazyfork.org) along with a few additional features!

| Preview |
:----------:
|![Preview](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/resources/preview.png)|

## Features

- Added [SleazyFork](https://sleazyfork.org).
- Added Dark Theme.
- Compatible with TamperMonkey and ViolentMonkey.

## Build Setup

> [web-ext documentation](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)

```bash
# Install development dependencies
npm i -D
# Build if src was modified
webpack
# Run
web-ext run -s ./extension/
# Recommended to create additional profile about:profiles
web-ext run -p <profile> -s ./extension/
```

> Code is a bit of a mess right now

## Known bug

- May leave a opened tab when TamperMonkey is used alongside.
- In some sites below the plug-in interface icon is not displayed，Such as: Github
- **This will result in *i.table.noDataText* when no UserJS is found for current site.**

> **Reason**：This is because the security policy of these sites to prevent the plug-in icon font file loading, resulting in the icon does not display properly.

## License

MIT
