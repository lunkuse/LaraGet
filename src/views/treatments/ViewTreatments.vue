<style scoped>
/* .context-menu-item {
  @apply h-10 flex items-center cursor-pointer text-xs hover:bg-slate-100 rounded;
} */
#teethContainer::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scroll-bar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
canvas {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  aspect-ratio: attr(width) / attr(height);
}
.closeB {
  border: 1px solid blue;
}
</style>

<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- first column -->
      <div class="col-span-12 2xl:col-span-12">
        <TreatmentChart />
      </div>
      <!-- last column -->
      <div class="col-span-12 2xl:col-span-3">
        <!-- <TreatmentList /> -->
      </div>
    </div>
  </div>
  <!-- <Dashboard v-if="isInfant"/> -->
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import axios from 'axios'
import moment from 'moment'
import Toastify from 'toastify-js'
import Payment from '@/components/payments/Pay.vue'

import $ from 'jquery'
// import TreatmentList from "../treatments/TreatmentList.vue";
import TreatmentChart from "../treatments/Chart.vue";

export default defineComponent({
  components: {
//    TreatmentList,
   TreatmentChart
  },
  props: ['toothId'],
  data() {
    return {
      loading: false,
    
    }
  },
  setup() {},
  computed: {
    currentUser() {
      // console.log(toRaw(this.$store.state.auth.user))
      return toRaw(this.$store.state.auth.user)
    }
  },
  watch: {},
  methods: {
 
  },
  created() {
   
  },
  mounted() {
   
  }
})
</script>
<style lang="scss">
.accordion.accordion-boxed .accordion-item {
  border-width: 4px;
  border-radius: 15px;
  border-color: #5f5d5d !important;
}
</style>