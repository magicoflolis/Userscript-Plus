# Magic Userscript+

*Fork of [Userscript+ : Show Site All UserJS](https://github.com/jae-jae/Userscript-Plus#userscript). Source code & authors information found [here](https://github.com/jae-jae/Userscript-Plus).*

> Finds available UserJS for current site.

| Preview(s) |
|:----------:|
![Preview](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/resources/preview.png)|

***

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
Chrome / Edge | - | - | Work in progress
Firefox | - | - | Work in progress
Userscript v3 (WIP) | - | [Install (GitHub)](https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js) |  Testing/feedback needed!
Userscript v2 | [Greasy Fork](https://greasyfork.org/scripts/421603) | [Install (GitHub)](https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/archive/magic-userjs.user.js) | Stable

***

## Features

* Tested and compatible with TamperMonkey n ViolentMonkey.
* Trimmed / moved some @resources to this build.
* Added [SleazyFork](https://sleazyfork.org).
* Added Dark Theme.
* Added extra @excludes.
* Added built-in [Greasyfork Search with Sleazyfork Results include](https://greasyfork.org/scripts/23840).
* Added ability to customize width (Thank you [neverWake](https://greasyfork.org/en/scripts/421603/discussions/149978) for the idea)

```JS
const sleazyfork_redirect = false, // 'true' to enable, 'false' to disable
custom_width = '', // Default UserJS width: 90vw | Original UserJS width: 860px
...
```

## Changelog

> [(GitHub) Full Changelog](https://github.com/magicoflolis/Userscript-Plus/releases)

## Known bugs

* *May* conflict with any UserJS that runs in iframes
* May leave a opened tab when installing user scripts
* Found count may not appear

## Source Code

* [https://github.com/magicoflolis/Userscript-Plus/tree/master/src](https://github.com/magicoflolis/Userscript-Plus/tree/master/src)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
