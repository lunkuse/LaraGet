<template>
 
  <div>
    <span
      v-if="isLoading"
      class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
    >
      <LoadingIcon icon="oval" class="w-10 h-10" />

      <span>{{ $t("translation.loading_text") }}</span>
    </span>

    <div >
      <div v-for="(q, index1) in questions" :key="q.id">
        <div class="p-3">
          <div>
            <span class="font-medium">{{ q.code }}&nbsp;{{ q.question }}</span>
            <div v-if="q.type === 'closed'" class="p-1">
              <div class="flex items-center mt-2">
                <input
                  type="radio"
                  :name="`firstAnswer-${q.id}`"
                  :id="`${q.id}false`"
                  v-model="getAnswer(q.id, index1, q.type ).answer"
                  :value="false"
                />
                <label :for="`${q.id}false`">No</label>
              </div>
              <div class="flex items-center mt-2">
                <input
                  type="radio"
                  :name="`firstAnswer-${q.id}`"
                  :id="`${q.id}true`"
                  v-model="getAnswer(q.id, index1, q.type ).answer"
                  :value="true"
                />
                <label :for="`${q.id}true`">Yes</label>
              </div>
            </div>
            <div v-else class="p-1">
              <div class="flex items-center mt-2 focus:border-theme-36">
                <input
                  type="text"
                  class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
                  placeholder="Enter answer"
                  v-model="getAnswer(q.id, index1, q.type ).answer"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Recursive rendering of subquestions -->
        <div
          v-if="q.sub_questions && getAnswer(q.id, index1).answer == true"
          class="p-1 ml-2"
        >
          <div
            v-for="(sub_question, index2) in q.sub_questions"
            :key="sub_question.id"
          >
            <div class="p-3">
              <span class="font-medium"
                >{{ sub_question.code }}&nbsp;{{ sub_question.question }}</span
              >
              <div v-if="sub_question.type === 'closed'" class="p-1">
                <div class="flex items-center mt-2">
                  <input
                    type="radio"
                    :name="`${sub_question.code}.closed.${sub_question.id}`"
                    :id="`${sub_question.code}leveltwofalse`"
                    v-model="getAnswer(sub_question.id, index2,sub_question.type).answer"
                    :value="false"
                  />
                  <label :for="`${sub_question.code}leveltwofalse`">No</label>
                </div>
                <div class="flex items-center mt-2">
                  <input
                    :name="`${sub_question.code}.closed.${sub_question.id}`"
                    type="radio"
                    :id="`${sub_question.code}leveltwotrue`"
                    v-model="getAnswer(sub_question.id, index2, sub_question.type).answer"
                    :value="true"
                  />
                  <label :for="`${sub_question.code}leveltwotrue`">Yes</label>
                </div>
              </div>
              <div v-else class="p-1">
        <div class="flex items-center mt-2 focus:border-theme-36">
          <input
            type="text"
            class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
            placeholder="Enter answer"
            v-model="getAnswer(sub_question.id, index2, sub_question.type).answer"
          />
        </div>
      </div>
              <!-- Recursive rendering of sub-subquestions -->
              <div
                v-if="
                  sub_question.sub_questions &&
                  getAnswer(sub_question.id, index2).answer == true
                "
                class="p-1 ml-2"
              >
                <div
                  v-for="(
                    sub_sub_question, index3
                  ) in sub_question.sub_questions"
                  :key="sub_sub_question.id"
                >
                  <div class="p-3">
                    <span class="font-medium"
                      >{{ sub_sub_question.code }}&nbsp;{{
                        sub_sub_question.question
                      }}</span
                    >
                    <div v-if="sub_sub_question.type === 'closed'" class="p-1">
                      <div class="flex items-center mt-2">
                        <input
                          type="radio"
                          :name="`${sub_sub_question.code}.closed.${sub_sub_question.id}`"
                          :id="`${sub_sub_question.code}levelthreesfalse`"
                          v-model="
                            getAnswer(sub_sub_question.id, index3, sub_sub_question.type).answer
                          "
                          :value="false"
                        />
                        <label :for="`${sub_sub_question.code}levelthreesfalse`"
                          >No</label
                        >
                      </div>
                      <div class="flex items-center mt-2">
                        <input
                          :name="`${sub_sub_question.code}.closed.${sub_sub_question.id}`"
                          type="radio"
                          :id="`${sub_sub_question.code}levelthreestrue`"
                          v-model="
                            getAnswer(sub_sub_question.id, index3, sub_sub_question.type).answer
                          "
                          :value="true"
                        />
                        <label :for="`${sub_sub_question.code}levelthreestrue`"
                          >Yes</label
                        >
                      </div>
                    </div>
                    <div v-else class="p-1">
        <div class="flex items-center mt-2 focus:border-theme-36">
          <input
            type="text"
            class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
            placeholder="Enter answer"
            v-model="getAnswer(sub_question.id, index3,sub_sub_question.type).answer"
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
    </div>
    <!-- Save button -->

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
    
      <Button
        type="submit"
        class="btn bg-theme-32 w-40 mr-auto text-white"
        @click="saveAnswers"
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
</template>

<script>
import { ref } from "vue";
import Button from "@/components/shared/buttons/Button.vue";
import QuestionService from "../../../service/questions-service";
import { integer } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Toastify from "toastify-js";
import router from "../../../router";
export default {
  components: {
    Button,
  },
  props: {
    appointment: Object,
  },
  data() {
    return {
      questions: [],
      answers: [],
      isLoading: false,
      loading: false,
    };
  },
  computed: {
    patientId() {
      const store = useStore();
      // Assuming your Vuex store is available as "this.$store"
      // and "auth" is a module in your store containing "user" state
      return this.$store.state.auth.user.id;
    },
  },
  methods: {


    getAnswer(questionId, index, type) {
      const question = this.answers.find((q) => q.question_id === questionId);
      
      if (!question) {
        const newQuestion = { question_id: questionId, answer: type === 'closed' ? false: null };
        // const newQuestion = { question_id: questionId, answer: false };
        this.answers.splice(index, 0, newQuestion);
        return newQuestion;
      }
      return question;
    },
    saveAnswers() {
      let data = {
        answers: this.answers,
        patient_id: this.$route.params?.patientId,
        appointment_id: this.$route.params?.appointmentId,
      };

      try {
        this.loading = true;
       

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

              // router.push({
              //   name: "side-menu-appointments",
              // });

              router.push({
            name: "side-menu-view-appointments",
          });
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
          })
          .catch(function (thrown) {
            console.log("Request cancelling error", thrown);

            if (thrown.message === "canceled") {
              console.log("Request canceled vvvvv", thrown.message);
            } else {
            }
          });

        if (response?.data?.status === "true") {
          console.log("response?.data?.status === ", response?.data?.status);

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

              this.questions = response?.data;
              console.log("this.questionsAnswer", this.questions);
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
  },
  created() {
    this.fetchAll();
  },
  setup() {
    const { t } = useI18n({});
    return {
      t,
    };
  },
};
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
