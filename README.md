# Magic Userscript+

*Fork of [Userscript+ : Show Site All UserJS](https://github.com/jae-jae/Userscript-Plus#userscript). Source code & authors information found [here](https://github.com/jae-jae/Userscript-Plus).*

> Finds available UserJS for current webpage.

| Preview(s) |
|:----------:|
![Demo 1](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/asssets/demo1.png)|
![Demo 2](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/asssets/demo2.gif)|
![Demo 3](https://raw.githubusercontent.com/magicoflolis/Userscript-Plus/master/asssets/demo3.gif)|

***

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
Userscript | [Greasy Fork](https://greasyfork.org/scripts/421603) | [Install (GitHub)](https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js) | -
Userscript Legacy | [Install (GitHub)](https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/archive/magic-userjs.user.js) | - | [Homepage](https://github.com/magicoflolis/Userscript-Plus)
Chrome/Edge/Opera | - | - | Work in progress
Firefox | - | - | Work in progress

**(Optional) Mobile Bookmarklet:**

```JS
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/userscript/dist/magic-userjs.user.js'].map( s => document.body.appendChild(document.createElement('script')).src=s)})();
```

***

## About

> DOES NOT WORK ON EVERY SINGLE SITE!

Finds available UserJS for current webpage from various UserJS hosts (e.g, [Greasy Fork](https://greasyfork.org)), displays a found count bottom left of the webpage, automatically disappears after 10 seconds.

## Features

> Tested and compatible with TamperMonkey and ViolentMonkey.

* Multilingual support.
* Automatically finds language through ``navigator.language``, all dates are formatted to match current language.
* List displays the following information for each UserJS: name, description, author(s), version, daily installs
* List can be filtered through search.
* List is sorted by Daily Installs, highest to lowest.
* Designed for desktop and mobile devices.
* Available search engines: [Greasy Fork](https://greasyfork.org), [Sleazy Fork](https://sleazyfork.org), [Open UserJS](https://openuserjs.org)
* Built-in [Greasyfork Search with Sleazyfork Results include](https://greasyfork.org/scripts/23840).

## Known bugs

* Duplicate UserJS listings.
* *May* conflict with any UserJS that runs in iframes.
* *May* leave a opened tab when installing user scripts.

## Source Code

* [https://github.com/magicoflolis/Userscript-Plus/tree/master/src](https://github.com/magicoflolis/Userscript-Plus/tree/master/src)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
