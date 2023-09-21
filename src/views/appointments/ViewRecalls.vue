<template>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 ">
    <div class="h-15 max-w-full rounded-lg border-3 border-gray-700 in tro-y box p-1 ">
        <div class="grid grid-cols-2 gap-4">

  <div class="bg-blue-500 p-4">{{ $t('translation.total_text') }}</div>
  <div class="bg-green-500 text- p-4">
    <div class="flex items-center justify-center">
      <!-- Icon -->
      <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zM2 12a2 2 0 112-2 2 2 0 01-2 2zm18 0a2 2 0 112-2 2 2 0 01-2 2zm-7-7a2 2 0 100-4 2 2 0 000 4z"></path>
      </svg>
    </div>
  </div>
</div>
     </div>

    <div class="h-15 max-w-full rounded-lg border-3 border-gray-700 in tro-y box p-1 ">
        <div class="grid grid-cols-2 gap-4">


  <div class="bg-blue-500 p-4">{{ $t('translation.upcoming_text') }}</div>
  <div class="bg-green-500 text- p-4">
    <div class="flex items-center justify-center">
      <!-- Icon -->
      <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zM2 12a2 2 0 112-2 2 2 0 01-2 2zm18 0a2 2 0 112-2 2 2 0 01-2 2zm-7-7a2 2 0 100-4 2 2 0 000 4z"></path>
      </svg>
    </div>
  </div>
</div>
     </div>

    <div class="h-15 max-w-full rounded-lg border-3 border-gray-700 int ro-y box p-1 ">
        <div class="grid grid-cols-2 gap-4">

  <div class="bg-blue-500 p-4">{{ $t('translation.missed_text') }}</div>
  <div class="bg-green-500 text- p-4">
    <div class="flex items-center justify-center">
      <!-- Icon -->
      <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zM2 12a2 2 0 112-2 2 2 0 01-2 2zm18 0a2 2 0 112-2 2 2 0 01-2 2zm-7-7a2 2 0 100-4 2 2 0 000 4z"></path>
      </svg>
    </div>
  </div>
</div>
     </div>

     
    
   
</div>

    <div class="mt-3 ma x-w-full rounded-lg border-3 border-gray-700 box p-1 ">
      <table class="table ">
          <thead class=" border-b border-gray-200  ">
            <!-- <th>Appointment ID</th> -->
            <th>{{ $t('translation.appointment_type_text') }} </th>
             <th>{{$t('translation.category_text')}}</th>
            <th>{{$t('translation.due_in')}}</th>
            <!-- <th>Period</th> -->
            <th>{{$t('translation.recall_date')}}</th>
            <th>{{$t('translation.doctor_text')}}</th>
            <th>{{$t('translation.status_text')}}</th>
            <th>{{$t('translation.action_text')}}</th>
          </thead>
          

          <tbody>
            <tr v-for=" ({id,treatmentType,recallCategory,status,duration,period,recallDate,doctor},i) in storeRecallDtaa">
              <!-- <td>APN<sub>0</sub>{{ id }}</td> -->
              <td>{{ treatmentType.title }}</td>
              <td>{{ recallCategory.category }}</td>
              <td>{{duration }}-{{period }}</td>
              <!-- <td>{{period }}</td> -->
              <td>{{recallDate }}</td>
              <td>{{doctor.first_name }} {{doctor.last_name }}</td>
              <td>
                <!-- {{status }}    -->
                {{ getStatus(status) }}</td>
              <td>
                
                <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="group inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <DotsHorizontalIcon
                class="h-6 w-6 cursor-pointer group-hover:text-gray-900"
              ></DotsHorizontalIcon>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <div class="px-1 py-1" @click="showAppDetail(i)">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[true ? 'bg-gray-200 text-yellow-650' : 'text-gray-900','group flex w-full items-center rounded-md px-2 py-2 text-sm']"
                  >
                    <MailOpenIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-yellow-650"
                      aria-hidden="true"
                    />
                    {{ $t('translation.overview_text') }}
                    
                  </button>
                </MenuItem>
                </div>
                <div>

                <MenuItem v-slot="{ active }" class="mt-1">
                  <button
                    :class="[
                      true ? 'bg-gray-200 text-yellow-650' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <CheckCircleIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-green-600 hover:bg-yellow-600"
                      aria-hidden="true"
                    />
                    {{ $t('translation.confirm_text') }}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>




              </td>

            </tr>
          </tbody>

        </table>


  
</div>







<div>

  
</div>




<DrawerSlotComponet @closeModaDrawer="closeDrawer" :showInvoiceModal="showModal">
  <!-- v-for=" ({id,treatmentType,recallCategory,duration,period,recallDate,doctor},i) in storeRecallDtaa" -->


    <div class="grid sm:grid-cols-2 md:grid-cols-3  gap-1 overflow-auto h-90 border-0 my-2 intro-y border-b-2 border-theme-3">
    <div  v-for=" (value,i) in isAppDetailVisible2"  :key="i" class="  border-r-2 border-theme-3  ">

<div  v-if="i !== 'id' && i !== 'employee_type'" >
   <div class=" "  >
    <span class='capitalize text-sm' >{{ i }} : {{ value }}</span>
     <!-- <span class='capitalize text-sm' > :  {{ value }} </span> -->
   </div>
   
 </div> 

</div> 
  </div>

  <div class="grid sm:grid-cols-1 md:grid-cols-2 my-3 bg-gray-100 rounded-sm px-3 gap-1 overflow-auto h-90 intro-y">
<!-- [branch,status,recallDate,period,duration,doctor,patient,treatmentType,recallCategory] -->


  <div  v-for=" (value,i) in isAppDetailVisible"  :key="i" class="my-3">

  <div class=" overflow-auto" v-if="(typeof value =='object' )"  >
    <!-- {{ value }}ffff -->
    <div class="border  text-center uppercase font-bold border-0 py-1 my-1 border-b-2">
      <span v-if="(i==='treatmentType')">Appointment Type</span>
     <span v-else>  {{ i }}</span>
    </div>
    <div class="  " v-for="(vals,key) of value">
    <!-- <div class="grid grid-cols-2 gap-1  " v-for="(vals,key) of value"> -->
     
      

        <!-- <div class=""  v-if="key !== 'id' && key !== 'employee_type'">{{ key.replace('_'," ").substr(0,15) }}</div> -->
        <span class=" py-1 capitalize "  v-if="key !== 'id' && key !== 'employee_type'"><span class=" font-bold">{{ key.replace('_'," ").substr(0,15) }}</span>: &nbsp; 
           {{/date/.test(key)?vals.replaceAll('T',' ').substr(0,19) :vals }}
          </span>
   

    </div>

  </div>
 <!-- <div v-else  v-if="key !== 'id' && key !== 'employee_type'" class="">
    <div class="grid grid-cols-2 gap-4 "  >
     <div class='uppercase' >{{ i }} </div>
      <div class='uppercase' > :  {{ value }} </div>
    </div>
    
  </div>  -->

</div> 
<!-- /////// -->

</div>

<div class="grid sm:grid-cols-2 md:grid-cols-5 overflow-auto h-90 border-0 mt-10 ">
  <div>
    <a 
   @click="ConfirRecallingApointment"
              class="btn mr-1 mb-2 bg-theme-32 text-white btn bg-theme-32 w-full  mr-auto text-white"
    >CONFIRM
                   
 </a>
 
  </div>
  <div>
    <!-- <button
                        type="RE-SCHEDULING"
                        class="btn bg-theme-34 w-full  mr-auto text-white"
                      >
                        <LoadingIcon
                          v-if="loading"
                          icon="spinning-circles"
                          color="white"
                          class="w-4 h-4 ml-2"
                        />
                        RE-SCHEDULING
                      </button> -->

  </div>
  </div>
  </DrawerSlotComponet>
  <a 
  :ref="myButtonRef"
  id="updateRecallAppointment"
    href="javascript:;"
                  data-toggle="modal"
                  data-target="#pomModalS1"
              class="btn mr-1 mb-2 bg-theme-32 hidden text-white btn bg-theme-32 w-full  mr-auto text-white"
    >CONFIRM
                   
 </a>
  




<!-- {{ MetailsIndexedRecalls }} -->
<schedulingAsssistant/>


</template>


<script setup>
import {useStore} from "vuex";
const store = useStore()
import axios from 'axios'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'


import {
  DotsHorizontalIcon,
  MailOpenIcon,
  ClockIcon,
  CheckCircleIcon
  
} from '@heroicons/vue/outline'
 
import { watch, ref, onMounted,provide } from 'vue'
import DrawerSlotComponet from '/src/components/ModalTrasition/index.vue'
import schedulingAsssistant from '/src/components/scheduling-asssistant/index.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})
const  storeRecallDtaa=ref([])
const  selectedTransaction=ref([])
const  isAppDetailVisible=ref({})
const  isAppDetailVisible2=ref({})
const showModal = ref(false);
const RecallId = ref('');
const MetailsIndexedRecalls = ref('');
const appointmentTypeselected = ref('');
const appointmentTypeselectedData = ref({});
const myButtonRef = ref(null);
const ConfirRecallingApointment=()=>{

//  const buttonElement = this.$refs.myButton; 


setTimeout(() => {
  document.getElementById('updateRecallAppointment').click()
}, 1000);
 appointmentTypeselected.value='recall'
 appointmentTypeselectedData.value


}

const closeDrawer=(val)=> {
      // alert(val)
      showModal.value = val;
      MetailsIndexedRecalls.value=''

    } 
   const DeleteFromObjec=(objec,keys=[])=>{
    keys.forEach(element => {
      delete objec[element]
    });
    return objec
   }
const showAppDetail = (indexed) => {
  const orderObje=['Dentist','Appointment Type','My Details','recall Category'];
  const orderObje2=['Due In','status','recall Date'];
      showModal.value = !showModal.value ;
      MetailsIndexedRecalls.value=indexed
      const collectedDataIndex=storeRecallDtaa.value[indexed];
      RecallId.value=collectedDataIndex.id
      appointmentTypeselectedData.value=collectedDataIndex
      // delete collectedDataIndex['patient']['dentist']
      collectedDataIndex['My Details']={}
      collectedDataIndex['My Details']['Full Name']=collectedDataIndex['patient']['first_name']+' '+collectedDataIndex['patient']['last_name']
      collectedDataIndex['My Details']['Mobile Number']=collectedDataIndex['patient']['patient_phone']
      collectedDataIndex['Dentist']={}
      collectedDataIndex['Dentist']['Full Name']=collectedDataIndex['doctor']['first_name']+' '+collectedDataIndex['doctor']['last_name']
      collectedDataIndex['Appointment Type']=collectedDataIndex['treatmentType']
      collectedDataIndex['Appointment Type']['Digital Anamnese']=collectedDataIndex['isAnamneseQtnRequired']>0?'Required':'Not required'
      collectedDataIndex['Due In']=collectedDataIndex['duration'] +'-'+ collectedDataIndex['period']
      collectedDataIndex['recall Date']=collectedDataIndex['recallDate'] 
      collectedDataIndex['recall Category']=collectedDataIndex['recallCategory'] 

      DeleteFromObjec(collectedDataIndex['Appointment Type'],['code','color','isAnamneseQtnRequired'])
      // DeleteFromObjec(collectedDataIndex,['code','color','isAnamneseQtnRequired'])
      
      // DeleteFromObjec(collectedDataIndex['patient'],['city','patient_phone','country','first_name','last_name','birth_date','gender','dentist',])
     
      // DeleteFromObjec(collectedDataIndex,['treatmentType'])

      // DeleteFromObjec(collectedDataIndex['doctor'],['employee_type_id','first_name','last_name','frequency_id','interval','photo',])
  console.log(collectedDataIndex);
      let newOrder={};
      let newOrder2={};
      orderObje.forEach(element => {
        
        newOrder[`${[element]}`]=collectedDataIndex[element]
        
      });
      ///// just to  voiding doing mutch code on ui
      orderObje2.forEach(element => {
        
        newOrder2[`${[element]}`]=collectedDataIndex[element]
        
      });
      // console.log(newOrder);
      
      isAppDetailVisible.value=  newOrder
      isAppDetailVisible2.value=  newOrder2
   
      // isAppDetailVisible.value = 
    }
async function getRecals(){
  const newpatientId =  store.state.auth?.user?.id;
  // console.log(newpatientId,'nazil here');
 const res= await axios.get('/v2/recalls/patient-recalls/'+newpatientId)
 const{status,payload}=res.data

 if(status==='SUCCESS'){
  storeRecallDtaa.value=payload
    }
} 
const getStatus = (status) => {
      let translatedStatus = status
console.log('my recall status', status)
      if (status === 'Confirmed' ||  status === 'confirmed') {
        translatedStatus = t('translation.confirmed_text')
        return translatedStatus
      } else if (status === 'Pending' ||  status === 'pending') {
        translatedStatus = t('translation.pending_text')
        return translatedStatus
      } else if (status === 'Waiting' || status === 'waiting') {
        translatedStatus = t('translation.waiting_text')
        return translatedStatus
      } else if (status === 'Closed' || status === 'closed') {
        translatedStatus = t('translation.closed_text')
        return translatedStatus
      } else if (status === 'Canceled' || status === 'canceled') {
        translatedStatus = t('translation.canceled_text')
        return translatedStatus
      } else if (status === 'Missed' || status === 'missed') {
        translatedStatus = t('translation.missed_text')

        return translatedStatus
      } else if (status === 'Serving' || status === 'serving') {
        translatedStatus = t('translation.serving_text')
        return translatedStatus
      } else {
        return translatedStatus
      }
    }


watch(()=>{
  appointmentTypeselected
  appointmentTypeselectedData
})
onMounted(()=>{
    getRecals()
   
})
provide('appointmentTypeselected',appointmentTypeselected);
provide('appointmentTypeselectedData',appointmentTypeselectedData);
</script>
<style>

</style>