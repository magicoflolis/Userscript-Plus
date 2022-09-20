// ==UserScript==
// @name         Magic Userscript+ : Show Site All UserJS
// @name:zh      Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-TW   Magic Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// @name:ja      Magic Userscript+ : 現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// @name:ru-RU   Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @name:ru      Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @description  Show current site all UserJS, the easier way to install UserJs for Tampermonkey.
// @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-TW   顯示當前網站的所有可用UserJS(Tampermonkey)腳本,交流QQ群:104267383
// @description:ja      現在のサイトで利用可能なすべてのUserJS（Tampermonkey）スクリプトを表示します。
// @description:ru-RU   Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @description:ru      Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @author       Magic <magicoflolis@tuta.io>
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @homepageURL  https://github.com/magicoflolis/Userscript-Plus
// @downloadURL  https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @updateURL    https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @supportURL   https://github.com/magicoflolis/Userscript-Plus/issues/new
// @version      2.4.13
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @license      MIT
// @include      *
// @exclude      *://paypal.com/*
// @exclude      *://mega.nz
// @exclude      *://*.alipay.com/*
// @exclude      *://*bank.*/*
// @exclude      *://*perfectmoney.*/*
// @exclude      *://*stripe.com/*
// @exclude      *://*ica.yandex.com/*
// @exclude      *://*authorize.net/*
// @exclude      *://*2checkout.com/*
// @exclude      *://192.168*
// @exclude      *://127.0.0*
// @exclude      *://router.*.*/*
// @exclude      *://gitlab.com/*
// @exclude      *://10.0.0*
// @exclude      *://*skrill.com/*
// @exclude      *://*zalo.me/*
// @exclude      *://pay.amazon.*/*
// @exclude      *://*.opayo.co.uk/*
// @exclude      *://*.payza.org/*
// @exclude      *://*.bluesnap.com/*
// @exclude      *://securionpay.com/*
// @exclude      *://*.unionpayintl.*/*
// @exclude      *://*.99bill.com/*
// @exclude      *://*.yeepay.com/*
// @exclude      *://*payoneer.com/*
// @exclude      *://*myetherwallet.com/*
// @exclude      *://bitpay.com/*
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
// @require      https://greasyfork.org/scripts/23419-l-js/code/ljs.js
// @require      https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/dist/userjs-base.js?_=1663717034874
// @resource     uiJs   https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus@master/dist/ui.js?_=1663717034874
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
 const sleazyfork_redirect = false, // 'true' to enable, 'false' to disable
 custom_width = '', // Default UserJS width: 90vw | Original UserJS width: 860px
 /**
 * Injected stylesheet
 * https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass
 */
 boxCSS = `*:not(select){scrollbar-color:#fff #2e323d;scrollbar-width:thin}::-webkit-scrollbar{max-width:8px !important;max-height:8px !important}::-webkit-scrollbar-thumb{background:#fff}::-webkit-scrollbar-track{background-color:#2e323d}body.userjs-popup{color:#fff !important;background-color:#2e323d !important;width:800px !important;height:550px;top:0px;left:0px}body.userjs-popup #app{position:fixed;width:inherit;display:grid;grid-template-rows:repeat(4, 1fr)}body.userjs-popup #app .ivu-card{width:100%;height:100%;padding:0px}body.userjs-popup #app .ivu-card-extra{top:8px !important}body.userjs-popup #app .ivu-card-head{border-bottom:1px solid #fff !important;padding:2.5% 16px !important}body.userjs-popup #app .ivu-badge{padding:0px 5px}body.userjs-popup #app .ivu-tooltip{border-color:#fff !important;border-radius:4px !important;background-color:#fff !important}body.userjs-popup #app .ivu-btn-icon-only,body.userjs-popup #app .ivu-modal-body,body.userjs-popup #app .ivu-table{color:#fff !important;background-color:#2e323d !important}body.userjs-popup #app .ivu-btn-icon-only td,body.userjs-popup #app .ivu-btn-icon-only th,body.userjs-popup #app .ivu-modal-body td,body.userjs-popup #app .ivu-modal-body th,body.userjs-popup #app .ivu-table td,body.userjs-popup #app .ivu-table th{color:#fff !important;background-color:#2e323d !important}body.userjs-popup #app .ivu-btn-icon-only-body,body.userjs-popup #app .ivu-modal-body-body,body.userjs-popup #app .ivu-table-body{overflow-x:hidden}body.userjs-popup #app .ivu-btn-icon-only-row-highlight,body.userjs-popup #app .ivu-btn-icon-only-row-hover,body.userjs-popup #app .ivu-modal-body-row-highlight,body.userjs-popup #app .ivu-modal-body-row-hover,body.userjs-popup #app .ivu-table-row-highlight,body.userjs-popup #app .ivu-table-row-hover{color:#9cc3e7 !important}body.userjs-popup #app .card-title{color:#fff !important;cursor:pointer}body.userjs-popup #app .table-footer{position:fixed;bottom:0;padding-left:10px;width:100%;background-color:#fff}body.userjs-popup #app .table-footer a{color:#ed3f14}body.userjs-popup #app .circle{width:56px;height:56px;line-height:56px;border-radius:28px;float:right;right:40px}body.userjs-popup #app .badge{top:-17px;left:-6%;width:26px;height:26px;line-height:26px;border-radius:13px}@media screen and (max-width: 1228px){.jae-userscript{max-width:100%;width:100%;height:100%}}.jae-userscript{position:fixed;width:370px;bottom:10px;right:20px;z-index:9999999999;height:56px;background:rgba(0,0,0,0)}.jae-userscript iframe{width:100%;height:100%;border:0px;border-radius:15px;display:block !important}.jae-userscript span{background-color:#2e323d;color:#fff;width:fit-content;display:block;padding:1rem;border-radius:15px;right:10px;position:fixed}.jae-userscript-shadow{box-shadow:0 1px 4px rgba(0,0,0,.3)}.jae-userscript-shadow:after,.jae-userscript-shadow:before{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%;box-shadow:0 15px 10px rgba(0,0,0,.7)}.jae-userscript-shadow:after{right:10px;left:auto;transform:rotate(3deg)}.jae-userscript-shadow:before{transform:rotate(-3deg)}@media(prefers-color-scheme: dark){body.userjs-options :root{background-color:#202023;color:#e8eaed}body.userjs-options section:not(:first-child){border-top:1px solid #4c4c4e}}body.userjs-options form{font-size:1.25em}body.userjs-options section:not(:first-child){border-top:1px solid #4c4c4e}body.userjs-options section.checkbox>label,body.userjs-options section.checkboxlist>label,body.userjs-options section.select{display:flex;justify-content:space-between;padding:.825em}body.userjs-options section.checkbox>label,body.userjs-options section.checkboxlist>label{cursor:pointer}body.userjs-options section.checkboxlist{padding-left:.825em;padding-bottom:.5em}body.userjs-options section.checkboxlist>label{padding-top:.5em;padding-bottom:.5em}body.userjs-options section.checkboxlist p{margin-bottom:.5em}body.userjs-options .switch{position:relative;width:38px;user-select:none}body.userjs-options .switch input{display:none}body.userjs-options .switch input:checked+label{background-color:#5a6f93;margin-left:0}body.userjs-options .switch input:checked+label:before{right:0px;background-color:#8ab4f8}body.userjs-options .switch label{display:block;overflow:hidden;cursor:pointer;height:16px;padding:0;line-height:16px;border:0px solid #fff;border-radius:20px;background-color:#9aa0a6}body.userjs-options .switch label:before{content:"";display:block;width:20px;height:20px;margin:-2px;background:#dadce0;position:absolute;top:0;right:20px;border-radius:20px}/*# sourceMappingURL=magicuserjs.css.map */
`,
 err = (...error) => {
    console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...error);
  };

 if(typeof unsafeWindow === 'undefined') {
   err('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', "Unsupported: unsafeWindow");
 } else {
  unsafeWindow.GmAjax = GM_xmlhttpRequest;
 };

/* eslint-disable no-undef */
(() => {
	ljs.addAliases({
		jQuery:'https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.slim.min.js'
	});
  const win = self ?? window,
  doc = win.document,
  qs = (element, selector) => {
    selector = selector ?? doc ?? doc.body;
    return selector.querySelector(element);
  },
  delay = ms => new Promise(resolve => setTimeout(resolve, ms)),
  iframe = {
    write: () => {
      const root = qs('#jae_userscript_box > .jae-userscript',doc.body),
      dom = root.children[0],
      domDoc = `<!DOCTYPE html><html>
      <head>
      <meta charset="utf-8">
      <title>Show Site All UserJS</title>
      </head>
      <body style="background: none transparent">
      <div id="app"></div>
      </body></html>`;
      if (dom.tagName && 'iframe' == dom.tagName.toLowerCase()) {
        let c = dom.contentDocument ?? dom.contentWindow.document;
        try {
          c.open();
          c.write(domDoc);
          c.close();
        } catch (d) {
          err(`loading { ${dom.name} }`);
          if(root) {
            root.innerHTML = `<span>[ERROR] loading { ${dom.name} }</span>`;
            delay(2500).then(() => {
              root.innerHTML = '';
            });
          };
        }
      }
    }
  },
  sleazy = () => {
    let otherSite = /greasyfork\.org/.test(location.hostname) ? 'sleazyfork' : 'greasyfork';
    qs('span.sign-in-link') ? /scripts\/\d+/.test(location.href) ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a')) ? location.href = location.href.replace(/\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/, '//$1' + otherSite + '.org') : false : false : false;
  };

  class FetchUserjs {
    constructor() {
      this.host = win.location.hostname.split('.').splice(-2).join('.');
      this.showTime = 10;
      this.quietKey = 'jae_fetch_userjs_quiet';
      this.countKey = 'jae_fetch_userjs_count';
      this.adultKey = 'jae_fetch_userjs_adult';
      this.tplBox = `<div id="jae_userscript_box">
    <style>${boxCSS}</style>
    <div class="jae-userscript">
    <iframe class="UserJSFrame" name="jaeFetchUserJSFrame" src="about:blank" allowTransparency="true"></iframe>
    </div>
    </div>`;
    }

    getCountData(host) {
      let countData = GM_getResourceText('count');
      countData = JSON.parse(countData);
      let count = countData[host];
      sessionStorage.setItem(this.countKey, count);
      return count;
    }

    setSize(w, h) {
      if(w.trim() === '90vw') {
        if(custom_width.trim() !== '') {
          return qs('#jae_userscript_box > .jae-userscript',doc.body).setAttribute('style', `width: ${custom_width};height: ${h}px;`)
        }
      }
      return qs('#jae_userscript_box > .jae-userscript',doc.body).setAttribute('style', `width: ${w};height: ${h}px;`)
    }

    addEventListener(eventName, handler) {
      qs('#jae_userscript_box').addEventListener(eventName, handler);
    }

    bindEvent() {
      this.timeId = setTimeout(() => {
        qs('#jae_userscript_box').remove();
      }, this.showTime * 1000);
      this.addEventListener('max', () => {
        this.setSize('90vw', 492);
        clearTimeout(this.timeId);
      });
      this.addEventListener('min', () => {
        this.setSize('370px', 56);
      });
      this.addEventListener('close', () => {
        sessionStorage.setItem(this.quietKey, 1);
        qs('#jae_userscript_box').remove();
      });
      this.addEventListener('loading', () => {
        clearTimeout(this.timeId);
      });
    }

    execFrameJs(frameWindow) {
      let uiJs = GM_getResourceText('uiJs');
      return function (jsStr) {
        frameWindow.eval(jsStr);
      }.call(frameWindow, uiJs);
    }

    get isQuiet() {
      let quiet = sessionStorage.getItem(this.quietKey);
      return quiet ? true : false;
    }

    render() {
      if (!this.isQuiet) {
        if (this.getCountData(this.host)) {
          $('body').append(this.tplBox);
          iframe.write();
          this.execFrameJs(jaeFetchUserJSFrame.window);
          this.bindEvent();
        }
      }
    }

  }

  let fu = new FetchUserjs();
  ljs.exec(['jQuery'], () => {
    /greasyfork\.org/.test(location.hostname) && sleazyfork_redirect ? sleazy() : false;
    fu.render();
  });

})();

