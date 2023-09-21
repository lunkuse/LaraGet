<template>
  <div class="content ">
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
              </svg>   {{$t("translation.compose_text") }}
            </button>
          </router-link>
          <div class="border-t border-white/10 dark:border-darkmode-400 mt-6 pt-6 text-white">
           <router-link
                  to="/dashboard/communication"
                >
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
              </svg> {{$t("translation.inbox_text") }}
            </a></router-link>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md" style="display:none">
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
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md" style="display:none">
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
              </svg> {{$t("translation.sent_text") }}
            </a></router-link>
            <a href class="flex items-center px-3 py-2 mt-2 rounded-md" style="display:none">
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

<div class="col-span-12 lg:col-span-9 2xl:col-span-10 ">

<EmailForm />
     


      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, toRaw} from 'vue'
import EmailForm from '@/components/emailing/composeBox.vue'

export default defineComponent({
  components: {
    EmailForm
  },

  data() {
   
    
    

    return {
      loading: false
    }
  },

  created() {
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    },

  },
  mounted() {
  },
  methods: { }
})
</script>

