<template>
    <TransitionRoot
      as="template"
      :show="props.showInvoiceModal"
    

      class="bg-white dark:bg-dark-1 text-gray-800 dark:text-white z-10"
    >
      <Dialog as="div" class="relative z-10" @close="toggleModal">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
          zIndex="100"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
  
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300 z-10"
              enter-from="opacity-0 transla te-y-4 z-10 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 transl ate-y-0 z-10 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 z-10 sm:scale-100"
              leave-to="opacity-0 translate-y-4  z-10sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
              style="z-index: 9999!important;"
                class="z-50 modal-body  overflow-auto bg-gray-100 dark:bg-dark-1    rounded-lg text-left  shadow-xl transform transition-all   lg:w-2/3 sm:w-full"
              >
          
              <div class="flex justify-end m-2">

<button @click="toggleModal" class="h-7 w-7 p-1 duration-600 
 rounded-full border hover:bg-gray-900   hover:transform hover:skew-y-4 shadow-lg btn bg-theme-4   text-theme-2">
  <XIcon class="h-5" />
</button>
</div>
       
              <slot></slot>
              
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import { XIcon } from '@heroicons/vue/outline';

const props = defineProps({
    showInvoiceModal:Boolean,
    
   
})
const emit = defineEmits({
  closeModaDrawer:false
})

const toggleModal = () => {
  emit('closeModaDrawer',false);
}; 


</script>

<style scope>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>