
<template>
<div>
    
        <div class="grid grid-cols-12 gap-6">
      <!-- first column -->
    <!-- <div class="col-span-12 2xl:col-span-9"> -->
      <div class="col-span-12 2xl:col-span-12">
   <!-- table -->
   <div>
    <div>
      <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Completed Appointments</h2>
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
          <!-- <a
            href="javascript:;"
            data-toggle="modal"
            data-target="#static-backdrop-modal-preview1"
            class="btn mr-1 mb-2 bg-theme-32 text-white"
          >
            <PlusIcon />New Appointment
          </a> -->

          <!-- END: Super Large Modal Toggle -->
          <div class="dropdown ml-auto sm:ml-0">
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: HTML Table Data -->

      <div class="intro-y box p-5 mt-5">
        <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
          <div class="flex mt-5 sm:mt-0">
            <div class="dropdown w-1/2 sm:w-auto" style="display:none;">
           
              <div class="dropdown-menu w-40">
                <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- loader text -->
        <span v-if="loading" class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10">
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>We are loading your data...</span>
        </span>
        <div v-if="!loading" class="scrollbar-hidden">
          <div id="printMe intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
            <table
              class="display table table-report sm:mt-2"
              style="
              width: 100%;
              overflow-x: auto;
              white-space: nowrap;
              left: 0;
              right: 0;
            "
            >
              <thead>
                <tr>
                  <th class="whitespace-nowrap">No.#</th>

                  <th class="whitespace-nowrap">Type</th>
                  <th class="whitespace-nowrap">Status</th>
                  <th class="whitespace-nowrap">Treatment Date</th>
                  <th class="whitespace-nowrap">Start Time</th>
                  <th class="whitespace-nowrap">End Time</th>
                  <th class="whitespace-nowrap">Date Created</th>
                  <th class="whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="appointment in client_appointments"
                  :key="appointment.id"
                  class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                >
                  <td class="whitespace-nowrap">
                  <router-link
                      :to="{
                      name: 'side-menu-appointment-details',
                      params: { appointmentId: appointment.id }
                    }"
                    >{{ appointment.id }}</router-link>
                  </td>

                  <td
                    class="whitespace-nowrap"
                  >{{appointment.treatment_type ? appointment.treatment_type.title: appointment.appointment_type.title}}</td>
                  <td class="whitespace-nowrap">
                    <div
                      class="flex"
                      :class="{
                      'text-theme-12': appointment.status.status  === 'Waiting',
                      'text-theme-9': appointment.status.status === 'Confirmed',
                      'text-theme-6': appointment.status.status === 'Closed',
                      'text-grey-100': appointment.status.status === 'Pending',
                      'text-theme-44': appointment.status.status === 'Serving',
                       'text-theme-6': appointment.status.status === 'Canceled'
                      
                    }"
                    >
                      <AlertCircleIcon
                        v-if="appointment.status.status === 'Waiting'"
                        class="w-4 h-4 mr-2"
                      />
                      <CheckSquareIcon
                        v-if="appointment.status.status === 'Confirmed'"
                        class="w-4 h-4 mr-2"
                      />
                      <CheckSquareIcon
                        v-if="appointment.status.status === 'Closed'"
                        class="w-4 h-4 mr-2"
                      />
                      <ThumbsUpIcon
                        v-if="appointment.status.status === 'Pending'"
                        class="w-4 h-4 mr-2"
                      />
                      <ThumbsUpIcon
                        v-if="appointment.status.status === 'Serving'"
                        class="w-4 h-4 mr-2"
                      />
                      <ThumbsUpIcon
                        v-if="appointment.status.status === 'Canceled'"
                        class="w-4 h-4 mr-2"
                      />
                      
                      {{appointment.status.status}}
                    </div>
                  </td>
                  <td class="whitespace-nowrap">
                    
                    <div
                      v-if="appointment.date.match(/^\d{4}-\d{2}-\d{2}$/) === null"
                    ><span style="display:none" v-if="appointment.date">{{moment(appointment.date, "DD-MM-YYYY").format("YYYY-MM-DD")}}</span> {{moment(appointment.date, "DD-MM-YYYY").format("DD MMMM YYYY")}}</div>
                    <div v-else><span style="display:none" v-if="appointment.date"></span> {{moment(appointment.date, "YYYY-MM-DD").format("DD MMMM YYYY")}}</div>
                  </td>
                  <td class="whitespace-nowrap">{{appointment.slots[0]['start-time']}}</td>
                  <td class="whitespace-nowrap">{{appointment.slots[0]['end-time']}}</td>
                  <td
                    class="whitespace-nowrap"
                  ><span style="display:none" v-if="appointment.created_at">{{appointment.created_at}}</span>{{moment(appointment.created_at).format("DD MMMM YYYY")}}</td>
                  <td class="whitespace-nowrap text-blue-500 block">
                    <router-link
                      :to="{
                      name: 'side-menu-appointment-details',
                      params: { appointmentId: appointment.id }
                    }"
                    >
                      <a
                        class="flex items-center text-primary whitespace-nowrap mr-5"
                        href="javascript:;"
                      >
                      <EyeIcon class="w-4 h-4 mr-2"/> View
                        <!-- <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide w-4 h-4 mr-1"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg> Open -->
                      </a>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- END: HTML Table Data -->
    </div>
  </div>
   <!-- <TableAppointment /> -->
    </div>
     <!-- last column -->
    <div class="col-span-12 2xl:col-span-3">
      <!-- <Calendar /> -->
       <div>







        <!-- ///////////////////////// -->
    <div
      id="static-backdrop-modal-preview1"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <a data-dismiss="modal">
            <i data-feather="X" class="w-8 h-8 text-gray-500"></i>
          </a>

          <div class="modal-body p-10">
            <div class="intro-y flex items-center mt-8">
              <h2 class="text-lg font-medium mr-auto">Make Appointment</h2>
            </div>
            <div class="grid grid-cols-12 gap-6 mt-5">
              <div class="intro-y col-span-12 lg:col-span-12">
                <!-- BEGIN: Form Layout -->
                <form class="validate-form" @submit.prevent="handleSubmit" autocomplete="off">
                  <div class="intro-y box">
                    <!-- appointment table -->
                    <div class="p-5">
                      <div class="box">
                        <div class="col-span-12 xl:col-span-6">
                          <!-- appointment_type -->
                          <div class="mt-3">
                            <label for="update-profile-form-12" class="form-label font-semibold">
                              Pick Type
                              <span class="text-theme-6">*</span>
                            </label>

                            <TomSelect
                              v-model="selected_appointment_type"
                              class="w-full"
                              @change="onchange"
                            >
                              <option value>Pick an appointment type</option>
                              <option
                                v-for="(appointment_type, name) in appointment_type"
                                :key="name"
                                :value="appointment_type.id"
                              >{{ appointment_type.title }}</option>
                            </TomSelect>
                             <template v-if="validate.selected_appointment_type.$error">
                  <div
                    v-for="(error, index) in validate.selected_appointment_type.$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
                          </div>

                          <!-- date -->
                          <div class="mt-3">
                            <label for="update-profile-form-12" class="form-label font-semibold">
                              Pick a date
                              <span class="text-theme-6">*</span>
                            </label>
                            <!-- <Litepicker
                            id="date_input"
                              v-model="appointment_date"
                              placeholder="Appointment date*"
                              disabled
                              name="appointment_date"
                              :options="{
                              autoApply: true,
                              showWeekNumbers: false,
                              minDate: startDate,
                              maxDate: endDate,
                              disallowLockDaysInRange: true,
                              scrollToDate:true,
                              highlightedDays:[ ['2022-07-08', '2022-07-09'], '2022-07-10'],
                              lockDays: dateRange,
                              lockDaysFilter: (date1, date2, pickedDates) => {
                              return dateRange.includes(date1.format('YYYY-MM-DD'));
                              },
                              dropdowns: {
                              minYear: moment(this.startDate).years(),
                              maxYear: moment(this.endDate).years(),
                              months: true,
                              years: true,
                              },
                              }"
                              class="w-full intro-x form-control bg-gray-100 py-3 px-4 block border-gray-200 focus:border-gray-500"
                              style="box-shadow: 0px 3px 5px #00000007"
                            /> -->
      <!-- {{JSON.stringify(highlightedRange).replaceAll(`"`, `'`)}} -->
     <Litepicker
                            id="date_input"
                              v-model="appointment_date"
                              placeholder="Appointment date*"
                              disabled
                              name="appointment_date"
                              :options="{
                              autoApply: true,
                              showWeekNumbers: false,
                              minDate: moment(),
                              maxDate: endDate,
                              disallowLockDaysInRange: true,
                              scrollToDate:true,
                              highlightedDays: highlightedRange,
                              lockDays: dateRange,
                             lockDaysFilter: (date1, date2, pickedDates) => {
	                          
                              return dateRange.includes(date1.format('YYYY-MM-DD'));
                              },
   setup: (picker) => {
  	picker.on('render:day', (day, date) => {   
      if (date.toJSDate() < today) {
      	day.classList.add('bg-theme-36');
      }
    });
    
    if (picker.options.inlineMode) {
    	picker.render();
    }
    },
                              dropdowns: {
                              minYear: moment(this.startDate).years(),
                              maxYear: moment(this.endDate).years(),
                              months: true,
                              years: true,
                              },
                              }"
                              class="w-full intro-x form-control bg-gray-100 py-3 px-4 block border-gray-200 focus:border-gray-500"
                              style="box-shadow: 0px 3px 5px #00000007"
                            />




                              <template v-if="validate.appointment_date.$error">
                  <div
                    v-for="(error, index) in validate.appointment_date.$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>

                  <!-- <div
                    class="text-theme-6 mt-2"
                  >
                     Select a future date
                  </div> -->
                          </div>

                          <!-- time -->
                          <div class="mt-3">
                            <label for="update-profile-form-12" class="form-label font-semibold">
                              Pick Time Slot
                              <span class="text-theme-6">*</span>
                            </label>
                             <span class="text-xs px-1 border text-slate-600 dark:border-darkmode-100/40 dark:text-slate-300 mr-1 font-semibold">{{newStartTime}}-{{newEndTime}}</span>
                            <br />
                            <div
                              class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"
                              v-for="(slot, index) in timeSlotsArray"
                              :key="index"
                              style="display:inline;"
                            >
                              <button
                                type="button"
                                class="btn btn-outline-dark w-auto inline-block mr-1 mb-2"
                              >
                                <p @click="chooseSlot(slot)">{{slot.startTime}} - {{slot.endTime}}</p>
                              </button>
                            </div>
                              <template v-if="validate.startTime.$error">
                  <div
                    v-for="(error, index) in validate.startTime.$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
                          </div>
                          <!-- comment -->

                          <div class="mt-3">
                            <label class="form-label font-semibold">Comment</label>
                            <!-- <ClassicEditor v-model="comment" /> -->
                            <textarea
                              v-model="comment"
                              class="form-control"
                              name="comment"
                              placeholder="Type your comments"
                            ></textarea>
                          </div>

                          <!--  -->
                        </div>
                      </div>
                      <!-- Notification Alert Start -->
                      <div
                        id="basic-non-sticky-notification-content"
                        class="toastify-content hidden flex"
                      >
                        <CheckCircleIcon class="text-theme-9" />
                        <div class="ml-4 mr-4">
                          <div class="font-medium notification-message"></div>
                        </div>
                      </div>
                      <!-- Notification Alert End -->

                      <!-- END: Validation Form -->

                      <!-- BEGIN: Success Notification Content -->
                      <div id="success-notification-content" class="toastify-content hidden flex">
                        <CheckCircleIcon class="text-theme-9" />
                        <div class="ml-4 mr-4">
                          <div class="font-medium">Appointment has been Successfully created</div>
                        </div>
                      </div>
                      <!-- END: Success Notification Content -->

                      <!-- BEGIN: Failed Notification Content -->
                      <div id="failed-notification-content" class="toastify-content hidden flex">
                        <XCircleIcon class="text-theme-6" />
                        <div class="ml-4 mr-4">
                          <div class="font-medium">Appointment Creation Failed</div>
                          <div class="text-gray-600 mt-1">Review your form and fill all fields</div>
                        </div>
                      </div>

                      <div
                        class="container mx-auto justify-center mt-4"
                        style="display: flex;
      align-items: center; text-align: center;"
                      >
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <button
                            type="reset"
                            data-dismiss="modal"
                            class="btn closeBTN btn-danger w-40 mr-auto"
                          >Cancel</button>

                          <button
                            type="reset"
                            class="btn clearBTN btn-warning w-40 mr-auto"
                            style="display:none;"
                          >Clear</button>
                          <button type="submit" class="btn bg-theme-32 w-40 mr-auto text-white">
                            <LoadingIcon
                              v-if="loading"
                              icon="spinning-circles"
                              color="white"
                              class="w-4 h-4 ml-2"
                            />
                            <span v-else>Book</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <!-- END: Form Layout -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
    </div>
      <!--end last column -->
  </div>
<div>
  
  </div>
  <div>
  
  </div>
<!-- <ApplicationForm  /> -->
                   
</div>
  <!-- END: Super Large Modal Content -->

</template>

<script>
import { defineComponent, toRaw, reactive,toRefs } from 'vue'
import TableAppointment from "../appointments/TableAppointment.vue";
import ApplicationForm from "../appointments/AddAppointment.vue";
// import Calendar from "../appointments/Calender.vue";

import axios from 'axios'
import Toastify from 'toastify-js'
import moment from 'moment'

import { required, maxValue, minValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import router from '../../router'
// Datatable Modules

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'

import $ from 'jquery'
export default defineComponent({
  components: {
    TableAppointment,
    ApplicationForm
    // ,
    // Calendar
  },

  data() {

     // Basic non sticky notification
    const basicNonStickyNotificationToggle = () => {
      Toastify({
        node: $('#basic-non-sticky-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    }
   
       const formData = reactive({
      // loan_product_id: '',
      selected_appointment_type: '',
      // monthly_income: '',
      appointment_date: '',
      comment: '',
      startTime: ''
    })
    const rules = {
      selected_appointment_type: {
        required
      },
      appointment_date: {
        required
      },
      comment: {},
      startTime:{required}
    }
    const validate = useVuelidate(rules, toRefs(formData))

    const handleSubmit = () => {
      this.formData.selected_appointment_type =  this.selected_appointment_type
      this.formData.appointment_date = moment(this.appointment_date).format('YYYY-MM-DD')
      this.formData.startTime = this.newStartTime
      validate.value.$touch()
      if (validate.value.$invalid) {
        Toastify({
          node: $('#failed-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      } else {

      const token = localStorage.getItem('token')
      this.loadingsubmit = true

      // We will handle form submission here
      const data = {
        statusId: 2,
        sourceId: 2,
        periodId: 3,
        appointmentTypeId: this.formData.selected_appointment_type,
        doctors: [1, 2, 3],
        date: this.formData.appointment_date,
        frequencyId: 1,
        interval: this.timeInterval,
        comments: this.comment,
        facility_id: 1,
        // data.append('slots', this.selectedSlot)
        slots: [
          {
            'start-time': this.formData.startTime,

            'end-time': this.newEndTime
          }
        ]
      }

      axios
        .post('patients/appointments/create', data, {
          headers: {
            Authorization: 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => {
          console.log('response', response)
          const notification = document.querySelector(
            '.toastify-content .notification-message'
          )
          if (response.data.status == true) {
            this.loadingsubmit = false
            
             Toastify({
          node: $('#success-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
       
         this.getAppointments()
          document.querySelector('.closeBTN').click()
              // router.push('/dashboard/viewappointments')
              
            // this.$router.go('/dashboard/viewappointments')
          } else {
            this.loadingsubmit = false
            notification.textContent = 'Appointment Creation Failed'
          }
          this.basicNonStickyNotificationToggle()
          console.log('response', response)
          // this.$router.push({
          //   name: 'side-menu-view-appointments'
          // })
        })
        .catch(error => {
          console.log('Error', error)
        })
    }}
    
    return {
      client_appointments: [],
      loading: false,
       loadingsubmit: false,
      selected_appointment_type: '',
      appointment_type: '',
      appointmentData: '',
      startDate: moment(),
      endDate: moment().add(10, 'days'),
      startTime: '',
      endTime: '',
      dateRange: '',
      comment: '',
      timeSlotsArray: '',
      timeInterval: '',
      selectedSlot: '',
      newStartTime: '',
      newEndTime: '',
      highlightedRange:'',

      collateral: '',
      utility: '',
      contract: '',
      handleSubmit,
      formData,
      validate,
      basicNonStickyNotificationToggle,
      search_term: '',
      sortBy: 1,

      currentSort: 'id',
      currentSortDir: 'desc',
      pageSize: 20,
      currentPage: 1,
      printLoading: true,

      printObj: {
        id: 'printMe',
        popTitle: 'Personal Loans',
        extraCss:
          'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        beforeOpenCallback(vue) {
          vue.printLoading = true
          console.log('before')
        },
        openCallback(vue) {
          vue.printLoading = false
          console.log('open')
        },
        closeCallback(vue) {
          console.log('after')
        }
      }
    }
  },



  created() {
    
    this.getAppointments()
    this.getAppointmentTypes()
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
    
  },
  mounted() {
    // this.getAppointments()
  },
  methods: {
    moment,
        onchange(id) {
      console.log('changed', this.startDate)
      //  appointmentData: '',
      // startDate: '',
      // endDate:'',
      // startTime: '',
      // startTime: '',
      this.appointmentData = this.appointment_type.filter(
        selectedType => selectedType.id == this.selected_appointment_type
      )[0]
      Object.assign(
        this.appointmentData,
        this.appointment_type.filter(
          selectedType => selectedType.id == this.selected_appointment_type
        )[0]
      )
      Object.assign(this.timeInterval, this.appointmentData.agenda_interval)
      Object.assign(
        this.startDate,
        moment(this.appointmentData.start_date, 'DD-MM-YYYY')
      )
      Object.assign(
        this.endDate,
        moment(this.appointmentData.end_date, 'DD-MM-YYYY')
      )
     document.getElementById("date_input").disabled = false
      // this.startDate = moment(this.appointmentData.start_date).format('MMMM d, YYYY')
      // this.endDate = moment(this.appointmentData.end_date).format('MMMM d, YYYY')
      this.startTime = this.appointmentData.start_time
      this.endTime = this.appointmentData.end_time
      this.timeInterval = this.appointmentData.agenda_interval
      // this.appointment_date = moment(
      //   this.appointmentData.start_date,
      //   'DD-MM-YYYY'
      // ).format('DD MMM, YYYY')

      // Returns an array of dates between the two dates
      function getDates(startDate, endDate) {
        const dates = []
        // console.log('startDate inside', startDate)
        let currentDate = startDate
        const addDays = function(days) {
          const date = new Date(this.valueOf())
          //  const formatedDate = moment(date).format('DD-MM-YYYY')
          date.setDate(date.getDate() + days)
          // date.setDate(date.getDate() + days)
          // const formatedDate = moment(date).format('DD-MM-YYYY')
          return date
        }
        while (currentDate <= endDate) {
          dates.push(moment(currentDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          currentDate = addDays.call(currentDate, 1)
        }
        // this.dateRange = dates
        return dates
      }
      const date1 = moment(this.startDate, 'DD-MM-YYYY')
      const date2 = moment(this.endDate, 'DD-MM-YYYY')
      // Usage
      // this.dateRange console.log('middle', startDate,endDate)
      // console.log('datebetween start,end', date1, date2)
      const d = new Date();
      const yesterday = d.setDate(d.getDate() - 1)
      const dates = getDates(this.startDate, yesterday)
      dates.forEach(function(date) {
        // console.log('datebetween', date)
      })
      //
      this.dateRange = dates
      const str = dates.toString()
      const highlightedRange1 = JSON.stringify(dates).replaceAll(`"`, `'`)
     this.highlightedRange = dates
     //  const highlightedRange3 = JSON.stringify(dates).replaceAll(`"`, `'`);
      const highlightedRange3 = dates.toString().replaceAll(`"`, `'`);
      console.log('this.highlightedRange ', this.highlightedRange )
  
        this.highlightedRange=
        highlightedRange3
     






      // time slots
      const getTimeStops = (start, end) => {
        // var startTime = moment(new Date(), 'HH:mm')
        var startTime = moment(start, 'HH:mm')
        var endTime = moment(end, 'HH:mm')
        var interval = parseInt(this.timeInterval)
        // var interval = parseInt(10);
        if (endTime.isBefore(startTime)) {
          endTime.add(1, 'day')
        }

        var timeStops = []

        // while (startTime <= endTime) {
        //   timeStops.push(new moment(startTime).format('HH:mm'))
        //   startTime.add(interval, 'minutes')
        // }
        for (let i = 0; ; i++) {
          if (startTime.diff(endTime) >= 0) {
            break
          }
          let prevTime = startTime
          let newTime = moment(startTime, 'HH:mm').add(interval, 'minutes')
          timeStops.push({
            startTime: prevTime.format('HH:mm'),
            endTime: newTime.format('HH:mm')
          })
          console.log({
            'start-time': prevTime.format('HH:mm'),
            endTime: newTime.format('HH:mm')
          })
          startTime = newTime
        }
        return timeStops
      }

      // var timeStops = getTimeStops('11:00', '02:00')
      // console.log('timeStops 1', timeStops);
      // timeStops = getTimeStops('11:00', '23:59')
      this.startTime, this.endTime
      this.timeSlotsArray = getTimeStops(this.startTime, this.endTime)
      console.log(
        'time start, end, interval',
        this.startTime,
        this.endTime,
        this.timeInterval
      )
      console.log('timeslots', this.timeSlotsArray)
    },
    // selected slot
    chooseSlot(slot) {
      console.log('Slot', slot)

      Object.assign(this.selectedSlot, slot)
      this.selectedSlot = slot
      this.newStartTime = slot.startTime
      this.newEndTime = slot.endTime
      console.log(
        'this.newStartTime, this.newEndTime',
        this.newStartTime,
        this.newEndTime
      )
    },
  // Getting All types
    getAppointmentTypes() {
      // this.loading = false
      const token = localStorage.getItem('token')
      axios
        .post(
          'patients/appointments/types',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,

              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then(res => {
          this.appointment_type = res.data.payload
          console.log(
            'before startDate, this.endDate, this.startTime, this.endTime',
            this.startDate,
            this.endDate,
            this.startTime,
            this.endTime
          )
          console.log('appointment_type', this.appointment_type)
        })
        .catch(err => console.log(err))
    },
    // Getting All Appointments
    getAppointments() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios

        .post(
          'patients/appointments/all',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,

              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then(res => {
          this.loading = false
         
          
          const array = res.data.payload
          const allclient_appointments  = array.sort((a, b) => a.id - b.id)
           const ppclient_appointments = allclient_appointments.filter(
        element => element.status.status === 'Closed')
        this.client_appointments = allclient_appointments.filter(
        element => element.status.status === 'Closed')
      console.log('ppclient_appointments', ppclient_appointments)
           Object.assign(this.client_appointments, ppclient_appointments)

          setTimeout(() => {
            const table = $('table.display').DataTable({
              // pagingType: 'full_numbers',
              // pageLength: 10,
              // stateSave: true,
              lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
              ],
              processing: true,
              scrollX: true,
              destroy: true,
              dom:
                '<"row view-filter"<"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"<"pull-left"B><"center md:block mx-auto text-slate-500"i><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"lp>>>',
              aaSorting: [[0, 'desc']],
              responsive: true,
              buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5'],
              initComplete: function() {
                var btns = $('.dt-button');
            btns.addClass('btn  bg-white btn-sm text-white dark:bg-dark-1');
            btns.removeClass('dt-button');
             var btnspaginate = $('.paginate_button');
            btnspaginate.addClass('btn  bg-white btn-sm text-white dark:bg-dark-1 text-gray-900 dark:text-white active:bg-theme-36');
            // btnspaginate.removeClass('paginate_button');
            
            var textcolor = $('.dataTables_info');
            textcolor.addClass('text-gray-900 dark:text-white');
            textcolor.removeClass('dataTables_info');
            var textsearch = $('label');
            textsearch.addClass('text-gray-900 dark:text-white');
            var textlink = $('span');
            textlink.addClass('text-gray-900 dark:text-white');
             var textselect = $('select');
            textselect.addClass('text-gray-900 dark:text-white');
              }
            })
            $('.dataTables_empty').text('No appointment yet.')
            $('a.toggle-vis').on('click', function(e) {
              e.preventDefault()

              // Get the column API object
              const column = table.column($(this).attr('data-column'))

              // Toggle the visibility
              column.visible(!column.visible())
            })
          })
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    },
    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },

    // Coverting decimal places of numbers in table
    formatNumber(value) {
      if (value) {
        return parseFloat(value).toLocaleString()
      }
    }
  }
})
</script>
<style scoped>
a.paginate_button.current {
  color: #fff !important;
}
.tablesearch {
  color: #4a5568;
  /*text-gray-700*/
  padding-left: 1rem;
  /*pl-4*/
  padding-right: 1rem;
  /*pl-4*/
  padding-top: 0.5rem;
  /*pl-2*/
  padding-bottom: 0.5rem;
  /*pl-2*/
  line-height: 1.25;
  /*leading-tight*/
  border-width: 2px;
  /*border-2*/
  border-radius: 0.25rem;
  border-color: #ff782e;
  /*border-gray-200*/
  background-color: #edf2f7;
  /*bg-gray-200*/
}
/*Form fields*/

.tablefocus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  /*bg-gray-200*/
}
</style>