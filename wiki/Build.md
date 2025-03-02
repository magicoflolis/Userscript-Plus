# Build

Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) - *the version of Node.js should match or be greater than the `"node"` key in `package.json`.*

```sh
# Install dependencies
$ pnpm i
```

**UserScript:**

Before you begin, rename `.env.example` to `.env`

**Recommened Testing Environments:**

- **Desktop:** any browser with [ViolentMonkey](https://violentmonkey.github.io/), see [How to edit scripts with your favorite editor?](https://violentmonkey.github.io/posts/how-to-edit-scripts-with-your-favorite-editor/)
- **Mobile:**
  - Desktop: use "Responsive Design Mode (Ctrl+Shift+M)" on [FireFox Developer Edition](https://www.mozilla.org/firefox/developer/) or [FireFox](https://www.mozilla.org/firefox/)
  - Android: any browser with UserScript support or support for installing a UserScript manager, I use [Cromite](https://github.com/uazo/cromite)
  - IOS: any browser with UserScript support or support for installing a UserScript manager

```sh
# Watch and build to local HTTP server
$ pnpm run dev:UserJS

# Build UserScript to "./dist"
$ pnpm run pub:UserJS
```

---

**WebExtension:**

```sh
# Build WebExtension (developer version) for "Chromium" to "./build/chrome"
$ pnpm run dev:Cr
# Build WebExtension (developer version) for "Firefox" to "./build/firefox"
$ pnpm run dev:FF
# Build WebExtension (public version) for "Chromium" to "./build/chrome"
$ pnpm run webpack:Cr
# Build WebExtension (public version) for "Firefox" to "./build/firefox"
$ pnpm run webpack:FF

# [ Testing ]
# Browsers can be launched via "Run and Debug" in VSCode.
# Edit runtimeExecutable in ".vscode/launch.json" to your Chrome executable.
# Recommended to create an additional profile "about:profiles" for Firefox.
```

## Contribution Rules

**General:**

Follow [Semantic Versioning](https://semver.org/) standards, if your unsure you don't need to update the version

---

**Translations:**

Translations follow [Web Extension Internationalization](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Internationalization) standards

---

**UserScript:**

Do not edit the UserScript found in the `./dist` directory, the file is auto generated from `dev:UserJS` command. Instead edit it from `./src/UserJS`

## Contribution Guide

Fork this repo, make your changes, and open a [pull request](https://github.com/magicoflolis/Userscript-Plus/pulls)

**Translations:**

Translations are located in `./src/_locales`

For versioning translations are a PATCH

**Adding:**

Recommend using `./src/_locales/en/messages.json` as a template

**Updating:**

Update any key from `messages.json` file
