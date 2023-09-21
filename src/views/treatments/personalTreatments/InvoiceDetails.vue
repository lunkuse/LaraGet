<template>
  <TransitionRoot as="template" :show="open">
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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              class="relative bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full"
            >
              <!-- modal header -->
              <div class="px-3 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-start border-b">
                  <h3 class="text-xl font-bold font-sans text-yellow-650 pb-3">
                    {{invoice?.invoice_id
                    }}
                  </h3>
                  <button
                    type="button"
                    id="closeAppoitmentModal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-yellow-650 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                <div class="max-h-96 overflow-y-auto">
                  <!-- columns -->
                  <div class="grid grid-cols-12 gap-6 z-50">
                    <!-- first column -->
                    <div class="col-span-6 2xl:col-span-6">
                      <!-- tol with vat -->
                      <div class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                        {{textTotal}}
                        <span
                          v-if="invoice?.total_with_vat"
                          class="text-gray-700 font-normal text-sm"
                          :class="!invoice.total_with_vat && 'text-yellow-650'"
                        >
                          {{ invoice?.total_with_vat
                          }}
                        </span>

                        <span v-else class="text-yellow-650 font-normal text-sm">
                          {{
                          textNototalamountset
                          }}
                        </span>
                      </div>
                      <!-- balance_due -->
                      <div class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                        {{textDueAmount}}
                        <span
                          v-if="invoice?.balance_due"
                          class="text-gray-700 font-normal text-sm"
                          :class="!invoice.balance_due && 'text-yellow-650'"
                        >
                          {{ invoice?.balance_due
                          }}
                        </span>

                        <span v-else class="text-yellow-650 font-normal text-sm">
                          {{
                          textNoamountdueset
                          }}
                        </span>
                      </div>
                           <!-- created at-->
                           <div class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                        {{textDateCreated}}
                        <span
                          v-if="invoice?.created_at"
                          class="text-gray-700 font-normal text-sm"
                          :class="!invoice.roles && 'text-yellow-650'"
                        >
                          {{
                          formatDate(invoice?.created_at)
                          }}
                        </span>
                        <span v-else class="text-yellow-650 font-normal text-sm">
                          {{
                          textNodateset
                          }}
                        </span>
                      </div>
                      <!-- services-->
                      <!-- <div class="text-gray-800 font-sans flex flex-col mt-2 font-bold">
                        {{translations?.services_text ??'Services'}}
                        <div class="flex flex-col text-sm">
                          <div v-for="service in invoice?.services" :key="role" class="font-normal">
                            <span class="relative inline-block text-sm duration-300 group">
                              {{
                              truncateString(service, 11) }}
                        
                              <span
                                v-if="(invoice?.services.length > 11)"
                                class="mt-4 absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 bg-white rounded-lg text-center text-gray-500 bg-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-white"
                              >{{service}}</span>
                            </span>
                      
                          </div>
                        </div>



                        
                      </div> -->
                    </div>
                    <!-- last column -->
                    <div class="col-span-6 2xl:col-span-6">
                      <!-- amount-->
                      <div id="date" class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                        {{ textAmountPaid }}
                        <span
                          v-if="invoice?.paidamount"
                          class="text-gray-700 font-normal text-sm"
                        >
                          {{
                          invoice?.paidamount
                          }}
                        </span>
                        <span v-else class="text-yellow-650 font-normal text-sm">
                          {{
                          textNoAmountPaid
                          }}
                        </span>
                      </div>

                      <!-- VAT-->
                      <div id="date" class="text-gray-800 font-sans font-bold flex flex-col mt-2">
                        {{ textVAT }}
                        <span
                          v-if="invoice?.vat"
                          class="text-gray-700 font-normal text-sm"
                        >
                          {{
                          invoice?.vat
                          }}
                        </span>
                        <span v-else class="text-yellow-650 font-normal text-sm">
                          {{
                          textNoVat
                          }}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-x-3 gap-y-2 pb-2 border-b"></div>
                <div class="flex items-center w-full justify-start space-x-4 mt-4">
                  <Button
                    :label="translations?.cancel_text ?? 'Cancel'"
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
  <!-- here -->
</template>
    
    <script >
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import { inject } from "vue";

import Button from '@/components/shared/buttons/Button.vue'
import moment from "moment";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    invoice: Object
  },
  components: { Button, Dialog, DialogPanel, TransitionChild, TransitionRoot },
  methods: { moment },
  data() {
    return {
      open: true,
      textTotal: this.translations?.total_amount_text ?? "Total Amount",
      textNototalamountset:
        this.translations?.no_total_provided_text ?? "No total amount set",
      textDateCreated: this.translations?.created_at_text ?? "Created at",
      textNodateset: this.translations?.no_date_set_text ?? "No date set",
      textAmountPaid: this.translations?.amount_paid_text ?? "Amount Paid",
      textNoAmountPaid:
        this.translations?.no_amount_paid_is_set_text ??
        "No amount paid is set",
      textDueAmount: this.translations?.amount_due_text ?? "Amount Due",
      textNoamountdueset:
        this.translations?.no_amount_due_is_set_text ?? "No amount due is set",
      textVAT: this.translations?.vat_text ?? "VAT",
      textNoVat: this.translations?.no_vat_is_set_text ?? "No VAT is set"
    };
  },
  setup() {
    const translations = inject("translation_v3");
    const formatDate = dateString => {
      let newDate = moment(dateString);
      return newDate.format("DD-MM-YYYY");
    };
    const truncateString = (string, limit) => {
      if (string?.length > limit) {
        return string.substring(0, limit) + "...";
      }
      return string;
    };
    return { translations, formatDate, truncateString };
  },
  watch: {
    // translations
    textTotal(newtextTotal, oldtextTotal) {
      this.textTotal = newtextTotal;
    },
    textNototalamountset(newtextNototalamountset, oldtextNototalamountset) {
      this.textNototalamountset = newtextNototalamountset;
    },
    textDateCreated(newtextDateCreated, oldtextDateCreated) {
      this.textDateCreated = newtextDateCreated;
    },
    textNodateset(newtextNodateset, oldtextNodateset) {
      this.textNodateset = newtextNodateset;
    },
    textAmountPaid(newtextAmountPaid, oldtextAmountPaid) {
      this.textAmountPaid = newtextAmountPaid;
    },
    textNoAmountPaid(newtextNoAmountPaid, oldtextNoAmountPaid) {
      this.textNoAmountPaid = newtextNoAmountPaid;
    },
    textDueAmount(newtextDueAmount, oldtextDueAmount) {
      this.textDueAmount = newtextDueAmount;
    },
    textNoamountdueset(newtextNoamountdueset, oldtextNoamountdueset) {
      this.textNoamountdueset = newtextNoamountdueset;
    },
    textVAT(newtextVAT, oldtextVAT) {
      this.textVAT = newtextVAT;
    },

    textNoVat(newtextNoVat, oldtextNoVat) {
      this.textNoVat = newtextNoVat;
    }
  }
});
// const open = ref(true);
</script>
    
    <style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.parent-container-display {
  height: calc(100% - 90px);
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
    