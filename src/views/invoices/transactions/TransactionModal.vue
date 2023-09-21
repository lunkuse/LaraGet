<template>
  <TransitionRoot
    as="template"
    :show="open"
    class="bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white"
  >
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
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
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full"
            >
              <!-- modal header -->
              <div class="px-3 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-start border-b">
                  <h3
                    class="text-xl font-bold font-sans text-theme-1 text-white pb-3"
                  >
                    {{ appointment?.treatment_type?.code }} -
                    {{ transaction?.transaction_number }}
                  </h3>
                  <button
                    type="button"
                    id="closeAppoitmentModal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-theme-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="defaultModal"
                    @click="$emit('close')"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- modal content -->
              <div class="p-3 space-y-2">
                <!-- columns -->
                <div class="grid grid-cols-12 gap-6 z-50">
                  <!-- first column -->
                  <div class="col-span-6 2xl:col-span-6">
                    <!-- amount -->

                    <div
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ $t('translation.amount_text') }}
                      <span
                        class="text-gray-700 dark:text-white font-normal text-sm"
                      >
                        <div
                          class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max"
                        >
                          <h5 class="font-sans font-normal text-sm">
                            {{ transaction?.currency }}
                            {{ transaction?.amount }}
                          </h5>
                        </div></span
                      >
                    </div>

                    <!-- method-->
                    <div
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ $t('translation.method_text') }}
                      <span
                        class="text-gray-700 dark:text-white font-normal text-sm"
                      >
                        <div
                          class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max"
                        >
                          <h5 class="font-sans font-normal text-sm">
                            {{}} {{ transaction?.method }}
                          </h5>
                        </div></span
                      >
                    </div>

                    <!-- description-->
                    <div
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ $t('translation.description_text') }}
                      <span
                        class="text-gray-700 dark:text-white font-normal text-sm"
                      >
                        <div
                          class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max"
                        >
                          <h5 class="font-sans font-normal text-sm wrap-text">
                            <div
                              class="flex items-center gap-2 capitalize ml-2"
                            >
                              <div>
                                <span
                                  class="relative inline-block text-sm duration-300 group"
                                >
                                  {{
                                    truncateString(transaction?.description, 30)
                                  }}

                                  <span
                                    v-if="transaction?.description?.length > 29"
                                    class="absolute mt-4 hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 text-gray-800 bg-white rounded-lg text-center text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-white"
                                  >
                                    {{ transaction?.description }}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </h5>
                        </div></span
                      >
                    </div>
                  </div>

                  <!-- last column -->
                  <div class="col-span-6 2xl:col-span-6">
                    <!-- amount -->
                    <div
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ $t('translation.status_text') }}
                      <span
                        class="text-gray-700 dark:text-white font-normal text-sm"
                      >
                        <div
                          class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max"
                        >
                          <div
                            class="h-4 w-4 rounded-full p-2"
                            :class="{
                              'bg-theme-42': transaction?.status == 'paid',
                              'bg-theme-43': transaction?.status == 'open'
                            }"
                          ></div>
                          <h5 class="font-sans font-normal text-sm">
                            {{ getStatus(transaction?.status) }}
                          </h5>
                        </div></span
                      >
                    </div>

                    <!--date-->
                    <div
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ $t('translation.status_text') }}
                      <span
                        class="text-gray-700 dark:text-white font-normal text-sm"
                      >
                        <div
                          class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max"
                        >
                          <h5 class="font-sans font-normal text-sm">
                            {{
                              moment(translations?.created_at).format(
                                'DD-MM-YYYY'
                              )
                            }}
                          </h5>
                        </div></span
                      >
                    </div>

                    <!-- invoice-->
                    <div
                      class="text-gray-800 dark:text-white font-sans font-bold flex flex-col mt-2"
                    >
                      {{ $t('translation.invoice_text') }}
                      <span
                        class="text-gray-700 dark:text-white font-normal text-sm"
                      >
                        <div
                          class="flex space-x-2 bg-gray-200 rounded-md p-2 w-max"
                        >
                          <h5 class="font-sans font-normal text-sm">
                            {{}} {{ transaction?.invoice_number }}
                          </h5>
                        </div></span
                      >
                    </div>
                  </div>
                </div>

                <div
                  class="grid grid-cols-3 gap-x-3 gap-y-2 pb-2 border-b"
                ></div>
                <div
                  class="flex items-center w-full justify-start space-x-4 mt-4"
                >
                  <Button
                   :label="`${$t('translation.cancel_text')}`"
                    :cancel="true"
                    :transparent="true"
                    @click="$emit('close')"
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


<script>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
// import { ref } from "vue";
import { defineComponent, ref, inject } from '@vue/runtime-core'
// import getPatientsemployees from "../../../../composables/employeesTab";
// import patientInfoFunctionality from '../../../../composables/patientProfile';
import Button from '@/components/shared/buttons/Button.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'EmployeeModal;',
  props: {
    transaction: Object
  },
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Button
  },
  data() {
    return {
      open: true
    }
  },
  methods: {
    moment,
    // status method
    getStatus(status) {
      let translatedStatus = status
      if (status == 'paid') {
        translatedStatus = this.translations?.value?.paid_text ?? 'Paid'
        return translatedStatus
      } else if (status == 'open') {
        translatedStatus = this.translations?.value?.open_text ?? 'Open'
        return translatedStatus
      } else {
        return translatedStatus
      }
    },
    truncateString(string, limit) {
      if (string.length > limit) {
        return string.substring(0, limit) + '...'
      }
      return string
    },
    async exportDataTable() {
      let appointments = []

      appointments.push(this.employee?.id)

      return appointments
    },
    async printSingleEmployee() {
      console.log('single employee print')
      const employees2 = await this.exportDataTable()
      const config = {
        url: '/v2/employees/download-pdf-single',
        method: 'get',
        responseType: 'blob',
        params: {
          employees: JSON.stringify(employees2)
        }
      }

      axios(config).then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })

        // window.open(URL.createObjectURL(blob)).print();
        let iframe = document.createElement('iframe') //load content in an iframe to print later
        document.body.appendChild(iframe)

        iframe.style.display = 'none'
        iframe.src = URL.createObjectURL(blob)
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
      })
    }
  },
  setup() {
    const translations = inject('translation_v3')
    return {
      translations
    }
  }
})

// const { patient, getDoctor } = [];
// // eslint-disable-next-line no-undef
// const props = defineProps({
//   employee: Object
// });
// const open = ref(true);
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
