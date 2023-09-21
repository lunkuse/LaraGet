<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <div
    class="dark-mode-switcher cursor-pointer shadow-md fixed bottom-12 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10"
    @click="switchMode"
  >
    <div class="mr-4 text-gray-700 dark:text-gray-300">
      {{ $t("translation.global.darkMode") }}
    </div>

    <div
      :class="{ 'dark-mode-switcher__toggle--active': darkMode }"
      class="dark-mode-switcher__toggle border"
    ></div>
  </div>
  <span class="bottom-text mr-auto z-50 box fixed">{{ version }}</span>
  <!-- END: Dark Mode Switcher-->
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "@/store";
import $ from "cash-dom";
export default defineComponent({
  data() {
    return { version: import.meta.env.VITE_APP_VERSION };
  },
  methods: {},
  created() {},
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.main.darkMode);

    const setDarkModeClass = () => {
      darkMode.value
        ? $("html").addClass("dark")
        : $("html").removeClass("dark");
    };
    const switchMode = () => {
      store.dispatch("main/setDarkMode", !darkMode.value);
      setDarkModeClass();
    };

    onMounted(() => {
      setDarkModeClass();
    });

    return {
      switchMode,
      darkMode,
    };
  },
});
</script>
<style scoped>
.bottom-text {
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 4px;
  background-color: #2e2d2d;
  color: white;
}
</style>
