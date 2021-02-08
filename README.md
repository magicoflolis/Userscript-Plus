# Additional source code & information found [here](https://github.com/jae-jae/Userscript-Plus#userscript)

**Finds available UserJS for current site.**

- [Additional source code & information found here](#additional-source-code--information-found-here)
  - [About](#about)
  - [Installation](#installation)
    - [Firefox Add-ons web site](#firefox-add-ons-web-site)
    - [Manual](#manual)
  - [Build Setup](#build-setup)
  - [License](#license)

## About

Userscript+ is a `Firefox addon` designed to be used along side with `Tampermonkey`

Many times, we do not know whether some sites have users to provide the script to optimize the page, but Userscript+ will be able to help you automatically find the applicable UserJS, and by default, according to the score from high to low order recommended to you, bring you a new `Tampermonkey` use experience!

| Preview |
:----------:
|![Example](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/resources/example.png)|

## Installation

### [Firefox Add-ons web site](https://addons.mozilla.org/firefox/addon/userscript-plus)

### Manual

> **Note:** Userscript+ will be installed as a [Temporary Extension](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

- Download the [zip](https://api.github.com/repos/magicoflolis/Userscript-Plus/zipball/master), load the [extension folder](https://github.com/magicoflolis/Userscript-Plus/tree/master/extension) as a [Temporary Extension](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

## Build Setup

> [web-ext documentation](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)

```bash
# Install development dependencies
npm i
# Build if src was modified
webpack
# Run
web-ext run -s ./extension/
# Recommended to create additional profile about:profiles
web-ext run -p <profile> -s ./extension/
```

## License

MIT
