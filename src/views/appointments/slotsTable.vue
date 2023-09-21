<template>
    <div class="h-full pr-2 text-slate-800 text-sm">
      <div
        class="w-full h-full mb-3 rounded-md shadow-md px-3 overflow-y-auto scrollContent"
      >
      <!--  v-if="!isLoading && validSlots.length === 0" -->
      date: {{ dateSlots }}<br>
      check here{{ patientSlots }}
        <div
          class="flex flex-col items-center justify-center gap-3"
         
        >
          <img
            src="../../assets/availableSlots.svg"
            class="h-64 mt-24"
            alt="slots loading"
          />
          
        </div>
        <div class="flex flex-col items-center" v-if="isLoading">
          <div
            class="spinner-border animate-spin inline-block items-center text-primary w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
          <span class="ml-3 text-slate-800 text-sm"
            >{{ $t("translation.loading_text") }}!</span
          >
        </div>
       
      </div>
    </div>
  </template>

<script setup>
// import axios from 'axios';
import moment from "moment";
import { ref, computed, watch, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";

import { useI18n } from "vue-i18n";
const props = defineProps({
    appointmentTypeIdSlots: {
    type:   String,
    required: true,
  },
  dateSlots: {
    type:   String,
    required: true,
  }
});
console.log('props slots',props)
const store = useStore();
const patientId = computed(() => store.state.auth.user);

 
 console.log('slots patientId 123',patientId.value.facility_id)
const data = {
    appointmentTypeId:props.appointmentTypeIdSlots,
    date:props.dateSlots,
    facilityId:patientId.value.facility_id
}
console.log('data.value', data)
store.dispatch('slots/FetchSlots', data);
const patientSlots = computed(() => store.state.slots.doctorSlots);
console.log('all patientSlots ', patientSlots.value)



const { t } = useI18n();
const isLoading = ref(false)
onMounted(() => {
 
 console.log('loaded slots table',props.appointmentTypeIdSlots)
//  store.dispatch('slots/FetchSlots', data.value);
});

watch(() => props, (newVal, oldVal) => {
 
      // React to changes within nested properties
    //  if( newVal.appointmentTypeId !== ""){
        
    const  newdata = {
    appointmentTypeId:newVal.appointmentTypeIdSlots,
    date:newVal.dateSlots,
    facilityId:patientId.value.facility_id
}

console.log('newdata finally appointment type has value', newdata)

        store.dispatch('slots/FetchSlots', newdata);
        patientSlots.value = computed(() => store.state.slots.doctorSlots)
        patientSlots.value = newVal.value
console.log('patientSlots changed', newVal)
console.log('appointment patientSlots', patientSlots
)
    //   }
     
    }, { deep: true });


    

    watch(() => patientSlots, (newVal, oldVal) => {
//         patientSlots.value = computed(() => store.state.slots.doctorSlots)
//         patientSlots.value = newVal.value
// console.log('patientSlots changed', newVal.value)
// patientSlots.value = newVal.value

}, { deep: true });

</script>