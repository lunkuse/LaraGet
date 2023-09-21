import * as types from './lang-types'

const state = () => {
  return {
    lang: 'nl'
  }
}

// getters
const getters = {
  switchLang: state => state.switchLang
}

// actions
const actions = {
  setLanguage({ commit }, switchLang) {
    commit(types.SET_LANGUAGE, { switchLang })
  }
}

// mutations
const mutations = {
  [types.SET_LANGUAGE](state, { switchLang }) {
    state.switchLang = switchLang
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
