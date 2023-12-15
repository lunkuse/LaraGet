import { createApp } from 'vue'
// import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import globalComponents from './global-components'
import utils from './utils'
import './libs'
import VueTelInput from 'vue-tel-input'
import './axios'
import './main'
import 'vue-tel-input/dist/vue-tel-input.css'
import print from 'vue3-print-nb'
import Chat from 'vue3-beautiful-chat'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import './assets/sass/app.scss'

import './assets/sass/components/_datatable.scss'
import './translate.css'
import VueFileAgentNext from '@boindil/vue-file-agent-next'

import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'
import { i18n } from './translations.js'
import { createPinia } from 'pinia';
const pinia =  createPinia();
const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(VueTelInput)
  .use(print)
  .use(i18n)
  .use(pinia)
  .use(VueFileAgentNext)
// .use(Chat)

globalComponents(app)
utils(app)

app.mount('#app')
