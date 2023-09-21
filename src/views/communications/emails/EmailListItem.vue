<template>
 
  <div
    class="col-span-12 cursor-pointer "
    :class="StatusClassunread(email?.read_at)"
  >
    <!-- <div
    class="intro-x  hover:bg-gray-200 flex-1 zoom-in h-auto px-2 py-3 w-full cursor-pointer flex items-center text-sm hover:bg-gray-200 hover:shadow-md border-b border-gray-200"
    :class="StatusClassunread(email?.read_at)"
  > -->

    <div class="intro-y">
      <div
        class="transition duration-200 ease-in-out transform cursor-pointer inline-block sm:block md:block border-b border-slate-100 dark:border-darkmode-400 hover:bg-gray-300 
        hover:relative hover:z-20 hover:shadow-md hover:border-0 hover:rounded bg-white text-slate-800 dark:text-slate-300 dark:bg-dark-1 dark:text-white"
        :class="
          email?.read_at == null
            ? email?.read_at == null && 'bg-gray-200 dark:bg-black'
            : ''
        "
      >
        <div @click="openMail(email)"  class="flex px-2 py-4">
          <div class="flex items-center flex-none mr-2 w-72">
            <input
              class="transition-all duration-100 ease-in-out shadow-sm cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;[type='radio']]:checked:bg-primary [&amp;[type='radio']]:checked:border-primary [&amp;[type='radio']]:checked:border-opacity-10 [&amp;[type='checkbox']]:checked:bg-primary [&amp;[type='checkbox']]:checked:border-primary [&amp;[type='checkbox']]:checked:border-opacity-10 [&amp;:disabled:not(:checked)]:bg-slate-100 [&amp;:disabled:not(:checked)]:cursor-not-allowed [&amp;:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&amp;:disabled:checked]:opacity-70 [&amp;:disabled:checked]:cursor-not-allowed [&amp;:disabled:checked]:dark:bg-darkmode-800/50 flex-none border-slate-400 checked:border-primary"
              type="checkbox"
              :value="email?.id"
              :checked="selected"
              @change="checkedEmailMethod($event, email)"
              @click.stop
            />
            <a
              href="#"
              class="flex items-center justify-center flex-none w-5 h-5 ml-4 text-slate-400 hidden"
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
                class="stroke-1.5 w-4 h-4"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
            </a>
            <a
              href="#"
              class="flex items-center justify-center flex-none w-5 h-5 ml-2 text-slate-400 hidden"
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
                class="stroke-1.5 w-4 h-4"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </a>
            <div class="relative flex-none w-6 h-6 ml-2 image-fit">
              <Avatar
                v-bind:initials="
                  email?.from_fname +
                  email?.from_lname
                "
                class="rounded-full"
              />
            </div>
            <div
              class="ml-3 truncate font-medium"
            >
              {{ email.from_fname }}
              {{email?.from_lname }}</div
            >
          </div>
          <div class="w-64 truncate sm:w-auto">
    <span class="w-64 truncate sm:w-auto">
        <span class="truncate ">
        <span class="text-black">{{
                email?.subject ? email?.subject.charAt(0).toUpperCase() + email?.subject.slice(1).toLowerCase() : ''
            }}</span>  - 
            <span class="text-gray-700"> {{ email?.message ? email?.message.replace(/<[^>]+>/g, '') : '' }}</span> 
        </span>
    </span>
</div>
        <div
           
            class="pl-10 ml-auto whitespace-nowrap font-medium"
          > 
            <div class="pl-10 ml-auto whitespace-nowrap font-medium">
              {{ moment(email?.created_at).fromNow() }}
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
import {
  DotsHorizontalIcon,
  MailOpenIcon,
  ClockIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/outline'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import moment from 'moment'
import Avatar from '@/components/avatar/Avatar.vue'
import router from '../../../router'

export default defineComponent({
  name: 'EmailListItem',
  props: {
    email: Object,
    selected: Boolean
  },
  components: {
    DotsHorizontalIcon,
    MailOpenIcon,
    ClockIcon,
    Avatar,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    QuestionMarkCircleIcon
  },
  data() {
    return {
      patient: {},
      doctors: ''
    }
  },
  methods: {
    moment,
    StatusClassunread(status) {
      console.log('read at status', status)
      return status === null
        ? 'text-black font-medium   bg-slate-200 dark:text-white '
        : ''
    }
  },
  created() {
   },
  setup(props, { emit }) {
    // const { getDoctorInitials, getDoctor } = getPatientsAppointments();
    // const { getDoctorInitials, getDoctor } = [];
    const translations = inject('translation_v3')
    const isAppDetailVisible = ref(false)
    const isRescheduleVisible = ref(false)
    const isQuestionAppDetailVisible = ref(false)
    const selectedEmail = ref(null)
    const isMenuVisible = ref(false)
    const isAppDetailVisibleEmployee = ref(false)
    const selectedemployee = ref(null)
    const store = useStore()
    const doctors = computed(() => store?.state.patientsPatients?.doctors)

    const showMenu = () => {
      isMenuVisible.value = true
    }

    const checkedEmailMethod = (event, email) => {
      emit('onSelected', email, event.target.checked)
    }

    const truncateString = (string, limit) => {
      if (string.length > limit) {
        return string.substring(0, limit) + '...'
      }
      return string
    }
const openMail=(email)=>{
  console.log('sending email',email)
  const message = email?.message
  const fromFirstName=email?.from_fname
  const fromLastName=email?.from_lname
  const fullName = fromFirstName + fromLastName
  const fromEmail=email?.from_email
  const messageID = email?.id
  const subject = email?.subject


  router.push({
        name: 'side-menu-open-email',
        params: {
         
          newmessageID:messageID
        }  });
}
    return {
      translations,
      truncateString,
      isAppDetailVisible,
      isRescheduleVisible,
      selectedEmail,
      openMail,
      showMenu,
      isMenuVisible,
      doctors,

      selectedemployee,
      checkedEmailMethod
    }
  }
})
</script>
<style scoped>
input:checked {
  background-color: #ff782e !important;
  border: 1px solid #ff782e !important;
}
</style>