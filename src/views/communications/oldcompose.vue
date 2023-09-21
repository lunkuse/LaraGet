<template>
  <div class="content">
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
        <h2 class="intro-y text-lg font-medium mr-auto mt-2">Inbox</h2>
        
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
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg> Inbox
            </a>
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
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg> Marked
            </a>
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
            </a>

            <!-- sent emails link -->
             <router-link to="/dashboard/sent-email">
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
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg> Sent
            </a></router-link>
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
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg> Trash
            </a>
          </div>
          <div
            class="border-t border-white/10 dark:border-darkmode-400 mt-4 pt-4 text-white"
            style="display:none;"
          >
            <a href class="flex items-center px-3 py-2 truncate">
              <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>Custom Work
            </a>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md truncate">
              <div class="w-2 h-2 bg-success rounded-full mr-3"></div>Important Meetings
            </a>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md truncate">
              <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>Work
            </a>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md truncate">
              <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>Design
            </a>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md truncate">
              <div class="w-2 h-2 bg-danger rounded-full mr-3"></div>Next Week
            </a>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md truncate">
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg> Add New Label
            </a>
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
              <input class="form-check-input" type="checkbox" />
              <div class="dropdown ml-1" data-tw-placement="bottom-start">
                <button
                  class="dropdown-toggle w-5 h-5 block"
                  aria-expanded="false"
                  data-tw-toggle="dropdown"
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
                    class="lucide w-5 h-5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div class="dropdown-menu w-32">
                  <ul class="dropdown-content">
                    <li>
                      <a class="dropdown-item cursor-pointer">All</a>
                    </li>
                    <li>
                      <a class="dropdown-item cursor-pointer">None</a>
                    </li>
                    <li>
                      <a class="dropdown-item cursor-pointer">Read</a>
                    </li>
                    <li>
                      <a class="dropdown-item cursor-pointer">Unread</a>
                    </li>
                    <li>
                      <a class="dropdown-item cursor-pointer">Starred</a>
                    </li>
                    <li>
                      <a class="dropdown-item cursor-pointer">Unstarred</a>
                    </li>
                  </ul>
                </div>
              </div>
              <a href="javascript:;" class="w-5 h-5 ml-5 flex items-center justify-center">
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
                  class="lucide w-4 h-4"
                >
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0115-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 01-15 6.7L3 16" />
                </svg>
              </a>
              <a href="javascript:;" class="w-5 h-5 ml-5 flex items-center justify-center">
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
                  class="lucide w-4 h-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </a>
            </div>
            <div class="flex items-center sm:ml-auto">
              <div class>1 - 50 of 5,238</div>
              <a href="javascript:;" class="w-5 h-5 ml-5 flex items-center justify-center">
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
                  class="lucide w-4 h-4"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </a>
              <a href="javascript:;" class="w-5 h-5 ml-5 flex items-center justify-center">
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
                  class="lucide w-4 h-4"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <a href="javascript:;" class="w-5 h-5 ml-5 flex items-center justify-center">
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
                  class="lucide w-4 h-4"
                >
                  <path
                    d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </a>
            </div>
          </div>

          <div class="overflow-x-auto sm:overflow-x-visible" >
             
            <div class="intro-y" v-for="clientemail in clientemails" :key="clientemail.id">
              <router-link
                    :to="{
                      name: 'side-menu-open-email',
                      params: { emailId: clientemail.id , messageId:clientemail.data.message_id}
                    }"
                  >
              <div
                class="inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400 inbox__item--active"
              >
                <div class="flex px-5 py-3">
                  <div class="w-72 flex-none flex items-center mr-5">
                    <input class="form-check-input flex-none" type="checkbox" />
                    <a
                      href="javascript:;"
                      class="w-5 h-5 flex-none ml-4 flex items-center justify-center text-slate-400"
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
                        class="lucide w-4 h-4"
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        />
                      </svg>
                    </a>
                    <a
                      href="javascript:;"
                      class="w-5 h-5 flex-none ml-2 flex items-center justify-center text-slate-400"
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
                        class="lucide w-4 h-4"
                      >
                        <path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                      </svg>
                    </a>
                    <div class="w-6 h-6 flex-none image-fit relative ml-5">
                      
                      <Avatar v-bind:initials="clientemail.data.from_details.first_name + clientemail.data.from_details.last_name" class="rounded-full"/>
                      
                    </div>
                    <!-- {{clientemail.notifications[0]data[0]['from_details.first_name']}} -->
                    <div class="inbox__item--sender truncate ml-3">{{clientemail.data.from_details.first_name}} {{clientemail.data.from_details.last_name}}
                    </div>
                  </div>
                  <div class="w-64 sm:w-auto truncate">
                    <span
                      class="inbox__item--highlight"
                    > {{clientemail.data.subject}} </span>
                  </div>
                  <div class="inbox__item--time whitespace-nowrap ml-auto pl-10">{{ moment(clientemail.created_at ).fromNow()}}</div>
                </div>
              </div>
               </router-link>
            </div>
           
          </div>
          <div
            class="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500"
          >
            <div>4.41 GB (25%) of 17 GB used Manage</div>
            <div class="sm:ml-auto mt-2 sm:mt-0">Last account activity: 36 minutes ago</div>
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
import Avatar from '@/components/avatar/Avatar.vue';
export default defineComponent({
  components: {
    Avatar
  },

  data() {
    return {
      clientemails: [],
      inbox: [],
      loading: false
    }
  },

  created() {
    // this.getEmail()
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
  },
  mounted() {
    this.getEmail()
    this.getInbox()
  },
  methods: {
    moment,

    // Getting All email notifications
    getEmail() {
      this.loading = true
      const token = localStorage.getItem('token')
      const data = {
        patientId: this.currentUser.id
      }
      axios

        .post('v2/mails/patient_mail', data, {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(res => {
          this.loading = false

          this.clientemails = res.data.payload.notifications
          console.log('emails', this.clientemails)
         Object.assign(
     this.clientemails,res.data.payload.notifications
      )
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    },

       // Getting All inbox
    getInbox() {
      this.loading = true
      const token = localStorage.getItem('token')
      const data = {
        patientId: this.currentUser.id
      }
      axios

        .post('v2/mails/inbox', data, {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(res => {
          this.loading = false

          this.inbox = res.data.payload
          console.log('inbox', this.inbox )
         
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
    },
    formatSum(value) {
      if (value) {
        const total = String(value)
          .split(',')
          .map(e => parseFloat(e))
          .reduce((value, element) => {
            return value + element
          })
        // .toStringAsFixed(1)
        const sum2 = 9

        console.log('new total', total)
        //   console.log('array sum',sum )
        return total
      }
    }
  }
})
</script>
