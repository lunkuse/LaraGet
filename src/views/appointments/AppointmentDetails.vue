<template>
  <div class="tab-pane active" role="tabpanel" id="_7gmksu1jl" aria-labelledby="_7gmksu1jl-tab">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Appointment Details</h2>

      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <!-- <a
          href="javascript:;"
          data-toggle="modal"
          data-target="#static-backdrop-modal-preview"
          class="btn mr-1 mb-2 bg-theme-32 text-white"
          ><PlusIcon />  Reschedule</a
        >-->

        <!-- END: Super Large Modal Toggle -->
        <div class="dropdown ml-auto sm:ml-0">
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2"></div>
          </div>
        </div>
      </div>
    </div>
      <span v-if="loading" class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10">
        <LoadingIcon icon="oval" class="w-10 h-10" />
        <span>We are loading your Treatment details...</span>
      </span>
    <div class="box p-5 mt-5" v-if="!loading">
      <div class="flex-col items-center  border-slate-200 dark:border-darkmode-400 pb-5">
        <!-- date -->
        <div
          class="pl-4 w-full bg-indigo flex flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5"
        >
          <div class="w-full lg:w-2/3 bg-blue h-8 font-bold">Appointment Date</div>

          <div v-if="client_appointments.date" class="w-full lg:w-1/3 bg-red h-8 font-bold">
            <div
              v-if="client_appointments.date.match(/^\d{4}-\d{2}-\d{2}$/) === null"
            >{{moment(client_appointments.date, "DD-MM-YYYY").format("DD MMMM YYYY")}}</div>
            <div v-else>{{moment(client_appointments.date, "YYYY-MM-DD").format("DD MMMM YYYY")}}</div>
          </div>
        </div>

        <!-- start time -->
        <div
          class="pl-4 w-full bg-indigo flex flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5"
        >
          <div class="w-full lg:w-2/3 bg-blue h-8">Time</div>
          <div
            class="w-full lg:w-1/3 bg-red h-8"
            v-if="(client_appointments.slots)"
          >{{client_appointments.slots[0]['start-time']}} - {{client_appointments.slots[0]['end-time']}}</div>
        </div>
        <!-- status -->
        <div
          class="pl-4 w-full bg-indigo flex flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5"
        >
          <div class="w-full lg:w-2/3 bg-blue h-8">Status</div>

          <div
            class="w-full lg:w-1/3 bg-red h-8"
            v-if="(client_appointments.status)"
          >{{client_appointments.status.status}}</div>
        </div>
        <!-- Dostor -->
        <div
          class="pl-4 w-full bg-indigo flex flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5"
        >
          <div class="w-full lg:w-2/3 bg-blue h-8">Doctor</div>
          <div class="w-full lg:w-1/3 bg-red h-8"  v-if="(client_appointments.doctors)">
          <!-- {{client_appointments.doctors[0]['first_name']}} {{client_appointments.doctors[0]['last_name']}} -->
          </div>
        </div>

        <!--treatment  -->
        <div 
        
          class="pl-4 w-full bg-indigo flex flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5"
        >
          <div class="w-full lg:w-2/3 bg-blue h-8">Treatment</div>
          <div class="w-full lg:w-1/3 bg-red h-8"  v-if="(client_appointments.slots)">{{client_appointments.treatment_type ? client_appointments.treatment_type.title: client_appointments.appointment_type.title}}</div>
        </div>

        <!-- date created -->
        <div
          class="pl-4 w-full bg-indigo flex flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5"
        >
          <div class="w-full lg:w-2/3 bg-blue h-8">Date Created</div>

            <div v-if="client_appointments.created_at" class="w-full lg:w-1/3 bg-red h-8 ">
            <div
              v-if="client_appointments.created_at.match(/^\d{4}-\d{2}-\d{2}$/) === null"
            >{{moment(client_appointments.created_at, "DD-MM-YYYY").format("DD MMMM YYYY")}}</div>
            <div v-else>{{moment(client_appointments.created_at, "YYYY-MM-DD").format("DD MMMM YYYY")}}</div>
          </div>
        </div>
        <!-- comment-->
        <div class="pl-4 w-full bg-indigo flex flex items-center py-5">
          <div class="w-full lg:w-2/3 bg-blue h-8" v-if="client_appointments.comment">Comment</div>

          <div
            class="w-full lg:w-1/3 bg-red h-8"
            v-if="client_appointments.comment"
          >{{client_appointments.comment}}</div>
        </div>
        <div
        
          class="container mx-auto justify-center mt-3"
          style="display: flex;
  align-items: center; text-align: center; display:none;"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
            <a
              href="javascript:;"
              data-toggle="modal"
              data-target="#static-backdrop-modal-preview"
              class="btn btn-danger mr-1 mb-2 text-white"
            >Cancel</a>

            <a
              href="javascript:;"
              data-toggle="modal"
              data-target="#static-backdrop-modal-preview"
              class="btn mr-1 mb-2 bg-theme-32  text-white"
            >Reschedule</a>
            <!-- <a
              href="javascript:;"
              data-toggle="modal"
              data-target="#static-backdrop-modal-preview"
              class="btn mr-1 mb-2 bg-theme-32 text-white"
            >Confirm</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent, toRaw } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import moment from 'moment'

export default defineComponent({
  components: {},

  data() {
    return {
      client_appointments: [],
      loading: false
    }
  },

  created() {
    // this.getAppointments()
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
  },
  mounted() {
    this.getAppointments()
  },
  methods: {
    moment,

    // Getting All Appointments
    getAppointments() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios

        .post(
          'patients/appointments/show',
          // 'patients/appointments/all',
          {appointmentId:this.$route.params.appointmentId},
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
          const allclient_appointments = res.data.payload
 this.client_appointments = res.data.payload
          // this.client_appointments = allclient_appointments.filter(
          //   Details => Details.id == this.$route.params.appointmentId
          // )[0]
          console.log('details appointments', this.client_appointments)

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

