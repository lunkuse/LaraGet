<template>
  <div>
    <div
      class="intro-y chat grid grid-cols-12 gap-5 mt-5 col-span-12 lg:col-span-9 2xl:col-span-10 box"
    >
      <div class="col-span-12 lg:col-span-12 2xl:col-span-12 container">
        <div class="intro-y pr-1">
          <div class="p-2">
            <div class="chat__tabs nav nav-tabs justify-center" role="tablist">
              <a
                id="medical-tab"
                data-toggle="tab"
                data-target="#medical"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center active"
                role="tab"
                aria-controls="medical"
                aria-selected="true"
                >{{ $t("translation.dentalAnamnese") }}</a
              >
              <a
                id="submitted-tab"
                data-toggle="tab"
                data-target="#submitted"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="submitted"
                aria-selected="false"
                >{{ $t("translation.history_text") }}</a
              >
              <!-- <a
                id="dental-tab"
                data-toggle="tab"
                data-target="#dental"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="dental"
                aria-selected="false"
                >{{ $t("translation.dental_questions_text") }}</a
              > -->
            </div>
          </div>
        </div>

      

        <div  class="tab-content">
          <div
            id="dental"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="dental-tab"
          >
            <DentalInformation />
          </div>
          <!-- start nottification -->
          <div
            id="submitted"
            class="tab-pane box"
            role="tabpanel"
            aria-labelledby="submitted-tab"
          >
            <div class="pr-1">
              <div
                class="box p-5 mt-5 intro-y col-span-12 overflow-auto lg:overflow-visible"
              >
                <NewMedicalInformation />
                <SubmittedMedicalHistory />
              </div>
            </div>
          </div>
          <div
            id="medical"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="medical-tab"
          >
            <div class="pr-1">
              <div
                class="p-5 mt-5 intro-y col-span-12 overflow-auto lg:overflow-visible"
              >
                <Questions />
                <!-- <MedicalInformation /> -->
              </div>
            </div>
          </div>
          <div
            id="profile"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="pr-1"></div>
          </div>
        </div>
      </div>

      <!-- END: Chat Side Menu -->
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import MedicalInformation from "../medicalhistory/MedicalInformation.vue";
import NewMedicalInformation from "./questions/AnamneseComponent.vue";
import Questions from "./questions/NewQuestion.vue";
import DentalInformation from "../medicalhistory/DentalInformation.vue";
import SubmittedMedicalHistory from "../medicalhistory/SubmittedMedicalHistory.vue";
// import AppointmentQuestions from "./questions/Questions.vue";


export default defineComponent({
  components: {
    MedicalInformation,
    DentalInformation,
    SubmittedMedicalHistory,
    NewMedicalInformation,
    Questions,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  mounted() {},
  computed: {},

  methods: {},
});
</script>
<style scoped lang="scss">
// .nav.nav-tabs .active {
//     border-color: #FF782E;
//     color: #FF782E;
// }
</style>
