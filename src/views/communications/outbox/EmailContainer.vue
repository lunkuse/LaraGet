<template>

  <div class="bg-white dark:bg-dark-1 flex overflow-hidden w-full h-full" @click="outsideDialogBox">
    <div class="grid grid-cols-12 h-full sm:grid-cols-5 gap-2 w-full appointments-container">
      <div
        class="appointments-list h-full overflow-hidden col-span-12 border-r border-b border-gray-200"
      >
        <div class="w-auto gap-2 text-sm mt-2 content-center flex items-center " >
          <!-- length checked -->
          <div class="mx-auto text-slate-500" v-if="filteredEmails.length > 0">
         {{$t('translation.showing_text')}} {{lengthFrom}}  {{$t('translation.to_text')}}
            {{lengthTo}}  {{$t('translation.of_text')}} {{lengthTotal}}
            {{$t('translation.email_text')}}
          </div>
          <div class="mx-auto text-slate-500" v-if="checkedEmailListMain.length > 0">
          {{$t('translation.selected_text')}}  {{checkedEmailListMain.length}} {{$t('translation.email_text')}} 
            <span
              @click="UncheckAllSelected"
              class="text-theme-1 hover:underline cursor-pointer"
            >{{$t('translation.uncheck_all_text')}}</span>
          </div>
          <!-- length checked -->
        </div>

        <!-- search component  -->

        <!-- search component  -->

        <div
          class=" grid grid-cols-4 w-full gap-2 text-sm mt-2 border-gray-300 bg-gray-100 dark:bg-dark-1 mx-1 "
        >
          <!-- filter search -->
          <div
            class="col-span-4 flex justify-between items-center border-1 rounded-md border-gray-300 p-1 mx-1 bg-gray-100 dark:bg-dark-1"
          >
            <!-- key word -->
            <div
          v-if="keywordFilter"
              class="flex items-center border-r border-gray-300 h-full w-full bg-gray-100 dark:bg-dark-1"
            >
              <SearchIcon class="h-4 w-4 font-light" />
              <input
              class="form-control w-56 box pr-10 focus:border-theme-36 focus:ring-0"
              :placeholder="`${$t('translation.search_by_keyword_text')}`"
                v-model="search_term"
                @change="emptyInput"
                @keyup="emptyInput"
                @focus="searchFocus"
                id="searchID"
              />
            </div>

            
          

            <!-- date filter  -->
            <div
              class="relative w-full hidden 2xl:block xl:block z-50"
              id="dateselector"
              :class="displayDateFilter && 'lg:block md:block sm:block'"
            >
              <div class="flex w-full ml-2 justify-between items-center p-1 rounded-md">
                <div
                  class="flex items-center border-none outline-0 group relative h-10 cursor-pointer"
                >
                  <div
                    class="flex items-center m-auto group h-8 relative bg-gray-100 dark:bg-dark-1 cursor-pointer"
                  >
                    <input
                      type="text"
                      style="border: none !important"
                      class="form-control w-36 box focus:border-theme-36 focus:ring-0"
                        :placeholder="`${$t('translation.select_date_text')}`"
                      v-model="filter_date"
                      @focus="showFilterDates"
                      readonly
                    />
                    <ChevronDownIcon class="h-5 w-5 text-gray-500 mr-2" @click="showFilterDates" />
                  </div>

                  <div
                    class="flex flex-col w-full border-1 rounded-sm top-14 absolute p-0 text-sm bg-gray-100 dark:bg-dark-1"
                    v-if="isFilterDates === true"
                  >
                    <div class="flex-1 overflow-y-auto scrollContent bg-gray-100 dark:bg-dark-1">
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
                          :value="option"
                          @click="selectDate(option)"
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
                        <span> {{$t('translation.close_text')}}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="w-4/5 flex flex-wrap justify-end items-center bg-gray-300 h-10 calender-width"
                    v-if="isCustomView"
                  >
                    <Datepicker
                      v-model="date"
                      range
                      :format="format"
                      multiCalendars
                      :multiStatic="false"
                      calendarClassName="dp-custom-calendar"
                      :placeholder="`${$t('translation.date_range_text')}`"
                      class="w-full"
                    />
                  </div>

                  <div
                    class="flex w-full justify-end items-center bg-gray-300 h-10 calender-width"
                    v-if="isMonthView"
                  >
                    <Datepicker
                      v-model="month"
                      monthPicker
                      calendarClassName="dp-custom-calendar"
                       :placeholder="`${$t('translation.month_range_text')}`"
                      class="w-full"
                    />
                  </div>
                  <div
                    class="flex w-full justify-end items-center bg-gray-300 h-10 calender-width"
                    v-if="isWeekView"
                  >
                    <Datepicker
                      v-model="date"
                      weekPicker
                      :multiStatic="false"
                      calendarClassName="dp-custom-calendar"
                       :placeholder="`${$t('translation.week_range_text')}`"
                      class="w-full"
                    />
                  </div>
                  <div
                    class="w-full flex justify-end items-center bg-gray-300 h-10 calender-width"
                    v-if="isYearView"
                  >
                    <Datepicker
                      v-model="year"
                      yearPicker
                      calendarClassName="dp-custom-calendar"
                      :placeholder="translations?.year_range_text ?? 'Year Range'"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- date dropdown hide -->

            <!-- date filter-->

            <div class="w-full relative col-span-1 flex justify-end gap-3 mr-2" id="exportselector">
              <Button
                id="showfilterss"
                :label="'Filter'"
                icon="fa fa-solid fa-filter "
                @click="showFilterList"
                class="2xl:invisible xl:invisible !text-sm !capitalize"
              ></Button>
              <Button
              :label="`${$t('translation.clear_text')}`"
                class="!text-sm !capitalize"
                icon="fa fa-refresh "
                @click="clearall"
              ></Button>

              <Button
                :label="`${$t('translation.export_text')}`"
                icon="fa fa-arrow-up "
                class="!text-sm !capitalize"
                @click="showFilterOptionsForExports"
              ></Button>

              <!-- export buttons -->
              <div
                class="max-h-44 flex justify-end flex-1 flex-col z-50 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                v-if="isFilterOptionsForExports"
              >
                <div
                  class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                  style="margin-top: 13px;"
                >
                  <div class="items-center p-1 w-32">
                    <Button
                    :label="`${$t('translation.print_text')}`"
                      @click="printData();"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                     :label="`${$t('translation.pdf_text')}`"
                      @click="printObject('pdf', translations?.emails_text ??'Emails')"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                     :label="`${$t('translation.excel_text')}`"
                      @click="printObject('xlsx', 'emails','v2/mails/download-outbox-message-excel')"
                      class="border-t bold border-0 cursor-pointer text-black bg-white w-full hover:bg-gray-100 text-sm h-7 !text-gray-800 !bg-white !text-sm !capitalize"
                    ></Button>
                  </div>
                  <div class="border-t border-gray-300 items-center p-1 w-32">
                    <Button
                     :label="`${$t('translation.csv_text')}`"
                      @click="printObject('csv', 'emails','v2/mails/download-outbox-message-csv')"
                      class="border-t bold border-0 cursor-pointer w-full hover:bg-gray-100  h-7 !text-gray-800 !bg-white !text-sm !capitalize"
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
                    <span class="text-center"> {{$t('translation.close_text')}} </span>
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
                  style="margin-top: 13px;"
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
                    <p>{{$t('translation.exporting_text')}}..</p>
                  </div>
                </div>
              </div>

              <!-- filter buttons -->
              <div
                class="z-50 max-h-44 flex justify-end flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 mt-10 bg-white"
                v-if="isFilterList"
              >
                <div
                  class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                  style="margin-top: 13px;"
                >
                  <div class="items-center p-1 w-32">
                    <Button
                     :label="`${$t('translation.keyword_text')}`"
                      @click="showStatusFilter"
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
                    <span class="text-center">  {{$t('translation.close_text')}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- exports filter -->
        </div>

        <EmailList
          :emails="filteredEmails"
          :isLoading="isLoading"
          @clearFilter="clearFilters"
          :isTarget="isTarget"
          :filterOption="filter_option"
          :endScope="pagination.next_page_url === pagination.last_page_url"
          :isUnchenkallstatus="isUnchenkallstatus"
          @refreshEmails="fetchMoreData"
          @checkedEmailList="checkedEmailList"
        ></EmailList>
      </div>
    </div>
  </div>
</template>
<script >
import moment from 'moment'
// import axios from 'axios'
import axios from '../../../axios'
import { ref, inject } from 'vue'
import debounce from 'lodash.debounce'
import Button from '@/components/shared/buttons/Button.vue'
import {
  CalendarIcon,
  SearchIcon,
  ChevronDownIcon,
  XIcon
} from '@heroicons/vue/outline'
// import Button from "../../../global/Button.vue";
import EmailList from './EmailList.vue'
import Datepicker from '@vuepic/vue-datepicker'

export default {
  name: 'EmailContainer',
  components: {
    EmailList,
    Button,
    CalendarIcon,
    SearchIcon,
    ChevronDownIcon,
    // Button,
    Datepicker,
    XIcon
  },
  data() {
    return {
      filteredResponse: null,
      isLoadingdoctors: false,
      isFilterDates: false,
      isShowDates: false,
      emails: [],
      allEmailssearch: [],
      patient: {},
      isLoading: false,
      isSearching: false,
      doctorName: '',
      search_term: null,
      isPending: false,
      isAppointmentModal: false,
      isFilterOptions: false,
      isFilterOptionsDate: false,
      filterDates: ['1 Week', '1 Month', '1 Year', 'Custom'],
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
      allAppstatus: 'true',
      onLoadApp: 'yes',

      filterOptions: [
        {
          name: this.translations?.pending_text ?? 'Pending',
          value: 'Pending'
        }
      ],
    
      filterOptionsDate: ['1 Week', '1 Month', '1 Year', 'Custom'],
      filter_option: null,
      filter_option_date: '',
      isFilterTypes: false,

      treatment_id: null,
      filterOptionsForExports: ['PDF', 'CSV', 'Excel', 'Print'],
      filter_option_exports: '',
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
      doctorListSearch: '',
      numberDoctor: 0,
      clear: 0,
      firstDate: '',
      secondDate: '',
      filter_option_type: '',
      filter_date: '',
      isTreatments: false,
      typeID: '',
      current_page: 1,
      year: null,
      year_range: null,
      last_page: '',

      list: [],
      checkedEmailListMain: [],
      counter: 1,
      paginatedData: [],
      pagination: {
        last_page_url: null,
        next_page_url: '/v2/mails/patient_outbox' 
        // next_page_url: '/v2/mails/patient_outbox'
      },

      date_range: null,
      month_range: null,
      lengthFrom: 1,
      lengthTo: null,
      lengthTotal: null,
      lengthCheched: null,
      focusTarget: null,
      displayDateFilter: false,
      displayDoctorFilter: false,
      displayStatusFilter: false,
      ourRequest: null,
      source: null,
      keywordFilter: true,
    }
  },
  created() {
    // this.patient = JSON.parse(sessionStorage.getItem("SinglePatient"));

    // this.fetchDoctors()
    this.emails = []
    this.paginatedData = []

  },

  methods: {
    showStatusFilter() {
      this.keywordFilter = true
      this.displayDateFilter = false
      this.isFilterList = false
      this.displayDateFilter = false
      this.displayDoctorFilter = false
    },
    showDateFilter() {
      this.displayDateFilter = true
      this.displayStatusFilter = false
      this.displayDoctorFilter = false
      this.isFilterList = false
      this.keywordFilter = false
    },
    showDoctorFilter() {
      this.displayDoctorFilter = true
      this.displayDateFilter = false
      this.displayStatusFilter = false
      this.isFilterList = false
    },
    showFilterList() {
      this.isFilterList = !this.isFilterList
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false

      this.isFilterDates = false

      this.doctorsExpanded = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false
    },

    outsideDialogBox: function(e) {
      
      // close dateselector
      if (!document.getElementById('dateselector')?.contains(e.target)) {
        this.isFilterDates = false
      }
      // close doctorselector
      if (!document.getElementById('doctorselector')?.contains(e.target)) {
        this.doctorsExpanded = false
      }

      //  close exportselector
      if (!document?.getElementById('exportselector')?.contains(e.target)) {
        this.isFilterOptionsForExports = false
        this.isFilterList = false
      } else {
        console.log('inside popup')
      }
    },

    emptyInput() {
      if (this.search_term?.length < 1) {
        this.clearall()
      }
    },
    UncheckAllSelected() {
      this.isUnchenkallstatus = undefined
      if (this.checkedEmailListMain.length > 0) {
        this.checkedEmailListMain.length = []
        this.isUnchenkallstatus = true
      }

      console.log('isUnchenkallstatus', this.isUnchenkallstatus)
    },
    checkedEmailList(checkedEmails) {
      this.checkedEmailListMain = checkedEmails
    },

    async fetchMoreData() {
      console.log('fetchMoreData')

      this.paginatedEmails
    },

    fetchAll(data) {
      this.ourRequest = axios.CancelToken.source()
      const token = localStorage.getItem('token')
      if (
        this.pagination.next_page_url !== this.pagination.last_page_url ||
        this.pagination.next_page_url === this.pagination.last_page_url
      ) {
        if (this.pagination.next_page_url !== null) {
          this.isLoading = true
          let url = this.pagination.next_page_url
          try {
            axios
              .post(
                url,
                data,
                {
                  headers: {
                    Authorization: 'Bearer ' + token,

                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                  }
                },
                { cancelToken: this.ourRequest.token }
              )
              .then(response => {
                this.isLoading = false
                console.log('new response eeeee', response?.data?.error)
                if (response?.data?.error == 'Token is Expired') {
                  this.$store.dispatch('auth/logout')
                  this.$router.push('/login')
                }
                
                // this.emails = response.data.payload;
                let latest = response?.data?.payload?.data

                this.emails = this.emails.concat(
                  response?.data?.payload?.data
                )
                console.log('new response', this.emails)
                let currentPage = response?.data?.payload?.current_page
                this.last_page = response?.data?.payload?.last_page_url
                let next_page_url = response?.data?.payload?.next_page_url
                this.links = response?.data?.payload?.links
                this.pagination = {
                  last_page_url: response?.data?.payload?.last_page_url,
                  next_page_url: response?.data?.payload?.next_page_url
                }
                // this.lengthFrom=response.data.payload.from
                this.lengthTo = response?.data?.payload.to
                this.lengthTotal = response?.data?.payload?.total
                console.log('cancelled response', response)
              })
              .catch(function(thrown) {
                console.log('Request cancelling error', thrown)

                if (thrown.message === 'canceled') {
                  console.log('Request canceled vvvvv', thrown.message)
                } else {
                  // handle error
                }
              })
          } catch (err) {
            console.log('error: ', err)
          }
        } else {
          this.pagination = {
            last_page_url: null,
            next_page_url: '/v2/mails/patient_outbox'
          }
        }
      }
    },

    async exportDataTable() {
      console.log('length', this.checkedEmailListMain.length)
      if (this.checkedEmailListMain.length > 0) {
        let emails = []
        emails = this.checkedEmailListMain
        return emails
      } else {
        let emails = []
        this.filteredResponse.forEach(e => {
          emails.push(e.id)
        })
        return emails
      }
    },

    // pdf excel, csv export
    async printObject(
      type,
      filename = 'Sent Messages',
      url = 'v2/mails/download-outbox-message-pdf'
    ) {
      try {
        const emails = await this.exportDataTable()
        const token = localStorage.getItem('token')
        const config = {
          url: url,
          method: 'get',
          responseType: 'blob',

          params: {
            messages: JSON.stringify(emails),
            lang: this.lang
          },
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
        this.hideFilterOptionsForExports()
        this.showExportLoader()

        axios(config)
          .then(response => {
            const blob = new Blob([response.data], {
              type: `application/${type}`
            })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `${filename}.${type}`
            link.click()
            URL.revokeObjectURL(link.href)
          })
          .catch(err => {
            console.log(`PrintError: , ${err}`)
          })

        this.hideExportLoader()
      } catch (err) {
        console.log('error: ', err)
      }
    },
    async printData() {
      const emails = await this.exportDataTable()
      const token = localStorage.getItem('token')
      const config = {
        url: 'v2/mails/download-outbox-message-pdf',
        method: 'get',
        responseType: 'blob',
        params: {
          messages: JSON.stringify(emails),
          lang: this.lang
        },
        headers: {
          Authorization: 'Bearer ' + token,

          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
      this.hideFilterOptionsForExports()
      this.isExporting = true
      axios(config).then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })

        // window.open(URL.createObjectURL(blob)).print();

        let iframe = document.createElement('iframe') //load content in an iframe to print later
        document.body.appendChild(iframe)

        iframe.style.display = 'none'
        iframe.src = URL.createObjectURL(blob)
        iframe.onload = function() {
          setTimeout(function() {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
      })

      this.hideExportLoader()
    },
    searchFocus() {
      this.isFilterDates = false
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false
      this.isFilterOptionsForExports = false
      this.isFilterList = false
    },
    expandDoctorPanel() {
      this.isFilterDates = false
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = !this.doctorsExpanded
      this.isFilterOptions = false
      this.isFilterOptionsDate = false
      this.isFilterOptionsForExports = false
      this.isFilterList = false
      document.activeElement.blur()
      console.log('this.selected_doctorsIDs mmm', this.selected_doctorsIDs)
      // document.getElementById("invisibleFocus").focus();
      // this.focusTarget="doctorsExpanded"
    },

    showFilterDates() {
      setTimeout(() => {
        this.isFilterDates = !this.isFilterDates
        this.isFilterOptionsForExports = false
        this.doctorsExpanded = false
        this.isFilterList = false
        this.isFilterOptions = false
        this.isFilterOptionsDate = false
        this.isFilterOptionsForExports = false
        document.activeElement.blur()
      }, 200)
    },
    hideFilterDates() {
      setTimeout(() => {
        this.isFilterDates = false
      }, 200)
    },
    selectDate(option) {
      this.filter_date = option
      this.isCustomView = false
      this.isMonthView = false
      this.isYearView = false
      this.isWeekView = false
      this.dialogClear()
      if (option === 'Custom') {
        this.isCustomView = true
      } else if (option === '1 Month') {
        // this.isPending = false;

        this.isFilterOptionsForExports = false
        this.doctorsExpanded = false
        this.isFilterList = false
        this.isFilterOptions = false
        this.isFilterOptionsDate = false
        this.isMonthView = true
      } else if (option === '1 Year') {
        // this.isPending = false;

        this.isFilterOptionsForExports = false
        this.doctorsExpanded = false
        this.isFilterList = false
        this.isFilterOptions = false
        this.isFilterOptionsDate = false
        this.isYearView = true
      } else if (option === '1 Week') {
        // this.isPending = false;
        this.isFilterOptionsForExports = false
        this.doctorsExpanded = false
        this.isFilterOptions = false
        this.isFilterOptionsDate = false

        this.isWeekView = true
      }
      this.hideFilterDates()
    },
    showFilterOptionsForExports() {
      this.isFilterOptionsForExports = !this.isFilterOptionsForExports
      this.doctorsExpanded = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false

      this.isFilterDates = false

      this.isFilterList = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false
    },
    dialogClear() {
      this.clear = 1
      this.search_term = null
      this.doctorName = ''
      this.firstDate = ''
      this.secondDate = ''
      this.status = null
      this.year = null
      this.year_range = null
      // this.isPending = false;
      this.filter_option = null
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false
      this.selected_doctorsIDs = []
      this.doctorName = null
      this.past_appointments = null
      this.date_range = null
      this.filterStatus = null
      this.upcoming_appointments = null
      this.month_range = null
      this.pagination = {
        last_page_url: null,
        next_page_url: 'v2/mails/patient_inbox'
      }
    },
    clearall() {
      this.ourRequest.cancel()
      this.emails = []
      this.paginatedData = []
      this.clear = 1
      this.search_term = null
      this.doctorName = ''
      this.firstDate = ''
      this.secondDate = ''
      this.year = null
      ;(this.year_range = null),
        // this.isPending = false;
        (this.status = null)
      this.filterStatus = null
      this.filter_option = null
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = false
      this.isFilterList = false
      this.isFilterOptions = false
      this.isFilterOptionsDate = false
      this.isFilterDates = false
      this.selected_doctorsIDs = []
      this.selected_doctorsNames = []

      this.filterStatus = null
      this.checkedEmailListMain.length = 0
      this.doctorName = null
      this.past_appointments = null
      this.date_range = null
      this.upcoming_appointments = null
      this.month_range = null
      this.pagination = {
        last_page_url: null,
        next_page_url: '/v2/mails/patient_outbox'
      }
      this.paginatedEmails
    },
    fetchPatientAppointments() {
      // this.isLoading = true;
      axios
        .post('v2/appointments/all', {})
        // .post("v2/appointments/patient-appointments", {
        //   patientId: this.patient.id,
        // })

        .then(response => {
          // this.allEmailssearch = response.data.payload;
          // this.emails = response.data.payload;
          // this.isLoading = false;
          console.log('allEmailssearch', this.allEmailssearch)
        })
    },

    expandStatusPanel() {
      this.isFilterOptions = !this.isFilterOptions
      this.isFilterDates = false
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = false
      this.isFilterList = false
      this.isFilterOptionsDate = false
      this.isFilterOptionsForExports = false
      document?.activeElement?.blur()
    },
    showFilterOptions() {
      this.isFilterOptions = true
      this.isFilterDates = false
      this.isFilterOptionsForExports = false
      this.doctorsExpanded = false
      this.isFilterList = false
      this.isFilterOptionsDate = false
      this.isFilterOptionsForExports = false
      document?.activeElement?.blur()
    },
    showFilterOptionsDate() {
      this.isFilterOptionsDate = true
    },
    hideFilterOptionsDate() {
      this.isFilterOptionsDate = false
    },
    showTreatments() {
      this.isTreatments = true
    },
    selectOptionForExports(option) {
      this.filter_option_exports = option
      this.performAction(option)
      this.hideFilterOptionsForExports()
    },
    hideFilterOptionsForExports() {
      setTimeout(() => {
        this.isFilterOptionsForExports = false
      }, 200)
    },

    hideExportLoader() {
      setTimeout(() => {
        this.isExporting = false
      }, 200)
    },
    showExportLoader() {
      this.isExporting = true
    },
    hideFilterOptions() {
      setTimeout(() => {
        this.isFilterOptions = false
      }, 200)
    },
    selectedTreatment(treatment) {
      this.isTreatments = false

      this.treatment_id = treatment.id
      this.typeID = treatment.id
      this.selected_treatment = treatment.treatment
    },
    hideTreatments() {
      this.selected_treatment = ''
      setTimeout(() => {
        this.isTreatments = false
      }, 200)
    },
  
    selectOptionType(option) {
      this.filter_option_type = option
      this.hideFilterOptions()
    },
    selectOptionDate(option) {
      this.filter_option_date = option

      this.hideFilterOptionsDate()
    },

   
 

    clearFilters() {
      this.search_term = ''
      this.isPending = false
      this.filter_option = ''
    },
    showModal() {
      this.isAppointmentModal = true
      document.querySelector('html').classList.add('preventScroll')
    },
    hideModal() {
      this.isAppointmentModal = false
      document.querySelector('html').classList.remove('preventScroll')
    },
    performAction(query) {
      if (query === 'CSV') this.downloadCSV()
      if (query === 'PDF') this.downloadPdf()
      if (query === 'Excel') this.downloadExcel()
      if (query === 'Print') this.printPdf()
    },

    handleDate(modelData) {
      this.filter_option = null
      this.search_term = null
      this.date = modelData
      const startDate = date.value[0]
      const endDate = date.value[1]
    },

  

    checkedDoc(event, doctor) {
      if (event.target.checked) {
        this.isPending = false
        this.selected_doctorsIDs.push(doctor.id)
        this.selected_doctorsNames.push(doctor)
        // this.doctorName = doctor.first_name + "\xa0" + doctor.last_name;
        const appointments = [...this.emails]
        const index = this.selected_doctorsIDs
        this.numberDoctor = Object.keys(index).length
        console.log('this.selected_doctorsIDs', this.selected_doctorsIDs)
        if (this.numberDoctor === 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            '\xa0' +
            this.selected_doctorsNames[0].last_name
        } else if (this.numberDoctor > 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            '\xa0' +
            this.selected_doctorsNames[0].last_name +
            '\xa0' +
            '(' +
            '+' +
            (this.numberDoctor - 1) +
            ')'
        }

        let docAppointments = appointments.filter(appointment => {
          return appointment.doctors.find(doc =>
            this.selected_doctorsIDs.includes(doc?.id)
          )
        })
      } else {
        this.selected_doctorsIDs.splice(
          this.selected_doctorsIDs.indexOf(doctor.id),
          1
        )
        this.selected_doctorsNames.splice(
          this.selected_doctorsNames.indexOf(doctor),
          1
        )

        this.numberDoctor = Object.keys(this.selected_doctorsIDs).length
        if (this.numberDoctor === 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            '\xa0' +
            this.selected_doctorsNames[0].last_name
        } else if (this.numberDoctor > 1) {
          this.doctorName =
            this.selected_doctorsNames[0].first_name +
            '\xa0' +
            this.selected_doctorsNames[0].last_name +
            '\xa0' +
            '(' +
            '+' +
            (this.numberDoctor - 1) +
            ')'
        }
        if (this.selected_doctorsIDs.length === 0) {
          console.log('changed doctors to 0')
          this.selected_doctorsIDs = this.selected_doctorsIDs
          this.search_term = null
          this.year = null
          this.filterStatus = null
          this.date_range = null
          // this.filter_option= null;
          this.emails = []
          this.paginatedData = []
          this.past_appointments = null
          this.past_appointments = null
          this.pagination = {
            last_page_url: null,
            next_page_url: '/v2/mails/patient_outbox'
          }
          console.log(
            'a thing changed this.selected_doctorsIDs,  this.search_term',
            this.selected_doctorsIDs,
            this.search_term
          )
          this.paginatedEmails
        }
      }
    }
  },
  computed: {
    async paginatedEmails() {
      // keyword
      if (!!this.search_term) {
        this.fetchAll({ search_word: this.search_term })
      }

      // status
      else if (!!this.filterStatus) {
        this.fetchAll({ status: this.filterStatus })
      }
      // this.past_appointments
      else if (!!this.past_appointments) {
        this.fetchAll({ past_appointments: this.past_appointments })
      }

      // this.upcoming_appointments
      else if (!!this.upcoming_appointments) {
        this.fetchAll({ upcoming_appointments: this.upcoming_appointments })
      }

      // doctor filter
      else if (this.selected_doctorsIDs.length > 0) {
        this.fetchAll({ doctors: this.selected_doctorsIDs })
      }

      // year filter
      else if (!!this.year) {
        this.fetchAll({ year: this.year_range })
      }

      // date range
      else if (this.date_range) {
        this.fetchAll({ date_range: this.date_range })
      }

      // month range
      else if (this.month_range) {
        this.fetchAll({ month_range: this.month_range })
      } else {
        this.fetchAll({})
      }
    },

    filteredEmails() {
      // let allAppointments = this.emails;
      let allAppointments = [...this.emails]

      this.filteredResponse = allAppointments
      return allAppointments
    },
    filteredTreatments() {
      let treatmentList = this.types

      if (this.selected_treatment) {
        treatmentList = treatmentList.filter(
          treatment =>
            treatment.treatment
              .toUpperCase()
              .includes(this.selected_treatment.toUpperCase()) ||
            treatment.code
              .toUpperCase()
              .includes(this.selected_treatment.toUpperCase())
        )
      }
      return treatmentList
    },

    // Doctor Search Filter
    filteredDoctors() {
      let doctorsList = this.doctors
      if (this.doctorListSearch) {
        doctorsList = this.doctors.filter(
          doctor =>
            doctor.first_name
              .toLowerCase()
              .indexOf(this.doctorListSearch.toLowerCase()) >= 0 ||
            doctor.last_name
              .toLowerCase()
              .indexOf(this.doctorListSearch.toLowerCase()) >= 0
        )
      }
      return doctorsList
    },
    classObject: function() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  },
  watch: {
    // keyword
    search_term: debounce(function(e) {
      if (!!this.search_term) {
        //  this.source?.cancel();
        this.ourRequest.cancel()

        this.emails = []
        this.paginatedData = []

        this.search_term = this.search_term
        this.emails = []
        this.paginatedData = []
        this.selected_doctorsIDs = []
        this.selected_doctorsNames = []
        this.checkedEmailListMain = []
        this.doctorName = null
        this.status = null
        this.filterStatus = null
        this.month_range = null
        this.year = null
        this.filter_option = null

        this.pagination = {
          last_page_url: null,

          next_page_url: '/v2/mails/patient_outbox'
        }
        this.isTarget = false
        this.UncheckAllSelected()
        this.paginatedEmails
      }
    }, 500),

    // status


    

    //  url
    pagination(newsearch_term, oldsearch_term) {
      this.pagination.last_page_url = newsearch_term.last_page_url
    },

    // year
    year: debounce(function(e) {
      if (!!this.year) {
        this.ourRequest.cancel()
        this.emails = []
        this.paginatedData = []
        this.search_term = null
        this.filterStatus = null
        this.month_range = null
        this.date_range = null
       
        this.selected_doctorsIDs = []
        this.year_range = moment(new Date(this.year, 1)).format('YYYY')
        this.pagination = {
          last_page_url: null,
          next_page_url: '/v2/mails/patient_outbox'
        }
        this.UncheckAllSelected()
        this.paginatedEmails
      }
    }, 500),
    // daterange
    date: debounce(function(e) {
      if (!!this.date) {
        this.ourRequest.cancel()
        this.emails = []
        this.paginatedData = []
        this.search_term = null
        this.filterStatus = null
   
        this.year = null
        this.selected_doctorsIDs = []
        this.date = this.date
        this.month_range = null
        const startDate = moment(this.date[0]).format('DD-MM-YYYY HH:mm')
        const endDate = moment(this.date[1]).format('DD-MM-YYYY HH:mm')
        this.date_range = [startDate, endDate]
        this.pagination = {
          last_page_url: null,
          next_page_url: '/v2/mails/patient_outbox'
        }
        this.UncheckAllSelected()
        this.paginatedEmails
      }
    }, 500),

    // daterange
    month: debounce(function(e) {
      if (!!this.month) {
        this.ourRequest.cancel()
        this.emails = []
        this.paginatedData = []
        this.search_term = null
        this.filterStatus = null
        this.year = null
        this.selected_doctorsIDs = []
        this.date = null
     
        this.month_range = moment(
          new Date(this.month.year, this.month.month + 1, 0)
        ).format('MM-YYYY')
        this.pagination = {
          last_page_url: null,
          next_page_url: '/v2/mails/patient_outbox'
        }
        this.UncheckAllSelected()
        this.paginatedEmails
      }
    }, 500)
  },

  setup() {
    // const translation = inject("translation");
    const translations = inject('translation_v3')
    const date = ref()
    const month = ref()
    const onLoadApps = ref(true)

    const format = dateArr => {
      const formattedStartDate = moment(dateArr[0]).format('DD/MM/YYYY')
      const formattedEndDate = moment(dateArr[1]).format('DD/MM/YYYY')

      console.log('formated date value', formattedStartDate, formattedEndDate)
      return `${formattedStartDate} - ${formattedEndDate}`
    }
    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "nl";
    const lang = ref(defaultLang);
    return {
      // translation,
      date,
      format,
      month,
      onLoadApps,
      translations,
      lang
    }
  }
}
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

.appointments-container {
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