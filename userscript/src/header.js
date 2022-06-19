{jshead}

/**
 * Enable built-in "Greasyfork Search with Sleazyfork Results include"
 * 启用内置"使用 Sleazyfork 搜索"结果包括"
 * 組み込みの「スライジーフォークの結果を含む脂っこく検索」を有効にする
 * Включить встроенный "Greasyfork Поиск с Sleazyfork Результаты включают"
 * https://greasyfork.org/scripts/23840
 */
 const sleazyfork_redirect = false, // "true" to enable, "false" to disable
 /**
 * Injected stylesheet
 * https://github.com/magicoflolis/Userscript-Plus/tree/master/src/sass
 */
 boxCSS = `{boxCSS}`,
 err = (...error) => {
    console.error('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', ...error);
  };

 if(typeof unsafeWindow === "undefined") {
   err('[%cUserJS%c] %cERROR', 'color: rgb(29, 155, 240);', '', 'color: rgb(249, 24, 128);', "Unsupported: unsafeWindow");
 } else {
  unsafeWindow.GmAjax = GM_xmlhttpRequest;
 };

{code}
