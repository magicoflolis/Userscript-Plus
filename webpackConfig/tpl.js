// ==UserScript==
// @name         Magic Userscript+ : Show Site All UserJS
// @name:zh      Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-TW   Magic Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// @name:ja      Magic Userscript+ : 現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// @name:ru-RU   Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @name:ru      Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @description         List current website UserJS/UserScripts, The easier way to install UserJS/UserScripts.
// @description:zh      列出当前网站UserJS/UserScripts, 安装UserJS/UserScripts的更简单的方法。
// @description:zh-CN   列出当前网站UserJS/UserScripts, 安装UserJS/UserScripts的更简单的方法。
// @description:zh-TW   列出當前網站使用者JS/使用者腳本，安裝使用者JS/使用者腳本的更簡單方法。
// @description:ja      現在のウェブサイトのユーザーJS/ユーザースクリプトをリスト, ユーザーJS/ユーザースクリプトをインストールする簡単な方法.
// @description:ru-RU   Перечислите текущий веб-сайт UserJS/UserScripts, более простой способ установки UserJS/UserScripts.
// @description:ru      Перечислите текущий веб-сайт UserJS/UserScripts, более простой способ установки UserJS/UserScripts.
// @author       Magic of Lolis <magicoflolis@gmail.com>
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @homepageURL  https://github.com/magicoflolis/Userscript-Plus#magic-userscript
// @supportURL   https://github.com/magicoflolis/Userscript-Plus/issues/new
// @version      2.3.12
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @license      MIT
// @include      *
// @exclude      *://paypal.com/*
// @exclude      *://mega.nz
// @exclude      *://192.168*
// @exclude      *://127.0.0*
// @exclude      *://router.*.*/*
// @exclude      *://gitlab.com/*
// @exclude      *://10.0.0*
// @exclude      *://bitpay.com/*
// @exclude      *://pay.amazon.*/*
// @exclude      *://securionpay.com/*
// @exclude      *skrill.com/*
// @exclude      *zalo.me/*
// @exclude      *.opayo.co.uk/*
// @exclude      *.payza.org/*
// @exclude      *.bluesnap.com/*
// @exclude      *.unionpayintl.*/*
// @exclude      *.99bill.com/*
// @exclude      *.yeepay.com/*
// @exclude      *payoneer.com/*
// @exclude      *myetherwallet.com/*
// @exclude      *pay.com/*
// @exclude      *bank.*/*
// @exclude      *perfectmoney.*/*
// @exclude      *stripe.com/*
// @exclude      *ica.yandex.com/*
// @exclude      *authorize.net/*
// @exclude      *2checkout.com/*
// @exclude      *://*.*/login
// @exclude      *://*.*/join
// @exclude      *://*.*/signin
// @exclude      *://*.*/signup
// @exclude      *://*.*/sign-up
// @exclude      *://*.*/cart
// @exclude      *://*.*.gov/*
// @exclude      *://*.*/password_reset
// @exclude      *://*.*/checkout*
// @exclude      *://*.*/settings/*
// @exclude      *://*.*/options/*
// @exclude      *://*.*.*/login
// @exclude      *://*.*.*/join
// @exclude      *://*.*.*/signin
// @exclude      *://*.*.*/signup
// @exclude      *://*.*.*/sign-up
// @exclude      *://*.*.*/cart
// @exclude      *://*.*.*/checkout*
// @exclude      *://*.*.*/settings/*
// @exclude      *://*.*.*/options/*
// @exclude      *://*.*.*.gov/*
// @exclude      *://*.*.*/password_reset
// @require      https://greasyfork.org/scripts/23419/code/ljs.js
{ljs}
// @resource     count  https://greasyfork.org/scripts/by-site.json
// @resource     adult  https://sleazyfork.org/scripts/by-site.json
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @noframes
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @connect      cdn.jsdelivr.net
// @run-at       document-end
// ==/UserScript==

/**
 * Enable built-in "Greasyfork Search with Sleazyfork Results include"
 * 启用内置"使用 Sleazyfork 搜索"结果包括"
 * 組み込みの「スライジーフォークの結果を含む脂っこく検索」を有効にする
 * Включить встроенный "Greasyfork Поиск с Sleazyfork Результаты включают"
 * https://greasyfork.org/scripts/23840
 */
let sleazyfork_redirect = false; // "true" to enable, "false" to disable

unsafeWindow.GmAjax = GM_xmlhttpRequest;

(() => {
  
  {code}
  
})();
