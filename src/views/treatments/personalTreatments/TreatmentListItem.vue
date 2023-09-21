<template>
  <!-- <div
    class="h-auto bg-gray-100 w-full cursor-pointer flex items-center text-sm hover:bg-gray-200 hover:shadow-md border-b border-gray-200"
  > -->
  <div
    class="h-auto bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white px-2 py-4 w-full cursor-pointer flex items-center text-sm hover:bg-gray-200 hover:shadow-md border-b border-gray-200"
  >
    <ul class="w-full">
      <div
        class="hover:bg-gray-200 accordion__header items-center flex items-center justify-between w-full rounded bg-gray-100 text-xs bg-white dark:bg-dark-1 is-active:bg-gray-100"
        :class="{ 'is-active': treatment?.id == activeTab }"
        :id="treatment?.id"
      >
        <div
          class="grid grid-cols-2 text-gray-800 w-full  "
        >
          <!-- name and image -->
          <div class="flex items-center gap-2 text-sm">
            <div class="flex form-check custom-checkbox my-1">
              <input
                type="checkbox"
                class="form-check-input"
                id="checkbox1"
                :value="treatment?.id"
                :checked="selected"
                @change="checkedTreatmentMethod($event, treatment)"
              />
            </div>
            {{ `#000${treatment?.id}` }}
          </div>

          <!-- by -->
          <!-- <div class="flex gap-2 capitalize items-center ml-4 text-sm">
            <span class="relative inline-block text-sm duration-300 group">
              <span
                class="flex text-sm"
                @click="
                  treatment?.employees?.length == 1
                    ? showAppEmployeeDetail(treatment?.employees[0])
                    : null
                "
                :class="
                  treatment?.employees?.length == 1
                    ? treatment?.employees?.length == 1 &&
                      'hover:text-yellow-650'
                    : 'hover:bold '
                "
              >
                {{ treatment?.employees[0]?.first_name }}
                {{ treatment?.employees[0]?.last_name }}
                <span v-if="treatment?.employees?.length > 1">
                  <DotsHorizontalIcon class="mr-2 h-5 w-5" />
                </span>
              </span>
            

              <span
                v-if="treatment?.employees?.length > 1"
                class="z-50 absolute hidden group-hover:flex -top-2 -right-0 trangray-x-full w-48 px-2 py-1 bg-white dark:bg-dark-1 rounded-lg text-center text-gray-900 text-sm before:content-[''] before:absolute before:top-1/2 before:right-[100%] before:-trangray-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-white"
              >
                <div class="items-center gap-2 capitalize pt-2 ml-6">
                  <div v-for="doctor in treatment?.employees" :key="doctor">
                    <span @click="showAppEmployeeDetail(doctor)">
                      <li class="list-disc hover:text-yellow-650">
                        {{ doctor?.first_name }} {{ doctor?.last_name }}
                      </li>
                    </span>
                  </div>
                </div>
              </span>
            </span>
          </div> -->

          <!-- <div
            class="items-center ml-2 gap-2 capitalize hidden 2xl:block xl:block lg:block md:block text-sm"
          >
        
            <li
              class="text-gray-700 hover:text-yellow-650"
              v-for="doctor in treatment?.employees"
              :key="doctor.id"
              @click="showAppEmployeeDetail(doctor)"
            >{{ doctor?.first_name ?? 'no doctor set' }} {{ doctor?.last_name }}</li>
          </div> -->

          <!-- date -->
          <div class="flex gap-2 capitalize items-center ml-2 text-sm block ml-2">
            <div class="flex">
              {{ moment(treatment?.created_at).format("DD-MM-YYYY") }} &nbsp;
              <span class="hidden 2xl:block xl:block lg:block md:block">{{
                moment(treatment?.created_at).utc().format("hh:mm:ss a")
              }}</span>
            </div>
          </div>

          <!-- <div
            class="flex align-middle items-center ml-4 text-sm hidden 2xl:block xl:block pt-2"
          >
            {{ moment(treatment?.created_at).utc().format("hh:mm:ss a") }}
          </div> -->

          <!-- invoice -->
          <!-- <div class="flex gap-2 capitalize items-center ml-4 text-sm">
            <span class="relative inline-block text-sm duration-300 group">
              <span
                class="flex text-sm"
                @click="
                  treatment?.invoices?.length == 1
                    ? showAppInvoiceDetail(treatment?.invoices[0])
                    : null
                "
                :class="
                  treatment?.invoices?.length == 1
                    ? treatment?.invoices?.length == 1 &&
                      'hover:text-yellow-650'
                    : 'hover:bold '
                "
              >
                {{ treatment?.invoices[0]?.invoice_id }}
                <span v-if="treatment?.invoices?.length > 1">
                  <DotsHorizontalIcon class="mr-2 h-5 w-5" />
                </span>
              </span>
             

              <span
                v-if="treatment?.invoices?.length > 1"
                class="z-50 absolute hidden group-hover:flex -top-2 -right-0 trangray-x-full w-48 px-2 py-1 bg-white dark:bg-dark-1 rounded-lg text-center text-gray-900 text-sm before:content-[''] before:absolute before:top-1/2 before:right-[100%] before:-trangray-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-white"
              >
                <div class="z-50 items-center gap-2 capitalize pt-2 ml-6">
                  <div v-for="invoice in treatment?.invoices" :key="invoice">
                    <span @click="showAppInvoiceDetail(invoice)">
                      <li class="list-disc hover:text-yellow-650">
                        {{ invoice?.invoice_id }}
                      </li>
                    </span>
                  </div>
                </div>
              </span>
            </span>
          </div> -->

          <!-- status -->
          <!-- <div class="flex gap-2 capitalize items-center ml-4 text-sm">
            <div
              class="h-4 w-4 rounded-full"
              :class="{
                'bg-theme-31': treatment?.treatment_status === 'Treat',
                'bg-gray-500': treatment?.treatment_status === 'Monitored',
                'bg-theme-1': treatment?.treatment_status === 'Planned',
              }"
            ></div>
            {{ treatment?.treatment_status }}
          </div> -->
        </div>
        <p v-if="treatment?.id !== activeTab" class="pr-2">
          {{ treatment?.date }}
        </p>
        <span @click="toggleAccordion(treatment?.id)">
          <i class="accordion__toggle"></i>
        </span>
      </div>
      <div
        class="accordion__body p-2 dark:text-white"
        :class="{ 'is-active': treatment?.id == activeTab }"
      >
        <!-- <div
          class="grid grid-cols-6 gap-4 mb-3 mt-2 text-base text-black dark:text-white font-bold"
        > -->
        <div
          class="grid grid-cols-12 gap-1 mb-3 mt-2 text-base text-black font-bold"
        >
          <span class="h-10 flex items-center justify-start"
            >Tooth Element</span
          >
          <span class="h-10 flex items-center justify-start col-span-5"
            >Details</span
          >
          <span class="h-10 flex items-center justify-start col-span-6"
            >{{ $t("translation.treatments_text") }}
          </span>
          <!-- <span class="h-10 flex items-center justify-start">{{
            $t("translation.prices_text")
          }}</span>
          <span class="h-10 flex items-center justify-start">{{
            $t("translation.done_by_text")
          }}</span> -->
        </div>
        <!-- treatment:{{toothsectionSegment?.missing}} -->
        <div
          v-for="(treatment, index) in toothsectionSegment"
          class="w-full"
          :key="index"
        >
        <div v-if="Object.keys(treatment).length > 0 ">
          <div v-if="!treatment.hasOwnProperty('isPrimary')">
            <!-- <div >
          <div > -->
          <div
            v-if="!['missing', 'PPS_Data', 'generalTreatment'].includes(index)"
           
          >
          <div v-if="index!=='implant_dates' && index!=='imaplant_dates'"  class="grid grid-cols-12 gap-1 text-xs py-0.5">
            <!-- tooth element -->
            <span
           
              class="flex justify-center items-center bg-gray-100 dark:bg-dark-1 font-bold text-gray-700 dark:text-white"
              > {{ index }}</span
            >

            <div
              class="h-auto p-1 flex flex-col bg-gray-100 dark:bg-dark-1 col-span-5 text-xs space-y-1 border border-gray-300"
            >
              <div
                class="text-xs w-full flex items-center justify-between bg-white dark:bg-dark-1 p-0.5"
              >
                <span class="font-bold text-gray-700"
                  >{{ $t("translation.pathology_text") }}:</span
                >
                <span
                  >
                  {{
                    `${(treatment?.pathology?.decay ?? []).length} ` +
                    t("translation.areas_diagnosed_text")
                  }}</span
                >
              </div>
              <div
                class="text-xs w-full flex items-center justify-between bg-white dark:bg-dark-1 p-0.5"
              >
                <span class="font-bold text-gray-700"
                  >{{ $t("translation.restoration_text") }}:</span
                >
                <span>
                  <!-- {{ `${(treatment?.restoration?.filling ?? []).length} areas treated.` }} -->
                  {{
                    `${
                      (toothsectionSegment[index]?.restoration?.filling ?? [])
                        .length
                    } ` + t("translation.areasTreated")
                  }}
                </span>
              </div>
              <div
                class="text-xs w-full flex justify-between bg-white dark:bg-dark-1 p-0.5"
              >
                <span class="font-bold text-gray-700"
                  >{{ t("translation.periodontics_text") }}:</span
                >
                <div class="flex flex-col w-72 divide divide-y">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-500"
                      >{{ $t("translation.probing_text") }}:</span
                    >
                    <span
                      v-if="
                        typeof toothsectionSegment[index]?.periodontal
                          ?.probingDepth !== 'undefined'
                      "
                      >{{ $t("translation.not_present_text") }}</span
                    >
                    <span v-else>{{ $t("translation.not_present_text") }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-500"
                      >{{
                        $t("translation.gingival_margin_text") ??
                        "Gingival Margin"
                      }}:</span
                    >
                    <span
                      v-if="
                        typeof treatment?.periodontal?.gingivalMargin !==
                        'undefined'
                      "
                      >{{ t("translation.present_text") }}</span
                    >
                    <span v-else>{{ $t("translation.not_present_text") }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-500"
                      >{{
                        $t("translation.furcation_text") ?? "Furcation"
                      }}:</span
                    >
                    <span
                      v-if="
                        typeof toothsectionSegment[index]?.periodontal
                          ?.furcation !== 'undefined'
                      "
                      >{{ $t("translation.present_text") }}</span
                    >
                    <span v-else>{{ $t("translation.not_present_text") }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-500"
                      >{{ t("translation.bleeding_text") }}:</span
                    >
                    <span
                      v-if="
                        typeof toothsectionSegment[index]?.periodontal
                          ?.bleeding !== 'undefined'
                      "
                      >{{ t("translation.present_text") }}</span
                    >
                    <span v-else>{{ $t("translation.not_present_text") }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-500"
                      >{{ t("translation.plaque_text") }}:</span
                    >
                    <span
                      v-if="
                        typeof toothsectionSegment[index]?.periodontal
                          ?.plaque !== 'undefined'
                      "
                      >{{ $t("translation.present_text") }}
                    </span>
                    <span v-else>{{ $t("translation.not_present_text") }}</span>
                  </div>
                </div>
              </div>
              <div
                class="text-xs w-full flex items-center justify-between bg-white dark:bg-dark-1 p-0.5"
              >
                <span class="font-bold text-gray-700"
                  >{{ $t("translation.implant_text") }} :</span
                >
                <span
                  v-if="
                    typeof toothsectionSegment[index]?.periodontal?.implant !==
                    'undefined'
                  "
                  >{{ $t("translation.present_text") }}</span
                >
                <span v-else>{{ $t("translation.not_present_text") }}</span>
              </div>
            </div>
            <!-- <span
              class="flex justify-center pl-2 bg-gray-100 dark:bg-dark-1 text-xs text-red-600 items-center col-span-2"
              >{{
                treatment.treatments || t("translation.no_data_recorded_text")
              }}</span
            > -->

            <span
                  class="justify-center pl-2 pr-2 bg-slate-100 text-xs items-center col-span-6 overflow-auto space-y-1 border border-slate-300"
                >
              
                  <table v-if="treatment.treatments" class="full-width-table">
                    <thead>
                      <tr v-if="treatment?.treatments?.length > 0">
                        <th class="header-cell col-span-4">
                          <span class="h-10 flex items-center justify-start">{{
                            $t("translation.treatment_text")
                          }}</span>
                        </th>
                        <th class="header-cell">
                          <span class="h-10 flex items-center justify-start">{{
                            $t("translation.price_text")
                          }}</span>
                        </th>
                        <th class="header-cell">
                          <span
                            class="h-10 flex items-center justify-start ml-4"
                            >{{ $t("translation.status_text") }}</span
                          >
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                      <tr
                        class="list-disc list-inside col-span-6 wrap-cell"
                        v-for="item in treatment.treatments"
                        :key="item.id"
                      >
                        <td v-if="item.name " class="bullet-cell py-1 col-span-4 wrap-cell">
                          {{
                            item.name || t("reports.treatments.noDataRecorded")
                          }}
                        </td>
                        <td
                          class="bullet-cellnew py-1 col-span-1"
                          :class="
                            item.treatmentPrice == null
                              ? item.treatmentPrice == null && 'text-theme-43'
                              : ''
                          "
                        >
                          {{
                            item.treatmentPrice ||
                            t("translation.no_data_recorded_text")
                          }}
                        </td>
                        <td
                          class="bullet-cellnew py-1 col-span-1"
                          :class="
                            item.status == null
                              ? item.status == null && 'text-red-600'
                              : ''
                          "
                        >
                          {{
                            item.status ||
                            t("translation.no_data_recorded_text")
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-else class="text-red-600">
                    {{ t("translation.no_data_recorded_text") }}
                  </p>
                </span>
            <span
              class="flex justify-center pl-2 bg-gray-100 dark:bg-dark-1 text-xs text-red-600 items-center col-span-2"
              >{{
                toothsectionSegment[index].treatmentPrices ||
                t("translation.no_data_recorded_text")
              }}</span
            >
            <span
              class="flex justify-center pl-2 bg-gray-100 dark:bg-dark-1 text-xs text-red-600 items-center col-span-2"
              >{{
                treatment.paymentStatus ||
                t("translation.no_data_recorded_text")
              }}</span
            >
          </div>
</div>
          <div v-else class="w-full flex flex-col">
            <!-- missing teeth -->
            <div
              v-if="index === 'missing'"
              class="grid grid-cols-2 gap-1 text-xs"
            >
              <span
                class="bg-gray-100 dark:bg-dark-1 h-10 flex items-center pl-2 border border-gray-300 text-gray-700 font-bold"
                >{{ t("translation.missing_teeth_text") }}:</span
              >
              <span
                class="bg-gray-100 dark:bg-dark-1 h-10 flex items-center pl-2 border border-gray-300"
                >{{ toothsectionSegment["missing"].join(", ") }}</span
              >
            </div>

            <!-- pps data -->
            <div
              v-if="index === 'PPS_Data'"
              class="mt-1 bg-gray-100 dark:bg-dark-1 border border-gray-300 p-2"
            >
              <span class="text-xs text-gray-700 font-bold"
                >PPS {{ t("translation.data_text") }}</span
              >
              <div
                v-for="pps_data in toothsectionSegment['PPS_Data']"
                :key="pps_data"
              >
                <!-- Tooth Quard -->
                <div class="grid grid-cols-4 gap-2">
                  <div class="flex flex-col text-gray-700 text-xs">
                    <div
                      class="flex flex-col items-center justify-center border border-gray-300 rounded p-2 shadow-sm"
                    >
                      <!-- <img src="../../assets/images/ppsImg/right_upper_jaw.png" class="h-16 mb-3" /> -->
                      <span class="text-xs">
                        {{ t("translation.upper_text") }}
                        {{ t("translation.right_text") }}
                        {{ t("translation.jaw_text") }}
                      </span>
                    </div>
                    <span class="text-xs text-center mt-1">
                      PPS {{ t("translation.value_text") }}:
                      {{ pps_data?.pps_value[0].id }}
                    </span>
                    <span class="text-xs text-center">{{
                      pps_data?.pps_value[0].probing_depth
                    }}</span>
                  </div>
                  <div class="flex flex-col text-gray-700 text-xs">
                    <div
                      class="flex flex-col items-center justify-center border border-gray-300 rounded p-2 shadow-sm"
                    >
                      <!-- <img src="../../assets/images/ppsImg/left_upper_jaw.png" class="h-16 mb-3" /> -->
                      <span class="text-xs">
                        {{ t("translation.upper_text") }}
                        {{ t("translation.left_text") }}
                        {{ t("translation.jaw_text") }}
                      </span>
                    </div>
                    <span class="text-xs text-center mt-1">
                      PPS {{ t("translation.value_text") }}:
                      {{ pps_data?.pps_value[1].id }}
                    </span>
                    <span class="text-xs text-center">{{
                      pps_data?.pps_value[1].probing_depth
                    }}</span>
                  </div>
                  <div class="flex flex-col text-gray-700 text-xs">
                    <div
                      class="flex flex-col items-center justify-center border border-gray-300 rounded p-2 shadow-sm"
                    >
                      <!-- <img src="../../assets/images/ppsImg/right_lower_jaw.png" class="h-16 mb-3" /> -->
                      <span class="text-xs">
                        {{ t("translation.lower_text") }}
                        {{ t("translation.right_text") }}
                        {{ t("translation.jaw_text") }}
                      </span>
                    </div>
                    <span class="text-xs text-center mt-1"
                      >PPS {{ t("translation.value_text") }}:
                      {{ pps_data?.pps_value[2].id }}</span
                    >
                    <span class="text-xs text-center">{{
                      pps_data?.pps_value[2].probing_depth
                    }}</span>
                  </div>
                  <div class="flex flex-col text-gray-700 text-xs">
                    <div
                      class="flex flex-col items-center justify-center border border-gray-300 rounded p-2 shadow-sm"
                    >
                      <!-- <img src="../../assets/images/ppsImg/left_lower_jaw.png" class="h-16 mb-3" /> -->
                      <span class="text-xs">
                        {{ t("translation.lower_text") }}
                        {{ t("translation.left_text") }}
                        {{ t("translation.jaw_text") }}
                      </span>
                    </div>
                    <span class="text-xs text-center mt-1">
                      PPS {{ t("translation.value_text") }}:
                      {{ pps_data?.pps_value[3].id }}
                    </span>
                    <span class="text-xs text-center">{{
                      pps_data?.pps_value[3].probing_depth
                    }}</span>
                  </div>
                </div>

                <div class="grid grid-cols-4 gap-1">
                  <!-- Notes -->
                  <div class="flex mt-6 flex-col border text-gray-700">
                    <h6 class="block text-xs font-medium text-gray-700">
                      {{ t("translation.general_notes_text") }}
                    </h6>
                    <li class="ml-4 text-xs mb-2">
                      {{ pps_data?.general_notes }}
                    </li>
                  </div>
                  <!-- Risk Level -->
                  <div class="flex mt-4 flex-col border text-gray-700">
                    <h6 class="block text-xs font-medium text-gray-700">
                      {{ t("translation.recommended_treatment_text") }}:
                    </h6>
                    <span class="text-xs">{{ pps_data?.risk_assessment }}</span>
                  </div>
                  <!-- Recomended Treatment -->
                  <div class="flex mt-4 flex-col border text-gray-700">
                    <h6 class="block text-xs font-medium text-gray-700">
                      {{ t("translation.recommended_treatment_text") }}:
                    </h6>
                    <span class="text-xs">{{
                      pps_data?.recommended_treatment
                    }}</span>
                  </div>
                  <div
                    class="mt-6 grid justify-items-stretch text-gray-700 border"
                  >
                    <span class="text-xs justify-self-start">
                      <span class="font-medium"
                        >{{ t("translation.performed_by_text") }}:</span
                      >
                      <br />
                      <span class="text-xs">{{
                        "Dr. " +
                        doctorInfo?.first_name +
                        " " +
                        doctorInfo?.last_name
                      }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- general treatment -->
            <div
              v-if="index === 'generalTreatment'"
              class="bg-gray-100 mt-1 border p-1"
            >
              <span class="text-xs font-bold text-gray-700 my-2">{{
                t("translation.treatments_text")
              }}</span>
              <div
                class="grid grid-cols-4 gap-2 font-bold text-gray-700 text-xs"
              >
                <span>{{ t("translation.code_text") }}</span>
                <span>{{ t("translation.name_text") }}</span>
                <span>{{ t("translation.tooth_text") }}</span>
                <span>{{ t("translation.treatments_text") }}</span>
              </div>
              <div
                v-for="general in toothsectionSegment['generalTreatment']"
                :key="general"
                class="grid grid-cols-4 gap-2 text-xs bg-gray-50 border border-gray-200 p-1"
              >
                <span>{{ general["treatment_code"] }}</span>
                <span>{{ general["treatment_name"] }}</span>
                <span>{{ general["tooth_elements"].join(", ") }}</span>
                <div
                  class="flex justify-between"
                  v-for="detail in general['treatments']"
                  :key="detail"
                >
                  <div class="flex flex-col divide divide-y">
                    <span v-for="code in detail['treatmentCodes']" :key="code"
                      >{{ t("translation.code_text") }}: {{ code }}</span
                    >
                  </div>
                  <div class="flex flex-col divide divide-y">
                    <span
                      v-for="price in detail['treatmentPrices']"
                      :key="price"
                      >{{ t("translation.amount_text") }}: {{ price }}</span
                    >
                  </div>
                  <div>
                    <span>{{ detail["general_remarks"] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
        </div>
   
    </ul>

    <!-- <PatientModal
      v-if="isAppDetailVisible === true"
      @close="closeAppDetail"
      :patient="selectedpatient"
    />-->
    <!-- <EmployeeModal
      class
      v-if=" isAppDetailVisibleEmployee === true"
      @close="closeEmployeeForm"
      :employee="selectedemployee"
    />-->
    <InvoiceModal
      v-if="isInvoiceVisible === true"
      @close="closeAppInvoiceDetail"
      :invoice="selectedInvoice"
    />
  </div>
</template>
  <script>
import { ref, computed, defineComponent, inject } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import {
  DotsHorizontalIcon,
  MailOpenIcon,
  ClockIcon,
} from "@heroicons/vue/outline";
// import getPatientsAppointments from "../../../../composables/appointmentsTab";
// import AppointmentModal from "./TreatmentModal.vue";
// import EmployeeModal from "./../employees/EmployeeModal.vue";
import InvoiceModal from "./InvoiceDetails.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "TreatmentListItem",
  props: {
    treatment: Object,
    selected: Boolean,
  },
  components: {
    DotsHorizontalIcon,
    MailOpenIcon,
    ClockIcon,
    // EmployeeModal,
    InvoiceModal,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },

  created() {},
  methods: { moment },
  setup(props, { emit }) {
    const isAppDetailVisible = ref(false);
    const isRescheduleVisible = ref(false);
    const isInvoiceVisible = ref(false);
    const selectedAppointment = ref(null);
    const isMenuVisible = ref(false);
    const isAppDetailVisibleEmployee = ref(false);
    const selectedemployee = ref(null);
    const selectedpatient = ref(null);
    const selectedInvoice = ref(null);
    const store = useStore();
    const doctors = computed(() => store?.state.patientsPatients?.doctors);
    const activeTab = ref();
    const toggleAccordion = (tab) => {
      if (activeTab.value === tab) {
        activeTab.value = null;
        console.log("clicked tab", tab);
        return;
      } else {
        console.log("clicked tab", tab);
      }
      activeTab.value = tab;
    };
    const showMenu = () => {
      isMenuVisible.value = true;
    };

    const showAppDetail = (patient) => {
      selectedpatient.value = patient;
      isAppDetailVisible.value = true;
      console.log("selected patient", patient);
    };
    const checkedTreatmentMethod = (event, appointment) => {
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
      if (string.length > limit) {
        return string.substring(0, limit) + "...";
      }
      return string;
    };
    const showAppInvoiceDetail = (invoice) => {
      console.log("selected invoice", invoice);
      isInvoiceVisible.value = true;
      selectedInvoice.value = invoice;
    };
    const closeAppInvoiceDetail = () => {
      isInvoiceVisible.value = false;
      selectedInvoice.value = null;
    };

    const user = inject("user");
    console.log("user changed", user);
    // const toothsectionSegment = JSON.parse(props.treatment.tooth_sections);
    const toothsectionSegment =
      props.treatment.tooth_sections !== undefined
        ? JSON.parse(props.treatment.tooth_sections)
        : "";
    const doctorInfo = props.treatment.doctor;
    const treatmentPrices = props.treatment?.treatment_price;
    const { t } = useI18n({});
    return {
      t,
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
      checkedTreatmentMethod,
      toggleAccordion,
      activeTab,
      toothsectionSegment,
      doctorInfo,
      treatmentPrices,
      selectedpatient,
      showAppInvoiceDetail,
      closeAppInvoiceDetail,
      isInvoiceVisible,
      selectedInvoice,
    };
  },
});
</script>
<style scoped>
.accordion__header {
  /* padding: 1em; */
  /* background-color: #fff; */
  /* margin-top: 2px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.accordion__header > * {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
}

.accordion__header.is-active {
  background-color: #dfe4ec;
}

.accordion__header:hover {
  /* background-color: #e8eaef; */
}

.accordion__toggle {
  margin-left: 10px;
  height: 3px;
  background-color: #222;
  width: 13px;
  display: block;
  position: relative;
  flex-shrink: 1;
  border-radius: 2px;
}

.accordion__toggle::before {
  content: "";
  width: 3px;
  height: 13px;
  display: block;
  background-color: #222;
  position: absolute;
  top: -5px;
  left: 5px;
  border-radius: 2px;
}

.date__hint {
  position: relative;
  margin-left: 30px;
  display: block;
}

.is-active .accordion__toggle::before {
  display: none;
}

.accordion__body {
  display: none;
  padding: 1em;
  border: 1px solid #ccc;
  border-top: 0;
}

.accordion__body.is-active {
  display: block;
}

input:checked {
  background-color: #ff782e !important;
  border: 1px solid #ff782e !important;
}
</style>
  