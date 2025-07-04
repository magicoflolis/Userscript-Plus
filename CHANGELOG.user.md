# Changelog

**Known Issues:**

* SVG elements don't load on every webpage:
  * _can be blocked by host, external scripts, web extensions, etc._

**TODO:**

* Finish translations.
* Finish blacklist section.
* GitHub engine - filter out UserScript and UserStyles that don't match the host
* Rework TrustedTypePolicy code

## v7.6.8

* Bug fixes:
  * Fixed [#70](https://github.com/magicoflolis/Userscript-Plus/issues/70)

---

## v7.6.7

* Bug fixes:
  * Fixed [#69](https://github.com/magicoflolis/Userscript-Plus/issues/69)

---

## v7.6.6

* Config changes:
  * `autofetch` is now OFF by default
* Internal changes:
  * refactored some code, better readability
  * added info icon along with help links
* General changes:
  * while `autofetch` is off, clicking the counter for the first time will auto fetch results
  * minor bug fixes

**TODO:**

* Finish translations.
* Finish blacklist section.
* GitHub engine - filter out UserScript and UserStyles that don't match the host

---

## v7.6.5

* fixed [#67](https://github.com/magicoflolis/Userscript-Plus/issues/67)

---

## v7.6.4

* fixed `this.hostCache` for real this time
* changed `safeSelf` into a class

---

## v7.6.3

* fixed [#66](https://github.com/magicoflolis/Userscript-Plus/issues/66)
  * `this.cache` should have been `this.hostCache`, my bad

---

## v7.6.2

* Improvements:
  * improved multiple UserScript/UserStyle detection
  * improved cache system
  * _improved_ hostname recognition - somewhat follows web extension version
  * improved readablity of "Theme Colors" section
  * improved import/export of config and theme
  * improved download process of UserScripts and UserStyles
* Config changes:
  * GitHub engine:
    * if your a UserScript or UserStyle developer and it's hosted on GitHub see [GitHub Detection](https://github.com/magicoflolis/Userscript-Plus/tree/master/wiki#github-detection)
    * will now list all UserScripts and UserStyles within a repository - _even if they don't match the host_
    * multiple urls will now be fetched:
      * `https://api.github.com/search/repositories?q=topic:{domain}+topic:userstyle` - cannot be changed in the settings menu
      * `https://api.github.com/search/repositories?q=topic:{domain}+topic:userscript` - reset your config or manually set this address for changes to take effect
    * the repository is removed from the list if no valid UserScripts or UserStyles are found
* Bug fixes:
  * fixed "Enabling a engine requires the page to be reloaded, while disabling a engine does not."
  * fixed "If an item changes after the list is sorted, the sorting won't be updated"
  * fixed menu not timing out when "Fetch on load" was disabled
  * fixed tab when searching for all-sites / `*`
  * fixed searching settings
* Internal changes:
  * removed `Memorize` class
  * removed unused \@grants `GM_addValueChangeListener`, `GM_removeValueChangeListener`, and there `GM.*` counter parts
  * removed some unused functions, types, css
  * shortened some functions, types, css
* i18n additions (still not localized):
  * new keys: `code`, `metadata`, `preview_metadata`, `recommend_author`, `recommend_other`, `default_sort`

**TODO:**

* Finish translations.
* Finish blacklist section.
* GitHub engine - filter out UserScript and UserStyles that don't match the host

---

## v7.6.1

* Fixed sorting

---

## v7.6.0

* New feature, `Preview Metadata` - same as `Preview Code` but loads userscripts metadata head
* New feature, `Page` - loads additonal information from userscripts homepage
* Config changes, moved `codePreview` value to `preview: code`, recommended resetting your config to clear any old/unused settings.
  * If you had `Preview Code` enabled, you will need to re-enable it
* When `Preview Metadata` and `Preview Code` are both enabled, it will display the entire userscript
* Icon changes, svgs are now from [fontawesome.com](https://fontawesome.com)
* Search engines have been moved to the `Search Engines` section
* Improved mobile UI
* Improved userscript parsing
* Improved load times - added custom event to handle async item changes
* Improved GitHub engine
  * Number of stars for a repo = daily installs
  * Number of watchers for a repo = good rating
* Cleanup old css
* Minor bug fixes

**Known Issues:**

* Enabling a engine requires the page to be reloaded, while disabling a engine does not.
  * This is caused by the cache system.
* If an item changes after the list is sorted, the sorting won't be updated

**TODO:**

* Finish translations.
* Finish blacklist section.

---

## v7.5.0

* Merged [#64](https://github.com/magicoflolis/Userscript-Plus/pull/64)
* Cleaned up old comments

**Known Issues:**

* Enabling a engine requires the page to be reloaded, while disabling a engine does not.
  * This is caused by the cache system.
* "Filter out other languages" may not filter _every_ userscript that is not in your language.

**TODO:**

* Finish translations.
* Finish blacklist section.
* Finish config section.

---

## v7.4.0

* Merged [#59](https://github.com/magicoflolis/Userscript-Plus/pull/59)
* Added `githubusercontent.com` to `@connect`.
* Added `autoSort` to config.
* Added sorting to the following: "Total installs", "Ratings", "Created date".
  * Still in the early stages, but functional
* Reworked counter system.
* Tweaked cache system.
  * Reduced how often the script will cache something.
* Cleaned up code.
* Fixed minor issues.

**Known Issues:**

* Enabling a engine requires the page to be reloaded, while disabling a engine does not.
  * This is caused by the cache system.
* "Filter out other languages" may not filter _every_ userscript that is not in your language.

**TODO:**

* Finish translations.
* Finish blacklist section.
* Finish config section.
* Merge [#64](https://github.com/magicoflolis/Userscript-Plus/pull/64)

---

## v7.3.0

* Re-organized config list.
* Added [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) into list.
  * You can enable it under "List Filters" in the config.
  * You can also do `filter:` in the search bar to quickly filter the list.
    * Full list [here](https://github.com/magicoflolis/Userscript-Plus/tree/master/wiki/README.md)
    * Example: `filter:ascii` => filters out non-ASCII scripts

**Known Issues:**

* "Filter out other languages" may not filter _every_ userscript that is not in your language.

**TODO:**

* Finish translations.
* Finish blacklist section.
* Merge [#59](https://github.com/magicoflolis/Userscript-Plus/pull/59)
* Add sorting to the following: "Total installs", "Ratings", "Created date"

---

## v7.2.0

* New config "Inject on load", when disabled prevents this script from injecting the menu automatically.
  * You can still inject the menu through the context menu in your UserScript manager.
  * This will reduce overall distraction the script can have on certain pages.
* New config "Fetch on load", when disabled prevents UserScripts from being fetched automatically.
  * When the menu is re-injected through the context menu in your UserScript manager UserScripts will always be fetched automatically.
  * This will reduce network traffic for the engines.
* Improved design of theme section.
* Improved design of blacklist section, adding new pages to the list is still incomplete.
* Changed "Sync with GM" to "Sync with UserScript Manager".
* Made it so translated UserScripts are a different color in the list.
* CSS adjustments.

**Known Issues:**

* "Filter out other languages" may not filter _every_ userscript that is not in your language.

**TODO:**

* Add [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) into list
* Merge [#59](https://github.com/magicoflolis/Userscript-Plus/pull/59)
* Add sorting to the following: "Total installs", "Ratings", "Created date"

---

## v7.1.1

* Fixed "Error When Opening YouTube" [#63](https://github.com/magicoflolis/Userscript-Plus/issues/63)

---

## v7.1.0

* Implemented [Task Scheduling API](https://developer.mozilla.org/en-US/docs/Web/API/Prioritized_Task_Scheduling_API)
  * Limited availability, see [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler#browser_compatibility)
  * I added basic polyfills so hopefully there won't be issues.
* Improved error handling
* _Be sure to look in your console if the UserScript stops working for some reason!_

**Known Issues:**

* "Filter out other languages" may not filter _every_ userscript that is not in your language.

**TODO:**

* Add [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) into list
* Merge [#59](https://github.com/magicoflolis/Userscript-Plus/pull/59)
* Add sorting to the following: "Total installs", "Ratings", "Created date"
* Improve design of blacklist section

---

## v7.0.0

* Ability to change the URL of each engine
  * **Please reset your config if updating!**
* Added "Bad UserScripts" which will blacklist certain userscripts from showing
* Search improvements
  * Can now search settings
  * New search abilities, example `license:MIT`
  * `code_url:` or `url:`
  * `author:` or `users:`
  * `locale:` or `i18n:`
  * `id:`
  * `license:`
  * `name:`
  * `description:`
  * `search_engine:` or `engine:`
* UI ajustments

**Known Issues:**

* "Filter out other languages" may not filter _every_ userscript that is not in your language.

**TODO:**

* Add sorting to the following: "Total installs", "Ratings", "Created date"
* Improve design of blacklist section

---

## Previous Changes

[https://github.com/magicoflolis/Userscript-Plus/releases](https://github.com/magicoflolis/Userscript-Plus/releases)
