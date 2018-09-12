// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import config from "../static/config"
import Cookies from "js-cookie"
import VueI18n from 'vue-i18n'
import en from '../static/lang/en'
import zh from '../static/lang/zh'

Vue.use(VueI18n)

Vue.config.productionTip = false
Vue.use(ElementUI)

const i18n = new VueI18n({
  locale:'zh',
  messages:{
    'zh':zh,
    'en':en
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
Vue.prototype.axios = axios;
Vue.prototype.Cookies = Cookies;
Vue.prototype.config = config;
