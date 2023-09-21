
<template>
  <div>
    <div
      id="static-backdrop-modal-preview"
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
                          </div>
<p>this field is required </p>
                          <!-- date -->
                          <div class="mt-3">
                            <label for="update-profile-form-12" class="form-label font-semibold">
                              Pick a date
                              <span class="text-theme-6">*</span>
                            </label>
                            <Litepicker
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
                              highlightedDays:dateRange,
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
                              required
                            />
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
                          <div class="text-gray-600 mt-1">Review your form.</div>
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

  <!-- END: Super Large Modal Content -->
</template>

<script>
import { defineComponent, toRaw, reactive, toRefs } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import moment from 'moment'

// Validations
import { required, maxValue, minValue } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import $ from 'cash-dom'
export default defineComponent({
  components: {},

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
      comment: ''
    })
    const rules = {
      selected_appointment_type: {
        required
      },
      appointment_date: {
        required
      },
      comment: {}
    }
    const validate = useVuelidate(rules, toRefs(formData))

    const handleSubmit = () => {
      // validate.value.$touch()
      if (this.selected_appointment_type === null) {
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
        if (this.appointment_date === null) {

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
        }
else {
    if (this.newStartTime === null) {

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
        }
else {
      const token = localStorage.getItem('token')
      this.loading = true

      // We will handle form submission here
      const data = {
        statusId: 2,
        sourceId: 2,
        periodId: 3,
        appointmentTypeId: this.selected_appointment_type,
        doctors: [1, 2, 3],
        date: moment(this.appointment_date).format('YYYY-MM-DD'),
        frequencyId: 1,
        interval: this.timeInterval,
        comments: this.comment,
        facility_id: 1,
        // data.append('slots', this.selectedSlot)
        slots: [
          {
            'start-time': this.newStartTime,

            'end-time': this.newEndTime
          }
        ]
      }

      axios
        .post('/appointments/create', data, {
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
            this.loading = false
            document.querySelector('.closeBTN').click()
            notification.textContent =
              'Appointment has been successfully created.'
            // this.$router.go('/dashboard/viewappointments')
          } else {
            this.loading = false
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
    }}}
    }

    return {
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

      collateral: '',
      utility: '',
      contract: '',
      handleSubmit,
      formData,
      validate,
      loading: false,
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
  mounted() {
    this.getAppointmentTypes()
  },
  created() {
    this.getAppointmentTypes()
  },
  props: ['endDate'],


  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
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
      this.appointment_date = moment(
        this.appointmentData.start_date,
        'DD-MM-YYYY'
      ).format('DD MMM, YYYY')

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
      const dates = getDates(this.startDate, new Date())
      dates.forEach(function(date) {
        // console.log('datebetween', date)
      })
      //
      this.dateRange = dates
      // console.log('dateRange', this.dateRange.length, dates.length)

      // time slots
      const getTimeStops = (start, end) => {
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
      this.loading = false
      const token = localStorage.getItem('token')
      axios
        .post(
          '/appointments/types',
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

    // Collateral Upload
    handleFileUpload() {
      this.collateral = event.target.files[0]
    },
    // Utility Bill Upload
    handleUtilityUpload() {
      this.utility = event.target.files[0]
    },
    // Contract Upload
    handleContractUpload() {
      this.contract = event.target.files[0]
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
    },
    sort(s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },

    // Converting first letter to uppercase
    ucfirst(value) {
      const firstLetter = value.slice(0, 1)
      return firstLetter.toUpperCase() + value.substring(1)
    }
  }
})
</script>
<style lang="scss"></style>

