import { createI18n } from 'vue-i18n'
import { translations as translation } from './views/translations/index'

function getLocale() {
  const localLocale = localStorage.getItem('lang')
  if (localLocale) {
    return localLocale
  }
  return 'en'
}

export const i18n = createI18n({
  locale: getLocale(),
  legacy: false,
  messages: {
    en: {
      translation: translation.en
    },
    nl: {
      translation: translation.nl
    }
  }
})
