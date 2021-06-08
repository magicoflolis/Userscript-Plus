// ==UserScript==
// @name         Magic Userscript+ : Show Site All UserJS
// @name:zh      Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-CN   Magic Userscript+ : 显示当前网站所有可用的UserJS脚本 Jaeger
// @name:zh-TW   Magic Userscript+ : 顯示當前網站所有可用的UserJS腳本 Jaeger
// @name:ja      Magic Userscript+ : 現在のサイトの利用可能なすべてのUserJSスクリプトを表示するJaeger
// @name:ru-RU   Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @name:ru      Magic Userscript+ : Показать пользовательские скрипты (UserJS) для сайта. Jaeger
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @version      2.3.12
// @description         Show current site all UserJS，The easier way to install UserJs for Tampermonkey.
// @description:zh      显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-CN   显示当前网站的所有可用UserJS(Tampermonkey)脚本,交流QQ群:104267383
// @description:zh-TW   顯示當前網站的所有可用UserJS(Tampermonkey)腳本,交流QQ群:104267383
// @description:ja      現在のサイトで利用可能なすべてのUserJS（Tampermonkey）スクリプトを表示します。
// @description:ru-RU   Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @description:ru      Показывает пользовательские скрипты (UserJS) для сайта. Легкий способ установить пользовательские скрипты для Tampermonkey.
// @author       Magic of Lolis <magicoflolis@gmail.com>
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
// @include      *
// @exclude      *://mega.nz/*
// @exclude      *://*.alipay.com/*
// @exclude      *://*.paypal.com/*
// @exclude      *://*bank.*/*
// @exclude      *://*perfectmoney.*/*
// @exclude      *://*stripe.com/*
// @exclude      *://*ica.yandex.com/*
// @exclude      *://*authorize.net/*
// @exclude      *://*2checkout.com/*
// @exclude      *://bitpay.com/*
// @exclude      *://192.168*
// @exclude      *://127.0.0*
// @exclude      *://router.*.*/*
// @exclude      *://github.com/*
// @exclude      *://gitlab.com/*
// @exclude      *://10.0.0*
// @exclude      *://*skrill.com/*
// @exclude      *://*zalo.me/*
// @exclude      *://pay.amazon.com/*
// @exclude      *://*.opayo.co.uk/*
// @exclude      *://*.payza.org/*
// @exclude      *://*.bluesnap.com/*
// @exclude      *://securionpay.com/*
// @exclude      *://*.unionpayintl.*/*
// @exclude      *://*.99bill.com/*
// @exclude      *://*.yeepay.com/*
// @exclude      *://*payoneer.com/*
// @exclude      *://*myetherwallet.com/*
// @require     https://cdn.jsdelivr.net/gh/jae-jae/l.js/userjs/l.userjs.min.js
// @require     https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.js?_=1623182752555
// @resource     ui     https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.html?_=1623182752555
// @resource     count  https://greasyfork.org/scripts/by-site.json
// @resource     adult  https://sleazyfork.org/scripts/by-site.json
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @noframes
// @connect      cdn.bootcss.com
// @connect      raw.githubusercontent.com
// @connect      gist.githubusercontent.com
// @connect      cdnjs.cloudflare.com
// @connect      greasyfork.org
// @connect      sleazyfork.org
// @connect      cdn.jsdelivr.net
// @run-at       document-end
// ==/UserScript==

unsafeWindow.GmAjax = GM_xmlhttpRequest;

(function() {

    class FetchUserjs {
    constructor() {
        this.host = this.getMainHost();
        this.showTime = 10;
        this.quietKey = 'jae_fetch_userjs_quiet';
        this.countKey = 'jae_fetch_userjs_count';
        this.adultKey = 'jae_fetch_userjs_adult';
        this.tplBox = '<div id="jae_userscript_box"><style>.jae-userscript{position:fixed;width:370px;bottom:10px;right:20px;z-index:9999999999;height:56px}.jae-userscript-shadow{box-shadow:0 1px 4px rgba(0,0,0,.3),\\t\\t\\t\\t0px 0 20px rgba(0,0,0,.1) inset}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%}.jae-userscript-shadow::before,.jae-userscript-shadow::after{content:"";position:absolute;z-index:-1;bottom:15px;left:10px;width:50%;height:20%;box-shadow:0 15px 10px rgba(0,0,0,.7);transform:rotate(-3deg)}.jae-userscript-shadow::after{right:10px;left:auto;transform:rotate(3deg)}</style><div class="jae-userscript" class=""></div></div>';
    }

    getMainHost() {
        let host = window.location.hostname;
        return psl.get(host) || host.split('.').splice(-2).join('.');
    }

    getCountData(host) {
        let countData = GM_getResourceText('count');
        countData = JSON.parse(countData);
        let count = countData[host];
        sessionStorage.setItem(this.countKey, count);
        let adultData = GM_getResourceText('adult');
        adultData = JSON.parse(adultData);
        let adult = adultData[host];
        sessionStorage.setItem(this.adultKey, adult);
        return count && adult;
    }

    getAdultData(host) {
        let adultData = GM_getResourceText('adult');
        adultData = JSON.parse(adultData);
        let adult = adultData[host];
        sessionStorage.setItem(this.adultKey, adult);
        return adult;
    }

    setSize(w, h) {
        $('.jae-userscript').css({
            width: w,
            height: h
        });
    }

    addEventListener(eventName, handler) {
        document.getElementById('jae_userscript_box').addEventListener(eventName, handler);
    }

    bindEvent() {
        this.timeId = setTimeout(() => {
            $('#jae_userscript_box').remove();
        }, this.showTime * 1000);

        this.addEventListener('max', () => {
            this.setSize(860, 492);
            $('.jae-userscript').addClass('jae-userscript-shadow');
            clearTimeout(this.timeId);
        });

        this.addEventListener('min', () => {
            setTimeout(() => {
                $('.jae-userscript').removeClass('jae-userscript-shadow');
                this.setSize(370, 56);
            }, 500);
        });

        this.addEventListener('close', () => {
            sessionStorage.setItem(this.quietKey, 1);
            $('#jae_userscript_box').remove();
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
            let count = this.getCountData(this.host);
            if (count) {
                $('body').append(this.tplBox);

                let ui = GM_getResourceText('ui'),
                    dom = document.getElementsByClassName('jae-userscript')[0],
                    tpl = '<iframe name="jaeFetchUserJSFrame" src="about:blank" style="width:100%;height:100%;border:0px;display: block!important;" allowTransparency="true"></iframe>';
                dom.innerHTML = tpl;
                let iframeDom = dom.children[0];
                iframe.write(iframeDom, ui);

                this.execFrameJs(jaeFetchUserJSFrame.window);

                this.bindEvent();
            }
        }
    }

}

ljs.exec(['jQuery', 'iframe', 'psl'], () => {
    let fu = new FetchUserjs();
    fu.render();
});

})();