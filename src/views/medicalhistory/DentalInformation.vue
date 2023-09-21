<template>
<div  class="">
    <!-- assessment -->
  <div class="grid grid-cols-7 gap-4 mt-3 mb-2">
    <div class="col-start-1 ml-4">
      <div class="font-semibold text-base text-yellow-650">Date</div>
    </div>
    <div class="col-start-2 col-span-5 ml-8">
      <div class="text-yellow-650 font-semibold text-base">Risk assesment history</div>
    </div>
    <div class="col-start-7">
      <div class="text-yellow-650 font-semibold text-base">By</div>
    </div>
  </div>




  <div >

    <div class="grid grid-cols-12 gap-6">
       <div class="col-span-12 2xl:col-span-3">
    <!-- date tabs -->
    <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
    <ul
      class="intro-y box bg-theme-36 p-5 mt-6 col-span-6 lg:col-span-3 2xl:col-span-2"
      :class="{ 'flex vertical-menu': variant === 'vertical' }"
    >

      <li
        v-for="(tab, index) in dentalInfoArr"
        :key="index"
        class="tab"
        :class="{
          inactive: index + 1 === activeTab,
          active: index + 1 !== activeTab,
        }"
      >
      
        <label
          :for="`${Date.now()}${index}`"
          class="tab text-slate-600 dark:text-slate-800 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1"
          :class="{
            inactive: index + 1 === activeTab,
            active: index + 1 !== activeTab,
          }"
          v-text="tab.date"
        ></label>
        <input
          type="radio"
          :name="`${Date.now()}-tab`"
          :id="`${Date.now()}${index}`"
          :value="index + 1"
          v-model="activeTab"
          style="display: none"
        />
      </li>
    </ul>
    </div>
   </div>

<div class="col-span-12 2xl:col-span-9">

    <!-- questions -->
    <template v-for="(details, index) in dentalInfoArr">
      <div :key="index" v-if="index + 1 === activeTab" class="tab-panel bg-gray-100 p-2 rounded-sm">
        <!-- {{ details }} -->
        <!-- <slot :name="`tabPanel-${index + 1}`" /> -->
        <DentalInfoComponent :info="details"/>
      </div>
    </template>
  </div>

</div>
</div>




   <div
                        class="container mx-auto justify-center mt-4"
                        style="display: none;
      align-items: center; text-align: center;"
                      >
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <button
                          style="background-color: #FF2400;"
                            type="reset"
                            data-dismiss="modal"
                            class="btn closeBTN btn-danger w-40 mr-auto bg-theme-43 text-white"
                          ><p class="">Cancel</p></button>

                          <!-- <button
                            type="reset"
                            class="btn clearBTN bg-theme-32  w-40 mr-auto text-white"
                          >Clear</button> -->
                          <button type="submit"  class="btn bg-theme-32 w-40 mr-auto text-white" @click="saveHistoryDental">
                            <LoadingIcon
                              v-if="loading"
                              icon="spinning-circles"
                              color="white"
                              class="w-4 h-4 ml-2"
                            />
                            <p data-dismiss="modal" class="text-white" v-else>Save</p>
                          </button>
                        </div>
                      </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import DentalInfoComponent from './DentalInfoComponent.vue';
import PatientsService from '@/service/patients.service';
import axios from 'axios'

export default defineComponent({
  components: {
    DentalInfoComponent,
  },
  props: {
    // dentalInfoArr: {
    //   required: true,
    // },
  },
   methods: {
  
    saveHistoryDental() {
console.log('questions dental', this.dentalInfoArr  )
const data = this.dentalInfoArr 
 const token = localStorage.getItem('token')
        this.loading = true
axios
          .post('patients/historydental',
            data ,
            {
              
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
            }
          )
          .then((response) => {
          
            if (response.data.status == true) {
          

          
              console.log('response url', response.data.payload.url)
          
            router.push('/dashboard')
            } else {
              this.loading = false
             
            }
            
            console.log('response', response)
         
          })
          .catch((error) => {
            console.log('Error', error)
            this.loading = false
          })

 },
 
 
 
 
 },
 
  setup() {

    const activeTab = ref(1);
    const variant = ref('horizontal');
    const dentalInfoArr = [{
        date: '20/05/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: true,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: false,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: false,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: true },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: true,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: true },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: true },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: true },
            ],
          },
          doctor: 'Kasujja Muhammed',
        },
        risks: {
          doctor: 'Dr. Kasujja Muhammed',
        },
      }, {
        date: '22/06/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: false,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: null,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: null,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: null },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: null,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: null },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: null },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: null },
            ],
          },
          doctor: 'Brandon Elijah',
        },
        risks: {
          doctor: 'Dr. Mariate Ndagire',
        },
      }, {
        date: '30/06/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: null,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: null,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: null,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: null },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: null,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: null },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: null },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: null },
            ],
          },
          doctor: 'Mariate Ndagire',
        },
        risks: {},
      }, {
        date: '30/07/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: null,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: null,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: null,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: null },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: null,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: null },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: null },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: null },
            ],
          },
          doctor: 'Benjamin Kooma',
        },
        risks: {},
      }];
    const getSlotName = (index) => `tabPanel-${index + 1}`;
   onMounted(() => {
    
    //   PatientsService.fetchDentalInformation().then((res) => {
    //     dentalInfoArr.value = res.data;
    //   });
      }
      
      );
    return {
      variant,
      activeTab,
      dentalInfoArr 
    };
  }})
</script>

<style scoped>
.tab-header {
  list-style: none;
  text-align: center;
  overflow: auto;
  white-space: nowrap;
  padding: 3px;
  background: var(--primary);
  border-radius: 5px;
  margin-bottom: 30px;
}

.vertical-menu {
  align-items: center;
  margin-bottom: 6px;
}

.tab {
  
  padding: 3px 4px;
  cursor: pointer;
  border-radius: 5px;
}

.tab.active {
  width: 100%;
  background: var(--primary);
  color: white;
}

/* .tab & .inactive are in the same class attribute */
.tab.inactive {
  width: 100%;
  background: white;
  color: var(--primary);
}
/* .tab-body {
  padding: 5px 10px;
} */
.flex .tab-header {
  background: white;
  flex-basis: 15%;
}
/* .tab-panel is decendant of .flex */
.flex .tab-panel {
  flex-basis: 85%;
}
/*
.flex .tab-panel::not(.vertical-menu){
  flex-wrap: wrap;
} */
.input-disabled {
  pointer-events: none;
}
</style>
