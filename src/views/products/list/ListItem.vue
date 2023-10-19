<template>
  <div
    class="h-auto bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white px-2 py-3 w-full cursor-pointer flex items-center text-sm hover:bg-gray-200 hover:shadow-md border-b border-gray-200"
  >
    <div class="flex form-check custom-checkbox my-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox1"
        :value="appointment?.id"
        :checked="selected"
        @change="checkedAppointmentMethod($event, appointment)"
      />
    </div>
    <div
      class="grid grid-cols-8 text-slate-800 w-full sm:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-8"
    >
      <!-- image -->
      <div class="flex items-center gap-2 capitalize ml-2">
        <img :src="appointment?.Images[0]" alt="Product Image" />
      </div>

      <!-- category -->
      <div class="flex items-center gap-2 capitalize ml-2">
        {{ appointment?.Category }}
      </div>
      <!-- name -->
      <div class="flex items-center gap-2 capitalize ml-2">
        {{ appointment?.Name }}
      </div>
      <!-- description -->
      <div class="flex items-center gap-2  ml-2">
        <div>
          <span class="relative inline-block text-sm duration-300 group">
            {{ truncateString(appointment?.Description, 16) }}
            <!-- Tooltip text here -->
            <span
              v-if="appointment?.Description?.length > 16"
              class="absolute mt-4 hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 text-black bg-white rounded-lg text-center text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-white"
            >
              {{
              appointment?.Description
              }}
            </span>
          </span>
        </div>
      </div>

      <!-- discounted_price -->
      <div class="flex items-center gap-2 capitalize ml-2">
        {{ appointment?.Discounted_Price }}
      </div>

      <!-- brand -->
      <div class="flex items-center gap-2 capitalize ml-2">
        {{ appointment?.Brand }}
      </div>
      <!-- status -->
      <div class="flex gap-2 capitalize items-center w-20">
        <!-- <div
          class="h-4 w-4 rounded-full p-2"
          :class="{
            'bg-theme-9': appointment?.Availability" === true,
            'bg-black': appointment?.Availability" === false,
          }"
        >
      </div> -->
        <div class="flex">
          {{ getStatus(appointment?.Availability) }}
        </div>
      </div>

      <!-- action section -->
      <div class="flex items-center">
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
              <div class="px-1 py-1" @click="showAppDetail(appointment)">
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
                    {{ $t("translation.open_text") }}
                  </button>
                </MenuItem>
              </div>
              <!-- <router-link
                :to="{
                  name: 'side-menu-dentalquestions',
                  params: {
                    appointmentId: appointment.id,
                    patientId: appointment.patient_id
                  }
                }"
              >
                <div class="px-1 py-1" v-if="appointment?.is_qtn_required == 1">
                  <MenuItem
                    v-slot="{ active }"
                    v-if="appointment?.medical_questions_answer_id == null"
                  >
                    <button
                      :class="[
                        active
                          ? 'bg-gray-200 text-yellow-650'
                          : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                    >
                      <QuestionMarkCircleIcon
                        :active="active"
                        class="mr-2 h-5 w-5 text-yellow-650"
                        aria-hidden="true"
                      />
                      {{
                        translations?.anamnese_questions_text ??
                        'Anamnese Questions'
                      }}
                    </button>
                  </MenuItem>
                </div>
              </router-link> -->
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <Modal
      v-if="isAppDetailVisible === true"
      @close="closeAppDetail"
      :appointment="selectedAppointment"
      class="!z-50"
    />

    <!-- <EmployeeModal
      class
      v-if=" isAppDetailVisibleEmployee === true"
      @close="closeEmployeeForm"
      :employee="selectedemployee"
    />-->
  </div>
</template>
<script>
import { ref, computed, defineComponent, inject } from "vue";
import { useStore } from "vuex";
import {
  DotsHorizontalIcon,
  MailOpenIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";
import Modal from "./Modal.vue";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "AppointmentListItem",
  props: {
    appointment: Object,
    selected: Boolean,
  },
  components: {
    DotsHorizontalIcon,
    MailOpenIcon,
    ClockIcon,
    Modal,

    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    QuestionMarkCircleIcon,
  },
  data() {
    return {
      patient: {},
      doctors: "",
    };
  },
  created() {
    this.patient = JSON.parse(sessionStorage.getItem("SinglePatient"));
  },
  setup(props, { emit }) {
    const { t } = useI18n({});
    const translations = [];
    const isAppDetailVisible = ref(false);
    const isRescheduleVisible = ref(false);
    const isQuestionAppDetailVisible = ref(false);
    const selectedAppointment = ref(null);
    const isMenuVisible = ref(false);
    const isAppDetailVisibleEmployee = ref(false);
    const selectedemployee = ref(null);
    const store = useStore();
    const doctors = computed(() => store?.state.patientsPatients?.doctors);

    const showMenu = () => {
      isMenuVisible.value = true;
    };

    const showAppDetail = (appointment) => {
      selectedAppointment.value = appointment;
      isAppDetailVisible.value = true;
    };
    const checkedAppointmentMethod = (event, appointment) => {
      emit("onSelected", appointment, event.target.checked);
    };
    const showRescheduleForm = (appointment) => {
      selectedAppointment.value = appointment;
      isRescheduleVisible.value = true;
    };

    const closeAppDetail = () => {
      isAppDetailVisible.value = false;
      selectedAppointment.value = null;
    };

    const closeRescheduleForm = () => {
      isRescheduleVisible.value = false;
      selectedAppointment.value = null;
    };
    const showAppEmployeeDetail = (employee) => {
      // console.log('employee click event', employee)
      selectedemployee.value = employee;
      isAppDetailVisibleEmployee.value = true;
      console.log("selectedemployee.value", selectedemployee.value);
    };
    const closeEmployeeForm = () => {
      isAppDetailVisibleEmployee.value = false;
      selectedAppointment.value = null;
    };
    const truncateString = (string, limit) => {
      console.log('description string', string)
      if (string.length > limit) {
        return string.substring(0, limit) + "...";
      }
      return string;
    };
    // status method
    //  const getStatus=(status) =>{
    //   let translatedStatus = status

    //   if (status === 'Confirmed') {
    //     translatedStatus = t('translation.confirmed_text')
    //     return translatedStatus
    //   } else if (status === 'Pending') {
    //     translatedStatus = t('translation.pending_text')
    //     return translatedStatus
    //   } else if (status === 'Waiting') {
    //     translatedStatus = t('translation.waiting_text')
    //     return translatedStatus
    //   } else if (status === 'Closed') {
    //     translatedStatus = t('translation.closed_text')
    //     return translatedStatus
    //   } else if (status === 'Canceled') {
    //     translatedStatus = t('translation.canceled_text')
    //     return translatedStatus
    //   } else if (status === 'Missed') {
    //     translatedStatus = truncateString('translation.missed_text')

    //     return translatedStatus
    //   } else if (status === 'Serving') {
    //     translatedStatus = t('translation.serving_text')
    //     return translatedStatus
    //   } else {
    //     return translatedStatus
    //   }
    // },
    const getStatus = (status) => {
      let translatedStatus = status;

      if (status === "Confirmed") {
        translatedStatus = t("translation.confirmed_text");
        return translatedStatus;
      } else if (status === "Pending") {
        translatedStatus = t("translation.pending_text");
        return translatedStatus;
      } else if (status === "Waiting") {
        translatedStatus = t("translation.waiting_text");
        return translatedStatus;
      } else if (status === "Closed") {
        translatedStatus = t("translation.closed_text");
        return translatedStatus;
      } else if (status === "Canceled") {
        translatedStatus = t("translation.canceled_text");
        return translatedStatus;
      } else if (status === "Missed") {
        translatedStatus = t("translation.missed_text");

        return translatedStatus;
      } else if (status === "Serving") {
        translatedStatus = t("translation.serving_text");
        return translatedStatus;
      } else {
        return translatedStatus;
      }
    };
    // source method
    const getSource = (source) => {
      let translatedSource = source;
      if (source === "Online") {
        translatedSource = t("translation.online_text");
        return translatedSource;
      } else if (source === "Phone") {
        translatedSource = t("translation.phone_text");
        return translatedSource;
      } else if (source === "Manual") {
        translatedSource = t("translation.manual_text");
        return translatedSource;
      } else {
        return translatedSource;
      }
    };
    const getStatusASA = (status) => {
      let translatedStatus = status;
      console.log("getting status");
      if (status == "0") {
        translatedStatus = t("translation.answer_now_text");
        return translatedStatus;
      } else {
        translatedStatus = t("translation.answered_text");
        return translatedStatus;
      }
    };
    return {
      t,
      getStatus,
      getSource,
      getStatusASA,
      translations,
      truncateString,
      isAppDetailVisible,
      isRescheduleVisible,
      selectedAppointment,
      showAppDetail,
      closeAppDetail,
      showRescheduleForm,
      closeRescheduleForm,
      showMenu,
      isMenuVisible,
      doctors,
      isAppDetailVisibleEmployee,
      closeEmployeeForm,
      selectedemployee,
      showAppEmployeeDetail,
      checkedAppointmentMethod,
    };
  },
});
</script>
<style scoped>
input:checked {
  background-color: #ff782e !important;
  border: 1px solid #ff782e !important;
}
</style>