<template>
  <div
    class="bg-white dark:bg-dark-1 flex overflow-hidden w-full h-full"
    @click="outsideDialogBox"
  >
    <div
      class="grid grid-cols-12 h-full sm:grid-cols-5 gap-2 w-full product-container"
    >
      <div
        class="appointments-list h-full overflow-hidden col-span-12 border-r border-b border-gray-200"
      >
        <div class="w-auto gap-2 text-sm mt-2 content-center flex items-center">
          <!-- length checked -->
          <div
            class="mx-auto text-slate-500"
            v-if="filteredAppointments.length > 0"
          >
            {{ $t("translation.showing_text") }}
            {{ lengthFrom }}
            {{ $t("translation.to_text") }}
            3
            <!-- {{ lengthTo }} -->
            <!-- {{ $t("translation.of_text") }} -->
            {{ lengthTotal }}
            products
          </div>
          <div
            class="mx-auto text-slate-500"
            v-if="CheckedAppointmentlistMain.length > 0"
          >
            {{ $t("translation.selected_text") }}
            {{ CheckedAppointmentlistMain.length }}
            products
            <span
              @click="UncheckAllSelected"
              class="text-theme-1 hover:underline cursor-pointer"
            >
              {{ $t("translation.uncheck_all_text") }}
            </span>
          </div>
          <!-- length checked -->
        </div>

        <!-- search component  -->

        <!-- search component  -->

        <div
          class="grid grid-cols-4 w-full gap-2 text-sm mt-2 border-gray-300 bg-gray-100 dark:bg-dark-1 mx-1"
        >
          <!-- filter search -->
          <div
            class="col-span-4 flex justify-between items-center border-1 rounded-md border-gray-300 p-1 mx-1 bg-gray-100 dark:bg-dark-1"
          >
            <!-- key word -->

            <div
              class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 border-r border-gray-300 hidden 2xl:block xl:block"
              :class="displayNameFilter && 'lg:block md:block sm:block'"
            >
              <div class="w-56 relative text-slate-500">
                <input
                  type="text"
                  class="form-control w-56 box pr-10 focus:border-theme-36 focus:ring-0"
                  :placeholder="`${$t('translation.search_by_keyword_text')}`"
                  v-model="search_term"
                  @change="emptyInput"
                  @keyup="emptyInput"
                  @focus="searchFocus"
                  id="searchID"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  icon-name="search"
                  class="lucide lucide-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                  data-lucide="search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            <!-- status dropdown -->
            <div
              class="relative w-auto border-r border-gray-300 bg-gray-100 dark:bg-dark-1 mr-2 hidden 2xl:block xl:block"
              :class="displayStatusFilter && 'lg:block md:block sm:block'"
              id="statusselector"
            >
              <div class="w-56 flex items-center justify-between">
                <input
                  type="text"
                  class="form-control w-56 box pr-10 focus:border-theme-36 focus:ring-0"
                  :placeholder="`${$t('translation.filter_by_text')}`"
                  v-model="filter_option"
                  @focus="expandStatusPanel"
                  readonly
                />

                <ChevronDownIcon
                  @click="isFilterOptions = !isFilterOptions"
                  class="h-5 w-5 text-gray-500 mr-2"
                ></ChevronDownIcon>
              </div>

              <div
                class="option-container mt-6 text-gray-800 ml-0 mt-2 shadow-lg bg-gray-100 dark:bg-dark-1 absolute w-full h-30 overflow-y-auto z-10 rounded-md scrollContent"
                v-if="isFilterOptions"
              >
                <div
                  class="options-list mt-0 pt-0 flex justify-between items-center cursor-pointer bg-white w-full"
                  v-for="(option, index) in filterOptions"
                  :key="index"
                >
                  <input
                    type="text"
                    class="border-0 p-2 w-full cursor-pointer cursor-pointer bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white ml-1 hover:bg-gray-200 hover:shadow-md0"
                    :value="option.name"
                    @click="selectOption(option.value)"
                    readonly
                  />
                </div>
                <div
                  class="flex justify-end border-t text-base shadow-md text-gray-400 border-gray-300 bg-gray-100 dark:bg-dark-1 items-center p-2"
                >
                  <div
                    class="w-auto flex items-center group hover:bg-slate-200 capitalize p-1 rounded-sm hover:text-gray-800 cursor-pointer bg-gray-100 dark:bg-dark-1 text-gray-800 dark:text-white"
                    @click="hideFilterOptions"
                  >
                    <XIcon class="w-6 h-6" />
                    <span>{{ $t("translation.close_text") }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- date filter  -->
            <div
              class="relative w-auto hidden 2xl:block xl:block z-50 items-center"
              id="dateselector"
              :class="displayDateFilter && 'lg:block md:block sm:block'"
            >
              <div class="flex w-auto justify-between items-center rounded-md">
                <div
                  class="flex border-none outline-0 group relative h-10 cursor-pointer"
                >
                  <div class="w-38 flex items-center justify-between">
                    <input
                      type="text"
                      class="form-control w-36 box focus:border-theme-36 focus:ring-0"
                      :placeholder="`${$t('translation.select_date_text')}`"
                      v-model="filter_date"
                      @focus="showFilterDates"
                      readonly
                    />

                    <ChevronDownIcon
                      class="h-5 w-5 text-gray-500 mr-2"
                      @click="showFilterDates"
                    />
                  </div>

                  <div
                    class="flex flex-col w-full border-1 rounded-sm top-14 absolute p-0 text-sm bg-gray-100 dark:bg-dark-1"
                    v-if="isFilterDates === true"
                  >
                    <div
                      class="flex-1 overflow-y-auto scrollContent bg-gray-100 dark:bg-dark-1"
                    >
                      <div
                        class="text-slate-800 cursor-pointer bg-gray-100 dark:bg-dark-1"
                        v-for="(option, index) in filterDates"
                        :key="index"
                      >
                        <input
                          type="text"
                          class="w-full p-2 cursor-pointer hover:bg-slate-200 text-sm status bg-gray-100 dark:bg-dark-1 hover:bg-gray-200 hover:shadow-md"
                          style="
                            border: none !important;
                            background-color: !important;
                          "
                          :value="option.name"
                          @click="selectDate(option.value)"
                          readonly
                        />
                      </div>
                    </div>

                    <div
                      class="flex justify-end border-t text-base shadow-md text-gray-400 border-gray-300 bg-gray-100 dark:bg-dark-1 items-center p-2"
                    >
                      <div
                        class="w-auto flex items-center group hover:bg-gray-200 capitalize p-1 rounded-sm hover:text-slate-600 cursor-pointer"
                        @click="isFilterDates = false"
                      >
                        <XIcon class="w-6 h-6" />
                        <span>{{ $t("translation.close_text") }}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="w-auto flex flex-wrap justify-end items-center bg-gray-100 h-10 calender-width"
                    v-if="isCustomView"
                  >
                    <div
                      class="w-auto sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 border-r border-gray-300"
                    >
                      <div class="w-60 relative text-slate-500">
                        <Datepicker
                          v-model="date"
                          range
                          :format="format"
                          multiCalendars
                          :multiStatic="false"
                          calendarClassName=" dp-custom-calendar"
                          :placeholder="`${$t('translation.date_range_text')}`"
                          class="w-full"
                          :locale="lang"
                          :select-text="`${$t('translation.select_text')}`"
                          :cancel-text="`${$t('translation.cancel_text')}`"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-full justify-end items-center bg-gray-100 h-10 calender-width"
                    v-if="isMonthView"
                  >
                    <div class="w-40 relative text-slate-500">
                      <Datepicker
                        v-model="month"
                        monthPicker
                        calendarClassName="dp-custom-calendar"
                        :placeholder="`${$t('translation.month_range_text')}`"
                        class="w-full"
                        :locale="lang"
                        :select-text="`${$t('translation.select_text')}`"
                        :cancel-text="`${$t('translation.cancel_text')}`"
                      />
                    </div>
                  </div>
                  <div
                    class="flex w-full justify-end items-center bg-gray-100 h-10 calender-width"
                    v-if="isWeekView"
                  >
                    <div class="w-60 relative text-slate-500">
                      <Datepicker
                        v-model="date"
                        weekPicker
                        :multiStatic="false"
                        calendarClassName="dp-custom-calendar"
                        :placeholder="`${$t('translation.week_range_text')}`"
                        class="w-full"
                        :locale="lang"
                        :select-text="`${$t('translation.select_text')}`"
                        :cancel-text="`${$t('translation.cancel_text')}`"
                      />
                    </div>
                  </div>
                  <div
                    class="w-auto flex justify-end items-center bg-gray-100 h-10 calender-width"
                    v-if="isYearView"
                  >
                    <div class="w-40 relative text-slate-500">
                      <Datepicker
                        v-model="year"
                        yearPicker
                        calendarClassName="dp-custom-calendar"
                        :placeholder="`${$t('translation.year_range_text')}`"
                        class="w-full"
                        :locale="lang"
                        :select-text="`${$t('translation.select_text')}`"
                        :cancel-text="`${$t('translation.cancel_text')}`"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- date dropdown hide -->

            <!-- date filter-->

            <div
              class="w-full ml-1 relative col-span-1 flex justify-end gap-3"
              id="exportselector"
            >
              <Button
                :label="`${$t('translation.clear_text')}`"
                class="!text-sm !capitalize transparent"
                icon="fa fa-refresh "
                @click="clearall"
              ></Button>

              <Button
                :label="`${$t('translation.export_text')}`"
                icon="fa fa-arrow-up "
                class="!text-sm !capitalize transparent"
                @click="showFilterOptionsForExports"
              ></Button>
              <Button
                id="showfilterss"
                :label="'Filter'"
                icon="fa fa-solid fa-filter "
                @click="showFilterList"
                class="2xl:invisible xl:invisible !text-sm !capitalize !w-auto"
              ></Button>

              <!-- export buttons -->
              <div
                class="max-h-44 flex justify-end flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                v-if="isFilterOptionsForExports"
              >
                <div
                  class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                  style="margin-top: 13px"
                >
                  <div class="items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.print_text')}`"
                      @click="printData()"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.pdf_text')}`"
                      @click="printObject('pdf', 'Appointments')"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.excel_text')}`"
                      @click="
                        printObject(
                          'xlsx',
                          'appointments',
                          '/patients/appointments/download-excel'
                        )
                      "
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.csv_text')}`"
                      @click="
                        printObject(
                          'csv',
                          'Appointments',
                          '/patients/appointments/download-csv'
                        )
                      "
                      class="border-t bold border-0 cursor-pointer w-full hover:bg-gray-100 h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                </div>

                <div
                  class="flex justify-end bg-white text-base shadow-md text-gray-400 border-t border-gray-300 items-center p-2 w-32"
                >
                  <div
                    class="flex items-center group hover:bg-gray-200 capitalize p-1 rounded-sm hover:text-slate-600 cursor-pointer"
                    @click="hideFilterOptionsForExports"
                  >
                    <XIcon class="w-6 h-6" />
                    <span class="text-center">{{
                      $t("translation.close_text")
                    }}</span>
                  </div>
                </div>
              </div>
              <!-- export loader -->
              <div
                class="max-h-44 flex flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                v-if="isExporting"
              >
                <div
                  class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                  style="margin-top: 13px"
                >
                  <div
                    class="flex h-auto gap-2 w-full text-sm text-gray-800 justify-center items-center p-2"
                  >
                    <svg
                      class="animate-spin h-6 w-6 text-yellow-650"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#FF782E"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-1"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <p>{{ $t("translation.exporting_text") }}..</p>
                  </div>
                </div>
              </div>

              <!-- filter buttons -->
              <div
                class="max-h-44 flex justify-end flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                v-if="isFilterList"
              >
                <div
                  class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                  style="margin-top: 13px"
                >
                  <div class="items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.status_text')}`"
                      @click="showStatusFilter"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.name_text')}`"
                      @click="showNameFilter"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                      :label="`${$t('translation.date_text')}`"
                      @click="showDateFilter"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white"
                    ></Button>
                  </div>
                </div>

                <div
                  class="flex justify-end bg-white text-base shadow-md text-gray-400 border-t border-gray-300 items-center p-2 w-32"
                >
                  <div
                    class="flex items-center group hover:bg-gray-200 capitalize p-1 rounded-sm hover:text-slate-600 cursor-pointer"
                    @click="isFilterList = false"
                  >
                    <XIcon class="w-6 h-6" />
                    <span class="text-center">{{
                      $t("translation.close_text")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- exports filter -->
        </div>

        <List
          :appointments="filteredAppointments"
          :isLoading="isLoading"
          @clearFilter="clearFilters"
          :isPending="isPending"
          :isTarget="isTarget"
          :filterOption="filter_option"
          :endScope="pagination.next_page_url === pagination.last_page_url"
          :isUnchenkallstatus="isUnchenkallstatus"
          @refreshAppointments="fetchMoreData"
          @checkedAppointmentList="checkedAppointmentList"
        ></List>
      </div>
    </div>
  </div>
</template>
<script >
import moment from "moment";
// import axios from 'axios'
import axios from "../../../axios";
import AppointmentsService from "../../../service/appointments-service";
import { ref, inject } from "vue";
import debounce from "lodash.debounce";
import Button from "@/components/shared/buttons/Button.vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { allappointments } from "../../../store/appointments";
import {
  CalendarIcon,
  SearchIcon,
  ChevronDownIcon,
  XIcon,
} from "@heroicons/vue/outline";
// import Button from "../../../global/Button.vue";
import List from "./List.vue";
import Datepicker from "@vuepic/vue-datepicker";

export default {
  name: "Container",
  components: {
    List,
    Button,
    CalendarIcon,
    SearchIcon,
    ChevronDownIcon,
    // Button,
    Datepicker,
    XIcon,
  },
  inject: ["showrecalls"],

  data() {
    return {
      filteredResponse: null,

      isLoadingdoctors: true,
      isFilterDates: false,
      isShowDates: false,
      appointments: [],
      allAppointmentssearch: [],
      patient: {},
      isLoading: false,
      isSearching: false,
      doctorName: "",
      search_term: null,
      isPending: false,
      isAppointmentModal: false,
      isFilterOptions: false,
      isFilterOptionsDate: false,
      // filterDates: ["1 Week", "1 Month", "1 Year", "Custom"],
      //     oneWeek:'Week',
      // oneMonth:'Maand',
      // oneYear:'Jaar',
      // customtext:'Aangepast',
      filterDates: [
        {
          name: this.t("translation.oneWeek"),
          value: "1 Week",
        },
        {
          name: this.t("translation.oneMonth"),
          value: "1 Month",
        },
        {
          name: this.t("translation.oneYear"),
          value: "1 Year",
        },
        {
          name: this.t("translation.customtext"),
          value: "Custom",
        },
      ],
      isCustomView: false,

      isMonthView: false,
      isWeekView: false,
      isYearView: false,
      isTodayView: false,
      isFilterOptionsForExports: false,
      isExporting: false,
      isUnchenkallstatus: null,
      isTarget: true,
      filterStatus: null,
      status: null,
      date: null,
      allAppstatus: "true",
      onLoadApp: "yes",

      filterOptions: [
        {
          name: this.t("translation.product_text"),
          value: "product",
        },
        {
          name: this.t("translation.service_text"),
          value: "service",
        },
      ],
      filterOptionsfff: [
        "Pending",
        "Waiting",
        "Confirmed",
        "Missed",
        "Completed",
        "Serving",
        "Canceled",
        "Upcoming appointments",
        "Past appointments",
        // "All appointments"
      ],
      filterOptionsDate: ["1 Week", "1 Month", "1 Year", "Custom"],
      filter_option: null,
      filter_option_date: "",
      isFilterTypes: false,

      treatment_id: null,
      filterOptionsForExports: ["PDF", "CSV", "Excel", "Print"],
      filter_option_exports: "",
      doctors: [],
      types: [],
      doctor_id: null,
      isDoctorList: false,
      isDoctorGroup: false,
      selected_doctors: [],
      selected_doctorsIDs: [],
      selected_doctorsNames: [],
      doctorsExpanded: false,
      isFilterList: false,
      selectedDoctors: [],
      selectedDoctorIds: [],
      doctorListSearch: "",
      numberDoctor: 0,
      clear: 0,
      firstDate: "",
      secondDate: "",
      filter_option_type: "",
      filter_date: "",
      isTreatments: false,
      typeID: "",
      current_page: 1,
      year: null,
      year_range: null,
      last_page: "",

      list: [],
      CheckedAppointmentlistMain: [],
      counter: 1,
      paginatedData: [],
      pagination: {
        last_page_url: null,
        next_page_url: "patients/appointments/all-paginated",
      },
      upcoming_appointments: null,
      past_appointments: null,
      date_range: null,
      month_range: null,
      lengthFrom: 1,
      lengthTo: null,
      lengthTotal: null,
      lengthCheched: null,
      focusTarget: null,
      displayDateFilter: false,
      displayNameFilter: true,
      displayStatusFilter: false,
      ourRequest: null,
      source: null,
    };
  },
  created() {
    this.getDummyData();
    // this.appointments = [];
    // this.paginatedData = [];
    // this.fetchAppointmentTypes();
  },

  methods: {
    showStatusFilter() {
      this.displayStatusFilter = true;

      this.isFilterList = false;
      this.displayDateFilter = false;
      this.displayNameFilter = false;
    },
    showDateFilter() {
      this.displayDateFilter = true;
      this.displayStatusFilter = false;
      this.displayNameFilter = false;
      this.isFilterList = false;
    },
    showNameFilter() {
      this.displayNameFilter = true;
      this.displayDateFilter = false;
      this.displayStatusFilter = false;
      this.isFilterList = false;
    },
    showFilterList() {
      this.isFilterList = !this.isFilterList;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;

      this.isFilterDates = false;

      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
    },

    outsideDialogBox: function (e) {
      // close statusselector
      if (!document.getElementById("statusselector")?.contains(e.target)) {
        this.isFilterOptions = false;
      }
      // close dateselector
      if (!document.getElementById("dateselector")?.contains(e.target)) {
        this.isFilterDates = false;
      }
      // close doctorselector
      if (!document.getElementById("doctorselector")?.contains(e.target)) {
        this.doctorsExpanded = false;
      }

      //  close exportselector
      if (!document?.getElementById("exportselector")?.contains(e.target)) {
        this.isFilterOptionsForExports = false;
        this.isFilterList = false;
      } else {
        console.log("inside popup");
      }
    },

    emptyInput() {
      if (this.search_term?.length < 1) {
        this.clearall();
      }
    },
    UncheckAllSelected() {
      this.isUnchenkallstatus = undefined;
      if (this.CheckedAppointmentlistMain.length > 0) {
        this.CheckedAppointmentlistMain.length = [];
        this.isUnchenkallstatus = true;
      }

      console.log("isUnchenkallstatus", this.isUnchenkallstatus);
    },
    checkedAppointmentList(checkedAppointments) {
      this.CheckedAppointmentlistMain = checkedAppointments;
    },

    async fetchMoreData() {
      console.log("fetchMoreData");

      this.paginatedAppointment;
    },

    getDummyData() {
      console.log("getting dummy");
      const myappointments = {
        currentPage: 1,
        totalPages: 2163,
        totalItems: 25946,
        perPage: 12,
        nextPageUrl:
          "https://127.0.0.1:8000/api/v2/products/all-paginated?page=2",
        prevPageUrl: null,
        firstPageUrl:
          "https://127.0.0.1:8000/api/v2/products/all-paginated?page=1",
        lastPageUrl:
          "https://127.0.0.1:8000/api/v2/products/all-paginated?page=2163",
        data: [
          {
            id: 1,
            name: "Product 1",
            description: "This is a product description.",
            category: "product",
            brand: "Brand A",
            discounted_price: 19.99,
            quantity: 100,
            SKU: "SKU12345",
            weight: "1.5 lbs",
            dimensions: "5 x 5 x 10 inches",
            images: ["https://via.placeholder.com/150", "image2.jpg"],
            specifications: {
              color: "Red",
              size: "Large",
            },
            availability: false,
            rating: 4.5,
            reviews: 25,
            created_at: "2023-09-29T10:00:00Z",
            vendor: "Vendor X",
          },
          {
            id: 2,
            name: "Service 1",
            description: "This is a service description.",
            category: "service",
            brand: "Brand Q",
               brand: "Brand B",
            discounted_price: 50.00,
            quantity: null,
            SKU: null,
            weight: null,
            dimensions: null,
            images: ["https://via.placeholder.com/150"],
            specifications: {},
            availability: true,
            rating: 4.0,
            reviews: 10,
            created_at: "2023-09-29T11:30:00Z",
            vendor: "Vendor Y",
          },
          {
            id: 3,
            name: "Product 2",
            description: "Another product description.",
            category: "product",
            brand: "Brand B",
            discounted_price: 29.99,
            quantity: 50,
            SKU: "SKU67890",
            weight: "2.0 lbs",
            dimensions: "6 x 6 x 12 inches",
            images: ["https://via.placeholder.com/150", "image4.jpg"],
            specifications: {
              color: "Blue",
              size: "Medium",
            },
            availability: true,
            rating: 5.0,
            reviews: 35,
            created_at: "2023-09-29T12:15:00Z",
            vendor: "Vendor Z",
          },
          // Add more products and services here as needed
        ],
      };
      console.log("dummy products", myappointments?.data);

      this.appointments = this.appointments.concat(myappointments?.data);
      let currentPage = myappointments?.current_page;
      this.last_page = myappointments?.last_page_url;
      let next_page_url = myappointments?.next_page_url;
      this.links = myappointments?.links;
      this.pagination = {
        last_page_url: myappointments?.last_page_url,
        next_page_url: myappointments?.next_page_url,
      };
      // this.lengthFrom=response.data.payload.from
      this.lengthTo = myappointments?.to;
      this.lengthTotal = myappointments?.total;
    },

    async fetchAll(data) {
      this.ourRequest = axios.CancelToken.source();
      const store = useStore();
      // const token = localStorage.getItem('token')
      if (
        this.pagination.next_page_url !== this.pagination.last_page_url ||
        this.pagination.next_page_url === this.pagination.last_page_url
      ) {
        if (this.pagination.next_page_url !== null) {
          this.isLoading = true;
          let url = this.pagination.next_page_url;
          const finalToken = this.ourRequest.token;

          await this.$store.dispatch("allappointments/FetchAppointments", {
            url,
            data,
            finalToken,
          });
          this.isLoading = false;
          const myappointments =
            this.$store?.state?.allappointments?.patientAppointments;
          console.log("store appointments", myappointments?.data);
          // let latest = response?.data?.data;

          this.appointments = this.appointments.concat(myappointments?.data);
          let currentPage = myappointments?.current_page;
          this.last_page = myappointments?.last_page_url;
          let next_page_url = myappointments?.next_page_url;
          this.links = myappointments?.links;
          this.pagination = {
            last_page_url: myappointments?.last_page_url,
            next_page_url: myappointments?.next_page_url,
          };
          // this.lengthFrom=response.data.payload.from
          this.lengthTo = myappointments?.to;
          this.lengthTotal = myappointments?.total;
          // try {
          //   AppointmentsService.fetchAppointments(
          //     url,
          //     data,
          //     this.ourRequest.token
          //   )
          //     .then((response) => {
          //       this.isLoading = false;
          //       console.log(
          //         "new response eeeee response ",
          //         response?.data?.data
          //       );
          //       if (response?.data?.error === "Token is Expired") {
          //         this.$store.dispatch("auth/logout");
          //         this.$router.push("/login");
          //       }

          //       let latest = response?.data?.data;

          //       this.appointments = this.appointments.concat(
          //         response?.data?.data
          //       );
          //       let currentPage = response?.data?.current_page;
          //       this.last_page = response?.data?.last_page_url;
          //       let next_page_url = response?.data?.next_page_url;
          //       this.links = response?.data?.links;
          //       this.pagination = {
          //         last_page_url: response?.data?.last_page_url,
          //         next_page_url: response?.data?.next_page_url,
          //       };

          //       this.lengthTo = response?.data?.to;
          //       this.lengthTotal = response?.data?.total;
          //       console.log("cancelled response", response);
          //     })
          //     .catch(function (thrown) {
          //       console.log("Request cancelling error", thrown);

          //       if (thrown.message === "canceled") {
          //         console.log("Request canceled vvvvv", thrown.message);
          //       } else {

          //       }
          //     });
          // } catch (err) {
          //   console.log("error: ", err);
          // }
        } else {
          this.pagination = {
            last_page_url: null,
            next_page_url: "products/appointments/all-paginated",
          };
        }
      }
    },

    async exportDataTable() {
      console.log("length", this.CheckedAppointmentlistMain.length);
      if (this.CheckedAppointmentlistMain.length > 0) {
        let appointments = [];
        appointments = this.CheckedAppointmentlistMain;
        return appointments;
      } else {
        let appointments = [];
        this.filteredResponse.forEach((e) => {
          appointments.push(e.id);
        });
        return appointments;
      }
      // return appointments;
    },

    // pdf excel, csv export
    async printObject(
      type,
      filename = "Appointments",
      url = "/products/appointments/download-pdf"
    ) {
      try {
        const appointment2 = await this.exportDataTable();
        const token = localStorage.getItem("token");
        const config = {
          url: url,
          method: "get",
          responseType: "blob",

          params: {
            appointments: JSON.stringify(appointment2),
            lang: this.lang,
          },
          headers: {
            Authorization: "Bearer " + token,

            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        };
        this.hideFilterOptionsForExports();
        this.showExportLoader();

        axios(config)
          .then((response) => {
            const blob = new Blob([response.data], {
              type: `application/${type}`,
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.${type}`;
            link.click();
            URL.revokeObjectURL(link.href);
          })
          .catch((err) => {
            console.log(`PrintError: , ${err}`);
          });

        this.hideExportLoader();
      } catch (err) {
        console.log("error: ", err);
      }
    },
    async printData() {
      const appointment2 = await this.exportDataTable();
      const token = localStorage.getItem("token");
      const config = {
        url: "/products/appointments/download-pdf",
        method: "get",
        responseType: "blob",
        params: {
          appointments: JSON.stringify(appointment2),
        },
        headers: {
          Authorization: "Bearer " + token,

          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      };
      this.hideFilterOptionsForExports();
      this.isExporting = true;
      axios(config).then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });

        // window.open(URL.createObjectURL(blob)).print();

        let iframe = document.createElement("iframe"); //load content in an iframe to print later
        document.body.appendChild(iframe);

        iframe.style.display = "none";
        iframe.src = URL.createObjectURL(blob);
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      });

      this.hideExportLoader();
    },
    searchFocus() {
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      this.isFilterList = false;
    },
    expandDoctorPanel() {
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = !this.doctorsExpanded;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      this.isFilterList = false;
      document.activeElement.blur();
      console.log("this.selected_doctorsIDs mmm", this.selected_doctorsIDs);
      // document.getElementById("invisibleFocus").focus();
      // this.focusTarget="doctorsExpanded"
    },

    showFilterDates() {
      setTimeout(() => {
        this.isFilterDates = !this.isFilterDates;
        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterList = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;
        this.isFilterOptionsForExports = false;
        document.activeElement.blur();
      }, 200);
    },
    hideFilterDates() {
      setTimeout(() => {
        this.isFilterDates = false;
      }, 200);
    },
    selectDate(option) {
      this.filter_date = option;
      this.isCustomView = false;
      this.isMonthView = false;
      this.isYearView = false;
      this.isWeekView = false;
      this.dialogClear();
      if (option === "Custom") {
        this.isCustomView = true;
        this.filter_date = this.t("translation.customtext");
      } else if (option === "1 Month") {
        // this.isPending = false;

        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterList = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;
        this.isMonthView = true;
        this.filter_date = this.t("translation.oneMonth");
      } else if (option === "1 Year") {
        // this.isPending = false;

        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterList = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;
        this.isYearView = true;
        this.filter_date = this.t("translation.oneYear");
      } else if (option === "1 Week") {
        // this.isPending = false;
        this.isFilterOptionsForExports = false;
        this.doctorsExpanded = false;
        this.isFilterOptions = false;
        this.isFilterOptionsDate = false;

        this.isWeekView = true;
        this.filter_date = this.t("translation.oneWeek");
      }
      this.hideFilterDates();
    },
    showFilterOptionsForExports() {
      this.isFilterOptionsForExports = !this.isFilterOptionsForExports;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;

      this.isFilterDates = false;

      this.isFilterList = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
    },
    dialogClear() {
      this.clear = 1;
      this.search_term = null;
      this.doctorName = "";
      this.firstDate = "";
      this.secondDate = "";
      this.status = null;
      this.year = null;
      this.year_range = null;
      // this.isPending = false;
      this.filter_option = null;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.selected_doctorsIDs = [];
      this.doctorName = null;
      this.past_appointments = null;
      this.date_range = null;
      this.filterStatus = null;
      this.upcoming_appointments = null;
      this.month_range = null;
      this.pagination = {
        last_page_url: null,
        next_page_url: "patients/appointments/all-paginated",
      };
    },
    clearall() {
      this.ourRequest.cancel();
      this.appointments = [];
      this.paginatedData = [];
      this.clear = 1;
      this.search_term = null;
      this.doctorName = "";
      this.firstDate = "";
      this.secondDate = "";
      this.year = null;
      (this.year_range = null),
        // this.isPending = false;
        (this.status = null);
      this.filterStatus = null;
      this.filter_option = null;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterList = false;
      this.isFilterOptions = false;
      this.isFilterOptionsDate = false;
      this.isFilterDates = false;
      this.selected_doctorsIDs = [];
      this.selected_doctorsNames = [];

      this.filterStatus = null;
      this.CheckedAppointmentlistMain.length = 0;
      this.doctorName = null;
      this.past_appointments = null;
      this.date_range = null;
      this.upcoming_appointments = null;
      this.month_range = null;
      this.pagination = {
        last_page_url: null,
        next_page_url: "patients/appointments/all-paginated",
      };
      this.paginatedAppointment;
    },

    expandStatusPanel() {
      this.isFilterOptions = !this.isFilterOptions;
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterList = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      document?.activeElement?.blur();
    },
    showFilterOptions() {
      this.isFilterOptions = true;
      this.isFilterDates = false;
      this.isFilterOptionsForExports = false;
      this.doctorsExpanded = false;
      this.isFilterList = false;
      this.isFilterOptionsDate = false;
      this.isFilterOptionsForExports = false;
      document?.activeElement?.blur();
    },
    showFilterOptionsDate() {
      this.isFilterOptionsDate = true;
    },
    hideFilterOptionsDate() {
      this.isFilterOptionsDate = false;
    },
    showTreatments() {
      this.isTreatments = true;
    },
    selectOptionForExports(option) {
      this.filter_option_exports = option;
      this.performAction(option);
      this.hideFilterOptionsForExports();
    },
    hideFilterOptionsForExports() {
      setTimeout(() => {
        this.isFilterOptionsForExports = false;
      }, 200);
    },

    hideExportLoader() {
      setTimeout(() => {
        this.isExporting = false;
      }, 200);
    },
    showExportLoader() {
      this.isExporting = true;
    },
    hideFilterOptions() {
      setTimeout(() => {
        this.isFilterOptions = false;
      }, 200);
    },
    selectedTreatment(treatment) {
      this.isTreatments = false;

      this.treatment_id = treatment.id;
      this.typeID = treatment.id;
      this.selected_treatment = treatment.treatment;
    },
    hideTreatments() {
      this.selected_treatment = "";
      setTimeout(() => {
        this.isTreatments = false;
      }, 200);
    },

    selectOption(option) {
      if (option === "Pending") {
        this.filter_option = this.t("translation.pending_text");
      } else if (option === "Waiting") {
        this.filter_option = this.t("translation.waiting_text");
      } else if (option === "Confirmed") {
        this.filter_option = this.t("translation.confirmed_text");
      } else if (option === "Missed") {
        this.filter_option = this.t("translation.missed_text");
      } else if (option === "Completed") {
        this.filter_option = this.t("translation.completed_text");
      } else if (option === "Serving") {
        this.filter_option = this.t("translation.serving_text");
      } else if (option === "Canceled") {
        this.filter_option = this.t("translation.canceled_text");
      } else if (option === "Upcoming appointments") {
        this.filter_option = this.t("translation.product_text");
        console.log("translated final value", this.filter_option);
      } else if (option === "Past appointments") {
        this.filter_option = this.t("translation.service_text");
      } else {
        this.filter_option = option;
      }

      // this.filter_option = option;
      this.hideFilterOptions();
    },
    selectOptionType(option) {
      this.filter_option_type = option;
      this.hideFilterOptions();
    },
    selectOptionDate(option) {
      this.filter_option_date = option;

      this.hideFilterOptionsDate();
    },

    clearFilters() {
      this.search_term = "";
      this.isPending = false;
      this.filter_option = "";
    },
    showModal() {
      this.isAppointmentModal = true;
      document.querySelector("html").classList.add("preventScroll");
    },
    hideModal() {
      this.isAppointmentModal = false;
      document.querySelector("html").classList.remove("preventScroll");
    },
    performAction(query) {
      if (query === "CSV") this.downloadCSV();
      if (query === "PDF") this.downloadPdf();
      if (query === "Excel") this.downloadExcel();
      if (query === "Print") this.printPdf();
    },

    handleDate(modelData) {
      this.filter_option = null;
      this.search_term = null;
      this.date = modelData;
      const startDate = date.value[0];
      const endDate = date.value[1];
    },

    // async fetchDoctors() {
    //   this.isLoadingdoctors = true
    //   await axios.get('v3/calendar/doctor-assistants').then(response => {
    //     this.isLoadingdoctors = false
    //     this.doctors = response?.data?.payload
    //   })
    // },
    async fetchAppointmentTypes() {
      await axios.post("v2/appointmenttypes/all").then((response) => {
        this.types = response?.data?.payload;
      });
    },
    showDoctors() {
      this.doctorsExpanded = !this.doctorsExpanded;
      this.isFilterOptionsForExports = false;
    },
    docSelected(docId) {
      console.log(" docId", docId, this.selected_doctorsIDs);
      return docId === this.selected_doctorsIDs?.find((ele) => ele === docId);
    },

    checkedDoc(event, doctor) {
      if (event.target.checked) {
        this.isPending = false;
        this.selected_doctorsIDs.push(doctor.id);
        this.selected_doctorsNames.push(doctor);
        // this.doctorName = doctor.first_name + "\xa0" + doctor.last_name;
        const appointments = [...this.appointments];
        const index = this.selected_doctorsIDs;
        this.numberDoctor = Object.keys(index).length;
        console.log("this.selected_doctorsIDs", this.selected_doctorsIDs);
        if (this.numberDoctor === 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            "\xa0" +
            this.selected_doctorsNames[0].last_name;
        } else if (this.numberDoctor > 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            "\xa0" +
            this.selected_doctorsNames[0].last_name +
            "\xa0" +
            "(" +
            "+" +
            (this.numberDoctor - 1) +
            ")";
        }

        let docAppointments = appointments.filter((appointment) => {
          return appointment.doctors.find((doc) =>
            this.selected_doctorsIDs.includes(doc?.id)
          );
        });
      } else {
        this.selected_doctorsIDs.splice(
          this.selected_doctorsIDs.indexOf(doctor.id),
          1
        );
        this.selected_doctorsNames.splice(
          this.selected_doctorsNames.indexOf(doctor),
          1
        );

        this.numberDoctor = Object.keys(this.selected_doctorsIDs).length;
        if (this.numberDoctor === 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            "\xa0" +
            this.selected_doctorsNames[0].last_name;
        } else if (this.numberDoctor > 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            "\xa0" +
            this.selected_doctorsNames[0].last_name +
            "\xa0" +
            "(" +
            "+" +
            (this.numberDoctor - 1) +
            ")";
        }
        if (this.selected_doctorsIDs.length === 0) {
          console.log("changed doctors to 0");
          this.selected_doctorsIDs = this.selected_doctorsIDs;
          this.search_term = null;
          this.year = null;
          this.filterStatus = null;
          this.date_range = null;
          // this.filter_option= null;
          this.appointments = [];
          this.paginatedData = [];
          this.past_appointments = null;
          this.past_appointments = null;
          this.pagination = {
            last_page_url: null,
            next_page_url: "patients/appointments/all-paginated",
          };
          console.log(
            "a thing changed this.selected_doctorsIDs,  this.search_term",
            this.selected_doctorsIDs,
            this.search_term
          );
          this.paginatedAppointment;
        }
      }
    },
  },
  computed: {
    async paginatedAppointment() {
      // keyword
      console.log("past_appointments"), this.past_appointments;
      if (!!this.search_term) {
        this.fetchAll({ search_word: this.search_term });
      }

      // status
      else if (!!this.filterStatus) {
        this.fetchAll({ status: this.filterStatus });
      }
      // this.past_appointments
      else if (!!this.past_appointments) {
        const originalDate = this.past_appointments;
        const convertedDate = moment(originalDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
        this.fetchAll({
          past_appointments: convertedDate,
        });
      }

      // this.upcoming_appointments
      else if (!!this.upcoming_appointments) {
        const originalDate = this.upcoming_appointments;
        const convertedDate = moment(originalDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );

        console.log("this.upcoming_appointments", convertedDate);
        this.fetchAll({
          upcoming_appointments: convertedDate,
        });
      }
      // year filter
      else if (!!this.year) {
        this.fetchAll({ year: this.year_range });
      }

      // date range
      else if (this.date_range) {
        this.fetchAll({ date_range: this.date_range });
      }

      // month range
      else if (this.month_range) {
        const month = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format("MM");
        const year = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format("YYYY");
        this.month_range = [month, year];
        this.fetchAll({ month_range: this.month_range });
      } else {
        this.fetchAll({});
      }
    },

    filteredAppointments() {
      // let allAppointments = this.appointments;
      let allAppointments = [...this.appointments];

      this.filteredResponse = allAppointments;
      return allAppointments;
    },
    filteredTreatments() {
      let treatmentList = this.types;

      if (this.selected_treatment) {
        treatmentList = treatmentList.filter(
          (treatment) =>
            treatment.treatment
              .toUpperCase()
              .includes(this.selected_treatment.toUpperCase()) ||
            treatment.code
              .toUpperCase()
              .includes(this.selected_treatment.toUpperCase())
        );
      }
      return treatmentList;
    },

    // Doctor Search Filter
    filteredDoctors() {
      let doctorsList = this.doctors;
      if (this.doctorListSearch) {
        doctorsList = this.doctors.filter(
          (doctor) =>
            doctor.first_name
              .toLowerCase()
              .indexOf(this.doctorListSearch.toLowerCase()) >= 0 ||
            doctor.last_name
              .toLowerCase()
              .indexOf(this.doctorListSearch.toLowerCase()) >= 0
        );
      }
      return doctorsList;
    },
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal",
      };
    },
  },
  watch: {
    // keyword
    search_term: debounce(function (e) {
      if (!!this.search_term) {
        //  this.source?.cancel();
        this.ourRequest.cancel();

        this.appointments = [];
        this.paginatedData = [];

        this.search_term = this.search_term;
        this.appointments = [];
        this.paginatedData = [];
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.CheckedAppointmentlistMain = [];
        this.doctorName = null;
        this.status = null;
        this.filterStatus = null;
        this.month_range = null;
        this.year = null;
        this.filter_option = null;
        this.upcoming_appointments = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,

          next_page_url: "patients/appointments/all-paginated",
        };
        this.isTarget = false;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      }
    }, 500),

    // status

    filter_option(newsearch_term, oldfilteroption) {
      if (!!newsearch_term) this.ourRequest.cancel();

      if (newsearch_term === this.t("translation.missed_text")) {
        this.year = null;
        this.month_range = null;
        this.search_term = null;
        this.appointments = [];
        this.paginatedData = [];
        this.filterStatus = 6;
        this.date_range = null;
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.past_appointments = null;
        this.past_appointments = null;

        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.pending_text")) {
        this.year = null;
        this.month_range = null;
        this.date_range = null;
        this.search_term = null;
        this.appointments = [];
        this.paginatedData = [];
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.past_appointments = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };

        this.filterStatus = 2;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.confirmed_text")) {
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.year = null;
        this.month_range = null;
        this.date_range = null;
        this.search_term = null;
        this.appointments = [];
        this.paginatedData = [];
        this.past_appointments = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.filterStatus = 1;
        this.paginatedAppointment;
      } else if (
        newsearch_term === "Waiting" ||
        newsearch_term === this.translations?.waiting_text
      ) {
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.year = null;
        this.month_range = null;
        this.date_range = null;
        this.selected_doctorsIDs = [];
        this.search_term = null;
        this.appointments = [];
        this.paginatedData = [];
        this.past_appointments = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.filterStatus = 3;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.completed_text")) {
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.year = null;
        this.month_range = null;
        this.date_range = null;
        this.search_term = null;
        this.appointments = [];
        this.paginatedData = [];
        this.past_appointments = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.filterStatus = 4;
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.serving_text")) {
        this.year = null;
        this.date_range = null;
        this.search_term = null;
        this.month_range = null;
        this.appointments = [];
        this.selected_doctorsIDs = [];
        this.paginatedData = [];
        this.past_appointments = null;
        this.past_appointments = null;
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.filterStatus = 7;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.canceled_text")) {
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.year = null;
        this.date_range = null;
        this.month_range = null;
        this.search_term = null;
        this.appointments = [];
        this.paginatedData = [];
        this.past_appointments = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.filterStatus = 5;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.service_text")) {
        this.ourRequest.cancel();
        this.past_appointments = moment(new Date()).format("DD-MM-YYYY");
        console.log("requested past", this.past_appointments);
        this.upcoming_appointments = null;
        this.appointments = [];
        this.month_range = null;
        this.paginatedData = [];
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.search_term = null;
        this.year = null;
        this.date_range = null;

        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.status = null;
        this.year = null;
        this.filterStatus = null;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else if (newsearch_term === this.t("translation.product_text")) {
        this.upcoming_appointments = moment(new Date()).format("DD-MM-YYYY");
        console.log("requested for upming", this.upcoming_appointments);
        this.appointments = [];
        this.month_range = null;
        this.paginatedData = [];
        this.selected_doctorsIDs = [];
        this.selected_doctorsNames = [];
        this.doctorName = null;
        this.search_term = null;
        this.year = null;
        this.date_range = null;
        this.past_appointments = null;
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.status = null;
        this.year = null;
        this.filterStatus = null;
        this.UncheckAllSelected();
        this.paginatedAppointment;
      } else {
        this.filterStatus = null;
        this.appointments = [];
        this.paginatedData = [];
        console.log("else part");
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
      }

      this.UncheckAllSelected();
      this.paginatedAppointment;
    },
    source(newsource, oldsource) {
      this.source = newsource;
    },

    //  url
    pagination(newsearch_term, oldsearch_term) {
      this.pagination.last_page_url = newsearch_term.last_page_url;
    },
    // doctor
    selected_doctorsIDs: {
      handler: function (val, oldVal) {
        if (val) {
          console.log("val.length", val.length);
          if (val.length > 0) {
            this.ourRequest.cancel();

            this.selected_doctorsIDs = val;
            this.search_term = null;
            this.year = null;
            this.filterStatus = null;
            this.date_range = null;
            // this.filter_option= null;
            this.appointments = [];
            this.paginatedData = [];
            this.past_appointments = null;
            this.upcoming_appointments = null;
            this.past_appointments = null;
            this.pagination = {
              last_page_url: null,
              next_page_url: "patients/appointments/all-paginated",
            };

            this.UncheckAllSelected();
            this.paginatedAppointment;
          }
        }
      },
      deep: true,
    },

    // year
    year: debounce(function (e) {
      if (!!this.year) {
        this.ourRequest.cancel();
        this.appointments = [];
        this.paginatedData = [];
        this.search_term = null;
        this.filterStatus = null;
        this.month_range = null;
        this.date_range = null;
        this.upcoming_appointments = null;
        this.past_appointments = null;
        this.selected_doctorsIDs = [];
        this.year_range = moment(new Date(this.year, 1)).format("YYYY");
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.UncheckAllSelected();
        this.paginatedAppointment;
      }
    }, 500),
    // daterange
    date: debounce(function (e) {
      if (!!this.date) {
        this.ourRequest.cancel();
        this.appointments = [];
        this.paginatedData = [];
        this.search_term = null;
        this.filterStatus = null;
        this.upcoming_appointments = null;
        this.past_appointments = null;
        this.year = null;
        this.selected_doctorsIDs = [];
        this.date = this.date;
        this.month_range = null;
        const startDate = moment(this.date[0]).format("YYYY-MM-DD HH:mm");
        const endDate = moment(this.date[1]).format("YYYY-MM-DD HH:mm");
        this.date_range = [startDate, endDate];
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.UncheckAllSelected();
        this.paginatedAppointment;
      }
    }, 500),

    // daterange
    month: debounce(function (e) {
      if (!!this.month) {
        this.ourRequest.cancel();
        this.appointments = [];
        this.paginatedData = [];
        this.search_term = null;
        this.filterStatus = null;
        this.year = null;
        this.selected_doctorsIDs = [];
        this.date = null;
        this.upcoming_appointments = null;
        this.past_appointments = null;
        this.month_range = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format("MM-YYYY");
        this.pagination = {
          last_page_url: null,
          next_page_url: "patients/appointments/all-paginated",
        };
        this.UncheckAllSelected();
        this.paginatedAppointment;
      }
    }, 500),
  },

  setup() {
    // const translation = inject("translation");
    const translations = inject("translation_v3");
    console.log("in set up");
    const date = ref();
    const month = ref();
    const onLoadApps = ref(true);
    const { t } = useI18n({});
    const format = (dateArr) => {
      const formattedStartDate = moment(dateArr[0]).format("DD/MM/YYYY");
      const formattedEndDate = moment(dateArr[1]).format("DD/MM/YYYY");

      console.log("formated date value", formattedStartDate, formattedEndDate);
      return `${formattedStartDate} - ${formattedEndDate}`;
    };
    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "nl";
    const lang = ref(defaultLang);
    return {
      t,

      date,
      format,
      month,
      onLoadApps,
      lang,
      translations,
    };
  },
};
</script>
<style scoped>
.doctor_search-contents2 {
  background: white;
  min-height: 30px;
  height: 330px;
  position: absolute;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #0000001a, -5px -5px 10px #0000001a;
  padding-top: 0;
  padding-bottom: 0;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 15;
}
.doctor_search-area2 {
  margin-top: 12px;
  margin-bottom: 12px;
  width: 90%;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #ff782e;
}
.doctor_search-dropdown2 {
  min-height: 35px;
  max-height: 39vh;
}
.doctor_search-results2 {
  padding: 5px;
  width: 90%;
  height: 330px;
  margin-top: 1px;
  margin-bottom: 10px;
  font-size: 14px;
  overflow: auto;
}

.product-container {
  height: calc(100vh - 80px);

  /* height: calc(100vh - 160px); */
}
.parent-container {
  height: calc(100vh - 325px);
}
.metrics-list {
  height: calc(100vh - 160px);
}
/*media queries */
@media screen and (min-width: 768px) {
  .filter-treatments {
    width: 660px;
  }
}
@media screen and (min-width: 2560px) {
  .datepicker {
    width: 460px !important;
  }
}

@media screen and (min-width: 1440px) {
  .search-container {
    width: 100%;
  }
  .date-picker {
    width: 300px;
  }
  .calender-width {
    /* width: 250px; */
    /* width: 350px;
    margin-right: 500px; */
  }
}
</style>
<style>
.dp__select {
  color: #ff782e !important;
}
.dp__overlay_cell_active {
  background: #ff782e !important;
}
</style>