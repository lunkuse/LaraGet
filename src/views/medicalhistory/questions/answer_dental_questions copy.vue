<template>
  <div v-if="questions.length <= 0 && !isLoading">
    <div
      role="alert"
      class="relative text-xl text-theme-1 flex items-center mb-2"
    >
      <div
        role="alert"
        class="relative font-medium text-theme-1 flex items-center mb-2"
      >
        No questions for you
      </div>
    </div>
  </div>
  <div class="p-2 m-h-full intro-y box">
    <span
      v-if="isLoading"
      class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
    >
      <LoadingIcon icon="oval" class="w-10 h-10" />

      <span>{{ $t("translation.loading_text") }}</span>
    </span>
    <div v-if="appointmentId">
      <div class="p-4 rounded-sm" v-for="(q, index1) in questions" :key="q.id">
        <div class="justify-between h-full">
          <div class="p-3">
            <div>
              <div>
                <!-- question1 -->
                <span class="font-medium">
                  <!-- {{ index1 + 1 }}.0  -->
                  {{q?.code }}
                  &nbsp;
                  <label :for="`${Date.now()}${index1}`">{{
                    q.question
                  }}</label>
                </span>
                <div v-if="q.type === 'closed'" class="p-1">
                  <div class="flex items-center mt-2">
                    <input
  class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 focus:!border-theme-1 cursor-pointer"
  type="radio"
  :name="`firstAnswer-${q.id}`" 
  :id="`${q.id}false`"
  v-model="questionsAnswer[index1].answer" 
  :value="false"
  @change="updateAnswers(q.id, false)" 
/>
<label
  class="cursor-pointer ml-2"
  :for="`${q.id}false`"
  selected
  >No</label
>
                  </div>
                 <div class="flex items-center mt-2">
                    <input
  class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 focus:!border-theme-1 cursor-pointer"
  type="radio"
  :name="`firstAnswer-${q.id}`"
  :id="`${q.id}true`"
  v-model="questionsAnswer[index1].answer" 
  :value="true"
  @change="updateAnswers(q.id, true)" 
/>
<label class="cursor-pointer ml-2" :for="`${q.id}true`">Yes</label>

                  </div>
                </div>
                <div v-else class="p-1">
                  <div class="flex items-center mt-2 focus:border-theme-36">
                    <input
                      type="text"
                      class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
                      placeholder="Enter answer"
                      v-model="questionsAnswer[index1].answer" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

         <!-- level 2 -->
<div v-if="q.sub_questions && questionsAnswer[index1].answer == true" class="p-1 ml-2">
  <div v-for="sub_question in q.sub_questions" :key="sub_question.id">
    <label
      class="font-sans font-medium text-gray-800 dark:text-white p-1"
      :for="`${Date.now()}${index}`"
    >
      {{ sub_question?.code }}
      &nbsp;
      {{ sub_question.question }}
    </label>
    <br />

    <div v-if="sub_question?.type === 'closed'" class="p-1">
      <div class="flex items-center mt-2">
        <input
          class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 focus:!border-theme-1 cursor-pointer"
          type="radio"
          :name="`${sub_question.code}.closed.${sub_question.id}`"  
          :id="`${sub_question.code}leveltwofalse`"
          v-model="questionsAnswer[index1].answer"  
          :value="false"
          checked
          @change="updateAnswers(sub_question.id, false)"
        />
        <label
          class="cursor-pointer ml-2"
          :for="`${sub_question.code}leveltwofalse`"
        >
          No
        </label>
      </div>

      <div class="flex items-center mt-2">
        <input
          :name="`${sub_question.code}.closed.${sub_question.id}`" 
          class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 focus:!border-theme-1 cursor-pointer"
          type="radio"
          :id="`${sub_question.code}leveltwotrue`"
          v-model="questionsAnswer[index1].answer"  
          :value="true"
          @change="updateAnswers(sub_question.id, true)"
        />
        <label
          class="cursor-pointer ml-2"
          :for="`${sub_question.code}leveltwotrue`"
        >
          Yes
        </label>
      </div>
    </div>
    <div v-else class="p-1">
                  <div class="flex items-center mt-2 focus:border-theme-36">
                    <input
                      type="text"
                      class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
                      placeholder="Enter answer"
                      v-model="questionsAnswer[index1].answer" 
                    />
                  </div>
                </div>
    <!-- level 3 -->
    <div class="p-1 ml-2">
      <div v-for="(sub_sub_question1, index3) in sub_question.sub_questions" :key="index3">
        <div v-if="questionsAnswer[index1].answer == true" class="p-1">
          {{ sub_sub_question1?.code }}
          &nbsp;
          <label class="font-sans font-medium text-gray-800 dark:text-white p-1">
            {{ sub_sub_question1?.question }}
          </label>
          <div v-if="sub_sub_question1.type === 'closed'" class="p-1">
            <div class="flex items-center mt-2">
              <input
                class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 focus:!border-theme-1 cursor-pointer"
                type="radio"
                :name="`${index1}.3.${index3}.closed.${sub_sub_question1.id}`"  
                :id="`${index1}.3.${index3}leveltwofalse`"
                v-model="sub_sub_question1.answer"  
                :value="false"
                checked
              />
              <label
                class="cursor-pointer ml-2"
                :for="`${index1}.3.${index3}leveltwofalse`"
              >
                No
              </label>
            </div>
            <div class="flex items-center mt-2">
              <input
                :name="`${index1}.3.${index3}.closed.${sub_sub_question1.id}`"  
                class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 focus:!border-theme-1 cursor-pointer"
                type="radio"
                :id="`${index1}.3.${index3}leveltwotrue`"
                v-model="sub_sub_question1.answer"  
                :value="true"
              />
              <label
                class="cursor-pointer ml-2"
                :for="`${index1}.3.${index3}leveltwotrue`"
              >
                Yes
              </label>
            </div>
          </div>
          <div v-else class="p-1">
            <div class="flex items-center mt-2 focus:border-theme-36">
              <input
          id="input-wizard-1"
          type="text"
          class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
          placeholder="Enter answer"
          name="city"
          v-model="sub_question.answer"
        />
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </div>
</div>

        </div>
      </div>

      <div
        id="answer-success-n  otification-content"
        class="toastify-content hidden flex"
      >
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Form submitted successfully</div>
        </div>
      </div>

      <div
        id="answer-failed-notification-content"
        class="toastify-content hidden flex"
      >
        <XCircleIcon class="text-theme-6" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Form not submitted</div>
          <div class="text-gray-600 mt-1">{{ errorMessage }}</div>
        </div>
      </div>

      <div
        class="container mx-auto justify-center mt-4"
        style="display: flex; align-items: center; text-align: center"
      ></div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        v-if="questions.length > 0"
      >
        <Button
          type="submit"
          class="btn bg-theme-32 w-40 mr-auto text-white"
          @click="submitAnswers"
          :label="`${t('translation.submit_text')}`"
        >
          <LoadingIcon
            v-if="loading"
            icon="spinning-circles"
            color="black"
            class="w-4 h-4 ml-2"
          />
          <p data-dismiss="modal" class="text-white" v-else>
            {{ $t("translation.submit_text") }}
          </p>
        </Button>
      </div>
    </div>
  </div>
  <!-- <div v-else s>
      {{ $t('translation.noQuestionsYet') }}
    </div> -->
</template>

<script >
import { defineComponent, inject, ref, computed } from "vue";
import Button from "@/components/shared/buttons/Button.vue";
import Toastify from "toastify-js";
import QuestionService from "../../../service/questions-service";
import router from "../../../router";
import { useI18n } from "vue-i18n";
import $ from "cash-dom";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Button,
  },
  props: {
    appointment: Object,
    appointmentId: String,
  },
  created() {
    this.fetchAll();
  },
  methods: {
    async fetchAll() {
      this.isLoading = true;
      try {
        QuestionService.fetchQuestions()
          .then((response) => {
            this.isLoading = false;
            if (response?.success === "SUCCESS") {
              console.log("questions response", response?.data);
              console.log("status is success new");
              const data = response?.data;

              // const questions = data.map((q) => ({
              //   ...q,
              //   sub_questions: q.sub_questions.map((s) => ({
              //     ...s,
              //     question: JSON.parse(s.question),
              //   })),
              // }));
              this.questions = response?.data;
          //     this.questionsAnswer= response?.data.map((q) => ({
          //   question_id: q.id,
          //   answer: false,
          // }));
          this.questionsAnswer = response?.data.flatMap((q) => {
  const questionAndSubQuestions = [
    { question_id: q.id, answer: false },
    ...q.sub_questions.map((subQ) => ({
      question_id: subQ.id,
      answer: false,
    })),
  ];

  // If you want to include sub-sub-questions, you can use a recursive function
  const flattenSubSubQuestions = (subQuestions, parentId) =>
    subQuestions.flatMap((subQ) => {
      const subQuestionData = { question_id: subQ.id, answer: false };

      if (subQ.sub_questions) {
        return [
          subQuestionData,
          ...flattenSubSubQuestions(subQ.sub_questions, subQ.id),
        ];
      }

      return [subQuestionData];
    });

  return [
    ...questionAndSubQuestions,
    ...flattenSubSubQuestions(q.sub_questions, q.id),
  ];
});
          console.log('this.questionsAnswer',this.questionsAnswer)
              // this.questions.push(...questions);
              // console.log("mapped qns:", questions);
              // return { success: true, message: `${message}`, payload: payload }
            }
            // throw new Error(error ?? payload)
          })
          .catch(function (thrown) {
            console.log("Request cancelling error", thrown);

            if (thrown.message === "canceled") {
              console.log("Request canceled vvvvv", thrown.message);
            } else {
              // handle error
            }
          });
      } catch (err) {
        return { success: false, message: `${err.message}` };
      }
    },
    async submitAnswers() {
      this.loading = true;
      const answers = this.questions.map((q) => ({
        question_id: q.id,
        answer: q.answer,
        sub_questions: q.sub_questions.map((s) => ({
          sub_question_id: s.id,
          sub_questions: s.question.map((sq) => ({
            sub_question_answer: sq.answer,
            sub_sub_questions: sq.questions.map((ssq) => ({
              sub_sub_question_id: ssq.id,
              sub_sub_question_answer: ssq.answer,
            })),
            // sub_sub_question_id:sq.id,
            // sub_sub_question_answer:sq.answer
          })),
        })),
        // sub_question_id: q.sub_questions[0]?.id,
        // sub_question_answer: q.sub_questions[0]?.answer,
        // sub_sub_question_id: q.sub_questions[0]?.question[0]?.id,
        // sub_sub_question_answer:q.sub_questions[0]?.question[0]?.answer
      }));
      console.log("vvvv this.answerss", answers);
      // const ref = await MedicalQuestionsService.submitAnswers({
      //   answers: answers,
      //   patientId: 45,
      //   appointmentId: 30
      // })
      try {
        console.log("submitting");
        // console.log('The id is answer appointment: ' + this.$route.params.appointmentId);
        let data = {
          answers: answers,
          patient_id: this.patientId.id,
          appointment_id: this.appointmentId,
        };
        QuestionService.answerQuestions(data)
          .then((response) => {
            this.isLoading = false;
            this.loading = false;

            console.log("answer question response", response);
            if (response?.status === true) {
              Toastify({
                node: $("#answer-success-notification-content")
                  .clone()
                  .removeClass("hidden")[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();

              router.push({
                name: "side-menu-appointments",
              });

              // router.push({
              //   name: "side-menu-medical-history",
              // });
            } else {
              this.errorMessage = response?.message;
              Toastify({
                node: $("#answer-failed-notification-content")
                  .clone()
                  .removeClass("hidden")[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();
            }
            // throw new Error(error ?? payload)
          })
          .catch(function (thrown) {
            console.log("Request cancelling error", thrown);

            if (thrown.message === "canceled") {
              console.log("Request canceled vvvvv", thrown.message);
            } else {
              // handle error
            }
          });

        if (response?.data?.status === "true") {
          console.log("response?.data?.status === ", response?.data?.status);
          // this.$route.push({
          //   name: "side-menu-medical-history",
          // });
          router.push({
            name: "side-menu-view-appointments",
          });
          return { success: true, message: `${message}` };
        }
        throw new Error(error);
      } catch (err) {
        return { success: false, message: `${err.message}` };
      }
    },
  },
  watch: {
    errorMessage(newerrorMessage, olderrorMessage) {
      this.errorMessage = newerrorMessage;
    },
  },
  setup() {
    const translations = inject("translation_v3");
    const store = useStore();
    const patientId = computed(() => store.state.auth.user);
    // const questions = ref([])
    const questions = ref([]);
    const levelonetrue = ref();
    const levelonefalse = ref();
    const leveltwofalse = ref();
    const leveltwotrue = ref();
    const firstAnswer = ref(false);
    const secondAnswer = ref(false);
    const errorMessage = ref(null);
    const isLoading = ref(false);
    const loading = ref(false);
    const images = ref([{ imgId: 1 }, { imgId: 2 }, { imgId: 3 }]);
    const profileImg = ref(2);
    const { t } = useI18n({});
    const answers=ref([]);
    const questionsAnswer = ref([]);
    const updateAnswers = (questionId, answer, subQuestionId = null) => {
  // Recursive function to find an answer by questionId
  const updateAnswers = (questionId, answer, index, subQuestionId = null) => {
  // Recursive function to find an answer by questionId
  const findAnswer = (questionIdToFind, answerArray) => {
    for (const item of answerArray) {
      if (item.question_id === questionIdToFind) {
        return item;
      }
      if (item.sub_questions) {
        const subAnswer = findSubAnswer(questionIdToFind, item.sub_questions);
        if (subAnswer) {
          return subAnswer;
        }
      }
    }
    return null;
  };

  // Recursive function for finding sub-answers
  const findSubAnswer = (questionIdToFind, subQuestionArray) => {
    for (const subItem of subQuestionArray) {
      if (subItem.question_id === questionIdToFind) {
        return subItem;
      }
      if (subItem.sub_questions) {
        const subSubAnswer = findSubAnswer(questionIdToFind, subItem.sub_questions);
        if (subSubAnswer) {
          return subSubAnswer;
        }
      }
    }
    return null;
  };

  if (Array.isArray(this.questionsAnswer)) {
    // You can safely iterate over the array here
    const foundAnswer = findAnswer(questionId, this.questionsAnswer);

    if (foundAnswer) {
      foundAnswer.answer = answer;
    }
  } else {
    // Handle the case where this.questionsAnswer is not iterable
    console.error('this.questionsAnswer is not iterable:', this.questionsAnswer);
    // You might want to add appropriate error handling or return early
  }
  
  // Update this.questionsAnswer based on response data
  this.questionsAnswer = response?.data.flatMap((q, qIndex) => {
    const questionAndSubQuestions = [
      { question_id: q.id, answer: false },
      ...q.sub_questions.map((subQ) => ({
        question_id: subQ.id,
        answer: false,
      })),
    ];

    if (qIndex === index) {
      // Update the answer for the current question
      questionAndSubQuestions[0].answer = answer;
    }

    return questionAndSubQuestions;
  });
};




  // const foundAnswer = findAnswer(questionId, questionsAnswer);

  // if (foundAnswer) {
  //   foundAnswer.answer = answer;
  // }
};


    const firstAnswers = ref(Array(questions.value.length).fill(false));
    // questionsAnswer.value.forEach((q, index) => {
    //   firstAnswers.value[index] = { question_id: q.id, answer: false };
    // });


    return {
      t,
      questions,
      translations,
      errorMessage,
      levelonetrue,
      levelonefalse,
      leveltwofalse,
      leveltwotrue,
      images,
      profileImg,
      patientId,
      isLoading,
      firstAnswer,
      secondAnswer,
      answers,
      updateAnswers,
      questionsAnswer,
   
      // submitAnswers,
    };
  },
});
</script>
<style scoped>
input[type="radio"]:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

input[type="radio"]:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #ff782e;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
</style>
