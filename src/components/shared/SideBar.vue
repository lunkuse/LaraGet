<template>
  <div class="sidebar" style="background-color: #f6f6f6">
    <div class="flex items-center justify-center mt-2 top-0 h-16 w-16">
      <!-- <img src="@/assets/images/dental.png"> -->
      <img
        class="w-full h-full object-cover"
        src="../../assets/meta-dent-logo-7.png"
        alt="logo"
      />
    </div>
    <div
      class="flex flex-col justify-between items-center sidebar-items overflow-auto"
    >
      <a
        :class="{ 'bg-yellow-650 rounded-xl': isDashboard }"
        @click="setSessionVariable()"
        href="/"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isDashboard }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <ViewGridIcon
          :class="{ 'text-white scale-110': isDashboard }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Dashboard</div>
        </span>
      </a>
      <a
        :class="{ 'bg-yellow-650 rounded-xl': isDoctorDashboard }"
        @click="setSessionVariable()"
        href="/doctors"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isDoctorDashboard }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <UserIcon
          :class="{ 'text-white scale-110': isDoctorDashboard }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs w-auto">
            Doctor
          </div>
        </span>
      </a>
      <a
        v-if="hasRole('Super-Admin') || hasRole('FrontOffice')"
        :class="{ 'bg-yellow-650 rounded-xl': isFront }"
        @click="setSessionVariable()"
        href="/front-office"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isFront }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <DesktopComputerIcon
          :class="{ 'text-white scale-110': isFront }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs w-auto">
            FrontOffice
          </div>
        </span>
      </a>
      <a
        v-if="hasRole('Doctor') || hasRole('Super-Admin')"
        :class="{ 'bg-yellow-650 rounded-xl': isPatients }"
        @click="setSessionVariable()"
        href="/patients"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isPatients }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <UserGroupIcon
          :class="{ 'text-white scale-110': isPatients }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Patients</div>
        </span>
      </a>
      <a
        v-if="hasRole('Doctor') || hasRole('Super-Admin')"
        :class="{ 'bg-yellow-650 rounded-xl': isAppointments }"
        @click="setSessionVariable()"
        href="/calendar"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isAppointments }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <CalendarIcon
          :class="{ 'text-white scale-110': isAppointments }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Calendar</div>
        </span>
      </a>
      <a
        v-if="hasRole('Finance') || hasRole('Super-Admin')"
        :class="{ 'bg-yellow-650 rounded-xl': isBilling }"
        @click="setSessionVariable()"
        href="/billing"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isBilling }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <CreditCardIcon
          :class="{ 'text-white scale-110': isBilling }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Billing</div>
        </span>
      </a>
      <a
        v-if="!hasRole('Doctor') || hasRole('Super-Admin')"
        :class="{ 'bg-yellow-650 rounded-xl': isReporting }"
        @click="setSessionVariable()"
        href="/reports"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isReporting }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <ChartSquareBarIcon
          :class="{ 'text-white scale-110': isReporting }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Reports</div>
        </span>
      </a>
      <a
        v-if="hasRole('Finance') || hasRole('Super-Admin')"
        :class="{ 'bg-yellow-650 rounded-xl': isInsurance }"
        @click="setSessionVariable()"
        href="/insurance"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isInsurance }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <ShieldCheckIcon
          :class="{ 'text-white scale-110': isInsurance }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Insurance</div>
        </span>
      </a>
      <a
        v-if="hasRole('Doctor') || hasRole('Super-Admin')"
        :href="`https://imaging.projectdental.nl`"
        :class="{ 'bg-yellow-650 rounded-xl': isImaging }"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
      >
        <div
          :class="{ 'scale-100': isImaging }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <PhotographIcon
          :class="{ 'text-white scale-110': isImaging }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Imaging</div>
        </span>
      </a>
      <a
        v-if="hasRole('Configurations') || hasRole('Super-Admin')"
        :class="{ 'bg-yellow-650 rounded-xl': isSettings }"
        class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl group ml-2"
          @click="setSessionVariable()"
       href="/configurations"
      >
        <div
          :class="{ 'scale-100': isSettings }"
          class="sidebar-item-marker transition duration-200 transform ease-in scale-0 group-hover:scale-100"
        ></div>
        <CogIcon
          :class="{ 'text-white scale-110': isSettings }"
          class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
        />
        <span
          class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
        >
          <div class="m-1 whitepsace-nowrap text-white text-xs">Settings</div>
        </span>
      </a>
    </div>
    <div
      @click="logout"
      class="h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center group hover:bg-yellow-650 m-1 hover:shadow-md border rounded-xl my-3"
    >
      <LogoutIcon
        class="sidebar-icon transition duration-200 transform group-hover:text-white ease-in scale-75 group-hover:scale-100"
      />
      <span
        class="popup group-hover:scale-100 scale-0 transition duration-300 transform"
      >
        <div class="m-1 whitepsace-nowrap text-white text-xs">Logout</div>
      </span>
    </div>
  </div>
</template>

<script>
import {
  CalendarIcon,
  DesktopComputerIcon,
  CreditCardIcon,
  ChartSquareBarIcon,
  ShieldCheckIcon,
  PhotographIcon,
  UserGroupIcon,
  ViewGridIcon,
  LogoutIcon,
  CogIcon,
  UserIcon,
} from '@heroicons/vue/outline';
import { inject } from '@vue/runtime-core';
// import CanAccess from '@/Helpers/AccessControl';

export default {
  setup() {
    const logout = inject('logout');
    const setSessionVariable = () =>
      sessionStorage.setItem('skfjndskjdn', 'k,bdjsnsjkndskjsdn');
    return {
      logout,
      setSessionVariable,
    };
  },
  data() {
    return {
      isAuth: null,
      token: null,
    };
  },
  components: {
    CalendarIcon,
    ViewGridIcon,
    DesktopComputerIcon,
    CreditCardIcon,
    ChartSquareBarIcon,
    ShieldCheckIcon,
    PhotographIcon,
    UserGroupIcon,
    LogoutIcon,
    CogIcon,
    UserIcon,
  },
  methods: {
    goToNameRoute(route) {
      this.$router.push(route);
    },
    hasRole() {
      return true; // CanAccess.checkRole(role);
    },
  },
  mounted() {
    this.isAuth = sessionStorage.getItem('isDentalSoftAuth');
    this.token = sessionStorage.getItem('dentalSoftToken');
  },
  computed: {
    isDashboard() {
      return this.$router.currentRoute.value.name === 'doctorDashboard';
    },
    isDoctorDashboard() {
      return this.$router.currentRoute.value.name === 'doctors-dashboard';
    },
    isFront() {
      return this.$router.currentRoute.value.name === 'Office Dashboard';
    },
    isBilling() {
      return this.$router.currentRoute.value.fullPath.indexOf('billing') >= 0;
    },
    isPatients() {
      return this.$router.currentRoute.value.name === 'patients';
    },
    // isPatientsDashBoard() {
    //   return this.$router.currentRoute.value.name === 'patientsDashboard';
    // },
    isAppointments() {
      return this.$router.currentRoute.value.name === 'calendar';
    },
    isReporting() {
      return this.$route.name === 'Reports';
    },
    isInsurance() {
      return this.$router.currentRoute.value.name === 'Insurance';
    },
    isImaging() {
      return this.$router.currentRoute.value.name === 'Imaging';
    },
    isSettings() {
      return this.$router.currentRoute.value.name === 'Settings';
    },
    isSuperAdmin(role) {
      const canAcess = this.roles.includes(role);
      return canAcess;
    },
  },
};
</script>

<style scoped>
.sidebar {
  @apply fixed w-20 flex flex-col justify-between items-center border-gray-200 h-screen left-0 top-0 z-20 space-y-2 border-r;
}
.sidebar-items::-webkit-scrollbar {
  display: none;
}
.sidebar-item group {
  @apply h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center hover:bg-yellow-650 m-1 hover:shadow-md border my-2 rounded-full hover:rounded-2xl;
}
.sidebar-icon {
  @apply h-8 w-8 text-yellow-650;
}
.sidebar-item-marker {
  @apply h-12 w-1.5 bg-yellow-650 absolute left-0 rounded-tr-full rounded-br-full;
}
.popup {
  @apply bg-black absolute left-20 h-8 items-center border-2 border-white flex justify-center rounded-md;
}
</style>
