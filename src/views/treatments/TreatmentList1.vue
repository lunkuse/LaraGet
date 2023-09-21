<template>
  <div class="grid-cols-12">
    <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
      <div class="rounded-sm px-3">
        <div class="overflow````-x-auto```` relative mt-3">
          <ul class="divide-y divide-gray-200">
            <div
              class="accordion accordion-boxed p-2"
              v-for="(data, index) in treatments"
              :key="data.id"
            >
              <div
                class="accordion__header bg-white is-active:bg-white hover:bg-white dark:bg-gray-800 accordion-button collapsed"
                :class="{ 'is-active': index == activeTab }"
                :id="data.id"
                @click="toggleAccordion(index)"
              >
                <span class="font-semibold text-xl mt-1">{{ data.title }}</span>
                <div class="date_hint flex h-full items-center">
                  <p class="font-semibold pr-4">
                    {{data.currency}} {{
                    data.treatments
                    .map((t) => t.amount)
                    .reduce((curr, acc) => curr + acc)
                    }}
                  </p>
                  <p v-if="index !== activeTab" class="pr-2">{{ data.date }}</p>
                  <i
                    class="accordion__toggle bg-black dark:bg-white before:bg-black dark:before:bg-white"
                  ></i>
                </div>
              </div>
              <div
                class="accordion__body accordion-item"
                :class="{ 'is-active': index == activeTab }"
              >
                <!-- header -->
                <div class="grid grid-cols-6 gap-4 mb-3 mt-2 accordion-header accordion-button">
                  <div class="text-black dark:text-white mb-2">Date</div>
                  <div class="col-start-2 col-span-4">
                    <div class="grid grid-cols-6">
                      <div class="col-start-1 col-span-4">
                        <div class="text-black dark:text-white mb-2">Subject</div>
                      </div>
                      <div>
                        <div class="text-black dark:text-white mb-2">EL</div>
                      </div>
                      <div>
                        <div class="text-black dark:text-white mb-2">Amount</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="text-black dark:text-white mb-2">By</div>
                  </div>
                </div>
                <!-- body -->
                <div
                  v-for="(treatment, index) in data.treatments"
                  class="grid grid-cols-6 gap-4 mb-4 mt-2 accordion-body"
                  :key="index"
                >
                  <div>
                    <div>{{ data.date }} {{ treatment.time }}</div>
                  </div>
                  <div class="col-start-2 col-span-4">
                    <div class="grid grid-cols-6">
                      <div class="col-start-1 col-span-4">
                        <div class="mr-2">{{ treatment.subject }}</div>
                      </div>
                      <div>
                        <div>{{ treatment.element }}</div>
                      </div>
                      <div>
                        <div>{{ treatment.amount }}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>{{ treatment.doctor }}</div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import PatientsService from '@/service/patients.service'
import axios from 'axios'
export default defineComponent({
  setup() {
    const treatments = ref([])
    const activeTab = ref()
    const toggleAccordion = tab => {
      if (activeTab.value === tab) {
        activeTab.value = null
        return
      }
      activeTab.value = tab
    }
    onMounted(() => {
      PatientsService.fetchTreamentHistory().then(res => {
        treatments.value = res.data
      })

      // this.loading = true
      const token = localStorage.getItem('token')

      const userId = localStorage.getItem('userID')
      const missing = 'missing'

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
        .then(res => {
          const client_treatments_all = res.data.payload[0]

          const client_treatments = client_treatments_all.tooth_sections

          const sections = JSON.parse(client_treatments)
          // const client_treatment_secs = sections[`${toothID}`]
          console.log('client treatments list', sections)

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
            this.$router.go('/login')
          } else {
            // Handle else
          }
        })
    })
    return {
      treatments,
      toggleAccordion,
      activeTab
    }
  }
})
</script>

<style scoped>
.accordion__header {
  padding: 1em;
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
}

.accordion__header:hover {
}
.accordion__toggle {
  margin-left: 10px;
  height: 3px;
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
}
.accordion__body.is-active {
  display: block;
}
</style>
