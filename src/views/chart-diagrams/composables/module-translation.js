import { ref, onMounted } from 'vue';

export function useTranslations() {

    let translation = ref({});

    onMounted(() => {

        let finalTranslations = localStorage.getItem('translations');

        translation.value = JSON.parse(finalTranslations);

    });

    return { translation }

}