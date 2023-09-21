<script setup>
import {ref, computed, onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import Modal from './../modals/BaseModal.vue'
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from '@headlessui/vue';
// import Button from '.FormWizard.vue';
import moment from 'moment';
import debounce from 'lodash.debounce';
import BigLoader from './BigLoader.vue';
import {SearchIcon, ExclamationCircleIcon} from "@heroicons/vue/outline";
import modalFunctionality from "./../composables/modalComposable";

const {showModal, closeModal, isOpen} = modalFunctionality()

const open = ref(true);
const emit = defineEmits(['setFamilyData', 'close'])

const search_term = ref('');

const store = useStore();
const selectedPatient = ref();
const setSelectedPatient = (patient) => {
  selectedPatient.value = patient;
  emit('setFamilyData', patient);
  closeModal()
}

const filteredPatients = computed(() => store?.state?.patientsPatients?.approvedPatients?.data);
const search_patients = debounce(() => {
  store.dispatch("autoFillPatients", {keyword: search_term.value});
}, 600);

onBeforeMount(() => {
  store.dispatch("getApprovedPatients");
});

const loadingPatientsApproved = computed(() => store?.state?.patientsPatients?.status?.approvedPatients);
const loadingStatus = computed(() => {
  if (loadingPatientsApproved?.value?.loading === true) {
    return true
  } else {
    return false
  }
});
const loading_search_status = computed(() => {
  if (loadingPatientsApproved?.value?.loading_search === true) {
    return true
  } else {
    return false
  }
});
const loading_error = computed(() => {
  if (loadingPatientsApproved?.value?.error === true) {
    return true
  } else {
    return false
  }
});

defineExpose({
  showModal,
  closeModal
})
</script>


<template>
  <Modal :showModal="showModal" :closeModal="closeModal" :isOpen="isOpen">
    <template #header>
      {{ $t('patients.forms.autoFill') }}
    </template>
    <template #body>
      <div id="search" class="w-full">
        <form class="w-full" @submit.prevent>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon class="w-5 h-5 text-gray-500"/>
            </div>
            <input type="search"
                   class="w-full text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-25 rounded-md border-2 h-10 px-3 py-2 pl-10 focus:border-yellow-650 focus:outline-none"
                   :placeholder="$t('patients.patientList.searchPatients')" v-model="search_term"
                   @input="search_patients()"/>
          </div>
        </form>
      </div>

      <div class="h-96 w-full overflow-y-scroll scrollContent px-4 py-2">
        <div class="w-full h-full flex flex-col items-center justify-center space-y-2"
             v-if="loadingStatus === true">
          <BigLoader class=""/>
          <p class="text-xl font-sans">{{ $t('patients.patientList.loadingPatients') }}...</p>
        </div>
        <div class="w-full h-full flex flex-col items-center justify-center space-y-2"
             v-else-if="loading_search_status === true">
          <BigLoader class=""/>
          <p class="text-xl font-sans">{{ $t('patients.patientList.loadingPatients') }}...</p>
        </div>
        <div class="w-full h-full flex flex-col items-center justify-center space-y-2"
             v-else-if="loadingStatus === false && loading_error === true">
          <ExclamationCircleIcon class="h-24 w-24 text-red-600 animate-pulse"/>
          <p class="text-2xl font-sans">{{
              $t('patients.patientList.errorLoading')
            }}...</p>
          <p class="text-2xl font-sans">{{
              $t('patients.patientList.refreshPage')
            }}...</p>
        </div>
        <ul v-else-if="filteredPatients?.length > 0" class="flex flex-col space-y-1">
          <li v-for="patient in filteredPatients" :key="patient?.id"
              class="flex items-center space-x-6 cursor-pointer hover:bg-gray-300 hover:shadow-sm p-1 rounded-md border-b"
              @click="setSelectedPatient(patient)">
            <div
                class="bg-yellow-650 h-10 w-10 rounded-full flex flex-shrink-0 text-white items-center justify-center">
              {{ `${patient?.first_name[0]}${patient?.last_name[0]}` }}
            </div>
            <span class="text-lg text-gray-800">
                        {{ patient.first_name }}{{ " " }}{{ patient.last_name }}
                      </span>
            <span class="text-sm text-gray-700">
                        ({{
                moment(patient?.birth_date ?? "01-01-2000",
                    "DD-MM-YYYY").toNow(true)
              }})
                      </span>
          </li>
        </ul>
        <div class="h-full w-full flex flex-col items-center justify-center" v-else>
          <img class="h-48 w-48" src="../../../assets/images/nodata.svg" alt="No patients found">
          <span class="text-xl">{{ $t('patients.forms.noResultFound') }}</span>
        </div>
      </div>
    </template>
    <template #footer></template>
  </Modal>
</template>

<style scoped>
.scrollContent::-webkit-scrollbar {
  width: 8px;

}

.scrollContent::-webkit-scrollbar-track {
  border-radius: 8px;

}

.scrollContent::-webkit-scrollbar-thumb {
  background: #EECEAF;
  padding: 5px;
  border-radius: 8px;
}
</style>