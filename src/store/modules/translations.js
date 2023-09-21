// import axios from "axios";
// import customAxios from "../../custom-axios";
import axios from 'axios'

export const state = {
  translations: {},
  translations_v2: [],
  translations_v3: [],
  languages: null,
};

export const getters = {
  getElementTranslationV3: (state) => {
    return state.translations;
  }
};

export const actions = {
  async fetchTranslations({ commit, state }) {
    // if (state.translations) return;
    try {
      const response = await axios.get('translations/all')
      const { payload, status, error } = response.data
      if (status) {
        commit('UPDATE_TRANSLATIONS', payload)
      }
      else throw error

    } catch ($ex) {
      console.log('Translation Error', $ex)
    }
  },

};

export const mutations = {
  UPDATE_TRANSLATIONS(state, translationsBatch) {

    const trans = translationsBatch.reduce((x, y) => Object.assign(Object.values(x), y), {}).reduce((x, y) => Object.assign(Object.values(x), y), {});

    const obj = trans.flatMap((b) => {
      return { [b.slug]: b.translation }
    }).reduce((x, y) => Object.assign(x, y), {})

    state.translations = obj;
  },

};
