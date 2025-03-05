// ==UserScript==
// @version      7.6.0
// @name         Magic Userscript+ : Show Site All UserJS
// @name:ar      Magic Userscript+: عرض جميع ملفات UserJS
// @name:de      Magic Userscript+ : Website anzeigen Alle UserJS
// @name:es      Magic Userscript+: Mostrar sitio todos los UserJS
// @name:fr      Magic Userscript+ : Afficher le site Tous les UserJS
// @name:ja      Magic Userscript+ : サイトをすべて表示 UserJS
// @name:nl      Magic Userscript+: Site alle UserJS tonen
// @name:pl      Magic Userscript+ : Pokaż witrynę Wszystkie UserJS
// @name:ru      Magic Userscript+: показать сайт всем UserJS
// @name:zh      Magic Userscript+ ：显示站点所有 UserJS
// @name:zh-CN      Magic Userscript+ ：显示站点所有 UserJS
// @name:zh-TW      Magic Userscript+ ：显示站点所有 UserJS
// @description  Finds available userscripts for the current webpage.
// @description:ar      يبحث عن نصوص المستخدمين المتاحة لصفحة الويب الحالية.
// @description:de      Findet verfügbare Benutzerskripte für die aktuelle Webseite.
// @description:es      Busca los usercripts disponibles para la página web actual.
// @description:fr      Recherche les userscripts disponibles pour la page web en cours.
// @description:ja      現在のウェブページで利用可能なユーザスクリプトを検索します。
// @description:nl      Zoekt beschikbare gebruikerscripts voor de huidige webpagina.
// @description:pl      Wyszukuje dostępne skrypty użytkownika dla bieżącej strony internetowej.
// @description:ru      Находит доступные юзерскрипты для текущей веб-страницы.
// @description:zh      为当前网页查找可用的用户脚本。
// @description:zh-CN      为当前网页查找可用的用户脚本。
// @description:zh-TW      为当前网页查找可用的用户脚本。
// @author       Magic <magicoflolis@tuta.io>
// @supportURL   https://github.com/magicoflolis/Userscript-Plus/issues
// @namespace    https://github.com/magicoflolis/Userscript-Plus
// @homepageURL  https://github.com/magicoflolis/Userscript-Plus
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV8TRZFKBzuIOGSoTnZREcGlVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gzg5Oii5S4v+SQosYD4778e7e4+4dIDSrTLN6YoCm22Y6EZdy+VWp7xUigghhDqLMLCOZWczCd3zdI8DXuyjP8j/35xhUCxYDAhJxjBmmTbxBPLNpG5z3icOsLKvE58QTJl2Q+JHrisdvnEsuCzwzbGbT88RhYqnUxUoXs7KpEU8TR1RNp3wh57HKeYuzVq2z9j35C4MFfSXDdZqjSGAJSaQgQUEdFVRhI0qrToqFNO3Hffwjrj9FLoVcFTByLKAGDbLrB/+D391axalJLykYB3pfHOdjDOjbBVoNx/k+dpzWCSA+A1d6x19rArOfpDc6WuQICG0DF9cdTdkDLneA4SdDNmVXEmkKxSLwfkbflAeGboGBNa+39j5OH4AsdbV8AxwcAuMlyl73eXd/d2//nmn39wOjunK6jS33SAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+gDDBAAJWyXgRAAABRPSURBVHjazVt9VNRl9v9854VhhjdBiHcUaFQEDTVCdk1IstTV0jb1LLZkJZrl4knLTnZaKjdqdXdLXcvfyoHUErPUBBEMLREJ6egJFBUUBF9WMd6R4WW+M/P5/eHMdxkYEJS0e8498MzzzPN87537PM+9n3u/An49kgFwA+AJIACAP4AxAEIA+AFwBzDEPLYJQB2AqwDOATgN4AqAywBubNu2rTk+Pl4EAJIyABAEwTQYDyn8CoIrAEQD+BOAMLPgLgAcAGDs2LGQyWSora1FYGAg6urqUFZWBgCIiYnBqVOn0NDQAAA6T0/Pm/X19ZflcvkZo9G4w2AwHAFgwG+Q5ACCg4KClixZsuT82rVrTTt27CCAHpybm8vq6moWFRXRZDKxpqaGkyZN4q0fl3zyySelsaIoMiYmhg899BD/9re/mQAUAogHEGxe8/5TaGiob0RERMrSpUuvZ2Zmmo4cOcIjR44wLy/PpgIOHjzI2tpaTp06lVqtlhUVFUxLS5MU8MQTT0hjLQqZPHkySRIAFy1aZAwNDa0C8C/z9rpvNBbAPwBctyVob3zw4EEWFBRQJpNJFvH999/3WwE5OTncs2ePZUwVgDjzWXPHB9Wd0GsACuRy+UoXFxev5cuXo7OzEyStWBBsHzGiKMJkunWGmUwmyGQy6X+lUgkAcHBw6HXxoUOHWv4dDiAFwNcAJtzpgTUQUgNYIgjCP2bNmiX7+9//jo0bN2Lz5s3IyspCUFCQJIz5xB7Q5FVVVZg9ezby8vKwYsWKgTzTFACZAFYC+BZA+6ArQKlUOouiuAZAgiAIMq1WixEjRuCjjz6Cq6srPvzwQ1RUVNze5GQyKyV1bW/atAnJycmIj49Henr6/66qLpbUdbzRaMS0adOQm5sLAN4A/g/ARADvAGgZvCNeLvdUq9VbzVcQAXDo0KHcs2cPDQYD29ramJiYSKVSedszICIigpGRkTbb9vb2nDRpEmNiYujk5MQZM2bQ3d2dbm5unDFjhtX4qKgonj59mt7e3t3XEAH82+xnDAp5AThjSxgPDw9++eWXNJlMbGpq4htvvCEdbr82r1ixgr/73e966zeaz4W7VoIzgAyZTMaoqChOnTqVarW6hxIyMzNpMBio0+m4ZMmSflnCPWCj2RKc71R4NYD1AIwODg4sKipiU1MTV69e3UNAT09Pfv311yTJxsZGLl++/J5Zwm1YNMugvhMFxAFoA0CFQsH33nuPHR0dbGtr49KlS6lSqawW8/LyYnZ2Ng0GA2/evMkXXniBCoXit6CEFrNbPiB6SalUtncVwNnZmcnJySTJlpYWvv7665TL5VaL+fj4cN++fSTJ+vp6vvzyy31agrOzc1/7eMAcFRXFIUOG2Oq7NhA/YaRcLr85bNgwuri4WE2kUqn48ccfs7OzkzqdjgkJCT0swdfXl7m5uTQajWxubuaCBQskRYWGhjIrK4uCIBAAY2JiSFJq3y2T5PTp03vrP9wfj1EA8PkjjzzC8+fPMysriz4+PlYTubi4cN26dSTJ5uZmm/vdz8+PBw4cIEnW1tbyxRdfpCAIDA4OpsFgsBo7WML3Y64287buk7x9fX07oqOj2dLSQpPJxMzMzB5KUKvV3LRpE/V6PW/evMmFCxfSzs7Oaoy/vz9/+OEHGo1GNjY2cu7cudRoNExNTeWePXuYkZHBsLAw7t+/n4IgUBAEPv/889y+fTu/+OILvvDCC5JAGRkZjIiI4OrVq/nll19aRYxdOSMjg+PHjycAJiUl8cMPP+TMmTO5Y8cOzpo1yxI7ePYV0v5rzpw51Gg0/Mtf/kKdTkeDwcCcnBx6enpaLebq6sr169dLJ7+t/a7Vann+/HmS5I0bN7hgwQK6urpy1apVLCwslLaASqViSkoKW1tbWVJSwuLiYt68eZNpaWlUKpUkyR9//JE///wzL126xOrqagYFBdncAhblZGdns66ujoWFhTx16hQ7Ozvp7+9PcxRpM5QOBlBu2cdOTk5877332NraSpPJxN27d9PLy8tqQQcHB27ZsoWiKLKlpYULFiyQrkhHR0e+++671Ov1tFB9fT1nz54tKSo6OpokOWbMGDY0NPC1116jWq2mvb09ly9fzsbGRoaHh5MkP/nkE9rb23PMmDESTnA7BVy4cIHBwcF0cXHhTz/9xH/+8580yxhsSwHx5nuT0dHRTEpKokql4sqVK9ne3k5RFLl//356eHhYLerm5sbPPvtMEvDFF1+kvb09165dy/b2dnan69ev86mnnqIgCJJwlnC366Hr7OxMk8nE2NhYkpRcYVvASW8KyM/Pl/qys7OZk5Nj8Q3ibQVFhZbBjz32GHU6HQFQqVQyOTmZOp2ORqOR6enpPZTg5OTErVu30mAwsKmpiSkpKezs7GRvdO7cOXp7e9PHx4cGg4GRkZHs7Ozkww8/LM05fvx4dnR0cNKkST0E7q8Cjh49aqUAC0gjCEJh90Aw1uw6SgqwABAWc37rrbfY0dFBURS5d+9eurm5WS3u7u7OlJQU9of0ej2fffZZOjk5UafT0dPTkydOnGBpaSmfeeYZzpkzh6dOnWJxcTG9vLwGTQGWtqOjo9EsM2Rm/lNXcKQ7kOHs7IwNGzZg48aNEEURTz31FD7++OOuwATa2tpw/vx5GAy3xyyVSiV8fX1hMplgMplw48YNvPTSS7h48SJ27NiB9PR0XL58GQsXLkRNTY3t+7oXsMXyeV9h9/z5861kdgdwvPt92tULtFxTarWaSUlJ1Ov11Ov13LVrF4cMGUKlUsl33nmHOp2uXxYgiiLnz59Pi5ttWUcmk1GhUFChUFjdKAqFwuqO79629blcLrfyVLu2zX+PW6LFUAD/7a+zoVKp+Mknn7C9vZ0Gg4Fbtmzh66+/zo6ODvaXzp07R19f3/sdI/zXLDumA2gdyJcdHByYnJxMURSp1+v7PPC6k8lk4ubNm38LIXMrgOlyM572zEAiJVEUUVBQAHd3d4wbNw4qlar/mRhBwKhRo3DlyhWcPXtWAkfvA9kBOCoHsBDAIwP9tsFgwNGjR6HRaBAZGWl14Nx2ZTs7PProo6irq0NxcfGAwdNBpEsAcOhOzSgoKIhqtZr/+c9/BnQGWKilpYVxcXE2cYO3336b77777q+9DQ4BQNmdfDk0NJS5ubm0s7Ojs7Mz169fT6PRaHPP90W//PIL4+Pje8QRmzZtYkpKyqAIGh0dzRMnTrC5uZm7du2in5+fpa8M5qzsgCaUyWRMT0+3+NbS7fDBBx+wvLyc9fX1rK2t5cmTJ/nSSy/xq6++oiiKvSqhqamJc+fO/VUQpMDAQNbW1jI9PZ0JCQksLy/nd999R3t7ewKow7fffmuqq6tjWlqapBlRFBkfH8+srCzJJe4e6lZUVEggaVlZGbVaLRUKBYOCgjhp0iRGRkbS29ubgiDQ3d2d27dv79MSampqOH/+fOke379/Pw8fPmxz24WHh9vkBx98sMf41atXs7KykgEBAQTAWbNmsba2lsHBwQRgwLx584wrVqxgdXU18/PzOXToUJJkVVUVk5KSGBcX12PShx9+WHJhAXDt2rVWgYeDgwMfe+wxenh48NVXX6W/vz/d3Ny4Z8+ePi2hsbGRs2fPplwuZ0JCAg8dOtRj7cOHD/f6/cLCwh7j09PTWVhYKDlBTk5OFEWR4eHhtKTa6yzwVFtbGydOnEiSfOutt3pFWCzRm+UunzBhAltaWjh69GgC4LJly5iXl0dBEOjm5sbg4GA6OTnxgQce4M6dO/u0hGvXrtGCSSQkJPRYWy6XS95id+6OUQJgZmam1Y8jCAJJWhRQpzArYOjJkyehVquhVt9CkH/++ederyeDwQCDwQCVSgVRFFFWVobS0lIkJCRg5cqVWLFiBdasWQMPDw9s2bIFTzzxBGpraxEXF4dly5ZBo9FgxowZkMt74hLe3t5ISUnB888/j23btvXof+ONNzB27Fibz1VWVob333/f6rOGhgZ4enrCzs4Oer0e7u7u0Ov1aGtrA4A6mUKh+K9SqcTTTz+NlpYWNDc3S0L2Ro2NjWhoaEBQUBAAQKfTYdeuXZgyZQoWL14MOzs7HDt2DFqtFjNnzsTcuXMRFhYGPz8/hIaGYvHixdi3b1+v87u5uWHz5s2IjY3t0Tds2DCEhoba5MDAwB7ji4qK4OPjg5CQEMhkMsyZMwcNDQ1obGwEgKtITEzcn5mZyaamJn7zzTfUaDQkyccff7zXk9XR0ZGFhYVctmyZ9NmQIUN45coV3rhxg/v27aNcLmd4eDibm5uZm5vLvXv3sqCggBcvXpSSKdnZ2TavTgvV1tbyySefvKski6urK8vLy1lSUsLdu3ezvr6eqampljk3YsGCBe/n5+fzzTfflCDu0tJSTpw4sc+Jly5dypycHKt9l5SUxNLSUgmalsvlXLp0KY8dO8ZPP/2U0dHRPHPmDAEwODiYPj4+zMjI6PNMuHTpUp8/Rn94+PDh/OKLL1hUVMQ1a9ZIcsrl8iV3FAxZMrm7d+9mWFjYXT2ct7e3lEfo64qMjY0d7HRbq6+v79MDDod7i7/vhv39/Zmdnd2nJVRVVXHy5MmDGg4LghBqExC5H+zv788jR4706Tpfu3aN0dHRg2UJEiAiM9fZ3PdE5vDhw5mbm9unJVRUVDAqKmow1kvpCgNagaL3WwnHjh3r0xKuXLnC3//+93ez/SRQ1AoWDwwM5PDhwwc84eTJkymKIgEwICCAw4YNs+rXaDSSlwiAo0ePpoODQ6/toKAgHjlypE9LKC8vt4LRB8g9YHFoNJqF5eXlpr/+9a8DntCS4rL46l1dz64wu+UX6w/MrdVqefz48T4tobq6mpGRkQO1BKvEiKwLrJ2/bt26ms8++wwAEBAQgGHDhsHNzQ0jRoyAp+etnKK7uztGjBgBb29vm16c0Wjs4UVaYC+S8Pf3BwD4+fkhJCQEo0aNAgD4+/sjJCQEDg4OCAwMRGVlJf785z/jxx9/7NVjDAgIQFpamuQay2Qy+Pj4YOTIkdBqtXB1dZVgOA8PD/j6+kIQhIsACmwmR11cXDZYNPX999+zsrJSMsWysjJOmTKFRUVF0rVkMeuuFvDdd99JlZ8WtmR3ANzWtKdNm0aSfPPNNxkUFMSQkBCeOHHitgfjhAkTqFarmZKSQpPJRKPRyIKCAoaEhDA0NJR5eXkcNWpUn8lRmFPHVZYS1oaGBs6ZM4djx45ldXU1q6urrdobN260qQCj0cj29naJLaixIAi0s7MjSc6cOVNKhHZty2QykuSZM2c4cuRIqlQqjho1isePH+8TaT59+jRHjx5NjUZDZ2dnhoSEMD8/n3v37uVXX33FxMREm+nx7oWSNwC8bb4i1GfPnkVGRgaMRiMqKythb29v1X7wwQdtavHChQv46KOPJKB05MiRWLVqFQBAr9dLf9vb/1fQ2b29bt06lJeXAwCuXr2KxYsXY9u2bXjooYdsIs1hYWHYu3cv5s2bh6qqKjz99NPo6OjA1KlTcfHiRSQkJLSbZbtxu1rhHACFDQ0N0Ov1MBqN0j7u2jYajbC3t7epgOvXr+Pzzz9HamoqUlNTceDAgQHDtR0dHdL/EyZMQGtrK5577jmcPHmy1+9otVps2bIFSqUSxcXF8PLywoULF/D++++jpaWl0CzbbYulGwCsysrKaureMVjwdUdHBwICAnptA8DLL78MX19feHt7IykpCYmJiaioqMCSJUtQWlraa84hIiICr732GnJychAbG4tFixbhm2++uQ5glVm2flWLn9y5c+erhw8f7uwtIdlbctJWX/f2gQMHsGHDBnR0dCA2NrZHGwBu3ryJkpISVFZWIiwsDPv378fIkSNRX1+P5557DiUlJb2uHx0dDZlMhk2bNuHSpUut5iLqkwMulHR0dPy3pWhixowZ/MMf/iCd7NOnT5fa3t7eXLx4cY/Pu0Z8ln4AfOCBBzhv3jwmJCTQz8/Pqu3r6yv5BY8//jgXLlzIRx55hDKZjF5eXlKhxMSJE3nu3Dmbh+LWrVspCAI1Gs1dFUpaSmX/fa/d5O4vTvTG48ePZ3FxsZXwlZWVluvOBODTuymVtZC7ufDYeC8VMG3atH6NHTFiBNPS0piXl8ddu3Z19QwPDGbFuLvZEsR7oQCNRmMT4e2NlUolhwwZYkl2mABsHUzhu26H9ebaW/5GWXe3FeL9qSD/k7n29p4K5+Pjc7uiimvmZ1PjHtAEc+1t271SwKFDh1hQUGAVLU6dOpX+/v7t5me5Jy9NSX4CgLkApgH4ALfe3vpVyWAwQBRFAMCUKVNgNBrxww8/VBsMhrfNHl7DHb0OdBfP1I5b7/juBCAPDg72GjdunLOXl5csMTERoaGhOH36NERRhEajQVxcHOLj4zF58mSIoojLly9Dq9UiOTkZJ06cwMqVK/Hoo4/i7NmzaGtrg4ODA1555RU8++yz0Ov1GDduHI4ePYqSkhJDfX191blz57aaTKYXzNheO+4zyZVK5YMajWahq6vrT4sWLTLl5eUxNTWVLi4uzMnJYW1tLauqqnj58mXW1dVx1qxZUqlsVlYWq6qq2Nrays2bN1OlUnH79u2sqqriwYMH+corr9DLy8uoUCiOC4Lw23p1tpdtFatSqVLHjx9fEhUV9curr77aYYHaVCoVk5KSWFRUxJiYGOr1es6bN49yuZxxcXFcv349PTw8+Mc//rHd09PzuvkXTjFjeIrBflihl/2mkMlkTgAUwi1HXiDZaPbpXVtbW39xcnKiOUByNcf6wi23X2gAgPj4eHl4ePiI4uJij5qaGv+Wlhbftra2EL1erzWZTN4k3a5everk4+ODixcvNpGs02g01wIDA6uvXr16IiIioik/P/9UZ2dnjZ+fX8OVK1dczOuZBEGQ63S6RkdHR5vRGUlPk8nUJJfLOy1tAI2CIOi7j/1/l0eTL0xHMHkAAAAASUVORK5CYII=
// @downloadURL  https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjs.user.js
// @updateURL    https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjs.meta.js
// @license      MIT
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @connect     greasyfork.org
// @connect     sleazyfork.org
// @connect     github.com
// @connect     githubusercontent.com
// @connect     openuserjs.org
// @grant     GM_addValueChangeListener
// @grant     GM_addElement
// @grant     GM_info
// @grant     GM_getValue
// @grant     GM_openInTab
// @grant     GM_setValue
// @grant     GM_registerMenuCommand
// @grant     GM_removeValueChangeListener
// @grant     GM_xmlhttpRequest
// @grant     GM.addValueChangeListener
// @grant     GM.addElement
// @grant     GM.info
// @grant     GM.getValue
// @grant     GM.openInTab
// @grant     GM.setValue
// @grant     GM.registerMenuCommand
// @grant     GM.removeValueChangeListener
// @grant     GM.xmlHttpRequest
// @match     https://*/*
// @noframes
// @run-at     document-start
// ==/UserScript==
(() => {
'use strict';
/******************************************************************************/
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
if (inIframe()) {
  return;
}
let userjs = self.userjs;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [Source Code](https://github.com/gorhill/uBlock/blob/master/platform/common/vapi.js)
 */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS)) {
  return;
}
const createPolicy = () => {
  // Native implementation exists
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (string) => string
    });
  }
};
createPolicy();
/**
 * [_locales](https://github.com/magicoflolis/Userscript-Plus/tree/master/src/_locales)
 */
const translations = {
 "ar": {
  "createdby": "انشأ من قبل",
  "name": "اسم",
  "daily_installs": "التثبيت اليومي",
  "close": "يغلق",
  "filterA": "منقي",
  "max": "تحقيق أقصى قدر",
  "min": "تصغير",
  "search": "يبحث",
  "search_placeholder": "بحث في البرامج النصية",
  "install": "تثبيت",
  "issue": "إصدار جديد",
  "version_number": "الإصدار",
  "updated": "آخر تحديث",
  "total_installs": "إجمالي التثبيت",
  "ratings": "التقييمات",
  "good": "جيد",
  "ok": "جيد",
  "bad": "سيء",
  "created_date": "تم إنشاؤه",
  "redirect": "شوكة دهنية للكبار",
  "filter": "تصفية اللغات الأخرى",
  "dtime": "عرض المهلة",
  "save": "حفظ",
  "reset": "إعادة تعيين",
  "preview_code": "كود المعاينة",
  "saveFile": "احفظ الملف",
  "newTab": "علامة تبويب جديدة",
  "applies_to": "ينطبق على",
  "license": "الترخيص",
  "no_license": "لا يوجد",
  "antifeatures": "إعلانات",
  "userjs_fullscreen": "ملء الشاشة الكاملة التلقائي",
  "listing_none": "(لا يوجد)",
  "export_config": "تهيئة التصدير",
  "export_theme": "تصدير السمة",
  "import_config": "استيراد تهيئة الاستيراد",
  "import_theme": "استيراد النسق",
  "code_size": "حجم الرمز",
  "prmpt_css": "التثبيت كأسلوب المستخدم؟",
  "userjs_inject": "حقن Userscript+",
  "userjs_close": "إغلاق Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "de": {
  "createdby": "Erstellt von",
  "name": "Name",
  "daily_installs": "Tägliche Installationen",
  "close": "Schließen Sie",
  "filterA": "Filter",
  "max": "Maximieren Sie",
  "min": "minimieren",
  "search": "Suche",
  "search_placeholder": "Suche nach Userscripts",
  "install": "Installieren Sie",
  "issue": "Neue Ausgabe",
  "version_number": "Version",
  "updated": "Zuletzt aktualisiert",
  "total_installs": "Installationen insgesamt",
  "ratings": "Bewertungen",
  "good": "Gut",
  "ok": "Okay",
  "bad": "Schlecht",
  "created_date": "Erstellt",
  "redirect": "Greasy Fork für Erwachsene",
  "filter": "Andere Sprachen herausfiltern",
  "dtime": "Zeitüberschreitung anzeigen",
  "save": "Speichern Sie",
  "reset": "Zurücksetzen",
  "preview_code": "Vorschau Code",
  "saveFile": "Datei speichern",
  "newTab": "Neue Registerkarte",
  "applies_to": "Gilt für",
  "license": "Lizenz",
  "no_license": "N/A",
  "antifeatures": "Antifeatures",
  "userjs_fullscreen": "Automatischer Vollbildmodus",
  "listing_none": "(Keine)",
  "export_config": "Konfig exportieren",
  "export_theme": "Thema exportieren",
  "import_config": "Konfig importieren",
  "import_theme": "Thema importieren",
  "code_size": "Code Größe",
  "prmpt_css": "Als UserStyle installieren?",
  "userjs_inject": "Userscript+ einfügen",
  "userjs_close": "Userscript+ schließen",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "en": {
  "createdby": "Created by",
  "name": "Name",
  "daily_installs": "Daily Installs",
  "close": "Close",
  "filterA": "Filter",
  "max": "Maximize",
  "min": "Minimize",
  "search": "Search",
  "search_placeholder": "Search for userscripts",
  "install": "Install",
  "issue": "New Issue",
  "version_number": "Version",
  "updated": "Last Updated",
  "total_installs": "Total Installs",
  "ratings": "Ratings",
  "good": "Good",
  "ok": "Okay",
  "bad": "Bad",
  "created_date": "Created",
  "redirect": "Greasy Fork for adults",
  "filter": "Filter out other languages",
  "dtime": "Display Timeout",
  "save": "Save",
  "reset": "Reset",
  "preview_code": "Preview Code",
  "saveFile": "Download",
  "newTab": "New Tab",
  "applies_to": "Applies to",
  "license": "License",
  "no_license": "N/A",
  "antifeatures": "Antifeatures",
  "userjs_fullscreen": "Automatic Fullscreen",
  "listing_none": "(None)",
  "export_config": "Export Config",
  "export_theme": "Export Theme",
  "import_config": "Import Config",
  "import_theme": "Import Theme",
  "code_size": "Code Size",
  "prmpt_css": "Install as UserStyle?",
  "userjs_inject": "Inject Userscript+",
  "userjs_close": "Close Userscript+",
  "userjs_sync": "Sync",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "en_GB": {
  "createdby": "Created by",
  "name": "Name",
  "daily_installs": "Daily Installs",
  "close": "Close",
  "filterA": "Filter",
  "max": "Maximize",
  "min": "Minimize",
  "search": "Search",
  "search_placeholder": "Search scripts",
  "install": "Install",
  "issue": "New Issue",
  "version_number": "Version",
  "updated": "Last Updated",
  "total_installs": "Total Installs",
  "ratings": "Ratings",
  "good": "Good",
  "ok": "Ok",
  "bad": "Bad",
  "created_date": "Created",
  "redirect": "Greasy Fork for adults",
  "filter": "Filter out other languages",
  "dtime": "Display Timeout",
  "save": "Save",
  "reset": "Reset",
  "preview_code": "Preview Code",
  "saveFile": "Save File",
  "newTab": "New Tab",
  "applies_to": "Applies to",
  "license": "License",
  "no_license": "N/A",
  "antifeatures": "Antifeatures",
  "userjs_fullscreen": "Automatic Fullscreen",
  "listing_none": "(None)",
  "export_config": "Export Config",
  "export_theme": "Export Theme",
  "import_config": "Import Config",
  "import_theme": "Import Theme",
  "code_size": "Code Size",
  "prmpt_css": "Install as UserStyle?",
  "userjs_inject": "Inject Userscript+",
  "userjs_close": "Close Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "es": {
  "createdby": "Creado por",
  "name": "Nombre",
  "daily_installs": "Instalaciones diarias",
  "close": "Ya no se muestra",
  "filterA": "Filtro",
  "max": "Maximizar",
  "min": "Minimizar",
  "search": "Busque en",
  "search_placeholder": "Buscar userscripts",
  "install": "Instalar",
  "issue": "Nueva edición",
  "version_number": "Versión",
  "updated": "Última actualización",
  "total_installs": "Total de instalaciones",
  "ratings": "Clasificaciones",
  "good": "Bueno",
  "ok": "Ok",
  "bad": "Malo",
  "created_date": "Creado",
  "redirect": "Greasy Fork para adultos",
  "filter": "Filtrar otros idiomas",
  "dtime": "Mostrar el tiempo de espera",
  "save": "Guardar",
  "reset": "Reiniciar",
  "preview_code": "Vista previa del código",
  "saveFile": "Guardar archivo",
  "newTab": "Guardar archivo",
  "applies_to": "Se aplica a",
  "license": "Licencia",
  "no_license": "Desconocida",
  "antifeatures": "Características indeseables",
  "userjs_fullscreen": "Pantalla completa automática",
  "listing_none": "(Ninguno)",
  "export_config": "Exportar configuración",
  "export_theme": "Exportar tema",
  "import_config": "Importar configuración",
  "import_theme": "Importar tema",
  "code_size": "Código Tamaño",
  "prmpt_css": "¿Instalar como UserStyle?",
  "userjs_inject": "Inyectar Userscript+",
  "userjs_close": "Cerrar Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "fr": {
  "createdby": "Créé par",
  "name": "Nom",
  "daily_installs": "Installations quotidiennes",
  "close": "Ne plus montrer",
  "filterA": "Filtre",
  "max": "Maximiser",
  "min": "Minimiser",
  "search": "Recherche",
  "search_placeholder": "Rechercher des userscripts",
  "install": "Installer",
  "issue": "Nouveau numéro",
  "version_number": "Version",
  "updated": "Dernière mise à jour",
  "total_installs": "Total des installations",
  "ratings": "Notations",
  "good": "Bon",
  "ok": "Ok",
  "bad": "Mauvais",
  "created_date": "Créé",
  "redirect": "Greasy Fork pour les adultes",
  "filter": "Filtrer les autres langues",
  "dtime": "Délai d'affichage",
  "save": "Sauvez",
  "reset": "Réinitialiser",
  "preview_code": "Prévisualiser le code",
  "saveFile": "Enregistrer le fichier",
  "newTab": "Nouvel onglet",
  "applies_to": "S'applique à",
  "license": "Licence",
  "no_license": "N/A",
  "antifeatures": "Antifeatures",
  "userjs_fullscreen": "Plein écran automatique",
  "listing_none": "(Aucun)",
  "export_config": "Export Config",
  "export_theme": "Exporter le thème",
  "import_config": "Importer la configuration",
  "import_theme": "Importer le thème",
  "code_size": "Code Taille",
  "prmpt_css": "Installer comme UserStyle ?",
  "userjs_inject": "Injecter Userscript+",
  "userjs_close": "Fermer Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "ja": {
  "createdby": "によって作成された",
  "name": "名前",
  "daily_installs": "デイリーインストール",
  "close": "表示されなくなりました",
  "filterA": "フィルター",
  "max": "最大化",
  "min": "ミニマム",
  "search": "検索",
  "search_placeholder": "ユーザースクリプトの検索",
  "install": "インストール",
  "issue": "新刊のご案内",
  "version_number": "バージョン",
  "updated": "最終更新日",
  "total_installs": "総インストール数",
  "ratings": "レーティング",
  "good": "グッド",
  "ok": "良い",
  "bad": "悪い",
  "created_date": "作成",
  "redirect": "大人のGreasyfork",
  "filter": "他の言語をフィルタリングする",
  "dtime": "表示タイムアウト",
  "save": "拯救",
  "reset": "リセット",
  "preview_code": "コードのプレビュー",
  "saveFile": "ファイルを保存",
  "newTab": "新しいタブ",
  "applies_to": "適用対象",
  "license": "ライセンス",
  "no_license": "不明",
  "antifeatures": "アンチ機能",
  "userjs_fullscreen": "自動フルスクリーン",
  "listing_none": "(なし)",
  "export_config": "エクスポート設定",
  "export_theme": "テーマのエクスポート",
  "import_config": "設定のインポート",
  "import_theme": "テーマのインポート",
  "code_size": "コード・サイズ",
  "prmpt_css": "UserStyleとしてインストールしますか？",
  "userjs_inject": "Userscript+ を挿入",
  "userjs_close": "Userscript+ を閉じる",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "nl": {
  "createdby": "Gemaakt door",
  "name": "Naam",
  "daily_installs": "Dagelijkse Installaties",
  "close": "Sluit",
  "filterA": "Filter",
  "max": "Maximaliseer",
  "min": "Minimaliseer",
  "search": "Zoek",
  "search_placeholder": "Zoeken naar gebruikersscripts",
  "install": "Installeer",
  "issue": "Nieuw Issue",
  "version_number": "Versie",
  "updated": "Laatste Update",
  "total_installs": "Totale Installaties",
  "ratings": "Beoordeling",
  "good": "Goed",
  "ok": "Ok",
  "bad": "Slecht",
  "created_date": "Aangemaakt",
  "redirect": "Greasy Fork voor volwassenen",
  "filter": "Filter andere talen",
  "dtime": "Weergave timeout",
  "save": "Opslaan",
  "reset": "Opnieuw instellen",
  "preview_code": "Voorbeeldcode",
  "saveFile": "Bestand opslaan",
  "newTab": "Nieuw tabblad",
  "applies_to": "Geldt voor",
  "license": "Licentie",
  "no_license": "N.v.t.",
  "antifeatures": "Functies voor eigen gewin",
  "userjs_fullscreen": "Automatisch volledig scherm",
  "listing_none": "(Geen)",
  "export_config": "Configuratie exporteren",
  "export_theme": "Thema exporteren",
  "import_config": "Configuratie importeren",
  "import_theme": "Thema importeren",
  "code_size": "Code Grootte",
  "prmpt_css": "Installeren als UserStyle?",
  "userjs_inject": "Injecteer Userscript+",
  "userjs_close": "Sluit Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "pl": {
  "createdby": "Stworzony przez",
  "name": "Nazwa",
  "daily_installs": "Codzienne instalacje",
  "close": "Zamknij",
  "filterA": "Filtr",
  "max": "Maksymalizuj",
  "min": "Minimalizuj",
  "search": "Wyszukiwanie",
  "search_placeholder": "Wyszukiwanie skryptów użytkownika",
  "install": "Instalacja",
  "issue": "Nowy numer",
  "version_number": "Wersja",
  "updated": "Ostatnia aktualizacja",
  "total_installs": "Łączna liczba instalacji",
  "ratings": "Oceny",
  "good": "Dobry",
  "ok": "Ok",
  "bad": "Zły",
  "created_date": "Utworzony",
  "redirect": "Greasy Fork dla dorosłych",
  "filter": "Odfiltruj inne języki",
  "dtime": "Limit czasu wyświetlania",
  "save": "Zapisz",
  "reset": "Reset",
  "preview_code": "Kod podglądu",
  "saveFile": "Zapisz plik",
  "newTab": "Nowa karta",
  "applies_to": "Dotyczy",
  "license": "Licencja",
  "no_license": "N/A",
  "antifeatures": "Antywzorce",
  "userjs_fullscreen": "Automatyczny pełny ekran",
  "listing_none": "(Brak)",
  "export_config": "Konfiguracja eksportu",
  "export_theme": "Motyw eksportu",
  "import_config": "Importuj konfigurację",
  "import_theme": "Importuj motyw",
  "code_size": "Kod Rozmiar",
  "prmpt_css": "Zainstalować jako UserStyle?",
  "userjs_inject": "Wstrzyknij Userscript+",
  "userjs_close": "Zamknij Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "ru": {
  "createdby": "Сделано",
  "name": "Имя",
  "daily_installs": "Ежедневные установки",
  "close": "Больше не показывать",
  "filterA": "Фильтр",
  "max": "Максимизировать",
  "min": "Минимизировать",
  "search": "Поиск",
  "search_placeholder": "Поиск юзерскриптов",
  "install": "Установите",
  "issue": "Новый выпуск",
  "version_number": "Версия",
  "updated": "Последнее обновление",
  "total_installs": "Всего установок",
  "ratings": "Рейтинги",
  "good": "Хорошо",
  "ok": "Хорошо",
  "bad": "Плохо",
  "created_date": "Создано",
  "redirect": "Greasy Fork для взрослых",
  "filter": "Отфильтровать другие языки",
  "dtime": "Тайм-аут отображения",
  "save": "Сохранить",
  "reset": "Перезагрузить",
  "preview_code": "Предварительный просмотр кода",
  "saveFile": "Сохранить файл",
  "newTab": "Новая вкладка",
  "applies_to": "Применяется к",
  "license": "Лицензия",
  "no_license": "Недоступно",
  "antifeatures": "Нежелательная функциональность",
  "userjs_fullscreen": "Автоматический полноэкранный режим",
  "listing_none": "(нет)",
  "export_config": "Экспорт конфигурации",
  "export_theme": "Экспорт темы",
  "import_config": "Импорт конфигурации",
  "import_theme": "Импортировать тему",
  "code_size": "Код Размер",
  "prmpt_css": "Установить как UserStyle?",
  "userjs_inject": "Вставить Userscript+",
  "userjs_close": "Закрыть Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "zh": {
  "createdby": "由...制作",
  "name": "姓名",
  "daily_installs": "日常安装",
  "close": "不再显示",
  "filterA": "过滤器",
  "max": "最大化",
  "min": "最小化",
  "search": "搜索",
  "search_placeholder": "搜索用户脚本",
  "install": "安装",
  "issue": "新问题",
  "version_number": "版本",
  "updated": "最后更新",
  "total_installs": "总安装量",
  "ratings": "评级",
  "good": "好的",
  "ok": "好的",
  "bad": "不好",
  "created_date": "创建",
  "redirect": "大人的Greasyfork",
  "filter": "过滤掉其他语言",
  "dtime": "显示超时",
  "save": "拯救",
  "reset": "重置",
  "preview_code": "预览代码",
  "saveFile": "保存存档",
  "newTab": "新标签",
  "applies_to": "适用于",
  "license": "许可证",
  "no_license": "暂无",
  "antifeatures": "可能不受欢迎的功能",
  "userjs_fullscreen": "自动全屏",
  "listing_none": "(无)",
  "export_config": "导出配置",
  "export_theme": "导出主题",
  "import_config": "导入配置",
  "import_theme": "导入主题",
  "code_size": "代码 尺寸",
  "prmpt_css": "安装为用户风格？",
  "userjs_inject": "注入 Userscript+",
  "userjs_close": "关闭 Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "zh_CN": {
  "createdby": "由...制作",
  "name": "姓名",
  "daily_installs": "日常安装",
  "close": "不再显示",
  "filterA": "过滤器",
  "max": "最大化",
  "min": "最小化",
  "search": "搜索",
  "search_placeholder": "搜索用户脚本",
  "install": "安装",
  "issue": "新问题",
  "version_number": "版本",
  "updated": "最后更新",
  "total_installs": "总安装量",
  "ratings": "评级",
  "good": "好的",
  "ok": "好的",
  "bad": "不好",
  "created_date": "创建",
  "redirect": "大人的Greasyfork",
  "filter": "过滤掉其他语言",
  "dtime": "显示超时",
  "save": "拯救",
  "reset": "重置",
  "preview_code": "预览代码",
  "saveFile": "保存存档",
  "newTab": "新标签",
  "applies_to": "适用于",
  "license": "许可证",
  "no_license": "暂无",
  "antifeatures": "可能不受欢迎的功能",
  "userjs_fullscreen": "自动全屏",
  "listing_none": "(无)",
  "export_config": "导出配置",
  "export_theme": "导出主题",
  "import_config": "导入配置",
  "import_theme": "导入主题",
  "code_size": "代码 尺寸",
  "prmpt_css": "安装为用户风格？",
  "userjs_inject": "注入 Userscript+",
  "userjs_close": "关闭 Userscript+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 },
 "zh_TW": {
  "createdby": "由...制作",
  "name": "姓名",
  "daily_installs": "日常安装",
  "close": "不再显示",
  "filterA": "过滤器",
  "max": "最大化",
  "min": "最小化",
  "search": "搜索",
  "search_placeholder": "搜索用户脚本",
  "install": "安装",
  "issue": "新问题",
  "version_number": "版本",
  "updated": "最后更新",
  "total_installs": "总安装量",
  "ratings": "评级",
  "good": "好的",
  "ok": "好的",
  "bad": "不好",
  "created_date": "创建",
  "redirect": "大人的Greasyfork",
  "filter": "过滤掉其他语言",
  "dtime": "显示超时",
  "save": "拯救",
  "reset": "重置",
  "preview_code": "预览代码",
  "saveFile": "保存存档",
  "newTab": "新标签",
  "applies_to": "适用于",
  "license": "许可证",
  "no_license": "暂无",
  "antifeatures": "可能不受欢迎的功能",
  "userjs_fullscreen": "自动全屏",
  "listing_none": "(无)",
  "export_config": "导出配置",
  "export_theme": "导出主题",
  "import_config": "导入配置",
  "import_theme": "导入主题",
  "code_size": "代码 尺寸",
  "prmpt_css": "作為使用者樣式安裝？",
  "userjs_inject": "注入用戶腳本+",
  "userjs_close": "關閉用戶腳本+",
  "userjs_sync": "Sync with UserScript Manager",
  "userjs_autoinject": "Inject on load",
  "auto_fetch": "Fetch on load"
 }
};
const main_css = `mujs-root {
  --mujs-even-row: hsl(222, 14%, 22%);
  --mujs-odd-row: hsl(222, 14%, 11%);
  --mujs-even-err: hsl(0, 100%, 22%);
  --mujs-odd-err: hsl(0, 100%, 11%);
  --mujs-background-color: hsl(222, 14%, 33%);
  --mujs-gf-color: hsl(204, 100%, 40%);
  --mujs-sf-color: hsl(12, 86%, 50%);
  --mujs-border-b-color: hsla(0, 0%, 0%, 0);
  --mujs-gf-btn-color: hsl(211, 87%, 56%);
  --mujs-sf-btn-color: hsl(12, 86%, 50%);
  --mujs-sf-txt-color: hsl(12, 79%, 55%);
  --mujs-txt-color: hsl(0, 0%, 100%);
  --mujs-chck-color: hsla(0, 0%, 100%, 0.568);
  --mujs-chck-gf: hsla(197, 100%, 50%, 0.568);
  --mujs-chck-git: hsla(213, 13%, 16%, 0.568);
  --mujs-chck-open: hsla(12, 86%, 50%, 0.568);
  --mujs-placeholder: hsl(81, 56%, 54%);
  --mujs-position-top: unset;
  --mujs-position-bottom: 1em;
  --mujs-position-left: unset;
  --mujs-position-right: 1em;
  --mujs-font-family: Arial, Helvetica, sans-serif;
  font-family: var(--mujs-font-family, Arial, Helvetica, sans-serif);
  text-rendering: optimizeLegibility;
  word-break: normal;
  font-size: 14px;
  color: var(--mujs-txt-color, hsl(0, 0%, 100%));
}

mujs-root * {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  scrollbar-color: var(--mujs-txt-color, hsl(0, 0%, 100%)) hsl(224, 14%, 21%);
  scrollbar-width: thin;
}
@supports not (scrollbar-width: thin) {
  mujs-root * ::-webkit-scrollbar {
    width: 1.4vw;
    height: 3.3vh;
  }
  mujs-root * ::-webkit-scrollbar-track {
    background-color: hsl(224, 14%, 21%);
    border-radius: 16px;
    margin-top: 3px;
    margin-bottom: 3px;
    box-shadow: inset 0 0 6px hsla(0, 0%, 0%, 0.3);
  }
  mujs-root * ::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: var(--mujs-txt-color, hsl(0, 0%, 100%));
    background-image: -webkit-linear-gradient(45deg, hsla(0, 0%, 100%, 0.2) 25%, transparent 25%, transparent 50%, hsla(0, 0%, 100%, 0.2) 50%, hsla(0, 0%, 100%, 0.2) 75%, transparent 75%, transparent);
  }
  mujs-root * ::-webkit-scrollbar-thumb:hover {
    background: var(--mujs-txt-color, hsl(0, 0%, 100%));
  }
}

mu-js {
  line-height: normal;
}

mujs-section > label,
.mujs-homepag e,
td.mujs-list,
.install {
  font-size: 16px;
}

.install,
.mujs-homepage {
  font-weight: 700;
}

mujs-section > label,
td.mujs-list {
  font-weight: 500;
}

.mujs-invalid {
  border-radius: 8px !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: hsl(0, 100%, 50%) !important;
}

mujs-tabs,
mujs-column,
mujs-row,
.mujs-sty-flex {
  display: flex;
}

mujs-column,
mujs-row {
  gap: 0.5em;
}

mujs-column count-frame[data-counter=greasyfork] {
  background: var(--mujs-gf-color, hsl(204, 100%, 40%));
}
mujs-column count-frame[data-counter=sleazyfork] {
  background: var(--mujs-sf-color, hsl(12, 86%, 50%));
}
mujs-column count-frame[data-counter=github] {
  background: hsl(213, 13%, 16%);
}
mujs-column count-frame[data-counter=openuserjs] {
  background: hsla(12, 86%, 50%, 0.568);
}
@media screen and (max-width: 800px) {
  mujs-column {
    flex-flow: row wrap;
  }
}

mujs-row {
  flex-flow: column wrap;
}

mu-js {
  cursor: default;
}

.hidden {
  display: none !important;
  z-index: -1 !important;
}

mujs-main {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  background: var(--mujs-background-color, hsl(222, 14%, 33%)) !important;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  border-radius: 16px;
}
@media screen and (max-height: 720px) {
  mujs-main:not(.webext-page) {
    height: 100% !important;
    bottom: 0rem !important;
    right: 0rem !important;
    margin: 0rem !important;
  }
}
mujs-main.expanded {
  height: 100% !important;
  bottom: 0rem !important;
}
mujs-main:not(.webext-page) {
  position: fixed;
  height: 492px;
}
mujs-main:not(.webext-page):not(.expanded) {
  margin-left: 1rem;
  margin-right: 1rem;
  right: 1rem;
  bottom: 1rem;
}
mujs-main:not(.hidden) {
  z-index: 100000000000000000 !important;
  display: flex !important;
  flex-direction: column !important;
}
mujs-main > * {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
}
mujs-main mujs-toolbar {
  order: 0;
  padding: 0.5em;
  display: flex;
  place-content: space-between;
}
mujs-main mujs-toolbar mujs-tabs {
  overflow: hidden;
  order: 0;
}
mujs-main mujs-toolbar mujs-column {
  flex-flow: row nowrap;
  order: 999999999999;
}
mujs-main mujs-toolbar > * {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
mujs-main mujs-tabs {
  gap: 0.5em;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-flow: row wrap;
}
mujs-main mujs-tabs mujs-tab {
  padding: 0.25em;
  min-width: 150px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  display: flex;
  place-content: space-between;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
}
@media screen and (max-width: 800px) {
  mujs-main mujs-tabs mujs-tab {
    min-width: 6em !important;
  }
}
mujs-main mujs-tabs mujs-tab.active {
  background: var(--mujs-even-row, hsl(222, 14%, 18%));
}
mujs-main mujs-tabs mujs-tab:not(.active):hover {
  background: var(--mujs-even-row, hsl(222, 14%, 18%));
}
mujs-main mujs-tabs mujs-tab mujs-host {
  float: left;
  overflow: auto;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}
mujs-main mujs-tabs mujs-tab mu-js {
  float: right;
}
mujs-main mujs-tabs mujs-addtab {
  order: 999999999999;
  font-size: 20px;
  padding: 0px 0.25em;
}
mujs-main mujs-tabs mujs-addtab:hover {
  background: var(--mujs-even-row, hsl(222, 14%, 18%));
}
mujs-main mujs-tab,
mujs-main mujs-btn,
mujs-main input {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
}
mujs-main input {
  background: hsla(0, 0%, 0%, 0);
  color: var(--mujs-txt-color, hsl(0, 0%, 100%));
}
mujs-main input:not([type=checkbox]) {
  border: transparent;
  outline: none !important;
}
mujs-main mujs-page,
mujs-main textarea {
  background: inherit;
  overflow-y: auto;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  border-radius: 5px;
  outline: none;
  font-family: monospace;
  font-size: 14px;
}
mujs-main mujs-page {
  padding: 0.5em;
  margin: 0.5em;
}
mujs-main textarea {
  overflow-y: auto;
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
  resize: vertical;
}
mujs-main textarea:focus {
  outline: none;
}
mujs-main th,
mujs-main .mujs-cfg *:not(input[type=password], input[type=text], input[type=number]) {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
mujs-main .mujs-footer {
  order: 3;
  overflow-x: hidden;
  text-align: center;
  border-radius: 16px;
}
mujs-main .mujs-footer > * {
  min-height: 50px;
}
mujs-main .mujs-footer .error:nth-child(even) {
  background: var(--mujs-even-err, hsl(0, 100%, 22%)) !important;
}
mujs-main .mujs-footer .error:nth-child(odd) {
  background: var(--mujs-odd-err, hsl(0, 100%, 11%)) !important;
}
mujs-main .mujs-prompt {
  align-items: center;
  justify-content: center;
}
mujs-main .mujs-prompt svg {
  width: 14px;
  height: 14px;
  background: transparent;
}
mujs-main .mujs-prompt > .prompt {
  position: absolute;
  background: var(--mujs-background-color, hsl(222, 14%, 33%)) !important;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  border-radius: 16px;
  text-align: center;
  padding: 0.5em;
  z-index: 1;
}
mujs-main .mujs-prompt > .prompt .prompt-head {
  font-size: 18px;
}
mujs-main .mujs-prompt > .prompt .prompt-body {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5em;
  padding-top: 0.5em;
}
mujs-main .mujs-prompt > .prompt mujs-btn[data-command=prompt-deny] {
  background: var(--mujs-sf-btn-color, hsl(12, 86%, 50%));
  border-color: var(--mujs-sf-btn-color, hsl(12, 86%, 50%));
}
mujs-main .mujs-prompt > .prompt mujs-btn[data-command=prompt-deny]:hover {
  background: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
  border-color: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
}
mujs-main .mujs-prompt > .prompt mujs-btn[data-command=prompt-confirm] {
  background: var(--mujs-gf-color, hsl(204, 100%, 40%));
  border-color: var(--mujs-gf-color, hsl(204, 100%, 40%));
}
mujs-main .mujs-prompt > .prompt mujs-btn[data-command=prompt-confirm]:hover {
  background: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
  border-color: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
}

.mainframe {
  background: transparent;
  position: fixed;
  bottom: var(--mujs-position-bottom, 1rem);
  right: var(--mujs-position-right, 1rem);
  top: var(--mujs-position-top, unset);
  left: var(--mujs-position-left, unset);
}
.mainframe count-frame {
  width: fit-content;
  width: -moz-fit-content;
  width: -webkit-fit-content;
  height: auto;
  padding: 14px 16px;
}
.mainframe.error {
  opacity: 1 !important;
}
.mainframe.error count-frame {
  background: var(--mujs-even-err, hsl(0, 100%, 22%)) !important;
}
.mainframe:not(.hidden) {
  z-index: 100000000000000000 !important;
  display: block;
}

count-frame {
  border-radius: 1000px;
  margin: 0px 3px;
  padding: 4px 6px;
  border: 2px solid var(--mujs-border-b-color, hsla(0, 0%, 0%, 0));
  font-size: 16px;
  font-weight: 400;
  display: inline-block;
  text-align: center;
  min-width: 1em;
  background: var(--mujs-background-color, hsl(222, 14%, 33%));
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

mujs-header {
  order: 1;
  display: flex;
  border-bottom: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 0.5em;
  font-size: 1em;
  place-content: space-between;
  height: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  gap: 1em;
}
mujs-header > *:not(mujs-url) {
  height: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
}
mujs-header mujs-url {
  order: 0;
  flex-grow: 1;
}
mujs-header mujs-url > input {
  width: 100%;
  height: 100%;
  background: var(--mujs-even-row, hsl(222, 14%, 18%));
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  border-radius: 4px;
}
mujs-header .rate-container {
  order: 1;
}
mujs-header .btn-frame {
  order: 999999999999;
}

mujs-body {
  order: 2;
  overflow-x: hidden;
  padding: 0px;
  height: 100%;
  border: 1px solid var(--mujs-border-b-color, hsla(0, 0%, 0%, 0));
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}
mujs-body .mujs-ratings {
  padding: 0 0.25em;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  border-radius: 1000px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
mujs-body mu-jsbtn {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
mujs-body table,
mujs-body th,
mujs-body td {
  border-collapse: collapse;
}
mujs-body table {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
}
@media screen and (max-width: 1180px) {
  mujs-body table thead > tr {
    display: table-column;
  }
  mujs-body table .frame:not(.webext-page) {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
  mujs-body table .frame:not(.webext-page) td {
    margin: auto;
  }
  mujs-body table .frame:not(.webext-page) td > mujs-a,
  mujs-body table .frame:not(.webext-page) td > mu-js,
  mujs-body table .frame:not(.webext-page) td > mujs-column {
    text-align: center;
    justify-content: center;
  }
  mujs-body table .frame:not(.webext-page) td > mujs-a {
    width: 100%;
  }
}
@media screen and (max-width: 1180px) and (max-width: 800px) {
  mujs-body table .frame:not(.webext-page) td > mujs-column {
    flex-flow: column wrap;
  }
  mujs-body table .frame:not(.webext-page) td > mujs-column > mujs-row {
    align-content: center;
  }
  mujs-body table .frame:not(.webext-page) td > mujs-column mujs-column {
    justify-content: center;
  }
}
@media screen and (max-width: 1180px) {
  mujs-body table .frame:not(.webext-page) td:not(.mujs-name, .install-btn) {
    width: 25%;
  }
}
@media screen and (max-width: 1180px) and (max-width: 800px) {
  mujs-body table .frame:not(.webext-page) td.install-btn {
    width: 100%;
  }
}
@media screen and (max-width: 1180px) {
  mujs-body table .frame:not(.webext-page) .mujs-name {
    width: 100%;
  }
}
@media screen and (max-width: 550px) {
  mujs-body table .frame:not(.webext-page) td {
    margin: 1rem !important;
  }
  mujs-body table .frame:not(.webext-page) td:not(.mujs-name, .install-btn) {
    width: auto !important;
  }
}
mujs-body table th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: hsla(222, 14%, 33%, 0.75);
  border-bottom: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
}
mujs-body table th.mujs-header-name {
  width: 50%;
}
@media screen and (max-width: 800px) {
  mujs-body table th.mujs-header-name {
    width: auto !important;
  }
}
mujs-body table .frame:nth-child(even) {
  background: var(--mujs-even-row, hsl(222, 14%, 18%)) !important;
}
mujs-body table .frame:nth-child(even) textarea {
  background: var(--mujs-odd-row, hsl(222, 14%, 33%)) !important;
}
mujs-body table .frame:nth-child(odd) {
  background: var(--mujs-odd-row, hsl(222, 14%, 33%)) !important;
}
mujs-body table .frame:nth-child(odd) textarea {
  background: var(--mujs-even-row, hsl(222, 14%, 18%)) !important;
}
mujs-body table .frame:not([data-engine=sleazyfork], [data-engine=greasyfork]) mujs-a {
  color: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
}
mujs-body table .frame:not([data-engine=sleazyfork], [data-engine=greasyfork]) mu-jsbtn {
  background: var(--mujs-sf-btn-color, hsl(12, 86%, 50%));
  border-color: var(--mujs-sf-btn-color, hsl(12, 86%, 50%));
}
mujs-body table .frame:not([data-engine=sleazyfork], [data-engine=greasyfork]) mu-jsbtn:hover {
  background: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
  border-color: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
}
mujs-body table .frame[data-engine=sleazyfork] mujs-a, mujs-body table .frame[data-engine=greasyfork] mujs-a {
  color: var(--mujs-gf-color, hsl(197, 100%, 50%));
}
mujs-body table .frame[data-engine=sleazyfork] mujs-a:hover, mujs-body table .frame[data-engine=greasyfork] mujs-a:hover {
  color: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
}
mujs-body table .frame[data-engine=sleazyfork] mu-jsbtn, mujs-body table .frame[data-engine=greasyfork] mu-jsbtn {
  background: var(--mujs-gf-color, hsl(204, 100%, 40%));
  border-color: var(--mujs-gf-color, hsl(204, 100%, 40%));
}
mujs-body table .frame[data-engine=sleazyfork] mu-jsbtn:hover, mujs-body table .frame[data-engine=greasyfork] mu-jsbtn:hover {
  background: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
  border-color: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
}
mujs-body table .frame[data-good] mujs-a, mujs-body table .frame[data-author] mujs-a {
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
mujs-body table .frame[data-good] mujs-a:hover, mujs-body table .frame[data-author] mujs-a:hover {
  color: hsl(81, 56%, 43%);
}
mujs-body table .frame[data-good] .mujs-list, mujs-body table .frame[data-author] .mujs-list {
  color: hsl(0, 0%, 100%);
}
mujs-body table .frame[data-good] mu-jsbtn, mujs-body table .frame[data-author] mu-jsbtn {
  color: hsl(215, 47%, 24%);
  background: var(--mujs-placeholder, hsl(81, 56%, 54%));
  border-color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
mujs-body table .frame[data-good] mu-jsbtn:hover, mujs-body table .frame[data-author] mu-jsbtn:hover {
  background: hsl(81, 56%, 65%);
  border-color: hsl(81, 56%, 65%);
}
mujs-body table .frame.translated:not([data-good], [data-author]) mujs-a {
  color: hsl(249, 56%, 65%);
}
mujs-body table .frame.translated:not([data-good], [data-author]) mujs-a:hover {
  color: hsl(249, 56%, 85%);
}
mujs-body table .frame.translated:not([data-good], [data-author]) mu-jsbtn {
  color: hsl(215, 47%, 85%);
  background: hsl(249, 56%, 65%);
  border-color: hsl(249, 56%, 65%);
}
mujs-body table .frame.translated:not([data-good], [data-author]) mu-jsbtn:hover {
  background: hsl(249, 56%, 65%);
  border-color: hsl(249, 56%, 65%);
}
mujs-body table .frame .mujs-ratings[data-el=good] {
  border-color: hsl(120, 50%, 40%);
  background-color: hsla(120, 50%, 40%, 0.102);
  color: hsl(120, 100%, 60%);
}
mujs-body table .frame .mujs-ratings[data-el=ok] {
  border-color: hsl(60, 100%, 30%);
  background-color: hsla(60, 100%, 30%, 0.102);
  color: hsl(60, 100%, 50%);
}
mujs-body table .frame .mujs-ratings[data-el=bad] {
  border-color: hsl(0, 100%, 30%);
  background-color: hsla(0, 50%, 40%, 0.102);
  color: hsl(0, 100%, 50%);
}
mujs-body table .frame svg {
  width: 12px;
  height: 12px;
  fill: currentColor;
  background: transparent;
}
mujs-body table .frame > td:not(.mujs-name) {
  text-align: center;
}
mujs-body table .frame > .mujs-name > mujs-a {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
mujs-body table .frame > .mujs-name mu-jsbtn,
mujs-body table .frame > .mujs-name mu-js {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
}
mujs-body table .frame > .mujs-name > mu-jsbtn {
  margin: auto;
}
mujs-body table .frame > .mujs-name > mujs-column > mu-jsbtn {
  padding: 0px 7px;
}
@media screen and (max-width: 800px) {
  mujs-body table .frame > .mujs-name > mujs-column > mu-jsbtn {
    width: 100%;
  }
}
mujs-body table .frame > .mujs-uframe > mujs-a {
  font-size: 16px;
  font-weight: 500;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
mujs-body table .frame [data-el=more-info] > mujs-row {
  gap: 0.25em;
}
mujs-body table .frame [data-el=matches] {
  gap: 0.25em;
  max-width: 40em;
}
mujs-body table .frame [data-el=matches] .mujs-grants {
  display: inline-flex;
  flex-flow: row wrap;
  overflow: auto;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-height: 5em;
  gap: 0.2em;
}
mujs-body table .frame [data-el=matches] .mujs-grants > mujs-a {
  display: inline;
}
mujs-body table .frame [data-el=matches] .mujs-grants > mujs-a:not([data-command]) {
  cursor: default !important;
  color: var(--mujs-txt-color, hsl(0, 0%, 100%));
}
mujs-body table .frame [data-el=matches] .mujs-grants > mujs-a::after {
  content: ", ";
  color: var(--mujs-txt-color, hsl(0, 0%, 100%));
}
mujs-body table .frame [data-el=matches] .mujs-grants > mujs-a:last-child::after {
  content: "";
}
@media screen and (max-width: 800px) {
  mujs-body table .frame [data-el=matches] {
    width: 30em !important;
  }
}
mujs-body table .frame [data-name=license] {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
@media screen and (max-width: 800px) {
  mujs-body table .frame [data-name=license] {
    width: 100% !important;
    width: -moz-available !important;
    width: -webkit-fill-available !important;
  }
}

@media screen and (max-width: 1150px) {
  .mujs-cfg {
    margin: 0px auto 1rem auto !important;
  }
}
.mujs-cfg {
  height: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
}
.mujs-cfg mujs-section {
  border-radius: 16px;
  padding: 0.5em;
}
.mujs-cfg mujs-section:nth-child(even) {
  background: var(--mujs-even-row, hsl(222, 14%, 18%)) !important;
}
.mujs-cfg mujs-section:nth-child(even) input,
.mujs-cfg mujs-section:nth-child(even) select {
  background: var(--mujs-odd-row, hsl(222, 14%, 33%));
}
.mujs-cfg mujs-section:nth-child(even) select option {
  background: var(--mujs-odd-row, hsl(222, 14%, 33%));
}
.mujs-cfg mujs-section:nth-child(even) select option:hover {
  background: var(--mujs-even-row, hsl(222, 14%, 18%)) !important;
}
.mujs-cfg mujs-section:nth-child(odd) {
  background: var(--mujs-odd-row, hsl(222, 14%, 33%)) !important;
}
.mujs-cfg mujs-section:nth-child(odd) input,
.mujs-cfg mujs-section:nth-child(odd) select {
  background: var(--mujs-even-row, hsl(222, 14%, 18%));
}
.mujs-cfg mujs-section:nth-child(odd) select option {
  background: var(--mujs-even-row, hsl(222, 14%, 18%));
}
.mujs-cfg mujs-section:nth-child(odd) select option:hover {
  background: var(--mujs-odd-row, hsl(222, 14%, 33%)) !important;
}
.mujs-cfg mujs-section[data-name=theme], .mujs-cfg mujs-section[data-name=exp], .mujs-cfg mujs-section[data-name=blacklist] {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.25em;
}
.mujs-cfg mujs-section[data-name=theme] > mujs-btn, .mujs-cfg mujs-section[data-name=exp] > mujs-btn, .mujs-cfg mujs-section[data-name=blacklist] > mujs-btn {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
}
.mujs-cfg mujs-section[data-name=theme] > mujs-btn:hover, .mujs-cfg mujs-section[data-name=exp] > mujs-btn:hover, .mujs-cfg mujs-section[data-name=blacklist] > mujs-btn:hover {
  background: var(--mujs-even-row, hsl(222, 14%, 18%)) !important;
}
.mujs-cfg mujs-section input[type=text]::-webkit-input-placeholder {
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
.mujs-cfg mujs-section input[type=text]::-moz-placeholder {
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
.mujs-cfg mujs-section input[type=text]:-ms-input-placeholder {
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
.mujs-cfg mujs-section input[type=text]::-ms-input-placeholder {
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
.mujs-cfg mujs-section input[type=text]::placeholder {
  color: var(--mujs-placeholder, hsl(81, 56%, 54%));
}
.mujs-cfg mujs-section > label:not([data-blacklist]) {
  display: flex;
  justify-content: space-between;
}
.mujs-cfg mujs-section > label[data-blacklist] {
  display: grid;
  grid-auto-flow: column;
}
.mujs-cfg mujs-section > label[data-blacklist]:not(.new-list) {
  grid-template-columns: repeat(2, 1fr);
}
.mujs-cfg mujs-section > label.new-list {
  order: 999999999999;
}
.mujs-cfg mujs-section > label.new-list mujs-add {
  font-size: 20px;
}
.mujs-cfg mujs-section > label input:not([type=checkbox]) {
  font-size: 14px;
  position: relative;
  border-radius: 4px;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
}
.mujs-cfg mujs-section select,
.mujs-cfg mujs-section select option {
  color: var(--mujs-txt-color, hsl(0, 0%, 100%));
  border: 1px solid transparent;
  list-style: none;
  outline-style: none;
  pointer-events: auto;
}
.mujs-cfg mujs-section select {
  text-align: center;
  border-radius: 4px;
}
.mujs-cfg mujs-section > *.sub-section {
  padding: 0.2em;
}
.mujs-cfg mujs-section > *.sub-section[data-engine] {
  flex-wrap: wrap;
}
.mujs-cfg mujs-section > *.sub-section[data-engine] input {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
}
.mujs-cfg mujs-section > *.sub-section input[type=text] {
  margin: 0.2em 0px;
}
.mujs-cfg .mujs-inlab {
  position: relative;
  width: 38px;
}
.mujs-cfg .mujs-inlab input[type=checkbox] {
  display: none;
}
.mujs-cfg .mujs-inlab input[type=checkbox]:checked + label {
  margin-left: 0;
  background: var(--mujs-chck-color, hsla(0, 0%, 100%, 0.568));
}
.mujs-cfg .mujs-inlab input[type=checkbox]:checked + label:before {
  right: 0px;
}
.mujs-cfg .mujs-inlab input[type=checkbox][data-name=greasyfork]:checked + label {
  background: var(--mujs-gf-color, hsl(204, 100%, 40%));
}
.mujs-cfg .mujs-inlab input[type=checkbox][data-name=sleazyfork]:checked + label {
  background: var(--mujs-sf-color, hsl(12, 86%, 50%));
}
.mujs-cfg .mujs-inlab input[type=checkbox][data-name=openuserjs]:checked + label {
  background: var(--mujs-chck-open, hsla(12, 86%, 50%, 0.568));
}
.mujs-cfg .mujs-inlab input[type=checkbox][data-name=github]:checked + label {
  background: var(--mujs-chck-git, hsla(213, 13%, 16%, 0.568));
}
.mujs-cfg .mujs-inlab label {
  padding: 0;
  display: block;
  overflow: hidden;
  height: 16px;
  border-radius: 20px;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
}
.mujs-cfg .mujs-inlab label:before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  margin: -2px;
  background: var(--mujs-txt-color, hsl(0, 0%, 100%));
  position: absolute;
  top: 0;
  right: 20px;
  border-radius: 20px;
}
.mujs-cfg .mujs-sty-flex mujs-btn {
  margin: auto;
}
.mujs-cfg .mujs-sty-flex mujs-btn[data-command=reset] {
  background: var(--mujs-sf-btn-color, hsl(12, 86%, 50%));
  border-color: var(--mujs-sf-btn-color, hsl(12, 86%, 50%));
}
.mujs-cfg .mujs-sty-flex mujs-btn[data-command=reset]:hover {
  background: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
  border-color: var(--mujs-sf-txt-color, hsl(12, 79%, 55%));
}
.mujs-cfg .mujs-sty-flex mujs-btn[data-command=save] {
  background: var(--mujs-gf-color, hsl(204, 100%, 40%));
  border-color: var(--mujs-gf-color, hsl(204, 100%, 40%));
}
.mujs-cfg .mujs-sty-flex mujs-btn[data-command=save]:hover {
  background: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
  border-color: var(--mujs-gf-btn-color, hsl(211, 87%, 56%));
}
.mujs-cfg:not(.webext-page) {
  margin: 1rem 25rem;
}
@media screen and (max-height: 720px) {
  .mujs-cfg:not(.webext-page) {
    height: 100%;
    height: -moz-available;
    height: -webkit-fill-available;
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    overflow-x: auto;
    padding: 0.5em;
  }
}

mujs-a {
  display: inline-block;
}

.mujs-name {
  display: flex;
  flex-flow: column wrap;
  gap: 0.5em;
}
.mujs-name span {
  font-size: 0.8em !important;
}

mujs-btn {
  font-style: normal;
  font-weight: 500;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  text-align: center;
  border: 1px solid var(--mujs-txt-color, hsl(0, 0%, 100%));
  font-size: 16px;
  border-radius: 4px;
  line-height: 1;
  padding: 6px 15px;
}
mujs-btn svg {
  width: 14px;
  height: 14px;
  fill: var(--mujs-txt-color, hsl(0, 0%, 100%));
}

mu-jsbtn {
  font-size: 14px;
  border-radius: 4px;
  font-style: normal;
  padding: 7px 15%;
  font-weight: 400;
  font-variant: normal;
  line-height: normal;
  display: block;
  text-align: center;
}

mujs-a,
mu-jsbtn,
.mujs-pointer,
.mujs-cfg mujs-section *:not(input[type=text], input[type=number], [data-theme], [data-blacklist]),
.mainbtn,
.mainframe,
mujs-btn {
  cursor: pointer !important;
}
`;
/******************************************************************************/
// #region Console
const dbg = (...msg) => {
  const dt = new Date();
  console.debug(
    '[%cMagic Userscript+%c] %cDBG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(255, 212, 0);',
    `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
    ...msg
  );
};
const err = (...msg) => {
  console.error(
    '[%cMagic Userscript+%c] %cERROR',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  const a = typeof alert !== 'undefined' && alert;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex && a) {
      a(`[Magic Userscript+] (${ex.cause}) ${ex.message}`);
    }
  }
};
const info = (...msg) => {
  console.info(
    '[%cMagic Userscript+%c] %cINF',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(0, 186, 124);',
    ...msg
  );
};
const log = (...msg) => {
  console.log(
    '[%cMagic Userscript+%c] %cLOG',
    'color: rgb(29, 155, 240);',
    '',
    'color: rgb(219, 160, 73);',
    ...msg
  );
};
// #endregion

/**
 * @type { import("../typings/types.d.ts").config }
 */
let cfg = {};

// #region Validators
/**
 * @type { import("../typings/types.d.ts").objToStr }
 */
const objToStr = (obj) => Object.prototype.toString.call(obj);
/**
 * @type { import("../typings/types.d.ts").isRegExp }
 */
const isRegExp = (obj) => {
  const s = objToStr(obj);
  return s.includes('RegExp');
};
/**
 * @type { import("../typings/types.d.ts").isElem }
 */
const isElem = (obj) => {
  const s = objToStr(obj);
  return s.includes('Element');
};
/**
 * @type { import("../typings/types.d.ts").isObj }
 */
const isObj = (obj) => {
  const s = objToStr(obj);
  return s.includes('Object');
};
/**
 * @type { import("../typings/types.d.ts").isFN }
 */
const isFN = (obj) => {
  const s = objToStr(obj);
  return s.includes('Function');
};
/**
 * @type { import("../typings/types.d.ts").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("../typings/types.d.ts").isBlank }
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
 * @type { import("../typings/types.d.ts").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
// #endregion

// #region Globals
/**
 * https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/global-this.js
 * @returns {typeof globalThis}
 */
function globalWin() {
  const check = function (it) {
    return it && it.Math === Math && it;
  };
  return (
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof this == 'object' && this) ||
    (function () {
      return this;
    })() ||
    Function('return this')()
  );
}
/** @type { import("../typings/UserJS.d.ts").safeSelf } */
function safeSelf() {
  if (userjs.safeSelf) {
    return userjs.safeSelf;
  }
  const g = globalWin();
  /** @type { import("../typings/UserJS.d.ts").safeHandles } */
  const safe = {
    XMLHttpRequest: g.XMLHttpRequest,
    CustomEvent: g.CustomEvent,
    createElement: g.document.createElement.bind(g.document),
    createElementNS: g.document.createElementNS.bind(g.document),
    createTextNode: g.document.createTextNode.bind(g.document),
    setTimeout: g.setTimeout,
    clearTimeout: g.clearTimeout,
    navigator: g.navigator,
    scheduler: {
      postTask(callback, options) {
        if ('scheduler' in g && 'postTask' in g.scheduler) {
          return g.scheduler.postTask(callback, options);
        }

        options = Object.assign({}, options);

        if (options.delay === undefined) options.delay = 0;
        options.delay = Number(options.delay);
        if (options.delay < 0) {
          return Promise.reject(new TypeError('"delay" must be a positive number.'));
        }
        return new Promise((resolve) => {
          g.setTimeout(() => {
            resolve(callback());
          }, options.delay);
        });
      },
      yield() {
        if ('scheduler' in g && 'yield' in g.scheduler) {
          scheduler.yield();
          return g.scheduler.yield();
        }
        return new Promise((resolve) => {
          g.setTimeout(resolve, 0);
        });
      }
    }
  };
  for (const [k, v] of Object.entries(safe)) {
    if (k === 'scheduler') {
      continue;
    } else if (k === 'navigator') {
      continue;
    } else if (isFN(v)) {
      continue;
    }
    err({ message: `Safe handles "${k}" returned "${v}"`, cause: 'safeSelf' });
  }
  userjs.safeSelf = safe;
  return userjs.safeSelf;
}
// #endregion

const BLANK_PAGE = 'about:blank';
// Lets highlight me :)
const authorID = 166061;
/**
 * Some UserJS I personally enjoy - `https://greasyfork.org/scripts/{{id}}`
 */
const goodUserJS = [
  33005,
  394820,
  438684,
  4870,
  394420,
  25068,
  483444,
  1682,
  22587,
  789,
  28497,
  386908,
  24204,
  404443,
  4336,
  368183,
  393396,
  473830,
  12179,
  423001,
  376510,
  23840,
  40525,
  6456,
  'https://openuserjs.org/install/Patabugen/Always_Remember_Me.user.js',
  'https://openuserjs.org/install/nokeya/Direct_links_out.user.js',
  'https://github.com/jijirae/y2monkey/raw/main/y2monkey.user.js',
  'https://github.com/jijirae/r2monkey/raw/main/r2monkey.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/Manga_OnlineViewer.user.js',
  'https://github.com/jesus2099/konami-command/raw/master/INSTALL-USER-SCRIPT.user.js',
  'https://github.com/TagoDR/MangaOnlineViewer/raw/master/dist/Manga_OnlineViewer_Adult.user.js'
];
/** Remove UserJS from banned accounts */
const badUserJS = [478597];
/** Unsupport host for search engines */
const engineUnsupported = {
  greasyfork: ['pornhub.com'],
  sleazyfork: ['pornhub.com'],
  openuserjs: [],
  github: []
};
const getUAData = () => {
  if (userjs.isMobile !== undefined) {
    return userjs.isMobile;
  }
  try {
    const { navigator } = safeSelf();
    if (navigator) {
      const { userAgent, userAgentData } = navigator;
      const { platform, mobile } = userAgentData ? Object(userAgentData) : {};
      userjs.isMobile =
        /Mobile|Tablet/.test(userAgent ? String(userAgent) : '') ||
        Boolean(mobile) ||
        /Android|Apple/.test(platform ? String(platform) : '');
    } else {
      userjs.isMobile = false;
    }
  } catch (ex) {
    userjs.isMobile = false;
    ex.cause = 'getUAData';
    err(ex);
  }
  return userjs.isMobile;
};
const isMobile = getUAData();
const isGM = typeof GM !== 'undefined';
const builtinList = {
  local: /localhost|router|gov|(\d+\.){3}\d+/,
  finance:
    /school|pay|bank|money|cart|checkout|authorize|bill|wallet|venmo|zalo|skrill|bluesnap|coin|crypto|currancy|insurance|finance/,
  social: /login|join|signin|signup|sign-up|password|reset|password_reset/,
  unsupported: {
    host: 'fakku.net',
    pathname: '/hentai/.+/read/page/.+'
  }
};
// #region DEFAULT_CONFIG
/**
 * @type { import("../typings/types.d.ts").config }
 */
const DEFAULT_CONFIG = {
  autofetch: true,
  autoinject: true,
  autoSort: 'daily_installs',
  clearTabCache: true,
  cache: true,
  autoexpand: false,
  filterlang: false,
  sleazyredirect: false,
  time: 10000,
  blacklist: ['userjs-local', 'userjs-finance', 'userjs-social', 'userjs-unsupported'],
  preview: {
    code: false,
    metadata: false
  },
  engines: [
    {
      enabled: true,
      name: 'greasyfork',
      query: encodeURIComponent('https://greasyfork.org/scripts/by-site/{host}.json?language=all')
    },
    {
      enabled: false,
      name: 'sleazyfork',
      query: encodeURIComponent('https://sleazyfork.org/scripts/by-site/{host}.json?language=all')
    },
    {
      enabled: false,
      name: 'openuserjs',
      query: encodeURIComponent('https://openuserjs.org/?q={host}')
    },
    {
      enabled: false,
      name: 'github',
      token: '',
      query: encodeURIComponent(
        'https://api.github.com/search/code?q="// ==UserScript=="+{host}+ "// ==/UserScript=="+in:file+language:js&per_page=30'
      )
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
    'position-right': '',
    'font-family': ''
  },
  recommend: {
    author: true,
    others: true
  },
  filters: {
    ASCII: {
      enabled: false,
      name: 'Non-ASCII',
      regExp: '[^\\x00-\\x7F\\s]+'
    },
    Latin: {
      enabled: false,
      name: 'Non-Latin',
      regExp: '[^\\u0000-\\u024F\\u2000-\\u214F\\s]+'
    },
    Games: {
      enabled: false,
      name: 'Games',
      flag: 'iu',
      regExp:
        'Aimbot|AntiGame|Agar|agar\\.io|alis\\.io|angel\\.io|ExtencionRipXChetoMalo|AposBot|DFxLite|ZTx-Lite|AposFeedingBot|AposLoader|Balz|Blah Blah|Orc Clan Script|Astro\\s*Empires|^\\s*Attack|^\\s*Battle|BiteFight|Blood\\s*Wars|Bloble|Bonk|Bots|Bots4|Brawler|\\bBvS\\b|Business\\s*Tycoon|Castle\\s*Age|City\\s*Ville|chopcoin\\.io|Comunio|Conquer\\s*Club|CosmoPulse|cursors\\.io|Dark\\s*Orbit|Dead\\s*Frontier|Diep\\.io|\\bDOA\\b|doblons\\.io|DotD|Dossergame|Dragons\\s*of\\s*Atlantis|driftin\\.io|Dugout|\\bDS[a-z]+\\n|elites\\.io|Empire\\s*Board|eRep(ublik)?|Epicmafia|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\\s*Ville|Ghost\\s*Trapper|Gladiatus|Goalline|Gondal|gota\\.io|Grepolis|Hobopolis|\\bhwm(\\b|_)|Ikariam|\\bIT2\\b|Jellyneo|Kapi\\s*Hospital|Kings\\s*Age|Kingdoms?\\s*of|knastv(o|oe)gel|Knight\\s*Fight|\\b(Power)?KoC(Atta?ck)?\\b|\\bKOL\\b|Kongregate|Krunker|Last\\s*Emperor|Legends?\\s*of|Light\\s*Rising|lite\\.ext\\.io|Lockerz|\\bLoU\\b|Mafia\\s*(Wars|Mofo)|Menelgame|Mob\\s*Wars|Mouse\\s*Hunt|Molehill\\s*Empire|MooMoo|MyFreeFarm|narwhale\\.io|Neopets|NeoQuest|Nemexia|\\bOGame\\b|Ogar(io)?|Pardus|Pennergame|Pigskin\\s*Empire|PlayerScripts|pokeradar\\.io|Popmundo|Po?we?r\\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|Skribbl|slither\\.io|slitherplus\\.io|slitheriogameplay|SpaceWars|splix\\.io|Survivio|\\bSW_[a-z]+\\n|\\bSnP\\b|The\\s*Crims|The\\s*West|torto\\.io|Travian|Treasure\\s*Isl(and|e)|Tribal\\s*Wars|TW.?PRO|Vampire\\s*Wars|vertix\\.io|War\\s*of\\s*Ninja|World\\s*of\\s*Tanks|West\\s*Wars|wings\\.io|\\bWoD\\b|World\\s*of\\s*Dungeons|wtf\\s*battles|Wurzelimperium|Yohoho|Zombs'
    },
    SocialNetworks: {
      enabled: false,
      name: 'Social Networks',
      flag: 'iu',
      regExp:
        'Face\\s*book|Google(\\+| Plus)|\\bHabbo|Kaskus|\\bLepra|Leprosorium|MySpace|meinVZ|odnoklassniki|Одноклассники|Orkut|sch(ue|ü)ler(VZ|\\.cc)?|studiVZ|Unfriend|Valenth|VK|vkontakte|ВКонтакте|Qzone|Twitter|TweetDeck'
    },
    Clutter: {
      enabled: false,
      name: 'Clutter',
      flag: 'iu',
      regExp:
        "^\\s*(.{1,3})\\1+\\n|^\\s*(.+?)\\n+\\2\\n*$|^\\s*.{1,5}\\n|do\\s*n('|o)?t (install|download)|nicht installieren|(just )?(\\ban? |\\b)test(ing|s|\\d|\\b)|^\\s*.{0,4}test.{0,4}\\n|\\ntest(ing)?\\s*|^\\s*(\\{@|Smolka|Hacks)|\\[\\d{4,5}\\]|free\\s*download|theme|(night|dark) ?(mode)?"
    }
  }
};
// #endregion
// #region i18n
class i18nHandler {
  constructor() {
    if (userjs.pool !== undefined) {
      return this;
    }
    userjs.pool = new Map();
    for (const [k, v] of Object.entries(translations)) {
      if (!userjs.pool.has(k)) userjs.pool.set(k, v);
    }
  }
  /**
   * @param {string | Date | number} str
   */
  toDate(str = '') {
    const { navigator } = safeSelf();
    return new Intl.DateTimeFormat(navigator.language).format(
      typeof str === 'string' ? new Date(str) : str
    );
  }
  /**
   * @param {number | bigint} number
   */
  toNumber(number) {
    const { navigator } = safeSelf();
    return new Intl.NumberFormat(navigator.language).format(number);
  }
  /**
   * @type { import("../typings/UserJS.d.ts").i18n$ }
   */
  i18n$(key) {
    const { navigator } = safeSelf();
    const current = navigator.language.split('-')[0] ?? 'en';
    return userjs.pool.get(current)?.[key] ?? 'Invalid Key';
  }
}
const language = new i18nHandler();
const { i18n$ } = language;
// #endregion
// #region Utilities
const union = (...arr) => [...new Set(arr.flat())];
/**
 * @type { import("../typings/types.d.ts").qs }
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
 * @type { import("../typings/types.d.ts").qsA }
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
 * @type { import("../typings/types.d.ts").normalizeTarget }
 */
const normalizeTarget = (target, toQuery = true, root) => {
  if (Object.is(target, null) || Object.is(target, undefined)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from((root || document).querySelectorAll(target)) : [target];
  }
  if (isElem(target)) {
    return [target];
  }
  return Array.from(target);
};
/**
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options = {}) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (!elem) {
        continue;
      }
      if (isMobile && type === 'click') {
        elem.addEventListener('touchstart', listener, options);
        continue;
      }
      elem.addEventListener(type, listener, options);
    }
  } catch (ex) {
    ex.cause = 'ael';
    err(ex);
  }
};
/**
 * @type { import("../typings/types.d.ts").formAttrs }
 */
const formAttrs = (elem, attr = {}) => {
  if (!elem) {
    return elem;
  }
  for (const key in attr) {
    if (typeof attr[key] === 'object') {
      formAttrs(elem[key], attr[key]);
    } else if (isFN(attr[key])) {
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
  return elem;
};
/**
 * @type { import("../typings/types.d.ts").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    const { createElement } = safeSelf();
    el = createElement(tagName);
    if (!isEmpty(cname)) {
      if (typeof cname === 'string') {
        el.className = cname;
      } else if (isObj(cname)) {
        formAttrs(el, cname);
      }
    }
    if (!isEmpty(attrs)) {
      if (typeof attrs === 'string') {
        el.textContent = attrs;
      } else if (isObj(attrs)) {
        formAttrs(el, attrs);
      }
    }
  } catch (ex) {
    ex.cause = 'make';
    err(ex);
  }
  return el;
};

/**
 * @type { import("../typings/UserJS.d.ts").getGMInfo }
 */
const getGMInfo = () => {
  if (isGM) {
    if (isObj(GM.info)) {
      return GM.info;
    } else if (isObj(GM_info)) {
      return GM_info;
    }
  }
  return {
    script: {
      icon: '',
      name: 'Magic Userscript+',
      namespace: 'https://github.com/magicoflolis/Userscript-Plus',
      updateURL: 'https://github.com/magicoflolis/Userscript-Plus/raw/master/dist/magic-userjs.js',
      version: 'Bookmarklet',
      bugs: 'https://github.com/magicoflolis/Userscript-Plus/issues'
    }
  };
};
const $info = getGMInfo();
// #endregion
/**
 * @type { import("../typings/types.d.ts").dom }
 */
const dom = {
  attr(target, attr, value = undefined) {
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
  },
  prop(target, prop, value = undefined) {
    for (const elem of normalizeTarget(target)) {
      if (value === undefined) {
        return elem[prop];
      }
      elem[prop] = value;
    }
  },
  text(target, text) {
    const targets = normalizeTarget(target);
    if (text === undefined) {
      return targets.length !== 0 ? targets[0].textContent : undefined;
    }
    for (const elem of targets) {
      elem.textContent = text;
    }
  },
  cl: {
    add(target, token) {
      token = Array.isArray(token) ? token : [token];
      return normalizeTarget(target).some((elem) => elem.classList.add(...token));
    },
    remove(target, token) {
      token = Array.isArray(token) ? token : [token];
      return normalizeTarget(target).some((elem) => elem.classList.remove(...token));
    },
    toggle(target, token, force) {
      let r;
      for (const elem of normalizeTarget(target)) {
        r = elem.classList.toggle(token, force);
      }
      return r;
    },
    has(target, token) {
      return normalizeTarget(target).some((elem) => elem.classList.contains(token));
    }
  }
};
class Memorize {
  constructor() {
    /**
     * @type {Map<string, Map<string, any>>}
     */
    this.store = new Map();
    /**
     * @type { { [key: string]: Map<string, any>; userjs: Map<number, import("../typings/types.d.ts").GSForkQuery> } }
     */
    this.maps = {};
    this.create('cfg', 'container', 'userjs');
  }
  /**
   * @template { string } S
   * @param { ...S } maps
   * @returns { S | S[] }
   */
  create(...maps) {
    const resp = [];
    for (const key of maps) {
      if (this.store.has(key)) {
        return this.store.get(key);
      }
      const m = new Map();
      this.store.set(key, m);
      this.maps[key] = m;
      resp.push(this.store.get(key));
    }
    return resp.length >= 2 ? resp : resp[0];
  }
}
const memory = new Memorize();
//#region Icon SVGs
const iconSVG = {
  close: {
    viewBox: '0 0 384 512',
    html: '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>'
  },
  code: {
    viewBox: '0 0 640 512',
    html: '<path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>'
  },
  collapse: {
    viewBox: '0 0 448 512',
    html: '<path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/>'
  },
  download: {
    viewBox: '0 0 384 512',
    html: '<path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>'
  },
  expand: {
    viewBox: '0 0 448 512',
    html: '<path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"/>'
  },
  gear: {
    viewBox: '0 0 512 512',
    html: '<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>'
  },
  github: {
    viewBox: '0 0 496 512',
    html: '<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>'
  },
  globe: {
    viewBox: '0 0 512 512',
    html: '<path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"/>'
  },
  install: {
    viewBox: '0 0 512 512',
    html: '<path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>'
  },
  issue: {
    viewBox: '0 0 512 512',
    html: '<path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/>'
  },
  minus: {
    viewBox: '0 0 448 512',
    html: '<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>'
  },
  nav: {
    viewBox: '0 0 448 512',
    html: '<path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>'
  },
  pager: {
    viewBox: '0 0 512 512',
    html: '<path d="M0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zm64 32l0 64c0 17.7 14.3 32 32 32l320 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L96 128c-17.7 0-32 14.3-32 32zM80 320c-13.3 0-24 10.7-24 24s10.7 24 24 24l56 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-56 0zm136 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0z"/>'
  },
  verified: {
    viewBox: '0 0 56 56',
    fill: 'currentColor',
    stroke: 'currentColor',
    html: '<g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><g><path d="M 23.6641 52.3985 C 26.6407 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6407 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6407 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6407 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z M 26.2891 49.7734 L 21.8828 45.3438 C 21.3672 44.8047 20.8282 44.5938 20.1016 44.5938 L 13.7969 44.5938 C 11.7110 44.5938 11.3828 44.2656 11.3828 42.1797 L 11.3828 35.875 C 11.3828 35.1719 11.1719 34.6329 10.6563 34.1172 L 6.2266 29.7109 C 4.7501 28.2109 4.7501 27.7891 6.2266 26.2891 L 10.6563 21.8829 C 11.1719 21.3672 11.3828 20.8282 11.3828 20.1016 L 11.3828 13.7969 C 11.3828 11.6875 11.6876 11.3829 13.7969 11.3829 L 20.1016 11.3829 C 20.8282 11.3829 21.3672 11.1953 21.8828 10.6563 L 26.2891 6.2266 C 27.7891 4.7500 28.2110 4.7500 29.7110 6.2266 L 34.1172 10.6563 C 34.6328 11.1953 35.1719 11.3829 35.8750 11.3829 L 42.1797 11.3829 C 44.2657 11.3829 44.5938 11.7109 44.5938 13.7969 L 44.5938 20.1016 C 44.5938 20.8282 44.8282 21.3672 45.3439 21.8829 L 49.7733 26.2891 C 51.2498 27.7891 51.2498 28.2109 49.7733 29.7109 L 45.3439 34.1172 C 44.8282 34.6329 44.5938 35.1719 44.5938 35.875 L 44.5938 42.1797 C 44.5938 44.2656 44.2657 44.5938 42.1797 44.5938 L 35.8750 44.5938 C 35.1719 44.5938 34.6328 44.8047 34.1172 45.3438 L 29.7110 49.7734 C 28.2110 51.2500 27.7891 51.2500 26.2891 49.7734 Z M 24.3438 39.2266 C 25.0235 39.2266 25.5391 38.9453 25.8907 38.5234 L 38.8985 20.3360 C 39.1563 19.9609 39.2969 19.5391 39.2969 19.1407 C 39.2969 18.1094 38.5001 17.2891 37.4219 17.2891 C 36.6485 17.2891 36.2266 17.5469 35.7579 18.2266 L 24.2735 34.3985 L 18.3438 27.8594 C 17.9454 27.4141 17.5001 27.2266 16.9141 27.2266 C 15.7657 27.2266 14.9454 28.0000 14.9454 29.0782 C 14.9454 29.5469 15.1094 29.9922 15.4376 30.3203 L 22.8907 38.6172 C 23.2423 38.9922 23.6876 39.2266 24.3438 39.2266 Z"/></g>'
  },
  refresh: {
    viewBox: '0 0 512 512',
    fill: 'currentColor',
    html: '<path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/>'
  },
  load(type, container) {
    const { createElementNS } = safeSelf();
    const svgElem = createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [k, v] of Object.entries(iconSVG[type])) {
      if (k === 'html') {
        continue;
      }
      svgElem.setAttributeNS(null, k, v);
    }
    try {
      if (typeof iconSVG[type].html === 'string') {
        svgElem.innerHTML = iconSVG[type].html;
        dom.attr(svgElem, 'id', `mujs_${type ?? 'Unknown'}`);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ex) {
      /* empty */
    }
    if (container) {
      container.appendChild(svgElem);
      return svgElem;
    }
    return svgElem.outerHTML;
  }
};
//#endregion
/**
 * @type { import("../typings/UserJS.d.ts").StorageSystem }
 */
const StorageSystem = {
  prefix: 'MUJS',
  events: new Set(),
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
  addListener(name, callback) {
    if (isGM) {
      let GMType;
      if (isFN(GM.addValueChangeListener)) {
        GMType = GM.addValueChangeListener(name, callback);
      } else if (isFN(GM_addValueChangeListener)) {
        GMType = GM_addValueChangeListener(name, callback);
      }
      if (GMType) {
        return this.events.add(GMType) && GMType;
      }
    }
    return (
      this.events.add(callback) &&
      window.addEventListener('storage', (evt) => {
        const { key, oldValue, newValue } = evt;
        if (key === name) callback(key, oldValue, newValue, false);
      })
    );
  },
  attach() {
    window.addEventListener('beforeunload', () => {
      for (const e of this.events) {
        if (isGM && typeof e === 'number' && !Number.isNaN(e)) {
          if (isFN(GM.removeValueChangeListener)) {
            GM.removeValueChangeListener(e);
          } else if (isFN(GM_addValueChangeListener)) {
            GM_removeValueChangeListener(e);
          }
        } else {
          window.removeEventListener('storage', e);
        }
        this.events.delete(e);
      }
    });
  },
  async setValue(key, v) {
    if (!v) {
      return;
    }
    v = typeof v === 'string' ? v : JSON.stringify(v);
    if (isGM) {
      if (isFN(GM.setValue)) {
        await GM.setValue(key, v);
      } else if (isFN(GM_setValue)) {
        GM_setValue(key, v);
      }
    } else {
      this.setItem(`${this.prefix}-${key}`, v);
    }
  },
  async getValue(key, def = {}) {
    try {
      if (isGM) {
        let GMType;
        if (isFN(GM.getValue)) {
          GMType = await GM.getValue(key, JSON.stringify(def));
        } else if (isFN(GM_getValue)) {
          GMType = GM_getValue(key, JSON.stringify(def));
        }
        if (!isNull(GMType)) {
          return JSON.parse(GMType);
        }
      }
      return this.has(`${this.prefix}-${key}`)
        ? JSON.parse(this.getItem(`${this.prefix}-${key}`))
        : def;
    } catch (ex) {
      err(ex);
      return def;
    }
  }
};
const Command = {
  cmds: new Set(),
  register(text, command) {
    if (!isGM) {
      return;
    }

    if (isFN(command)) {
      if (this.cmds.has(command)) {
        return;
      }
      this.cmds.add(command);
    }

    if (isFN(GM.registerMenuCommand)) {
      GM.registerMenuCommand(text, command);
    } else if (isFN(GM_registerMenuCommand)) {
      GM_registerMenuCommand(text, command);
    }
  }
};
/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data, useFetch = false) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
    data = Object.assign({}, data);
    method = this.bscStr(method, false);
    responseType = this.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    if (isGM && !useFetch) {
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
    return new Promise((resolve, reject) => {
      if (isGM && !useFetch) {
        Network.xmlRequest({
          url,
          responseType,
          ...params,
          onerror: (r_1) => {
            reject(new Error(`${r_1.status} ${url}`));
          },
          onload: (r_1) => {
            if (r_1.status !== 200) reject(new Error(`${r_1.status} ${url}`));
            if (responseType.match(/basic/)) resolve(r_1);
            resolve(r_1.response);
          }
        });
      } else {
        fetch(url, params)
          .then((response_1) => {
            if (!response_1.ok) reject(response_1);
            const check = (str_2 = 'text') => {
              return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
            };
            if (responseType.match(/buffer/)) {
              resolve(check('arrayBuffer'));
            } else if (responseType.match(/json/)) {
              resolve(check('json'));
            } else if (responseType.match(/text/)) {
              resolve(check('text'));
            } else if (responseType.match(/blob/)) {
              resolve(check('blob'));
            } else if (responseType.match(/formdata/)) {
              resolve(check('formData'));
            } else if (responseType.match(/clone/)) {
              resolve(check('clone'));
            } else if (responseType.match(/document/)) {
              const respTxt = check('text');
              const domParser = new DOMParser();
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
          })
          .catch(reject);
      }
    });
  },
  format(bytes, decimals = 2) {
    if (Number.isNaN(bytes)) return `0 ${this.sizes[0]}`;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${this.sizes[i]}`;
  },
  sizes: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  async xmlRequest(details) {
    if (isGM) {
      if (isFN(GM.xmlHttpRequest)) {
        return GM.xmlHttpRequest(details);
      } else if (isFN(GM_xmlhttpRequest)) {
        return GM_xmlhttpRequest(details);
      }
    }
    return await new Promise((resolve, reject) => {
      const { XMLHttpRequest } = safeSelf();
      const req = new XMLHttpRequest();
      let method = 'GET';
      let url = BLANK_PAGE;
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
          if (value === 'buffer') {
            req.responseType = 'arraybuffer';
          } else {
            req.responseType = value;
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
  },
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  }
};
const Counter = {
  cnt: {
    total: {
      count: 0
    }
  },
  set(engine) {
    if (!this.cnt[engine.name]) {
      const counter = make('count-frame', engine.enabled ? '' : 'hidden', {
        dataset: {
          counter: engine.name
        },
        title: engine.query ? decodeURIComponent(engine.query) : engine.url,
        textContent: '0'
      });
      this.cnt[engine.name] = {
        root: counter,
        count: 0
      };
      return counter;
    }
    return this.cnt[engine.name].root;
  },
  update(count, engine) {
    this.cnt[engine.name].count += count;
    this.cnt.total.count += count;
    this.updateAll();
  },
  updateAll() {
    for (const v of Object.values(this.cnt)) dom.text(v.root, v.count);
  },
  reset() {
    for (const [k, v] of Object.entries(this.cnt)) {
      dom.text(v.root, 0);
      v.count = 0;
      const engine = cfg.engines.find((engine) => k === engine.name);
      if (engine) {
        dom.cl[engine.enabled ? 'remove' : 'add'](v.root, 'hidden');
      }
    }
  }
};

// #region Container
/**
 * @type { import("../typings/UserJS.d.ts").Container }
 */
class Container {
  webpage;
  host;
  domain;
  ready;
  injected;
  shadowRoot;
  supported;
  frame;
  cache;
  userjsCache;
  root;
  unsaved;
  isBlacklisted;
  rebuild;
  opacityMin;
  opacityMax;
  constructor(url) {
    this.remove = this.remove.bind(this);
    this.refresh = this.refresh.bind(this);
    this.showError = this.showError.bind(this);
    this.toArr = this.toArr.bind(this);
    this.toElem = this.toElem.bind(this);

    this.webpage = this.strToURL(url);
    this.host = this.getHost(this.webpage.host);
    this.domain = this.getDomain(this.webpage.host);
    this.ready = false;
    this.injected = false;
    this.shadowRoot = undefined;
    this.supported = isFN(make('main-userjs').attachShadow);
    this.frame = this.supported
      ? make('main-userjs', {
          dataset: {
            insertedBy: $info.script.name,
            role: 'primary-container'
          }
        })
      : make('iframe', 'mujs-iframe', {
          dataset: {
            insertedBy: $info.script.name,
            role: 'primary-iframe'
          },
          loading: 'lazy',
          src: BLANK_PAGE,
          style:
            'position: fixed;bottom: 1rem;right: 1rem;height: 525px;width: 90%;margin: 0px 1rem;z-index: 100000000000000020 !important;',
          onload: (iFrame) => {
            /**
             * @type { HTMLIFrameElement }
             */
            const target = iFrame.target;
            if (!target.contentDocument) {
              return;
            }
            this.shadowRoot = target.contentDocument.documentElement;
            this.ready = true;
            dom.cl.add([this.shadowRoot, target.contentDocument.body], 'mujs-iframe');
          }
        });
    if (this.supported) {
      this.shadowRoot = this.frame.attachShadow({ mode: 'closed' });
      this.ready = true;
    }
    this.cache = memory.maps.container;
    this.userjsCache = memory.maps.userjs;
    this.root = make('mujs-root');
    this.unsaved = false;
    this.isBlacklisted = false;
    this.rebuild = false;
    this.opacityMin = '0.15';
    this.opacityMax = '1';
    this.elementsReady = this.init();

    const Timeout = class {
      constructor() {
        this.ids = [];
      }

      set(delay, reason) {
        const { setTimeout } = safeSelf();
        return new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            Object.is(reason, null) || Object.is(reason, undefined) ? resolve() : reject(reason);
            this.clear(id);
          }, delay);
          this.ids.push(id);
        });
      }

      clear(...ids) {
        const { clearTimeout } = safeSelf();
        this.ids = this.ids.filter((id) => {
          if (ids.includes(id)) {
            clearTimeout(id);
            return false;
          }
          return true;
        });
      }
    };
    this.timeouts = {
      frame: new Timeout(),
      mouse: new Timeout()
    };

    this.injFN = () => {};

    window.addEventListener('beforeunload', this.remove);
  }
  /**
   * @param { function(): * } callback
   * @param { Document } doc
   */
  async inject(callback, doc) {
    if (this.checkBlacklist(this.host)) {
      err(`Blacklisted "${this.host}"`);
      this.remove();
      return;
    }
    if (!this.shadowRoot) {
      return;
    }
    if (doc === null) {
      return;
    }

    while (this.ready === false) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    try {
      doc.documentElement.appendChild(this.frame);
      if (this.injected) {
        if (isFN(this.injFN.build)) {
          this.injFN.build();
        }
        return;
      }
      this.shadowRoot.append(this.root);
      if (isNull(this.loadCSS(main_css, 'primary-stylesheet'))) {
        throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
      }
      this.injected = true;
      this.initFn();
      if (this.elementsReady && isFN(callback)) {
        this.injFN = callback.call(this, this.shadowRoot);
      }
    } catch (ex) {
      err(ex);
      this.remove();
    }
  }
  initFn() {
    this.renderTheme(cfg.theme);

    Counter.cnt.total.root = this.mainbtn;
    for (const engine of cfg.engines) this.countframe.append(Counter.set(engine));
    const { cfgpage, table, supported, frame, refresh, cache, urlBar, host } = this;

    class Tabs {
      /**
       * @param { HTMLElement } root
       */
      constructor(root) {
        /**
         * @type { Set<HTMLElement> }
         */
        this.pool = new Set();
        this.blank = BLANK_PAGE;
        this.protocal = 'mujs:';
        this.protoReg = new RegExp(`${this.protocal}(.+)`, 'i');
        this.el = {
          add: make('mujs-addtab', {
            textContent: '+',
            dataset: {
              command: 'new-tab'
            }
          }),
          head: make('mujs-tabs'),
          root
        };
        this.el.head.append(this.el.add);
        this.el.root.append(this.el.head);
        this.custom = () => {};
      }
      /**
       * @param {string} hostname
       */
      getTab(hostname) {
        return [...this.pool].find(({ dataset }) => hostname === dataset.host);
      }
      getActive() {
        return [...this.pool].find((tab) => tab.classList.contains('active'));
      }
      /**
       * @param {string} hostname
       */
      intFN(hostname) {
        if (!hostname.startsWith(this.protocal)) {
          return;
        }
        if (hostname.match(this.protoReg)[1] === 'settings') {
          dom.cl.remove(cfgpage, 'hidden');
          dom.cl.add(table, 'hidden');
          if (!supported) {
            dom.attr(frame, 'style', 'height: 100%;');
          }
        }
      }
      /**
       * @param {HTMLElement} tab
       * @param {boolean} [build]
       */
      active(tab, build = true) {
        if (!this.pool.has(tab)) this.pool.add(tab);
        dom.cl.add(cfgpage, 'hidden');
        dom.cl.remove(table, 'hidden');
        dom.cl.remove([...this.pool], 'active');
        dom.cl.add(tab, 'active');
        if (!build) {
          return;
        }
        const host = tab.dataset.host ?? this.blank;
        if (host === this.blank) {
          refresh();
        } else if (host.startsWith(this.protocal)) {
          this.intFN(host);
        } else {
          this.custom(host);
        }
      }
      /** @param { HTMLElement } tab */
      close(tab) {
        if (this.pool.has(tab)) this.pool.delete(tab);
        const host = tab.dataset.host;
        if (cfg.clearTabCache && cache.has(host)) cache.delete(host);
        if (tab.classList.contains('active')) refresh();
        const sibling = tab.nextElementSibling ?? tab.previousElementSibling;
        if (sibling) {
          if (sibling.dataset.command !== 'new-tab') {
            this.active(sibling);
          }
        }
        tab.remove();
      }
      /**
       * @param {string} [hostname]
       */
      create(hostname = undefined) {
        if (typeof hostname === 'string') {
          const createdTab = this.getTab(hostname);
          if (this.protoReg.test(hostname) && createdTab) {
            this.active(createdTab);
            return;
          }
        }
        const tab = make('mujs-tab', {
          dataset: {
            command: 'switch-tab'
          },
          style: `order: ${this.el.head.childElementCount};`
        });
        const tabClose = make('mu-js', {
          dataset: {
            command: 'close-tab'
          },
          title: i18n$('close'),
          textContent: 'X'
        });
        const tabHost = make('mujs-host');
        tab.append(tabHost, tabClose);
        this.el.head.append(tab);
        this.active(tab, false);
        if (isNull(hostname)) {
          refresh();
          urlBar.placeholder = i18n$('newTab');
          tab.dataset.host = this.blank;
          tabHost.title = i18n$('newTab');
          tabHost.textContent = i18n$('newTab');
        } else if (hostname.startsWith(this.protocal)) {
          const type = hostname.match(this.protoReg)[1];
          tab.dataset.host = hostname || host;
          tabHost.title = type || tab.dataset.host;
          tabHost.textContent = tabHost.title;
          this.intFN(hostname);
        } else {
          tab.dataset.host = hostname || host;
          tabHost.title = hostname || host;
          tabHost.textContent = tabHost.title;
        }
        return tab;
      }
    }
    this.tab = new Tabs(this.toolbar);
    this.tab.create(host);

    const tabbody = this.tabbody;
    const getCellValue = (tr, idx) => tr.children[idx].dataset.value;
    const comparer = (idx, asc) => (a, b) =>
      ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
          ? v1 - v2
          : v1.toString().localeCompare(v2))(
        getCellValue(asc ? a : b, idx),
        getCellValue(asc ? b : a, idx)
      );
    for (const th of this.tabhead.rows[0].cells) {
      if (dom.text(th) === i18n$('install')) continue;
      dom.cl.add(th, 'mujs-pointer');
      ael(th, 'click', () => {
        /** [Stack Overflow Reference](https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/53880407#53880407) */
        Array.from(tabbody.querySelectorAll('tr'))
          .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
          .forEach((tr) => tabbody.appendChild(tr));
      });
    }
  }
  init() {
    try {
      // #region Elements
      this.mainframe = make('mu-js', 'mainframe', {
        style: `opacity: ${this.opacityMin};`
      });
      this.countframe = make('mujs-column');
      this.mainbtn = make('count-frame', 'mainbtn', {
        textContent: '0'
      });
      this.urlBar = make('input', 'mujs-url-bar', {
        autocomplete: 'off',
        spellcheck: false,
        type: 'text',
        placeholder: i18n$('search_placeholder')
      });
      this.rateContainer = make('mujs-column', 'rate-container');
      this.footer = make('mujs-row', 'mujs-footer');
      this.tabbody = make('tbody');
      this.promptElem = make('mujs-row', 'mujs-prompt');
      this.toolbar = make('mujs-toolbar');
      this.table = make('table');
      this.tabhead = make('thead');
      this.header = make('mujs-header');
      this.tbody = make('mujs-body');
      this.cfgpage = make('mujs-row', 'mujs-cfg hidden');
      this.btnframe = make('mujs-column', 'btn-frame');
      this.fsearch = make('mujs-btn', 'hidden');
      this.btnHandles = make('mujs-column', 'btn-handles');
      this.btnHide = make('mujs-btn', 'hide-list', {
        title: i18n$('min'),
        innerHTML: iconSVG.load('minus'),
        dataset: {
          command: 'hide-list'
        }
      });
      this.btnfullscreen = make('mujs-btn', 'fullscreen', {
        title: i18n$('max'),
        innerHTML: iconSVG.load('expand'),
        dataset: {
          command: 'fullscreen'
        }
      });
      this.main = make('mujs-main', 'hidden');
      this.urlContainer = make('mujs-url');
      this.closebtn = make('mujs-btn', 'close', {
        title: i18n$('close'),
        innerHTML: iconSVG.load('close'),
        dataset: {
          command: 'close'
        }
      });
      this.btncfg = make('mujs-btn', 'settings hidden', {
        title: 'Settings',
        innerHTML: iconSVG.load('gear'),
        dataset: {
          command: 'settings'
        }
      });
      this.btnhome = make('mujs-btn', 'github hidden', {
        title: `GitHub (v${
          $info.script.version.includes('.') || $info.script.version.includes('Book')
            ? $info.script.version
            : $info.script.version.slice(0, 5)
        })`,
        innerHTML: iconSVG.load('github'),
        dataset: {
          command: 'open-tab',
          webpage: $info.script.namespace
        }
      });
      this.btnissue = make('mujs-btn', 'issue hidden', {
        innerHTML: iconSVG.load('issue'),
        title: i18n$('issue'),
        dataset: {
          command: 'open-tab',
          webpage: $info.script.bugs ?? 'https://github.com/magicoflolis/Userscript-Plus/issues'
        }
      });
      this.btngreasy = make('mujs-btn', 'greasy hidden', {
        title: 'Greasy Fork',
        innerHTML: iconSVG.load('globe'),
        dataset: {
          command: 'open-tab',
          webpage: 'https://greasyfork.org/scripts/421603'
        }
      });
      this.btnnav = make('mujs-btn', 'nav', {
        title: 'Navigation',
        innerHTML: iconSVG.load('nav'),
        dataset: {
          command: 'navigation'
        }
      });
      const makeTHead = (rows = []) => {
        const tr = make('tr');
        for (const r of rows) {
          const tparent = make('th', r.class ?? '', r);
          tr.append(tparent);
        }
        this.tabhead.append(tr);
        this.table.append(this.tabhead, this.tabbody);
      };
      makeTHead([
        {
          class: 'mujs-header-name',
          textContent: i18n$('name')
        },
        {
          textContent: i18n$('createdby')
        },
        {
          textContent: i18n$('daily_installs')
        },
        {
          textContent: i18n$('updated')
        },
        {
          textContent: i18n$('install')
        }
      ]);
      // #endregion
      if (isMobile) {
        dom.cl.add([this.btnHide, this.btnfullscreen, this.closebtn], 'hidden');
        this.btnframe.append(
          this.btnHide,
          this.btnfullscreen,
          this.closebtn,
          this.btnhome,
          this.btngreasy,
          this.btnissue,
          this.btncfg,
          this.btnnav
        );
      } else {
        this.btnHandles.append(this.btnHide, this.btnfullscreen, this.closebtn);
        this.btnframe.append(this.btnhome, this.btngreasy, this.btnissue, this.btncfg, this.btnnav);
      }
      this.toolbar.append(this.btnHandles);
      this.urlContainer.append(this.urlBar);
      this.header.append(this.urlContainer, this.rateContainer, this.countframe, this.btnframe);
      this.tbody.append(this.table, this.cfgpage);
      this.main.append(this.toolbar, this.header, this.tbody, this.footer, this.promptElem);
      this.mainframe.append(this.mainbtn);
      // this.exBtn.append(this.importCFG, this.importTheme, this.exportCFG, this.exportTheme);
      // this.header.append(this.exBtn);
      this.root.append(this.mainframe, this.main);

      return true;
    } catch (ex) {
      err(ex);
    }
    return false;
  }
  remove() {
    memory.store.clear();
    if (this.frame) {
      this.frame.remove();
    }
  }
  async save() {
    this.unsaved = false;
    await StorageSystem.setValue('Config', cfg);
    info('Saved config:', cfg);
    this.redirect();
    return cfg;
  }
  /**
   * @param { string } css - CSS to inject
   * @param { string } name - Name of stylesheet
   * @return { HTMLStyleElement } Style element
   */
  loadCSS(css, name = 'CSS') {
    try {
      if (typeof name !== 'string') {
        throw new Error('"name" must be a typeof "string"', { cause: 'loadCSS' });
      }
      if (qs(`style[data-role="${name}"]`, this.root)) {
        return qs(`style[data-role="${name}"]`, this.root);
      }
      if (typeof css !== 'string') {
        throw new Error('"css" must be a typeof "string"', { cause: 'loadCSS' });
      }
      if (isBlank(css)) {
        throw new Error(`"${name}" contains empty CSS string`, { cause: 'loadCSS' });
      }
      const parent = isEmpty(this.root.shadowRoot) ? this.root : this.root.shadowRoot;
      if (isGM) {
        let sty;
        if (isFN(GM.addElement)) {
          sty = GM.addElement(parent, 'style', {
            textContent: css
          });
        } else if (isFN(GM_addElement)) {
          sty = GM_addElement(parent, 'style', {
            textContent: css
          });
        }
        if (isElem(sty)) {
          sty.dataset.insertedBy = $info.script.name;
          sty.dataset.role = name;
          return sty;
        }
      }
      const sty = make('style', {
        textContent: css,
        dataset: {
          insertedBy: $info.script.name,
          role: name
        }
      });
      parent.appendChild(sty);
      return sty;
    } catch (ex) {
      err(ex);
    }
  }
  checkBlacklist(str) {
    str = str || this.host;
    let blacklisted = false;
    if (/accounts*\.google\./.test(this.webpage.host)) {
      blacklisted = true;
    }
    for (const b of normalizeTarget(cfg.blacklist)) {
      if (typeof b === 'string') {
        if (b.startsWith('userjs-')) {
          const r = /userjs-(\w+)/.exec(b)[1];
          const biList = builtinList[r];
          if (isRegExp(biList)) {
            if (!biList.test(str)) continue;
            blacklisted = true;
          } else if (isObj(biList) && biList.host === this.host) {
            blacklisted = true;
          }
        }
      } else if (isObj(b)) {
        if (!b.enabled) {
          continue;
        }
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
    }
    this.isBlacklisted = blacklisted;
    return this.isBlacklisted;
  }
  getInfo(url) {
    const webpage = this.strToURL(url || this.webpage);
    const host = this.getHost(webpage.host);
    const domain = this.getDomain(webpage.host);
    return {
      domain,
      host,
      webpage
    };
  }
  /**
   * @template { string } S
   * @param { S } str
   */
  getHost(str = '') {
    return str.split('.').splice(-2).join('.');
  }
  /**
   * @template { string } S
   * @param { S } str
   */
  getDomain(str = '') {
    return str.split('.').at(-2) ?? BLANK_PAGE;
  }
  renderTheme(theme) {
    theme = theme || cfg.theme;
    if (theme === DEFAULT_CONFIG.theme) {
      return;
    }
    const sty = this.root.style;
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
  }
  makePrompt(txt, dataset = {}, usePrompt = true) {
    if (qs('.prompt', this.promptElem)) {
      for (const elem of qsA('.prompt', this.promptElem)) {
        if (elem.dataset.prompt) {
          elem.remove();
        }
      }
    }
    const el = make('mu-js', 'prompt', {
      dataset: {
        prompt: txt
      }
    });
    const elHead = make('mu-js', 'prompt-head', {
      innerHTML: `${iconSVG.load('refresh')} ${txt}`
    });
    el.append(elHead);
    if (usePrompt) {
      const elPrompt = make('mu-js', 'prompt-body', { dataset });
      const elYes = make('mujs-btn', 'prompt-confirm', {
        innerHTML: 'Confirm',
        dataset: {
          command: 'prompt-confirm'
        }
      });
      const elNo = make('mujs-btn', 'prompt-deny', {
        innerHTML: 'Deny',
        dataset: {
          command: 'prompt-deny'
        }
      });
      elPrompt.append(elYes, elNo);
      el.append(elPrompt);
    }
    this.promptElem.append(el);
  }
  /**
   * @template {string | Error} E
   * @param {...E} ex
   */
  showError(...ex) {
    err(...ex);
    const error = make('mu-js', 'error');
    let str = '';
    for (const e of ex) {
      str += `${typeof e === 'string' ? e : `${e.cause ? `[${e.cause}] ` : ''}${e.message}${e.stack ? ` ${e.stack}` : ''}`}\n`;
      if (isObj(e)) {
        if (e.notify) {
          dom.cl.add(this.mainframe, 'error');
        }
      }
    }
    const { createTextNode } = safeSelf();
    error.appendChild(createTextNode(str));
    this.footer.append(error);
  }
  toArr() {
    return Array.from(this.userjsCache.values()).filter(({ _mujs }) => {
      return isElem(_mujs.root) && _mujs.info.engine.enabled;
    });
  }
  toElem() {
    return this.toArr().map(({ _mujs }) => {
      return _mujs.root;
    });
  }
  refresh() {
    this.urlBar.placeholder = i18n$('newTab');
    Counter.reset();
    dom.cl.remove(this.toElem(), 'hidden');
    dom.cl.remove(qsA('mujs-section[data-name]', this.cfgpage), 'hidden');
    dom.prop([this.tabbody, this.rateContainer, this.footer], 'innerHTML', '');
  }
  /**
   * @template {string | URL} S
   * @param {S} str
   * @returns {URL}
   */
  strToURL(str) {
    const WIN_LOCATION = window.location ?? BLANK_PAGE;
    try {
      str = str ?? WIN_LOCATION;
      return objToStr(str).includes('URL') ? str : new URL(str);
    } catch (ex) {
      ex.cause = 'strToURL';
      this.showError(ex);
    }
    return WIN_LOCATION;
  }
  /**
   * Redirects sleazyfork userscripts from greasyfork.org to sleazyfork.org
   *
   * Taken from: https://greasyfork.org/scripts/23840
   */
  redirect() {
    const locObj = window.top.location;
    const { hostname } = locObj;
    const gfSite = /greasyfork\.org/.test(hostname);
    if (!gfSite && cfg.sleazyredirect) {
      return;
    }
    const otherSite = gfSite ? 'sleazyfork' : 'greasyfork';
    if (!qs('span.sign-in-link')) {
      return;
    }
    if (!/scripts\/\d+/.test(locObj.href)) {
      return;
    }
    if (
      !qs('#script-info') &&
      (otherSite == 'greasyfork' || qs('div.width-constraint>section>p>a'))
    ) {
      const str = locObj.href.replace(
        /\/\/([^.]+\.)?(greasyfork|sleazyfork)\.org/,
        '//$1' + otherSite + '.org'
      );
      info(`Redirecting to "${str}"`);
      if (isFN(locObj.assign)) {
        locObj.assign(str);
      } else {
        locObj.href = str;
      }
    }
  }
}
const container = new Container();
// #endregion
// #region Primary Function
function primaryFN() {
  const respHandles = {
    build: async () => {}
  };
  try {
    const { scheduler } = safeSelf();
    const {
      mainframe,
      urlBar,
      rateContainer,
      footer,
      tabbody,
      cfgpage,
      fsearch,
      btnfullscreen,
      main,
      tab,
      showError
    } = container;
    const frameTimeout = container.timeouts.frame;
    const cfgMap = memory.maps.cfg;
    const rebuildCfg = () => {
      for (const engine of cfg.engines) {
        if (cfgMap.has(engine.name)) {
          const inp = cfgMap.get(engine.name);
          inp.checked = engine.enabled;
          if (engine.name === 'github') {
            const txt = cfgMap.get('github-token');
            dom.prop(txt, 'value', engine.token);
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
      // dom.prop(cfgMap.get('blacklist'), 'value', JSON.stringify(cfg.blacklist, null, ' '));
      for (const [k, v] of Object.entries(cfg.theme)) {
        dom.prop(cfgMap.get(k), 'value', v);
      }
      container.renderTheme(cfg.theme);
    };
    const doInstallProcess = async (installLink) => {
      const locObj = window.top.location;
      if (isFN(locObj.assign)) {
        locObj.assign(installLink.href);
      } else {
        locObj.href = installLink.href;
      }
      installLink.remove();
      await init();
    };
    const applyTo = (ujs, name, elem, root) => {
      const n = ujs._mujs.code[name] ?? ujs._mujs.code.data_meta[name];
      if (isEmpty(n)) {
        const el = make('mujs-a', {
          textContent: i18n$('listing_none')
        });
        elem.append(el);
        return;
      }
      dom.prop(elem, 'innerHTML', '');
      dom.cl.remove(root, 'hidden');
      if (isObj(n)) {
        if (name === 'resource') {
          for (const [k, v] of Object.entries(n)) {
            const el = make('mujs-a', {
              textContent: k ?? 'ERROR'
            });
            if (v.startsWith('http')) {
              el.dataset.command = 'open-tab';
              el.dataset.webpage = v;
            }
            elem.append(el);
          }
        } else {
          const el = make('mujs-a', {
            textContent: n.text
          });
          if (n.domain) {
            el.dataset.command = 'open-tab';
            el.dataset.webpage = `https://${n.text}`;
          }
          elem.append(el);
        }
      } else if (typeof n === 'string') {
        const el = make('mujs-a', {
          textContent: n
        });
        elem.append(el);
      } else {
        for (const c of n) {
          if (typeof c === 'string' && c.startsWith('http')) {
            const el = make('mujs-a', {
              textContent: c,
              dataset: {
                command: 'open-tab',
                webpage: c
              }
            });
            elem.append(el);
          } else if (isObj(c)) {
            const el = make('mujs-a', {
              textContent: c.text
            });
            if (c.domain) {
              el.dataset.command = 'open-tab';
              el.dataset.webpage = `https://${c.text}`;
            }
            elem.append(el);
          } else {
            const el = make('mujs-a', {
              textContent: c
            });
            elem.append(el);
          }
        }
      }
    };
    // #region Main event handlers
    ael(main, isMobile ? 'touchend' : 'click', async (evt) => {
      try {
        /** @type { HTMLElement } */
        const target = evt.target.closest('[data-command]');
        if (!target) {
          return;
        }
        const prmpt = /prompt-/.test(target.dataset.command);
        let dataset = target.dataset;
        let cmd = dataset.command;
        let prmptChoice = false;
        if (prmpt) {
          dataset = target.parentElement.dataset;
          cmd = dataset.command;
          prmptChoice = /confirm/.test(target.dataset.command);
          target.parentElement.parentElement.remove();
        }
        if (cmd === 'install-script' && dataset.userjs) {
          let installCode = dataset.userjs;
          if (!prmpt && dataset.userjs.endsWith('.user.css')) {
            container.makePrompt(i18n$('prmpt_css'), dataset);
            return;
          } else if (prmpt !== prmptChoice) {
            installCode = dataset.userjs.replace(/\.user\.css$/, '.user.js');
          }
          const dlBtn = make('a', {
            onclick(evt) {
              evt.preventDefault();
              doInstallProcess(evt.target);
            }
          });
          dlBtn.href = installCode;
          dlBtn.click();
        } else if (cmd === 'open-tab' && dataset.webpage) {
          if (isGM) {
            if (isFN(GM.openInTab)) {
              return GM.openInTab(dataset.webpage);
            } else if (isFN(GM_openInTab)) {
              return GM_openInTab(dataset.webpage, {
                active: true,
                insert: true
              });
            }
          }
          return window.open(dataset.webpage, '_blank');
        } else if (cmd === 'navigation') {
          for (const e of qsA('mujs-btn', target.parentElement)) {
            if (dom.cl.has(e, 'nav')) continue;
            if (dom.cl.has(e, 'hidden')) {
              dom.cl.remove(e, 'hidden');
            } else {
              dom.cl.add(e, 'hidden');
            }
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
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('expand'));
          } else {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('collapse'));
          }
        } else if (cmd === 'hide-list') {
          dom.cl.add(main, 'hidden');
          dom.cl.remove(mainframe, 'hidden');
          timeoutFrame();
        } else if (cmd === 'save') {
          container.rebuild = true;
          dom.prop(rateContainer, 'innerHTML', '');
          if (!dom.prop(target, 'disabled')) {
            const config = await container.save();
            if (container.rebuild) {
              container.cache.clear();
              if (config.autofetch) {
                respHandles.build();
              }
            }
            container.unsaved = false;
            container.rebuild = false;
          }
        } else if (cmd === 'reset') {
          cfg = DEFAULT_CONFIG;
          dom.cl.remove(mainframe, 'error');
          if (qs('.error', footer)) {
            for (const elem of qsA('.error', footer)) {
              elem.remove();
            }
          }
          container.unsaved = true;
          container.rebuild = true;
          rebuildCfg();
        } else if (cmd === 'settings') {
          if (container.unsaved) {
            showError('Unsaved changes');
          }
          tab.create('mujs:settings');
          container.rebuild = false;
        } else if (cmd === 'new-tab') {
          tab.create();
        } else if (cmd === 'switch-tab') {
          tab.active(target);
        } else if (cmd === 'close-tab' && target.parentElement) {
          tab.close(target.parentElement);
        } else if (cmd === 'download-userjs') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          let installCode = dataUserJS.code_url;
          if (!prmpt && dataUserJS.code_url.endsWith('.user.css')) {
            container.makePrompt('Download as UserStyle?', dataset);
            return;
          } else if (prmpt !== prmptChoice) {
            installCode = dataUserJS.code_url.replace(/\.user\.css$/, '.user.js');
          }
          const r = await dataUserJS._mujs.code.request(false, installCode);
          const txt = r.data;
          if (typeof txt !== 'string') {
            return;
          }
          const userjsName = dataset.userjsName ?? dataset.userjs;
          const userjsExt = prmpt !== prmptChoice ? '.user.js' : '.user.css';
          const makeUserJS = new Blob([txt], { type: 'text/plain' });
          const dlBtn = make('a', 'mujs_Downloader');
          dlBtn.href = URL.createObjectURL(makeUserJS);
          dlBtn.download = `${userjsName}${userjsExt}`;
          dlBtn.click();
          URL.revokeObjectURL(dlBtn.href);
          dlBtn.remove();
        } else if (cmd === 'load-userjs' || cmd === 'load-header') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          const codeArea = qs('textarea', target.parentElement.parentElement);
          if (!isEmpty(codeArea.value) && cmd === codeArea.dataset.load) {
            dom.cl.toggle(codeArea, 'hidden');
            return;
          }
          codeArea.dataset.load = cmd;
          const dataUserJS = container.userjsCache.get(+dataset.userjs);
          const code_obj = await dataUserJS._mujs.code.request();
          if (typeof code_obj.data_code_block !== 'string') {
            codeArea.value = 'An error occured';
            return;
          }
          codeArea.value =
            cmd === 'load-userjs' ? code_obj.data_code_block : code_obj.data_meta_block;
          dom.cl.remove(codeArea, 'hidden');
          for (const e of qsA(
            'mujs-column[data-el="matches"]',
            target.parentElement.parentElement
          )) {
            applyTo(dataUserJS, e.dataset.type, qs('.mujs-grants', e), e);
          }
        } else if (cmd === 'load-page') {
          if (!container.userjsCache.has(+dataset.userjs)) {
            return;
          }
          let pageArea = qs('mujs-page', target.parentElement.parentElement);
          if (!pageArea) {
            pageArea = make('mujs-page');
            target.parentElement.parentElement.append(pageArea);
            const dataUserJS = container.userjsCache.get(+dataset.userjs);
            const engine = dataUserJS._mujs.info.engine;
            let pageURL;
            if (engine.name.includes('fork')) {
              const { navigator } = safeSelf();
              const current = navigator.language.split('-')[0] ?? 'en';
              pageURL = dataUserJS.url.replace(
                /\/scripts/,
                `/${/^(zh|fr|es)/.test(current) ? navigator.language : current}/scripts`
              );
            } else if (engine.name.includes('github')) {
              const page_url = await Network.req(dataUserJS.page_url, 'GET', 'json', {
                headers: {
                  Accept: 'application/vnd.github+json',
                  Authorization: `Bearer ${engine.token}`,
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              }).catch(() => {
                return {};
              });
              if (!page_url.download_url) {
                return;
              }
              const page = await Network.req(page_url.download_url, 'GET', 'text');
              if (container.supported) {
                const shadow = pageArea.attachShadow({ mode: 'closed' });
                const div = make('div', {
                  innerHTML: page
                });
                shadow.append(div);
              }
              return;
            } else {
              pageURL = dataUserJS.url;
            }
            if (!pageURL) {
              return;
            }
            const page = await Network.req(pageURL, 'GET', 'document');
            const getContent = () => {
              let content = 'An error occured';
              const h = new URL(dataUserJS.url);
              const root = qs('.user-content', page.documentElement);
              for (const e of qsA('[href]', root)) {
                e.target = '_blank';
                e.style = 'pointer-events: auto;';
                if (e.href.startsWith('/')) {
                  e.href = `${h.origin}${e.href}`;
                }
              }
              for (const e of qsA('img[src]', root)) {
                e.style =
                  'max-width: 25em; max-height: 25em; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;';
              }
              if (root) {
                content = root.innerHTML;
              } else {
                content = 'No additional info available';
              }
              return content;
            };
            if (container.supported) {
              const shadow = pageArea.attachShadow({ mode: 'closed' });
              const div = make('div', {
                style: 'pointer-events: none;',
                innerHTML: getContent()
              });
              shadow.append(div);
            }
            return;
          }
          if (!dom.cl.has(pageArea, 'hidden')) {
            dom.cl.add(pageArea, 'hidden');
            return;
          }
          dom.cl.remove(pageArea, 'hidden');
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
            onchange(evt) {
              try {
                [...evt.target.files].forEach((file) => {
                  const reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = () => {
                    const result = JSON.parse(reader.result);
                    if (result.blacklist) {
                      log(`Imported config: { ${file.name} }`, result);
                      cfg = result;
                      container.unsaved = true;
                      container.rebuild = true;
                      rebuildCfg();
                      container.save().then((config) => {
                        container.cache.clear();
                        if (config.autofetch) {
                          respHandles.build();
                        }
                        container.unsaved = false;
                        container.rebuild = false;
                      });
                    } else {
                      log(`Imported theme: { ${file.name} }`, result);
                      cfg.theme = result;
                      container.renderTheme(cfg.theme);
                    }
                    inpJSON.remove();
                  };
                  reader.onerror = () => {
                    showError(reader.error);
                    inpJSON.remove();
                  };
                });
              } catch (ex) {
                showError(ex);
                inpJSON.remove();
              }
            }
          });
          target.parentElement.append(inpJSON);
          inpJSON.click();
        }
      } catch (ex) {
        showError(ex);
      }
    });
    ael(main, 'auxclick', (evt) => {
      if (evt.button !== 1) {
        return;
      }
      /** @type { HTMLElement } */
      const target = evt.target.closest('[data-command]');
      if (!target) {
        return;
      }
      const dataset = target.dataset;
      const cmd = dataset.command;
      if (cmd === 'switch-tab' || cmd === 'close-tab') {
        tab.close(target);
      } else if (cmd === 'new-tab') {
        tab.create();
      }
    });
    if (!isMobile) {
      const fade = async (target, type) => {
        if (type === 'mouseenter') {
          frameTimeout.clear(...frameTimeout.ids);
          container.timeouts.mouse.clear(...container.timeouts.mouse.ids);
          target.style.opacity = container.opacityMax;
        } else if (type === 'mouseleave') {
          await container.timeouts.mouse.set(cfg.time);
          target.style.opacity = container.opacityMin;
        }
      };
      for (const e of ['mouseenter', 'mouseleave']) {
        ael(main, e, (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          fade(evt.target, evt.type);
        });
      }
    }
    ael(main, 'updateditem', (evt) => {
      /**
       * @type {import("../typings/types.d.ts").GSForkQuery}
       */
      const ujs = evt.detail;
      if (!ujs._mujs) return;
      for (const elem of qsA('[data-name]', ujs._mujs.root)) {
        const name = elem.dataset.name;
        if (name === 'code') {
          if (ujs._mujs.code.data_code_block) {
            if (cfg.preview.code && !cfg.preview.metadata) {
              elem.value = ujs._mujs.code.data_code_block;
            } else if (cfg.preview.metadata && !cfg.preview.code) {
              elem.value = ujs._mujs.code.data_meta_block;
            } else {
              elem.value = `${ujs._mujs.code.META_START_COMMENT}${ujs._mujs.code.data_meta_block}${ujs._mujs.code.META_END_COMMENT}${ujs._mujs.code.data_code_block}`;
            }
          }
          continue;
        }
        if (!ujs[name]) continue;
        if (name === 'license') {
          dom.attr(elem, 'title', ujs.license ?? i18n$('no_license'));
          dom.text(elem, `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`);
        } else if (name === 'code_updated_at') {
          dom.text(elem, language.toDate(ujs.code_updated_at));
          elem.dataset.value = new Date(ujs.code_updated_at).toISOString();
        } else if (name === 'created_date') {
          dom.text(elem, `${i18n$('created_date')}: ${language.toDate(ujs.created_at)}`);
          elem.dataset.value = new Date(ujs.created_at).toISOString();
        } else if (name === 'total_installs') {
          dom.text(elem, `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`);
        } else {
          dom.text(elem, ujs[name]);
        }
      }
      if (ujs._mujs.code.data_code_block) {
        for (const e of qsA('mujs-column[data-el="matches"]', ujs._mujs.root)) {
          applyTo(ujs, e.dataset.type, qs('.mujs-grants', e), e);
        }
      }
      if (container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
    });
    // #endregion
    const TLD_EXPANSION = ['com', 'net', 'org', 'de', 'co.uk'];
    const APPLIES_TO_ALL_PATTERNS = [
      'http://*',
      'https://*',
      'http://*/*',
      'https://*/*',
      'http*://*',
      'http*://*/*',
      '*',
      '*://*',
      '*://*/*',
      'http*'
    ];
    class ParseUserJS {
      /**
       * @type { string }
       */
      code;
      /**
       * @type { string }
       */
      data_meta_block;
      /**
       * @type { string }
       */
      data_code_block;
      /**
       * @type { { [meta: string]: string | string[] | { [resource: string]: string } } }
       */
      data_meta;
      /**
       * @type { {text: string;domain: boolean;tld_extra: boolean}[] }
       */
      data_names;
      constructor(code, isUserCSS) {
        this.code = code;
        this.META_START_COMMENT = isUserCSS ? '/* ==UserStyle==' : '// ==UserScript==';
        this.META_END_COMMENT = isUserCSS ? '==/UserStyle== */' : '// ==/UserScript==';
        this.get_meta_block();
        this.get_code_block();
        this.parse_meta();
        this.calculate_applies_to_names();
      }
      get_meta_block() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_meta_block) {
          return this.data_meta_block;
        }
        const start_block = this.code.indexOf(this.META_START_COMMENT);
        if (isNull(start_block)) {
          return null;
        }
        const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return null;
        }
        const meta_block = this.code.substring(
          start_block + this.META_START_COMMENT.length,
          end_block
        );
        this.data_meta_block = meta_block;
        return this.data_meta_block;
      }
      get_code_block() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_code_block) {
          return this.data_code_block;
        }
        const start_block = this.code.indexOf(this.META_START_COMMENT);
        if (isNull(start_block)) {
          return null;
        }
        const end_block = this.code.indexOf(this.META_END_COMMENT, start_block);
        if (isNull(end_block)) {
          return null;
        }
        const code_block = this.code.substring(
          end_block + this.META_END_COMMENT.length,
          this.code.length
        );
        this.data_code_block = code_block
          .split('\n')
          .filter((l) => !isEmpty(l))
          .join('\n');
        return this.data_code_block;
      }
      parse_meta() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_meta) {
          return this.data_meta;
        }
        const meta = {};
        const meta_block_map = new Map();
        for (const meta_line of this.get_meta_block().split('\n')) {
          const meta_match = /\/\/\s+@([a-zA-Z:-]+)\s+(.*)/.exec(meta_line);
          if (!meta_match) {
            continue;
          }
          const key = meta_match[1].trim();
          const value = meta_match[2].trim();
          if (!meta_block_map.has(key)) {
            meta_block_map.set(key, []);
          }
          const meta_map = meta_block_map.get(key);
          meta_map.push(value);
          meta_block_map.set(key, meta_map);
        }
        for (const [key, value] of meta_block_map) {
          if (value.length > 1) {
            meta[key] = value;
          } else {
            meta[key] = value[0];
          }
        }
        this.data_meta = meta;
        return this.data_meta;
      }
      calculate_applies_to_names() {
        if (isEmpty(this.code)) {
          return null;
        }
        if (this.data_names) {
          return this.data_names;
        }
        let patterns = [];
        for (const [k, v] of Object.entries(this.parse_meta())) {
          if (/include|match/i.test(k)) {
            if (Array.isArray(v)) {
              patterns = patterns.concat(v);
            } else {
              patterns = patterns.concat([v]);
            }
          }
        }
        if (isEmpty(patterns)) {
          return [];
        }
        if (this.intersect(patterns, APPLIES_TO_ALL_PATTERNS)) {
          this.data_names = [
            {
              domain: false,
              text: 'All sites',
              tld_extra: false
            }
          ];
          return this.data_names;
        }
        const name_map = new Map();
        const addObj = (obj) => {
          if (name_map.has(obj.text)) {
            return;
          }
          name_map.set(obj.text, obj);
        };
        for (let p of patterns) {
          try {
            const original_pattern = p;
            let pre_wildcards = [];
            if (p.match(/^\/(.*)\/$/)) {
              pre_wildcards = [p];
            } else {
              let m = /^\*(https?:.*)/i.exec(p);
              if (m) {
                p = m[1];
              }
              p = p
                .replace(/^\*:/i, 'http:')
                .replace(/^\*\/\//i, 'http://')
                .replace(/^http\*:/i, 'http:')
                .replace(/^(https?):([^/])/i, '$1://$2');
              m = /^([a-z]+:\/\/)\*\.?([a-z0-9-]+(?:.[a-z0-9-]+)+.*)/i.exec(p);
              if (m) {
                p = m[1] + m[2];
              }
              m = /^\*\.?([a-z0-9-]+\.[a-z0-9-]+.*)/i.exec(p);
              if (m) {
                p = `http://${m[1]}`;
              }
              m = /^http\*(?:\/\/)?\.?((?:[a-z0-9-]+)(?:\.[a-z0-9-]+)+.*)/i.exec(p);
              if (m) {
                p = `http://${m[1]}`;
              }
              m = /^([a-z]+:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)*\.))\*(.*)/.exec(p);
              if (m) {
                if (m[2].match(/A([0-9]+\.){2,}z/)) {
                  p = `${m[1]}tld${m[3]}`;
                  pre_wildcards = [p.split('*')[0]];
                } else {
                  pre_wildcards = [p];
                }
              } else {
                pre_wildcards = [p];
              }
            }
            for (const pre_wildcard of pre_wildcards) {
              try {
                const urlObj = new URL(pre_wildcard);
                const { host } = urlObj;
                if (isNull(host)) {
                  addObj({ text: original_pattern, domain: false, tld_extra: false });
                } else if (!host.includes('.') && host.includes('*')) {
                  addObj({ text: original_pattern, domain: false, tld_extra: false });
                } else if (host.endsWith('.tld')) {
                  for (let i = 0; i < TLD_EXPANSION.length; i++) {
                    const tld = TLD_EXPANSION[i];
                    addObj({
                      text: host.replace(/tld$/i, tld),
                      domain: true,
                      tld_extra: i != 0
                    });
                  }
                } else if (host.endsWith('.')) {
                  addObj({
                    text: host.slice(0, -1),
                    domain: true,
                    tld_extra: false
                  });
                } else {
                  addObj({
                    text: host,
                    domain: true,
                    tld_extra: false
                  });
                }
                // eslint-disable-next-line no-unused-vars
              } catch (ex) {
                addObj({ text: original_pattern, domain: false, tld_extra: false });
              }
            }
          } catch (ex) {
            err(ex);
          }
        }
        this.data_names = [...name_map.values()];
        return this.data_names;
      }
      intersect(a, ...arr) {
        return !isBlank([...new Set(a)].filter((v) => arr.every((b) => b.includes(v))));
      }
    }
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
      url: BLANK_PAGE,
      code_url: BLANK_PAGE,
      created_at: Date.now(),
      code_updated_at: Date.now(),
      locale: 'NOT FOUND',
      deleted: false,
      users: []
    };
    const mkList = (txt = '', obj = {}) => {
      if (!obj.root || !obj.type) {
        return;
      }
      const { root, type } = obj;
      const appliesTo = make('mu-js', 'mujs-list', {
        textContent: `${txt}: `
      });
      const applyList = make('mu-js', 'mujs-grants');
      const ujsURLs = make('mujs-column', 'mujs-list', {
        dataset: {
          el: 'matches',
          type
        }
      });
      ujsURLs.append(appliesTo, applyList);
      root.append(ujsURLs);

      const list = obj.list ?? [];
      if (isEmpty(list)) {
        const elem = make('mujs-a', {
          textContent: i18n$('listing_none')
        });
        applyList.append(elem);
        dom.cl.add(ujsURLs, 'hidden');
        return;
      }
      for (const c of list) {
        if (typeof c === 'string' && c.startsWith('http')) {
          const elem = make('mujs-a', {
            textContent: c,
            dataset: {
              command: 'open-tab',
              webpage: c
            }
          });
          applyList.append(elem);
        } else if (isObj(c)) {
          if (type === 'resource') {
            for (const [k, v] of Object.entries(c)) {
              const elem = make('mujs-a', {
                textContent: k ?? 'ERROR'
              });
              if (v.startsWith('http')) {
                elem.dataset.command = 'open-tab';
                elem.dataset.webpage = v;
              }
              applyList.append(elem);
            }
          } else {
            const elem = make('mujs-a', {
              textContent: c.text
            });
            if (c.domain) {
              elem.dataset.command = 'open-tab';
              elem.dataset.webpage = `https://${c.text}`;
            }
            applyList.append(elem);
          }
        } else {
          const elem = make('mujs-a', {
            textContent: c
          });
          applyList.append(elem);
        }
      }
    };
    /**
     * @param {number} [time]
     */
    const timeoutFrame = async (time) => {
      frameTimeout.clear(...frameTimeout.ids);
      if (dom.cl.has(mainframe, 'hidden')) {
        return;
      }
      time = time ?? cfg.time ?? DEFAULT_CONFIG.time;
      let n = 10000;
      if (typeof time === 'number' && !Number.isNaN(time)) {
        n = container.isBlacklisted ? time / 2 : time;
      }
      await frameTimeout.set(n);
      container.remove();
      return frameTimeout.clear(...frameTimeout.ids);
    };
    // #region Create UserJS
    /**
     * @param { import("../typings/types.d.ts").GSForkQuery } ujs
     * @param { string } engine
     */
    const createjs = (ujs, engine) => {
      // Lets not add this UserJS to the list
      if (ujs.id === 421603) {
        return;
      }
      if (badUserJS.includes(ujs.id) || badUserJS.includes(ujs.url)) {
        return;
      }
      if (!container.userjsCache.has(ujs.id)) container.userjsCache.set(ujs.id, ujs);
      const eframe = make('td', 'install-btn');
      const uframe = make('td', 'mujs-uframe');
      const fdaily = make('td', 'mujs-list', {
        textContent: ujs.daily_installs,
        dataset: {
          name: 'daily_installs'
        }
      });
      const fupdated = make('td', 'mujs-list', {
        textContent: language.toDate(ujs.code_updated_at),
        dataset: {
          name: 'code_updated_at',
          value: new Date(ujs.code_updated_at).toISOString()
        }
      });
      const fname = make('td', 'mujs-name');
      const fmore = make('mujs-column', 'mujs-list hidden', {
        dataset: {
          el: 'more-info'
        }
      });
      const fBtns = make('mujs-column', 'mujs-list hidden');
      const jsInfo = make('mujs-row', 'mujs-list');
      const jsInfoB = make('mujs-row', 'mujs-list');
      const ratings = make('mujs-column', 'mujs-list');
      const ftitle = make('mujs-a', 'mujs-homepage', {
        textContent: ujs.name,
        title: ujs.url,
        dataset: {
          command: 'open-tab',
          webpage: ujs.url
        }
      });
      const fver = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('version_number')}: ${ujs.version}`
      });
      const fcreated = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('created_date')}: ${language.toDate(ujs.created_at)}`,
        dataset: {
          name: 'created_at',
          value: new Date(ujs.created_at).toISOString()
        }
      });
      const flicense = make('mu-js', 'mujs-list', {
        title: ujs.license ?? i18n$('no_license'),
        textContent: `${i18n$('license')}: ${ujs.license ?? i18n$('no_license')}`,
        dataset: {
          name: 'license'
        }
      });
      const ftotal = make('mu-js', 'mujs-list', {
        textContent: `${i18n$('total_installs')}: ${language.toNumber(ujs.total_installs)}`,
        dataset: {
          name: 'total_installs'
        }
      });
      const fratings = make('mu-js', 'mujs-list', {
        title: i18n$('ratings'),
        textContent: `${i18n$('ratings')}:`
      });
      const fgood = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('good'),
        textContent: ujs.good_ratings,
        dataset: {
          name: 'good_ratings',
          el: 'good'
        }
      });
      const fok = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('ok'),
        textContent: ujs.ok_ratings,
        dataset: {
          name: 'ok_ratings',
          el: 'ok'
        }
      });
      const fbad = make('mu-js', 'mujs-list mujs-ratings', {
        title: i18n$('bad'),
        textContent: ujs.bad_ratings,
        dataset: {
          name: 'bad_ratings',
          el: 'bad'
        }
      });
      const fdesc = make('mu-js', 'mujs-list mujs-pointer', {
        title: ujs.description,
        textContent: ujs.description,
        dataset: {
          command: 'list-description'
        }
      });
      const scriptInstall = make('mu-jsbtn', 'install', {
        innerHTML: `${iconSVG.load('install')} ${i18n$('install')}`,
        title: `${i18n$('install')} "${ujs.name}"`,
        dataset: {
          command: 'install-script',
          userjs: ujs.code_url
        }
      });
      const scriptDownload = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('download')} ${i18n$('saveFile')}`,
        dataset: {
          command: 'download-userjs',
          userjs: ujs.id,
          userjsName: ujs.name
        }
      });
      const tr = make('tr', 'frame', {
        dataset: {
          scriptId: ujs.id
        }
      });
      const codeArea = make('textarea', 'code-area hidden', {
        dataset: {
          name: 'code'
        },
        rows: '10',
        autocomplete: false,
        spellcheck: false,
        wrap: 'soft'
      });
      const loadCode = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('code')} ${i18n$('preview_code')}`,
        dataset: {
          command: 'load-userjs',
          userjs: ujs.id
        }
      });
      const loadMetadata = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('code')} Metadata`,
        dataset: {
          command: 'load-header',
          userjs: ujs.id
        }
      });
      tr.dataset.engine = engine;
      if (!engine.includes('fork') && cfg.recommend.others && goodUserJS.includes(ujs.url)) {
        tr.dataset.good = 'upsell';
      }
      for (const u of ujs.users) {
        const user = make('mujs-a', {
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
      if (cfg.recommend.others && goodUserJS.includes(ujs.id)) {
        tr.dataset.good = 'upsell';
      }
      eframe.append(scriptInstall);
      ratings.append(fratings, fgood, fok, fbad);
      jsInfo.append(ftotal, ratings, fver, fcreated);
      mkList(i18n$('code_size'), {
        list: ujs._mujs.code.code_size,
        type: 'code_size',
        root: jsInfo
      });

      jsInfoB.append(flicense);
      const data_meta = ujs._mujs.code?.data_meta ?? {};
      mkList(i18n$('antifeatures'), {
        list: data_meta.antifeatures ?? [],
        type: 'antifeatures',
        root: jsInfoB
      });
      mkList(i18n$('applies_to'), {
        list: ujs._mujs.code?.data_names ?? [],
        type: 'data_names',
        root: jsInfoB
      });
      mkList('@grant', {
        list: data_meta.grant ?? [],
        type: 'grant',
        root: jsInfoB
      });
      mkList('@require', {
        list: data_meta.require,
        type: 'require',
        root: jsInfoB
      });
      mkList('@resource', {
        list: isNull(data_meta.resource) ? [] : [data_meta.resource],
        type: 'resource',
        root: jsInfoB
      });
      fmore.append(jsInfo, jsInfoB);
      fBtns.append(scriptDownload, loadCode, loadMetadata);
      fname.append(ftitle, fdesc, fmore, fBtns, codeArea);

      const loadPage = make('mu-jsbtn', {
        innerHTML: `${iconSVG.load('pager')} Page`,
        dataset: {
          command: 'load-page',
          userjs: ujs.id
        }
      });
      fBtns.append(loadPage);

      if (ujs._mujs.code?.translated) tr.classList.add('translated');

      for (const e of [fname, uframe, fdaily, fupdated, eframe]) tr.append(e);
      ujs._mujs.root = tr;
      return ujs._mujs.root;
    };
    // #endregion
    const loadFilters = () => {
      /** @type {Map<string, import("../typings/types.d.ts").Filters >} */
      const pool = new Map();
      const handles = {
        pool,
        enabled() {
          return [...pool.values()].filter((o) => o.enabled);
        },
        refresh() {
          if (!Object.is(pool.size, 0)) pool.clear();
          for (const [key, value] of Object.entries(cfg.filters)) {
            if (!pool.has(key))
              pool.set(key, {
                ...value,
                reg: new RegExp(value.regExp, value.flag),
                keyReg: new RegExp(key.trim().toLocaleLowerCase(), 'gi'),
                valueReg: new RegExp(value.name.trim().toLocaleLowerCase(), 'gi')
              });
          }
          return this;
        },
        get(str) {
          return [...pool.values()].find((v) => v.keyReg.test(str) || v.valueReg.test(str));
        },
        /**
         * @param { import("../typings/types.d.ts").GSForkQuery } param0
         */
        match({ name, users }) {
          const p = handles.enabled();
          if (Object.is(p.length, 0)) return true;
          for (const v of p) {
            if ([{ name }, ...users].find((o) => o.name.match(v.reg))) return false;
          }
          return true;
        }
      };
      for (const [key, value] of Object.entries(cfg.filters)) {
        if (!pool.has(key))
          pool.set(key, {
            ...value,
            reg: new RegExp(value.regExp, value.flag),
            keyReg: new RegExp(key.trim().toLocaleLowerCase(), 'gi'),
            valueReg: new RegExp(value.name.trim().toLocaleLowerCase(), 'gi')
          });
      }
      return handles.refresh();
    };
    // #region List
    class List {
      engines;
      intHost;
      constructor(hostname = undefined) {
        this.build = this.build.bind(this);
        this.toArr = this.toArr.bind(this);
        this.groupBy = this.groupBy.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.sortRecords = this.sortRecords.bind(this);
        if (isEmpty(hostname)) hostname = container.host;
        this.engines = cfg.engines;
        this.host = hostname;
      }

      dispatch(ujs) {
        const { CustomEvent } = safeSelf();
        const customEvent = new CustomEvent('updateditem', { detail: ujs });
        main.dispatchEvent(customEvent);
      }

      set host(hostname) {
        this.intHost = hostname;

        if (!container.cache.has(hostname)) {
          const engineTemplate = {};
          for (const engine of cfg.engines) {
            engineTemplate[engine.name] = [];
          }
          container.cache.set(hostname, engineTemplate);
        }
        this.blacklisted = container.checkBlacklist(hostname);
        if (this.blacklisted) {
          showError(`Blacklisted "${hostname}"`);
          timeoutFrame();
        }

        this.engines = cfg.engines.filter((e) => {
          if (!e.enabled) {
            return false;
          }
          const v = engineUnsupported[e.name] ?? [];
          if (v.includes(hostname)) {
            showError(`Engine: "${e.name}" unsupported on "${hostname}"`);
            timeoutFrame();
            return false;
          }
          return true;
        });
      }

      get host() {
        return this.intHost;
      }

      // #region Builder
      build() {
        try {
          container.refresh();
          const { blacklisted, engines, host, toArr, dispatch } = this;
          if (blacklisted || isEmpty(engines)) {
            container.opacityMin = '0';
            mainframe.style.opacity = container.opacityMin;
            return;
          }
          const fetchRecords = [];
          const bsFilter = loadFilters();
          const hostCache = toArr();

          info('Building list', { hostCache, engines });

          if (isBlank(hostCache)) {
            for (const engine of engines) {
              info(`Fetching from "${engine.name}" for "${host}"`);
              const respError = (error) => {
                if (!error.cause) error.cause = engine.name;
                if (error.message.startsWith('429')) {
                  showError(`Engine: "${engine.name}" Too many requests...`);
                  return;
                }
                showError(`Engine: "${engine.name}"`, error.message);
              };
              const _mujs = (d) => {
                const obj = {
                  ...template,
                  ...d,
                  _mujs: {
                    root: {},
                    info: {
                      engine,
                      host
                    },
                    code: {
                      meta: {},
                      request: async function (translate = false, code_url) {
                        if (this.data_code_block) {
                          return this;
                        }
                        code_url = code_url ?? d.code_url;
                        /** @type { string } */
                        const code = await Network.req(code_url, 'GET', 'text').catch(showError);
                        if (typeof code !== 'string') {
                          return this;
                        }
                        const code_obj = new ParseUserJS(code, /\.user\.css/.test(code_url));
                        const { data_meta } = code_obj;
                        if (translate) {
                          for (const k of userjs.pool.keys()) {
                            if (data_meta[`name:${k}`]) {
                              Object.assign(obj, {
                                name: data_meta[`name:${k}`]
                              });
                              this.translated = true;
                            }
                            if (data_meta[`description:${k}`]) {
                              Object.assign(obj, {
                                description: data_meta[`description:${k}`]
                              });
                              this.translated = true;
                            }
                          }
                        }
                        if (Array.isArray(data_meta.grant)) {
                          data_meta.grant = union(data_meta.grant);
                        }
                        if (data_meta.resource) {
                          const obj = {};
                          if (typeof data_meta.resource === 'string') {
                            const reg = /(.+)\s+(.+)/.exec(data_meta.resource);
                            if (reg) {
                              obj[reg[1].trim()] = reg[2];
                            }
                          } else {
                            for (const r of data_meta.resource) {
                              const reg = /(.+)\s+(http.+)/.exec(r);
                              if (reg) {
                                obj[reg[1].trim()] = reg[2];
                              }
                            }
                          }
                          data_meta.resource = obj;
                        }
                        Object.assign(this, {
                          code_size: [Network.format(code.length)],
                          meta: data_meta,
                          ...code_obj
                        });

                        return this;
                      }
                    }
                  }
                };
                return obj;
              };
              /**
               * Prior to UserScript v7.0.0
               * @template {string} F
               * @param {F} fallback
               * @returns {F}
               */
              const toQuery = (fallback) => {
                if (engine.query) {
                  return decodeURIComponent(engine.query).replace(/\{host\}/g, host);
                }
                return fallback;
              };
              /**
               * @param { import("../typings/types.d.ts").GSFork } dataQ
               */
              const forkFN = async (dataQ) => {
                if (!dataQ) {
                  showError('Invalid data received from the server, check internet connection');
                  return;
                }
                /**
                 * @type { import("../typings/types.d.ts").GSForkQuery[] }
                 */
                const dq = Array.isArray(dataQ)
                  ? dataQ
                  : Array.isArray(dataQ.query)
                    ? dataQ.query
                    : [];
                const dataA = dq
                  .filter(Boolean)
                  .filter((d) => !d.deleted)
                  .filter(bsFilter.match);
                if (isBlank(dataA)) {
                  return;
                }
                const data = dataA.map(_mujs);
                const otherLng = [];
                /**
                 * @param {import("../typings/types.d.ts").GSForkQuery} d
                 * @returns {boolean}
                 */
                const inUserLanguage = (d) => {
                  if (userjs.pool.has(d.locale.split('-')[0] ?? d.locale)) {
                    return true;
                  }
                  otherLng.push(d);
                  return false;
                };
                const filterLang = data.filter((d) => {
                  if (cfg.filterlang && !inUserLanguage(d)) {
                    return false;
                  }
                  return true;
                });
                let finalList = filterLang;
                const hds = [];
                for (const ujs of otherLng) {
                  const c = await ujs._mujs.code.request(true);
                  if (c.translated) {
                    hds.push(ujs);
                  }
                }
                finalList = union(hds, filterLang);

                for (const ujs of finalList) {
                  if (
                    !ujs._mujs.code.data_code_block &&
                    (cfg.preview.code || cfg.preview.metadata)
                  ) {
                    ujs._mujs.code.request().then(() => {
                      dispatch(ujs);
                    });
                  }
                  createjs(ujs, engine.name);
                }
              };
              /**
               * @param {Document} htmlDocument
               */
              const openuserjs = async (htmlDocument) => {
                try {
                  if (!htmlDocument) {
                    showError('Invalid data received from the server, TODO fix this');
                    return;
                  }
                  const selected = htmlDocument.documentElement;
                  if (/openuserjs/gi.test(engine.name)) {
                    const col = qsA('.col-sm-8 .tr-link', selected) ?? [];
                    for (const i of col) {
                      while (isNull(qs('.script-version', i))) {
                        await new Promise((resolve) => requestAnimationFrame(resolve));
                      }
                      const fixurl = dom
                        .prop(qs('.tr-link-a', i), 'href')
                        .replace(
                          new RegExp(document.location.origin, 'gi'),
                          'https://openuserjs.org'
                        );
                      const ujs = _mujs({
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
                      });
                      if (bsFilter.match(ujs)) {
                        continue;
                      }
                      if (
                        !ujs._mujs.code.data_code_block &&
                        (cfg.preview.code || cfg.preview.metadata)
                      ) {
                        ujs._mujs.code.request().then(() => {
                          dispatch(ujs);
                        });
                      }
                      createjs(ujs, engine.name);
                    }
                  }
                } catch (ex) {
                  showError(ex);
                }
              };
              const gitFN = (data) => {
                try {
                  if (isBlank(data.items)) {
                    showError('Invalid data received from the server, TODO fix this');
                    return;
                  }
                  for (const r of data.items) {
                    const ujs = _mujs({
                      id: r.repository.id ?? r.id ?? 0,
                      name: r.repository.name ?? r.name,
                      description: isEmpty(r.repository.description)
                        ? i18n$('no_license')
                        : r.repository.description,
                      url: r.repository.html_url,
                      code_url: r.html_url.replace(/\/blob\//g, '/raw/'),
                      page_url: `${r.repository.url}/contents/README.md`,
                      users: [
                        {
                          name: r.repository.owner.login,
                          url: r.repository.owner.html_url
                        }
                      ]
                    });
                    // if (bsFilter.match(ujs)) {
                    //   continue;
                    // }
                    Network.req(r.repository.url, 'GET', 'json', {
                      headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: `Bearer ${engine.token}`,
                        'X-GitHub-Api-Version': '2022-11-28'
                      }
                    }).then((repository) => {
                      ujs.code_updated_at = r.commit || repository.updated_at || Date.now();
                      ujs.created_at = repository.created_at;
                      ujs.daily_installs = repository.watchers_count ?? 0;
                      ujs.good_ratings = repository.stargazers_count ?? 0;
                      if (repository.license?.name) ujs.license = repository.license.name;
                      dispatch(ujs);
                    });
                    if (
                      !ujs._mujs.code.data_code_block &&
                      (cfg.preview.code || cfg.preview.metadata)
                    ) {
                      ujs._mujs.code.request().then(() => {
                        dispatch(ujs);
                      });
                    }
                    createjs(ujs, engine.name);
                  }
                } catch (ex) {
                  showError(ex);
                }
              };
              let netFN;
              if (/github/gi.test(engine.name)) {
                if (isEmpty(engine.token)) {
                  showError(`"${engine.name}" requires a token to use`);
                  continue;
                }
                netFN = Network.req(
                  toQuery(
                    `${engine.url}"// ==UserScript=="+${host}+ "// ==/UserScript=="+in:file+language:js&per_page=30`
                  ),
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
                            textContent: `${key.toUpperCase()}: ${value}`
                          });
                          rateContainer.append(txt);
                        }
                      })
                      .catch(respError);
                  });
              } else if (/openuserjs/gi.test(engine.name)) {
                netFN = Network.req(toQuery(`${engine.url}${host}`), 'GET', 'document').then(
                  openuserjs
                );
              } else {
                netFN = Network.req(
                  toQuery(`${engine.url}/scripts/by-site/${host}.json?language=all`)
                ).then(forkFN);
              }
              if (netFN) {
                fetchRecords.push(netFN.catch(respError));
              }
            }
          } else {
            for (const ujs of hostCache) tabbody.append(ujs._mujs.root);
          }

          urlBar.placeholder = i18n$('search_placeholder');
          urlBar.value = '';

          if (isBlank(fetchRecords)) {
            this.sortRecords();
            return;
          }
          Promise.allSettled(fetchRecords).then(this.sortRecords).catch(showError);
        } catch (ex) {
          showError(ex);
        }
      }

      sortRecords() {
        const arr = this.toArr();
        for (const ujs of arr.flat().sort((a, b) => {
          const sortType = cfg.autoSort ?? 'daily_installs';
          return b[sortType] - a[sortType];
        })) {
          if (isElem(ujs._mujs.root)) tabbody.append(ujs._mujs.root);
        }
        for (const [name, value] of Object.entries(this.groupBy(arr)))
          Counter.update(value.length, { name });
      }

      toArr() {
        const h = this.intHost;
        return container.toArr().filter(({ _mujs }) => _mujs.info.host === h);
      }

      groupBy(arr) {
        const callback = ({ _mujs }) => _mujs.info.engine.name;
        if (isFN(Object.groupBy)) {
          return Object.groupBy(arr, callback);
        }
        /** [Object.groupBy polyfill](https://gist.github.com/gtrabanco/7c97bd41aa74af974fa935bfb5044b6e) */
        return arr.reduce((acc = {}, ...args) => {
          const key = callback(...args);
          acc[key] ??= [];
          acc[key].push(args[0]);
          return acc;
        }, {});
      }
      // #endregion
    }
    const MUList = new List();
    // #endregion
    // #region Make Config
    const makecfg = () => {
      const cbtn = make('mu-js', 'mujs-sty-flex');
      const savebtn = make('mujs-btn', 'save', {
        textContent: i18n$('save'),
        dataset: {
          command: 'save'
        },
        disabled: false
      });
      const resetbtn = make('mujs-btn', 'reset', {
        textContent: i18n$('reset'),
        dataset: {
          command: 'reset'
        }
      });
      cbtn.append(resetbtn, savebtn);

      const makesection = (name, tag) => {
        tag = tag ?? i18n$('no_license');
        name = name ?? i18n$('no_license');
        const sec = make('mujs-section', {
          dataset: {
            name: tag
          }
        });
        const lb = make('label', {
          dataset: {
            command: tag
          }
        });
        const divDesc = make('mu-js', {
          textContent: name
        });
        ael(sec, 'click', (evt) => {
          /** @type { HTMLElement } */
          const target = evt.target.closest('[data-command]');
          if (!target) {
            return;
          }
          const cmd = target.dataset.command;
          if (cmd === tag) {
            const a = qsA(`[data-${tag}]`, sec);
            if (dom.cl.has(a, 'hidden')) {
              dom.cl.remove(a, 'hidden');
            } else {
              dom.cl.add(a, 'hidden');
            }
          }
        });

        lb.append(divDesc);
        sec.append(lb);
        cfgpage.append(sec);
        return sec;
      };
      const sections = {
        general: makesection('General', 'general'),
        load: makesection('Automation', 'load'),
        list: makesection('List', 'list'),
        filters: makesection('List Filters', 'filters'),
        blacklist: makesection('Blacklist (WIP)', 'blacklist'),
        engine: makesection('Search Engines', 'engine'),
        theme: makesection('Theme Colors', 'theme'),
        exp: makesection('Import / Export', 'exp')
      };
      const makeRow = (text, value, type = 'checkbox', tag = 'general', attrs = {}) => {
        const lb = make('label', 'sub-section hidden', {
          textContent: text,
          dataset: {
            [tag]: text
          }
        });
        cfgMap.set(text, value);
        if (type === 'select') {
          const inp = make('select', {
            dataset: {
              [tag]: text
            },
            ...attrs
          });
          for (const selV of Object.keys(template)) {
            if (selV === 'deleted' || selV === 'users') continue;
            const o = make('option', {
              value: selV,
              textContent: selV
            });
            inp.append(o);
          }
          inp.value = cfg[value];
          lb.append(inp);
          if (sections[tag]) {
            sections[tag].append(lb);
          }
          return lb;
        }
        const inp = make('input', {
          type,
          dataset: {
            [tag]: text
          },
          ...attrs
        });

        if (tag === 'engine') {
          inp.dataset.name = value;
        }

        if (sections[tag]) {
          sections[tag].append(lb);
        }

        if (type === 'checkbox') {
          const inlab = make('mu-js', 'mujs-inlab');
          const la = make('label', {
            onclick() {
              inp.dispatchEvent(new MouseEvent('click'));
            }
          });
          inlab.append(inp, la);
          lb.append(inlab);

          const nm = /^(\w+)-(.+)/.exec(value);
          if (nm) {
            if (nm[1] === 'filters') {
              inp.checked = cfg[nm[1]][nm[2]].enabled;
            } else {
              inp.checked = cfg[nm[1]][nm[2]];
            }
          } else {
            inp.checked = cfg[value];
          }
          ael(inp, 'change', (evt) => {
            container.unsaved = true;
            if (/filterlang/i.test(value)) {
              container.rebuild = true;
            }
            if (nm) {
              if (nm[1] === 'filters') {
                cfg[nm[1]][nm[2]].enabled = evt.target.checked;
              } else {
                cfg[nm[1]][nm[2]] = evt.target.checked;
              }
            } else {
              cfg[value] = evt.target.checked;
            }
          });

          if (tag === 'engine') {
            const engine = cfg.engines.find((engine) => engine.name === value);
            if (engine) {
              inp.checked = engine.enabled;
              inp.dataset.engine = engine.name;
              ael(inp, 'change', (evt) => {
                container.unsaved = true;
                container.rebuild = true;
                engine.enabled = evt.target.checked;
              });

              if (engine.query) {
                const d = DEFAULT_CONFIG.engines.find((e) => e.name === engine.name);
                const urlInp = make('input', {
                  type: 'text',
                  defaultValue: '',
                  value: decodeURIComponent(engine.query) ?? '',
                  placeholder: decodeURIComponent(d.query) ?? '',
                  dataset: {
                    name: nm,
                    engine: engine.name
                  },
                  onchange(evt) {
                    container.unsaved = true;
                    container.rebuild = true;
                    try {
                      engine.query = encodeURIComponent(new URL(evt.target.value).toString());
                    } catch (ex) {
                      err(ex);
                    }
                  }
                });
                lb.append(urlInp);
              }
              if (engine.name === 'github') {
                const ghToken = make('input', {
                  type: 'text',
                  defaultValue: '',
                  value: engine.token ?? '',
                  placeholder: 'Paste Access Token',
                  dataset: {
                    engine: 'github-token'
                  },
                  onchange(evt) {
                    container.unsaved = true;
                    container.rebuild = true;
                    engine.token = evt.target.value;
                  }
                });
                lb.append(ghToken);
                cfgMap.set('github-token', ghToken);
              }
            }
          }
        } else {
          if (type === 'text') {
            inp.defaultValue = '';
            inp.value = value ?? '';
            inp.placeholder = value ?? '';
          }

          lb.append(inp);
        }

        return lb;
      };
      if (isGM) {
        makeRow(i18n$('userjs_sync'), 'cache');
        makeRow(i18n$('userjs_autoinject'), 'autoinject', 'checkbox', 'load');
      }
      makeRow(i18n$('redirect'), 'sleazyredirect');
      makeRow(`${i18n$('dtime')} (ms)`, 'time', 'number', 'general', {
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
          container.unsaved = true;
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

      makeRow(i18n$('auto_fetch'), 'autofetch', 'checkbox', 'load');
      makeRow(i18n$('userjs_fullscreen'), 'autoexpand', 'checkbox', 'load', {
        onchange(e) {
          if (e.target.checked) {
            dom.cl.add([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('collapse'));
          } else {
            dom.cl.remove([btnfullscreen, main], 'expanded');
            dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('expand'));
          }
        }
      });
      makeRow('Clear on Tab close', 'clearTabCache', 'checkbox', 'load');

      makeRow('Default Sort', 'autoSort', 'select', 'list');
      makeRow(i18n$('filter'), 'filterlang', 'checkbox', 'list');
      makeRow(i18n$('preview_code'), 'preview-code', 'checkbox', 'list');
      makeRow('Preview Metadata', 'preview-metadata', 'checkbox', 'list');
      makeRow('Recommend author', 'recommend-author', 'checkbox', 'list');
      makeRow('Recommend scripts', 'recommend-others', 'checkbox', 'list');

      for (const [k, v] of Object.entries(cfg.filters)) {
        makeRow(v.name, `filters-${k}`, 'checkbox', 'filters');
      }

      makeRow('Greasy Fork', 'greasyfork', 'checkbox', 'engine');
      makeRow('Sleazy Fork', 'sleazyfork', 'checkbox', 'engine');
      makeRow('Open UserJS', 'openuserjs', 'checkbox', 'engine');
      makeRow('GitHub API', 'github', 'checkbox', 'engine');

      for (const [k, v] of Object.entries(cfg.theme)) {
        const lb = make('label', 'hidden', {
          textContent: k,
          dataset: {
            theme: k
          }
        });
        const inp = make('input', {
          type: 'text',
          defaultValue: '',
          value: v ?? '',
          placeholder: v ?? '',
          dataset: {
            theme: k
          },
          onchange(evt) {
            let isvalid = true;
            try {
              const val = evt.target.value;
              const sty = container.root.style;
              const str = `--mujs-${k}`;
              const prop = sty.getPropertyValue(str);
              if (isEmpty(val)) {
                cfg.theme[k] = DEFAULT_CONFIG.theme[k];
                sty.removeProperty(str);
                return;
              }
              if (prop === val) {
                return;
              }
              sty.removeProperty(str);
              sty.setProperty(str, val);
              cfg.theme[k] = val;
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
        cfgMap.set(k, inp);
        lb.append(inp);
        sections.theme.append(lb);
      }

      // const blacklist = make('textarea', {
      //   dataset: {
      //     name: 'blacklist'
      //   },
      //   rows: '10',
      //   autocomplete: false,
      //   spellcheck: false,
      //   wrap: 'soft',
      //   value: JSON.stringify(cfg.blacklist, null, ' '),
      //   oninput(evt) {
      //     let isvalid = true;
      //     try {
      //       cfg.blacklist = JSON.parse(evt.target.value);
      //       isvalid = true;
      //     } catch (ex) {
      //       err(ex);
      //       isvalid = false;
      //     } finally {
      //       if (isvalid) {
      //         dom.cl.remove(evt.target, 'mujs-invalid');
      //         dom.prop(savebtn, 'disabled', false);
      //       } else {
      //         dom.cl.add(evt.target, 'mujs-invalid');
      //         dom.prop(savebtn, 'disabled', true);
      //       }
      //     }
      //   }
      // });
      // cfgMap.set('blacklist', blacklist);
      // const addList = make('mujs-add', {
      //   textContent: '+',
      //   dataset: {
      //     command: 'new-list'
      //   }
      // });
      // const n = make('input', {
      //   type: 'text',
      //   defaultValue: '',
      //   value: '',
      //   placeholder: 'Name',
      // });
      // const inpValue = make('input', {
      //   type: 'text',
      //   defaultValue: '',
      //   value: '',
      //   placeholder: 'Value',
      // });
      // const label = make('label', 'new-list hidden', {
      //   dataset: {
      //     blacklist: 'new-list'
      //   }
      // });
      // label.append(n, inpValue, addList);
      // listSec.append(label);
      // ael(addList, 'click', () => {
      //   if (isEmpty(n.value) || isEmpty(inpValue.value)) {
      //     return
      //   };
      //   createList(n.value, n.value, inpValue.value);
      // });
      const createList = (key, v = '', disabled = false, type = 'String') => {
        let txt = key;
        if (typeof key === 'string') {
          if (key.startsWith('userjs-')) {
            disabled = true;
            const s = key.substring(7);
            txt = `Built-in "${s}"`;
            v = builtinList[s];
          }
        } else {
          if (!key.enabled) {
            return;
          }
        }

        if (isRegExp(v)) {
          v = v.toString();
          type = 'RegExp';
        } else {
          v = JSON.stringify(v);
          type = 'Object';
        }

        const lb = make('label', 'hidden', {
          textContent: txt,
          dataset: {
            blacklist: key
          }
        });
        const inp = make('input', {
          type: 'text',
          defaultValue: '',
          value: v ?? '',
          placeholder: v ?? '',
          dataset: {
            blacklist: key
          },
          onchange(evt) {
            let isvalid = true;
            try {
              const val = evt.target.value;
              if (isEmpty(val)) {
                return;
              }
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
        const selType = make('select', {
          disabled,
          dataset: {
            blacklist: key
          }
        });
        if (disabled) {
          inp.readOnly = true;
          const o = make('option', {
            value: type,
            textContent: type
          });
          selType.append(o);
        } else {
          for (const selV of ['String', 'RegExp', 'Object']) {
            const o = make('option', {
              value: selV,
              textContent: selV
            });
            selType.append(o);
          }
        }
        selType.value = type;
        lb.append(inp, selType);
        sections.blacklist.append(lb);
      };
      for (const key of cfg.blacklist) {
        createList(key);
      }

      const transfers = {
        export: {
          cfg: make('mujs-btn', 'mujs-export sub-section hidden', {
            textContent: i18n$('export_config'),
            dataset: {
              command: 'export-cfg',
              exp: 'export-cfg'
            }
          }),
          theme: make('mujs-btn', 'mujs-export sub-section hidden', {
            textContent: i18n$('export_theme'),
            dataset: {
              command: 'export-theme',
              exp: 'export-theme'
            }
          })
        },
        import: {
          cfg: make('mujs-btn', 'mujs-import sub-section hidden', {
            textContent: i18n$('import_config'),
            dataset: {
              command: 'import-cfg',
              exp: 'import-cfg'
            }
          }),
          theme: make('mujs-btn', 'mujs-import sub-section hidden', {
            textContent: i18n$('import_theme'),
            dataset: {
              command: 'import-theme',
              exp: 'import-theme'
            }
          })
        }
      };
      for (const value of Object.values(transfers)) {
        for (const v of Object.values(value)) {
          sections.exp.append(v);
        }
      }

      cfgpage.append(cbtn);
    };
    // #endregion
    container.tab.custom = (host) => {
      MUList.host = host;
      respHandles.build();
    };
    ael(mainframe, 'mouseenter', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      evt.target.style.opacity = container.opacityMax;
      frameTimeout.clear(...frameTimeout.ids);
    });
    ael(mainframe, 'mouseleave', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      evt.target.style.opacity = container.opacityMin;
      timeoutFrame();
    });
    ael(mainframe, 'click', (evt) => {
      evt.preventDefault();
      frameTimeout.clear(...frameTimeout.ids);
      dom.cl.remove(main, 'hidden');
      dom.cl.add(mainframe, 'hidden');
      if (cfg.autoexpand) {
        dom.cl.add([btnfullscreen, main], 'expanded');
        dom.prop(btnfullscreen, 'innerHTML', iconSVG.load('collapse'));
      }
      if (dom.cl.has(mainframe, 'error')) {
        tab.create('mujs:settings');
      }
    });
    ael(urlBar, 'input', (evt) => {
      evt.preventDefault();
      if (urlBar.placeholder === i18n$('newTab')) {
        return;
      }
      /**
       * @type { string }
       */
      const val = evt.target.value;
      const section = qsA('mujs-section[data-name]', cfgpage);
      if (isEmpty(val)) {
        dom.cl.remove(container.toElem(), 'hidden');
        dom.cl.remove(section, 'hidden');
        return;
      }
      const finds = new Set();
      if (!dom.cl.has(cfgpage, 'hidden')) {
        const reg = new RegExp(val, 'gi');
        for (const elem of section) {
          if (!isElem(elem)) {
            continue;
          }
          if (finds.has(elem)) {
            continue;
          }
          if (elem.dataset.name.match(reg)) {
            finds.add(elem);
          }
        }
        dom.cl.add(section, 'hidden');
        dom.cl.remove([...finds], 'hidden');
        return;
      }
      const cacheValues = container.toArr().filter(({ _mujs }) => {
        return !finds.has(_mujs.root);
      });
      /**
       * @param {RegExpMatchArray} regExp
       * @param {keyof import("../typings/types.d.ts").GSForkQuery} key
       */
      const ezQuery = (regExp, key) => {
        const q_value = val.replace(regExp, '');
        const reg = new RegExp(q_value, 'gi');
        for (const v of cacheValues) {
          let k = v[key];
          if (typeof k === 'number') {
            k = `${v[key]}`;
          }
          if (k && k.match(reg)) {
            finds.add(v._mujs.root);
          }
        }
      };
      if (val.match(/^(code_url|url):/)) {
        ezQuery(/^(code_url|url):/, 'code_url');
      } else if (val.match(/^(author|users?):/)) {
        const parts = /^[\w_]+:(.+)/.exec(val);
        if (parts) {
          const reg = new RegExp(parts[1], 'gi');
          for (const v of cacheValues.filter((v) => !isEmpty(v.users))) {
            for (const user of v.users) {
              for (const value of Object.values(user)) {
                if (typeof value === 'string' && value.match(reg)) {
                  finds.add(v._mujs.root);
                } else if (typeof value === 'number' && `${value}`.match(reg)) {
                  finds.add(v._mujs.root);
                }
              }
            }
          }
        }
      } else if (val.match(/^(locale|i18n):/)) {
        ezQuery(/^(locale|i18n):/, 'locale');
      } else if (val.match(/^id:/)) {
        ezQuery(/^id:/, 'id');
      } else if (val.match(/^license:/)) {
        ezQuery(/^license:/, 'license');
      } else if (val.match(/^name:/)) {
        ezQuery(/^name:/, 'name');
      } else if (val.match(/^description:/)) {
        ezQuery(/^description:/, 'description');
      } else if (val.match(/^(search_engine|engine):/)) {
        const parts = /^[\w_]+:(\w+)/.exec(val);
        if (parts) {
          const reg = new RegExp(parts[1], 'gi');
          for (const { _mujs } of cacheValues) {
            if (!_mujs.info.engine.name.match(reg)) {
              continue;
            }
            finds.add(_mujs.root);
          }
        }
      } else if (val.match(/^filter:/)) {
        const parts = /^\w+:(.+)/.exec(val);
        if (parts) {
          const bsFilter = loadFilters();
          const filterType = bsFilter.get(parts[1].trim().toLocaleLowerCase());
          if (filterType) {
            const { reg } = filterType;
            for (const { name, users, _mujs } of cacheValues) {
              if ([{ name }, ...users].find((o) => o.name.match(reg))) {
                continue;
              }
              finds.add(_mujs.root);
            }
          }
        }
      } else if (val.match(/^recommend:/)) {
        for (const { url, id, users, _mujs } of cacheValues) {
          if (
            users.find((u) => u.id === authorID) ||
            goodUserJS.includes(url) ||
            goodUserJS.includes(id)
          ) {
            finds.add(_mujs.root);
          }
        }
      } else {
        const reg = new RegExp(val, 'gi');
        for (const v of cacheValues) {
          if (v.name && v.name.match(reg)) finds.add(v._mujs.root);
          if (v.description && v.description.match(reg)) finds.add(v._mujs.root);
          if (v._mujs.code.data_meta) {
            for (const key of Object.keys(v._mujs.code.data_meta)) {
              if (/name|desc/i.test(key) && key.match(reg)) finds.add(v._mujs.root);
            }
          }
        }
      }
      dom.cl.add(qsA('tr[data-engine]', tabbody), 'hidden');
      dom.cl.remove([...finds], 'hidden');
    });
    ael(urlBar, 'change', (evt) => {
      evt.preventDefault();
      const val = evt.target.value;
      const tabElem = tab.getActive();
      if (urlBar.placeholder === i18n$('newTab') && tabElem) {
        const tabHost = tabElem.firstElementChild;
        if (tab.protoReg.test(val)) {
          const createdTab = tab.getTab(val);
          tab.close(tabElem);
          if (createdTab) {
            tab.active(createdTab);
          } else {
            tab.create(val);
          }
          evt.target.placeholder = i18n$('search_placeholder');
          evt.target.value = '';
          return;
        } else if (val === '*') {
          tabElem.dataset.host = val;
          tabHost.title = '<All Sites>';
          tabHost.textContent = '<All Sites>';
          MUList.host = val;
          respHandles.build();
          return;
        }
        const value = container.getHost(val);
        if (container.checkBlacklist(value)) {
          showError(`Blacklisted "${value}"`);
          return;
        }
        tabElem.dataset.host = value;
        tabHost.title = value;
        tabHost.textContent = value;
        MUList.host = value;
        respHandles.build();
      }
    });
    scheduler.postTask(makecfg, { priority: 'background' });

    respHandles.build = async () => {
      const time = await scheduler.postTask(MUList.build, { priority: 'background' });
      return timeoutFrame(time);
    };

    if (cfg.autofetch) {
      respHandles.build();
    }
    dbg('Container', container);
  } catch (ex) {
    err(ex);
    container.remove();
  }
  return respHandles;
}
// #endregion
/**
 * @template { Function } F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (isFN(onDomReady)) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomReady(document);
    } else {
      document.addEventListener('DOMContentLoaded', (evt) => onDomReady(evt.target), {
        once: true
      });
    }
  }
};

const init = async (prefix = 'Config') => {
  const stored = await StorageSystem.getValue(prefix, DEFAULT_CONFIG);
  cfg = {
    ...DEFAULT_CONFIG,
    ...stored
  };
  info('Config:', cfg);
  loadDOM((doc) => {
    try {
      if (window.location === null) {
        throw new Error('"window.location" is null, reload the webpage or use a different one', {
          cause: 'loadDOM'
        });
      }
      if (doc === null) {
        throw new Error('"doc" is null, reload the webpage or use a different one', {
          cause: 'loadDOM'
        });
      }
      container.redirect();

      if (cfg.autoinject) container.inject(primaryFN, doc);

      Command.register(i18n$('userjs_inject'), () => {
        container.inject(primaryFN, doc);
      });
      Command.register(i18n$('userjs_close'), () => {
        container.remove();
      });
    } catch (ex) {
      err(ex);
    }
  });
};
init();

})();
