
<template>
  <div>
    <div>
      <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Appointment Types</h2>
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
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
        <!-- loader text -->
        <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
        >
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>We are loading your appointment types...</span>
        </span>
        <div v-if="!loading" class="scrollbar-hidden">
          <div
            id="printMe intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0"
          >
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

                  <th class="whitespace-nowrap">
                    {{ $t('translation.name_text') }}
                  </th>

                  <th class="whitespace-nowrap">
                    {{ $t('translation.start_date_text') }}
                  </th>
                  <th class="whitespace-nowrap">
                    {{ $t('translation.end_date_text') }}
                  </th>

                  <th class="whitespace-nowrap">
                    {{ $t('translation.start_time_text') }}
                  </th>
                  <th class="whitespace-nowrap">
                    {{ $t('translation.end_time_text') }}
                  </th>
                  <!-- <th class="whitespace-nowrap">Action</th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="appointmentType in appointmentType"
                  :key="appointmentType.id"
                  class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                >
                  <td class="whitespace-nowrap">{{ appointmentType.id }}</td>
                  <td class="whitespace-nowrap">{{ appointmentType.title }}</td>
                  <td class="whitespace-nowrap">
                    {{ appointmentType.start_date }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ appointmentType.end_date }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ appointmentType.start_time }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ appointmentType.end_time }}
                  </td>

                  <!-- <td class="whitespace-nowrap">
                   
                      <a
                        class="flex items-center text-primary whitespace-nowrap mr-5"
                        href="javascript:;"
                      > -->
                  <!-- <a
                      class="flex items-center text-primary whitespace-nowrap"
                      href="javascript:;"
                      data-toggle="modal"
                      data-target="#make-appointment-modal"
                      :disabled="isDisabled"
                      @click="getAppointmentTypeID(appointmentType)"
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
                        </svg> Make Appointment
                      </a> -->
                  <!-- </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- END: HTML Table Data -->
    </div>
    <MakeAppointmentModal :appointmenttypeid="appointmentTypeID" />
  </div>
</template>

<script>
import { defineComponent, toRaw, inject } from 'vue'
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
import MakeAppointmentModal from '@/components/typemakeappointment/MakeAppointment.vue'
export default defineComponent({
  components: {
    MakeAppointmentModal
  },

  data() {
    return {
      appointmentType: [],
      loading: false,
      appointmentTypeID: null
    }
  },

  created() {
    this.getAppointmentTypes()
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
  },
  mounted() {
    this.getAppointmentTypes()
  },
  methods: {
    moment,
    // Getting All Appointment Types
    getAppointmentTypes() {
      this.loading = true
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
          this.loading = false
          Object.assign(this.appointmentType, res.data.payload)
          this.appointmentType = res.data.payload
          //              var data = this.appointmentType;
          // for ( var i=0 ; i<8 ; i++ ) {
          //     data.push( [ i, i, i, i, i ] );
          // }
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
              destroy: true,
              dom: '<"row view-filter"<"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"<"pull-left"B><"center md:block mx-auto text-slate-500"i><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"lp>>>',
              aaSorting: [[0, 'desc']],
              responsive: true,
              buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5'],
              initComplete: function () {
                var btns = $('.dt-button')
                btns.addClass('btn  bg-theme-32 btn-sm text-white')
                btns.removeClass('dt-button')
                $('input').addClass('tablesearch')
              }
            })

            $('.dataTables_empty').text('No Type yet.')
          })
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch((err) => console.log(err))
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
    formatSum(value) {
      if (value) {
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
    getAppointmentTypeID(appointmentType) {
      this.appointmentTypeID = appointmentType
      console.log('open type', this.appointmentTypeID)
    }
  },
  setup() {
    return {}
  }
})
</script>
