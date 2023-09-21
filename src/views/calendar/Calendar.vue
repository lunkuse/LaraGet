<template>
  <div>
    <div>
      <div class="content">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 2xl:col-span-12">
            <!-- first column -->

            <div class="grid">
              <!-- added -->
              <!-- BEGIN: Calender Component -->
              <div class="col-span-12 lg:col-span-6 mt-8">
                <div class="intro-x flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    {{ $t("translation.calendar_text") }}
                  </h2>

                  <a
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#static-backdrop-modal-preview"
                    class="ml-auto btn mr-1 mb-2 bg-theme-32 text-white dark:text-theme-10 truncate"
                  >
                    <PlusIcon />{{ $t("translation.new_appointment_text") }}
                  </a>
                </div>
                <div class="intro-y box p-2 mt-10 sm:mt-5">
                  <FullCalendar :options="calendarOptions" />
                </div>
              </div>
              <!-- END: Calender Component  -->

              <!-- BEGIN: Upcoming Appointments -->
              <div
                class="col-span-12 lg:col-span-6 mt-8"
                v-if="upcomingappointments?.length !== 0"
              >
                <div class="intro-x flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    {{ $t("translation.recent_appointments_text") }}
                  </h2>
                  <!-- <router-link to="/" class="ml-auto text-theme-1 dark:text-theme-10 truncate">
                    <a class="ml-auto text-theme-1 dark:text-theme-10 truncate">Add new Appointment</a>
                  </router-link> -->
                </div>

                <div class="intro-y p-2 mt-1 sm:mt-1">
                  <div class="mt-5 relative" style="height: 100%">
                    <div
                      class="intro-x relative flex items-center mb-3"
                      v-for="upcomingappointments in upcomingappointments"
                      :key="upcomingappointments?.id"
                      :class="{ 'mt-5': upcomingappointments.id }"
                      @click="showAppDetail(upcomingappointments)"
                    >
                      <a
                        href="javascript:;"
                        data-toggle="modal"
                        data-target="#open-notification-all-modal"
                        :disabled="isDisabled"
                        @click="getUpcomingAppointment(upcomingappointments)"
                        class="flex-1 float-right"
                      >
                        <!-- <div class="box px-5 py-2 ml-4 flex-1 zoom-in " 
                :class="appointmentStatusClass(upcomingappointments.status.status)"
                        >-->
                        <div class="box px-5 py-2 ml-1 flex-1 zoom-in">
                          <div class="flex items-center">
                            <div class="font-medium truncate ...">
                              <h5
                                class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
                              >
                                {{
                                  upcomingappointments.treatment_type
                                    ? upcomingappointments.treatment_type.title
                                    : upcomingappointments.appointment_type
                                        .title
                                }}
                              </h5>
                            </div>
                          </div>
                          <div class="text-gray-800 truncate">
                            <span class="float-right">
                              <div
                                class="flex"
                                :class="{
                                  'text-theme-12':
                                    upcomingappointments?.status?.status ===
                                    'Waiting',
                                  'text-theme-9':
                                    upcomingappointments?.status?.status ===
                                    'Confirmed',
                                  'text-theme-6':
                                    upcomingappointments?.status?.status ===
                                    'Closed',
                                  'text-grey-100':
                                    upcomingappointments?.status?.status ===
                                    'Pending',
                                }"
                              >
                                <AlertCircleIcon
                                  v-if="
                                    upcomingappointments?.status?.status ===
                                    'Waiting'
                                  "
                                  class="w-4 h-4 mr-2"
                                />
                                <ThumbsUpIcon
                                  v-if="
                                    upcomingappointments?.status?.status ===
                                    'Confirmed'
                                  "
                                  class="w-4 h-4 mr-2"
                                />
                                <CheckSquareIcon
                                  v-if="
                                    upcomingappointments?.status?.status ===
                                    'Closed'
                                  "
                                  class="w-4 h-4 mr-2"
                                />
                                <CheckSquareIcon
                                  v-if="
                                    upcomingappointments?.status?.status ===
                                    'Pending'
                                  "
                                  class="w-4 h-4 mr-2"
                                />
                                {{
                                  getStatus(upcomingappointments?.status?.status)
                                }}
                              </div>
                            </span>
                            <div
                              class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-600"
                            >
                              <div
                                v-if="
                                  upcomingappointments?.date.match(
                                    /^\d{4}-\d{2}-\d{2}$/
                                  ) === null
                                "
                              >
                                {{
                                  moment(
                                    upcomingappointments?.date,
                                    "DD-MM-YYYY"
                                  ).format("DD-MM-YYYY")
                                }}
                              </div>
                              <div v-else>
                                {{
                                  moment(
                                    upcomingappointments.date,
                                    "YYYY-MM-DD"
                                  ).format("DD-MM-YYYY")
                                }}
                              </div>
                            </div>
                            <p
                              class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-400"
                            >
                              {{ upcomingappointments?.slots["start-time"] }} -
                              {{ upcomingappointments?.slots["end-time"] }}
                            </p>
                          </div>
                        </div>
                        <!-- </div> -->
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Calender Component  -->
            <!-- appointment creation form -->
          </div>
        </div>
      </div>
    </div>

    <ApplicationForm />
    <AppointmentModal
      v-if="isAppDetailVisible === true"
      @close="closeAppDetail"
      :appointment="selectedAppointment"
      class="!z-50"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import list from "@fullcalendar/list";
import axios from "axios";
import moment from "moment";
import router from "../../router";
import ApplicationForm from "../appointments/AddAppointment.vue";
import allLocales from "@fullcalendar/core/locales-all";
import { useI18n } from "vue-i18n";
import AppointmentModal from '../appointments/appointments/AppointmentModal.vue'
export default defineComponent({
  components: {
    FullCalendar,
    ApplicationForm,
    AppointmentModal
  },
  data() {
    return {
      upcomingappointments: [],
      no_of_appointments: 0,
      no_of_invoices: 0,
      no_of_types: 0,
      client_invoices: [],
      client_messages: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGrid, list],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        locales: allLocales,
        height: "auto",
        locale: localStorage.getItem("lang") ?? "nl", // the initial locale
        header: {
          left: "title",
          center: "month,agendaWeek,agendaDay",
          right: "today prev,next",
        },
        titleFormat: { month: 'short', year: 'numeric' },
        headerToolbar: {
          left: "dayGridMonth timeGridWeek timeGridDay",
          center: "title",
          right: "prevYear prev next nextYear",
        },
        footerToolbar: {
          left: "TableFormat",
          center: "",
          right: "prev,next",
        },
        customButtons: {
          TableFormat: {
            text: " Table View",
            click: function () {
              // alert('View in Table Format');
              // /dashboard/viewappointments
              router.push({
                name: "side-menu-view-appointments",
              });
            },
          },
        },
        events: [],
        eventColor: "#FF782E",
      },
    };
  },

  setup() {
    const { t } = useI18n({});
    const isAppDetailVisible = ref(false)
    const selectedAppointment = ref(null)
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
    const showAppDetail = (appointment) => {
      selectedAppointment.value = appointment
      isAppDetailVisible.value = true
    }
    const closeAppDetail = () => {
      isAppDetailVisible.value = false
      selectedAppointment.value = null
    }
    return {
      t,
      getStatus,
      isAppDetailVisible,
      selectedAppointment,
      showAppDetail,
      closeAppDetail
    };
  },
  computed: {},
  created() {
    this.getUpcomingAppointment();
    this.getAllAppointmentTypes();
  },
  mounted() {
    this.getUpcomingAppointment();
  },
  methods: {
    moment,

    // handle date click
    handleDateClick: function (arg) {
      // alert('make new appointment on ' + arg.dateStr)
    },
    // Getting All types
    getAllAppointmentTypes() {
      this.loading = false;
      const token = localStorage.getItem("token");
      axios
        .post(
          "patients/appointments/types",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,

              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((res) => {
          const appointment_type = res.data.payload;
          this.no_of_types = appointment_type.length;
        })
        .catch((err) => console.log(err));
    },
    // total sum for prices
    formatSum(value) {
      if (value) {
        const array = Number(value);
        let sum = 0;

        const total = String(value)
          .split(",")
          .map((e) => parseFloat(e))
          .reduce((value, element) => {
            return value + element;
          });
        // .toStringAsFixed(1)
        const sum2 = 9;

        console.log("new total", total);
        //   console.log('array sum',sum )
        return total;
      }
    },
    // appointments
    getUpcomingAppointment() {
      this.loading = true;
      const token = localStorage.getItem("token");

      try {
        axios
          .post(
            "patients/appointments/all",
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            const allappointments = res.data.payload;
            this.no_of_appointments = allappointments.length;
            this.upcomingappointments = allappointments.slice(0, 5);
            console.log("this.upcomingappointments", this.upcomingappointments);
            const events = allappointments.map((p) => {
              const color =
                p.status.status === "Waiting"
                  ? "orange"
                  : p.status.status === "Confirmed"
                  ? "green"
                  : p.status.status === "Closed"
                  ? "red"
                  : "grey";
              const borderColor =
                p.status.status === "Waiting"
                  ? "orange"
                  : p.status.status === "Confirmed"
                  ? "green"
                  : p.status.status === "Closed"
                  ? "red"
                  : "grey";
              return {
                // appointment.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                title: p.treatment_type
                  ? p.treatment_type.title
                  : p.appointment_type.title,
                start:
                  p.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                    ? moment(
                        `${p.date} ${p.slots["start-time"]}`,
                        '"DD-MM-YYYY" HH:mm'
                      ).format("YYYY-MM-DD HH:mm")
                    : moment(
                        `${p.date} ${p.slots["start-time"]}`,
                        "YYYY-MM-DD HH:mm"
                      ).format("YYYY-MM-DD HH:mm"),
                end:
                  p.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                    ? moment(
                        `${p.date} ${p.slots["end-time"]}`,
                        "DD-MM-YYYY HH:mm"
                      ).format("YYYY-MM-DD HH:mm")
                    : moment(
                        `${p.date} ${p.slots["end-time"]}`,
                        "YYYY-MM-DD HH:mm"
                      ).format("YYYY-MM-DD HH:mm"),
                // start: moment(`${p.date} ${p.slots[0]['start-time']}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm') ,
                // end: moment(`${p.date} ${p.slots[0]['end-time']}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
                display: "block",
                borderColor,
                color,
                // start: '2022-06-02 17:30:00',
                // end: '2022-06-03 21:30:00'
              };
            });
            // 23-06-2022 14:50 //

            Object.assign(this.calendarOptions, {
              ...this.calendarOptions,
              events: events,
            });

            console.log("Events", this.calendarOptions.events);
          });
        // .catch((err) => console.log(err))
      } catch (error) {
        console.log("try catch");
        console.log(error);
      }
    },
  },
});
</script>

<style scoped>
</style>