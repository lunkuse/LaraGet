<template>
  <div class="border-b-2 my-2 lg:border-b-0 lg:mb-0 lg:my-0">
    <!-- <header class="flex items-center justify-between px-2  mb-4">
     
        <h3 class="text-xl text-black font-sans">{{ $t('translation.dentalAnamnesehistory') }}</h3>
     
    </header> -->
    <!-- <NewAccordion :questionsData="questions"/> -->
    <AnswerComponent :questionsData="questions"/>
  </div>
</template>


<script setup>
// import NewAccordion from "./NewAccordion.vue";
import AnswerComponent from './AnswerComponent.vue'
import {computed, onMounted} from 'vue'
import {useStore} from "vuex";
import { allquestions } from '../../../store/questions';

const store = useStore()
const patientId = computed(() => store.state.auth.user);
// store.dispatch('patientsFetchQuestions', patientId.value.id);
store.dispatch('allquestions/patientsFetchQuestions', patientId.value.id);
 
 console.log('patientId 123',patientId.value.id)

const questions = computed(() => store?.state?.allquestions?.patientQuestions);
console.log('checking questions', questions)
onMounted(() => {
 
  store.dispatch('allquestions/patientsFetchQuestions', patientId.value.id);
  
});

</script>
