import { createApp } from 'vue';
import App from './App.vue';
import * as iView from '../web_accessible_resources/iview.min.js';
import '../web_accessible_resources/iview.css';
import { createI18n } from 'vue-i18n';
import localeMessage from './common/js/locale';

let nlang = navigator.language.toLowerCase();

nlang === 'zh' ? (nlang = 'zh-cn') : false;

const Vue = createApp(App);

Vue.use(iView);

Vue.locale = locale => {};

const i18n = createI18n({
  locale: localeMessage[nlang] ? nlang : 'en-us',
  messages: localeMessage
});

Vue.use(i18n);

new Vue({
  i18n,
  el: window.document.getElementById('app'),
  render: h => h(App)
});
