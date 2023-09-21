<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10">
      <TransitionChild>
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild>
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-5xl sm:w-full">
              <!-- modal header -->
              <div class="px-3 pt-4 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-start border-b border-gray-300">
                  <h3 class="text-xl font-bold font-sans text-yellow-650">
                    {{ t('patients.forms.preview') }}
                  </h3>
                  <button type="button" id="closePreview"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-yellow-650 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="defaultModal" @click="$emit('close')">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- modal content -->
              <div class="p-6 space-y-6">
                <!-- loop through values -->
                <div class="grid grid-cols-4 gap-x-2 gap-y-2">
                  <!--                                    <div class="flex flex-col space-y-2 shadow-sm hover:bg-gray-50 p-0.5 rounded-md" v-for="(value, propertyName) in newObject">-->
                  <!--                                        <span class="text-sm text-gray-400 font-normal font-sans capitalize">-->
                  <!--                                            {{ propertyName }}-->
                  <!--                                        </span>-->
                  <!--                                        <span class="text-base text-gray-700 font-normal font-sans capitalize" v-if="!value?.name">-->
                  <!--                                            {{ value }}-->
                  <!--                                        </span>-->
                  <!--                                        <span class="text-base text-gray-700 font-normal font-sans capitalize" v-else>-->
                  <!--                                            {{ value?.name }}-->
                  <!--                                        </span>-->
                  <!--                                    </div>-->
                  <div class="flex flex-col space-y-2 shadow-sm hover:bg-gray-50 p-0.5 rounded-md"
                    v-for="(value, propertyName) in previewValues">
                    <span class="text-sm text-gray-400 font-normal font-sans capitalize">
                      {{ t(`patients.previewModal.${propertyName}`) }}
                    </span>
                    <span class="text-base text-gray-700 font-normal font-sans" v-if="propertyName === 'passant'">
                      {{ value === "0" ? t('patients.no') : t('patients.yes') }}
                    </span>
                    <span class="text-base text-gray-700 font-normal font-sans" v-else>
                      {{ value }}
                    </span>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import Button from './Button.vue';
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const open = ref(true);

const props = defineProps({
  previewValues: Object,
});
</script>