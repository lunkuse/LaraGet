<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 2xl:gap-6">
    <!-- postal code, house number, street -->
    <div class="flex flex-col" v-for="element in formElements" :key="element.id">
      <label class="createFormLabel" for="">{{ element.label }}
        <span :class="element.required === true && 'createFormRequired'"></span></label>
      <Field class="createFormInput" :name="element.name" :type="element.type" :placeholder="element.placeholder"
             @blur.passive="getHomeDetails(element.name, $event)"/>
      <ErrorMessage class="createFormError" :name="element.name"/>
    </div>
    <!-- nationality -->
    <div class="flex flex-col">
      <label class="createFormLabel" for="">{{ t('patients.forms.nationality') }}
        <span class="createFormRequired"></span></label>
      <!-- {{ nationality }} -->
      <div class="flex space-x-6 items-end h-10 ">
        <Field v-model="nationality" class="createFormCheckSelect capitalize" name="nationality">
          <v-select class="w-full capitalize" :options="localization" v-model="nationality"
                    :reduce="country => country.nationality" label="nationality"/>
        </Field>
      </div>
      <ErrorMessage class="createFormError" name="nationality"/>
    </div>
    <!-- country if not passant-->
    <div class="flex flex-col" v-if="formValues.passant === '1'">
      <label class="createFormLabel" for="">{{ t('patients.forms.country') }}</label>
      <Field class="createFormInput" v-model="formValues.country" name="country" type="text"
             :placeholder="t('patients.forms.country')" readonly/>
      <ErrorMessage class="createFormError" name="country"/>
    </div>
    <!-- country if passant -->
    <div class="flex flex-col" v-if="formValues.passant === '0'">
      <label class="createFormLabel" for="">{{ t('patients.forms.country') }}
        <span class="createFormRequired"></span></label>
      <div class="flex space-x-6 items-end h-10">
        <Field v-model="country" name="country">
          <v-select class="w-full" :options="countryRegionData" v-model="country"
                    :reduce="country => country.countryName" label="countryName"
                    @option:selected="setRegionData"/>
        </Field>
        <Field class="!hidden" v-model="countryCode" name="countryCode">
          <input class="!hidden" type="text" v-model="countryCode"/>
        </Field>
        <br/>
      </div>
      <ErrorMessage class="createFormError" name="country"/>
    </div>
    <!-- province if not passant -->
    <div class="flex flex-col" v-if="formValues.passant === '1'">
      <label class="createFormLabel" for="">{{ t('patients.forms.province') }}</label>
      <Field class="createFormInput" name="province" type="text"
             :placeholder="t('patients.forms.province')"/>
      <ErrorMessage class="createFormError" name="province"/>
    </div>
    <!-- province if passant -->
    <div class="flex flex-col" v-if="formValues.passant === '0'">
      <label class="createFormLabel" for="">{{ t('patients.forms.province') }}
        <span class="createFormRequired"></span></label>
      <div class="flex space-x-6 items-end h-10">
        <Field class="createFormInput" name="province" v-model="province">
          <v-select class="w-full capitalize" :options="regionData" v-model="province"
                    :reduce="province => province?.name" label="name"/>
        </Field>
      </div>
      <ErrorMessage class="createFormError" name="province"/>
    </div>
    <!--    country of birth-->
    <div class="flex flex-col">
      <label class="createFormLabel" for="">{{ t('patients.forms.countryOfBirth') }}
        <span class="createFormRequired"></span></label>
      <div class="flex space-x-6 items-end h-10">
        <Field v-model="countryOfBirth" name="countryOfBirth">
          <v-select class="w-full" :options="countryRegionData" v-model="countryOfBirth"
                    :reduce="country => country.countryName" label="countryName"/>
        </Field>
      </div>
      <ErrorMessage class="createFormError" name="countryOfBirth"/>
    </div>
    <!--    place of birth-->
    <div class="flex flex-col">
      <label for="" class="createFormLabel">
        {{ t('patients.forms.placeOfBirth') }}
        <span class="createFormRequired"></span></label>
      <div class="flex space-x-6 items-end">
        <Field class="createFormInput" name="placeOfBirth" type="text" :placeholder="t('patients.forms.placeOfBirth')"/>
      </div>
      <ErrorMessage class="createFormError" name="placeOfBirth"/>
    </div>
  </div>
  <div class="mt-8 border-t border-gray-200 w-full flex transition-all ease-in-out duration-300">
    <p class="py-1 text-yellow-650 font-sans">
      {{ t('patients.forms.emergencyContact') }}<span class="italic text-sm ml-2">{{
        t('patients.forms.sosContact')
      }}</span>
    </p>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-6">
    <div class="flex flex-col" v-for="element in emergencyContactElements" :key="element.id">
      <label class="createFormLabel" for="">{{ element.label }}
        <span :class="element.required === true && 'createFormRequired'"></span></label>
      <Field class="createFormInput" :name="element.name" :type="element.type"
             :placeholder="element.placeholder"/>
      <ErrorMessage class="createFormError" :name="element.name"/>
    </div>
    <div class="flex flex-col">
      <label for="guardianPhone">{{ t('patients.mobile') }}</label>
      <Field v-model="guardianPhone" class="" name="guardianPhone" v-slot="{ field }">
        <MazPhoneNumberInput v-bind="field" show-code-on-list default-country-code="NL" color="info"
                             @update="results = $event" :noExample="false"
                             :preferred-countries="['NL', 'BE', 'DE']"
                             :ignored-countries="['AC']" :success="results?.isValid" size="sm"/>
      </Field>
      <ErrorMessage class="createFormError" name="guardianPhone"/>
    </div>
    <div class="flex flex-col">
      <label for="guardianType">{{ t('patients.forms.guardianType') }}</label>
      <Field class="createFormCheckSelect capitalize" v-model="guardianType" name="guardianType">
        <v-select class="w-full capitalize" :searchable="false" :options="guardianFormElements"
                  v-model="guardianType" :reduce="guardian => guardian.value" label="label"/>
      </Field>
      <ErrorMessage class="createFormError" name="guardianType"/>
    </div>
  </div>
</template>

<script setup>
import {Field, ErrorMessage, useFormValues} from 'vee-validate';
import {inject, ref, onMounted} from 'vue';
import localization from './../nationalities.json';
import countryRegionData from './../countryRegionData.json';
import searchAddress from './../composables/searchAddress';
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const {searchHome} = searchAddress();

const formValues = useFormValues();

const nationality = ref(formValues.value.nationality);
const country = ref(formValues.value.country);
const countryOfBirth = ref(formValues.value.countryOfBirth);
const countryCode = ref(formValues.value.countryCode);
const province = ref(formValues.value.province);
const street = ref(formValues.value.street);
const results = ref();

const regionData = ref();
const setRegionData = (selected) => {
  countryCode.value = selected?.countryShortCode;
  regionData.value = selected?.regions;
}

const address = ref(null);
const tempPostCode = ref('');
const tempHouseNumber = ref('');
const tempHouseExt = ref('');

const resetData = (state, code) => {
  // refresh the array of regions according to the country returned from the api
  let data = countryRegionData.filter((country) => country.countryName === state && country.countryShortCode === code);
  regionData.value = data[0]?.regions;
}
const getHomeDetails = async (field, value) => {
  if (field === 'postalCode') {
    tempPostCode.value = value.target.value;
  }
  if (field === 'houseNumber') {
    tempHouseNumber.value = value.target.value;
  }
  if (field === 'ext') {
    tempHouseExt.value = value.target.value;
    address.value = await searchHome(tempPostCode.value, tempHouseNumber.value, tempHouseExt.value);
    if (address.value) {
      formValues.value.street = address.value.street;
      formValues.value.city = address.value.municipality;
      formValues.value.province = address.value.province;
      formValues.value.country = address.value.country;
      formValues.value.countryCode = address.value.countryCode;
      resetData(address.value.country, address.value.countryCode);
    } else {
      formValues.value.street = "";
      formValues.value.city = "";
      formValues.value.province = "";
      formValues.value.country = "";
      formValues.value.countryCode = "";
    }
  }
}

const formElements = [
  {
    id: 'postalCode',
    label: t('patients.forms.postalCode'),
    required: true,
    name: 'postalCode',
    placeholder: t('patients.forms.postalCode'),
    type: 'text',
  },
  {
    id: 'houseNumber',
    label: t('patients.forms.houseNumber'),
    required: true,
    name: 'houseNumber',
    placeholder: t('patients.forms.houseNumber'),
    type: 'text',
  },
  {
    id: 'ext',
    label: t('patients.forms.ext'),
    name: 'ext',
    placeholder: t('patients.forms.ext'),
    type: 'text',
  },
  {
    id: 'street',
    label: t('patients.forms.streetAddress'),
    required: true,
    name: 'street',
    placeholder: t('patients.forms.streetAddress'),
    type: 'text',
  },
  {
    id: 'city',
    label: t('patients.forms.city'),
    required: true,
    name: 'city',
    placeholder: t('patients.forms.city'),
    type: 'text',
  },
]

const emergencyContactElements = [
  {
    id: 'guardianName',
    label: t('patients.forms.fullName'),
    required: false,
    name: 'guardianName',
    placeholder: t('patients.forms.fullName'),
    type: 'text',
  },
  {
    id: 'guardianEmail',
    label: t('patients.email'),
    required: false,
    name: 'guardianEmail',
    placeholder: t('patients.email'),
    type: 'email',
  },
  {
    id: 'guardianAddress',
    label: t('patients.forms.streetAddress'),
    required: false,
    name: 'guardianAddress',
    placeholder: t('patients.forms.streetAddress'),
    type: 'text',
  },
]

const guardianFormElements = ref([
  {label: t('patients.forms.receiver'), value: "receiver"},
  {label: t('patients.forms.guardian'), value: "guardian"},
]);

const guardianType = ref(formValues.value.guardianType);


onMounted(() => {
  resetData(country.value, countryCode.value);
});

</script>
