<template>
  <div class>
    <div class="grid grid-cols-12 gap-6">
    
      <!-- first -->
      <div id="intake_questions" class="col-span-12 2xl:col-span-6">
        <div
          class="p-2 rounded-sm"
          v-for="(q, index) in questions.slice(0,15)"
          :key="q.no"
          :class="{'bg-gray-200 dark:bg-gray-800': index % 2 == 0}"
        >
          <h5
            class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
          >{{ q.no }} {{ q.question }}</h5>
          <form class="flex items-center p-2">
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
            >
              Yes
              <input type="radio" :name="q.no" value="true" v-model="q.status" :disabled="toggle"/>
            </label>
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
            >
              No
              <input type="radio" :name="q.no" value="false" v-model="q.status" :disabled="toggle"/>
            </label>
          </form>
          <div v-if="q.status == 'true'">
            <div class="gap-2 ml-3" v-for="other in q.others" :key="other.no">
              <h5
                class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
              >{{ other.no }} {{ other.question }}</h5>
              <div class="flex items-center pl-4 pt-2">
                <label
                  class="font-sans text-gray-800 dark:text-white dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
                >
                  Yes
                  <input type="radio" :name="other.no" value="true" v-model="other.status" :disabled="toggle"/>
                </label>
                <label
                  class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
                >
                  No
                  <input type="radio" :name="other.no" value="false" v-model="other.status" :disabled="toggle"/>
                </label>
              </div>
              <div v-if="other.status == 'true' && other.sub">
                <h5
                  class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
                >{{ other.sub.no }} {{ other.sub.question }}</h5>
                <div class="flex items-center pt-2 pb-2">
                  <label
                    class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 w-full input-disabled"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :name="other.sub.no"
                      v-model="other.sub.value"
                      :disabled="toggle"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2"></div>
        </div>
      </div>

      <!-- second -->
      <div id="intake_questions_2" class="col-span-12 2xl:col-span-6">
        <div
          class="p-2 rounded-sm"
          v-for="(q, index) in questions.slice(-15)"
          :key="q.no"
          :class="{'bg-gray-200 dark:bg-gray-800 dark:text-white': index % 2 !== 0}"
        >
          <h5
            class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
          >{{ q.no }} {{ q.question }}</h5>
          <form class="flex items-center p-2">
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
            >
              Yes
              <input type="radio" :name="q.no" value="true" v-model="q.status" :disabled="toggle"/>
            </label>
            <label
              class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
            >
              No
              <input type="radio" :name="q.no" value="false" v-model="q.status" :disabled="toggle"/>
            </label>
          </form>
          <div v-if="q.status == 'true'">
            <div class="gap-2 ml-3" v-for="other in q.others" :key="other.no">
              <h5
                class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
              >{{ other.no }} {{ other.question }}</h5>
              <div class="flex items-center pl-4 pt-2">
                <label
                  class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 input-disabled"
                >
                  Yes
                  <input type="radio" :name="other.no" value="true" v-model="other.status" :disabled="toggle"/>
                </label>
                <label
                  class="font-sans text-gray-800 dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-20 input-disabled"
                >
                  No
                  <input type="radio" :name="other.no" value="false" v-model="other.status" :disabled="toggle"/>
                </label>
              </div>
              <div v-if="other.status == 'true' && other.sub">
                <h5
                  class="font-sans font-medium text-gray-800 dark:text-white text-xs lg:text-sm"
                >{{ other.sub.no }} {{ other.sub.question }}</h5>
                <div class="flex items-center pt-2 pb-2">
                  <label
                    class="font-sans  dark:text-white text-xs lg:text-sm 2xl:text-sm break-words ml-2 w-full input-disabled"
                  >
                    <input
                      type="text"
                      class="form-control"
                      :name="other.sub.no"
                      v-model="other.sub.value"
                      :disabled="toggle"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2"></div>
        </div>
      </div>
    </div>

    <div
      class="container mx-auto justify-center mt-4"
      style="display: flex;
      align-items: center; text-align: center;"
      v-if="saveStatus"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          style="background-color: #FF2400;"
          type="reset"
          data-dismiss="modal"
          class="btn closeBTN btn-danger w-40 mr-auto bg-theme-43 text-white"
        >
          <p class>Cancel</p>
        </button>

        <!-- <button
                            type="reset"
                            class="btn clearBTN bg-theme-32  w-40 mr-auto text-white"
        >Clear</button>-->
        <button type="submit" class="btn bg-theme-32 w-40 mr-auto text-white" @click="saveHistory">
          <LoadingIcon v-if="loading" icon="spinning-circles" color="white" class="w-4 h-4 ml-2" />
          <p data-dismiss="modal" class="text-white" v-else>Save</p>
        </button>
      </div>
    </div>
   
    <div id="failed-notification-history" class="toastify-content hidden flex">
      <XCircleIcon class="text-theme-6" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Failed</div>
        <div class="text-gray-600 mt-1">Failed,Please check the filled form.</div>
      </div>
    </div>
    <div id="successhistory-notification-content" class="toastify-content hidden flex">
      <CheckCircleIcon class="text-theme-9" />
      <div class="ml-4 mr-4">
        <div class="font-medium">History Added Successfully</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import $ from 'jquery'
import Toastify from 'toastify-js'
import router from '../../router'
// import $ from 'cash-dom'
export default defineComponent({
  methods: {
    saveHistory() {
      this.loadingbutton= true
      console.log('questions', this.questions)
      // const questions = this.questions
      const token = localStorage.getItem('token')
     
      axios
        .post(
          '/patients/history/store',
          { questions: this.questions },
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        )
        .then(response => {
          this.loadingbutton= false
          if (response.data.status == true) {
            console.log('response url', response.data.payload.url)

           
    
            Toastify({
                node: $('#successhistory-notification-content')
                  .clone()
                  .removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
              }).showToast()
              router.go({
                name: 'side-menu-medical-history'
              })
           
          } else {
            this.loadingbutton= false
            Toastify({
                node: $('#failed-notification-history')
                  .clone()
                  .removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
              }).showToast()
             
          }
           
          

          console.log('response', response)
        })
        .catch(error => {
          console.log('Error', error)
          this.loadingbutton= false
        })
    },
     getHistory() {
      const token = localStorage.getItem('token')
     
      axios
        .post('patients/history/all', {}, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        .then(response => {
          if (response.data.status == true) {
            const resdata=response.data.payload
            this.loadingbutton= false
           
    
           
          } else {
           
             
          }

          console.log('response', response)
        })
        .catch(error => {
          console.log('Error', error)
          loadingbutton.value= false
        })
    }
  },
   created(){
    // this.getHistory() 
    },
  mounted(){
    this.getHistory() 
    },
  setup() {
    const questions = ref([
      {
        no: '1.0.1',
        question:
          'Do you experience any pain or pressure in your chest during mild effort (angina pectoris)?',
        status: null,
        others: [
          {
            no: '1.1',
            question: 'Did you have to reduce your activity level?',
            status: null
          },
          {
            no: '1.2',
            question: 'Have above mentioned complaints increased recently?',
            status: null
          },
          {
            no: '1.3',
            question: 'Do you have similar complaints while resting?',
            status: null
          },
          {
            no: '1.4',
            question:
              'Did you experience angina pectoris again, despite a bypass-operation, angioplasty or laser therapy?',
            status: null
          }
        ]
      },
      {
        no: '2.0',
        question: 'Did you suffer from a heart attack or cardiac arrest?',
        status: null,
        others: [
          {
            no: '2.1',
            question: 'Did you experience any complications afterwards?',
            status: null,
            sub: {
              no: '2.1a',
              question: 'Which complications?',
              value: null
            }
          },
          {
            no: '2.2',
            question: 'Do you still experience complaints?',
            status: null
          },
          {
            no: '2.3',
            question:
              'Did you suffer from a heart attack in the previous 6 months?',
            status: null
          }
        ]
      },
      {
        no: '3.0',
        question:
          'Do you suffer from a heart murmur, cardiac valve/ventricle problems?',
        status: null
      },
      {
        no: '4.0',
        question:
          'Do you have an artificial hip or artificial heart valve (annuloplasty)?',
        status: null
      },
      {
        no: '5.0',
        question: 'Did you undergo vascular surgery in the previous 6 months?',
        status: null,
        others: [
          {
            no: '5.1',
            question: 'Do you require antibiotics during dental treatment?',
            status: null
          },
          {
            no: '5.2',
            question:
              'Do you have any complaints as a result of your annuloplasty and/or heart valve replacement?',
            status: null
          }
        ]
      },
      {
        no: '6.0',
        question:
          'Do you experience any palpitations or signs of an increased heart rate while in rest position?',
        status: null,
        others: [
          {
            no: '6.1',
            question: 'Do you need to lay down or sit down between seizures?',
            status: null
          },
          {
            no: '6.2',
            question:
              'Do you become pale, dizzy or get short of breath during seizures?',
            status: null
          }
        ]
      },
      {
        no: '7.0',
        question: 'Do you suffer from any kind of heart failure or waekness?',
        status: null,
        others: [
          {
            no: '7.1',
            question: 'Do you experience swollen feet at night?',
            status: null
          },
          {
            no: '7.2',
            question: 'Do you have to urinate more than 2-times per night?',
            status: null
          },
          {
            no: '7.3',
            question:
              'Do you have to sleep with more than two pillows, because you otherwise get short of breath or wheezy?',
            status: null
          },
          {
            no: '7.4',
            question:
              'Do you wake up at night as a result of being short of breath?',
            status: null
          }
        ]
      },
      {
        no: '8.0',
        question: 'Do you have a high blood pressure?',
        status: null,
        others: [
          {
            no: '8.1',
            question: 'Is your systolic value usually between 160 and 200? ',
            status: null
          },
          {
            no: '8.2',
            question: 'Is your systolic value usually between 160 and 200? ',
            status: null
          },
          {
            no: '8.3',
            question: 'Is your systolic value usually 200 or higher?',
            status: null
          },
          {
            no: '8.4',
            question: 'Is your diastolic value usually 115 or higher?',
            status: null
          }
        ]
      },
      {
        no: '9.0',
        question:
          'Did you experience any type of paralysis (stroke or attack) or speech impediments?',
        status: null,
        others: [
          {
            no: '9.1',
            question:
              'Did you experience any similar type of complaints that lasted less 24 hours?',
            status: null
          },
          {
            no: '9.2',
            question:
              'Did you experience any type of paralysis (stroke or attack) over the last 6 months?',
            status: null
          }
        ]
      },
      {
        no: '10.0',
        question:
          'Did you experience any type of paralysis (stroke or attack) over the last 6 months?',
        status: null
      },
      {
        no: '11.0',
        question: 'Do you use medicine against epilepsy?',
        status: null,
        others: [
          {
            no: '11.1',
            question: 'Do you regularly change your medication?',
            status: null
          },
          {
            no: '11.2',
            question:
              'Do you regularly suffer from seizures despite your usage of medicine?',
            status: null
          }
        ]
      },
      {
        no: '12.0',
        question: 'Do you suffer from hyperventilation?',
        status: null
      },
      {
        no: '13.0',
        question: 'Do you suffer from asthma?',
        status: null,
        others: [
          {
            no: '13.1',
            question: 'Do you currently suffer from asthma?',
            status: null
          }
        ]
      },
      {
        no: '14.0',
        question: 'Do you use medicine against epilepsy?',
        status: null,
        others: [
          {
            no: '14.1',
            question:
              'Do you cough up more than one coffee cup of mucus or phlegm per day?',
            status: null
          },
          {
            no: '14.2',
            question:
              'Are you out of breath while climbing the stairs after about 20 steps?',
            status: null
          },
          {
            no: '14.3',
            question: 'Do you experience short of breath while dressing?',
            status: null
          }
        ]
      },
      {
        no: '15.0',
        question: 'Do you suffer from pollinosis – hay fever?',
        status: null
      },
      {
        no: '16.0',
        question:
          'Have you ever experienced an allergic reaction after using specific medicines or after using medical substances/products such as iodine, rubber, or band aids?',
        status: null,
        others: [
          {
            no: '16.1',
            question: 'Do you use medicines for your allergies?',
            status: null
          },
          {
            no: '16.2',
            question: 'Are you allergic to penicillin or antibiotics?',
            status: null
          },
          {
            no: '16.3',
            question:
              'Did your allergy occur while receiving local anesthetics?',
            status: null
          },
          {
            no: '16.4',
            question: 'Did your allergy occur while visiting your dentist?',
            status: null
          },
          {
            no: '16.5',
            question:
              'Can you be specific about your allergies you are currently suffering from?',
            status: null,
            sub: {
              no: '16.5a',
              question: 'Which allergies?',
              value: null
            }
          }
        ]
      },
      {
        no: '17.0',
        question: 'Do you have diabetes?',
        status: null,
        others: [
          {
            no: '17.1',
            question: 'Are you using insulin?',
            status: null
          },
          {
            no: '17.2',
            question:
              'Are you regularly distraught (hypertense/hyperglycemia)?',
            status: null
          },
          {
            no: '17.3',
            question:
              'Are you currently receiving treatment for cardiovascular complications as a result of diabetes?',
            status: null
          }
        ]
      },
      {
        no: '18.0',
        question: 'Are you diagnosed with an enhanced thyroid function?',
        status: null,
        others: [
          {
            no: '18.1',
            question:
              'Are you currently being treated or under control for this?',
            status: null
          },
          {
            no: '18.2',
            question: 'Do you suffer from complaints despite the treatment?',
            status: null
          }
        ]
      },
      {
        no: '19.0',
        question: 'Have you been diagnosed with a reduced thyroid function?',
        status: null,
        others: [
          {
            no: '19.1',
            question:
              'Are you currently being treated or under control for this?',
            status: null
          },
          {
            no: '19.2',
            question: 'Do you suffer from complaints despite the treatment?',
            status: null
          }
        ]
      },
      {
        no: '20.0',
        question: 'Do you suffer from any type of liver disease?',
        status: null,
        others: [
          {
            no: '20.1',
            question:
              'Have you suffered from this liver disease for more than six months?',
            status: null
          },
          {
            no: '20.2',
            question:
              'Are you on a specific diet or are taking any medicines because of this liver disease?',
            status: null
          }
        ]
      },
      {
        no: '21.0',
        question:
          'Do you suffer from a chronic kidney disease which requires you to follow a specific diet?',
        status: null,
        others: [
          {
            no: '21.1',
            question: 'Do you have renal replacement therapy?',
            status: null
          }
        ]
      },
      {
        no: '22.0',
        question:
          'Do you suffer from chronic stomach complaints and as a result have lost more than 5 kilograms in weight?',
        status: null,
        others: [
          {
            no: '22.1',
            question: 'Are you experiencing diarrhea for more than 6 months?',
            status: null
          }
        ]
      },
      {
        no: '23.0',
        question:
          'Are you currently suffering from any type of contagious disease?',
        status: null,
        others: [
          {
            no: '23.1',
            question: 'Do you know which contagious disease?',
            status: null,
            sub: {
              no: '23.1a',
              question: 'Which?',
              value: null
            }
          }
        ]
      },
      {
        no: '24.0',
        question:
          'Do you suffer from anemia combined with complaints (fatigue/dizziness)?',
        status: null
      },
      {
        no: '25.0',
        question:
          'Are you suffering from any type of malignant lymph node or blood disease?',
        status: null,
        others: [
          {
            no: '25.1',
            question: 'Do you know which malignant disease?',
            status: null,
            sub: {
              no: '25.1a',
              question: 'Which?',
              value: null
            }
          },
          {
            no: '25.2',
            question: 'Are you currently being treated for this disease?',
            status: null
          },
          {
            no: '25.3',
            question: 'Are you suffering from fever during seizures?',
            status: null
          }
        ]
      },
      {
        no: '26.0',
        question:
          'Are you prone to an elevated level of haemorrhage or tend to bleed?',
        status: null,
        others: [
          {
            no: '26.1',
            question:
              'Does the bleeding last more than 1 hour in your experience after the injury or treatment?',
            status: null
          },
          {
            no: '26.2',
            question: 'Do you bruise easily or spontaneous?',
            status: null
          }
        ]
      },
      {
        no: '27.0',
        question:
          'Did you receive any type of radiation for any kind of tumor, abscess or swelling on your head or neck?',
        status: null,
        others: [
          {
            no: '27.1',
            question: 'Was this radiation done within the last 5 years?',
            status: null
          }
        ]
      },
      {
        no: '28.0',
        question: 'Are you using any type of medicines at the moment?',
        status: null,
        others: [
          {
            no: '28.1',
            question: 'For your heart?',
            status: null
          },
          {
            no: '28.2',
            question: 'Are you receiving any treatment for thrombosis?',
            status: null
          },
          {
            no: '28.3',
            question: 'For high blood pressure?',
            status: null
          },
          {
            no: '28.4',
            question: 'Aspirins or pain-relieving drugs/analgesics?',
            status: null
          },
          {
            no: '28.5',
            question: 'For diabetes?',
            status: null
          },
          {
            no: '28.6',
            question:
              'Prednison, corticosteroids or any other anti-inflammatory agents?',
            status: null
          },
          {
            no: '28.7',
            question: 'Medicines against cancer or bleeding diseases?',
            status: null
          },
          {
            no: '28.8',
            question: 'Penicillin or antibiotics?',
            status: null
          },
          {
            no: '28.9',
            question: 'Sedatives, sleeping pills, antidepressants?',
            status: null
          },
          {
            no: '28.10',
            question: 'Do you use any other medicine?',
            status: null,
            sub: {
              no: '28.10a',
              question: 'Which other medicine?',
              value: null
            }
          },
          {
            no: '28.11',
            question: 'Do you use sedative drugs daily?',
            status: null
          },
          {
            no: '28.12',
            question: 'Consume more than 5 alcoholic bevereages per day?',
            status: null
          },
          {
            no: '28.13',
            question:
              'Prefention of bone decalcification (osteroporosis). If YES: how long have you been using these medicines?',
            status: null,
            sub: {
              no: '28.13a',
              question: 'How long?',
              value: null
            }
          }
        ]
      },
      {
        no: '29.0',
        question: 'Are you a smoker?',
        status: null,
        others: [
          {
            no: '29.1',
            question: 'Do you how much a day?',
            status: null,
            sub: {
              no: '29.1a',
              question: 'How much?',
              value: null
            }
          }
        ]
      },
      {
        no: '30.0',
        question:
          'Are you currently undergoing treatment in a hospital, or have recently visited a hospital, for injections to prevent bone decalcification (osteoporosis)?',
        status: null
      }
    ])
 
    return {
      questions
      
    }
  },
  data() {
    return {
      loading: false,
      saveStatus: true,
      toggle: false,
      loadingbutton : false
    }
  }
})
</script>
<style scoped>
 
input[type="radio"]:disabled {
    -webkit-appearance: none;
    display: inline-block;
    width: 12px;
    height: 12px;
    padding: 2px;
    background-clip: content-box;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 50%;
}

input[type="radio"]:checked {
    background-color: 	#007bff;
     border: 1px solid 	#007bff;
}
</style>