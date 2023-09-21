<script setup>
import Modal from './BaseModal.vue';
import {computed} from 'vue';
import Button from './../components/Button.vue';
import {useStore} from "vuex";
import BigLoader from "./../components/BigLoader.vue";
import modalFunctionality from "./../composables/modalComposable";

const {isOpen, showModal, closeModal} = modalFunctionality();

const store = useStore();

const props = defineProps({
  patient: Object,
})

console.log("The patient ", props.patient);

const validateDocumentFunction = () => {
  // use the patients BSN and document Number
}
// const patient = computed(() => store?.state?.patientsPatients?.patient);

defineExpose({
  showModal,
  closeModal,
})
</script>

<template>
  <Modal :showModal="showModal" :closeModal="closeModal" :isOpen="isOpen">
    <template #header>
      {{ $t('patients.forms.validatePatient') }}
    </template>
    <template #body>
      <div class="grid grid-cols-2 gap-2">
        <div id="currentInfo" class="bg-slate-100 text-slate-800 rounded-md flex flex-col space-y-2 px-2">
          <div class="text-lg underline capitalize">
            {{ $t('patients.modals.currentInformation') }}
          </div>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.firstName') }} : </span>
            <span>{{ patient?.firstName }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.lastName') }} : </span>
            <span>{{ patient?.lastName }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.middleName') }} : </span>
            <span>{{ patient?.middleName }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.email') }} : </span>
            <span>{{ patient?.patientEmail }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.ext') }} : </span>
            <span>{{ patient?.ext }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.houseNumber') }} : </span>
            <span>{{ patient?.houseNumber }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.postalCode') }} : </span>
            <span>{{ patient?.postalCode }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.contactInformation.streetName') }} : </span>
            <span>{{ patient?.street }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.countryCode') }} : </span>
            <span>{{ patient?.countryCode }}</span>
          </div>
          <hr>
          <div class="flex space-x-2">
            <span class="font-medium">{{ $t('patients.forms.city') }} : </span>
            <span>{{ patient.city }}</span>
          </div>
          <hr>

        </div>
        <div id="newInfo" class="bg-slate-50 rounded-md flex flex-col space-y-2 px-2">
          <div class="text-lg underline capitalize">
            {{ $t('patients.modals.newInformation') }}
          </div>
          <div class="flex flex-col h-full items-center justify-center">
            <BigLoader/>
            {{ $t('patients.loading') }}
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="bg-white px-3 pt-4 sm:p-6 sm:pb-2">
        <div class="flex justify-end space-x-3 items-start border-t pt-3">
          <Button :label="$t('patients.cancel')" :cancel="true" :transparent="true" class="text-sm p-0.5"
                  type="button" @click="closeModal"/>
          <Button :label="$t('patients.profile.update')" disabled :transparent="true"
                  class="text-sm p-0.5 cursor-not-allowed"
                  type="button"
                  @click=""/>
        </div>
      </div>
    </template>
  </Modal>
</template>
