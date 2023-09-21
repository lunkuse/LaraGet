<template>
  <div class="p-3 box">
    <!-- <FormWizard   :initial-values="formValues"> -->
      <FormWizard >
      <FormStep>
        <PatientBiography/>
      </FormStep>

    </FormWizard>
  </div>
</template>

<script setup>
import {inject, onBeforeMount, ref} from "vue";
import * as yup from "yup";
import FormWizard from "./components/FormWizard.vue";
import FormStep from "./components/FormStep.vue";
import PatientBiography from "./components/PatientBiography.vue";
import PatientAddress from "./components/PatientAddress.vue";
import PatientInsurance from "./components/PatientInsurance.vue";
import moment from "moment";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import customAxios from "../../axios";
import insuranceCompanies from './composables/insurance/insurance.js'
import {useI18n} from "vue-i18n";

const {t} = useI18n();
// Initial values to prevent default undefined behavior of vee-validate fields
const formValues = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  patientEmail: "",
  patientPhone: "",
  BSN: "",
  passant: "0",
  homePhone: "",
  secretNumber: "",
  privateNumber: "",
  birthDate: "",
  maritalStatus: "",
  is_disabled: "No",
  gender: "Male",
  nokName: "",
  nokPhoneNumber: "",
  nokEmail: "",
  nationality: "Dutch",
  country: "Netherlands",
  countryCode: "NL",
  city: "",
  province: "",
  ext: "",
  guardianEmail: "",
  guardianPhone: "",
  guardianAddress: "",
  fillIfNotFilled: "",
  guardianName: "",
  guardianType: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  patientInsurer: insuranceCompanies?.value[0]?.label,
  insuranceUzoviCode: insuranceCompanies?.value[0]?.code,
  insurancePolicyNumber: "",
  additionalInsurance: "",
  additionalInsurancePolicyNo: "",
  reviews: "",
  referredBy: "",
  referreeEmail: "",
  referreePhone: "",
  branchId: "",
  documentType: "",
  documentNumber: "",
  lastNameOfPartner: "",
  countryOfBirth: "Netherlands",
  placeOfBirth: "",
});

const today = moment().format("YYYY-MM-DD");

onBeforeMount(() => {
  // clear image if there is one
  // localStorage.removeItem("profileImgUrl");

  // store.dispatch("fetchAllBranches");
});

const router = useRouter();
const store = useStore();




</script>

<style scoped>/* class="swal2-popup swal2-toast colored-toast swal2-icon-success swal2-show" */
.swal2-toast .swal2-popup .colored-toast .swal2-icon-success {
  background-color: #a5dc86 !important;
}

.colored-toast .swal2-title {
  color: white;
}

.colored-toast .swal2-close {
  color: white;
}

.colored-toast .swal2-html-container {
  color: white;
}</style>