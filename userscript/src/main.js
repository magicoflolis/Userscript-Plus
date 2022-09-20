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
