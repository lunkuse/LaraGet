<template>
<div>
  <div class="grid grid-cols-6 items-start gap-4 ml-3 bg-gray-100 pt-2 rounded-sm">
    <div class="col-start-1 col-span-5">
      <div class="min-h-[256px]">
        <div v-if="!info.risks.data" class="h-full text-sm flex flex-col gap-2 text-gray-800 items-center justify-center">
          <img src="@/assets/images/nodata.svg" class="h-48 w-48" alt="No risk assessment history"/>
          <p>{{translations?.no_risk_assesment_available_for_text ?? 'No Risk assessment available for'}} <span class="font-bold text-md">
            <!-- {{ `${patient.first_name}  ${patient.last_name}`}} -->
            </span></p>
        </div>
      </div>
    </div>
    <div>
      <div>{{ info.risks.doctor }}</div>
    </div>
  </div>
  <div class="items-start ml-3 mt-4">
    <DentalInfoForm :info="info" />
  </div></div>
</template>

<script>
import { defineComponent , inject} from '@vue/runtime-core';
import DentalInfoForm from './DentalInfoForm.vue';

export default defineComponent({
  components: {
    DentalInfoForm,
  },
  props: {
    info: {
      required: true,
    },
  },
  setup(){
    const patient = JSON.parse(sessionStorage.getItem('SinglePatient'));
    const translations = inject('translation_v3')
    return {
      patient,
      translations
    }
  }
});
</script>
