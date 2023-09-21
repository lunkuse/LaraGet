<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 2xl:gap-6">
    <!-- if patient is not passant -->
    <!-- if patient is passant -->
    <div class="flex flex-col" v-if="formValues?.passant === '0'">
      <label class="createFormLabel" for="">{{ t('patients.forms.patientInsurer') }}
        <span v-if="formValues?.passant === '0'" class="createFormRequired"></span></label>
      <Field v-model="selectedInsurer" class="createFormInput" name="patientInsurer">
        <v-select class="w-full capitalize" :options="insuranceCompanies" :reduce="company => company.value"
                  label="label" v-model="selectedInsurer" @option:selected="setInsuranceCode"/>
      </Field>
      <div class="hidden">
        <Field v-model="formValues.insuranceUzoviCode" name="insuranceUzoviCode"/>
      </div>
      <ErrorMessage class="createFormError" name="patientInsurer"/>
    </div>

    <div class="flex flex-col" v-else>
      <label class="createFormLabel" for="">{{ t('patients.forms.patientInsurer') }}</label>
      <Field class="createFormInput" v-model="formValues.patientInsurer" type="text"
             :placeholder="t('patients.forms.patientInsurer')" name="patientInsurer"/>
      <ErrorMessage class="createFormError" name="patientInsurer"/>
    </div>

    <div class="flex flex-col" v-for="element in formElements" :key="element.id">
      <label class="createFormLabel truncate" for="">{{ element.label }}
        <span :class="element.required === true && 'createFormRequired'"></span></label>
      <Field
          class="createFormInput disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          :name="element.name" :type="element.type" :placeholder="element.placeholder"
          :disabled="element.name === 'fillIfNotFilled' && isInsurerOther"/>
      <ErrorMessage class="createFormError" :name="element.name"/>
    </div>
  </div>
  <div class="mt-8 border-t border-gray-200 w-full flex transition-all ease-in-out duration-300">
    <p class="py-1 text-yellow-650 font-sans">
      {{ t('patients.forms.generalInformation') }}<span class="italic text-sm ml-2">{{
        t('patients.forms.generalOverview')
      }}</span>
    </p>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-6">
    <div class="flex flex-col" v-for="element in generalFormElements" :key="element.id">
      <label class="createFormLabel" for="">{{ element.label }}
        <span :class="element.required === true && 'createFormRequired'"></span></label>
      <Field class="createFormInput" :name="element.name" :type="element.type" :placeholder="element.placeholder"/>
      <ErrorMessage class="createFormError" :name="element.name"/>
    </div>
    <div class="flex flex-col">
      <label for="referreePhone">{{ t('patients.forms.referreePhone') }}</label>
      <Field v-model="referreePhone" class="" name="referreePhone" v-slot="{ field }">
        <MazPhoneNumberInput v-bind="field" show-code-on-list default-country-code="NL" color="info"
                             @update="results =$event"
                             :noExample="false" :preferred-countries="['NL','BE', 'DE']"
                             :ignored-countries="['AC']" :success="results?.isValid" size="sm"/>
      </Field>
      <ErrorMessage class="createFormError" name="referreePhone"/>
    </div>
  </div>
  <div class="mt-8 border-t border-gray-200 w-full flex transition-all ease-in-out duration-300">
  </div>
  <!-- reviews -->
  <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-6 mt-3">
    <div class="col-span-1 lg:col-span-3">
      <label class="createFormLabel" for="">{{ t('patients.forms.notes') }}
        <span class="createFormRequired"></span></label>
      <Field as="textarea" class="createFormTextArea" :placeholder="t('patients.forms.notes')" cols="6"
             rows="4" name="reviews"/>
      <ErrorMessage name="reviews" class="text-red-600"/>
    </div>
  </div>
</template>

<script setup>
import {Field, ErrorMessage, useFormValues} from 'vee-validate';
import {computed, ref} from 'vue';
import insuranceCompanies from "./../composables/insurance/insurance.js";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const formValues = useFormValues();

const results = ref();

const selectedInsurer = ref(formValues?.value?.patientInsurer);


const isInsurerOther = computed(() => selectedInsurer.value !== 'Other');


const formElements = [
  {
    id: 'fillIfNotFilled',
    label: t('patients.forms.fillIfNotFilled'),
    required: false,
    name: 'fillIfNotFilled',
    placeholder: t('patients.forms.fillIfNotFilled'),
    type: 'text',
    disabled: isInsurerOther.value
  },
  {
    id: 'insurancePolicyNumber',
    label: t('patients.forms.insurancePolicyNumber'),
    required: formValues.value?.passant === '1',
    name: 'insurancePolicyNumber',
    placeholder: t('patients.forms.insurancePolicyNumber'),
    type: 'text',
  },
  {
    id: 'additionalInsurance',
    label: t('patients.forms.additionalInsurance'),
    required: false,
    name: 'additionalInsurance',
    placeholder: t('patients.forms.additionalInsurance'),
    type: 'text',
  },
  {
    id: 'additionalInsurancePolicyNo',
    label: t('patients.forms.additionalInsurancePolicyNo'),
    required: false,
    name: 'additionalInsurancePolicyNo',
    placeholder: t('patients.forms.additionalInsurancePolicyNo'),
    type: 'text',
  },
]

const generalFormElements = [

  {
    id: 'referredBy',
    label: t('patients.forms.referredBy'),
    required: false,
    name: 'referredBy',
    placeholder: t('patients.forms.referredBy'),
    type: 'text',
  },
  {
    id: 'referreeEmail',
    label: t('patients.forms.referreeEmail'),
    required: false,
    name: 'referreeEmail',
    placeholder: t('patients.forms.referreeEmail'),
    type: 'text',
  },

]


const setInsuranceCode = (value) => {
  formValues.value.insuranceUzoviCode = value?.code
}
</script>