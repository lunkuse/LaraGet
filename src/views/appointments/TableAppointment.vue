
<template>
  <div>
    <div>
      <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Appointments</h2>
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
          <a
            href="javascript:;"
            data-toggle="modal"
            data-target="#static-backdrop-modal-preview"
            class="btn mr-1 mb-2 bg-theme-32 text-white"
          >
            <PlusIcon />New Appointment
          </a>

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
              <button
                style="margin:10px;"
                class="dropdown-toggle btn btn-outline-secondary w-full sm:w-auto"
                aria-expanded="false"
              >
                Column Visibility
                <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
              </button>
              <div class="dropdown-menu w-40">
                <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                  <a
                    id="tabulator-export-csv"
                    href="javascript:;"
                    class="toggle-vis flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                    data-column="0"
                  >No.</a>
                  <a
                    id="tabulator-export-csv"
                    href="javascript:;"
                    class="toggle-vis flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                    data-column="1"
                  >Loan ID</a>
                  <a
                    class="toggle-vis flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                    data-column="2"
                  >Application Date</a>
                  <a
                    class="toggle-vis flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                    data-column="3"
                  >Status</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- loader text -->
        <span v-if="loading" class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10">
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>We are loading your Appointments...</span>
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
                  <th class="whitespace-nowrap">No.# </th>

                  <th class="whitespace-nowrap">Type</th>
                  <th class="whitespace-nowrap">Status</th>
                  <th class="whitespace-nowrap">Appointment Date</th>
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
                      'text-grey-100': appointment.status.status === 'Pending'
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
                          class="lucide w-4 h-4 mr-1"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg> Open
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
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import moment from 'moment'

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
  components: {},

  data() {
    return {
      client_appointments: [],
      loading: false,
    }
  },

  created() {
    this.getAppointments()
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
          Object.assign(this.client_appointments, res.data.payload)
          
          const array = res.data.payload
          this.client_appointments  = array.sort((a, b) => a.id - b.id)

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
                var btns = $('.dt-button')
                btns.addClass('btn  bg-theme-32 btn-sm text-white')
                btns.removeClass('dt-button')
                $('input').addClass('tablesearch"')
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