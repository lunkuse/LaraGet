<template>
  <div class="content ">
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
        <!-- <h2 class="intro-y text-lg font-medium mr-auto mt-2">Details</h2> -->
        
        <div class="intro-y box bg-theme-36 p-5 mt-6">
          <router-link to="/dashboard/compose-email">
            <button
              type="button"
              class="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1"
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
                class="lucide w-4 h-4 mr-2"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg> Compose
            </button>
          </router-link>
          <div class="border-t border-white/10 dark:border-darkmode-400 mt-6 pt-6 text-white">
          <router-link to="/dashboard/communication">
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md">
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
                class="lucide w-4 h-4 mr-2"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg> Outbox
            </a></router-link>
            <!-- <a href class="flex items-center px-3 py-2 mt-2 rounded-md">
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
                class="lucide w-4 h-4 mr-2"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg> Marked
            </a> -->
            <!-- <router-link to="/dashboard/draft-email">
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md">
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
                class="lucide w-4 h-4 mr-2"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"
                />
              </svg> Draft
            </a></router-link> -->
            <router-link to="/dashboard/sent-email">
           
              <a
              href
              class="flex items-center px-3 py-2 rounded-md bg-white/10 dark:bg-darkmode-700 font-medium"
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
                class="lucide w-4 h-4 mr-2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg> Sent
            </a></router-link>
            <!-- <a href class="flex items-center px-3 py-2 mt-2 rounded-md">
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
                class="lucide w-4 h-4 mr-2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg> Trash
            </a> -->
          </div>
        
        </div>
      </div>

      <!-- start emails -->
      <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
        <div class="intro-y inbox box mt-5">
          <div
            class="p-5 flex flex-col-reverse sm:flex-row text-slate-500 border-b border-slate-200/60"
          >
            <div
              class="flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-5 sm:pt-0 mt-5 sm:mt-0 -mx-5 sm:mx-0 px-5 sm:px-0"
            >
              <h2 class="intro-y text-lg font-medium mr-auto mt-2">Details</h2>
          
            </div>
            
          </div>




<!-- manage overflow -->
<div  class="">


        <div >
          <div >



    <Details />
 
 </div>

 </div>

           
          </div>
   
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Details from '@/components/emailing/SentOpened.vue';
import Outbox from './outbox/EmailContainer.vue'
export default {
  name: 'SinglePayment',
  props: ['emailId: { type: Object }, messageId: { type: Object }'],
  components:{
    Details,
    Outbox
    },
  data() {
    return {
      id: '',
      notification_id: '',
      message_id: '',
      due_date: '',
      date_created: '',
     

    }
  },
  watch: {

 emailId: function () {
this.notification_id = this.$route.params.emailId
this.message_id = this.$route.params.messageId
 console.log('message_id , notification_id', this.message_id, this.notification_id)
 }

  },
  created() {
    // this.getMails()
    // this.notification_id = this.$route.params.emailId
    // this.message_id = this.$route.params.messageId
    // console.log('message_id , notification_id', this.message_id, this.notification_id)
  },
  mounted() {
    // this.getMails()
    // this.notification_id = this.$route.params.emailId
    // this.message_id = this.$route.params.messageId
    // console.log('message_id , notification_id', this.message_id, this.notification_id)
  },
  methods: {
    getMails() {
      this.loading = true
      const token = localStorage.getItem('token')
      const data = {
        messageId: this.$route.params.messageId,
        // notify_Id: this.$route.params.emailId  
      }
      axios.post('v2/mails/view_sent', data, {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
          this.loading = false
          const emailsnot = res.data.payload
          
          if (res.data.status === '401') {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
            // window.location.href = '/'
            // localStorage.removeItem('user')
            // this.$router.push('/login')
          }
        })
        .catch((err) => console.log(err))
    },
    // Coverting decimal places of numbers in table
    formatNumber(value) {
      if (value) {
        const newvalue = parseFloat(value).toFixed(0)
        return parseFloat(newvalue).toLocaleString()
      }
    }
  }
}
</script>
