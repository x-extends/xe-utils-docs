import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import './styles/index.scss'

import PreCode from './components/PreCode.vue'
import CodeLight from './components/CodeLight.vue'
import CodeList from './components/CodeList.vue'
import CodeRender from './components/CodeRender.vue'
import CodeUseVersion from './components/CodeUseVersion.vue'
import ApiLink from './components/ApiLink.vue'

import axios from 'axios'
import XEUtils from 'xe-utils'

import VxeUIAll, { VxeUI } from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'

import enUS from 'vxe-pc-ui/es/language/en-US'

declare global {
  interface Window {
    XEUtils: typeof XEUtils;
    hljs: any
  }
}

window.XEUtils = XEUtils

axios.defaults.baseURL = process.env.VUE_APP_SERVE_API_URL

VxeUI.setI18n('en-US', enUS)

const app = createApp(App)

app.component('PreCode', PreCode)
app.component('CodeLight', CodeLight)
app.component('CodeList', CodeList)
app.component('CodeRender', CodeRender)
app.component('CodeUseVersion', CodeUseVersion)
app.component('ApiLink', ApiLink)

app.use(VxeUIAll)
app.use(VxeUITable)

app.use(store)
app.use(router)
app.use(i18n)

app.config.globalProperties.$t = i18n.global.t

axios.get(`${process.env.VUE_APP_SITE_BASE_URL}/i18n/${i18n.global.locale}.json?v=${process.env.VUE_APP_DATE_NOW}`).then(res => {
  i18n.global.setLocaleMessage(i18n.global.locale, res.data)
}).catch(e => e).then(() => {
  app.mount('#app')
})
