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
// @require      https://greasyfork.org/scripts/23419-l-js/code/ljs.js
// @require      https://greasyfork.org/scripts/23420-userjs-base-js/code/userjs-basejs.js
// @resource     uiJs   https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.gf.js?_=1624766095027
// @resource     ui     https://cdn.jsdelivr.net/gh/magicoflolis/Userscript-Plus/dist/ui.html?_=1624766095029
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

/**
* Enable built-in "Greasyfork Search with Sleazyfork Results include"
* 启用内置"使用 Sleazyfork 搜索"结果包括"
* 組み込みの「スライジーフォークの結果を含む脂っこく検索」を有効にする
* Включить встроенный "Greasyfork Поиск с Sleazyfork Результаты включают"
*/
let sleazyfork_redirect = true; // "true" to enable, "false" to disable

unsafeWindow.GmAjax = GM_xmlhttpRequest;

(() => {
  (document.location.hostname === "greasyfork.org" || document.location.hostname === "sleazyfork.org") ? (sleazyfork_redirect ? sleazyfork() : false) : false;

  function sleazyfork() {
    if(document.querySelector('span.sign-in-link')){
    let otherSite=/greasyfork\.org/.test(location.hostname)?"sleazyfork":"greasyfork";
    if(/scripts\/\d+/.test(location.href)){
      (!document.querySelector("#script-info") && (otherSite == "greasyfork" || document.querySelector("div.width-constraint>section>p>a"))) ? location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org") : false
    }else if(/\/(scripts|users)(\/|.*(\?|&)q=|.*\?set=)/.test(location.href)){
      GM_xmlhttpRequest({
        method: 'GET',
        url: location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org"),
        onload: (result) => {
          let doc = null;
          try {
            doc = document.implementation.createHTMLDocument('');
            doc.documentElement.innerHTML = result.responseText;
          }
          catch (e) {
            console.log('parse error');
          }
          if (!doc) {
            return;
          }
          let l = doc.querySelector('ol.script-list');
          if (l) {
            let ml = document.querySelector('ol.script-list');
            if(!ml){
              ml=document.createElement("ol");
              ml.setAttribute("class","script-list");
              let list=document.querySelector('.sidebarred-main-content');
              let ps=list.querySelectorAll("p");
              for(let i=0;i<ps.length;i++){
                let p=ps[i];
                list.removeChild(p);
              }
              list.appendChild(ml);
            }
            let scs=l.querySelectorAll("li");
            if(scs){
              for(let i=0;i<scs.length;i++){
                let sc=scs[i];
                (!ml.querySelector("li[data-script-id='"+sc.getAttribute("data-script-id")+"']")) ? (addScore(sc),ml.appendChild(sc)) : false;
              }
            }
          }
        },
        onerror: function(e) {
          console.log(e);
        }
      });
    }
    function addScore(script){
      let separator=script.querySelector('h2>span.name-description-separator');
      let description=script.querySelector('h2>span.description');
      if(separator){
        let score=document.createElement("strong");
        score.style.color="#e09015";
        score.innerHTML=script.getAttribute("data-script-rating-score");
        separator.parentNode.insertBefore(score,separator);
      }
      if(description)description.innerHTML+="<strong>Ver."+script.getAttribute("data-script-version")+"</strong>"+'<div id="install-area" style="display:none;float: right;position: relative;"><a class="install-link" href="'+script.querySelector('h2>a').href.replace(/(\d)-.*/,"$1")+'/code/script.user.js">Install</a></div>';
      let installArea=script.querySelector("#install-area");
      if(installArea){
        script.onmouseover=function(e){
            installArea.style.display="block";
        };
        script.onmouseout=function(e){
            installArea.style.display="none";
        };
      }
    }
    let sortDiv=document.querySelector("#script-list-sort");
    if(sortDiv){
      let switchFilter=document.createElement("div"),enableFilter=!GM_getValue("disableFilter");
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      let observer = new MutationObserver(function(records){
        records.map(function(record) {
          for(let i=0;i<record.addedNodes.length;i++){
            let curNode=record.addedNodes[i];
            if(curNode.className=="script-list"){
              let scripts=curNode.querySelectorAll('li');
              for(let i=0;i<scripts.length;i++){
                let script=scripts[i];
                addScore(script);
              }
              if(enableFilter)filter(curNode);
            }
          }
        });
      });
      let option = {
        'childList': true
      };
      observer.observe(document.querySelector("body>.width-constraint .sidebarred-main-content"), option);
      let scripts=document.querySelectorAll('ol.script-list>li');
      for(let i=0;i<scripts.length;i++){
        let script=scripts[i];
        addScore(script);
      }
      let style = document.createElement('style');
      style.textContent = 'li.filtered { display:none !important; }';
      style.type = 'text/css';
      document.querySelector('head').appendChild(style);
      let bullshit="vip.*视频|百度(云|网盘)|AntiGame|split|Agar|agar\.io|alis\.io|angel\.io|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Blah Blah|Orc Clan Script|Astro\s*Empires|^\s*Attack|^\s*Battle|BiteFight|Blood\s*Wars|Bots|Bots4|Brawler|\bBvS\b|Business\s*Tycoon|Castle\s*Age|City\s*Ville|chopcoin\.io|Comunio|Conquer\s*Club|CosmoPulse|cursors\.io|Dark\s*Orbit|Dead\s*Frontier|Diep\.io|\bDOA\b|doblons\.io|DotD|Dossergame|Dragons\s*of\s*Atlantis|driftin\.io|Dugout|\bDS[a-z]+\n|elites\.io|Empire\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\s*Ville|Ghost\s*Trapper|Gladiatus|Goalline|Gondal|gota\.io|Grepolis|Hobopolis|\bhwm(\b|_)|Ikariam|\bIT2\b|Jellyneo|Kapi\s*Hospital|Kings\s*Age|Kingdoms?\s*of|knastv(ö|oe)gel|Knight\s*Fight|\b(Power)?KoC(Atta?ck)?\b|\bKOL\b|Kongregate|Last\s*Emperor|Legends?\s*of|Light\s*Rising|lite\.ext\.io|Lockerz|\bLoU\b|Mafia\s*(Wars|Mofo)|Menelgame|Mob\s*Wars|Mouse\s*Hunt|Molehill\s*Empire|NeoQuest|MyFreeFarm|narwhale\.io|Neopets|Nemexia|\bOGame\b|Ogar(io)?|Pardus|Pennergame|Pigskin\s*Empire|PlayerScripts|pokeradar\.io|Popmundo|Po?we?r\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|slither\.io|slitherplus\.io|slitheriogameplay|SpaceWars|splix\.io|\bSW_[a-z]+\n|\bSnP\b|The\s*Crims|The\s*West|torto\.io|Travian|Treasure\s*Isl(and|e)|Tribal\s*Wars|TW.?PRO|Vampire\s*Wars|vertix\.io|War\s*of\s*Ninja|West\s*Wars|wings\.io|\bWoD\b|World\s*of\s*Dungeons|wtf\s*battles|Wurzelimperium";
      let filterName="Enable Filter",filteredNum=0;
      let filter=function(t){
        [].forEach.call(t.querySelectorAll('article>h2'), function(item) {
          if(new RegExp(bullshit,"i").test(item.innerText)){
              item.parentNode.parentNode.classList.add('filtered');
              filteredNum++;
          }
        });
      };
      if(enableFilter)filter(document);
      switchFilter.innerHTML='<input type="checkBox" name="switchFilter" id="switchFilter"/><label for="switchFilter">'+filterName+(filteredNum?' ('+filteredNum+' filtered)':'')+'</label>';
      let switchFilterCheckbox=switchFilter.querySelector('#switchFilter');
      let switchFilterLabel=switchFilterCheckbox.nextSibling;
      switchFilterCheckbox.checked=enableFilter;
      switchFilterCheckbox.onclick=function(){
        if(enableFilter){
          [].forEach.call(document.querySelectorAll('li.filtered'), function(item) {
              item.classList.remove('filtered');
          });
          switchFilterLabel.innerHTML=filterName;
        }else{
          filteredNum=0;
          filter(document);
          switchFilterLabel.innerHTML=filterName+' ('+filteredNum+' filtered)';
        }
        GM_setValue("disableFilter",enableFilter);
        enableFilter=!enableFilter;
      };
      sortDiv.insertBefore(switchFilter,sortDiv.firstChild);
    }
    }
  }

  class FetchUserjs {
  constructor() {
    this.host = this.getMainHost();
    this.showTime = 10;
    this.quietKey = 'jae_fetch_userjs_quiet';
    this.countKey = 'jae_fetch_userjs_count';
    this.adultKey = 'jae_fetch_userjs_adult';
    this.tplBox = `<div id="jae_userscript_box"><style>.jae-userscript{  position:fixed;  width:370px;  bottom:10px;  right:20px;  z-index:9999999999;  height:56px}.jae-userscript-shadow{  box-shadow:0 1px 4px rgba(0,0,0,.3);}.jae-userscript-shadow::before,.jae-userscript-shadow::after{  content:"";  position:absolute;  z-index:-1;  bottom:15px;  left:10px;  width:50%;  height:20%;  box-shadow:0 15px 10px rgba(0,0,0,.7);}.jae-userscript-shadow::before{  transform:rotate(-3deg)}.jae-userscript-shadow::after{  right:10px;  left:auto;  transform:rotate(3deg)}</style><div class="jae-userscript"></div></div>`;
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
    return count;
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
      $('.jae-userscript').removeClass('jae-userscript-shadow');
      new Promise(resolve => setTimeout(resolve, 500));
      this.setSize(370, 56);
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
            tpl = '<iframe name="jaeFetchUserJSFrame" src="about:blank" style="width:100%;height:100%;border:0px;display: block!important;border-radius:5px;" allowTransparency="true"></iframe>';
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