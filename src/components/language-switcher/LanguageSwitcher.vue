<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <!-- <div
    class="dark-mode-switcher cursor-pointer shadow-md fixed top-12 2xl:top-8 xl:top-8 
    lg:top-8 md:top-8 right-0  dark:bg-dark-2 border w-auto h-auto   mb-10 mr-10 "
 
  >
    <TomSelect v-model="lang" @change="languagechange" class="cursor-pointer w-full bg-red">
      <option value="en" selected="selected">English</option>
      <option value="nl">🇳🇱 Dutch</option>
    </TomSelect>
  </div> -->

  <div
    class="dark-mode-switcher cursor-pointer fixed top-2 right-0 dark:bg-dark-2 h-12 flex items-center justify-center z-50 mb-10 mr-10"
  >
    <TomSelect v-model="lang" @change="languagechange" class="cursor-pointer">
      <option value="en" selected="selected">🇺🇸 {{ $t('translation.english_text') }}</option>
      <option value="nl">🇳🇱 {{ $t('translation.dutch_text') }}</option>
    </TomSelect>
  </div>
  <!-- END: Dark Mode Switcher-->
</template>

<script>
import { defineComponent, onMounted, computed, inject, ref } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  data() {
    return {};
  },
  methods: {},
  created() {},
  setup() {
    const store = useStore();
    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "nl";
    const lang = ref(defaultLang);
    // const lang = ref(localStorage.getItem('lang') ?? 'nl')
    console.log("initial lang", lang);
    const translations = inject("translation_v3");
    const languagechange = () => {
      localStorage.setItem("lang", lang.value);
      location.reload();
    };

    onMounted(() => {
      localStorage.setItem("lang", lang.value);
    });

    return {
      translations,
      languagechange,
      lang,
    };
  },
});
</script>
