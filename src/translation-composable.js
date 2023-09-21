import { computed, provide } from "vue";
// import store from '../../../MetaDent-FE-Production/src/store'
import store from './store'
export default function translationFunctions() {
    const translation = computed(() => store.getters.getElementTranslation)

    const translation_v2 = computed(() => store.getters.getElementTranslationV2)

    const translation_v3 = computed(() => store.getters.getElementTranslationV3)

    provide('translation', translation)

    provide('translation_v2', translation_v2)

    provide('translation_v3', translation_v3)

    return {
        translation,
        translation_v2,
        translation_v3,
    }
}