<script setup>
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {XIcon} from "@heroicons/vue/outline";
import Button from "../components/Button.vue";

const props = defineProps({
  isOpen: Boolean,
  showModal: Function,
  closeModal: Function,
});
</script>

<template>
  <TransitionRoot as="template" appear :show="isOpen">
    <Dialog as="div" class="relative z-10 font-sans" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-scroll scrollContent">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl sm:w-full">
              <!-- modal header -->
              <div class="bg-white px-3 pt-4 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-center border-b">
                  <h3 class="text-xl font-bold font-sans text-yellow-650 pb-3">
                    <slot name="header"/>
                  </h3>
                  <button type="button" id="closeModal"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-yellow-650 rounded-lg p-1.5 ml-auto inline-flex items-center"
                          data-modal-toggle="defaultModal" @click="closeModal">
                    <XIcon class="w-5 h-5"/>
                  </button>
                </div>
              </div>

              <!--              modal content-->
              <div class="p-4 overflow-y-scroll">
                <slot name="body"/>
              </div>

              <slot name="footer"/>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>