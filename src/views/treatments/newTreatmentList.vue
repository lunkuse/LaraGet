<template>
  <div class="bg-white rounded-sm">
    <!-- Treatments: {{treatments}} -->
    <!-- <ul class="divide-y divide-gray-200 mt-4" v-if="treatments.length > 0 && !loadingTreatments"> -->
    <ul class="divide-y divide-gray-200 mt-4">
      <div v-for="(data, index) in treatments" :key="data.id">
        <div
          class="accordion__header items-center flex items-center justify-between w-full rounded bg-slate-100 text-xs"
          :class="{ 'is-active': index == activeTab }"
          :id="data.id"
          @click="toggleAccordion(index)"
        >
          <p class="font-bold pr-4">Treatment: {{ `#000${data.id}` }}</p>
          <p class="font-bold pr-4">Date: {{ data.created_at }}</p>
          <p class="font-bold pr-4">Payment Status: {{ data.payment_status }}</p>
          <p class="font-bold pr-4">Appointment: {{ data.visit_id }}</p>
          <p v-if="index !== activeTab" class="pr-2">{{ data.date }}</p>
          <i class="accordion__toggle"></i>
        </div>
        <div class="accordion__body" :class="{ 'is-active': index == activeTab }">
          <div class="grid grid-cols-6 gap-4 mb-3 mt-2 text-base text-black font-bold">
            <span class="h-10 flex items-center justify-start">Tooth Element</span>
            <span class="h-10 flex items-center justify-start col-span-2">Details</span>
            <span class="h-10 flex items-center justify-start">Treatments</span>
            <span class="h-10 flex items-center justify-start">Prices</span>
            <span class="h-10 flex items-center justify-start">Done By</span>
          </div>
          <div
            v-for="(treatment, index) in data.tooth_sections"
            class="grid grid-cols-6 gap-1 text-sm py-0.5"
            :key="index"
          >
            <span class="h-12 flex items-center justify-start pl-2 bg-slate-100">{{ index }}</span>
            <span
              v-if="treatment.pathology"
              class="h-12 flex items-center justify-start pl-2 bg-slate-100 col-span-2"
            >{{ treatment.pathology.decay.join(', ') }}</span>
            <span
              class="h-12 flex items-center justify-start pl-2 bg-slate-100"
            >{{ treatment.pathology?.treatments ?? 'nil'}}</span>
            <span
              class="h-12 flex items-center justify-start pl-2 bg-slate-100"
            >{{ treatment?.pathology?.treatmentPrices ?? 'nil'}}</span>
            <span
              class="h-12 flex items-center justify-start pl-2 bg-slate-100"
            >{{ treatment?.pathology?.paymentStatus ?? 'nil'}}</span>
          </div>
        </div>
      </div>
    </ul>
    <div
      v-if="treatments.length === 0 && !loadingTreatments"
      class="w-full h-96 flex flex-col items-center justify-center text-black text-sm"
    >
      <img src="@/assets/images/nodata.svg" class="h-48 w-48" alt="no appointments" />
      <p>No treatment performed on this patient yet.</p>
    </div>
    <!-- <div
      v-if="loadingTreatments"
      class="w-full h-96 flex flex-col items-center justify-center text-black text-sm"
    >-->
    <!-- <Loader /> -->
    <!-- <p>Loading treatments...</p>
    </div>-->
  </div>
</template>

<script >
import { defineComponent, onMounted, ref } from 'vue'
import moment from 'moment'
import axios from 'axios'
import router from '../../router'
// import { CalendarIcon } from '@heroicons/vue/outline';
// import useTranslations from '../../../../mixins/useTranslations';
import PatientsService from '@/service/patients.service'
// import Loader from '../../../shared/BigLoader.vue';
export default defineComponent({
  setup() {
    const treatments = ref([])
    const activeTab = ref()
    const toggleAccordion = tab => {
      console.log('tapped here')
      if (activeTab.value === tab) {
        activeTab.value = null
        return
      }
      activeTab.value = tab
    }
    return {
      treatments,
      toggleAccordion,
      activeTab
    }
  },
  methods: {},
  data() {
    const treatments = ref([])
    const activeTab = ref()

    const toggleAccordion = tab => {
      console.log('tab tapped')
      if (activeTab.value === tab) {
        activeTab.value = null
        return
      }
      activeTab.value = tab
    }
    return {
      treatments: [],
      toggleAccordion,
      //   activeTab : ref(),
      loadingTreatments: true
      //   activeTab: ''
    }
  },
  created() {
    console.log('component created')
    // this.loading = true
    const token = localStorage.getItem('token')

    const userId = localStorage.getItem('userID')
    const missing = 'missing'

    const data = {
      patientId: userId
    }
    axios
      .post('v1/donetreatments/get_done_treatments_by_patient', data, {
        headers: {
          Authorization: 'Bearer ' + token,

          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(res => {
        const client_treatments_all = res.data.payload[0]

        const client_treatments = client_treatments_all.tooth_sections

        const sections = JSON.parse(client_treatments)
        // const client_treatment_secs = sections[`${toothID}`]
        //   console.log('client treatments list last', res.data)
        //   const filteredData = res.data
        this.treatments = res.data.payload
        console.log('client treatments created', this.treatments)
        // const filteredData = res.data.payload

        this.loadingTreatments = false
        if (res.data.success === false) {
          console.log('expired session')
          this.$store.dispatch('auth/logout')
          this.$router.push('/login')
        }
      })
      // .catch(err => console.log(err))
      .catch(function(err) {
        console.log('error', err)
        if (err.response?.status === 401) {
          console.log('expired session')
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          router.go('/login')
        } else {
          // Handle else
        }
      })
    const filteredData = this.treatments
    console.log('filteredData', filteredData)
    filteredData.forEach(treatment => {
      console.log('we are here', treatments)
      const treatmentBlob = JSON.parse(treatment.tooth_sections)
      delete treatmentBlob?.['missing']
      Object.keys(treatmentBlob).forEach((tooth, index) => {
        if (Object.keys(treatmentBlob[tooth]).length === 0)
          delete treatmentBlob[tooth]
      })
      Object.keys(treatmentBlob).forEach((tooth, index) => {
        if (
          Object.keys(treatmentBlob[tooth]).length === 1 &&
          treatmentBlob[tooth].hasOwnProperty('isPrimary')
        )
          delete treatmentBlob[tooth]
      })
      const treatmentDetails = {
        id: treatment.id,
        tooth_sections: treatmentBlob,
        created_at: moment(treatment.created_at).format('YYYY-MM-DD'),
        payment_status: treatment.payment_status,
        visit_id: treatment.visit_id
      }
      console.log('client treatments treatmentDetails', treatmentDetails)
      treatments.value.push(treatmentDetails)
    })
    
  }
})
</script>

<style scoped>
.accordion__header {
  padding: 1em;
  background-color: #fff;
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.accordion__header > * {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
}

.accordion__header.is-active {
  background-color: #d1d5db;
}

.accordion__header:hover {
  background-color: #d1d5db;
}

.accordion__toggle {
  margin-left: 10px;
  height: 3px;
  background-color: #222;
  width: 13px;
  display: block;
  position: relative;
  flex-shrink: 1;
  border-radius: 2px;
}

.accordion__toggle::before {
  content: '';
  width: 3px;
  height: 13px;
  display: block;
  background-color: #222;
  position: absolute;
  top: -5px;
  left: 5px;
  border-radius: 2px;
}

.date__hint {
  position: relative;
  margin-left: 30px;
  display: block;
}

.is-active .accordion__toggle::before {
  display: none;
}

.accordion__body {
  display: none;
  padding: 1em;
  border: 1px solid #ccc;
  border-top: 0;
}

.accordion__body.is-active {
  display: block;
}
</style>
