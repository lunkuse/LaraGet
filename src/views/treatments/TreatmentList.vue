<template>
  <div class="grid-cols-12">
    <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
      <div class="bg-white rounded-sm dark:bg-gray-800">
        <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
        >
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>
            <p>{{
                                  $t("translation.loading_text")
                                }}</p>
          </span>
        </span>

        <div class="scrollbar-hidden intro-y" v-if="!loading">
          <ul
            class="divide-y divide-gray-200 dark:divide-gray-800 mt-4"
            v-if="treatments.length > 0 && !loadingTreatments"
          >
            <div v-for="(data, index) in treatments" :key="data.id">
              <div
                class="accordion__header hover:bg-white dark:bg-gray-800 items-center flex items-center justify-between w-full rounded bg-theme-46 dark:bg-gray-900 dark:is-active:bg-gray-900 text-xs is-active:bg-white hover:bg-white"
                :class="{ 'is-active': index == activeTab }"
                :id="data.id"
                @click="toggleAccordion(index)"
              >
                <p class="font-bold pr-4">
                  <span>{{ $t('translation.treatments_text') }}:</span>

                  {{ `#000${data.id}` }}
                </p>
                <p class="font-bold pr-4">
                  <span>{{ $t('translation.date_text') }}:</span>

                  {{ data.created_at }}
                </p>
                <p class="font-bold pr-4">
                  <span>{{ $t('translation.payment_status_text') }}:</span>

                  {{ data.payment_status }}
                </p>
                <p class="font-bold pr-4">
                  <span>{{ $t('translation.appointment_text') }}:</span>

                  {{ data.visit_id }}
                </p>

                <p v-if="index !== activeTab" class="pr-2">{{ data.date }}</p>
                <i
                  class="accordion__toggle bg-black dark:bg-white before:bg-black dark:before:bg-white"
                ></i>
              </div>
              <div
                class="accordion__body"
                :class="{ 'is-active': index == activeTab }"
              >
                <div
                  class="grid grid-cols-6 gap-4 mb-3 mt-2 text-base text-black font-bold"
                >
                  <span
                    class="h-10 flex items-center justify-start text-black dark:text-white"
                  >
                    <p>{{ $t('translation.tooth_element_text') }}:</p>
                  </span>
                  <span
                    class="h-10 flex items-center justify-start col-span-2 text-black dark:text-white"
                  >
                    <p>{{ $t('translation.details_text') }}:</p>
                  </span>
                  <span
                    class="h-10 flex items-center justify-start text-black dark:text-white"
                  >
                    <p>{{ $t('translation.treatments_text') }}:</p>
                  </span>
                  <span
                    class="h-10 flex items-center justify-start text-black dark:text-white"
                  >
                    <p>{{ $t('translation.prices_text') }}:</p>
                  </span>
                  <span
                    class="h-10 flex items-center justify-start text-black dark:text-white"
                  >
                    <p>{{ $t('translation.done_by_text') }}:</p>
                  </span>
                </div>
                <div
                  v-for="(treatment, index) in data.tooth_sections"
                  class="grid grid-cols-6 gap-1 text-sm py-0.5"
                  :key="index"
                >
                  <!-- <div v-for="(treatment, index) in JSON.parse(data.tooth_sections)" class="grid grid-cols-6 gap-1 text-sm py-0.5"
                  :key="index">-->
                  <span
                    class="h-12 flex items-center justify-start pl-2 bg-theme-46 dark:bg-gray-900"
                    >{{ index }}</span
                  >

                  <span
                    class="h-12 flex items-center justify-start pl-2 bg-theme-46 dark:bg-gray-900 col-span-2"
                    >{{ treatment?.pathology?.decay.join(', ') }}</span
                  >
                  <span
                    class="h-12 flex items-center justify-start pl-2 bg-theme-46 dark:bg-gray-900"
                    >{{ treatment?.pathology?.treatments ?? 'nil' }}</span
                  >
                  <span
                    class="h-12 flex items-center justify-start pl-2 bg-theme-46 dark:bg-gray-900"
                    >{{ treatment?.pathology?.treatmentPrices ?? 'nil' }}</span
                  >
                  <span
                    class="h-12 flex items-center justify-start pl-2 bg-theme-46 dark:bg-gray-900"
                    >{{ treatment?.pathology?.paymentStatus ?? 'nil' }}</span
                  >
                </div>
              </div>
            </div>
          </ul>

          <div
            v-if="treatments.length === 0"
            class="w-full h-96 flex flex-col items-center justify-center text-black text-sm"
          >
            <img
              src="@/assets/images/nodata.svg"
              class="h-48 w-48"
              alt="no appointments"
            />
            <p class="text-black dark:text-white">
             
              {{ $t('translation.noTreatmentDone') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, onMounted, ref, inject } from 'vue'
import moment from 'moment'
import axios from 'axios'
import router from '../../router'
export default defineComponent({
  setup() {
    const treatments = ref([])
    const activeTab = ref()
    const loading = ref(true)
    const loadingTreatments = ref(true)

    const toggleAccordion = (tab) => {
      if (activeTab.value === tab) {
        activeTab.value = null
        return
      }
      activeTab.value = tab
    }

    onMounted(() => {
      console.log('component created')
      // this.loading = true
      const token = localStorage.getItem('token')

      const userId = localStorage.getItem('userID')
      const missing = 'missing'
      loading.value = true
      const data = {
        patientId: userId
      }
      axios
        .post('v1/donetreatments/get_done_treatments_by_patient_side', data, {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
          console.log('loading status detected')
          loading.value = false
          const client_treatments_all = res.data.payload[0]

          const client_treatments = client_treatments_all.tooth_sections

          const sections = JSON.parse(client_treatments)
          // const client_treatment_secs = sections[`${toothID}`]
          //   console.log('client treatments list last', res.data)
          //   const filteredData = res.data
          // treatments.value = res.data.payload
          //      Object.assign(
          //   treatments.value,
          //  res.data.payload
          // )
          console.log('client treatments created', treatments.value)
          // const filteredData = res.data.payload
          const filteredData = res.data.payload

          console.log('filteredData check kkk', filteredData)
          console.log('we are here filtered', treatments.value)
          filteredData.forEach((treatment) => {
            console.log('here now', treatment.tooth_sections)
            const treatmentBlob = JSON.parse(treatment.tooth_sections)
            console.log('treatmentBlob created later', treatmentBlob)
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
          loadingTreatments.value = false

          console.log('loading status', loading)
          loading.value = false
          loadingTreatments.value = false
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        // .catch(err => console.log(err))
        .catch(function (err) {
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
    })
    return {
      treatments,
      toggleAccordion,
      activeTab,
      loading
    }
  }
})
</script>

<style scoped lang="scss">
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
