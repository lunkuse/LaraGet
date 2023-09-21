<template>
 

    <div class="accordion" v-if="initQuestions?.length > 0">
        <div v-for="(question, index) in initQuestions" :key="index" class="text-neutral-600">
            <div v-if="question.main_question.main_question_answer!==false && question.main_question.main_question_answer!==null">
            <button @click="toggleAccordion(index)"
                    class="flex flex-row justify-between w-full p-3 border-none rounded-md text-left cursor-pointer bg-gray-300 hover:bg-gray-300/90 active:bg-gray-400 focus:outline-none">
                QN -
                {{ index + 1 + "." }}
                {{ question?.main_question?.question?.question }}
                <MinusSmIcon v-if="question.open" class="w-6 h-6 mr-3 ml-1 text-yellow-650"/>
                <PlusSmIcon v-if="!question.open" class="w-6 h-6 mr-3 ml-1 text-yellow-650"/>
            </button>
            <div v-if="question.open" class='p-1 m-1 transition-all'>
                <div class="bg-gray-200/60 rounded-md shadow-sm py-2 px-4 m-1"
                >
                    <span v-if="question.main_question.main_question_answer">
                    {{ getAnswer(question.main_question.main_question_answer) }}
                    </span>
                    <span v-else class="text-red-500">
                        {{ $t('translation.noAnswer') }}
                    </span>

                </div>
                <div v-for="(subQuestion, subIndex) in question.sub_questions" :key="subIndex">
                    <button @click="toggleSubAccordion(index, subIndex)"
                            class="flex flex-row justify-between w-full p-3 border-none rounded-md mb-2 text-left cursor-pointer bg-gray-300 hover:bg-gray-300/90 active:bg-gray-400 focus:outline-none">
                        QN -
                        <!-- {{ index + 1 + "." + subIndex + 1 + "." }} -->
                        {{ subQuestion.code }}
                        {{ subQuestion.question }}
                        <MinusSmIcon v-if="subQuestion.open" class="w-6 h-6 mr-3 ml-1 text-yellow-650"/>
                        <PlusSmIcon v-if="!subQuestion.open" class="w-6 h-6 mr-3 ml-1 text-yellow-650"/>
                    </button>
                    <div v-if="subQuestion.open" class="p-1 m-1 transition-all">
                        <div class="bg-gray-200/60 rounded-md shadow-sm py-2 px-4 m-1">
                            <span v-if="subQuestion.answer">
                    {{ getAnswer(subQuestion.answer) }}
                    </span>
                            <span v-else class="text-red-500">
                        {{ $t('translation.noAnswer') }}
                    </span>
                        </div>
                        <div v-for="(subSubQuestion, subSubIndex) in subQuestion.sub_sub_questions" :key="subSubIndex">
                            <button @click="toggleSubSubAccordion(index, subIndex, subSubIndex)"
                                    class="flex flex-row justify-between w-full p-3 border-none rounded-md mb-2 text-left cursor-pointer bg-gray-300 hover:bg-gray-300/90 active:bg-gray-400 focus:outline-none">
                                QN -
                                <!-- {{ index + 1 + '.' + subIndex + 1 + '.' + subSubIndex + 1 + "." }} -->
                                {{ subSubQuestion.code }}
                                {{ subSubQuestion.question}}
                                <MinusSmIcon v-if="subSubQuestion.open" class="w-6 h-6 mr-3 ml-1 text-yellow-650"/>
                                <PlusSmIcon v-if="!subSubQuestion.open" class="w-6 h-6 mr-3 ml-1 text-yellow-650"/>
                            </button>
                            <div v-if="subSubQuestion.open" class="p-1 m-1 transition-all">
                                <div class="bg-gray-200/60 rounded-md shadow-sm py-2 px-4 m-1">
                                     <span v-if="subSubQuestion.answer">
                    {{ getAnswer(subSubQuestion.answer) }}
                    </span>
                                    <span v-else class="text-red-500">
                        {{ $t('translation.noAnswer') }}
                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  <div v-else class="flex items-center justify-center w-full text-2xl font-sans">
    <div class="pt-24">
      {{ $t('translation.noQuestionsYet') }}
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {MinusSmIcon, PlusSmIcon} from '@heroicons/vue/outline';

const props = defineProps({
    questionsData: {
        type: Array,
        required: true
    }
});

const questions = ref([]);

const toggleAccordion = (index) => {
    questions.value[index].open = !questions.value[index].open;
};

const toggleSubAccordion = (parentIndex, index) => {
    questions.value[parentIndex].sub_questions[index].open = !questions.value[parentIndex].sub_questions[index].open;
};

const toggleSubSubAccordion = (parentIndex, subParentIndex, index) => {
    questions.value[parentIndex].sub_questions[subParentIndex].sub_sub_questions[index].open = !questions.value[parentIndex].sub_questions[subParentIndex].sub_sub_questions[index].open;
};

const initQuestions = computed(() => {
    props.questionsData?.forEach(question => {
        question.open = false;
        question.sub_questions.forEach(subQuestion => {
            subQuestion.open = false;
            subQuestion.sub_sub_questions.forEach(subSubQuestion => {
                subSubQuestion.open = false;
            });
        });
    });
    questions.value = props.questionsData;
    return questions.value;
});

const getAnswer = (answer) => {
    if(answer === true) return 'Yes';
    if(answer === false) return 'No';
    if(answer === null) return 'No';
    return answer
}

</script>

<style scoped>

.accordion > div:not(:last-child) {
    margin-bottom: 1rem;
}
</style>
