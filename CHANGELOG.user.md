# Changelog

## v7.6.0

* New feature, `Preview Metadata` - same as `Preview Code` but loads userscripts metadata head
* New feature, `Page` - loads additonal information from userscripts homepage
* Config changes, moved `codePreview` value to `preview: code`, recommended resetting your config to clear any old/unused settings.
  * If you had `Preview Code` enabled, you will need to re-enable it
* When `Preview Metadata` and `Preview Code` are both enabled, it will display the entire userscript
* Icon changes, svgs are now from [fontawesome.com](fontawesome.com)
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
* SVG elements don't load on every webpage, _can be blocked by the page, external scripts, or web extensions._
* If an item changes after the list is sorted, the sorting won't be updated

**TODO:**

* Finish translations.
* Finish blacklist section.

---

## v7.5.0

* Merged https://github.com/magicoflolis/Userscript-Plus/pull/64
* Cleaned up old comments

**Known Issues:**

* Enabling a engine requires the page to be reloaded, while disabling a engine does not.
  * This is caused by the cache system.
* "Filter out other languages" may not filter _every_ userscript that is not in your language.
* SVG elements don't load on every webpage, _can be blocked by the page, external script, or extensions._

**TODO:**

* Finish translations.
* Finish blacklist section.
* Finish config section.

---

## v7.4.0

* Merged https://github.com/magicoflolis/Userscript-Plus/pull/59
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
* SVG elements don't load on every webpage, _can be blocked by the page, external script, or extensions._

**TODO:**

* Finish translations.
* Finish blacklist section.
* Finish config section.
* Merge https://github.com/magicoflolis/Userscript-Plus/pull/64

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
* SVG elements don't load on every webpage, _can be blocked by the page, external script, or extensions._

**TODO:**

* Finish translations.
* Finish blacklist section.
* Merge https://github.com/magicoflolis/Userscript-Plus/pull/59
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
* SVG elements don't load on every webpage, _can be blocked by the page._

**TODO:**

* Add [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) into list
* Merge https://github.com/magicoflolis/Userscript-Plus/pull/59
* Add sorting to the following: "Total installs", "Ratings", "Created date"

---

## v7.1.1

* Fixed "Error When Opening YouTube" https://github.com/magicoflolis/Userscript-Plus/issues/63

---

## v7.1.0

* Implemented [Task Scheduling API](https://developer.mozilla.org/en-US/docs/Web/API/Prioritized_Task_Scheduling_API)
  * Limited availability, see [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler#browser_compatibility)
  * I added basic polyfills so hopefully there won't be issues.
* Improved error handling
* _Be sure to look in your console if the UserScript stops working for some reason!_

**Known Issues:**

* "Filter out other languages" may not filter _every_ userscript that is not in your language.
* SVG elements don't load on every webpage, _can be blocked by the page._

**TODO:**

* Add [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) into list
* Merge https://github.com/magicoflolis/Userscript-Plus/pull/59
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
* SVG elements don't load on every webpage, _can be blocked by the page._

**TODO:**

* Add sorting to the following: "Total installs", "Ratings", "Created date"
* Improve design of blacklist section

---

## Previous Changes

[https://github.com/magicoflolis/Userscript-Plus/releases](https://github.com/magicoflolis/Userscript-Plus/releases)
