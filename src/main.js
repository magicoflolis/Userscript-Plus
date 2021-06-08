import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'animate.css'
import VueI18n from 'vue-i18n'
import localeMessage from './common/js/locale'

Vue.locale = (locale) => {

}

Vue.use(VueI18n)

Vue.use(iView)

let nlang = navigator.language.toLowerCase();

(nlang === 'zh') ? nlang = 'zh-cn' : false;

const i18n = new VueI18n({
  locale: localeMessage[nlang] ? nlang : 'en-us',
  messages: localeMessage
})

new Vue({       // eslint-disable-line no-new
  i18n,
  el: window.document.getElementById('app'),
  render: h => h(App)
})
