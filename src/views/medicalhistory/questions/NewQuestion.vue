<template>
    <div class="border-b-2 my-2 lg:border-b-0 lg:mb-0 lg:my-0">
      <!-- <header class="flex items-center justify-between px-2 py-2 mb-4">
        <div class="p-2 bg-gray-200 rounded-md">
          <h3 class="text-xl text-black font-sans">{{ $t('translation.dentalAnamnese') }}</h3>
        </div>
      </header> -->
     
      <QuestionComponent :questionsData="questions"/> 
    </div>
  </template>
   <script setup>
    import QuestionComponent from "./QuestionComponent.vue";
     import {computed, onMounted} from 'vue'
     import {useStore} from "vuex";
     import { allquestions } from '../../../store/questions';
    
     const store = useStore()
    
   
     store.dispatch('allquestions/patientsFetchQuestions');
     store.dispatch('allquestions/FetchAppointmentsWithQuestions');
      
//    const questions = computed(() => store?.state?.allquestions?.patientQuestions);
     const questions = computed(() => store?.state?.allquestions?.patientAppointmentQuestions);
     console.log('checking app qns', questions.value)
     onMounted(() => {
       
       store.dispatch('allquestions/FetchAppointmentsWithQuestions');

       console.log('new checking app qns')

     });
     </script>
     