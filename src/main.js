import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import "iview/dist/styles/iview.css";
import VueI18n from "vue-i18n";
import localeMessage from "./common/js/locale";

Vue.use(VueI18n);

Vue.use(iView);

Vue.locale = locale => {};

let nlang = navigator.language.toLowerCase();

nlang === "zh" ? (nlang = "zh-cn") : false;

const i18n = new VueI18n({
  locale: localeMessage[nlang] ? nlang : "en-us",
  messages: localeMessage
});

new Vue({
  i18n,
  el: window.document.getElementById("app"),
  render: h => h(App)
});
