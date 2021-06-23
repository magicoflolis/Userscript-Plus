const countApi = "https://greasyfork.org/scripts/by-site.json",
  adultAPI = "https://sleazyfork.org/scripts/by-site.json",
  brws = typeof browser === "undefined" ? chrome : browser,
  getCurrentTabUrl = (callback) => {
    try {
    let queryInfo = {
      active: true,
      currentWindow: true,
    };
    brws.tabs.query(queryInfo, (tabs) => {
        let tab = tabs[0],
        url = tab.url;
        console.assert(typeof url == "string", "tab.url should be a string");
        callback(url);
    });
  } catch (e) {
    console.log(e);
    brws.browserAction.setBadgeText({
      text: "err",
    });
    return callback(url);
  }
  },
  getUrlHost = (url) => {
    let a = document.createElement("a");
    a.href = url;
    let mainHost =
      psl.get(a.hostname) ||
      a.hostname.split(".").splice(-2).join(".");
    return mainHost;
  },
  changeBadge = (cData) => {
    getCurrentTabUrl((url) => {
      let host = getUrlHost(url),
        count = cData[host];
      count = count > 50 ? 50 : count;
      sessionStorage.setItem("host", host);
      (count) ? brws.browserAction.setBadgeText({
        text: count.toString(),
      }) : brws.browserAction.setBadgeText({
        text: "",
      });
    });
  };

fetch(countApi).then((r) => {
  r.json().then((data) => {
    brws.tabs.onUpdated.addListener(() => {
      changeBadge(data);
    });
    brws.tabs.onActivated.addListener(() => {
      changeBadge(data);
    });
  });
});
fetch(adultAPI).then((r) => {
  r.json().then((data) => {
    brws.tabs.onUpdated.addListener(() => {
      changeBadge(data);
    });
    brws.tabs.onActivated.addListener(() => {
      changeBadge(data);
    });
  });
});
