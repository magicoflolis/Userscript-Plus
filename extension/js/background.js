const countApi = 'https://greasyfork.org/scripts/by-site.json',
  adultAPI = 'https://sleazyfork.org/scripts/by-site.json',
  sleazy = browser.runtime.getURL("js/sleazyfork.js"),
  greasy = document.location.host,
  s = document.createElement("script");
  s.type = "module";
  s.src = sleazy;
  s.crossOrigin = "anonymous";

function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    let queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      let tab = tabs[0],
      url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');
  
      callback(url);
    });
  }

  function getUrlHost(url) {
    let a = document.createElement('a');
    a.href = url;
    let mainHost = psl.get(a.hostname) || a.hostname.split('.').splice(-2).join('.')
    return mainHost;
  }

  function changeBadge(data) {
    getCurrentTabUrl(function (url) {
      let host = getUrlHost(url),
        count = data[host];
      count = count > 50 ? 50 : count;
      sessionStorage.setItem('host', host);
      if (count) {
        chrome.browserAction.setBadgeText({
          text: count.toString()
        });
      } else {
        chrome.browserAction.setBadgeText({
          text: ''
        });
      }
    });
  }
fetch(adultAPI).then((r) => {
  r.json().then((data) => {
      console.log('count data loaded!');
      chrome.tabs.onUpdated.addListener(() => {
        changeBadge(data);
      });
      chrome.tabs.onActivated.addListener(() => {
        changeBadge(data);
      });
  });
});
fetch(countApi).then((r) => {
  r.json().then((data) => {
      console.log('count data loaded!');
      chrome.tabs.onUpdated.addListener(() => {
        changeBadge(data);
      });
      chrome.tabs.onActivated.addListener(() => {
        changeBadge(data);
      });
  });
});