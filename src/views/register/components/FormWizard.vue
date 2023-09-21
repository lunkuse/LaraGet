<template>
   <div class="  w-full pr-3 ">
    <router-link to="/">
      
    </router-link>
   
    <div class="hidden flex items-center">
      <!-- <div
          class="!rounded-full flex items-center justify-center h-8 w-8 border text-gray-800 font-sans border-yellow-650 p-4 cursor-pointer"
          @click="linearTravel(headers.length)">
        {{ headers.length }}
      </div> -->
    </div>
  </div>


  <h1 class="text-xl text-gray-800 font-sans ml-2 my-2 capitalize"
     >
    {{ $t('translation.auth.signUp') }}
  </h1>
  
 
    <slot/>
  
</template>

<script setup>
import {useForm, useIsSubmitting} from 'vee-validate';
import {ref, computed, provide, inject} from 'vue';
import Button from './Button.vue';
import PreviewModal from '../components/PreviewModal.vue';
import {ChevronLeftIcon} from '@heroicons/vue/solid';
import FamilyMemberModal from '../components/FamilyMemberModal.vue';
import {useI18n} from "vue-i18n";

const {t} = useI18n();


// const props = defineProps({
//   validationSchema: {
//     type: Array,
//     required: true,
//   },
//   initialValues: {
//     type: Object,
//     required: true,
//   }
// });

// const isPreviewVisible = ref(false)

// const openPreviewModal = () => {
//   isPreviewVisible.value = true;
// };

// const closePreviewModal = () => {
//   isPreviewVisible.value = false;
// }

// const isFamilyVisible = ref(false);

// const openFamilyModal = () => {
//   isFamilyVisible.value = true;
// };
// const closeFamilyModal = () => {
//   isFamilyVisible.value = false;
// }

// const headers = ref([t('translation.global.register')])

// const emit = defineEmits(['submit']);
// const currentStepIdx = ref(0);

// const isSubmitting = useIsSubmitting()

// Injects the starting step, child <form-steps> will use this to generate their ids
// const stepCounter = ref(0);
// provide('STEP_COUNTER', stepCounter);

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
// provide('CURRENT_STEP_INDEX', currentStepIdx);

// if this is the last step
// const isLastStep = computed(() => {
//   return currentStepIdx.value === stepCounter?.value - 1;
// });

// If the `previous` button should appear
// const hasPrevious = computed(() => {
//   return currentStepIdx?.value > 0;
// });










</script>

<style>
.progress {
  animation-fill-mode: forwards;
}
</style>
