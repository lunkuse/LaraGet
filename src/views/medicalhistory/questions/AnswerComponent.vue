<template>

  <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-20"
        >
          <LoadingIcon icon="puff" class="w-12 h-12 items-center" />
          <span>{{ $t('translation.loading_text') }}</span>
        </span>
  <div class="flex">

    <!-- Side with tabs -->
    <div class="w-1/4 border-r p-4">
      <div
        v-for="(tab, index) in questionsData"
        :key="index"
        @click="activateTab(tab.id)"
        :class="{
          '!bg-theme-1 text-white  cursor-pointer': tab.id === activeTab,
          'bg-gray-300 cursor-pointer': tab !== activeTab,
        }"
        class="px-4 py-2 mb-2 rounded"
      >
       {{ formattedDate(tab.date) }}
      </div>
    </div>
    <!-- Side with content -->
    <div class="w-3/4 p-4" v-if="questionsData?.length > 0">
      <span class="font-black p-2">{{ $t('translation.appointment_type_text') }}:</span>  <span class="font-medium p-2"> {{ activeAppointmentType }}</span>
      <!-- <AllQuestions :appointmentId="activeTab" /> -->
      
      <!-- <NewAccordion
              v-for="answer in questionsData"
              :key="answer.id"
              :questionsData="answer.answers"
            ></NewAccordion> -->
            
            <NewAccordion
           
              :questionsData="questionsDataAnswer"
            ></NewAccordion>
    </div>
   
  </div>
  <div></div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/vue/outline";
import AllQuestions from "./answer_dental_questions.vue";
import moment from "moment";
import NewAccordion from "./NewAccordion.vue";

const props = defineProps({
  questionsData: {
    type: Array,
    required: true,
  },
});
const loading = ref(false)
const questions = ref([]);
// questions.value.at(0).id 
console.log('answer questionsData',props.questionsData)
const activeTab = ref(props.questionsData?.value?.[0]?.id); // Set default active tab
const activeAppointmentType = ref(props.questionsData?.value?.[0]?.appointment?.appointment_type?.type);
const questionsDataAnswer  = ref(props.questionsData?.value?.[0]?.answers);
console.log('answer new active tab', activeAppointmentType.value)
// const activeTab = computed(() => props.questionsData.value?.[0]?.id);
// const activeTab = ref(props.questionsData.value?.at(0)?.id); // Set default active tab
watch(
      () => props.questionsData,
      (newData) => {
        loading.value= true 
        if (newData?.length > 0) {
          
          activeTab.value = newData[0].id;
           activeAppointmentType.value = newData[0].appointment?.appointment_type?.title;
         questionsDataAnswer.value =  newData[0].answers;
         console.log('watched questionsDataAnswer', activeAppointmentType.value)
          loading.value=false
        } else {
          activeTab.value = null;
          loading.value=false
        }
        loading.value=false
      }
    );

const formattedDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
//   return moment(date).fromNow();
};
const activateTab = (id) => {
  activeTab.value = id;
  const newanswer = props.questionsData.filter((answer) => answer.id === id)
  questionsDataAnswer.value = newanswer[0].answers
  console.log("selected answer  tab id",  questionsDataAnswer.value );
};

</script>

<style scoped>
.accordion > div:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
