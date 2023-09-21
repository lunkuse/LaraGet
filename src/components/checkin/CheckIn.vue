
   <template>
  <!-- BEGIN: Modal Content -->
  <div id="checkinmodal" class="modal" tabindex="-1" aria-hidden="true">
    <div
      class="
        max-w-2xl
        mx-4
        sm:max-w-sm
        md:max-w-sm
        lg:max-w-sm
        xl:max-w-sm
        sm:mx-auto
        md:mx-auto
        lg:mx-auto
        xl:mx-auto
        mt-16
        bg-white
        shadow-xl
        rounded-lg
        text-gray-900
      "
    >
      <div class="rounded-t-lg h-1 overflow-hidden">

      </div>

       <div class="text-center mt-2">

    <p  class="font-medium leading-none mt-3 " v-if="upcheckinappointments.length === 0"> {{ message }} </p>
     

      </div>

<!-- BEGIN: Next Appointments -->
              <div class="col-span-12 lg:col-span-6 mt-8" v-if="upcheckinappointments.length !== 0">
               <div class="intro-y p-2 mt-1 sm:mt-1">
                  <div class=" mt-5 relative" style="height: 100%;"
                   v-for="upcomingappointments in upcheckinappointments"
                      :key="upcomingappointments.id"
                      :class="{ 'mt-5': upcomingappointments.id }">
                      <div class="text-center mt-2">
                       
                        <p  class="font-medium leading-none mt-3 ">Your code is</p>
                    <h3 class="text-2xl font-medium leading-none mt-3 font-medium leading-none mt-3 text-theme-36"> {{ upcomingappointments.appointment_code }}
    </h3> 
      <!-- YYYY-MM-DD HH:mm:ss -->
        <!-- {{moment(upcomingappointments.date, "YYYY-MM-DD").format("YYYY-MM-DD")}} -->
       
    <p  class="font-medium leading-none mt-3 ">Wait until when you are called</p></div>
    <div class="p-5">
     <Countdown 
        countdownSize='1.5rem'
        labelSize='0.8rem'
        mainColor='white'
        :deadlineDate= appointmentTimer(upcomingappointments.id) 
      
        /></div>
        <!-- :deadlineDate="appointmentTimer(notification.id)" -->
                    <div

                      class="intro-x relative flex items-center mb-3" >
                    
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
                        </div>
                        <!-- </div> -->
                      </a>
                    </div>
                  </div></div></div>






        <div class="box px-5 py-2 ml-1 flex-1 zoom-in" style="display:none">
          <div
                      class="intro-x relative flex items-center mb-3"
                      v-for="upcomingappointments in upcheckinappointments"
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
import {Countdown} from 'vue3-flip-countdown'
export default {
  
  name: 'CheckIn',
  props: ['this.id'],
  components: {Countdown},
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
    this.getUpcomingAppointmenttop()
  },

  data() {
    return {
      nextappointments: [],
      upcheckinappointments:[],
      message: '',
      userID: '',
      tomorrow: moment().add(1,'days')
    }},
    methods: {
      moment,
      appointmentTimer(id){
        console.log('timer id', id)
         const tommorrow = moment().add(1,'days')

         const date = this.upcheckinappointments?.filter((element) =>
             (element.id === id))[0]
             const mydate =   date.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                    ? moment(
                        `${date.date} ${date.slots[0]['start-time']}`,
                        '"DD-MM-YYYY" HH:mm'
                      ).format('YYYY-MM-DD HH:mm')
                    : moment(
                        `${date.date} ${date.slots[0]['start-time']}`,
                        'YYYY-MM-DD HH:mm'
                      ).format('YYYY-MM-DD HH:mm')

             console.log('timer date', mydate)

//          const minusPending = upcheckinappointments.filter((element) =>
//              (element.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
//                   ? moment(element.date, "DD-MM-YYYY").isSame(new Date(), 'day') : moment(element.date, "YYYY-MM-DD").isSameOrAfter(new Date(), 'day')
// ))
         return mydate 
      },
    //   loanStatusClassunread(status) {
    //   const currentStatus = 'Unread'
    //   return (currentStatus === status) ? 'text-black font-bold  bg-gray-200 border-4 bg-gray-200/100 dark:text-white ' : ''
    // },

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
            'patients/appointments/checkin',
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
            
            // const allappointments = res.data.payload
            // const array = allappointments.sort((a, b) => a.id - b.id)
            // const arraydesc = allappointments.reverse()
            // console.log('sorted array', arraydesc)
            this.nextappointments = res.data.payload
            console.log('nextappointments', this.nextappointments)
})
            // 23-06-2022 14:50 //


        // .catch((err) => console.log(err))
      } catch (error) {
        console.log('try catch')
        console.log(error)
      }
    },

        getUpcomingAppointmenttop() {
      this.loading = true
      const token = localStorage.getItem('token')
      const startTime = moment(new Date(), "HH:mm");

      try {
        axios
          .post(
            'patients/appointments/all',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + token,
                // 'Content-Type': 'application/json'
              }
            }
          )
          .then(res => {
            const allappointments = res.data.payload

// element.slots[0]['start-time'] > moment().format("HH:mm") 

              const minusPending = allappointments?.filter((element) =>
             (element.date.match(/^\d{4}-\d{2}-\d{2}$/) === null
                  ? moment(element.date, "DD-MM-YYYY").isSame(new Date(), 'day') : moment(element.date, "YYYY-MM-DD").isSameOrAfter(new Date(), 'day')
))
                  
// console.log('time now',minusPending.slots[0]['start-time'])
            // const minusPending = allappointments.filter((element) =>
            //  (element.status.status !== 'Pending' && element.status.status !== 'Closed' ))
            const array = minusPending.sort((a, b) => a.id - b.id)
            const arraydesc = minusPending.reverse()
            console.log('checkin sorted array', arraydesc)
            const filtered = minusPending?.filter((element) =>
             ( (parseInt((
              moment.duration(moment(element.slots[0]['end-time'], "HH:mm")
.diff(startTime)).asMinutes() ) % 60) > 0)   ))
           
           const filtered2 = filtered?.filter((element) =>
             ( (parseInt((
              moment.duration(moment(element.slots[0]['end-time'], "HH:mm")
.diff(startTime)).asMinutes() ) % 60) < 30)   ))
const filteredlast = filtered?.filter((element) =>
             ( (parseInt((
              moment.duration(moment(element.slots[0]['end-time'], "HH:mm")
.diff(startTime)).asHours() ) ) <=0)   ))
            this.upcheckinappointments = filteredlast
  // this.upcheckinappointments = minusPending





            console.log('extract time ', moment(new Date()).format("hh:mm")) 
            const startTime = moment(new Date(), "YYYY-MM-DD HH:mm");
const endTime = moment("2022-07-15 17:30", "YYYY-MM-DD HH:mm");
const duration = moment.duration(endTime.diff(startTime));
const hours = parseInt(duration.asHours());
const minutes = parseInt(duration.asMinutes()) % 60;



console.log('difference',hours, minutes, duration.asDays());



const diffInSeconds = Math.abs(moment("2022-07-11 17:30", "YYYY-MM-DD HH:mm") - moment(new Date(), "YYYY-MM-DD HH:mm")) / 1000;
  const days = Math.floor(diffInSeconds / 60 / 60 / 24);
  const hours1 = Math.floor(diffInSeconds / 60 / 60 % 24);
  const minutes1 = Math.floor(diffInSeconds / 60 % 60);
  const seconds = Math.floor(diffInSeconds % 60);
  const milliseconds =
        Math.round((diffInSeconds - Math.floor( diffInSeconds)) * 1000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
const datetoday = new Date()
  console.log('get day 1', (parseInt(moment(
                        '2022-07-14 16:00'
                      ).format('M'))));

                      console.log('get day ', moment(datetoday).format('M'));


console.log('get day TODAY', (parseInt(moment(
                        '2022-07-14 16:00'
                      ).format('M')) - (parseInt(moment(datetoday).format('M')))));
console.log('difference hours ',hours1 );
console.log('difference minutes ',minutes1 );
console.log('difference seconds ',seconds );
console.log('difference weeks  ',weeks  );





           
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
<style scoped lang="scss">

.flip-clock {
  text-align: center;
  perspective: 600px;
  margin: 0 auto;

  *,
  *:before,
  *:after { box-sizing: border-box; }
}

.flip-clock__piece {
  display: inline-block;
  margin: 0 0.2vw;
  
  @media (min-width: 1000px) {
    margin: 0 5px;
  }
}

.flip-clock__slot {
  font-size: 1rem;
  line-height: 1.5;
  display: block;
/*
  //position: relative;
  //top: -1.6em;
  z-index: 10;
  //color: #FFF;
*/
}

// @halfHeight: 0.72em;
// @borderRadius: 0.15em;

.flip-card {
  display: block;
  position: relative;
  padding-bottom: 0.72em;
  font-size: 2.25rem;
  line-height: 0.95;
}

@media (min-width: 1000px) {
  .flip-clock__slot { font-size: 1.2rem; }
  .flip-card { font-size: 3rem; }
}

.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
  display: block;
  height: 0.72em;
  color: #ccc;
  background: #222;
  padding: 0.23em 0.25em 0.4em;
  border-radius: 0.15em 0.15em 0 0;
  transform-style: preserve-3d;
  width: 1.8em;
}

.flip-card__bottom,
.flip-card__back-bottom {
  color: #FFF;
  position: absolute;
  top: 50%;
  left: 0;
  border-top: solid 1px #000;
  background: #393939;
  border-radius: 0 0 0.15em 0.15em;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
}

.flip-card__back-bottom {
  z-index: 1;
}

.flip-card__bottom::after,
.flip-card__back-bottom::after {
  display: block;
  margin-top: -0.72em;
}

.flip-card__back::before,
.flip-card__bottom::after,
.flip-card__back-bottom::after {
  content: attr(data-value);
}

.flip-card__back {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0%;
  pointer-events: none;
}

.flip-card__back::before {
  position: relative;
  overflow: hidden;
  z-index: -1;
}

.flip .flip-card__back::before {
  z-index: 1;
  animation: flipTop 0.3s cubic-bezier(.37,.01,.94,.35);
  animation-fill-mode: both;
  transform-origin: center bottom;
}

.flip .flip-card__bottom {
  transform-origin: center top;
  animation-fill-mode: both;
  animation: flipBottom 0.6s cubic-bezier(.15,.45,.28,1);// 0.3s;
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    z-index: 2;
  }
  0%, 99% {
    opacity: 1;
  }
  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
}

@keyframes flipBottom {
  0%, 50% {
    z-index: -1;
    transform: rotateX(90deg);
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
    z-index: 5;
  }
}

</style>