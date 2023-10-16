import { createStore } from 'vuex'
import { auth } from './auth'
import main from './main'
import sideMenu from './side-menu'
// import simpleMenu from './simple-menu'
import topMenu from './top-menu'
import langstore from './langstore'
import { allappointments } from './appointments'
import {allinvoices} from './invoices'

import * as translations from './modules/translations'
import {slots} from './slots'
const store = createStore({
  modules: {
    main,
    sideMenu,
    topMenu,
    auth,
    translations,
    langstore,
    
    allappointments,
    allinvoices
  }
})

export function useStore() {
  return store
}

export default store
