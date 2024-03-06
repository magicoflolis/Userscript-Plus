// ==UserScript==
// @name         Magic Userscript+ : Show Site All UserJS
// @name:es      Magic Userscript+: Mostrar sitio todos los UserJS
// @name:fr      Magic Userscript+ : Afficher le site Tous les UserJS
// @name:ja      Magic Userscript+ : サイトをすべて表示 UserJS
// @name:nl      Magic Userscript+: Site alle UserJS tonen
// @name:ru      Magic Userscript+: показать сайт всем UserJS
// @name:zh      Magic Userscript+ ：显示站点所有 UserJS
// @name:zh-CN      Magic Userscript+ ：显示站点所有 UserJS
// @name:zh-TW      Magic Userscript+ ：显示站点所有 UserJS
// @description  Show current site all UserJS, the easier way to install UserJs for Tampermonkey.
// @description:es      Mostrar todos los UserJS del sitio actual, la forma más fácil de instalar UserJs para Tampermonkey.
// @description:fr      Afficher le site actuel avec tous les UserJS, le moyen le plus simple d'installer UserJs pour Tampermonkey.
// @description:ja      サイトのユーザー スクリプト (UserJS) を表示します。 Tampermonkey のカスタム スクリプトをインストールする簡単な方法。
// @description:nl      Toon de huidige site alle UserJS, de eenvoudigere manier om UserJs voor Tampermonkey te installeren.
// @description:ru      Показать все UserJS текущего сайта — более простой способ установки UserJs для Tampermonkey.
// @description:zh      显示站点的用户脚本 (UserJS)。 为 Tampermonkey 安装自定义脚本的简单方法。
// @description:zh-CN      显示站点的用户脚本 (UserJS)。 为 Tampermonkey 安装自定义脚本的简单方法。
// @description:zh-TW      显示站点的用户脚本 (UserJS)。 为 Tampermonkey 安装自定义脚本的简单方法。
// @author       Magic <magicoflolis@tuta.io>
// @icon         data:image/png;base64,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
// @version      6.5.1
// @downloadURL  https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @updateURL    https://github.com/magicoflolis/Userscript-Plus/releases/latest/download/magic-userjs.user.js
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @homepageURL  https://github.com/magicoflolis/Userscript-Plus
// @supportURL   https://github.com/magicoflolis/Userscript-Plus/issues/new
// @license      MIT
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @connect     greasyfork.org
// @connect     sleazyfork.org
// @connect     github.com
// @connect     openuserjs.org
// @grant     GM.xmlHttpRequest
// @grant     GM.openInTab
// @grant     GM.getValue
// @grant     GM.setValue
// @grant     GM.info
// @grant     GM_xmlhttpRequest
// @grant     GM_openInTab
// @grant     GM_getValue
// @grant     GM_setValue
// @grant     GM_info
// @match     https://*/*
// @noframes
// @run-at     document-start
// ==/UserScript==
'use strict';
(() => {
let userjs = (self.userjs = {});
/** Skip text/plain documents */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS && window && window.self === window.top)) {
  return;
}
/**
 * To compile this CSS `pnpm run build:Sass`
 * @desc Link to uncompiled Cascading Style Sheet
 * @link https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass
 */
const main_css = `mujs-root{--mujs-even-row: hsl(222, 14%, 22%);--mujs-odd-row: hsl(222, 14%, 11%);--mujs-even-err: hsl(0, 100%, 22%);--mujs-odd-err: hsl(0, 100%, 11%);--mujs-background-color: hsl(222, 14%, 33%);--mujs-gf-color: hsl(204, 100%, 40%);--mujs-sf-color: hsl(12, 86%, 50%);--mujs-border-b-color: hsla(0, 0%, 0%, 0);--mujs-gf-btn-color: hsl(211, 87%, 56%);--mujs-sf-btn-color: hsl(12, 86%, 50%);--mujs-sf-txt-color: hsl(12, 79%, 55%);--mujs-txt-color: hsl(0, 0%, 100%);--mujs-chck-color: hsla(0, 0%, 100%, 0.568);--mujs-chck-gf: hsla(197, 100%, 50%, 0.568);--mujs-chck-git: hsla(213, 13%, 16%, 0.568);--mujs-chck-open: hsla(12, 86%, 50%, 0.568);--mujs-placeholder: hsl(81, 56%, 54%);--mujs-position-top: unset;--mujs-position-bottom: 1em;--mujs-position-left: unset;--mujs-position-right: 1em;font-family:Arial,Helvetica,sans-serif}mujs-root *{scrollbar-color:var(--mujs-txt-color, hsl(0, 0%, 100%)) #2e323d;scrollbar-width:thin}@supports not (scrollbar-width: thin){mujs-root * ::-webkit-scrollbar{width:1.4vw;height:3.3vh}mujs-root * ::-webkit-scrollbar-track{background-color:#2e323d;border-radius:16px;margin-top:3px;margin-bottom:3px;box-shadow:inset 0 0 6px rgba(0,0,0,.3)}mujs-root * ::-webkit-scrollbar-thumb{border-radius:16px;background-color:var(--mujs-txt-color, hsl(0, 0%, 100%));background-image:-webkit-linear-gradient(45deg, hsla(0, 0%, 100%, 0.2) 25%, transparent 25%, transparent 50%, hsla(0, 0%, 100%, 0.2) 50%, hsla(0, 0%, 100%, 0.2) 75%, transparent 75%, transparent)}mujs-root * ::-webkit-scrollbar-thumb:hover{background:var(--mujs-txt-color, hsl(0, 0%, 100%))}}mu-js{line-height:normal}mu-js{color:var(--mujs-txt-color, hsl(0, 0%, 100%))}body.webext-page,.main{font-size:14px}mujs-section>label,.mujs-homepag e,td.mujs-list,.install{font-size:16px}.install,.mujs-homepage{font-weight:700}mujs-section>label,td.mujs-list{font-weight:500}.mujs-sty-flex>mujs-btn{margin:auto}.mujs-invalid{border-radius:8px !important;border-width:2px !important;border-style:solid !important;border-color:red !important}mujs-tabs,mujs-column,mujs-row,.mujs-sty-flex{display:flex}mujs-column,mujs-row{gap:.5em}@media screen and (max-width: 800px){mujs-column{flex-flow:row wrap}}mujs-column count-frame:nth-child(1){background:var(--mujs-gf-color, hsl(204, 100%, 40%))}mujs-column count-frame:nth-child(2){background:var(--mujs-sf-color, hsl(12, 86%, 50%))}mujs-row{flex-flow:column wrap}mu-js{cursor:default}.hidden{display:none !important;z-index:-1 !important}.main{width:100%;width:-moz-available;width:-webkit-fill-available;background:var(--mujs-background-color, hsl(222, 14%, 33%)) !important;border:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));border-radius:16px}@media screen and (max-height: 720px){.main:not(.webext-page){height:100% !important;bottom:0rem !important;right:0rem !important;margin:0rem !important}}.main.expanded{height:100% !important;bottom:0rem !important}.main:not(.webext-page){position:fixed;height:492px}.main:not(.webext-page):not(.expanded){margin-left:1rem;margin-right:1rem;right:1rem;bottom:1rem}.main:not(.hidden){z-index:100000000000000000 !important;display:flex !important;flex-direction:column !important}.main mujs-tabs{gap:.5em;width:100%;width:-moz-available;width:-webkit-fill-available;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.main mujs-tabs mujs-tab{padding:.25em;min-width:150px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;display:flex;place-content:space-between;border:1px solid rgba(0,0,0,0);border-radius:4px;background:rgba(0,0,0,0)}.main mujs-tabs mujs-tab.active{background:var(--mujs-even-row, hsl(222, 14%, 18%))}.main mujs-tabs mujs-tab:not(.active):hover{background:var(--mujs-even-row, hsl(222, 14%, 18%))}.main mujs-tabs mujs-tab mujs-host{float:left}.main mujs-tabs mujs-tab mu-js{float:right}.main mujs-tabs mujs-addtab{order:999999999999;font-size:20px;padding:0px .25em}.main mujs-tabs mujs-addtab:hover{background:var(--mujs-even-row, hsl(222, 14%, 18%))}.main mujs-tab,.main mujs-btn,.main input{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.main input{background:rgba(0,0,0,0);color:var(--mujs-txt-color, hsl(0, 0%, 100%))}.main input:not([type=checkbox]){border:rgba(0,0,0,0);outline:none !important}.main textarea{background:inherit;overflow-y:auto;color:var(--mujs-placeholder, hsl(81, 56%, 54%));border:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));border-radius:10px;resize:vertical;outline:none;font-family:monospace;font-size:14px}.main textarea:focus{outline:none}.main th,.main .mujs-cfg *:not(input[type=password],input[type=text],input[type=number]){-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important}.main .mujs-footer{order:2;width:100%;width:-moz-available;width:-webkit-fill-available;overflow-x:hidden;text-align:center;border-radius:16px}.main .mujs-footer>*{min-height:50px}.main .mujs-footer .error:nth-child(even){background:var(--mujs-even-err, hsl(0, 100%, 22%)) !important}.main .mujs-footer .error:nth-child(odd){background:var(--mujs-odd-err, hsl(0, 100%, 11%)) !important}.mainframe{background:rgba(0,0,0,0);position:fixed;bottom:var(--mujs-position-bottom, 1rem);right:var(--mujs-position-right, 1rem);top:var(--mujs-position-top, unset);left:var(--mujs-position-left, unset)}.mainframe count-frame{width:fit-content;width:-moz-fit-content;width:-webkit-fit-content;height:auto;padding:14px 16px}.mainframe:not(.hidden){z-index:100000000000000000 !important;display:block}count-frame{border-radius:1000px;margin:0px 3px;padding:4px 6px;border:2px solid var(--mujs-border-b-color, hsla(0, 0%, 0%, 0));font-size:16px;font-weight:400;display:inline-block;text-align:center;min-width:1em;background:var(--mujs-background-color, hsl(222, 14%, 33%));color:var(--mujs-txt-color, hsl(0, 0%, 100%));-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mujs-header-prim{order:0;display:flex;border-bottom:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));border-top-left-radius:10px;border-top-right-radius:10px;padding:.5em;font-size:1em;place-content:space-between;height:fit-content;height:-moz-fit-content;height:-webkit-fit-content;width:100%;width:-moz-available;width:-webkit-fill-available}.mujs-body{order:1;overflow-x:hidden;padding:0px;width:100%;width:-moz-available;width:-webkit-fill-available;height:100%;border:1px solid var(--mujs-border-b-color, hsla(0, 0%, 0%, 0));border-bottom-left-radius:16px;border-bottom-right-radius:16px}.mujs-body .mujs-ratings{padding:0 .25em;border:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));border-radius:1000px}.mujs-body mu-jsbtn{color:var(--mujs-txt-color, hsl(0, 0%, 100%));-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mujs-body table,.mujs-body th,.mujs-body td{border-collapse:collapse}.mujs-body table{width:100%;width:-moz-available;width:-webkit-fill-available}@media screen and (max-width: 1180px){.mujs-body table thead>tr{display:table-column}.mujs-body table .frame:not(.webext-page){width:100%;display:flex;flex-flow:row wrap;align-items:center;border-bottom:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));padding-top:.5em;padding-bottom:.5em}.mujs-body table .frame:not(.webext-page) td{margin:auto;border-bottom:1px solid rgba(0,0,0,0)}.mujs-body table .frame:not(.webext-page) td>mujs-a,.mujs-body table .frame:not(.webext-page) td>mu-js,.mujs-body table .frame:not(.webext-page) td>mujs-column{text-align:center;justify-content:center}.mujs-body table .frame:not(.webext-page) td:not(.mujs-name,.install-btn){width:25%}.mujs-body table .frame:not(.webext-page) .mujs-name{width:100%}}.mujs-body table th,.mujs-body table td{border-bottom:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%))}.mujs-body table th{position:-webkit-sticky;position:sticky;top:0;background:rgba(72,79,96,.75)}.mujs-body table th.mujs-header-name{width:50%}@media screen and (max-width: 800px){.mujs-body table th.mujs-header-name{width:auto !important}}.mujs-body table .frame:nth-child(even){background:var(--mujs-even-row, hsl(222, 14%, 18%)) !important}.mujs-body table .frame:nth-child(odd){background:var(--mujs-odd-row, hsl(222, 14%, 33%)) !important}.mujs-body table .frame:not([data-engine=sleazyfork],[data-engine=greasyfork]) mujs-a{color:var(--mujs-sf-txt-color, hsl(12, 79%, 55%))}.mujs-body table .frame:not([data-engine=sleazyfork],[data-engine=greasyfork]) mu-jsbtn{background:var(--mujs-sf-btn-color, hsl(12, 86%, 50%));border-color:var(--mujs-sf-btn-color, hsl(12, 86%, 50%))}.mujs-body table .frame:not([data-engine=sleazyfork],[data-engine=greasyfork]) mu-jsbtn:hover{background:var(--mujs-sf-txt-color, hsl(12, 79%, 55%));border-color:var(--mujs-sf-txt-color, hsl(12, 79%, 55%))}.mujs-body table .frame[data-engine=sleazyfork] mujs-a,.mujs-body table .frame[data-engine=greasyfork] mujs-a{color:var(--mujs-gf-color, hsl(197, 100%, 50%))}.mujs-body table .frame[data-engine=sleazyfork] mujs-a:hover,.mujs-body table .frame[data-engine=greasyfork] mujs-a:hover{color:var(--mujs-gf-btn-color, hsl(211, 87%, 56%))}.mujs-body table .frame[data-engine=sleazyfork] mu-jsbtn,.mujs-body table .frame[data-engine=greasyfork] mu-jsbtn{color:var(--mujs-txt-color, hsl(0, 0%, 100%));background:var(--mujs-gf-color, hsl(204, 100%, 40%));border-color:var(--mujs-gf-color, hsl(204, 100%, 40%))}.mujs-body table .frame[data-engine=sleazyfork] mu-jsbtn:hover,.mujs-body table .frame[data-engine=greasyfork] mu-jsbtn:hover{background:var(--mujs-gf-btn-color, hsl(211, 87%, 56%));border-color:var(--mujs-gf-btn-color, hsl(211, 87%, 56%))}.mujs-body table .frame[data-good] mujs-a,.mujs-body table .frame[data-author] mujs-a{color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-body table .frame[data-good] mujs-a:hover,.mujs-body table .frame[data-author] mujs-a:hover{color:#80ab30}.mujs-body table .frame[data-good] .mujs-list,.mujs-body table .frame[data-author] .mujs-list{color:#fff}.mujs-body table .frame[data-good] mu-jsbtn,.mujs-body table .frame[data-author] mu-jsbtn{color:#20385a;background:var(--mujs-placeholder, hsl(81, 56%, 54%));border-color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-body table .frame[data-good] mu-jsbtn:hover,.mujs-body table .frame[data-author] mu-jsbtn:hover{background:#b5d874;border-color:#b5d874}.mujs-body table .frame svg{fill:currentColor;width:14px;height:14px;background:rgba(0,0,0,0)}.mujs-body table .frame>td:not(.mujs-name){text-align:center}.mujs-body table .frame>.mujs-name>mujs-a{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.mujs-body table .frame>.mujs-name mu-jsbtn,.mujs-body table .frame>.mujs-name mu-js{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.mujs-body table .frame>.mujs-name>mu-jsbtn{margin:auto}.mujs-body table .frame>.mujs-name>mujs-column>mu-jsbtn{padding:0px 7px}.mujs-body table .frame>.mujs-uframe>mujs-a{font-size:16px;font-weight:500;padding-left:.5rem;padding-right:.5rem}@media screen and (max-width: 1150px){.mujs-cfg{margin:0px auto 1rem auto !important}}.mujs-cfg{height:fit-content;height:-moz-fit-content;height:-webkit-fit-content}@media screen and (max-height: 720px){.mujs-cfg:not(.webext-page){height:100%;height:-moz-available;height:-webkit-fill-available;width:100%;width:-moz-available;width:-webkit-fill-available;overflow-x:auto;padding:.5em}}.mujs-cfg mujs-section{border-radius:16px;padding:.5em}.mujs-cfg mujs-section:nth-child(even){background:var(--mujs-even-row, hsl(222, 14%, 18%)) !important}.mujs-cfg mujs-section:nth-child(odd){background:var(--mujs-odd-row, hsl(222, 14%, 33%)) !important}.mujs-cfg mujs-section>label{display:flex;justify-content:space-between}.mujs-cfg mujs-section>label input:not([type=checkbox]){font-size:14px;position:relative;border-radius:4px;border:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%))}.mujs-cfg mujs-section>label input[type=text]::-webkit-input-placeholder{color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-cfg mujs-section>label input[type=text]::-moz-placeholder{color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-cfg mujs-section>label input[type=text]:-ms-input-placeholder{color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-cfg mujs-section>label input[type=text]::-ms-input-placeholder{color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-cfg mujs-section>label input[type=text]::placeholder{color:var(--mujs-placeholder, hsl(81, 56%, 54%))}.mujs-cfg .mujs-inlab{position:relative;width:38px}.mujs-cfg .mujs-inlab input[type=checkbox]{display:none}.mujs-cfg .mujs-inlab input[type=checkbox]:checked+label{margin-left:0;background:var(--mujs-chck-color, hsla(0, 0%, 100%, 0.568))}.mujs-cfg .mujs-inlab input[type=checkbox]:checked+label:before{right:0px}.mujs-cfg .mujs-inlab input[type=checkbox][data-name=greasyfork]:checked+label,.mujs-cfg .mujs-inlab input[type=checkbox][data-name=sleazyfork]:checked+label{background:var(--mujs-chck-gf, hsla(197, 100%, 50%, 0.568))}.mujs-cfg .mujs-inlab input[type=checkbox][data-name=openuserjs]:checked+label{background:var(--mujs-chck-open, hsla(12, 86%, 50%, 0.568))}.mujs-cfg .mujs-inlab input[type=checkbox][data-name=github]:checked+label{background:var(--mujs-chck-git, hsla(213, 13%, 16%, 0.568))}.mujs-cfg .mujs-inlab label{padding:0;display:block;overflow:hidden;height:16px;border-radius:20px;border:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%))}.mujs-cfg .mujs-inlab label:before{content:"";display:block;width:20px;height:20px;margin:-2px;background:var(--mujs-txt-color, hsl(0, 0%, 100%));position:absolute;top:0;right:20px;border-radius:20px}.mujs-cfg .mujs-sty-flex mujs-btn{color:var(--mujs-txt-color, hsl(0, 0%, 100%))}.mujs-cfg .mujs-sty-flex mujs-btn[data-command=reset]{background:var(--mujs-sf-btn-color, hsl(12, 86%, 50%));border-color:var(--mujs-sf-btn-color, hsl(12, 86%, 50%))}.mujs-cfg .mujs-sty-flex mujs-btn[data-command=reset]:hover{background:var(--mujs-sf-txt-color, hsl(12, 79%, 55%));border-color:var(--mujs-sf-txt-color, hsl(12, 79%, 55%))}.mujs-cfg .mujs-sty-flex mujs-btn[data-command=save]{background:var(--mujs-gf-color, hsl(204, 100%, 40%));border-color:var(--mujs-gf-color, hsl(204, 100%, 40%))}.mujs-cfg .mujs-sty-flex mujs-btn[data-command=save]:hover{background:var(--mujs-gf-btn-color, hsl(211, 87%, 56%));border-color:var(--mujs-gf-btn-color, hsl(211, 87%, 56%))}.mujs-cfg:not(.webext-page){margin:1rem 25rem}mujs-a{display:inline-block}.mujs-name{display:flex;flex-flow:column wrap;gap:.5em}.mujs-name span{font-size:.8em !important}mujs-btn{font-style:normal;font-weight:500;font-variant:normal;text-transform:none;text-rendering:auto;text-align:center;border:1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));font-size:16px;border-radius:4px;line-height:1;padding:6px 15px}mujs-btn svg{fill:var(--mujs-txt-color, hsl(0, 0%, 100%));width:14px;height:14px}mu-jsbtn{font-size:14px;border-radius:4px;font-style:normal;padding:7px 15%;font-weight:400;font-variant:normal;line-height:normal;display:block;text-align:center}mujs-a,mu-jsbtn,.mujs-pointer,.mujs-cfg mujs-section *:not(input[type=password],input[type=text],input[type=number]),.mainbtn,.mainframe,mujs-btn{cursor:pointer !important}
`;
/**
 * Link to uncompressed locales + compiler
 * @link https://github.com/magicoflolis/Userscript-Plus/tree/master/src/_locales
 * @link https://github.com/magicoflolis/Userscript-Plus/blob/master/tools/languageLoader.js
 */
const languageList = {"en":{"legacy":"PLEASE RESET YOUR CONFIG!","createdby":"Created by","name":"Name","daily":"Daily Installs","close":"Close","filterA":"Filter","max":"Maximize","min":"Minimize","search":"Search","searcher":"Title | Description | Author...","install":"Install","issue":"New Issue","version":"Version","updated":"Last Updated","total":"Total Installs","rating":"Ratings","good":"Good","ok":"Ok","bad":"Bad","created":"Created","redirect":"Greasy Fork for adults","filter":"Filter out other languages","dtime":"Display Timeout","save":"Save","reset":"Reset","codePreview":"Preview Code","saveFile":"Save File"},"es":{"legacy":"¡POR FAVOR RESTABLECE TU CONFIGURACIÓN!","createdby":"Creado por","name":"Nombre","daily":"Instalaciones diarias","close":"Ya no se muestra","filterA":"Filtro","max":"Maximizar","min":"Minimizar","search":"Busque en","searcher":"Título | Descripción | Autor...","install":"Instalar","issue":"Nueva edición","version":"Versión","updated":"Última actualización","total":"Total de instalaciones","rating":"Clasificaciones","good":"Bueno","ok":"Ok","bad":"Malo","created":"Creado","redirect":"Greasy Fork para adultos","filter":"Filtrar otros idiomas","dtime":"Mostrar el tiempo de espera","save":"Guardar","reset":"Reiniciar","codePreview":"Preview Code","saveFile":"Save File"},"fr":{"legacy":"VEUILLEZ RÉINITIALISER VOTRE CONFIG !","createdby":"Créé par","name":"Nom","daily":"Installations quotidiennes","close":"Ne plus montrer","filterA":"Filtre","max":"Maximiser","min":"Minimiser","search":"Recherche","searcher":"Titre | Description | Auteur...","install":"Installer","issue":"Nouveau numéro","version":"Version","updated":"Dernière mise à jour","total":"Total des installations","rating":"Notations","good":"Bon","ok":"Ok","bad":"Mauvais","created":"Créé","redirect":"Greasy Fork pour les adultes","filter":"Filtrer les autres langues","dtime":"Délai d'affichage","save":"Sauvez","reset":"Réinitialiser","codePreview":"Preview Code","saveFile":"Save File"},"ja":{"legacy":"設定をリセットしてください。","createdby":"によって作成された","name":"名前","daily":"デイリーインストール","close":"表示されなくなりました","filterA":"フィルター","max":"最大化","min":"ミニマム","search":"検索","searcher":"タイトル｜説明｜著者...","install":"インストール","issue":"新刊のご案内","version":"バージョン","updated":"最終更新日","total":"総インストール数","rating":"レーティング","good":"グッド","ok":"良い","bad":"悪い","created":"作成","redirect":"大人のGreasyfork","filter":"他の言語をフィルタリングする","dtime":"表示タイムアウト","save":"拯救","reset":"リセット","codePreview":"Preview Code","saveFile":"Save File"},"nl":{"legacy":"RESET UW CONFIG!","createdby":"Gemaakt door","name":"Naam","daily":"Dagelijkse Installaties","close":"Sluit","filterA":"Filter","max":"Maximaliseer","min":"Minimaliseer","search":"Zoek","searcher":"Titel | Beschrijving | Auteur...","install":"Installeer","issue":"Nieuw Issue","version":"Versie","updated":"Laatste Update","total":"Totale Installaties","rating":"Beoordeling","good":"Goed","ok":"Ok","bad":"Slecht","created":"Aangemaakt","redirect":"Greasy Fork voor volwassenen","filter":"Filter andere talen","dtime":"Weergave timeout","save":"Opslaan","reset":"Opnieuw instellen","codePreview":"Preview Code","saveFile":"Save File"},"ru":{"legacy":"ПОЖАЛУЙСТА, СБРОСЬТЕ КОНФИГ!","createdby":"Сделано","name":"Имя","daily":"Ежедневные установки","close":"Больше не показывать","filterA":"Фильтр","max":"Максимизировать","min":"Минимизировать","search":"Поиск","searcher":"Название | Описание | Автор...","install":"Установите","issue":"Новый выпуск","version":"Версия","updated":"Последнее обновление","total":"Всего установок","rating":"Рейтинги","good":"Хорошо","ok":"Хорошо","bad":"Плохо","created":"Создано","redirect":"Greasy Fork для взрослых","filter":"Отфильтровать другие языки","dtime":"Тайм-аут отображения","save":"Сохранить","reset":"Перезагрузить","codePreview":"Preview Code","saveFile":"Save File"},"zh":{"legacy":"请重置您的配置！","createdby":"由...制作","name":"姓名","daily":"日常安装","close":"不再显示","filterA":"过滤器","max":"最大化","min":"最小化","search":"搜索","searcher":"标题|描述|作者...","install":"安装","issue":"新问题","version":"版本","updated":"最后更新","total":"总安装量","rating":"评级","good":"好的","ok":"好的","bad":"不好","created":"创建","redirect":"大人的Greasyfork","filter":"过滤掉其他语言","dtime":"显示超时","save":"拯救","reset":"重置","codePreview":"Preview Code","saveFile":"Save File"}};
let cfg = {};
let lang = {};
let legacyMsg = null;

// Lets highlight me :)
const authorID = 166061;
// Some UserJS I personally enjoy
const goodUserJS = [
  423001,
  376510,
  23840,
  40525,
  6456,
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js',
  'https://github.com/jesus2099/konami-command/raw/master/INSTALL-USER-SCRIPT.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.user.js'
];
// Unsupport webpages for each engine
const unsupported = {
  greasyfork: ['pornhub.com'],
  sleazyfork: ['pornhub.com'],
  openuserjs: [],
  github: []
};

const isMobile = /Mobile|Tablet/.test(navigator.userAgent);
const Supports = {
  gm: typeof GM !== 'undefined'
};
// #region Console
// eslint-disable-next-line no-unused-vars
const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cUserJS%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cUserJS%c] %cERROR',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  let alertBrowser = false;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex) {
      alertBrowser = true;
      break;
    }
  }
  if (isMobile || alertBrowser) {
    alert(...msg);
  }
};
const info = (...msg) => {
  console.info(
    '[%cUserJS%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};
const log = (...msg) => {
  console.log(
    '[%cUserJS%c] %cLOG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(219, 160, 73);',
    ...msg
  );
};
// #endregion
const MU = {};
const hasOwn = Object.hasOwn || Object.prototype.hasOwnProperty.call;
/**
 * Object is typeof `Element`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isElem = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Element');
};
/**
 * Object is typeof `Function`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isFN = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Function');
};
/**
 * Object is typeof `object` / JSON Object
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isObj = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Object');
};
/**
 * Object is `null` or `undefined`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * Object is Blank
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isBlank = (obj) => {
  return (
    (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
    ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (isObj(obj) && Object.is(Object.keys(obj).length, 0))
  );
};
/**
 * Object is Empty
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @template B
 * @param { {} } objA
 * @param { B } objB
 * @returns { B }
 */
const setObj = (objA = {}, objB = {}) => {
  objA = objA || {};
  objB = objB || {};
  for (const [key, value] of Object.entries(objA)) {
    if (!hasOwn(objB, key)) {
      objB[key] = value;
    } else if (typeof value === 'object') {
      setObj(value, objB[key]);
    }
  }
  return objB;
};
/**
 * @template T
 * @param { T } target
 * @param { Element } root
 * @param { boolean } toQuery
 * @returns { T[] }
 */
const normalizeTarget = (target, root = document, toQuery = true) => {
  if (isNull(target)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from(root.querySelectorAll(target)) : [target];
  }
  if (isElem(target)) {
    return [target];
  }
  return Array.from(target);
};
class dom {
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } attr
   * @param { * } [value=undefined]
   */
  static attr(target, attr, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem.getAttribute(attr);
      }
      if (value === null) {
        elem.removeAttribute(attr);
      } else {
        elem.setAttribute(attr, value);
      }
    }
  }
  /**
   * @template { HTMLElementTagNameMap } K
   * @param { K } a
   * @returns { HTMLElementTagNameMap[K] }
   */
  static create(a) {
    if (typeof a === 'string') {
      return document.createElement(a);
    }
    throw new Error('"a" must be a typeof "String"');
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } prop
   * @param { * } [value=undefined]
   * @returns { keyof T | void }
   */
  static prop(target, prop, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem[prop];
      }
      elem[prop] = value;
    }
  }
  /**
   * @template { HTMLElement } T
   * @param { T } target
   * @param { string } text
   */
  static text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  }
}
dom.cl = class {
  static add(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.add(name);
      }
    }
  }

  static remove(target, name) {
    if (Array.isArray(name)) {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(...name);
      }
    } else {
      for (const elem of normalizeTarget(target)) {
        elem.classList.remove(name);
      }
    }
  }

  static toggle(target, name, state) {
    let r;
    for (const elem of normalizeTarget(target)) {
      r = elem.classList.toggle(name, state);
    }
    return r;
  }

  static has(target, name) {
    for (const elem of normalizeTarget(target)) {
      if (elem.classList.contains(name)) {
        return true;
      }
    }
    return false;
  }
};
class Language {
  static get cache() {
    return languageList[cfg.language] ?? languageList[Language.navLang];
  }

  static navLang = navigator.language.split('-')[0] ?? 'en';
}
class Task {
  static queue(func, timeout = 5000) {
    if (typeof requestIdleCallback === 'undefined') {
      return setTimeout(func, 1);
    }
    return requestIdleCallback(func, { timeout });
  }

  /**
   * requestIdleCallback or setTimeout w/ Promise
   * @param {number} timeout - Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise object
   */
  static delay(timeout = 5000) {
    return new Promise((resolve) => Task.queue(resolve, timeout));
  }

  static drop(id) {
    if (typeof cancelIdleCallback === 'undefined') {
      return clearTimeout(id);
    }
    return cancelIdleCallback(id);
  }

  static timeout(timeout = 5000) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  static requestAFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
class Timeout {
  constructor() {
    this.ids = [];
  }

  set(delay, reason) {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        isNull(reason) ? resolve() : reject(reason);
        this.clear(id);
      }, delay);
      this.ids.push(id);
    });
  }

  clear(...ids) {
    this.ids = this.ids.filter((id) => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
  }
}
class Memorize {
  constructor() {
    this.cache = new Map();
  }
  /**
   * @template { string } S
   * @param { ...S } maps
   * @returns { S | S[] }
   */
  create(...maps) {
    const resp = [];
    for (const key of maps) {
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      this.cache.set(key, new Map());
      resp.push(this.cache.get(key));
    }
    return resp.length >= 2 ? resp : resp[0];
  }
}
const alang = [];
const defcfg = {
  cache: true,
  codePreview: false,
  autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  time: 10000,
  blacklist: [
    {
      enabled: true,
      regex: true,
      flags: '',
      name: 'Blacklist 1',
      url: '(gov|cart|checkout|login|join|signin|signup|sign-up|password|reset|password_reset)'
    },
    {
      enabled: true,
      regex: true,
      flags: '',
      name: 'Blacklist 2',
      url: '(pay|bank|money|localhost|authorize|checkout|bill|wallet|router)'
    },
    {
      enabled: true,
      regex: false,
      flags: '',
      name: 'Blacklist 3',
      url: 'https://home.bluesnap.com'
    },
    {
      enabled: true,
      regex: false,
      flags: '',
      name: 'Blacklist 4',
      url: ['zalo.me', 'skrill.com']
    }
  ],
  engines: [
    {
      enabled: true,
      name: 'greasyfork',
      url: 'https://greasyfork.org'
    },
    {
      enabled: false,
      name: 'sleazyfork',
      url: 'https://sleazyfork.org'
    },
    {
      enabled: false,
      name: 'openuserjs',
      url: 'https://openuserjs.org/?q='
    },
    {
      enabled: false,
      name: 'github',
      url: 'https://api.github.com/search/code?q=',
      token: ''
    }
  ],
  theme: {
    'even-row': '',
    'odd-row': '',
    'even-err': '',
    'odd-err': '',
    'background-color': '',
    'gf-color': '',
    'sf-color': '',
    'border-b-color': '',
    'gf-btn-color': '',
    'sf-btn-color': '',
    'sf-txt-color': '',
    'txt-color': '',
    'chck-color': '',
    'chck-gf': '',
    'chck-git': '',
    'chck-open': '',
    placeholder: '',
    'position-top': '',
    'position-bottom': '',
    'position-left': '',
    'position-right': ''
  },
  recommend: {
    author: true,
    others: true
  }
};
/**
 * Add Event Listener
 * @template { HTMLElement } E
 * @template { keyof HTMLElementEventMap } K
 * @param { E } el
 * @param { K } event
 * @param { (this: E, ev: HTMLElementEventMap[K]) => any } callback
 * @param { boolean | AddEventListenerOptions } options
 */
const ael = (el, event, callback, options = {}) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (!elem) {
        continue;
      }
      if (isMobile && event === 'click') {
        // event = 'mouseup';
        elem.addEventListener('touchstart', callback);
        // elem.addEventListener('touchend', callback);
        return;
      }
      elem.addEventListener(event, callback, options);
    }
  } catch (ex) {
    err(ex);
  }
};
/**
 * Prefix for `document.querySelectorAll()`
 * @template { Element } E
 * @param { string } selectors - Elements for query selection
 * @param { E } root - Root selector Element
 * @returns { NodeListOf<E> }
 */
const qsA = (selectors, root) => {
  try {
    return (root || document).querySelectorAll(selectors);
  } catch (ex) {
    err(ex);
  }
  return [];
};
/**
 * Prefix for `document.querySelector()`
 * @template { Element } E
 * @param { string } selector - Element for query selection
 * @param { E } root - Root selector Element
 * @returns { E | null }
 */
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return null;
};
/**
 * Prefix for `document.querySelector()` w/ Promise
 * @template { Element } E
 * @param { string } selector - Element for query selection
 * @param { E } root - Root selector Element
 * @returns { Promise<E | null> }
 */
const query = async (selector, root) => {
  let el = null;
  try {
    el = root || document;
    while (isNull(el.querySelector(selector))) {
      await Task.requestAFrame();
    }
    return el.querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return el;
};
/**
 * Form Attributes of Element
 * @template { keyof HTMLElementTagNameMap } K
 * @param { K } elem
 * @param { keyof HTMLElement } attr
 */
const formAttrs = (elem, attr = {}) => {
  for (const key in attr) {
    if (typeof attr[key] === 'object') {
      formAttrs(elem[key], attr[key]);
    } else if (isFN(attr[key])) {
      if (key === 'container') {
        key();
        continue;
      }
      if (/^on/.test(key)) {
        elem[key] = attr[key];
        continue;
      }
      ael(elem, key, attr[key]);
    } else if (key === 'class') {
      elem.className = attr[key];
    } else {
      elem[key] = attr[key];
    }
  }
};
/**
 * Make Element
 * @template { keyof HTMLElementTagNameMap } K
 * @param { K } tagName
 * @param { string } cname
 * @param { keyof HTMLElement } attrs
 * @returns { HTMLElementTagNameMap[K] }
 */
const make = (tagName, cname, attrs = {}) => {
  let el = null;
  try {
    el = document.createElement(tagName);
    if (typeof cname === 'string' && !isEmpty(cname)) {
      el.className = cname;
    }
    if (!isEmpty(attrs)) {
      formAttrs(el, attrs);
    }
  } catch (ex) {
    err(ex);
  }
  return el;
};
const Container = class {
  constructor() {
    this.remove = this.remove.bind(this);
    this.onFrameLoad = this.onFrameLoad.bind(this);
    this.ready = false;
    this.supported = isFN(document.createElement('main-userjs').attachShadow);
    if (this.supported) {
      this.frame = make('main-userjs', '', {
        dataset: {
          insertedBy: 'userscript-plus',
          role: 'primary-container'
        }
      });
      /**
       * @type { ShadowRoot }
       */
      this.root = this.frame.attachShadow({ mode: 'open', clonable: false, delegatesfocus: false });
      this.ready = true;
    } else {
      this.frame = make('iframe', 'mujs-iframe', {
        dataset: {
          insertedBy: 'userscript-plus',
          role: 'primary-iframe'
        },
        loading: 'lazy',
        src: 'about:blank',
        style:
          'position: fixed;bottom: 1rem;right: 1rem;height: 525px;width: 90%;margin: 0px 1rem;z-index: 100000000000000020 !important;',
        onload: this.onFrameLoad
      });
    }
    ael(window.self ?? window, 'beforeunload', this.remove);
  }
  /**
   * @param { Function } callback
   * @param { document } doc
   */
  async inject(callback, doc) {
    if (!doc) {
      return;
    }
    while (this.ready === false) {
      await Task.requestAFrame();
    }

    doc.documentElement.appendChild(this.frame);

    if (isFN(callback)) {
      callback.call({}, this.root, doc);
    }
  }

  remove() {
    this.frame.remove();
  }

  onFrameLoad(iFrame) {
    /**
     * @type { HTMLIFrameElement }
     */
    const target = iFrame.target;
    this.root = target.contentDocument.documentElement;
    this.ready = true;

    dom.cl.add([this.root, target.contentDocument.body], 'mujs-iframe');
  }
};
const container = new Container();
const listener = (evt) => {
  if (evt.isTrusted !== true) {
    return;
  }
  if (evt.disposition !== 'enforce') {
    return;
  }
  if (evt.target.tagName !== 'MAIN-USERJS') {
    return;
  }
  container.remove();
  err('Failed to inject due to CSP violation', {
    url: evt.blockedURL || evt.blockedURI,
    policy: evt.originalPolicy,
    directive: evt.effectiveDirective || evt.violatedDirective
  });
  document.removeEventListener('securitypolicyviolation', listener);
};
if (document !== null) {
  document.addEventListener('securitypolicyviolation', listener);
}

const iconSVG = {
  cfg: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="currentColor"></path></g>'
  },
  close: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" fill="currentColor"></path></g>'
  },
  filter: {
    viewBox: '0 0 24 24',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="currentColor"/></g>'
  },
  fsClose: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z" fill="currentColor"></path> <path d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z" fill="currentColor"></path> <path d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z" fill="currentColor"></path> <path d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z" fill="currentColor"></path></g>'
  },
  fsOpen: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z" fill="currentColor"></path> <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z" fill="currentColor"></path> <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z" fill="currentColor"></path> <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z" fill="currentColor"></path></g>'
  },
  fullscreen: {
    viewBox: '0 0 96 96',
    html: '<g><path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/><path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/><path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/><path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g>'
  },
  gf: {
    viewBox: '0 0 510.4 510.4',
    html: '<g><path d="M505.2,80c-6.4-6.4-16-6.4-22.4,0l-89.6,89.6c-1.6,1.6-6.4,3.2-12.8,1.6c-4.8-1.6-9.6-3.2-14.4-6.4L468.4,62.4 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L343.6,142.4c-3.2-4.8-4.8-9.6-4.8-12.8c-1.6-6.4-1.6-11.2,1.6-12.8L430,27.2 c6.4-6.4,6.4-16,0-22.4c-6.4-6.4-16-6.4-22.4,0L290.8,121.6c-16,16-20.8,40-14.4,62.4l-264,256c-16,16-16,43.2,0,59.2 c6.4,6.4,16,11.2,27.2,11.2c11.2,0,22.4-4.8,30.4-12.8L319.6,232c8,3.2,16,4.8,24,4.8c16,0,32-6.4,44.8-17.6l116.8-116.8 C511.6,96,511.6,86.4,505.2,80z M46,475.2c-3.2,3.2-9.6,3.2-14.4,0c-3.2-3.2-3.2-9.6,1.6-12.8l257.6-249.6c0,0,1.6,1.6,1.6,3.2 L46,475.2z M316.4,192c-14.4-14.4-16-35.2-4.8-48c4.8,11.2,11.2,22.4,20.8,32c9.6,9.6,20.8,16,32,20.8 C351.6,208,329.2,206.4,316.4,192z"/></g>'
  },
  gh: {
    viewBox: '0 0 16 16',
    html: '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>'
  },
  hide: {
    viewBox: '0 0 24 24',
    html: '<g> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5L21 10.5C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="currentColor"></path></g>'
  },
  install: {
    viewBox: '0 0 16 16',
    html: '<g><path d="M8.75 1.75a.75.75 0 00-1.5 0v6.59L5.3 6.24a.75.75 0 10-1.1 1.02L7.45 10.76a.78.78 0 00.038.038.748.748 0 001.063-.037l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V1.75z"/><path d="M1.75 9a.75.75 0 01.75.75v3c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75v-3a.75.75 0 011.5 0v3A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-3A.75.75 0 011.75 9z"/></g>'
  },
  issue: {
    viewBox: '0 0 24 24',
    html: '<path fill="none" stroke="#ffff" stroke-width="2" d="M23,20 C21.62,17.91 20,17 19,17 M5,17 C4,17 2.38,17.91 1,20 M19,9 C22,9 23,6 23,6 M1,6 C1,6 2,9 5,9 M19,13 L24,13 L19,13 Z M5,13 L0,13 L5,13 Z M12,23 L12,12 L12,23 L12,23 Z M12,23 C8,22.9999998 5,20.0000002 5,16 L5,9 C5,9 8,6.988 12,7 C16,7.012 19,9 19,9 C19,9 19,11.9999998 19,16 C19,20.0000002 16,23.0000002 12,23 L12,23 Z M7,8 L7,6 C7,3.24 9.24,1 12,1 C14.76,1 17,3.24 17,6 L17,8"/>'
  },
  nav: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="currentColor"></path> <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="currentColor"></path><path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="currentColor"></path></g>'
  },
  plus: {
    viewBox: '0 0 24 24',
    html: '<g><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="currentColor"/></g>'
  },
  search: {
    viewBox: '0 0 24 24',
    html: '<g><path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill="currentColor"/></g>'
  },
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  load(type, container) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svgElem = document.createElementNS(xmlns, 'svg');
    for (const [k, v] of Object.entries(iconSVG[type])) {
      if (k === 'html') {
        continue;
      }
      svgElem.setAttributeNS(null, k, v);
    }
    if (typeof iconSVG[type].html === 'string') {
      svgElem.innerHTML = iconSVG[type].html;
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};
/**
 * @template { string } S
 * @param { S } str
 * @param { boolean } lowerCase
 * @returns { S }
 */
const bscStr = (str = '', lowerCase = true) => {
  const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
  return txt.replaceAll(/\W/g, '');
};
const Network = {
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   * @link https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   * @link https://developer.mozilla.org/docs/Web/API/Fetch_API
   * @param { RequestInfo | URL } url - The URL to fetch
   * @param { GM.Request['method'] | Request['method'] } method - Fetch method
   * @param { GM.Request['responseType'] | 'buffer' | 'json' | 'text' | 'blob' | 'document' } responseType - Response type
   * @param { RequestInit | GM.Request | XMLHttpRequest } data - Fetch parameters
   * @param { boolean } useFetch
   * @returns { Promise<Response> } Fetch results
   */
  async req(url, method = 'GET', responseType = 'json', data = {}, useFetch = false) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
    method = bscStr(method, false);
    responseType = bscStr(responseType);
    const params = {
      method,
      ...data
    };
    if (Supports.gm && !useFetch) {
      if (params.credentials) {
        Object.assign(params, {
          anonymous: false
        });
        if (Object.is(params.credentials, 'omit')) {
          Object.assign(params, {
            anonymous: true
          });
        }
        delete params.credentials;
      }
    } else if (params.onprogress) {
      delete params.onprogress;
    }
    return await new Promise((resolve, reject) => {
      /**
       * @param { Response } response
       * @returns { Response | Document }
       */
      const fetchResp = (response_1) => {
        if (!response_1.ok) reject(response_1);
        const check = (str_2 = 'text') => {
          return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
        };
        if (responseType.match(/buffer/i)) {
          resolve(check('arrayBuffer'));
        } else if (responseType.match(/json/i)) {
          resolve(check('json'));
        } else if (responseType.match(/text/i)) {
          resolve(check('text'));
        } else if (responseType.match(/blob/i)) {
          resolve(check('blob'));
        } else if (responseType.match(/formdata/i)) {
          resolve(check('formData'));
        } else if (responseType.match(/clone/i)) {
          resolve(check('clone'));
        } else if (responseType.match(/document/i) && isFN(response_1.text)) {
          const domParser = new DOMParser();
          const respTxt = response_1.text();
          if (respTxt instanceof Promise) {
            respTxt.then((txt) => {
              const doc = domParser.parseFromString(txt, 'text/html');
              resolve(doc);
            });
          } else {
            const doc = domParser.parseFromString(respTxt, 'text/html');
            resolve(doc);
          }
        } else {
          resolve(response_1);
        }
      };
      if (responseType.match(/buffer/i)) {
        fetch(url, params).then(fetchResp).catch(reject);
      } else if (Supports.gm && !useFetch) {
        Network.xmlRequest({
          url,
          responseType,
          ...params,
          onerror: reject,
          onload: (r_1) => {
            if (r_1.status !== 200) reject(new Error(`${r_1.status} ${url}`));
            if (responseType.match(/basic/i)) resolve(r_1);
            resolve(r_1.response);
          }
        });
      } else {
        fetch(url, params).then(fetchResp).catch(reject);
      }
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${Network.sizes[i]}`;
  },
  prog(evt) {
    return Object.is(evt.total, 0)
      ? Network.format(evt.loaded)
      : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  /**
   * @param { GM.Request } details
   * @returns { Promise<void> }
   */
  xmlRequest(details) {
    if (Supports.gm) {
      return GM.xmlHttpRequest(details);
    }
    try {
      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        let method = 'GET';
        let url = 'about:blank';
        let body;
        for (const [key, value] of Object.entries(details)) {
          if (key === 'onload') {
            req.addEventListener('load', () => {
              if (isFN(value)) {
                value(req);
              }
              resolve(req);
            });
          } else if (key === 'onerror') {
            req.addEventListener('error', (evt) => {
              if (isFN(value)) {
                value(evt);
              }
              reject(evt);
            });
          } else if (key === 'onabort') {
            req.addEventListener('abort', (evt) => {
              if (isFN(value)) {
                value(evt);
              }
              reject(evt);
            });
          } else if (key === 'onprogress') {
            req.addEventListener('progress', value);
          } else if (key === 'responseType') {
            if (value.match(/buffer|blob|document|json|text/i)) {
              if (value.match(/buffer/i)) {
                req.responseType = 'arraybuffer';
              } else {
                req.responseType = value;
              }
            }
          } else if (key === 'method') {
            method = value;
          } else if (key === 'url') {
            url = value;
          } else if (key === 'body') {
            body = value;
          }
        }
        req.open(method, url);

        if (isEmpty(req.responseType)) {
          req.responseType = 'text';
        }

        if (body) {
          req.send(body);
        } else {
          req.send();
        }
      });
    } catch (ex) {
      err(ex);
    }
  }
};
/**
 * Get info of script
 * @returns { GM["info"] } Script info
 * @link https://violentmonkey.github.io/api/gm/#gm_info
 */
MU.info = Supports.gm
  ? isFN(GM.info)
    ? GM.info
    : GM_info
  : {
      script: {
        icon: '',
        name: 'Magic Userscript+',
        namespace: 'https://github.com/magicoflolis/Userscript-Plus',
        updateURL: 'https://github.com/magicoflolis/Userscript-Plus/releases',
        version: 'Bookmarklet'
      }
    };
MU.tab = {
  /**
   * Open a new window
   * @param { string } url - URL of webpage to open
   * @param { object } params - GM parameters
   * @returns { WindowProxy | null | void } `GM.openInTab` or `GM_openInTab` with `window.open` as a fallback
   * @link https://violentmonkey.github.io/api/gm/#gm_openintab
   * @link https://developer.mozilla.org/docs/Web/API/Window/open
   */
  open(
    url,
    params = {
      active: true,
      insert: true
    },
    features
  ) {
    if (!Supports.gm && isBlank(params)) {
      params = '_blank';
    }
    if (features) {
      return window.open(url, params, features);
    }
    if (Supports.gm) {
      return isFN(GM.openInTab) ? GM.openInTab(url, params) : GM_openInTab(url, params);
    }
    return window.open(url, params);
  }
};
MU.storage = {
  getItem(key) {
    return window.localStorage.getItem(key);
  },
  has(key) {
    return !isNull(this.getItem(key));
  },
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  /**
   * Set value - Saves key to either GM managed storage or `window.localStorage`
   * @param { string } key - Key to set the value of
   * @param { object } v - Value of key
   * @link https://violentmonkey.github.io/api/gm/#gm_setvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  async setValue(key, v) {
    v = typeof v === 'string' ? v : JSON.stringify(v ?? {});
    if (Supports.gm) {
      let GMType;
      if (isFN(GM.setValue)) {
        GMType = GM.setValue(key, v);
      } else {
        GMType = Promise.resolve(GM_setValue(key, v));
      }
      await GMType;
    } else {
      this.setItem(`MUJS-${key}`, v);
    }
  },
  /**
   * Get Value
   * @link https://violentmonkey.github.io/api/gm/#gm_getvalue
   * @link https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   */
  async getValue(key, def = {}) {
    try {
      if (Supports.gm) {
        let GMType;
        if (isFN(GM.getValue)) {
          GMType = await GM.getValue(key, JSON.stringify(def));
        } else {
          GMType = GM_getValue(key, JSON.stringify(def));
        }
        return JSON.parse(GMType);
      }
      return this.has(`MUJS-${key}`) ? JSON.parse(this.getItem(`MUJS-${key}`)) : def;
    } catch (ex) {
      err(ex);
    }
  }
};

const sleazyRedirect = () => {
  if (!/greasyfork\.org/.test(window.location.hostname) && cfg.sleazyredirect) {
    return;
  }
  const otherSite = /greasyfork\.org/.test(window.location.hostname) ? 'sleazyfork' : 'greasyfork';
  qs('span.sign-in-link')
    ? /scripts\/\d+/.test(window.location.href)
      ? !qs('#script-info') && (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a'))
        ? window.location.assign(
            window.location.href.replace(
              /\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/,
              '//$1' + otherSite + '.org'
            )
          )
        : false
      : false
    : false;
};
// #region Primary Function
/**
 * @param { ShadowRoot | HTMLIFrameElement } injCon
 * @param { Document } doc
 */
const primaryFN = (injCon, doc) => {
  try {
    const mujsRoot = make('mujs-root');
    /**
     * Inject CSS (Cascading Style Sheet Document) into `document.head`
     * @param { string } css - CSS to inject
     * @param { string } name - (optional) Name of stylesheet `mph-`
     * @param { * } root - (optional) Custom `document.head` path
     * @return { HTMLStyleElement | null } Style element
     */
    const loadCSS = (css, name = 'CSS', root = document) => {
      /** @type {Element} */
      let el;
      try {
        if (typeof css !== 'string') {
          throw new Error('[loadCSS] "css" must be a typeof "String"');
        }
        if (typeof name !== 'string') {
          throw new Error('[loadCSS] "name" must be a typeof "String"');
        }
        el = root || doc;
        if (isBlank(css)) {
          throw new Error(`[loadCSS] "${name}" contains empty CSS string`);
        }
        if (el.querySelector(`style[data-role="${name}"]`)) {
          return el.querySelector(`style[data-role="${name}"]`);
        }
        const sty = make('style', `mujs-${name}`, {
          textContent: css,
          dataset: {
            insertedBy: 'userscript-plus',
            role: name
          }
        });
        if (!isEmpty(el.shadowRoot)) {
          el.shadowRoot.appendChild(sty);
        } else {
          el.appendChild(sty);
        }
        return sty;
      } catch (ex) {
        err(ex);
      }
      return null;
    };
    const injectedCore = loadCSS(main_css, 'primary-stylesheet', mujsRoot);
    if (!injectedCore) {
      throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
    }
    injCon.append(mujsRoot);
    if (navigator.languages.length > 0) {
      for (const nlang of navigator.languages) {
        const lg = nlang.split('-')[0];
        if (alang.indexOf(lg) === -1) {
          alang.push(lg);
        }
      }
    }
    if (!alang.includes(Language.navLang)) {
      alang.push(Language.navLang);
    }

    const memory = new Memorize();
    const memorized = memory.cache;
    memory.create('cfg', 'container', 'userjs');

    const getHost = (str = '') => {
      return str.split('.').splice(-2).join('.');
    };
    const cfgMap = memorized.get('cfg');
    const rebuildCfg = () => {
      for (const i of cfg.engines) {
        if (cfgMap.has(i.name)) {
          const inp = cfgMap.get(i.name);
          inp.checked = i.enabled;
          if (i.name === 'github') {
            const txt = cfgMap.get('github-token');
            dom.prop(txt, 'value', i.token);
          }
        }
      }
      for (const [k, v] of Object.entries(cfg)) {
        if (typeof v === 'boolean') {
          if (cfgMap.has(k)) {
            const inp = cfgMap.get(k);
            if (inp.type === 'checkbox') {
              inp.checked = v;
            } else {
              dom.prop(inp, 'value', v);
            }
          }
        }
      }
      dom.prop(cfgMap.get('blacklist'), 'value', JSON.stringify(cfg.blacklist, null, ' '));
      dom.prop(cfgMap.get('theme'), 'value', JSON.stringify(cfg.theme, null, ' '));
      renderTheme(cfg.theme);
    };
    const ntHead = make('mujs-tabs');
    const ntAdd = make('mujs-addtab', '', {
      dataset: {
        command: 'new-tab'
      },
      innerHTML: '+'
    });
    const activeTab = (tab) => {
      dom.cl.remove(qsA('mujs-tab', ntHead), 'active');
      dom.cl.add(tab, 'active');
      if (tab.dataset.host === 'about:blank') {
        MUJS.refresh();
      } else {
        buildlist(tab.dataset.host);
      }
    };
    /** @param { Element } tab */
    const closeTab = (tab) => {
      if (MUJS.cache.has(tab.dataset.host)) {
        MUJS.cache.delete(tab.dataset.host);
      }
      if (dom.cl.has(tab, 'active')) {
        MUJS.refresh();
      }
      const sibling = tab.previousElementSibling ?? tab.nextElementSibling;
      if (sibling) {
        if (sibling.dataset.command !== 'new-tab') {
          activeTab(sibling);
        }
      }
      tab.remove();
    };
    const newTab = (host = undefined) => {
      const tab = make('mujs-tab', '', {
        dataset: {
          command: 'switch-tab'
        },
        style: `order: ${ntHead.childElementCount};`
      });
      const tabClose = make('mu-js', '', {
        dataset: {
          command: 'close-tab'
        },
        innerHTML: 'X'
      });
      const tabHost = make('mujs-host');
      tab.append(tabHost, tabClose);
      ntHead.append(tab);
      dom.cl.remove(qsA('mujs-tab', ntHead), 'active');
      dom.cl.add(tab, 'active');

      if (isNull(host)) {
        MUJS.refresh();
        tab.dataset.host = 'about:blank';
        const siteSearcher = make('input', 'mujs-searcher', {
          autocomplete: 'off',
          spellcheck: false,
          type: 'text',
          placeholder: host || MUJS.host,
          onchange(evt) {
            evt.preventDefault();
            const value = getHost(evt.target.value);
            if (MUJS.checkBlacklist(value)) {
              MUJS.showError(`Host blacklisted "${value}"`);
              return;
            }
            tab.dataset.host = value;
            tabHost.textContent = value;
            buildlist(value);
            siteSearcher.remove();
          }
        });
        tabHost.append(siteSearcher);
      } else {
        tab.dataset.host = host || MUJS.host;
        tabHost.textContent = host || MUJS.host;
      }
    };
    const table = make('table');
    const tabbody = make('tbody');
    const tabhead = make('thead');
    const mouseTimeout = new Timeout();
    const main = make('mu-js', 'main hidden', {
      onmouseenter(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        timeout.clear(...timeout.ids);
        mouseTimeout.clear(...mouseTimeout.ids);
        evt.target.style.opacity = '1';
      },
      async onmouseleave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const target = evt.target;
        await mouseTimeout.set(2500);
        target.style.opacity = '0.15';
      },
      // #region Event handler
      async onclick(evt) {
        try {
          /** @type { Element } */
          const target = evt.target.closest('[data-command]');
          if (!target) {
            return;
          }
          const dataset = target.dataset;
          const cmd = dataset.command;
          if (cmd === 'open-tab' && dataset.webpage) {
            MU.tab.open(dataset.webpage);
          } else if (cmd === 'navigation') {
            if (dom.cl.has(btngreasy, 'hidden')) {
              dom.cl.remove([btngreasy, btnhome, btnissue], 'hidden');
            } else {
              dom.cl.add([btngreasy, btnhome, btnissue], 'hidden');
            }
          } else if (cmd === 'list-description') {
            const arr = [];
            const ignoreTags = new Set(['TD', 'MUJS-A', 'MU-JS']);
            for (const node of target.parentElement.childNodes) {
              if (ignoreTags.has(node.tagName)) {
                continue;
              }
              if (node.tagName === 'TEXTAREA' && isEmpty(node.value)) {
                continue;
              }
              arr.push(node);
            }
            if (target.nextElementSibling) {
              arr.push(target.nextElementSibling);
              if (target.nextElementSibling.nextElementSibling) {
                arr.push(target.nextElementSibling.nextElementSibling);
              }
            }
            if (dom.cl.has(arr[0], 'hidden')) {
              dom.cl.remove(arr, 'hidden');
            } else {
              dom.cl.add(arr, 'hidden');
            }
          } else if (cmd === 'close') {
            container.remove();
          } else if (cmd === 'show-filter') {
            dom.cl.toggle(fsearch, 'hidden');
          } else if (cmd === 'fullscreen') {
            if (dom.cl.has(btnfullscreen, 'expanded')) {
              dom.cl.remove([btnfullscreen, main], 'expanded');
              dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsOpen'));
            } else {
              dom.cl.add([btnfullscreen, main], 'expanded');
              dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsClose'));
            }
          } else if (cmd === 'hide-list') {
            dom.cl.add(main, 'hidden');
            dom.cl.remove(mainframe, 'hidden');
            timeoutFrame();
          } else if (cmd === 'save') {
            // MUJS.refresh();
            if (!isNull(legacyMsg)) {
              legacyMsg = null;
              MUJS.rebuild = true;
              dom.prop(rateContainer, 'innerHTML', '');
            }
            if (!dom.prop(target, 'disabled')) {
              MUJS.save();
              sleazyRedirect();
              if (MUJS.rebuild) {
                MUJS.cache.clear();
                buildlist();
              }
              MUJS.unsaved = false;
              MUJS.rebuild = false;
            }
          } else if (cmd === 'reset') {
            cfg = defcfg;
            MUJS.unsaved = true;
            MUJS.rebuild = true;
            rebuildCfg();
          } else if (cmd === 'settings') {
            if (MUJS.unsaved) {
              MUJS.showError('Unsaved changes');
            }
            if (dom.cl.has(cfgpage, 'hidden')) {
              dom.cl.remove(cfgpage, 'hidden');
              dom.cl.add(table, 'hidden');
              if (!container.supported) {
                dom.attr(container.frame, 'style', 'height: 100%;');
              }
            } else {
              dom.cl.add(cfgpage, 'hidden');
              dom.cl.remove(table, 'hidden');
              if (!container.supported) {
                dom.attr(container.frame, 'style', '');
              }
            }
            MUJS.rebuild = false;
          } else if (cmd === 'new-tab') {
            newTab();
          } else if (cmd === 'switch-tab') {
            dom.cl.add(cfgpage, 'hidden');
            dom.cl.remove(table, 'hidden');
            activeTab(target);
          } else if (cmd === 'close-tab' && target.parentElement) {
            closeTab(target.parentElement);
          } else if (cmd === 'download-userjs') {
            if (!MUJS.userjsCache.has(+dataset.userjs)) {
              return;
            }
            const txt = await reqCode(MUJS.userjsCache.get(+dataset.userjs));
            if (typeof txt !== 'string') {
              return;
            }
            const makeUserJS = new Blob([txt], { type: 'text/plain' });
            const dlBtn = make('a', 'mujs_Downloader');
            dlBtn.href = URL.createObjectURL(makeUserJS);
            dlBtn.download = 'test.user.js';
            dlBtn.click();
            URL.revokeObjectURL(dlBtn.href);
            dlBtn.remove();
          } else if (cmd === 'load-userjs') {
            if (!MUJS.userjsCache.has(+dataset.userjs)) {
              return;
            }
            const codeArea = qs('textarea', target.parentElement.parentElement);
            if (!isEmpty(codeArea.value)) {
              dom.cl.toggle(codeArea, 'hidden');
              return;
            }
            const txt = await reqCode(MUJS.userjsCache.get(+dataset.userjs));
            if (typeof txt !== 'string') {
              return;
            }
            codeArea.value = txt;
            dom.cl.remove(codeArea, 'hidden');
          } else if (/export-/.test(cmd)) {
            const str = JSON.stringify(cmd === 'export-cfg' ? cfg : cfg.theme, null, ' ');
            const bytes = new TextEncoder().encode(str);
            const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
            const dlBtn = make('a', 'mujs-exporter', {
              href: URL.createObjectURL(blob),
              download: `Magic_Userscript_${cmd === 'export-cfg' ? 'config' : 'theme'}.json`
            });
            dlBtn.click();
            URL.revokeObjectURL(dlBtn.href);
          } else if (/import-/.test(cmd)) {
            if (qs('input', target.parentElement)) {
              qs('input', target.parentElement).click();
              return;
            }
            const inpJSON = make('input', 'hidden', {
              type: 'file',
              accept: '.json',
              onchange: (evt) => {
                try {
                  [...evt.target.files].forEach((file) => {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = () => {
                      const result = JSON.parse(reader.result);
                      if (result.blacklist) {
                        log(`Imported config: { ${file.name} }`, result);
                        cfg = result;
                        MUJS.unsaved = true;
                        MUJS.rebuild = true;
                        rebuildCfg();
                        MUJS.save();
                        sleazyRedirect();
                        MUJS.cache.clear();
                        buildlist();
                        MUJS.unsaved = false;
                        MUJS.rebuild = false;
                      } else {
                        log(`Imported theme: { ${file.name} }`, result);
                        cfg.theme = result;
                        renderTheme(cfg.theme);
                      }
                      inpJSON.remove();
                    };
                    reader.onerror = () => {
                      MUJS.showError(reader.error);
                      inpJSON.remove();
                    };
                  });
                } catch (ex) {
                  MUJS.showError(ex);
                  inpJSON.remove();
                }
              }
            });
            target.parentElement.append(inpJSON);
            inpJSON.click();
          }
        } catch (ex) {
          err(ex);
        }
      }
      // #endregion
    });
    const tbody = make('mu-js', 'mujs-body');
    const header = make('mu-js', 'mujs-header-prim');
    const footer = make('mujs-row', 'mujs-footer');
    const cfgpage = make('mujs-row', 'mujs-cfg hidden');
    const countframe = make('mujs-column');
    const btnframe = make('mujs-column');
    const btnHandles = make('mujs-column', 'btn-handles');
    const gfcounter = make('count-frame', '', {
      dataset: {
        counter: 'gsfork'
      },
      title: 'https://greasyfork.org + https://sleazyfork.org'
    });
    const sfcounter = make('count-frame', '', {
      dataset: {
        counter: 'custom'
      },
      title: 'https://openuserjs.org'
    });
    const fsearch = make('mujs-btn', 'hidden');
    const mainbtn = make('count-frame', 'mainbtn', {
      innerHTML: '0'
    });
    const rateContainer = make('mujs-column', 'rate-container');
    const ContainerHandler = class {
      constructor() {
        this.showError = this.showError.bind(this);
        this.cleanup = this.cleanup.bind(this);
        try {
          // Unsure if `window.location` would be better
          this.webpage = new URL(window.top.document.location.href);
        } catch (ex) {
          err(ex, { cause: 'ContainerHandler' });
          this.webpage = window.location;
        }
        this.host = getHost(this.webpage.hostname);
        this.cache = memorized.get('container');
        this.userjsCache = memorized.get('userjs');
        this.unsaved = false;
        this.isBlacklisted = false;
        this.rebuild = false;
        this.forkCount = 0;
        this.customCount = 0;

        ael(window.self ?? window, 'beforeunload', this.cleanup);
      }

      checkBlacklist(str) {
        str = str || this.host;
        let blacklisted = false;
        for (const b of cfg.blacklist.filter((b) => b.enabled)) {
          if (b.regex === true) {
            const reg = new RegExp(b.url, b.flags);
            if (!reg.test(str)) continue;
            blacklisted = true;
          }
          if (Array.isArray(b.url)) {
            for (const c of b.url) {
              if (!str.includes(c)) continue;
              blacklisted = true;
            }
          }
          if (!str.includes(b.url)) continue;
          blacklisted = true;
        }
        if (blacklisted) {
          this.showError('Blacklisted');
          timeoutFrame();
        }
        this.isBlacklisted = blacklisted;
        return blacklisted;
      }

      addCustomCnt(cnt) {
        this.customCount += cnt;
        this.updateCounters();
      }

      addForkCnt(cnt) {
        this.forkCount += cnt;
        this.updateCounters();
      }

      updateCounters() {
        dom.prop(sfcounter, 'innerHTML', this.customCount);
        dom.prop(gfcounter, 'innerHTML', this.forkCount);
        dom.prop(mainbtn, 'innerHTML', this.customCount + this.forkCount);
      }

      save() {
        this.unsaved = false;
        MU.storage.setValue('Config', cfg);
        info('Saved:', cfg);
      }

      showError(...ex) {
        err(...ex);
        const error = make('mu-js', 'error');
        let str = '';
        for (const e of ex) {
          str += `${typeof e === 'string' ? e : `${e.message} ${e.stack}`}\n`;
        }
        error.appendChild(document.createTextNode(str));
        footer.append(error);
      }

      refresh() {
        this.forkCount = 0;
        this.customCount = 0;
        this.updateCounters();
        dom.prop([tabbody, rateContainer, footer], 'innerHTML', '');
      }

      cleanup() {
        this.cache.clear();
      }
    };
    const MUJS = new ContainerHandler();
    const timeout = new Timeout();
    const timeoutFrame = async () => {
      timeout.clear(...timeout.ids);
      if (dom.cl.has(mainframe, 'hidden')) {
        return;
      }
      if (typeof cfg.time === 'number' && !Number.isNaN(cfg.time)) {
        await timeout.set(MUJS.isBlacklisted ? cfg.time / 2 : cfg.time);
      } else {
        await timeout.set(10000);
      }
      container.remove();
      return timeout.clear(...timeout.ids);
    };
    const renderTheme = (theme) => {
      theme = theme || cfg.theme;
      if (theme === defcfg.theme) {
        return;
      }
      const sty = mujsRoot.style;
      for (const [k, v] of Object.entries(theme)) {
        const str = `--mujs-${k}`;
        const prop = sty.getPropertyValue(str);
        if (isEmpty(v)) {
          theme[k] = prop;
        }
        if (prop === v) {
          continue;
        }
        sty.removeProperty(str);
        sty.setProperty(str, v);
      }
    };
    const reqCode = async (obj = {}) => {
      if (obj.code_data) {
        return obj.code_data;
      }
      const txt = await Network.req(obj.code_url, 'GET', 'text').catch(MUJS.showError);
      if (typeof txt !== 'string') {
        return;
      }
      if (isNull(txt.match(/\/\/\s@[\w][\s\S]+/g))) {
        return;
      }
      Object.assign(obj, {
        code_data: txt
      });
      return txt;
    };
    const template = {
      id: 0,
      bad_ratings: 0,
      good_ratings: 0,
      ok_ratings: 0,
      daily_installs: 0,
      total_installs: 0,
      name: 'NOT FOUND',
      description: 'NOT FOUND',
      version: '0.0.0',
      url: 'about:blank',
      code_url: 'about:blank',
      created_at: Date.now(),
      code_updated_at: Date.now(),
      users: [
        {
          name: '',
          url: ''
        }
      ]
    };
    const createjs = (ujs, engine) => {
      for (const key in template) {
        if (hasOwn(ujs, key)) continue;
        ujs[key] = template[key];
      }
      // Lets not add this UserJS to the list
      if (ujs.id === 421603) {
        return;
      }
      if (!MUJS.userjsCache.has(ujs.id)) {
        MUJS.userjsCache.set(ujs.id, ujs);
      }
      const eframe = make('td', 'install-btn');
      const uframe = make('td', 'mujs-uframe');
      const fdaily = make('td', 'mujs-list', {
        innerHTML: ujs.daily_installs
      });
      const fupdated = make('td', 'mujs-list', {
        innerHTML: new Intl.DateTimeFormat(navigator.language).format(new Date(ujs.code_updated_at))
      });
      const fname = make('td', 'mujs-name');
      const ftitle = make('mujs-a', 'mujs-homepage', {
        innerHTML: ujs.name,
        title: ujs.url,
        dataset: {
          command: 'open-tab',
          webpage: ujs.url
        }
      });
      const fmore = make('mujs-column', 'mujs-list hidden');
      const fver = make('mu-js', 'mujs-list', {
        innerHTML: `${lang.version}: ${ujs.version}`
      });
      const fcreated = make('mu-js', 'mujs-list', {
        innerHTML: `${lang.created}: ${new Intl.DateTimeFormat(navigator.language).format(
          new Date(ujs.created_at)
        )}`
      });
      const flicense = make('mu-js', 'mujs-list', {
        title: ujs.license ?? 'Not licensed',
        innerHTML: `License: ${ujs.license ?? 'N/A'}`,
        style:
          'text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: fit-content; max-width: 20em;'
      });
      const ftotal = make('mu-js', 'mujs-list', {
        innerHTML: `${lang.total}: ${ujs.total_installs}`
      });
      const fratings = make('mu-js', 'mujs-list', {
        title: lang.rating,
        innerHTML: `${lang.rating}:`
      });
      const fgood = make('mu-js', 'mujs-list mujs-ratings', {
        title: lang.good,
        innerHTML: ujs.good_ratings,
        style:
          'border-color: rgb(51, 155, 51); background-color: #339b331a; color: rgb(51, 255, 51);'
      });
      const fok = make('mu-js', 'mujs-list mujs-ratings', {
        title: lang.ok,
        innerHTML: ujs.ok_ratings,
        style:
          'border-color: rgb(155, 155, 0); background-color: #9b9b001a; color: rgb(255, 255, 0);'
      });
      const fbad = make('mu-js', 'mujs-list mujs-ratings', {
        title: lang.bad,
        innerHTML: ujs.bad_ratings,
        style: 'border-color: rgb(155, 0, 0); background-color: #9b33331a; color: rgb(255, 0, 0);'
      });
      const fdesc = make('mu-js', 'mujs-list mujs-pointer', {
        title: ujs.description,
        innerHTML: ujs.description,
        dataset: {
          command: 'list-description'
        }
      });
      const fdwn = make('mu-jsbtn', 'install', {
        innerHTML: `${iconSVG.load('install')} ${lang.install}`,
        title: `${lang.install} "${ujs.name}"`,
        dataset: {
          command: 'open-tab',
          webpage: ujs.code_url
        }
      });
      const fBtns = make('mujs-column', 'mujs-list hidden');
      const dwnCode = make('mu-jsbtn', '', {
        innerHTML: `${iconSVG.load('install')} ${lang.saveFile}`,
        dataset: {
          command: 'download-userjs',
          userjs: ujs.id
        }
      });
      const tr = make('tr', 'frame');
      const codeArea = make('textarea', 'code-area hidden', {
        dataset: {
          name: 'code'
        },
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft'
      });
      const loadCode = make('mu-jsbtn', '', {
        innerHTML: `${iconSVG.load('search')} ${lang.codePreview}`,
        dataset: {
          command: 'load-userjs',
          userjs: ujs.id
        }
      });
      if (engine) {
        tr.dataset.engine = engine;
        if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
          tr.dataset.good = 'upsell';
        }
      }
      // cfg.codePreview &&
      if (ujs.code_data) {
        codeArea.value = ujs.code_data;
      }
      for (const u of ujs.users) {
        const user = make('mujs-a', '', {
          innerHTML: u.name,
          title: u.url,
          dataset: {
            command: 'open-tab',
            webpage: u.url
          }
        });
        if (cfg.recommend.author && u.id === authorID) {
          tr.dataset.author = 'upsell';
          dom.prop(user, 'innerHTML', `${u.name} ${iconSVG.load('verified')}`);
        }
        uframe.append(user);
      }
      if (engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.id)) {
        tr.dataset.good = 'upsell';
      }
      eframe.append(fdwn);
      fmore.append(ftotal, fratings, fgood, fok, fbad, fver, fcreated, flicense);
      fBtns.append(dwnCode, loadCode);
      fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

      for (const e of [fname, uframe, fdaily, fupdated, eframe]) {
        tr.append(e);
      }
      tabbody.append(tr);
    };
    //#region Build List
    const buildlist = async (host = undefined) => {
      try {
        if (isEmpty(host)) {
          host = MUJS.host;
        }
        if (!qs(`mujs-tab[data-host="${host}"]`, ntHead)) {
          newTab(host);
        }
        MUJS.refresh();
        if (MUJS.checkBlacklist(host)) {
          return;
        }
        if (!MUJS.cache.has(host)) {
          const engineTemplate = {};
          for (const engine of cfg.engines) {
            engineTemplate[engine.name] = [];
          }
          MUJS.cache.set(host, engineTemplate);
        }
        const engines = cfg.engines.filter((e) => e.enabled);
        const cache = MUJS.cache.get(host);
        const customRecords = [];
        const isSupported = (name) => {
          for (const [k, v] of Object.entries(unsupported)) {
            if (k !== name) {
              continue;
            }
            if (v.includes(host)) {
              return false;
            }
          }
          return true;
        };
        info('Building list', { cache, MUJS, engines, allCache: MUJS.cache });
        if (!isNull(legacyMsg)) {
          const txt = make('mujs-row', 'legacy-config', {
            innerHTML: legacyMsg
          });
          rateContainer.append(txt);
          return;
        }
        for (const engine of engines) {
          if (!isSupported(engine.name)) {
            MUJS.showError(`Search engine "${engine.name}" does not support this host`);
            continue;
          }
          const forkFN = async (data) => {
            if (!data) {
              return;
            }
            const hideData = [];
            const filterLang = data.filter((d) => {
              if (d.deleted) {
                return false;
              }
              if (cfg.filterlang) {
                const dlocal = d.locale.split('-')[0] ?? d.locale;
                if (alang.includes(dlocal)) {
                  return true;
                }
                hideData.push(d);
                return false;
              }
              return true;
            });
            let finalList = filterLang;

            const hds = [];
            for (const h of hideData) {
              const txt = await reqCode(h);
              if (typeof txt !== 'string') {
                continue;
              }
              const headers = txt.match(/\/\/\s@[\w][\s\S]+/g);
              if (isNull(headers)) {
                continue;
              }
              for (const lng of alang) {
                const findName = new RegExp(`//\\s*@name:${lng}\\s*(.*)`, 'gi').exec(headers[0]);
                const findDesc = new RegExp(`//\\s*@description:${lng}\\s*(.*)`, 'gi').exec(
                  headers[0]
                );
                if (!isNull(findName)) {
                  Object.assign(h, {
                    name: findName[1],
                    translated: true
                  });
                }
                if (!isNull(findDesc)) {
                  Object.assign(h, {
                    description: findDesc[1],
                    translated: true
                  });
                }
              }
              if (h.translated) {
                hds.push(h);
              }
            }
            finalList = [...new Set([...hds, ...filterLang])];

            for (const ujs of finalList) {
              if (cfg.codePreview && !ujs.code_data) {
                await reqCode(ujs);
              }
              createjs(ujs, engine.name);
            }
            cache[engine.name].push(...finalList);
            MUJS.addForkCnt(finalList.length);
          };
          const customFN = async (htmlDocument) => {
            if (!htmlDocument) {
              return;
            }
            const selected = htmlDocument.documentElement;
            if (qs('.col-sm-8 .tr-link', selected)) {
              for (const i of qsA('.col-sm-8 .tr-link', selected)) {
                await query('.script-version', i);
                const fixurl = dom
                  .prop(qs('.tr-link-a', i), 'href')
                  .replace(new RegExp(document.location.origin, 'gi'), 'https://openuserjs.org');
                const layout = {
                  name: dom.text(qs('.tr-link-a', i)),
                  description: dom.text(qs('p', i)),
                  version: dom.text(qs('.script-version', i)),
                  url: fixurl,
                  code_url: `${fixurl.replace(/\/scripts/gi, '/install')}.user.js`,
                  total_installs: dom.text(qs('td:nth-child(2) p', i)),
                  created_at: dom.attr(qs('td:nth-child(4) time', i), 'datetime'),
                  code_updated_at: dom.attr(qs('td:nth-child(4) time', i), 'datetime'),
                  users: [
                    {
                      name: dom.text(qs('.inline-block a', i)),
                      url: dom.prop(qs('.inline-block a', i), 'href')
                    }
                  ]
                };
                createjs(layout, engine.name);
                customRecords.push(layout);
              }
            }
            if (qs('div.gist-snippet', selected)) {
              for (const g of qsA('div.gist-snippet', selected)) {
                if (qs('span > a:nth-child(2)', g).textContent.includes('.user.js')) {
                  const fixurl = qs('span > a:nth-child(2)', g).href.replace(
                    new RegExp(document.location.origin, 'gi'),
                    'https://gist.github.com'
                  );
                  const layout = {};
                  Object.assign(layout, {
                    url: fixurl,
                    code_url: `${fixurl}/raw/${qs('span > a:nth-child(2)', g).textContent}`,
                    created_at: qs('time-ago.no-wrap', g).getAttribute('datetime'),
                    users: [
                      {
                        name: qs('span > a[data-hovercard-type]', g).textContent,
                        url: qs('span > a[data-hovercard-type]', g).href.replace(
                          new RegExp(document.location.origin, 'gi'),
                          'https://gist.github.com'
                        )
                      }
                    ]
                  });
                  for (const i of qsA('.file-box table tr .blob-code', g)) {
                    const headers = dom.text(i).match(/\/\/\s@[\w][\s\S]+/gi) || [];
                    if (headers.length > 0) {
                      const crop = headers[0].split(
                        /\/\/\s@(name|description|author|version)\s+/gi
                      );
                      if (headers[0].includes('@name') && !headers[0].includes('@namespace')) {
                        Object.assign(layout, {
                          name: crop[2].trim()
                        });
                      }
                      if (headers[0].includes('@description')) {
                        Object.assign(layout, {
                          description: crop[2].trim()
                        });
                      }
                      if (headers[0].includes('@version')) {
                        Object.assign(layout, {
                          version: crop[2].trim()
                        });
                      }
                    }
                  }
                  createjs(layout, engine.name);
                  customRecords.push(layout);
                }
              }
            }
            cache[engine.name].push(...customRecords);
            MUJS.addCustomCnt(customRecords.length);
          };
          const gitFN = async (data) => {
            try {
              if (isBlank(data.items)) return;
              for (const r of data.items) {
                const layout = {
                  name: r.name,
                  description: isEmpty(r.repository.description)
                    ? 'No Description'
                    : r.repository.description,
                  url: r.html_url,
                  code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
                  code_updated_at: r.commit || Date.now(),
                  total_installs: r.score,
                  users: [
                    {
                      name: r.repository.owner.login,
                      url: r.repository.owner.html_url
                    }
                  ]
                };
                createjs(layout, engine.name);
                customRecords.push(layout);
              }
              cache[engine.name].push(...customRecords);
              MUJS.addCustomCnt(data.items.length);
            } catch (ex) {
              MUJS.showError(ex);
            }
          };
          const eURL = engine.url;
          const cEngine = cache[`${engine.name}`];
          if (!isEmpty(cEngine)) {
            for (const ujs of cEngine) {
              createjs(ujs, engine.name);
            }
            if (engine.name.includes('fork')) {
              MUJS.addForkCnt(cEngine.length);
            } else {
              MUJS.addCustomCnt(cEngine.length);
            }
            continue;
          }
          if (engine.name.includes('fork')) {
            Network.req(`${eURL}/scripts/by-site/${host}.json`).then(forkFN).catch(MUJS.showError);
          } else if (engine.name.match(/(openuserjs|github)/gi)) {
            if (/github/gi.test(engine.name)) {
              if (isEmpty(engine.token)) {
                MUJS.showError(`"${engine.name}" requires a token to use`);
                continue;
              }
              Network.req(
                `${eURL}"// ==UserScript=="+${host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`,
                'GET',
                'json',
                {
                  headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${engine.token}`,
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                }
              )
                .then(gitFN)
                .then(() => {
                  Network.req('https://api.github.com/rate_limit', 'GET', 'json', {
                    headers: {
                      Accept: 'application/vnd.github+json',
                      Authorization: `Bearer ${engine.token}`,
                      'X-GitHub-Api-Version': '2022-11-28'
                    }
                  })
                    .then((data) => {
                      for (const [key, value] of Object.entries(data.resources.code_search)) {
                        const txt = make('mujs-row', 'rate-info', {
                          innerHTML: `${key.toUpperCase()}: ${value}`
                        });
                        rateContainer.append(txt);
                      }
                    })
                    .catch(MUJS.showError);
                })
                .catch(MUJS.showError);
            } else {
              Network.req(`${eURL}${host}`, 'GET', 'document')
                .then(customFN)
                .catch((error) => {
                  MUJS.showError(`Engine: "${engine.name}"`, error);
                });
            }
          }
        }
      } catch (ex) {
        MUJS.showError(ex);
      }
    };
    //#endregion
    //#region Make Config
    const makecfg = () => {
      const exBtn = make('mu-js', 'mujs-sty-flex');
      const exportCFG = make('mujs-btn', 'mujs-export', {
        innerHTML: 'Export Config',
        dataset: {
          command: 'export-cfg'
        }
      });
      const importCFG = make('mujs-btn', 'mujs-import', {
        innerHTML: 'Import Config',
        dataset: {
          command: 'import-cfg'
        }
      });
      const exportTheme = make('mujs-btn', 'mujs-export', {
        innerHTML: 'Export Theme',
        dataset: {
          command: 'export-theme'
        }
      });
      const importTheme = make('mujs-btn', 'mujs-import', {
        innerHTML: 'Import Theme',
        dataset: {
          command: 'import-theme'
        }
      });
      exBtn.append(importCFG, importTheme, exportCFG, exportTheme);
      cfgpage.append(exBtn);

      const makerow = (desc = 'Placeholder', type = null, nm = 'Placeholder', attrs = {}) => {
        const sec = make('mujs-section', 'mujs-cfg-section', {
          style: !Supports.gm && nm === 'cache' ? 'display: none;' : ''
        });
        const lb = make('label');
        const divDesc = make('mu-js', 'mujs-cfg-desc', {
          innerHTML: desc
        });
        lb.append(divDesc);
        sec.append(lb);
        cfgpage.append(sec);
        if (isNull(type)) {
          return lb;
        }
        const inp = make('input', 'mujs-cfg-input', {
          type,
          dataset: {
            name: nm
          },
          ...attrs
        });
        if (!cfgMap.has(nm)) {
          cfgMap.set(nm, inp);
        }
        if (type === 'checkbox') {
          const inlab = make('mu-js', 'mujs-inlab');
          const la = make('label', '', {
            onclick() {
              inp.dispatchEvent(new MouseEvent('click'));
            }
          });
          inlab.append(inp, la);
          lb.append(inlab);
          if (nm.includes('-')) {
            return inp;
          }
          if (/(greasy|sleazy)fork|openuserjs|gi(thub|st)/gi.test(nm)) {
            for (const i of cfg.engines) {
              if (i.name !== nm) continue;
              inp.checked = i.enabled;
              inp.dataset.engine = i.name;
              ael(inp, 'change', (evt) => {
                MUJS.unsaved = true;
                MUJS.rebuild = true;
                i.enabled = evt.target.checked;
              });
            }
          } else {
            inp.checked = cfg[nm];
            ael(inp, 'change', (evt) => {
              MUJS.unsaved = true;
              if (/filterlang/i.test(nm)) {
                MUJS.rebuild = true;
              }
              cfg[nm] = evt.target.checked;
            });
          }
        } else {
          lb.append(inp);
        }
        return inp;
      };
      makerow('Sync with GM', 'checkbox', 'cache');
      makerow('Auto Fullscreen', 'checkbox', 'autoexpand', {
        onchange(e) {
          if (e.target.checked) {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsClose'));
          } else {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsOpen'));
          }
        }
      });
      makerow(lang.redirect, 'checkbox', 'sleazyredirect');
      makerow(lang.filter, 'checkbox', 'filterlang');
      makerow(lang.codePreview, 'checkbox', 'codePreview');
      for (const inp of [
        makerow('Recommend author', 'checkbox', 'recommend-author'),
        makerow('Recommend scripts', 'checkbox', 'recommend-others')
      ]) {
        const nm = inp.dataset.name === 'recommend-author' ? 'author' : 'others';
        inp.checked = cfg.recommend[nm];
        ael(inp, 'change', (evt) => {
          MUJS.unsaved = true;
          cfg.recommend[nm] = evt.target.checked;
        });
      }
      makerow('Greasy Fork', 'checkbox', 'greasyfork');
      makerow('Sleazy Fork', 'checkbox', 'sleazyfork');
      makerow('Open UserJS', 'checkbox', 'openuserjs');
      makerow('GitHub API', 'checkbox', 'github');
      const ghAPI = cfg.engines.find((c) => c.name === 'github');
      const ghToken = makerow('GitHub API (Token)', 'text', 'github', {
        defaultValue: '',
        value: ghAPI.token ?? '',
        placeholder: 'Paste Access Token',
        onchange(evt) {
          MUJS.unsaved = true;
          MUJS.rebuild = true;
          if (isNull(legacyMsg)) {
            ghAPI.token = evt.target.value;
          }
        }
      });
      ghToken.dataset.engine = 'github-token';
      cfgMap.set('github-token', ghToken);
      makerow(`${lang.dtime} (ms)`, 'number', 'time', {
        defaultValue: 10000,
        value: cfg.time,
        min: 0,
        step: 500,
        onbeforeinput(evt) {
          if (evt.target.validity.badInput) {
            dom.cl.add(evt.target, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', true);
          } else {
            dom.cl.remove(evt.target, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', false);
          }
        },
        oninput(evt) {
          MUJS.unsaved = true;
          const t = evt.target;
          if (t.validity.badInput || (t.validity.rangeUnderflow && t.value !== '-1')) {
            dom.cl.add(t, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', true);
          } else {
            dom.cl.remove(t, 'mujs-invalid');
            dom.prop(savebtn, 'disabled', false);
            cfg.time = isEmpty(t.value) ? cfg.time : parseFloat(t.value);
          }
        }
      });

      const cbtn = make('mu-js', 'mujs-sty-flex');
      const savebtn = make('mujs-btn', 'save', {
        dataset: {
          command: 'save'
        },
        disabled: false,
        innerHTML: lang.save
      });
      const resetbtn = make('mujs-btn', 'reset', {
        innerHTML: lang.reset,
        dataset: {
          command: 'reset'
        }
      });
      const blacklist = make('textarea', '', {
        dataset: {
          name: 'blacklist'
        },
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft',
        value: JSON.stringify(cfg.blacklist, null, ' '),
        oninput(evt) {
          let isvalid = true;
          try {
            cfg.blacklist = JSON.parse(evt.target.value);
            isvalid = true;
          } catch (ex) {
            err(ex);
            isvalid = false;
          } finally {
            if (isvalid) {
              dom.cl.remove(evt.target, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', false);
            } else {
              dom.cl.add(evt.target, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', true);
            }
          }
        }
      });
      const theme = make('textarea', '', {
        dataset: {
          name: 'theme'
        },
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft',
        value: JSON.stringify(cfg.theme, null, ' '),
        oninput(evt) {
          let isvalid = true;
          try {
            cfg.theme = JSON.parse(evt.target.value);
            isvalid = true;
            renderTheme(JSON.parse(evt.target.value));
          } catch (ex) {
            err(ex);
            isvalid = false;
          } finally {
            if (isvalid) {
              dom.cl.remove(evt.target, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', false);
            } else {
              dom.cl.add(evt.target, 'mujs-invalid');
              dom.prop(savebtn, 'disabled', true);
            }
          }
        }
      });
      cfgMap.set('blacklist', blacklist);
      cfgMap.set('theme', theme);
      cbtn.append(resetbtn, savebtn);
      cfgpage.append(blacklist, theme, cbtn);
    };
    //#endregion
    const makeTHead = (rows) => {
      const tr = make('tr');
      for (const r of normalizeTarget(rows)) {
        const tparent = make('th', r.class ?? '', r);
        tr.append(tparent);
      }
      tabhead.append(tr);
      table.append(tabhead, tabbody);
    };
    const btnHide = make('mujs-btn', 'hide-list', {
      title: lang.min,
      innerHTML: iconSVG.load('hide'),
      dataset: {
        command: 'hide-list'
      }
    });
    const btnfullscreen = make('mujs-btn', 'fullscreen', {
      title: lang.max,
      innerHTML: iconSVG.load('fullscreen'),
      dataset: {
        command: 'fullscreen'
      }
    });
    const mainframe = make('mu-js', 'mainframe', {
      style: 'opacity: 0.15;',
      onmouseleave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.target.style.opacity = '0.15';
        timeoutFrame();
      },
      onmouseenter(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.target.style.opacity = '1';
        timeout.clear(...timeout.ids);
      },
      onclick(e) {
        e.preventDefault();
        timeout.clear(...timeout.ids);
        dom.cl.remove(main, 'hidden');
        dom.cl.add(mainframe, 'hidden');
        if (cfg.autoexpand) {
          dom.cl.add([btnfullscreen, main], 'expanded');
          dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('fsClose'));
        }
      }
    });
    const filterList = make('input', 'mujs-fltlist', {
      autocomplete: 'off',
      spellcheck: false,
      type: 'text',
      placeholder: lang.searcher,
      oninput(evt) {
        evt.preventDefault();
        if (isEmpty(evt.target.value)) {
          dom.cl.remove(qsA('tr', tabbody), 'hidden');
          return;
        }
        const reg = new RegExp(evt.target.value, 'gi');
        for (const ujs of qsA('tr', tabbody)) {
          const m = ujs.children[0];
          const n = ujs.children[1];
          const final = m.textContent.match(reg) || n.textContent.match(reg) || [];
          final.length === 0 ? dom.cl.add(ujs, 'hidden') : dom.cl.remove(ujs, 'hidden');
        }
      }
    });
    const filterBtn = make('mujs-btn', 'filter', {
      title: lang.filterA,
      innerHTML: iconSVG.load('filter'),
      dataset: {
        command: 'show-filter'
      }
    });
    const closebtn = make('mujs-btn', 'close', {
      title: lang.close,
      innerHTML: iconSVG.load('close'),
      dataset: {
        command: 'close'
      }
    });
    const btncfg = make('mujs-btn', 'settings', {
      title: 'Settings',
      innerHTML: iconSVG.load('cfg'),
      dataset: {
        command: 'settings'
      }
    });
    const btnhome = make('mujs-btn', 'github hidden', {
      title: `GitHub (v${
        MU.info.script.version.includes('.') || MU.info.script.version.includes('Book')
          ? MU.info.script.version
          : MU.info.script.version.slice(0, 5)
      })`,
      innerHTML: iconSVG.load('gh'),
      dataset: {
        command: 'open-tab',
        webpage: 'https://github.com/magicoflolis/Userscript-Plus'
      }
    });
    const btnissue = make('mujs-btn', 'issue hidden', {
      innerHTML: iconSVG.load('issue'),
      title: lang.issue,
      dataset: {
        command: 'open-tab',
        webpage: 'https://github.com/magicoflolis/Userscript-Plus/issues/new'
      }
    });
    const btngreasy = make('mujs-btn', 'greasy hidden', {
      title: 'Greasy Fork',
      innerHTML: iconSVG.load('gf'),
      dataset: {
        command: 'open-tab',
        webpage: 'https://greasyfork.org/scripts/421603'
      }
    });
    const btnnav = make('mujs-btn', 'nav', {
      title: 'Navigation',
      innerHTML: iconSVG.load('nav'),
      dataset: {
        command: 'navigation'
      }
    });
    renderTheme(cfg.theme);

    countframe.append(gfcounter, sfcounter);
    fsearch.append(filterList);
    btnHandles.append(btnHide, btnfullscreen, closebtn);
    btnframe.append(fsearch, filterBtn, btncfg, btnissue, btnhome, btngreasy, btnnav, btnHandles);
    header.append(countframe, rateContainer, btnframe);
    ntHead.append(ntAdd);
    tbody.append(table, cfgpage);

    makeTHead([
      {
        class: 'mujs-header-name',
        textContent: lang.name
      },
      {
        textContent: lang.createdby
      },
      {
        textContent: lang.daily
      },
      {
        textContent: lang.updated
      },
      {
        textContent: lang.install
      }
    ]);

    const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
    const comparer = (idx, asc) => (a, b) =>
      ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
          ? v1 - v2
          : v1.toString().localeCompare(v2))(
        getCellValue(asc ? a : b, idx),
        getCellValue(asc ? b : a, idx)
      );
    for (const th of tabhead.rows[0].cells) {
      if (dom.text(th) === lang.install) continue;
      dom.cl.add(th, 'mujs-pointer');
      ael(th, 'click', () => {
        /**
         * @link https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/53880407#53880407
         */
        const table = th.closest('table');
        const tbody = table.querySelector('tbody');
        Array.from(tbody.querySelectorAll('tr'))
          .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
          .forEach((tr) => tbody.appendChild(tr));
      });
    }
    main.append(header, ntHead, tbody, footer);
    mainframe.append(mainbtn);
    mujsRoot.append(mainframe, main);

    makecfg();
    buildlist().then(timeoutFrame);

    if (cfg.injection) {
      info('Migrating old config...');
      delete cfg.injection;
      MUJS.save();
    }
  } catch (ex) {
    err(ex);
    container.remove();
  }
};
// #endregion
/**
 * @param { Function } callback
 */
const loadDOM = (callback) => {
  if (!isFN(callback)) {
    return;
  }
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    callback.call({}, document);
  }
  document.addEventListener('DOMContentLoaded', (evt) => callback.call({}, evt.target), {
    once: true
  });
};
const Setup = async () => {
  try {
    cfg = setObj(defcfg, await MU.storage.getValue('Config'));
    lang = Language.cache;
    info('Config:', cfg);
    loadDOM((doc) => {
      if (window.location === null) {
        err('"window.location" is null, reload the webpage or use a different one');
        return;
      }
      if (doc === null) {
        err('"doc" is null, reload the webpage or use a different one');
        return;
      }
      sleazyRedirect();
      container.inject(primaryFN, doc);
    });
  } catch (ex) {
    err(ex);
  }
};
Setup();

})();