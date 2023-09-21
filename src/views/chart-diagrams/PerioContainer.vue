<template>
      <!-- :class="[ router.currentRoute.value.name === 'Treatments' ? 'left-[312px]': 'left-[88px]']" -->
  <!-- <div

    class=" fixed right-0 bg-gray-50 pt-[40px] px-2 top-[60px] bottom-1 overflow-auto space-y-1 flex flex-col"
    id="perio-chart"> -->
    <!-- class="right-0  bg-gray-50 pb-[40px] px-2  bottom-1 overflow-auto space-y-1 flex flex-col " -->
    <div
    :class="[ router.currentRoute.value.name === 'Treatments' ? 'left-[312px]': 'left-[88px]']"
    class="left-24 right-0 px-2 bottom-2 overflow-auto space-y-1 flex flex-col w-full h-full"

id="perio-chart">
    <div 
   
      class="w-full h-12 bg-white  z-10 flex items-center justify-between shadow px-4">
      <div class="flex items-center text-sm space-x-1 font-bold text-black">
        <span>{{ $t('translation.vektis_text') }}</span>
        <Switch v-model="showVektisPerioChart" @change="switchPerioChartType()"
          :class="showVektisPerioChart ? 'bg-gray-500' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-12 items-center rounded-full">
          <span class="sr-only">{{ $t('translation.enableNotifications') }}</span>
          <span :class="showVektisPerioChart ? 'translate-x-7' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
        </Switch>
        <span>{{ $t('translation.full_text') }}</span>
      </div>
      <div class="ml-10 text-sm font-bold flex space-x-1">
        <div 
          class="cursor-pointer h-8 w-auto px-2 rounded flex items-center"
          v-for="treatment in patientTreatments
            .filter((treatment) => latestTreatmentBlob?.['implant_dates']?.includes(moment(treatment.created_at).format('DD-MM-YYYY')))" :key="treatment.id"
          @click="setTreatmentBlob(treatment)"
          :class="[(activeAppointment !== treatment.visit_id ? 'bg-white text-blue-600 border border-blue-600' : 'bg-blue-600 text-white')]"
        >
          {{ moment(treatment.created_at).format("DD-MM-YYYY") }}
        </div>
      </div>
      <div class="flex items-center" v-if="router.currentRoute.value.name === 'Treatments'">
        <div
          class="border-y border-l border-orange-500 text-orange-500 hover:bg-orange-500 flex space-x-2 items-center hover:text-white cursor-pointer w-26 h-9 p-2 text-sm rounded-l font-normal"
          @click="printCanvas()">
          <PrinterIcon class="h-6" />
          <span>{{ $t('translation.print_text') }}</span>
        </div>
        <div
          v-if="!showVektisPerioChart"
          class="cursor-pointer uppercase place-self-end flex items-center space-x-1 text-sm h-9 py-1.5 px-4 text-center hover:bg-orange-500 hover:text-white w-26 text-orange-500 border border-orange-500"
          @click="$refs.vektisPerioChart.save()">
          <SaveIcon class="h-6 w-6"/>
          <span>{{ $t('translation.save_text') }}</span>
        </div>
        <div
          v-if="showVektisPerioChart"
          class="cursor-pointer uppercase place-self-end flex items-center space-x-1 text-sm h-9 py-1.5 px-4 text-center hover:bg-orange-500 hover:text-white w-26 text-orange-500 border border-orange-500"
          @click="$refs.fullPerioChart.save()">
          <SaveIcon class="h-6 w-6"/>
          <span>{{ $t('translation.save_text') }}</span>
        </div>
        <div
          @click="$refs.perioConfigurations.showModal()"
          class="cursor-pointer uppercase place-self-end text-sm h-9 w-auto space-x-1 px-1 flex items-center justify-center rounded-r hover:bg-orange-500 hover:text-white w-26 text-orange-500 border-y border-r border-orange-500">
          <CogIcon class="h-6" />
          <span>{{ $t('translation.configuration_text') }}</span>
        </div>
        
      </div>
    </div>

    <PerioChartConfiguration ref="perioConfigurations"/>

    <!-- Body -->
    <VektisPerioChart class="ml-10" ref="vektisPerioChart" v-if="!showVektisPerioChart" />
    <FullPerioChart  class="ml-10" ref="fullPerioChart" v-else />
    <!-- End Body -->
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, provide, inject, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router"
import moment from "moment";
import { useStore } from "vuex";
import { PrinterIcon, CogIcon, SaveIcon } from "@heroicons/vue/outline";
import { Switch } from '@headlessui/vue';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

import { storeToRefs } from "pinia";
// import { useTreatmentStore } from "../../pinia/treatments-store";
import { useTreatmentStore } from "../../store/pinia/treatments-store";
import LoaderPage from './LoadingPage.vue';
import PerioChartConfiguration from './configurations/PerioChartConfiguration.vue'
// import useQueueComposable from "../../composables/queue-composable";
import useQueueComposable from "./composables/queue-composable";


const store = useStore(); 

const router = useRouter();

const treatmentStore = useTreatmentStore();

const { latestTreatmentBlob } = storeToRefs(treatmentStore);

const saveType = ref('');

const showVektisPerioChart = ref(false);

const { currentAppointmentInServing } = useQueueComposable();

// const patientTreatments = computed(() => store.state.treatments.patientTreatments);
const patientTreatments = computed(() => store?.state?.treatment?.patientTreatments);

// const activeTreatment = computed(() => store.state.treatments.activeTreatment);
const activeTreatment = computed(() => patientTreatments?.value[0]) ;

const activeAppointment = ref(activeTreatment?.value?.visit_id);

const quadrantArrangements = ref([]);

const activeSequence = ref(['11', '12', '13', '14', '15', '16', '17', '18', '21', '22', '23', '24', '25', '26', '27', '28', '31', '32', '33', '34', '35', '36', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48']);

// const treatmentBlob = activeTreatment.value.length !== 0 ? ref(JSON.parse(activeTreatment.value.tooth_sections)) : inject("treatmentBlob");
const treatmentBlob = ref({
  missing: [],
  11: {},
  12: {},
  13: {},
  14: {},
  15: {},
  16: {},
  17: {},
  18: {},
  21: {},
  22: {},
  23: {},
  24: {},
  25: {},
  26: {},
  27: {},
  28: {},
  31: {},
  32: {},
  33: {},
  34: {},
  35: {},
  36: {},
  37: {},
  38: {},
  41: {},
  42: {},
  43: {},
  44: {},
  45: {},
  46: {},
  47: {},
  48: {},
  tooth_sections:"{}"

})
treatmentBlob.value = (Object?.keys(activeTreatment.value).length !== 0) ? ref(JSON.parse(activeTreatment.value.tooth_sections)) : inject("treatmentBlob");

function setTreatmentBlob(treatment) {
  treatmentBlob.value = JSON.parse(treatment.tooth_sections);
  activeAppointment.value = treatment.visit_id;
}

const VektisPerioChart = defineAsyncComponent({
  loader: () => import("./PerioChartV3.vue"),
  loadingComponent: LoaderPage,
  // errorComponent: 'error',
  timeout: 500000,
  delay: 500,
});

const FullPerioChart = defineAsyncComponent({
  loader: () => import("./PerioChartV2.vue"),
  loadingComponent: LoaderPage,
  // errorComponent: 'error',
  timeout: 500000,
  delay: 500,
});

const switchPerioChartType = () => {
  showVektisPerioChart.value = !showVektisPerioChart.value;
}
const printCanvas = () => {
  let elementToPrint = document.getElementById("PrintPerio");
    html2canvas(elementToPrint, {
        scale: 0.7
    }).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        var pdf = new jsPDF("l", 'mm', [canvas.width, canvas.height]);
        var imgProps = pdf.getImageProperties(imgData);
        var pdfWidth = pdf.internal.pageSize.getWidth();
        var ratio = pdfWidth / imgProps.width;
        var pdfHeight = ratio * imgProps.height
        pdf.internal.pageSize.height = pdfHeight;
        //   Popup
        var frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        var printableCard = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
        printableCard.document.open();
        printableCard.document.write("<img src='" + imgData + "' width='" + pdfWidth + "' height='" + pdfHeight + "' />");
        printableCard.document.close();
        printableCard.setTimeout(() => {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }
            , 500);
    });
}

provide('blobFromMainContainer', treatmentBlob);
provide('quadrantArrangements', quadrantArrangements);
provide('activeSequence', activeSequence);

</script>

<style scoped>

</style>
