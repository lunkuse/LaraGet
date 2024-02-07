<template>

  <!-- <ul
    class="flex list-reset border border-yellow-650/95 rounded-md w-auto font-sans"
    v-if="pagination && pagination.last_page > 1"
  > -->
  <ul
    class="flex w-full mr-auto sm:w-auto sm:mr-auto "
    v-if="pagination && pagination.last_page > 1"
  >
  <!--   class="border-r border-yellow-650 hover:bg-theme-1/80 group" -->
  <!--  @click="change(pagination.from)" -->
    <li
    class="flex-1 sm:flex-initial hover:bg-theme-1 group"
    
      v-if="pagination.current_page > 1"
      @click="change(1)"
    >
      <div
        class="flex relative items-center justify-center h-full px-2 cursor-pointer"
      >
        <div
          class="ease-in-out transition-all delay-250 opacity-0 w-14 bg-gray-800 text-white text-center text-xs rounded-lg mb-1 py-2 absolute z-10 group-hover:opacity-100 bottom-full px-3 pointer-events-none"
        >
          {{ t("translation.first_text") }}
          <svg
            class="absolute text-gray-800 h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xml:space="preserve"
          >
            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
        <ChevronDoubleLeftIcon
          class="h-5 w-5 text-theme-1 group-hover:text-white"
        />
      </div>
    </li>
    <li v-if="pagination.current_page > 1">
      <a
        class="block hover:text-white hover:bg-theme-1 text-theme-1 border-r border-yellow-650 px-3 py-2"
        href="#"
        @click.prevent="change(pagination.current_page - 1)"
      >
        {{ t("translation.previous_text") }}
      </a>
    </li>
    <li v-for="page in pages" :key="page">
      <a
        :class="[
          page == pagination.current_page
            ? 'text-white bg-theme-1/90 border-r border-yellow-650'
            : 'hover:text-white hover:bg-theme-1 text-gray-600 border-r border-yellow-650/95',
          'block px-3 py-2',
        ]"
        href="#"
        @click.stop="change(page)"
      >
        {{ page }}
      </a>
    </li>
    <li v-if="pagination.current_page < pagination.last_page">
      <a
        class="block hover:text-white hover:bg-theme-1 text-theme-1 px-3 py-2"
        href="#"
        @click.prevent="change(pagination.current_page + 1)"
      >
        {{ t("translation.next_text") }}
      </a>
    </li>
    <li
      class="border-l border-yellow-650 hover:bg-theme-1/80 group"
      v-if="pagination.current_page < pagination.last_page"
      @click="change(pagination.last_page)"
    >
      <div class="flex relative items-center justify-center h-full px-2">
        <div
          class="ease-in-out transition-all delay-250 opacity-0 w-14 bg-gray-800 text-white text-center text-xs rounded-lg mb-1 py-2 absolute z-10 group-hover:opacity-100 bottom-full px-3 pointer-events-none"
        >
          {{ t("translation.last_text") }}
          <svg
            class="absolute text-gray-800 h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xml:space="preserve"
          >
            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
        <ChevronDoubleRightIcon
          class="h-5 w-5 text-theme-1 group-hover:text-white"
        />
      </div>
    </li>
  </ul>

  <form
    @submit.prevent="goToPage"
    v-if="pagination && pagination.last_page > 1"
  >
    <div class="relative">
      <input
        v-model="pageToGo"
        type="number"
        class="bg-gray-50 font-sans border h-9 focus:border-2 transition ease-in-out rounded-md ml-10 p-2"
        :class="
          wrongInput === true
            ? 'inputWrong border-theme-43 border-2'
            : 'border-theme-1'
        "
        :placeholder="t('translation.goTo')"
      />
      <span class="absolute inset-y-0 right-0 flex items-center pl-2">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <ArrowCircleRightIcon
            class="w-5 h-5 "
            :class="
              wrongInput === true
                ? 'inputWrong text-red-600'
                : 'hover:text-theme-1'
            "
          />
        </button>
      </span>
      <span
        class="absolute inset-y-0 -right-8 flex items-center pl-2"
        v-if="pageToGo"
      >
        <button
          type="button"
          class="p-1 focus:outline-none focus:shadow-outline"
          @click="clearPage"
        >
          <XCircleIcon
            class="w-5 h-5 "
            :class="
              wrongInput === true
                ? 'inputWrong text-red-600'
                : 'hover:text-red-600'
            "
          />
        </button>
      </span>
    </div>
  </form>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowCircleRightIcon,
  XCircleIcon,
} from "@heroicons/vue/outline";
// import Button from '../buttons/Button.vue';
import Button from "@/components/shared/buttons/Button.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["paginate"]);
const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
  offset: {
    type: Number,
    default: 4,
  },
});

const pageToGo = ref(null);
watch(
  () => props.pagination,
  (newPagination, oldPagination) => {
    // This function will be called whenever the 'pagination' prop changes.
    console.log("Pagination prop changed", newPagination);
    props.pagination = newPagination;
    // You can perform any actions here based on the new and old values.
  }
);

const pages = computed(() => {
  if (!props?.pagination?.to) {
    return null;
  }
  let from = props?.pagination?.current_page - props?.offset;
  if (from < 1) {
    from = 1;
  }
  let to = from + props?.offset * 2;
  if (to >= props?.pagination?.last_page) {
    to = props?.pagination?.last_page;
  }
  let pages = [];
  for (let page = from; page <= to; page++) {
    pages.push(page);
  }
  return pages;
});

const change = (page) => {
  props.pagination.current_page = page;
  emit("paginate", page);
};
const wrongInput = ref(false);

const goToPage = () => {
  if (pageToGo.value > props.pagination.last_page) {
    wrongInput.value = true;
    setTimeout(() => {
      wrongInput.value = false;
    }, 400);
  } else if (!pageToGo.value) {
    change(props.pagination.from);
  } else {
    change(pageToGo.value);
  }
};

const clearPage = () => {
  pageToGo.value = null;
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.inputWrong {
  @apply animate-[shake_0.82s_cubic-bezier(.36,0.07,0.19,0.97)_both];
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
