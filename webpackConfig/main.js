const iframe = {
	write: (iframeDom, content) => {
		if (iframeDom.tagName && "iframe" == iframeDom.tagName.toLowerCase()) {
		  let c = iframeDom.contentWindow.document;
		  try {
        c.open(),
        c.write(content),
        c.close()
		  } catch (d) {
        console.log("append HTML to [iframe:" + iframeDom.name + "] ERROR!")
		  }
		}
	}
},
qs = (element) => {
  return document.querySelector(element);
},
sleazy = () => {
  let otherSite=/greasyfork\.org/.test(location.hostname)?"sleazyfork":"greasyfork";
  qs('span.sign-in-link') ? /scripts\/\d+/.test(location.href) ? (!qs("#script-info") && (otherSite == "greasyfork" || qs("div.width-constraint>section>p>a"))) ? location.href=location.href.replace(/\/\/([^\.]+\.)?(greasyfork|sleazyfork)\.org/,"//$1"+otherSite+"\.org") : false : false : false;
};

class FetchUserjs {
  constructor() {
    this.host = window.location.hostname.split(".").splice(-2).join(".");
    this.showTime = 10;
    this.quietKey = "jae_fetch_userjs_quiet";
    this.countKey = "jae_fetch_userjs_count";
    this.adultKey = "jae_fetch_userjs_adult";
    this.tplBox = `<div id="jae_userscript_box">
    <style>.jae-userscript{
      position:fixed; 
      width:370px;
      bottom:10px;
      right:20px;
      z-index:9999999999;
      height:56px
    }
    .jae-userscript-shadow{
      box-shadow:0 1px 4px rgba(0,0,0,.3);
    }
    .jae-userscript-shadow::before,
    .jae-userscript-shadow::after{
      content:"";
      position:absolute;
      z-index:-1;
      bottom:15px;
      left:10px;
      width:50%;
      height:20%;
      box-shadow:0 15px 10px rgba(0,0,0,.7);
    }
    .jae-userscript-shadow::before{
      transform:rotate(-3deg)
    }
    .jae-userscript-shadow::after{
      right:10px;  left:auto;
      transform:rotate(3deg)
    }
    @media screen and (max-width:1228px) {
      .jae-userscript {
        max-width: 100%;
        width: 100%;
        height: 100%;
      }
    }
    </style><div class="jae-userscript"></div></div>`;
  }

  getCountData(host) {
    let countData = GM_getResourceText('count')
    countData = JSON.parse(countData)
    let count =  countData[host]
    sessionStorage.setItem(this.countKey, count)
    return count
  }

  setSize(w, h) {
    $('.jae-userscript').css({
      width: w,
      height: h
    })
  }

  addEventListener(eventName, handler) {
    qs('#jae_userscript_box').addEventListener(eventName, handler)
  }

  bindEvent() {
    this.timeId = setTimeout(() => {
      qs('#jae_userscript_box').remove();
    }, this.showTime * 1000);
    this.addEventListener('max', () => {
      this.setSize(860, 492)
      $('.jae-userscript').addClass('jae-userscript-shadow')
      clearTimeout(this.timeId);
    })
    this.addEventListener('min', () => {
      $('.jae-userscript').removeClass('jae-userscript-shadow')
      new Promise((resolve) => setTimeout(resolve, 500))
      this.setSize(370, 56)
    })
    this.addEventListener('close', () => {
      sessionStorage.setItem(this.quietKey, 1);
      qs('#jae_userscript_box').remove();
    })
    this.addEventListener('loading',() => {
      clearTimeout(this.timeId);
    })
  }

  execFrameJs(frameWindow) {
    let uiJs = GM_getResourceText('uiJs');
    return function(jsStr) {
      frameWindow.eval(jsStr);
    }.call(frameWindow, uiJs);
  }

  get isQuiet() {
    let quiet = sessionStorage.getItem(this.quietKey);
    return quiet ? true : false;
  }

  render() {
    if (!this.isQuiet) {
      let count = this.getCountData(this.host)
      if (count) {
        $("body").append(this.tplBox);
        let ui = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Show Site All UserJS</title></head><body style="background: none transparent"><div id="app"></div></body></html>',
        dom = document.getElementsByClassName('jae-userscript')[0];
        dom.innerHTML = '<iframe name="jaeFetchUserJSFrame" src="about:blank" style="width:100%;height:100%;border:0px;display: block!important;" allowTransparency="true"></iframe>';
        let iframeDom = dom.children[0];
        iframe.write(iframeDom, ui);
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