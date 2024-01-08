<script setup>
import { onMounted, inject, watchEffect } from "vue";
import store from "./store";
import translationFunctions from "./translation-composable";
import { useI18n } from "vue-i18n";
import moment from "moment";
import "moment/dist/locale/nl";
import "moment/dist/locale/en-gb";

const pageTitle = import.meta.env.VITE_CLIENT_NAME || "Default Title";
const { locale } = useI18n();


watchEffect(() => {
  moment.locale(locale.value);
});
onMounted(() => {
  document.title = pageTitle;
});

// const user = inject('user')

translationFunctions();

onMounted(() => {
  const storedLang = localStorage.getItem("lang");
  const defaultLang = storedLang ?? "en";
  localStorage.setItem("lang", defaultLang);
});
</script>

<template>
  <router-view />
</template>
