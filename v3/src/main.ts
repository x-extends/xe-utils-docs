import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import './styles/index.scss'

import axios from 'axios'
import XEUtils from 'xe-utils'

declare global {
  interface Window {
    XEUtils: typeof XEUtils;
    hljs: any
  }
}

window.XEUtils = XEUtils

axios.defaults.baseURL = process.env.VUE_APP_SERVE_API_URL

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)

app.config.globalProperties.$t = i18n.global.t

// axios.get(`${process.env.VUE_APP_SITE_BASE_URL}/i18n/${i18n.global.locale}.json?v=${process.env.VUE_APP_DATE_NOW}`).then(res => {
//   i18n.global.setLocaleMessage(i18n.global.locale, res.data)
// }).catch(e => e).then(() => {
app.mount('#app')
// })
