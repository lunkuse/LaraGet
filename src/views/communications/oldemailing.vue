<template>
  <div class="content ">
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
        <!-- <h2 class="intro-y text-lg font-medium mr-auto mt-2">Inbox</h2> -->
        
        <div class="intro-y box bg-theme-36 p-5 mt-6">
          <router-link to="/dashboard/compose-email">
            <button
              type="button"
              class="btn text-slate-600 dark:text-slate-800 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1"
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
              class="flex items-center px-3 py-2 rounded-md bg-white/10 dark:bg-darkmode-700 font-medium intro-x flex"
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
                class="lucide w-4 h-4 mr-2 "
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg> Inbox<span class="text-xs px-1 rounded-full bg-white text-theme-43 mr-1 ml-auto">{{inboxCount}}</span>
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
             <router-link to="/dashboard/draft-email">
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
            </a></router-link>
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
            <h2 class="intro-y text-lg font-medium mr-auto mt-2">Inbox</h2>
            
          </div>


<!-- manage overflow -->
<div  class=" overflow-x-auto relative mt-5 ">

  <span v-if="loading" class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10">
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>We are loading your Emails...</span>
        </span>
        <div v-if="!loading" class="scrollbar-hidden intro-y">
          <div id="overflow-x-auto ">



 <table
        class="
             display
             table table-report sm:mt-2
             col-span-12 2xl:col-span-9
            "
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
                <th>#</th>
                <th
                 class="whitespace-nowrap"
                >
                  From
                </th>
                <th
                  class="whitespace-nowrap"
                >
                 Subject
                </th>
                <th
                  class="whitespace-nowrap"
                >
                  CREATED AT
                </th>
                <!-- <th
                  class="whitespace-nowrap"
                >
                  STATUS
                </th> -->
              </tr>
            </thead>
            <tbody>
             
               <tr
                v-for="clientemail in inbox"
                :key="clientemail.id"
                class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                :class="StatusClassunread(clientemail.read_at)"
              >
              <td class="whitespace-nowrap">
                <span style="display: none;">{{clientemail.created_at}} </span>
                <div class="flex">
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


</div>

              </td>
                
                <td class="whitespace-nowrap flex">
                  
                       <router-link
                       
                    :to="{
                      name: 'side-menu-open-email',
                      params: { emailId: clientemail.id , messageId:JSON.parse(clientemail.data).message_id}
                     
                    }"
                   class="flex"
                  >
                    <Avatar v-bind:initials="JSON.parse(clientemail.data).from_details.first_name + JSON.parse(clientemail.data).from_details.last_name" class="rounded-full"/>
                    {{JSON.parse(clientemail.data).from_details.first_name}} {{JSON.parse(clientemail.data).from_details.last_name}}</router-link>
                    </td>

                <td class="whitespace-nowrap" >
                    
                    <router-link
                    class="whitespace-nowrap"
                    :to="{
                      name: 'side-menu-open-email',
                      params: { emailId: clientemail.id , messageId:JSON.parse(clientemail.data).message_id}
                    }"
                  >
                  <div style="height:100%;width:100%"><p class="truncate w-96 bg-yellow-200 text-md"> {{JSON.parse(clientemail.data).subject}} </p></div></router-link>
                </td>
                 <td class="whitespace-nowrap">
                  
                  <router-link
                  class="whitespace-nowrap"
                    :to="{
                      name: 'side-menu-open-email',
                      params: { emailId: clientemail.id , messageId:JSON.parse(clientemail.data).message_id}
                    }"
                  >
                <div style="height:100%;width:100%"><span style="display: none;">{{clientemail.created_at}} </span> {{ moment(clientemail.created_at ).fromNow()}}</div></router-link>
                </td>
                <!-- <td class="whitespace-nowrap" :class="StatusClass(notification.status)">
                  <a
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#open-notification-all-modal"
                    :disabled="isDisabled"
                    @click="getLoan(notification)"
                  ><div style="height:100%;width:100%">{{ notification.status}}<span class="float-right"><eye-icon  v-if="notification.status === 'Unread'" 
                  size="1.5x" class="custom-class"></eye-icon></span></div> </a></td> -->
              </tr>
            </tbody>
          </table>








 </div>

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

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'

import $ from 'jquery'
export default defineComponent({
  components: {
    Avatar
  },

  data() {
    return {
      clientemails: [],
      inbox: [],
      loading: false,
      inboxCount: 0,
      inboxMail: null,
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
    // this.getEmail()
    this.getInbox()
    this.CountInbox()
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
          // console.log('emails', this.clientemails)
         Object.assign(
     this.clientemails,res.data.payload.notifications
      )
    
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
          .catch(function (err) {
           console.log('expired session error new', err.response.status)
           const errorCode = err.response.status
            if (errorCode === 401) {
        console.log('expired session')
         localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.$router.go('/login')
    } else {
      // Handle else
    }
         })
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
          
         $.extend(true, $.fn.dataTable.defaults, {
        dom: '<"row view-filter"<"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"<"pull-left"B><"center md:block mx-auto text-slate-500"i><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"lp>>>',
        aaSorting: [[0, 'asc']],
        order: [[0, 'desc']],
        buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5'
        ],
        scrollX: true,
        initComplete: function () {
            var btns = $('.dt-button');
            btns.addClass('btn  bg-theme-32 btn-sm text-white');
            btns.removeClass('dt-button');
            $('input').addClass('tablesearch');
            
            
          }
          })
          $('table.display').DataTable()
  

            $('.dataTables_empty').text('No Email yet.')
            $('a.toggle-vis').on('click', function(e) {
              e.preventDefault()

              // Get the column API object
              const column = table.column($(this).attr('data-column'))

              // Toggle the visibility
              column.visible(!column.visible())
            })
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        // .catch(err => console.log(err))
          .catch(function(err) {
          console.log('expired session error new', err.response.status)
          const errorCode = err.response.status
          if (errorCode === 401) {
            console.log('expired session')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            this.$router.go('/login')
          } else {
            // Handle else
          }
        })
    },
      // Getting All inbox
    CountInbox() {
      this.loading = true
      const token = localStorage.getItem('token')
      const data = {
        patientId: this.currentUser.id
      }
      axios

        .post('v2/mails/total_mail', data, {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(res => {
          this.loading = false

          this.inboxCount = res.data.payload
          console.log('inboxCount', this.inboxCount )
         
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        // .catch(err => console.log(err))
          .catch(function(err) {
          console.log('expired session error new', err.response.status)
          const errorCode = err.response.status
          if (errorCode === 401) {
            console.log('expired session')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            this.$router.go('/login')
          } else {
            // Handle else
          }
        })
    },
    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },
 StatusClassunread(status) {
      console.log('read at status', status)
      return (status === null) ? 'text-black font-bold  bg-slate-200 dark:text-white ' : ''
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
