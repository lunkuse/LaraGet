<template>
  <div>
    <div>
      <div class="">
        <div class="">
          <div class="">
            <!-- first column -->

            <div class=" ">
              <!-- added -->
              <!-- BEGIN: Calender Component -->
              <div class="col-span-12 lg:col-span-6 mt-8">
                <!-- header upcoming -->
                <div class="intro-x flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                  {{ $t('translation.calendar_text') }}
                  </h2>
                </div>

                <div class="intro-y box p-2 mt-10 sm:mt-5">
                  <FullCalendar :options="calendarOptions" />
                </div>
              </div>
              <!-- END: Calender Component  -->
            </div>
            <!-- END: Calender Component  -->
            <!-- appointment creation form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGrid from '@fullcalendar/timegrid'
import list from '@fullcalendar/list'
import allLocales from '@fullcalendar/core/locales-all'
import axios from 'axios'
import moment from 'moment'
import router from '../../router'

export default defineComponent({
  components: {
    FullCalendar
  },
  data() {
    return {
      initialLocaleCode: 'nl',
      selectedLanguage: 'nl',
      upcomingappointments: [],
      no_of_appointments: 0,
      no_of_invoices: 0,
      no_of_types: 0,
      translations: '',
      client_invoices: [],
      client_messages: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGrid, list],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        locales: allLocales,
        height: 'auto',
        locale: localStorage.getItem('lang') ?? 'nl', // the initial locale
        header: {
          left: 'title',
          center: 'month,agendaWeek,agendaDay',
          right: 'today prev,next'
        },
        titleFormat: { month: 'short', year: 'numeric' },
        headerToolbar: {
          left: 'title',
          center: '',
          right: 'dayGridMonth timeGridWeek timeGridDay'
        },

        footerToolbar: {
          left: 'prevYear,nextYear',
          center: '',
          right: 'prev,next'
        },
        customButtons: {
          TableFormat: {
            text: ' Table View',
            click: function () {
              // alert('View in Table Format');
              // /dashboard/viewappointments
              router.push({
                name: 'side-menu-view-appointments'
              })
            }
          }
        },
        events: [],
        eventColor: '#FF782E',
      }
    }
  },

  setup() {
    const localeSelectorEl = ref(localStorage.getItem('lang') ?? 'nl')
    return { localeSelectorEl }
  },
  computed: {},
  created() {
    this.getUpcomingAppointment()
    this.getAllAppointmentTypes()
  },
  mounted() {
    this.getTranslations()
    this.getUpcomingAppointment()
  },
  methods: {
    moment,

    getTranslations() {
      this.translations = JSON.parse(localStorage.getItem('translations'))
      // console.log('translate view appointment', this.translations)
    },
    // handle date click
    handleDateClick: function (arg) {
      // alert('make new appointment on ' + arg.dateStr)
    },
    // Getting All types
    getAllAppointmentTypes() {
      this.loading = false
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
        .then((res) => {
          const appointment_type = res.data.payload
          this.no_of_types = appointment_type.length
        })
        .catch((err) => console.log(err))
    },
    // total sum for prices
    formatSum(value) {
      if (value) {
        const array = Number(value)
        let sum = 0

        const total = String(value)
          .split(',')
          .map((e) => parseFloat(e))
          .reduce((value, element) => {
            return value + element
          })
        // .toStringAsFixed(1)
        const sum2 = 9

        console.log('new total', total)
        //   console.log('array sum',sum )
        return total
      }
    },
    // appointments
    getUpcomingAppointment() {
      this.loading = true
      const token = localStorage.getItem('token')

      try {
        axios
          .post(
            'patients/appointments/all',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((res) => {
            const allappointments = res.data.payload
            this.no_of_appointments = allappointments?.length
            this.upcomingappointments = allappointments?.slice(0, 5)
            console.log('this.upcomingappointments', this.upcomingappointments)
            const events = allappointments.map((p) => {
              const color =
                p.status.status === 'Waiting'
                  ? 'orange'
                  : p.status.status === 'Confirmed'
                  ? 'green'
                  : p.status.status === 'Closed'
                  ? 'red'
                  : 'grey'
              const borderColor =
                p.status.status === 'Waiting'
                  ? 'orange'
                  : p.status.status === 'Confirmed'
                  ? 'green'
                  : p.status.status === 'Closed'
                  ? 'red'
                  : 'grey'
              return {
                // appointment.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                title: p?.treatment_type
                  ? p?.treatment_type?.title
                  : p?.appointment_type?.title,
                start:
                  p.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                    ? moment(
                        `${p.date} ${p?.slots['start-time']}`,
                        '"DD-MM-YYYY" HH:mm'
                      ).format('YYYY-MM-DD HH:mm')
                    : moment(
                        `${p.date} ${p.slots['start-time']}`,
                        'YYYY-MM-DD HH:mm'
                      ).format('YYYY-MM-DD HH:mm'),
                end:
                  p.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                    ? moment(
                        `${p.date} ${p.slots['end-time']}`,
                        'DD-MM-YYYY HH:mm'
                      ).format('YYYY-MM-DD HH:mm')
                    : moment(
                        `${p.date} ${p.slots['end-time']}`,
                        'YYYY-MM-DD HH:mm'
                      ).format('YYYY-MM-DD HH:mm'),
                // start: moment(`${p.date} ${p.slots['start-time']}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm') ,
                // end: moment(`${p.date} ${p.slots['end-time']}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
                display: 'block',
                borderColor,
                color
                // start: '2022-06-02 17:30:00',
                // end: '2022-06-03 21:30:00'
              }
            })
            // 23-06-2022 14:50 //

            Object.assign(this.calendarOptions, {
              ...this.calendarOptions,
              events: events
            })
            var btnscalendar = $('.fc-button')
            btnscalendar.addClass(
              'btn  bg-white btn-sm text-white dark:bg-dark-1'
            )
            btnscalendar.removeClass('.fc-button')
            var textsearchs = $('label')
            textsearchs.addClass('text-white dark:text-gray-900')
            console.log('Events', this.calendarOptions.events)
          })
        // .catch((err) => console.log(err))
      } catch (error) {
        console.log('try catch')
        console.log(error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>