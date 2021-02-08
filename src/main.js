import 'animate.css';
import 'iview/dist/styles/iview.css';

import Vue from 'vue';

import iView from 'iview';
import VueI18n from 'vue-i18n';

import App from './App.vue';
import localeMessage from './common/js/locale';

Vue.locale = (locale) => {

}

Vue.use(VueI18n)

Vue.use(iView)

let nlang = navigator.language.toLowerCase()
if (nlang === 'zh') {
  nlang = 'zh-cn'
}
let lang = localeMessage[nlang] ? nlang : 'en-us'

const i18n = new VueI18n({
  locale: lang,
  messages: localeMessage
})

let appEl = window.document.getElementById('app')

new Vue({ // eslint-disable-line no-new
  i18n,
  el: appEl,
  render: h => h(App)
})
