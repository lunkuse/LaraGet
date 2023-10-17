<template>
  <div
    v-if="message"
    class="alert alert-outline-danger show flex items-center mb-2 mt-2"
    role="alert"
  >
    {{ message }}
  </div>
  <Form
    @submit="handleRegister"
    :validation-schema="schema"
    autocomplete="off"
    class="m-h-screen"
  >
    <input autocomplete="false" name="hidden" type="text" class="hidden" />
    <!-- <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 2xl:gap-6">  -->
    <div
      class="grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-2"
    >
      <div
        class="flex flex-col"
        v-for="element in formElements"
        :key="element.id"
      >
        <label class="createFormLabel" for=""
          >{{ element.label }}
          <span v-if="element.required" class="text-theme-43">*</span></label
        >
        <Field
          class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
          :name="element.name"
          :type="element.type"
          :placeholder="element.placeholder"
          :v-model="vmodel"
        />
        <ErrorMessage
          style="font-size: 13px"
          class="text-theme-6"
          :name="element.name"
        />
      </div>
      <!-- gender -->
      <div class="flex flex-col">
        <label class="createFormLabel" for=""
          >{{ t("translation.forms.gender") }}
          <span class="text-theme-43">*</span></label
        >

        <TomSelect
          class="w-auto col-span-1 focus:border-theme-36"
          id="gender"
          name="gender"
          :placeholder="`${$t('translation.select_gender_text')}`"
          v-model="gender"
        >
          <option value="Male">
            {{ $t("translation.male_text") }}
          </option>
          <option value="Female">
            {{ $t("translation.female_text") }}
          </option>
          <option value="Uknown">
            {{ $t("translation.unknown_text") }}
          </option>
        </TomSelect>
        <ErrorMessage
          name="gender"
          style="font-size: 13px"
          class="text-theme-6"
        />
      </div>

      <!-- dob -->
      <div class="flex flex-col">
        <label class="createFormLabel" for=""
          >{{ t("translation.forms.dateOfBirth") }}
          <span class="text-theme-43">*</span></label
        >

        <div class="flex w-full">
          <Litepicker
            v-model="birthDate"
            placeholder="Date of birth*"
            name="birthDate"
            :options="{
              lang: lang,
              autoApply: true,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1960,
                maxYear: null,
                months: true,
                years: true,
              },
            }"
            class="w-full intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
            style="box-shadow: 0px 3px 5px #00000007"
          />
        </div>
        <ErrorMessage class="createFormError" name="birthDate" />
      </div>

      <!-- telephone phone -->
      <div class="flex flex-col">
        <label for="patientPhone" class="createFormLabel"
          >{{ t("translation.telephoneNumber")
          }}<span class="text-theme-43">*</span>
        </label>
        <!-- telephone phone -->
        <div
          class="input-group p-0 grid grid-flow-col grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid grid-cols-[50%_50%]"
        >
          <!-- v-model="phoneCountryCode.countryCode" -->
          <TomSelect
            class="w-auto col-span-1 focus:border-theme-36"
            as="select"
            name="country"
            id="country"
            v-model="TelephoneCode"
            @change="changeTelephoneCode"
          >
            <option value="256">Uganda +256</option>
            <option value="254">Kenya +254</option>
            <option value="255">Tanzania, +255</option>
          </TomSelect>

          <Field
            value=""
            type="text"
            name="telephoneNumber"
            class="intro-x login__input form-control border-gray-200 focus:border-theme-36 block col-span-3"
            v-model="telephoneNumber"
          />
        </div>

        <ErrorMessage
          name="telephoneNumber"
          style="font-size: 13px"
          class="text-theme-6"
        />
      </div>

      <!-- email -->
      <div class="flex flex-col">
        <label class="createFormLabel" for=""
          >{{ $t("translation.email_text") }}
        </label>
        <Field
          type="email"
          name="email"
          class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
          v-model="email"
          :placeholder="`${$t('translation.email_text')}`"
        />

        <ErrorMessage
          name="email"
          style="font-size: 13px"
          class="text-theme-6"
        />
      </div>
      <!-- password -->
      <div class="flex flex-col">
        <label class="createFormLabel" for=""
          >{{ $t("translation.password_text") }}
        </label>

        <div class="w-full input-group border-gray-200 focus:border-theme-36">
          <Field
            name="password"
            class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
            v-model="password"
            :placeholder="`${$t('translation.password_text')}`"
            :type="type"
            value
            style="box-shadow: 0px 3px 5px #00000007"
            id="password_field"
          />

          <div
            class="py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 rounded-none first:rounded-l last:rounded-r"
            id="input-group-email"
            @click="showPassword"
          >
            <i class="fa fa-eye" aria-hidden="true" id="toggler"></i>
          </div>
        </div>

        <ErrorMessage
          name="password"
          style="font-size: 13px"
          class="text-theme-6"
        />
      </div>

      <!-- confirm password -->
      <div class="flex flex-col">
        <label class="createFormLabel" for=""
          >{{ $t("translation.password_confirmation_text") }}
        </label>
        <div class="w-full input-group border-gray-200 focus:border-theme-36">
          <Field
            class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
            name="password_confirmation"
            :placeholder="`${$t('translation.password_confirmation_text')}`"
            :type="typeconfirm"
            value
            style="box-shadow: 0px 3px 5px #00000007"
            id="password_field"
          />

          <div
            class="py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 rounded-none first:rounded-l last:rounded-r"
            id="input-group-email"
            @click="showPasswordconfirm"
          >
            <i class="fa fa-eye" aria-hidden="true" id="togglerconfirm"></i>
          </div>
        </div>

        <ErrorMessage
          name="password_confirmation"
          style="font-size: 13px"
          class="text-theme-6"
        />
      </div>

      <div class="flex flex-col">
  <label class="createFormLabel">
    Upload Business Documents
    <span class="text-theme-43">*</span>
  </label>

  <input
    type="file"
    name="businessDocuments"
    accept=".jpg, .jpeg, .png, .pdf, .xlsx, .xls, .doc, .docx, .ppt, .pptx"
    @change="handleBusinessDocuments"
    multiple
    class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
  />

  <ErrorMessage
    name="businessDocuments"
    style="font-size: 13px"
    class="text-theme-6"
  />

  <!-- Display the selected business documents -->
<div class="selected-documents">
  <p v-if="selectedFiles.length > 0">Selected Business Documents:</p>
  <ul v-if="selectedFiles.length > 0">
    <li v-for="(document, index) in selectedFiles" :key="index">
      {{ document.name }}
    </li>
  </ul>
</div>
</div>
    </div>

    <div class="intro-x mt-5 xl:mt-8 text-center justify-center">
      <button
        class="btn py-3 px-4 mr-auto align-top bg-theme-1 text-white"
        type="submit"
      >
        <LoadingIcon
          v-if="loading"
          icon="spinning-circles"
          color="white"
          class="w-4 h-4 ml-2"
        />
        <span v-else> {{ $t("translation.global.register") }}</span>
      </button>

      <!-- <small class="text-theme-6 mt-2" v-if="error.message">{{
                  error.message
                }}</small> -->
    </div>
  </Form>
  <div
    class="text-center justify-center intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
  >
    <span>
      <a href="" class="font-bold">
        {{ $t("translation.auth.already_have_an_account_text") }}?</a
      ><router-link
        to="/login"
        class="
        "
        ><a class="text-theme-1 font-bold ml-2 hover:underline">
          {{ $t("translation.auth.signIn") }}</a
        ></router-link
      ></span
    >
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import moment from "moment";
import * as yup from "yup";

import { Form, ErrorMessage, Field, useFormValues } from "vee-validate";
import ProfileImageModal from "./ProfileImageModal.vue";
import { useStore } from "vuex";
// import Button from "@components/shared/buttons/Button.vue";
import Button from "./Button.vue";
import { TrashIcon } from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";

import $ from "cash-dom";
import Toastify from "toastify-js";

// import router from '../../router'
import router from "../../../router";
const { t } = useI18n();
// const selectedFiles = ref([]);

// const handleFileChange = (event) => {
//   const allselectedFiles = event.target.files;
//   selectedFiles.value = Array.from(allselectedFiles);
// };
const first_name = ref("");
const lastName = ref("");
const birthDate = ref("");
const document_type = ref("");
const message = ref("");
const regionData = ref();

const formValues = ref({
  firstName: "",
  middleName: "",
  lastName: "",
  idNumber: "",
  location: "",
  patientEmail: "",
  patientPhone: "",

  homePhone: "",

  birthDate: "",
  maritalStatus: "",
  gender: "Male",

  nationality: "Dutch",
  country: "Uganda",
  countryCode: "NL",
  city: "",
});

const resultsPatientPhone = ref();
const resultsHomePhone = ref();

const address = ref(null);

const store = useStore();

const today = moment().format("YYYY-MM-DD");
const photo = ref(null);
const imgSrc = ref(localStorage.getItem("profileImgUrl"));
const isProfileVisible = ref(false);
const country_code = ref("");
const country_name = ref("");

const vmodel = ref("");

const firstName = ref("");
const TelephoneCode = ref("256");

const telephoneNumber = ref("256");

const changeTelephoneCode = () => {
  console.log("telephone changed");
  telephoneNumber.value = TelephoneCode.value;
};
const changePhoneCode = () => {};
const setImage = (img) => {
  imgSrc.value = URL.createObjectURL(img);
  localStorage.setItem("profileImgUrl", imgSrc.value);
  photo.value = img;
};

const formElements = [
  {
    id: "firstName",
    label: t("translation.forms.firstName"),
    required: true,
    name: "firstName",
    placeholder: t("translation.forms.firstName"),
    type: "text",
    vmodel: "firstName",
  },
  {
    id: "middleName",
    label: t("translation.forms.middleName"),
    required: false,
    name: "middleName",
    placeholder: t("translation.forms.middleName"),
    type: "text",
  },
  {
    id: "lastName",
    label: t("translation.forms.lastName"),
    required: true,
    name: "lastName",
    placeholder: t("translation.forms.lastName"),
    type: "text",
  },
  {
    id: "idNumber",
    label: t("translation.forms.idNumber"),
    required: true,
    name: "idNumber",
    placeholder: t("translation.forms.idNumber"),
    type: "text",
  },
  {
    id: "country",
    label: t("translation.forms.country"),
    required: true,
    name: "country",
    placeholder: t("translation.forms.country"),
    type: "text",
  },
  {
    id: "city",
    label: t("translation.forms.city"),
    required: true,
    name: "city",
    placeholder: t("translation.forms.city"),
    type: "text",
  },
  {
    id: "location",
    label: t("translation.forms.location"),
    required: true,
    name: "location",
    placeholder: t("translation.forms.location"),
    type: "text",
  },
  {
    id: "business_name",
    label: t("translation.forms.business_name"),
    required: true,
    name: "business_name",
    placeholder: t("translation.forms.business_name"),
    type: "text",
  },
  {
    id: "business_account",
    label: t("translation.forms.business_account"),
    required: true,
    name: "business_account",
    placeholder: t("translation.forms.business_account"),
    type: "text",
  },
];

const contactFormElements = [
  {
    id: "patientEmail",
    label: t("translation.auth.email"),
    required: false,
    name: "patientEmail",
    placeholder: t("translation.auth.email"),
    type: "email",
  },
];

const genderFormElements = ref([
  { label: t("translation.forms.male"), value: "Male" },
  { label: t("translation.forms.female"), value: "Female" },
  { label: t("translation.forms.nonBinary"), value: "Non-Binary" },
]);

const gender = ref(formValues.value.gender);

const phoneCountryCode = {
  phone: "",
  countryCode: "256",
  countryCode: "31",
};

const storedLang = localStorage.getItem("lang");
const defaultLang = storedLang ?? "nl";
const lang = ref(defaultLang);
const type = ref("password");
const typeconfirm = ref("password");
const phoneRegExp = /^\d{9}$/;
const password = ref("");
const last_name = ref("");
const email = ref("");
const successful = ref(false);
const loading = ref(false);

const password_confirmation = ref("");

const showPassword = () => {
  console.log("toggle password");
  if (type.value === "password") {
    type.value = "text";
    document.getElementById("toggler").className = "fa fa-eye-slash";
    //  toggler.removeClass('fa fa-eye');
    //   toggler.addClass('fa fa-eye-slash');
  } else {
    type.value = "password";
    document.getElementById("toggler").className = "fa fa-eye";
  }
};
const showPasswordconfirm = () => {
  console.log("toggle password");
  if (typeconfirm.value === "password") {
    typeconfirm.value = "text";
    document.getElementById("togglerconfirm").className = "fa fa-eye-slash";
    //  toggler.removeClass('fa fa-eye');
    //   toggler.addClass('fa fa-eye-slash');
  } else {
    typeconfirm.value = "password";
    document.getElementById("togglerconfirm").className = "fa fa-eye";
  }
};

const selectedFiles = ref([]); 

const handleBusinessDocuments = (event) => {
  const allSelectedFiles = event.target.files;
  selectedFiles.value = Array.from(allSelectedFiles);
const messageFeed=ref("")
  // Provide user feedback
  if (selectedFiles.value.length > 0) {
    messageFeed.value = `${selectedFiles.value.length} file(s) selected`;
  } else {
    message.value = ''; // No files selected
  }
};

// Define a validation schema

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[^\s@#!$%*()\{\}\?\|><]+(\s[^\s@#!$%*()\{\}\?\|><\]-]+)*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .trim()
    .required(
      t("translation.requiredText")
      // t('translation.errors.firstNameRequired')
    ),
  lastName: yup
    .string()
    .matches(/^[^\s@#!$%*()\{\}\?\|><]+(\s[^\s@#!$%*()\{\}\?\|><\]-]+)*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .trim()
    .required(
      t("translation.requiredText")
      // t('translation.errors.lastNameRequired')
    ),
  middleName: yup
    .string()
    .matches(/^[^\s@#!$%*()\{\}\?\|><]+(\s[^\s@#!$%*()\{\}\?\|><\]-]+)*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .trim(),
  idNumber: yup.string().required("This field is required"),
  location: yup.string().required("This field is required"),
  // last_name: yup.string().required(t("translation.lastnameRequired")),
  email: yup
    .string()
    .email(t("translation.errors.invalidEmail"))
    .required(t("translation.requiredText")),
  telephoneNumber: yup.string(),
  city: yup
    .string()
    .matches(/^[a-zA-Z0-9_\-\. ]+$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .required(
      t("translation.requiredText")
      // t('translation.errors.cityRequired')
    ),

  business_name: yup.string().required(t("translation.requiredText")),
  business_account: yup.string().required(t("translation.requiredText")),

  password: yup.string().required(t("translation.requiredText")),

  password_confirmation: yup
    .string()
    .required(t("translation.requiredText"))
    .oneOf([yup.ref("password"), null], t("translation.matchPassword")),
});

const handleRegister = async (values) => {
  console.log("all values", values);

  const user = {
    firstName: values?.firstName,
    middleName: values?.middleName,
    lastName: values?.lastName,
    idNumber: values?.idNumber,
    location: values?.location,
    patientPhone: values?.patientPhone,
    business_name: values?.business_name,
    business_account: values?.business_account,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    homePhone: values?.homePhone,

    birthDate: moment(birthDate.value).format("DD-MM-YYYY"),
    maritalStatus: values?.maritalStatus,

    gender: gender.value,
    nationality: values?.nationality,
    country: values?.country,
    countryCode: address.value?.countryCode,
    city: values?.city,
    telephoneNumber: values?.telephoneNumber,
  };

  successful.value = false;
  loading.value = true;

  store.dispatch("auth/register", user).then((response) => {
    console.log("response.status regi ", response);
    if (response.status === "success") {
      // message.value = response.message;
      message.value = "Registered Successfully";
      // this.successful = true
      loading.value = false;

      // Redirect to login page
      router.push("/dashboard").catch((msg) => console.log(msg));
    } else if (response.status == false) {
      message.value = response.error;
      // this.successful = true
      loading.value = false;
      // console.log("error message 2222", message.value);
    } else {
      message.value = response.error;
      loading.value = false;
    }
  });
};
</script>
