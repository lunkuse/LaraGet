<template>
  <div>
    <div class="intro-y box lg:mt-5 box">
      <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 class="font-medium text-base mr-auto">Treatment Details</h2>
      </div>
      <div class>

        <!-- loader text -->
        <span v-if="loading" class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10">
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>{{ $t('translation.loading')}}..</span>
        </span>
        <div class="accordion accordion-boxed p-5" id="_vtzr7pnsd" v-if="!loading">
          <div class="accordion-item" v-if="client_treatment.restoration">
            <div class="accordion-header" id="_xsb6novs1">
              <button
                class="accordion-button"
                type="button"
                aria-expanded="true"
                data-tw-toggle="collapse"
                data-tw-target="_us7yfljlt"
                aria-controls="_us7yfljlt"
              >{{ $t('translation.restoration_text')}}</button>
            </div>
            <div
              class="accordion-collapse collapse show"
              id="_us7yfljlt"
              aria-labelledby="_xsb6novs1"
              data-tw-parent="_vtzr7pnsd"
              style="display: block;"
            >










            
              <table class="table table-report -mt-2 responsive"
               style="
              width: 100%;
              overflow-x: auto;
              white-space: nowrap;
              left: 0;
              right: 0;
            "
              >
                <thead>
                  <tr class="hover:bg-gray-200 flex-1 zoom-in">
                    <th class="whitespace-nowrap">visit ID</th>

                    <th class="whitespace-nowrap">{{client_treatments_all.visit_id}}</th>
                  </tr>
                </thead>
                <tbody class="overflow-x-auto relative">
                  <tr class="hover:bg-gray-200 zoom-in">
                    <td class>
                      <div class="font-medium whitespace-nowrap">Filling</div>
                    </td>

                    <td class>
                      <div
                        v-for="object  in client_treatment.restoration.filling"
                        :key="object"
                        class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"
                        style="display:inline;"
                      >
                        <span
                          class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                        >{{object}}</span>
                      </div>
                    </td>
                  </tr>
                  <tr class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                    <td class="whitespace-nowrap font-medium">
                      <div class="font-medium whitespace-nowrap">Treatment Price</div>
                    </td>

                    <td class>{{client_treatments_all.treatment_price}}</td>
                  </tr>
                  <tr class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                    <td class>
                      <div class="font-medium whitespace-nowrap">Date</div>
                    </td>

                    <td
                      class="whitespace-nowrap font-medium"
                    >{{moment(client_treatments_all.created_at).format("DD-MM-YYYY")}}</td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap">
                      <div class="font-medium whitespace-nowrap">Treatment Complete</div>
                    </td>

                    <td class="whitespace-nowrap">{{client_treatments_all.treatment_complete}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                <!-- {{client_treatment.restoration}} -->
                <!-- <h4 class="font-bold font-medium">Filling</h4>
              <div v-for="object  in client_treatment.restoration.filling" :key="object">
                <span>{{object}}</span>-->
                <!-- <div v-for="objects  in object"  :key="objects">
        {{objects}}
                </div>-->
                <!-- </div> -->
              </div>
            </div>
          </div>












          <div class="accordion-item" v-if="client_treatment.pathology">
            <div class="accordion-header" id="_q58h3f1km">
              <button
                class="accordion-button collapsed"
                type="button"
                aria-expanded="false"
                data-tw-toggle="collapse"
                data-tw-target="_efeegulih"
                aria-controls="_efeegulih"
              >Pathology</button>
            </div>
            <div
              class="accordion-collapse collapse"
              id="_efeegulih"
              aria-labelledby="_q58h3f1km"
              data-tw-parent="_vtzr7pnsd"
              style="display: none;"
            >
              <div class="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                <h4 class="font-bold font-medium">Decay</h4>
                <div>
                <!-- <div v-for="object  in client_treatment.pathology.decay" :key="object"> -->
                  <!-- <span>{{object}}</span>  -->
                  <!-- <div v-for="objects  in object"  :key="objects">
        {{objects}}
                  </div>-->
                  <table class="table table-report -mt-2"  >
                    <thead>
                      <tr class="hover:bg-gray-200 flex-1 zoom-in">
                        <th class="whitespace-nowrap">visit ID</th>

                        <th class="whitespace-nowrap">{{client_treatments_all.visit_id}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="hover:bg-gray-200 zoom-in">
                        <td class>
                          <div class="font-medium whitespace-nowrap">Decay</div>
                        </td>

                        <td class>
                          <div
                            v-for="object  in client_treatment.pathology.decay"
                            :key="object"
                            class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"
                            style="display:inline;"
                          >
                            <span
                              class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                            >{{object}}</span>
                          </div>
                        </td>
                      </tr>
                      <tr class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                        <td class="whitespace-nowrap font-medium">
                          <div class="font-medium whitespace-nowrap">Treatment Price</div>
                        </td>

                        <td class>{{client_treatments_all.treatment_price}}</td>
                      </tr>

                      <tr>
                        <td class="whitespace-nowrap">
                          <div class="font-medium whitespace-nowrap">General notes</div>
                        </td>

                        <td
                          class="whitespace-nowrap"
                        >{{JSON.parse(this.client_treatments_all.tooth_sections).general_notes}}</td>
                      </tr>

                      <tr class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                        <td class>
                          <div class="font-medium whitespace-nowrap">Date</div>
                        </td>

                        <td
                          class="whitespace-nowrap font-medium"
                        >{{moment(client_treatments_all.created_at).format("DD-MM-YYYY")}}</td>
                      </tr>

                      <tr>
                        <td class="whitespace-nowrap">
                          <div class="font-medium whitespace-nowrap">Treatment Complete</div>
                        </td>

                        <td class="whitespace-nowrap">{{client_treatments_all.treatment_complete}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>















          <div class="accordion-item" v-if="client_treatment.periodontal">
            <div class="accordion-header" id="_q58h3f1km">
              <button
                class="accordion-button collapsed"
                type="button"
                aria-expanded="false"
                data-tw-toggle="collapse"
                data-tw-target="_efeegulih"
                aria-controls="_efeegulih"
              >periodontal</button>
            </div>
            <div
              class="accordion-collapse collapse"
              id="_efeegulih"
              aria-labelledby="_q58h3f1km"
              data-tw-parent="_vtzr7pnsd"
              style="display: none;"
            >
              <div class="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                <table class="table table-report -mt-2">
                  <thead>
                    <tr class="hover:bg-gray-200 flex-1 zoom-in">
                      <th class="whitespace-nowrap">visit ID</th>

                      <th class="whitespace-nowrap">{{client_treatments_all.visit_id}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="hover:bg-gray-200 zoom-in">
                      <td class>
                        <div class="font-medium whitespace-nowrap"> {{ $t('translation.implant_text') }}</div>
                      </td>

                      <td class v-if="client_treatment.periodontal.implant">
                        <div
                          class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"
                          style="display:inline;"
                        >
                          <span
                            v-if="client_treatment.periodontal.implant.front"
                            class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                          >Front: {{client_treatment.periodontal.implant.front}}</span>
                          <span
                            v-if="client_treatment.periodontal.implant.back"
                            class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                          >Back: {{client_treatment.periodontal.implant.back}}</span>
                        </div>
                      </td>
                    </tr>

                    <tr class="hover:bg-gray-200 zoom-in">
                      <td class>
                        <div class="font-medium whitespace-nowrap">Decay</div>
                      </td>

                      <td class>
                        <div
                          v-for="object  in client_treatment.periodontal"
                          :key="object"
                          class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"
                          style="display:inline;"
                        >
                          <span
                            v-if="object.front"
                            class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                          >Front: {{object.front}}</span>
                          <span
                            v-if="object.back"
                            class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                          >Back: {{object.back}}</span>
                        </div>
                      </td>
                    </tr>
                    <tr
                      class="hover:bg-gray-200 zoom-in"
                      v-if="client_treatment.periodontal.plaque"
                    >
                      <td class>
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.plaque_text') }}</div>
                      </td>

                      <td class>
                        <div
                          v-for="object  in client_treatment.periodontal.plaque"
                          :key="object"
                          class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"
                          style="display:inline;"
                        >
                          <span
                            class="btn w-auto inline-block mr-1 mb-2 text-gray-900 bg-white"
                          >{{object}}</span>
                        </div>
                      </td>
                    </tr>
                    <tr class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                      <td class="whitespace-nowrap font-medium">
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.treatment_price_text') }}</div>
                      </td>

                      <td class>{{client_treatments_all.treatment_price}}</td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap">
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.general_notes_text') }}</div>
                      </td>

                      <td
                        class="whitespace-nowrap"
                      >{{JSON.parse(this.client_treatments_all.tooth_sections).general_notes}}</td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap">
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.risk_assesment_text') }}</div>
                      </td>

                      <td
                        class="whitespace-nowrap"
                      >{{JSON.parse(this.client_treatments_all.tooth_sections).risk_assessment}}</td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap">
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.recommended_treatment_text') }} </div>
                      </td>

                      <td
                        class="whitespace-nowrap"
                      >{{JSON.parse(this.client_treatments_all.tooth_sections).recommended_treatment}}</td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap">
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.treatment_code_text') }}</div>
                      </td>

                      <td
                        class="whitespace-nowrap"
                      >{{JSON.parse(this.client_treatments_all.tooth_sections).treatment_code}}</td>
                    </tr>

                    <tr class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                      <td class>
                        <div class="font-medium whitespace-nowrap">{{ $t('translation.date_text') }}</div>
                      </td>

                      <td
                        class="whitespace-nowrap font-medium"
                      >{{moment(client_treatments_all.created_at).format("DD-MM-YYYY")}}</td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap">
                        <div class="font-medium whitespace-nowrap">Treatment Complete</div>
                      </td>

                      <td class="whitespace-nowrap">{{client_treatments_all.treatment_complete}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="accordion-item" v-if="client_treatment.missing">
            <div class="accordion-header" id="_e6sdyjrck">
              <button
                class="accordion-button collapsed"
                type="button"
                aria-expanded="false"
                data-tw-toggle="collapse"
                data-tw-target="_jy4y424h6"
                aria-controls="_jy4y424h6"
              >Missing?</button>
            </div>
            <div
              class="accordion-collapse collapse"
              id="_jy4y424h6"
              aria-labelledby="_e6sdyjrck"
              data-tw-parent="_vtzr7pnsd"
              style="display: none;"
            >
              <div class="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">no.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import axios from 'axios'
import moment from 'moment'
import Toastify from 'toastify-js'
import Payment from '@/components/payments/Pay.vue'

import $ from 'jquery'

export default defineComponent({
  components: {
    Payment
  },
  props: ['toothId'],
  data() {
    return {
      loading: false,
      client_treatment: [],
      client_treatments_all: [],
      missingStatus: ''
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
    moment,

    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },

    // Getting All transactions
    getTreatment() {
      this.loading = true
      const token = localStorage.getItem('token')
      const toothID = this.$route.params.toothId
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
          this.loading = false
          // Object.assign(this.client_treatment, res.data.payload)
          this.client_treatments_all = res.data.payload[0]
          const client_treatments = this.client_treatments_all.tooth_sections

          //      this.client_treatment  = client_treatments.filter(
          //   element => element.id === id
          // )[0]
          console.log('section client_treatments', typeof client_treatments)
          const sections = JSON.parse(client_treatments)
          this.client_treatment = sections[`${toothID}`]
          this.missingStatus = sections.missing
          console.log(
            'this.missingStatus',
            JSON.parse(client_treatments).missing
          )

          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        // .catch(err => console.log(err))
        .catch(function(err) {
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
    }
  },
  created() {
    // this.getTreatment()
  },
  mounted() {
    this.getTreatment()
  }
})
</script>
<style lang="scss">
.accordion.accordion-boxed .accordion-item {
  border-width: 2px;
  border-radius: 15px;
  border-color: #5f5d5d !important;
}
</style>