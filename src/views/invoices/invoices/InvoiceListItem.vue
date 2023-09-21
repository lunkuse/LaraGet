<template>
  <div
    class="h-auto bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white px-2 py-3 w-full cursor-pointer flex items-center text-sm hover:bg-gray-200 hover:shadow-md border-b border-gray-200"
  >
    <div class="flex form-check custom-checkbox my-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox1"
        :value="invoice?.id"
        :checked="selected"
        @change="checkedInvoiceMethod($event, invoice)"
      />
    </div>
    <div
      class="grid grid-cols-2  2xl:grid-cols-7 xl:grid-cols-7 lg:grid-cols-7 text-slate-800 w-full sm:grid-cols-2 xl:grid-cols-7 2xl:grid-cols-7 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-2"
    >
      <!-- invoice id -->
      <div class="flex items-center gap-2 ml-2">{{ invoice.invoice_id }}</div>
      <!-- paid amount -->
      <div class="flex items-center gap-2 ml-2">{{ invoice.paidamount}}</div>
      <!-- due amount -->
      <div class="flex items-center gap-2 ml-2">{{ invoice.balance_due}}</div>
      <!--total amount -->
      <div class="flex items-center gap-2 ml-2">
        {{ invoice.total_with_vat
        }}
      </div>
      <!-- status -->
      <div class="flex gap-2 capitalize items-center ml-2">
        <div
          class="h-4 w-4 rounded-full p-2"
          :class="{
            'bg-theme-42': invoice.status == '1',
                      'bg-theme-43': invoice.status == '0'
                      
                    }"
        ></div>
        <div class="flex">
          
          
          
          {{getStatus(invoice.status) }}</div>
      </div>
      <!-- date -->
      <div class="flex items-center gap-2 ml-3  hidden 2xl:block xl:block lg:block pt-2">{{ moment(invoice.created_at).format("DD-MM-YYYY")}}</div>
      <!-- action section -->
      <div class="flex items-center ml-2">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="group inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <DotsHorizontalIcon class="h-6 w-6 cursor-pointer group-hover:text-gray-900"></DotsHorizontalIcon>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
            <router-link
                    :to="{
                      name: 'side-menu-invoice-details',
                      params: { invoiceId: invoice.id }
                    }"
                  >
              <div class="px-1 py-1" >
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-200 text-yellow-650' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <MailOpenIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-yellow-650"
                      aria-hidden="true"
                    />
                    {{translations?.open_text ?? 'Open'}}
                  </button>
                </MenuItem>
              </div></router-link>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <InvoiceModal
      v-if="isAppDetailVisible === true"
      @close="closeAppDetail"
      :invoice="selectedInvoice"
      class="!z-50"
    />
  
  </div>
</template>
<script>
import { ref, computed, defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
import {
  DotsHorizontalIcon,
  MailOpenIcon,
  ClockIcon
} from '@heroicons/vue/outline'
import InvoiceModal from './InvoiceModal.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import moment from 'moment'
import { useI18n } from "vue-i18n"

export default defineComponent({
  name: 'InvoiceListItem',
  props: {
    invoice: Object,
    selected: Boolean
  },
  components: {
    DotsHorizontalIcon,
    MailOpenIcon,
    ClockIcon,
    InvoiceModal,
    // EmployeeModal,
    // RescheduleAppointment,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem
  },
  data() {
    return {
      patient: {},
      doctors: ''
    }
  },
  created() {
    this.patient = JSON.parse(sessionStorage.getItem('SinglePatient'))
    // this.appointment.doctors.forEach(
    //   (doctor) => doctor.first_name + doctor.lastname
    // );
    // console.log('doctors names'isAppDetailVisible, this.appointment.doctors.forEach((doctor) => doctor.first_name + doctor.lastname));
  },
  methods: {
    moment,},
  setup(props, { emit }) {
    const translations = inject('translation_v3')
    const isAppDetailVisible = ref(false)
    const isRescheduleVisible = ref(false)
    const selectedInvoice = ref(null)
    const isMenuVisible = ref(false)
    const isAppDetailVisibleEmployee = ref(false)
    const selectedemployee = ref(null)
    const store = useStore()
    const doctors = computed(() => store?.state.patientsPatients?.doctors)

    const showMenu = () => {
      isMenuVisible.value = true
    }

    const showAppDetail = appointment => {
      selectedInvoice.value = appointment
      isAppDetailVisible.value = true
    }
    const checkedInvoiceMethod = (event, invoice) => {
      emit('onSelected', invoice, event.target.checked)
    }
    const showRescheduleForm = appointment => {
      selectedInvoice.value = appointment
      isRescheduleVisible.value = true
    }

    const closeAppDetail = () => {
      isAppDetailVisible.value = false
      selectedInvoice.value = null
    }
    const closeRescheduleForm = () => {
      isRescheduleVisible.value = false
      selectedInvoice.value = null
    }
  
    
    const truncateString = (string, limit) => {
      if (string.length > limit) {
        return string.substring(0, limit) + '...'
      }
      return string
    }
    // status method
    const getStatus = status => {
      let translatedStatus = status
console.log('invoice status', status )
      if (status == '1') {
        translatedStatus = t('translation.paid_text')
        return translatedStatus
      } else if (status == '0') {
         translatedStatus = t('translation.pending_text')
        return translatedStatus
      } else {
        return translatedStatus
      }
    }
  const { t } = useI18n({})
    return {
      t,
      getStatus,
      translations,
      truncateString,
      isAppDetailVisible,
      isRescheduleVisible,
      selectedInvoice,
      showAppDetail,
      closeAppDetail,
      showRescheduleForm,
      closeRescheduleForm,
      showMenu,
      isMenuVisible,
      doctors,
      isAppDetailVisibleEmployee,
    
      selectedemployee,
      
      checkedInvoiceMethod
    }
  }
})
</script>
<style scoped>
input:checked {
  background-color: #ff782e !important;
  border: 1px solid #ff782e !important;
}
</style>