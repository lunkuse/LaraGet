
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

          <div class="modal-body px-10">
            <div class="intro-y flex items-center mt-2">
              <h2 class="text-lg font-medium mr-auto">
                {{ $t("translation.scheduling_assistant_text") }}
              </h2>
            </div>
            <div class="grid grid-cols-12 gap-6 mt-1 px-5 box">
              <div class="intro-y col-span-12 lg:col-span-12">
                <!-- BEGIN: Form Layout -->
                <form
                  class="validate-form"
                  @submit.prevent="handleSubmit"
                  autocomplete="off"
                >
                  <!-- appointment table -->
                  <div class="grid grid-cols-12">
                    <div class="col-span-6 gap-6">
                      <!-- appointment_type -->
                      <div class="mt-2">
                        <label
                          for="update-profile-form-12"
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          {{ $t("translation.select_appointment_type_text") }}
                          <span class="text-theme-6">*</span>
                        </label>

                        <TomSelect
                          v-model="selected_appointment_type"
                          class="w-full"
                          @change="onchange"
                          id="appointment_type_select"
                        >
                          <option value>
                            {{ $t("translation.select_appointment_type_text") }}
                          </option>
                          <option
                            v-for="(appointment_type, name) in appointment_type"
                            :key="name"
                            :value="appointment_type.id"
                          >
                            {{ appointment_type.title }}
                          </option>
                        </TomSelect>
                        <template
                          v-if="validate.selected_appointment_type.$error"
                        >
                          <div
                            v-for="(error, index) in validate
                              .selected_appointment_type.$errors"
                            :key="index"
                            class="text-theme-6 mt-2"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </div>
                    </div>
                    <div class="col-span-6 gap-6">
                      <!-- date -->
                      <div class="mt-2 ml-2">
                        <label
                          for="update-profile-form-12"
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          {{ $t("translation.select_date_text") }}
                          <span class="text-theme-6">*</span>
                        </label>

                        <Litepicker
                          id="date_input"
                          
                          v-model="appointment_date"
                          :placeholder="`${$t('translation.appointment_date_text')}`"
                          disabled
                          name="appointment_date"
                          :options="{
                            lang: lang,
                            autoApply: true,
                            showWeekNumbers: false,
                            minDate: moment(),
                            maxDate: endDate,
                            disallowLockDaysInRange: true,
                            scrollToDate: true,
                            highlightedDays: highlightedRange,
                            lockDays: dateRange,
                            lockDaysFilter: (date1, date2, pickedDates) => {
                              return dateRange.includes(
                                date1.format('YYYY-MM-DD')
                              );
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
                          class="w-full intro-x form-control bg-gray-100 px-4 block border-gray-200 focus:border-gray-500"
                          style="box-shadow: 0px 3px 5px #00000007"
                        />

                        <template v-if="validate.appointment_date.$error">
                          <div
                            v-for="(error, index) in validate.appointment_date
                              .$errors"
                            :key="index"
                            class="text-theme-6 mt-2"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>


                  <div class="intro-y col-span-12  mt-3">
                    <label
                          for="update-profile-form-12"
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          {{ $t("translation.select_period_text") }}
                          <span class="text-theme-6">*</span>
                        </label>
                  <TomSelect
                    class="w-auto col-span-1 focus:border-theme-36"
                    id="period"
                    @change="periodchange()"
                    :placeholder="`${$t('translation.select_period_text')}`"
                    v-model="period"
                  >
                  <option>
                    </option>
                    <option value="morning">
                      {{ $t("translation.morning_text") }}
                    </option>
                    <option value="noon">
                      {{ $t("translation.noon_text") }}
                    </option>
                    <option value="evening">
                      {{ $t("translation.evening_text") }}
                    </option>
                  </TomSelect></div>



                  <div class="grid grid-cols-12">
                    <div class="col-span-12">
                      <!-- time -->
                      <div class="mt-3 col-span-6">
                        <label
                          for="update-profile-form-12"
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          {{ $t("translation.select_time_text") }}
                          <span class="text-theme-6">*</span>
                        </label>
                        <span
                          v-if="loadingSlotsdash"
                          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
                        >
                          <LoadingIcon icon="oval" class="w-10 h-10" />

                          <span>{{ $t("translation.loading_text") }}</span>
                          <!-- <span>We are loading your Appointments...</span> -->
                        </span>
                        <!-- <SlotsTable  :appointmentTypeIdSlots="appointmentTypeIdSlots" 
      :dateSlots="dateSlots"/> -->
                        <!-- <span v-if="!loadingSlotsdash && timeSlotsArray?.length==0"> No free slots, select another day</span>         -->
                      
                        <div
                          class="w-full overflow-y-auto border-1 border-gray-200 rounded-sm mb-14 scrollContent"
                        >
                          <p
                            v-if="!loadingSlotsdash"
                            class="form-control px-1 border text-slate-600 dark:border-darkmode-100/40 dark:text-slate-300 mr-1 font-medium"
                          >
                            {{ newStartTime }}-{{ newEndTime }}
                          </p>
                          <a
                            href="#"
                            class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                            
                          >
                           

                            <!-- v-if="!loading && timeSlotsArray.length === 0" -->
                            <div
                              class="flex flex-col items-center justify-center gap-3"
                              v-if="!loading && timeSlotsArray?.length === 0"
                            >
                              <img
                                src="../../assets/availableSlots.svg"
                                class="h-24 mt-2"
                                alt="slots loading"
                              />
                              <div class="text-black flex flex-col">
                                {{ $t("translation.noSlotsAppearance") }}
                              </div>
                            </div>
                              
                            <div v-if="timeSlotsArray?.length > 0">
                              <!-- slots header -->
                              <div class="grid grid-cols-4 font-semibold pt-4">
                                <div
                                  class="grid grid-cols-2 col-span-2 items-center text-base"
                                >
                                  <div class="border-r p-2 border-gray-400">
                                    {{ $t("translation.start_time_text") }}
                                  </div>
                                  <div class="border-r border-gray-400 p-2">
                                    {{ $t("translation.end_time_text") }}
                                  </div>
                                </div>
                                <div class="p-2 text-base capitalize">
                                  {{ $t("translation.interval_text") }}
                                </div>
                              </div>

                              <!-- slots data -->
                              <div class="slottable">
                                <div
                                  v-for="(slot, index) of timeSlotsArray"
                                  :key="index"
                                  @click="chooseSlot(slot)"
                                  :class="
                                    selectedSlot === slot
                                      ? selectedSlot === slot &&
                                        '!text-theme-1 '
                                      : ''
                                  "
                                >
                                  <div
                                    v-if="
                                      slot.length > 0 ||
                                      typeof slot === 'object'
                                    "
                                    class="grid grid-cols-4 border-t border-gray-400 group h-1/2 border-b bg-red"
                                  >
                                    <div
                                      class="border-r border-gray-400 col-span-2 focus-within:text-theme-1 h-full overflow-y-auto scrollContent"
                                    >
                                      <div
                                        v-if="
                                          typeof slot === 'object' &&
                                          !Array.isArray(slot)
                                        "
                                        class="grid grid-cols-2 n border-gray-400 hover:text-purple-400 hover:shadow-md cursor-pointer"
                                     
                                        >
                                        <div
                                          class="border-r border-gray-400 p-2"
                                        >
                                          <p
                                            class="font-normal text-gray-700 dark:text-gray-400"
                                            :class="
                                    selectedSlot === slot
                                      ? selectedSlot === slot &&
                                        '!text-theme-1 '
                                      : ''
                                  "
                                          >
                                            {{ slot.start_time }}
                                          </p>
                                        </div>
                                        <div class="p-2">
                                          <p
                                            class="font-normal text-gray-700 dark:text-gray-400"
                                            :class="
                                    selectedSlot === slot
                                      ? selectedSlot === slot &&
                                        '!text-theme-1 '
                                      : ''
                                  "
                                          >
                                            {{ slot.end_time }}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="p-2 text-base">
                                      <p
                                        class="font-normal text-gray-700 dark:text-gray-400"
                                        :class="
                                    selectedSlot === slot
                                      ? selectedSlot === slot &&
                                        '!text-theme-1 '
                                      : ''
                                  "
                                      >
                                        {{
                                          getTimeDifference(
                                            slot.start_time,
                                            slot.end_time
                                          )
                                        }}
                                        {{ $t("translation.minutes_text") }}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <!-- comment -->

                      <div class="mt-3 col-span-6">
                        <label
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          {{ $t("translation.comment_text") }}</label
                        >
                        <!-- <ClassicEditor v-model="comment" /> -->
                        <textarea
                          id="comment-text-area"
                          v-model="comment"
                          class="login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
                          name="comment"
                          :placeholder="`${$t(
                            'translation.enter_comment_text'
                          )}`"
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
                  <div
                    id="success-notification-content"
                    class="toastify-content hidden flex"
                  >
                    <CheckCircleIcon class="text-theme-9" />
                    <div class="ml-4 mr-4">
                      <!-- <div class="font-medium">Appointment has been Successfully created</div> -->
                      <div class="font-medium">{{ successMessage }}</div>
                    </div>
                  </div>
                  <!-- END: Success Notification Content -->

                  <!-- BEGIN: Failed Notification Content -->
                  <div
                    id="failed-notification-content"
                    class="toastify-content hidden flex"
                  >
                    <XCircleIcon class="text-theme-6" />
                    <div class="ml-4 mr-4">
                      <div class="font-medium">Appointment Creation Failed</div>
                      <div class="text-gray-600 mt-1">
                        Review your form and fill all fields
                      </div>
                    </div>
                  </div>

                  <div
                    class="container mx-auto justify-center mt-4"
                    style="
                      display: flex;
                      align-items: center;
                      text-align: center;
                    "
                  >
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                    >
                      <button
                        style="background-color: #ff2400"
                        type="reset"
                        data-dismiss="modal"
                        class="btn closeBTN btn-danger w-40 mr-auto text-gray-900 bg-theme-43"
                      >
                        <p class="text-white">
                          {{ $t("translation.cancel_text") }}
                        </p>
                      </button>

                      <button
                        type="reset"
                        class="btn clearBTN btn-warning w-40 mr-auto text-gray-900"
                        style="display: none"
                      >
                        {{ $t("translation.clear_text") }}
                      </button>
                      <button
                        type="submit"
                        class="btn bg-theme-32 w-40 mr-auto text-white"
                      >
                        <LoadingIcon
                          v-if="loading"
                          icon="spinning-circles"
                          color="white"
                          class="w-4 h-4 ml-2"
                        />
                        <p data-dismiss="modal" class="text-white" v-else>
                          <span>{{ $t("translation.submit_text") }}</span>
                        </p>
                      </button>
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
import { defineComponent, toRaw, reactive, toRefs, inject, ref } from "vue";
import Toastify from "toastify-js";
import moment from "moment";

// Validations
import { required, maxValue, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import AppointmentsService from "../../service/appointments-service";
import { useI18n } from "vue-i18n";
import $ from "cash-dom";
import SlotsTable from "./slotsTable.vue";
export default defineComponent({
  components: {
    SlotsTable,
  },

  data() {
    // Basic non sticky notification
    const basicNonStickyNotificationToggle = () => {
      Toastify({
        node: $("#basic-non-sticky-notification-content")
          .clone()
          .removeClass("hidden")[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    };

    const formData = reactive({
      // loan_product_id: '',
      selected_appointment_type: "",
      // monthly_income: '',
      appointment_date: "",
      comment: "",
      startTime: "",
    });
    const rules = {
      selected_appointment_type: {
        required,
      },
      appointment_date: {
        required,
      },
      comment: {},
      startTime: { required },
    };
    const validate = useVuelidate(rules, toRefs(formData));

    const handleSubmit = () => {
      this.formData.selected_appointment_type = this.selected_appointment_type;
      this.formData.appointment_date = moment(this.appointment_date).format(
        "YYYY-MM-DD"
      );
      this.formData.startTime = this.newStartTime;
      validate.value.$touch();
      if (validate.value.$invalid) {
        Toastify({
          node: $("#failed-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      } else {
        // const token = localStorage.getItem('token')
        this.loading = true;

        // We will handle form submission here
        const data = {
          statusId: 2,
          sourceId: 2,
          periodId: 3,
          appointmentTypeId: this.formData.selected_appointment_type,
          doctors: [],
          date: this.formData.appointment_date,
          frequencyId: 1,
          interval: this.timeInterval,
          comments: this.comment,
          facility_id: 1,
          // data.append('slots', this.selectedSlot)
          slots: {
            "start-time": this.formData.startTime,

            "end-time": this.newEndTime,
          },
        };
        try {
          AppointmentsService.createAppointments(data)
            .then((response) => {
              const notification = document.querySelector(
                ".toastify-content .notification-message"
              );
              if (response.status == true) {
                this.loading = false;
                this.successMessage = response.message;

                Toastify({
                  node: $("#success-notification-content")
                    .clone()
                    .removeClass("hidden")[0],
                  duration: 3000,
                  newWindow: true,
                  close: true,
                  gravity: "top",
                  position: "right",
                  stopOnFocus: true,
                }).showToast();
              // this.clearVariables()
                // router.push('/dashboard/viewappointments')
                // document.querySelector(".closeBTN").click();
                
               
                document.querySelector(".closeBTN").click();
                  this.$router.push({
                  name: 'side-menu-view-appointments'
                })
      //           this.$nextTick(() => {
      //             router.push({
      //               name: "side-menu-view-appointments",
      //             });
      // });
                
              } else {
                this.loading = false;
                notification.textContent = "Appointment Creation Failed";
              }
              this.basicNonStickyNotificationToggle();
              console.log("response", response);
              // this.$router.push({
              //   name: 'side-menu-view-appointments'
              // })
            })
            .catch((error) => {
              console.log("Error", error);
            });
        } catch (err) {
          console.log("error: ", err);
        }
      }
    };

    return {
      loadingSlotsdash: false,
      successMessage: this.t(
        "translation.appointment_created_successfully_text"
      ),
      // successMessage:"Appointment Created Successfully",
      selected_appointment_type: "",
      appointment_type: "",
      appointmentData: "",
      startDate: moment(),
      endDate: moment().add(10, "days"),
      startTime: "",
      endTime: "",
      dateRange: "",
      comment: "",
      appointment_date: "",
      timeSlotsArray: "",
      appointmentTypeIdSlots: "",
      dateSlots: "",
      facilityIdSlots: "",
      morningTimeSlotsArray: "",
    
      middayTimeSlotsArray: "",
      eveningTimeSlotsArray: "",
      timeInterval: "",
      selectedSlot: "",
      newStartTime: "",
      newEndTime: "",
      highlightedRange: "",

      handleSubmit,
      formData,
      validate,
      loading: false,
      basicNonStickyNotificationToggle,
      search_term: "",
      sortBy: 1,

      pageSize: 20,
      currentPage: 1,
      printLoading: true,
      selectedButton: [],
      period:'',
      allTimeSlotsArray: "",
    };
  },
  mounted() {
    this.getAppointmentTypes();
  },
  created() {
    this.getAppointmentTypes();
  },
  props: ["endDate"],

  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user);
    },
    morningSlots() {
      console.log("kkkkk");

      if (selected_appointment_type !== null) {
        console.log("this.timeSlotsArray", this.timeSlotsArray);
        return this.timeSlotsArray.filter((slot) => {
          // Filter slots that fall within the morning time range (e.g., 6 AM - 11:59 AM)
          const startTime = Number(slot.start_time.split(":")[0]);
          return startTime >= 6 && startTime <= 11;
        });
      }
    },
    afternoonSlots() {
      return this.timeSlotsArray.filter((slot) => {
        // Filter slots that fall within the afternoon time range (e.g., 12 PM - 5:59 PM)
        const startTime = Number(slot.start_time.split(":")[0]);
        return startTime >= 12 && startTime <= 17;
      });
    },
    eveningSlots() {
      return this.timeSlotsArray.filter((slot) => {
        // Filter slots that fall within the evening time range (e.g., 6 PM - 11:59 PM)
        const startTime = Number(slot.start_time.split(":")[0]);
        return startTime >= 18 && startTime <= 23;
      });
    },
  },
  methods: {
    moment,
    periodchange(){
      console.log("new period", this.period)
      if(this.period == "morning"){console.log("it is morning")
      if(this.allTimeSlotsArray?.length > 0){
      this.timeSlotsArray = this.allTimeSlotsArray?.filter(
                (slot) => {
                  // Filter slots that fall within the morning time range (e.g., 6 AM - 11:59 AM)
                  const startTime = Number(slot.start_time.split(":")[0]);
                  return startTime >= 6 && startTime <= 11;
                }
              );
              console.log("morning this.timeSlotsArray", this.timeSlotsArray)
      }
    }
     else if(this.period == "noon"){console.log("it is noon")
     if(this.allTimeSlotsArray?.length > 0){
     this.timeSlotsArray = this.allTimeSlotsArray?.filter((slot) => {
                // Filter slots that fall within the afternoon time range (e.g., 12 PM - 5:59 PM)
                const startTime = Number(slot.start_time.split(":")[0]);
                return startTime >= 12 && startTime <= 17;
              });
            }
    
    
    }
     else if(this.period == "evening"){console.log("it is noon")
          if(this.allTimeSlotsArray?.length > 0){
     this.timeSlotsArray = this.allTimeSlotsArray?.filter(
                (slot) => {
                  // Filter slots that fall within the evening time range (e.g., 6 PM - 11:59 PM)
                  const startTime = Number(slot.start_time.split(":")[0]);
                  return startTime >= 18 && startTime <= 23;
                }
              );
    
            }
    }
     else{this.timeSlotsArray = this.allTimeSlotsArray }
    },
    clearVariables(){
      console.log('cleared variables')
      this.timeSlotsArray=[]
      this.allTimeSlotsArray=[]
      this.appointmentTypeId = ""
      this.date=""
    },
    getSlots() {
      if (!!this.selected_appointment_type) {
        this.loadingSlotsdash = true;
        const facilityId = this.currentUser.facility_id;
        const token = localStorage.getItem("token");
        const data = {
          appointmentTypeId: this.selected_appointment_type,
          date: moment(this.appointment_date).format("DD-MM-YYYY"),
          facilityId: facilityId,
        };
        const url = "patients/appointments/free-slots";
        try {
          AppointmentsService.getFreeSlots(url, data)
            .then((response) => {
              this.loadingSlotsdash = false;
              console.log("new response checkkkk slots", response?.data?.error);
              this.timeSlotsArray = response.data;
              this.allTimeSlotsArray = response.data;
              this.periodchange()
              this.morningTimeSlotsArray = this.timeSlotsArray.filter(
                (slot) => {
                  // Filter slots that fall within the morning time range (e.g., 6 AM - 11:59 AM)
                  const startTime = Number(slot.start_time.split(":")[0]);
                  return startTime >= 6 && startTime <= 11;
                }
              );
              

              this.middayTimeSlotsArray = this.timeSlotsArray.filter((slot) => {
                // Filter slots that fall within the afternoon time range (e.g., 12 PM - 5:59 PM)
                const startTime = Number(slot.start_time.split(":")[0]);
                return startTime >= 12 && startTime <= 17;
              });

              
              this.eveningTimeSlotsArray = this.timeSlotsArray.filter(
                (slot) => {
                  // Filter slots that fall within the evening time range (e.g., 6 PM - 11:59 PM)
                  const startTime = Number(slot.start_time.split(":")[0]);
                  return startTime >= 18 && startTime <= 23;
                }
              );
             
            })
            .catch((error) => {
              this.loadingSlots = false;
              console.log("Error", error);
            });
        } catch (err) {
          console.log("error: ", err);
        }
      }
    },
    onchange(id) {
      console.log("changed", this.startDate);
      this.appointmentData = this.appointment_type.filter(
        (selectedType) => selectedType.id == this.selected_appointment_type
      )[0];
      Object.assign(
        this.appointmentData,
        this.appointment_type.filter(
          (selectedType) => selectedType.id == this.selected_appointment_type
        )[0]
      );
      Object.assign(this.timeInterval, this.appointmentData.agenda_interval);
      Object.assign(
        this.startDate,
        moment(this.appointmentData.start_date, "DD-MM-YYYY")
      );
      Object.assign(
        this.endDate,
        moment(this.appointmentData.end_date, "DD-MM-YYYY")
      );
      document.getElementById("date_input").disabled = false;
      // this.startDate = moment(this.appointmentData.start_date).format('MMMM d, YYYY')
      // this.endDate = moment(this.appointmentData.end_date).format('MMMM d, YYYY')
      this.startTime = this.appointmentData.start_time;
      this.endTime = this.appointmentData.end_time;
      this.timeInterval = this.appointmentData.agenda_interval;
      // this.appointment_date = moment(
      //   this.appointmentData.start_date,
      //   'DD-MM-YYYY'
      // ).format('DD MMM, YYYY')

      // Returns an array of dates between the two dates
      function getDates(startDate, endDate) {
        const dates = [];
        // console.log('startDate inside', startDate)
        let currentDate = startDate;
        const addDays = function (days) {
          const date = new Date(this.valueOf());
          //  const formatedDate = moment(date).format('DD-MM-YYYY')
          date.setDate(date.getDate() + days);
          // date.setDate(date.getDate() + days)
          // const formatedDate = moment(date).format('DD-MM-YYYY')
          return date;
        };
        while (currentDate <= endDate) {
          dates.push(moment(currentDate, "DD-MM-YYYY").format("YYYY-MM-DD"));
          currentDate = addDays.call(currentDate, 1);
        }
        // this.dateRange = dates
        return dates;
      }
      const date1 = moment(this.startDate, "DD-MM-YYYY");
      const date2 = moment(this.endDate, "DD-MM-YYYY");
      // Usage
      // this.dateRange console.log('middle', startDate,endDate)
      // console.log('datebetween start,end', date1, date2)
      const d = new Date();
      const yesterday = d.setDate(d.getDate() - 1);
      const dates = getDates(this.startDate, yesterday);
      dates.forEach(function (date) {
        // console.log('datebetween', date)
      });
      //
      this.dateRange = dates;
      const str = dates.toString();
      const highlightedRange1 = JSON.stringify(dates).replaceAll(`"`, `'`);
      this.highlightedRange = dates;
      //  const highlightedRange3 = JSON.stringify(dates).replaceAll(`"`, `'`);
      const highlightedRange3 = dates.toString().replaceAll(`"`, `'`);
      console.log("this.highlightedRange ", this.highlightedRange);

      this.highlightedRange = highlightedRange3;

      this.getSlots();

      // time slots
      const getTimeStops = (start, end) => {
        // var startTime = moment(new Date(), 'HH:mm')
        var startTime = moment(start, "HH:mm");
        var endTime = moment(end, "HH:mm");
        var interval = parseInt(this.timeInterval);
        // var interval = parseInt(10);
        if (endTime.isBefore(startTime)) {
          endTime.add(1, "day");
        }

        var timeStops = [];

        // while (startTime <= endTime) {
        //   timeStops.push(new moment(startTime).format('HH:mm'))
        //   startTime.add(interval, 'minutes')
        // }
        for (let i = 0; ; i++) {
          if (startTime.diff(endTime) >= 0) {
            break;
          }
          let prevTime = startTime;
          let newTime = moment(startTime, "HH:mm").add(interval, "minutes");
          timeStops.push({
            startTime: prevTime.format("HH:mm"),
            endTime: newTime.format("HH:mm"),
          });
          console.log({
            "start-time": prevTime.format("HH:mm"),
            endTime: newTime.format("HH:mm"),
          });
          startTime = newTime;
        }
        return timeStops;
      };

      // var timeStops = getTimeStops('11:00', '02:00')
      // console.log('timeStops 1', timeStops);
      // timeStops = getTimeStops('11:00', '23:59')
      this.startTime, this.endTime;
      // this.timeSlotsArray = getTimeStops(this.startTime, this.endTime)
      // console.log(
      //   'time start, end, interval',
      //   this.startTime,
      //   this.endTime,
      //   this.timeInterval
      // )

      (this.appointmentTypeIdSlots = this.selected_appointment_type),
        (this.dateSlots = moment(this.appointment_date).format("DD-MM-YYYY")),
        (this.facilityIdSlots = this.facilityId);

      console.log("timeslots", this.timeSlotsArray);
    },
    // selected slot
    chooseSlot(slot) {
      console.log("Slot", slot);

      Object.assign(this.selectedSlot, slot);
      this.selectedSlot = slot;
      this.newStartTime = slot.start_time;
      this.newEndTime = slot.end_time;
      // this.newStartTime = slot.startTime
      // this.newEndTime = slot.endTime
      console.log(
        "this.newStartTime, this.newEndTime",
        this.newStartTime,
        this.newEndTime
      );
    },

    // Getting All types
    getAppointmentTypes() {
      this.loading = false;
      const url = "patients/appointments/types";
      const data = {};
      try {
        AppointmentsService.getAppointmentTypes(url, data)
          .then((res) => {
            console.log("types res", res);
            this.appointment_type = res.data;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log("error: ", err);
      }
    },
  },
  watch: {
    appointment_date: {
      handler(newDate, oldDate) {
        console.log("new date", newDate);
        this.getSlots();
      },
      deep: true,
    },

    successMessage(newmessage, oldmessage) {
      console.log("watched successMessage", newmessage);
      this.$nextTick(() => {
        this.successMessage = newmessage;
      });
    },
    successMessage(newtimeSlotsArray, oldtimeSlotsArray) {
      console.log("watched timeSlotsArray", newtimeSlotsArray);
      this.$nextTick(() => {
        this.timeSlotsArray = newtimeSlotsArray;
      });
    },
    
  },
  setup() {
    const { t } = useI18n({});
    const docSlotsMessage = t("schedulingAssistant.slotsWillAppearHere");
    const getTimeDifference = (start_time, end_time) => {
      // Add a common date to the time strings
      const startTime = new Date(`1970-01-01T${start_time}:00`);
      const endTime = new Date(`1970-01-01T${end_time}:00`);

      // Calculate the time difference in milliseconds
      const timeDifference = endTime.getTime() - startTime.getTime();

      // Convert the time difference from milliseconds to minutes
      const minutesDifference = timeDifference / (1000 * 60);

      return minutesDifference;
    };
    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "nl";
    const lang = ref(defaultLang);
    return {
      t,
      getTimeDifference,
      lang
    };
  },
});
</script>
<style lang="scss">
//
label:after {
  content: "+";

  position: absolute;
  right: 1em;
  color: #fff;
}

input:checked + label:after {
  content: "-";
  line-height: 0.8em;
}

.accordion__content {
  max-height: 0em;
  transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}
input[name="panel"]:checked ~ .accordion__content {
  /* Get this as close to what height you expect */

  max-height: 20em;
  overflow: auto;
}

.slottable {
  /* Get this as close to what height you expect */

  max-height: 20em;
  overflow: auto;
}
</style>

