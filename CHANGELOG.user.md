# What's New (v7.1.0)

* Implemented [Task Scheduling API](https://developer.mozilla.org/en-US/docs/Web/API/Prioritized_Task_Scheduling_API)
  * Limited availability, see [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler#browser_compatibility)
  * I added basic polyfills so hopefully there won't be issues.
* Improved error handling
* _Be sure to look in your console if the UserScript stops working for some reason!_

## Known Issues

* "Filter out other languages" may not filter _every_ userscript that is not in your language.
* SVG elements don't load on every webpage, _can be blocked by the page._

## TODO

* Add [GreasyFork Bullshit Filter](https://greasyfork.org/scripts/12179) into list
* Merge https://github.com/magicoflolis/Userscript-Plus/pull/59
* Add sorting to the following: "Total installs", "Ratings", "Created date"
* Improve design of blacklist section

---

# What's New (v7.0.0)

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

## Known Issues

* "Filter out other languages" may not filter _every_ userscript that is not in your language.
* SVG elements don't load on every webpage, _can be blocked by the page._

## TODO

* Add sorting to the following: "Total installs", "Ratings", "Created date"
* Improve design of blacklist section

---
