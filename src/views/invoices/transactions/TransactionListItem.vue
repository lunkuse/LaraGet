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
      class="grid grid-cols-2 text-slate-800 w-full sm:grid-cols-2 xl:grid-cols-6 2xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-2"
    >
      <!-- invoice id -->
      <div class="flex items-center gap-2 ml-2">
        {{ invoice.transaction_number }}
      </div>
      <!-- paid amount -->
      <div class="flex items-center gap-2 ml-2">
        {{ invoice.currency }} {{ invoice.amount }}
      </div>

      <!--total amount -->
      <!-- <div class="flex items-center gap-2 ml-2">
        {{ invoice.total_with_vat
        }}
      </div> -->
      <!-- status -->
      <div class="flex gap-2 capitalize items-center ml-2">
        <div
          class="h-4 w-4 rounded-full p-2"
          :class="{
            'bg-theme-42': invoice.status == 'paid',
            'bg-theme-43': invoice.status == 'open'
          }"
        ></div>
        <div class="flex">
          {{ getStatus(invoice.status) }}
        </div>
      </div>
      <!-- date -->
      <div class="flex items-center gap-2 ml-3">
        {{ moment(invoice.created_at).format('DD-MM-YYYY') }}
      </div>
      <!-- date -->
      <!-- <div class="flex items-center gap-2 ml-3">{{ invoice.description}}</div> -->

      <!-- description} -->
      <!-- <div class="flex items-center gap-2 capitalize ml-2">
        <div>
          <span class="relative inline-block text-sm duration-300 group">
            {{
            truncateString(invoice?.description, 16)}}
 
            <span
              class="absolute mt-4 hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 text-gray-800 bg-white rounded-lg
               text-center text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent 
               after:border-b-transparent after:border-t-white"
            >
              {{
                invoice?.description}}
            </span>
          </span>
        </div>
      </div> -->

      <!-- method -->
      <div class="flex items-center gap-2 ml-3">{{ invoice.method }}</div>

      <!-- action section -->
      <div class="flex items-center ml-2">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="group inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <DotsHorizontalIcon
                class="h-6 w-6 cursor-pointer group-hover:text-gray-900"
              ></DotsHorizontalIcon>
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
              <div class="px-1 py-1" @click="showAppDetail(invoice)">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-200 text-yellow-650' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <MailOpenIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-yellow-650"
                      aria-hidden="true"
                    />
                    {{ $t('translation.open_text') }}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <TransactionModal
      v-if="isAppDetailVisible === true"
      @close="closeAppDetail"
      :transaction="selectedTransaction"
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
import TransactionModal from './TransactionModal.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'TransactionListItem',
  props: {
    invoice: Object,
    selected: Boolean
  },
  components: {
    DotsHorizontalIcon,
    MailOpenIcon,
    ClockIcon,
    TransactionModal,
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
    moment
  },
  setup(props, { emit }) {
    const { t } = useI18n({})

    const isAppDetailVisible = ref(false)
    const isRescheduleVisible = ref(false)
    const selectedTransaction = ref(null)
    const isMenuVisible = ref(false)
    const isAppDetailVisibleEmployee = ref(false)
    const selectedemployee = ref(null)
    const store = useStore()
    const doctors = computed(() => store?.state.patientsPatients?.doctors)

    const showMenu = () => {
      isMenuVisible.value = true
    }

    const showAppDetail = (transaction) => {
      selectedTransaction.value = transaction
      isAppDetailVisible.value = true
    }
    const checkedInvoiceMethod = (event, invoice) => {
      emit('onSelected', invoice, event.target.checked)
    }
    const showRescheduleForm = (appointment) => {
      selectedTransaction.value = appointment
      isRescheduleVisible.value = true
    }

    const closeAppDetail = () => {
      isAppDetailVisible.value = false
      selectedTransaction.value = null
    }
    const closeRescheduleForm = () => {
      isRescheduleVisible.value = false
      selectedTransaction.value = null
    }

    const truncateString = (string, limit) => {
      if (string.length > limit) {
        return string.substring(0, limit) + '...'
      }
      return string
    }
    // status method
    const getStatus = (status) => {
      let translatedStatus = status
      console.log('invoice status', status)
      if (status == 'paid') {
        translatedStatus = t('translation.paid_text')
        return translatedStatus
      } else if (status == 'open') {
        translatedStatus = t('translation.open_text')
        return translatedStatus
      } else {
        return translatedStatus
      }
    }

    return {
      t,
      getStatus,

      truncateString,
      isAppDetailVisible,
      isRescheduleVisible,
      selectedTransaction,
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