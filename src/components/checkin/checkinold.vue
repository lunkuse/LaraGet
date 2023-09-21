
   <template>
  <!-- BEGIN: Modal Content -->
  <div id="checkinmodal" class="modal" tabindex="-1" aria-hidden="true">
   
    <div
      class="
       
        bg-white
      "
    >
      <qrcodescanner
    :qrbox="250" 
    :fps="10" 
    style="width: 500px;"
    @result="onScan"
  />
   
       <div class="text-center mt-2">
    
    <p class="font-medium leading-none mt-3 text-theme-36"> {{ message }} </p>
      
      </div>
     
<!-- BEGIN: Next Appointments -->
              <div class="col-span-12 lg:col-span-6 mt-8" v-if="nextappointments.length !== 0">
               <div class="intro-y p-2 mt-1 sm:mt-1">
                  <div class="report-timeline mt-5 relative" style="height: 100%;">
                    <div
                    
                      class="intro-x relative flex items-center mb-3"
                      v-for="upcomingappointments in nextappointments"
                      :key="upcomingappointments.id"
                      :class="{ 'mt-5': upcomingappointments.id }"
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
                              >{{ upcomingappointments.treatment_type ? upcomingappointments.treatment_type.title: upcomingappointments.appointment_type.title }}</h5>
                            </div>
                          </div>
                          <div class="text-gray-800 truncate">
                            <span class="float-right">
                              <div
                                class="flex"
                                :class="{
                      'text-theme-12': upcomingappointments.status.status  === 'Waiting',
                      'text-theme-9': upcomingappointments.status.status === 'Confirmed',
                      'text-theme-6': upcomingappointments.status.status === 'Closed',
                       'text-grey-100': upcomingappointments.status.status === 'Pending'
                    }"
                              >
                              {{upcomingappointments.code}}
                              </div>
                            </span>
                            <div
                              class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-600"
                            >
                              <div
                                v-if="upcomingappointments.date.match(/^\d{4}-\d{2}-\d{2}$/) === null"
                              >{{moment(upcomingappointments.date, "DD-MM-YYYY").format("DD-MM-YYYY")}}</div>
                              <div
                                v-else
                              >{{moment(upcomingappointments.date, "YYYY-MM-DD").format("DD-MM-YYYY")}}</div>
                            </div>
                            <p
                              class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-400"
                            >{{upcomingappointments.slots[0]['start-time']}} - {{upcomingappointments.slots[0]['end-time']}}</p>
                          </div>
                        </div>
                        <!-- </div> -->
                      </a>
                    </div>
                  </div></div></div>






        <div class="box px-5 py-2 ml-1 flex-1 zoom-in" style="display:none">
          <div
                      class="intro-x relative flex items-center mb-3"
                      v-for="upcomingappointments in nextappointments"
                      :key="upcomingappointments.id"
                      :class="{ 'mt-5': upcomingappointments.id }"
                    >
                          <div class="flex items-center">
                            <div class="font-medium truncate ...">
                              <h5
                                class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
                              >{{ upcomingappointments.treatment_type ? upcomingappointments.treatment_type.title: upcomingappointments.appointment_type.title }}</h5>
                            </div>
                          </div>
                          <div class="text-gray-800 truncate">
                            <span class="float-right">
                              <div
                                class="flex"
                                :class="{
                      'text-theme-12': upcomingappointments.status.status  === 'Waiting',
                      'text-theme-9': upcomingappointments.status.status === 'Confirmed',
                      'text-theme-6': upcomingappointments.status.status === 'Closed',
                       'text-grey-100': upcomingappointments.status.status === 'Pending'
                    }"
                              >
                                <AlertCircleIcon
                                  v-if="upcomingappointments.status.status === 'Waiting'"
                                  class="w-4 h-4 mr-2"
                                />
                                <ThumbsUpIcon
                                  v-if="upcomingappointments.status.status === 'Confirmed'"
                                  class="w-4 h-4 mr-2"
                                />
                                <CheckSquareIcon
                                  v-if="upcomingappointments.status.status === 'Closed'"
                                  class="w-4 h-4 mr-2"
                                />
                                <CheckSquareIcon
                                  v-if="upcomingappointments.status.status === 'Pending'"
                                  class="w-4 h-4 mr-2"
                                />
                                {{upcomingappointments.status.status}}
                              </div>
                            </span>
                            <div
                              class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-600"
                            >
                              <div
                                v-if="upcomingappointments.date.match(/^\d{4}-\d{2}-\d{2}$/) === null"
                              >{{moment(upcomingappointments.date, "DD-MM-YYYY").format("DD-MM-YYYY")}}</div>
                              <div
                                v-else
                              >{{moment(upcomingappointments.date, "YYYY-MM-DD").format("DD-MM-YYYY")}}</div>
                            </div>
                            <p
                              class="truncate w-36 md:w-56 sm:w-36 text-md text-gray-700 dark:text-gray-400"
                            >{{upcomingappointments.slots[0]['start-time']}} - {{upcomingappointments.slots[0]['end-time']}}</p>
                          </div>
                        </div></div>
      <div class="p-4 border-t mx-8 mt-2">
        <button
          class="
            w-1/2
            block
            mx-auto
            rounded-full
            hover:shadow-lg
            font-semibold
            text-white
            px-6
            py-2
            bg-theme-36
            btn
          "
          data-dismiss="modal"
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  <!-- END: Modal Content -->
</template>

<script>
import { toRaw } from 'vue'
import moment from 'moment'
import axios from 'axios'
import qrcodescanner from '@/components/scanner/qrcode-scanner.vue'

export default {
  name: 'CheckIn',
  props: ['this.id'],
   components: {qrcodescanner},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    currentUser() {
      
      return toRaw(this.$store.state.auth.user)
    }
  },
   created() {
    // this.getAppointments()
  },
  
  mounted() {
    this.getnextAppointment()
  },

  data() {
    return {
      nextappointments: [],
      message: '',
      userID: ''
    }},
    methods: {
      moment,
       onScan (decodedText, decodedResult) {
      // handle the message here :)
    },
        // appointments
    getnextAppointment() {
      this.loading = true
      const token = localStorage.getItem('token')
      this.userID = localStorage.getItem('userID')
      console.log("this.currentUser.id", this.userID)
const data = {
  patientId: this.userID,
}
      try {
        axios
          .post(
            '/appointments/checkin',
            data,
            {
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
              }
            }
          )
          .then(res => {
             if (res.data.status === false) {
              this.message = res.data.error
             }
            else{console.log('my checkin status is true')}
            
            const allappointments = res.data.payload
            const array = allappointments.sort((a, b) => a.id - b.id)
            const arraydesc = allappointments.reverse()
            console.log('sorted array', arraydesc)
            this.nextappointments = array
            console.log('nextappointments', this.nextappointments)
            
            // 23-06-2022 14:50 //
      })
          
        // .catch((err) => console.log(err))
      } catch (error) {
        console.log('try catch')
        console.log(error)
      }
    }
    }
}
</script>