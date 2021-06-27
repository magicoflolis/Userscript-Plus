'use strict';
const brws = typeof browser === "undefined" ? chrome : browser;

let config = {
  sleazyfork: false,
};

try {
  brws.storage.local.get((storedConfig) => {
    Object.assign(config, storedConfig);
    config.sleazyfork ? sleazyfork() : false;
    // config.theme === "light" ? window.scroll(0, 110) : false;
  });
} catch (error) {
  console.log(error);
}


function sleazyfork() {
  if(document.querySelector('span.sign-in-link')){
    var otherSite=/greasyfork\.org/.test(location.hostname)?"sleazyfork":"greasyfork";
    if(/scripts\/\d+/.test(location.href)){
      if(!document.querySelector("#script-info") && (otherSite == "greasyfork" || document.querySelector("div.width-constraint>section>p>a"))){
        location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org");
      }
    }else if(/\/(scripts|users)(\/|.*(\?|&)q=|.*\?set=)/.test(location.href)){
      fetch(location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org"),{
          method: 'GET'
      }).then((result) => {
        var doc = null;
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
        var l = doc.querySelector('ol.script-list');
        if (l) {
          var ml = document.querySelector('ol.script-list');
          if(!ml){
            ml=document.createElement("ol");
            ml.setAttribute("class","script-list");
            var list=document.querySelector('.sidebarred-main-content');
            var ps=list.querySelectorAll("p");
            for(let i=0;i<ps.length;i++){
              let p=ps[i];
              list.removeChild(p);
            }
            list.appendChild(ml);
          }
          var scs=l.querySelectorAll("li");
          if(scs){
              for(let i=0;i<scs.length;i++){
                let sc=scs[i];
                if(!ml.querySelector("li[data-script-id='"+sc.getAttribute("data-script-id")+"']")){
                  addScore(sc);
                  ml.appendChild(sc);
                }
            }
          }
      }
      }).catch((e) => console.log(e));
    }
  }
  function addScore(script){
    var separator=script.querySelector('h2>span.name-description-separator');
    var description=script.querySelector('h2>span.description');
    if(separator){
        var score=document.createElement("strong");
        score.style.color="#e09015";
        score.innerHTML=script.getAttribute("data-script-rating-score");
        separator.parentNode.insertBefore(score,separator);
    }
    if(description)description.innerHTML+="<strong>Ver."+script.getAttribute("data-script-version")+"</strong>"+'<div id="install-area" style="display:none;float: right;position: relative;"><a class="install-link" href="'+script.querySelector('h2>a').href.replace(/(\d)-.*/,"$1")+'/code/script.user.js">Install</a></div>';
    var installArea=script.querySelector("#install-area");
    if(installArea){
        script.onmouseover=function(e){
            installArea.style.display="block";
        };
        script.onmouseout=function(e){
            installArea.style.display="none";
        };
    }
  }
  var sortDiv=document.querySelector("#script-list-sort");
  if(sortDiv){
    var switchFilter=document.createElement("div"),enableFilter=!brws.storage.local.get("disableFilter");
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records){
        records.map(function(record) {
            for(var i=0;i<record.addedNodes.length;i++){
                var curNode=record.addedNodes[i];
                if(curNode.className=="script-list"){
                    var scripts=curNode.querySelectorAll('li');
                    for(let i=0;i<scripts.length;i++){
                        let script=scripts[i];
                        addScore(script);
                    }
                    if(enableFilter)filter(curNode);
                }
            }
        });
    });
    var option = {
        'childList': true
    };
    observer.observe(document.querySelector("body>.width-constraint .sidebarred-main-content"), option);
    var scripts=document.querySelectorAll('ol.script-list>li');
    for(let i=0;i<scripts.length;i++){
        let script=scripts[i];
        addScore(script);
    }
    //Modify from GreasyFork Bullshit Filter,Thanks to darkred
    var style = document.createElement('style');
    style.textContent = 'li.filtered { display:none !important; }';
    style.type = 'text/css';
    document.querySelector('head').appendChild(style);
    var bullshit="vip.*视频|百度(云|网盘)|AntiGame|split|Agar|agar\.io|alis\.io|angel\.io|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Blah Blah|Orc Clan Script|Astro\s*Empires|^\s*Attack|^\s*Battle|BiteFight|Blood\s*Wars|Bots|Bots4|Brawler|\bBvS\b|Business\s*Tycoon|Castle\s*Age|City\s*Ville|chopcoin\.io|Comunio|Conquer\s*Club|CosmoPulse|cursors\.io|Dark\s*Orbit|Dead\s*Frontier|Diep\.io|\bDOA\b|doblons\.io|DotD|Dossergame|Dragons\s*of\s*Atlantis|driftin\.io|Dugout|\bDS[a-z]+\n|elites\.io|Empire\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\s*Ville|Ghost\s*Trapper|Gladiatus|Goalline|Gondal|gota\.io|Grepolis|Hobopolis|\bhwm(\b|_)|Ikariam|\bIT2\b|Jellyneo|Kapi\s*Hospital|Kings\s*Age|Kingdoms?\s*of|knastv(ö|oe)gel|Knight\s*Fight|\b(Power)?KoC(Atta?ck)?\b|\bKOL\b|Kongregate|Last\s*Emperor|Legends?\s*of|Light\s*Rising|lite\.ext\.io|Lockerz|\bLoU\b|Mafia\s*(Wars|Mofo)|Menelgame|Mob\s*Wars|Mouse\s*Hunt|Molehill\s*Empire|NeoQuest|MyFreeFarm|narwhale\.io|Neopets|Nemexia|\bOGame\b|Ogar(io)?|Pardus|Pennergame|Pigskin\s*Empire|PlayerScripts|pokeradar\.io|Popmundo|Po?we?r\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|slither\.io|slitherplus\.io|slitheriogameplay|SpaceWars|splix\.io|\bSW_[a-z]+\n|\bSnP\b|The\s*Crims|The\s*West|torto\.io|Travian|Treasure\s*Isl(and|e)|Tribal\s*Wars|TW.?PRO|Vampire\s*Wars|vertix\.io|War\s*of\s*Ninja|West\s*Wars|wings\.io|\bWoD\b|World\s*of\s*Dungeons|wtf\s*battles|Wurzelimperium";
    var filterName="Enable Filter",filteredNum=0;
    var filter=function(t){
        [].forEach.call(t.querySelectorAll('article>h2'), function(item) {
            if(new RegExp(bullshit,"i").test(item.innerText)){
                item.parentNode.parentNode.classList.add('filtered');
                filteredNum++;
            }
        });
    };
    if(enableFilter)filter(document);
    switchFilter.innerHTML='<input type="checkBox" name="switchFilter" id="switchFilter"/><label for="switchFilter">'+filterName+(filteredNum?' ('+filteredNum+' filtered)':'')+'</label>';
    var switchFilterCheckbox=switchFilter.querySelector('#switchFilter');
    var switchFilterLabel=switchFilterCheckbox.nextSibling;
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
      brws.storage.local.set("disableFilter",enableFilter);
      enableFilter=!enableFilter;
    };
    sortDiv.insertBefore(switchFilter,sortDiv.firstChild);
  }
  
}