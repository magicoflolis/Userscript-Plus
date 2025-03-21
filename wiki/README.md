# Wiki Page

- [Wiki Page](#wiki-page)
  - [GitHub Detection](#github-detection)
  - [Shortcuts](#shortcuts)

## GitHub Detection

For this Web Extension / UserScript to detect your UserScript or UserStyle:

- Your repository must have the following:
  - UserScripts **must** be in `.user.js` format
  - UserStyles **must** be in `.user.css` format
  - In the Topics section of your repository:
    - `domain` or `hostname`:
      - example: you create a userscript for `google.com` then put `google` in the Topics section
      - if you match all sites: `*` or `http*://*` then put `all-sites` in the Topics section
    - put `userscript` or `userstyle` in the Topics section

_if you need to create a build environment, you can use my workspace and tools as a template._

## Shortcuts

**New Tab:**

Syntax: `*` - Shortcut for userscipts that apply to `All sites`

Syntax: `<valid url>`

```txt
# Example
google.com
```

---

Syntax: `mujs:`

```txt
# Available
settings

# Example
mujs:settings
```

---

**Search Bar:**

By default it will search by name and description, you can refine your searches using the examples listed below.

Syntax: `filter:`

```txt
# Available
ascii
latin
games
socialnetworks
clutter

# Example
filter:ascii
```

---

Syntax: `code_url:` or `url:`

```txt
# Example
code_url:google.com
```

---

Syntax: `author:` or `users:`

```txt
# Example
author:magicoflolis
```

---

Syntax: `locale:` or `i18n:`

```txt
# Example
locale:en
```

---

Syntax: `id:`

```txt
# Example
id:421603
```

---

Syntax: `license:`

```txt
# Example
license:MIT
```

---

Syntax: `name:`

```txt
# Example
name:Userscript+
```

---

Syntax: `description:`

```txt
# Example
description:Finds available userscripts for the current webpage.
```

---

Syntax: `search_engine:` or `engine:`

```txt
# Example
search_engine:greasyfork
```

---

Syntax: `recommend:`

```txt
# Example
recommend:
```
