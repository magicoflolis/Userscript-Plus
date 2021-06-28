/* global parent, Event, sessionStorage */

import { format }  from 'timeago.js'
import fuzzy from 'fuzzy.js'
import psl from 'psl'

let config = {
  // sleazy: false,
  cacheKey: 'jae_fetch_userjs_cache',
  countKey: 'jae_fetch_userjs_count',
  host: psl.get(window.location.hostname) || window.location.hostname.split('.').splice(-2).join('.'),
  api: 'https://greasyfork.org/scripts/by-site/{host}.json',
  sapi: 'https://sleazyfork.org/scripts/by-site/{host}.json'
}

// function sleazyfork() {
//   if(document.querySelector('span.sign-in-link')){
//   let otherSite=/greasyfork\.org/.test(location.hostname)?"sleazyfork":"greasyfork";
//   if(/scripts\/\d+/.test(location.href)){
//     (!document.querySelector("#script-info") && (otherSite == "greasyfork" || document.querySelector("div.width-constraint>section>p>a"))) ? location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org") : false
//   }else if(/\/(scripts|users)(\/|.*(\?|&)q=|.*\?set=)/.test(location.href)){
//     GM_xmlhttpRequest({
//       method: 'GET',
//       url: location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org"),
//       onload: (result) => {
//         let doc = null;
//         try {
//           doc = document.implementation.createHTMLDocument('');
//           doc.documentElement.innerHTML = result.responseText;
//         }
//         catch (e) {
//           console.log('parse error');
//         }
//         if (!doc) {
//           return;
//         }
//         let l = doc.querySelector('ol.script-list');
//         if (l) {
//           let ml = document.querySelector('ol.script-list');
//           if(!ml){
//             ml=document.createElement("ol");
//             ml.setAttribute("class","script-list");
//             let list=document.querySelector('.sidebarred-main-content');
//             let ps=list.querySelectorAll("p");
//             for(let i=0;i<ps.length;i++){
//               let p=ps[i];
//               list.removeChild(p);
//             }
//             list.appendChild(ml);
//           }
//           let scs=l.querySelectorAll("li");
//           if(scs){
//             for(let i=0;i<scs.length;i++){
//               let sc=scs[i];
//               (!ml.querySelector("li[data-script-id='"+sc.getAttribute("data-script-id")+"']")) ? (addScore(sc),ml.appendChild(sc)) : false;
//             }
//           }
//         }
//       },
//       onerror: function(e) {
//         console.log(e);
//       }
//     });
//   }
//   function addScore(script){
//     let separator=script.querySelector('h2>span.name-description-separator');
//     let description=script.querySelector('h2>span.description');
//     if(separator){
//       let score=document.createElement("strong");
//       score.style.color="#e09015";
//       score.innerHTML=script.getAttribute("data-script-rating-score");
//       separator.parentNode.insertBefore(score,separator);
//     }
//     if(description)description.innerHTML+="<strong>Ver."+script.getAttribute("data-script-version")+"</strong>"+'<div id="install-area" style="display:none;float: right;position: relative;"><a class="install-link" href="'+script.querySelector('h2>a').href.replace(/(\d)-.*/,"$1")+'/code/script.user.js">Install</a></div>';
//     let installArea=script.querySelector("#install-area");
//     if(installArea){
//       script.onmouseover=function(e){
//           installArea.style.display="block";
//       };
//       script.onmouseout=function(e){
//           installArea.style.display="none";
//       };
//     }
//   }
//   let sortDiv=document.querySelector("#script-list-sort");
//   if(sortDiv){
//     let switchFilter=document.createElement("div"),enableFilter=!GM_getValue("disableFilter");
//     let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
//     let observer = new MutationObserver(function(records){
//       records.map(function(record) {
//         for(let i=0;i<record.addedNodes.length;i++){
//           let curNode=record.addedNodes[i];
//           if(curNode.className=="script-list"){
//             let scripts=curNode.querySelectorAll('li');
//             for(let i=0;i<scripts.length;i++){
//               let script=scripts[i];
//               addScore(script);
//             }
//             if(enableFilter)filter(curNode);
//           }
//         }
//       });
//     });
//     let option = {
//       'childList': true
//     };
//     observer.observe(document.querySelector("body>.width-constraint .sidebarred-main-content"), option);
//     let scripts=document.querySelectorAll('ol.script-list>li');
//     for(let i=0;i<scripts.length;i++){
//       let script=scripts[i];
//       addScore(script);
//     }
//     let style = document.createElement('style');
//     style.textContent = 'li.filtered { display:none !important; }';
//     style.type = 'text/css';
//     document.querySelector('head').appendChild(style);
//     let bullshit="vip.*视频|百度(云|网盘)|AntiGame|split|Agar|agar\.io|alis\.io|angel\.io|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Blah Blah|Orc Clan Script|Astro\s*Empires|^\s*Attack|^\s*Battle|BiteFight|Blood\s*Wars|Bots|Bots4|Brawler|\bBvS\b|Business\s*Tycoon|Castle\s*Age|City\s*Ville|chopcoin\.io|Comunio|Conquer\s*Club|CosmoPulse|cursors\.io|Dark\s*Orbit|Dead\s*Frontier|Diep\.io|\bDOA\b|doblons\.io|DotD|Dossergame|Dragons\s*of\s*Atlantis|driftin\.io|Dugout|\bDS[a-z]+\n|elites\.io|Empire\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\s*Ville|Ghost\s*Trapper|Gladiatus|Goalline|Gondal|gota\.io|Grepolis|Hobopolis|\bhwm(\b|_)|Ikariam|\bIT2\b|Jellyneo|Kapi\s*Hospital|Kings\s*Age|Kingdoms?\s*of|knastv(ö|oe)gel|Knight\s*Fight|\b(Power)?KoC(Atta?ck)?\b|\bKOL\b|Kongregate|Last\s*Emperor|Legends?\s*of|Light\s*Rising|lite\.ext\.io|Lockerz|\bLoU\b|Mafia\s*(Wars|Mofo)|Menelgame|Mob\s*Wars|Mouse\s*Hunt|Molehill\s*Empire|NeoQuest|MyFreeFarm|narwhale\.io|Neopets|Nemexia|\bOGame\b|Ogar(io)?|Pardus|Pennergame|Pigskin\s*Empire|PlayerScripts|pokeradar\.io|Popmundo|Po?we?r\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|slither\.io|slitherplus\.io|slitheriogameplay|SpaceWars|splix\.io|\bSW_[a-z]+\n|\bSnP\b|The\s*Crims|The\s*West|torto\.io|Travian|Treasure\s*Isl(and|e)|Tribal\s*Wars|TW.?PRO|Vampire\s*Wars|vertix\.io|War\s*of\s*Ninja|West\s*Wars|wings\.io|\bWoD\b|World\s*of\s*Dungeons|wtf\s*battles|Wurzelimperium";
//     let filterName="Enable Filter",filteredNum=0;
//     let filter=function(t){
//       [].forEach.call(t.querySelectorAll('article>h2'), function(item) {
//         if(new RegExp(bullshit,"i").test(item.innerText)){
//             item.parentNode.parentNode.classList.add('filtered');
//             filteredNum++;
//         }
//       });
//     };
//     if(enableFilter)filter(document);
//     switchFilter.innerHTML='<input type="checkBox" name="switchFilter" id="switchFilter"/><label for="switchFilter">'+filterName+(filteredNum?' ('+filteredNum+' filtered)':'')+'</label>';
//     let switchFilterCheckbox=switchFilter.querySelector('#switchFilter');
//     let switchFilterLabel=switchFilterCheckbox.nextSibling;
//     switchFilterCheckbox.checked=enableFilter;
//     switchFilterCheckbox.onclick=function(){
//       if(enableFilter){
//         [].forEach.call(document.querySelectorAll('li.filtered'), function(item) {
//             item.classList.remove('filtered');
//         });
//         switchFilterLabel.innerHTML=filterName;
//       }else{
//         filteredNum=0;
//         filter(document);
//         switchFilterLabel.innerHTML=filterName+' ('+filteredNum+' filtered)';
//       }
//       GM_setValue("disableFilter",enableFilter);
//       enableFilter=!enableFilter;
//     };
//     sortDiv.insertBefore(switchFilter,sortDiv.firstChild);
//   }
//   }
// }

export default {
  timeagoFormat (time) {
    let lang = (navigator.language !== 'zh-CN') ? 'en_short' : 'zh_CN'
    return format(time, lang)
  },
  installUserJs (uri) {
    let evt = parent.document.createEvent('MouseEvents'),
    link = parent.document.createElement('a');
    evt.initEvent('click', true, true)
    link.href = uri
    link.dispatchEvent(evt)
  },
  dispatchEvent (eventName) {
    parent.document.getElementById('jae_userscript_box').dispatchEvent(new Event(eventName))
  },
  /* Nano Templates - https://github.com/trix/nano */
  nano (template, data) {
    return template.replace(/\{([\w.]*)\}/g, function (str, key) {
      let keys = key.split('.')
      let v = data[keys.shift()]
      for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]]
      return (typeof v !== 'undefined' && v !== null) ? v : ''
    })
  },
  getJSON (url, callback) {
    try {
      parent.window.GmAjax({
        method: 'GET',
        url: url,
        onload: (res) => {
          let json = JSON.parse(res.responseText)
          callback(json)
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
  // toggleSleazy (val) {
  //   sessionStorage.setItem(config.sleazy, val)
  //   (window.location.hostname === "greasyfork.org" || window.location.hostname === "sleazyfork.org") ? sleazyfork() : console.log("not found");
  // },
  getData (callback) {
    let data = sessionStorage.getItem(config.cacheKey);
    (data) ? (data = JSON.parse(data),callback(data)) : (
      this.getJSON(this.nano(config.api, {host: config.host}), (json) => {
        json = json.map((item) => {
          item.user = item.users[0]
          return item
        })
        sessionStorage.setItem(config.cacheKey, JSON.stringify(json))
        callback(json)
      }),
      this.getJSON(this.nano(config.sapi, {host: config.host}), (json) => {
        json = json.map((item) => {
          item.user = item.users[0]
          return item
        })
        sessionStorage.setItem(config.cacheKey, JSON.stringify(json))
        callback(json)
      })
    )
  },
  // getSleazy () {
  //   let sleazy = sessionStorage.getItem(config.sleazy)
  //   return sleazy ?? false;
  // },
  getCount () {
    let count = sessionStorage.getItem(config.countKey)
    return (count >= 50) ? 50 : count
  },

  searcher (data, query) {
    let rt = []
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      let max = null
      let frt = null
      for (let key of ['name', 'description', 'user']) {
        key === "user" ? (frt = fuzzy(item["user"]["name"], query)) : (frt = fuzzy(item[key], query));
        max === null ? (max = frt) : max.score < frt.score ? (max = frt) : false;
      }
      rt.push({
        item,
        'score': max.score
      })
    }
    rt = rt.filter((a) => a.score !== 0).sort((a, b) => b.score - a.score).map((a) => a.item)
    return rt
  },

  isZH () {
    let nlang = navigator.language.toLowerCase()
    nlang === "zh" ? (nlang = "zh-cn") : false
    return nlang.search("zh-") === 0
  }
}
