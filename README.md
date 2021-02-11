# Magics Userscript+ (under development)

_Fork of [Userscript+ : Show Site All UserJS](https://greasyfork.org/scripts/24508-userscript-show-site-all-userjs)_

_Authors source code & information found [here](https://github.com/jae-jae/Userscript-Plus#userscript)_

- [Magics Userscript+ (under development)](#magics-userscript-under-development)
  - [About](#about)
  - [Features](#features)
  - [Installation](#installation)
    - [Manual](#manual)
  - [Build Setup](#build-setup)
  - [License](#license)

## About

_Finds available UserJS for current site._

Magics Userscript+ is designed to be used along side with `Tampermonkey OR compatiable UserJS manager`

Currently [Userscript+](https://github.com/jae-jae/Userscript-Plus#userscript) can only find UserJS through [GreasyFork](https://greasyfork.org), I've added support for [SleazyFork](https://sleazyfork.org) along with additional features!

| Preview |
:----------:
|![Example](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/resources/example.png)|

## Features

- Added [SleazyFork](https://sleazyfork.org)

## Installation

> The userscript version is **limited** [info](https://github.com/jae-jae/Userscript-Plus#known-bug). Browser extension should be able to run on most sites.

- [Chrome](https://github.com/magicoflolis/Userscript-Plus)

- [Firefox AMO](https://addons.mozilla.org/firefox/addon/userscript-plus)

- Userscript available from [GreasyFork](https://greasyfork.org/scripts/421603) or GitHub [direct link](https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjsplus.user.js)

### Manual

> **Note:** Userscript+ will be installed as a [Temporary Extension](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

- Download the [zip](https://api.github.com/repos/magicoflolis/Userscript-Plus/zipball/master), load the [extension folder](https://github.com/magicoflolis/Userscript-Plus/tree/master/extension) as a [Temporary Extension](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

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

## License

MIT
