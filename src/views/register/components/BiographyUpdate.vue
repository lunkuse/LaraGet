<template>
 
  <div class="p-3 box">
    <div
      v-if="message"
      class="alert alert-outline-danger show flex items-center mb-2 mt-2"
      role="alert"
    >
      {{ message }}
    </div>
    <!-- {{ formValues }} -->
    <Form
      @submit="handleRegister"
      :validation-schema="schema"
      autocomplete="off"
      class="m-h-screen"
      :initial-values="formValues"
    >
      <input autocomplete="false" name="hidden" type="text" class="hidden" />
      <!-- <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 2xl:gap-6">  -->

      <div
        class="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-2"
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
            disabled
          />
          <ErrorMessage
            style="font-size: 13px"
            class="text-theme-6"
            :name="element.name"
          />
        </div>

        <!-- ***   document validation *** -->

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
            disabled
          />

          <ErrorMessage
            name="email"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- phone_number -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Phone Number </label>
          <Field
            type="text"
            name="phone_number"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="phone_number"
            placeholder="Phone number"
          />

          <ErrorMessage
            name="phone_number"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- DOB -->
        
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Date of Birth </label>
          <Field
            type="text"
            name="DOB"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="DOB"
            placeholder="dob"
            disabled
          />

          <ErrorMessage
            name="DOB"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
        
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Gender </label>
          <Field
            type="text"
            name="gender"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="gender"
            placeholder="gender"
            disabled
          />

          <ErrorMessage
            name="gender"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- Id Number -->
       
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Id Number </label>
          <Field
            type="text"
            name="Id_number"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="Id_number"
            placeholder="Id number"
            disabled
          />

          <ErrorMessage
            name="DOB"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
       
        <!-- business name -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Business Name </label>
          <Field
            type="text"
            name="business_name"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="business_name"
            placeholder="business name"
          />

          <ErrorMessage
            name="business_name"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
        <!-- account_number -->
        
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Account Number </label>
          <Field
            type="text"
            name="account_number"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="account_number"
            placeholder="account_number"
          />

          <ErrorMessage
            name="account_number"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
        <!-- country -->

        <div class="flex flex-col">
          <label class="createFormLabel" for=""> Country </label>
          <Field
            type="text"
            name="country"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="country"
            placeholder="country"
          />

          <ErrorMessage
            name="country"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
        <!-- city -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""> City </label>
          <Field
            type="text"
            name="city"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="city"
            placeholder="city"
          />

          <ErrorMessage
            name="city"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- location -->
        <div class="flex flex-col">
          <label class="createFormLabel" for="">Location</label>
          <Field
            type="text"
            name="location"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="location"
            placeholder="location"
          />

          <ErrorMessage
            name="city"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
      </div>

      <div class="intro-x mt-5 xl:mt-8 text-center justify-center">
        <div class="flex justify-between">
          <button
            type="reset"
            data-dismiss="modal"
            class="btn py-1 px-2 closeBTN btn-danger w-40 mr-auto"
          >
            {{ $t("translation.cancel_text") }}
          </button>
          <button
            class="btn py-1 px-2 ml-auto w-40 align-top bg-theme-32 text-white"
            type="submit"
          >
            <LoadingIcon
              v-if="loading"
              icon="spinning-circles"
              color="white"
              class="w-4 h-4 ml-2"
            />
            <span v-else> {{ $t("translation.submit_text") }}</span>
          </button>
        </div>
        <!-- <small class="text-theme-6 mt-2" v-if="error.message">{{
                  error.message
                }}</small> -->
      </div>
    </Form>

    <ProfileImageModal
      @close="closeProfileModal"
      v-if="isProfileVisible"
      @setImage="setImage"
    />
    <Field v-model="photo" name="photo" v-slot="{ value }">
      <input type="file" class="hidden" v-bind="value" />
    </Field>
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw } from "vue";
import moment from "moment";
import * as yup from "yup";
import axios from "axios";

import { Form, ErrorMessage, Field, useFormValues } from "vee-validate";
import ProfileImageModal from "./ProfileImageModal.vue";
import { useStore } from "vuex";

// import Button from "@components/shared/buttons/Button.vue";
import Button from "./Button.vue";
import { TrashIcon } from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";
import searchAddress from "../composables/searchAddress";
import insuranceCompanies from "../composables/insurance/insurance.js";
import $ from "cash-dom";
import countryRegionData from "./../countryRegionData.json";
import Toastify from "toastify-js";
// import router from '../../router'
import router from "../../../router";
const { t } = useI18n();
const store = useStore();
const currentUser = store.state.auth.user;
const first_name = ref("");
const lastName = currentUser?.last_name;

const message = ref("");

// const formValues = useFormValues();
first_name.value = computed(() => currentUser?.first_name);
// computed(() =>  toRaw(
console.log("llll user", store.state.auth.user?.first_name);
const formValues = ref({
  firstName: currentUser?.firstname ?? "",
  middleName: currentUser?.middle_name ?? "",
  lastName: currentUser?.lastname ?? "",
  email: currentUser?.email ?? "",
  phone_number: currentUser?.phone_number ?? "",
  DOB: currentUser?.DOB ?? "",
  business_name: currentUser?.business_name ?? "",
  id_number: currentUser?.Id_number ?? "",
  country: currentUser?.country ?? "",
  city: currentUser?.city ?? "",
  account_number: currentUser?.account_number ?? "",
  gender: currentUser?.gender ?? "",
  location: currentUser?.location ?? "",
});

const resultsPatientPhone = ref();
const resultsHomePhone = ref();
const resultsSecretNumber = ref();
const resultsPrivateNumber = ref();
const resultsNok = ref();
const address = ref("");
const tempPostCode = ref("");
const tempHouseNumber = ref("");
const tempHouseExt = ref("");
// const maritalStatus =
const branches = computed(() => store.getters.getBranches);
const selectedInsurer = ref(formValues?.value?.patientInsurer);
const selectedBranch = ref(formValues.value.branchId);

const today = moment().format("YYYY-MM-DD");
const photo = ref(null);
const imgSrc = ref(localStorage.getItem("profileImgUrl"));
const isProfileVisible = ref(false);
const country_code = ref(currentUser?.country_code ?? "");
const country_name = ref(currentUser?.country ?? "");
const province = ref(currentUser?.province ?? "");
const vmodel = ref("");

const street = ref("");
const municipality = ref("");
const firstName = ref("");

const setImage = (img) => {
  imgSrc.value = URL.createObjectURL(img);
  localStorage.setItem("profileImgUrl", imgSrc.value);
  photo.value = img;
};

const deleteImage = () => {
  photo.value = null;
  imgSrc.value = "";
  localStorage.removeItem("profileImgUrl");
};

const openProfileModal = () => {
  isProfileVisible.value = true;
};

const closeProfileModal = () => {
  isProfileVisible.value = false;
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

const nokEmail = ref(formValues.value.nok_email);

const { searchHome } = searchAddress();
const resetData = (state, code) => {
  // refresh the array of regions according to the country returned from the api
  let data = countryRegionData.filter(
    (country) =>
      country.countryName === state && country.countryShortCode === code
  );
  regionData.value = data[0]?.regions;
};
const phoneCountryCode = {
  phone: "",
  countryCode: "256",
  countryCode: "31",
};

const storedLang = localStorage.getItem("lang");
const defaultLang = storedLang ?? "nl";
const lang = ref(defaultLang);

const email = currentUser?.email;
const Id_number = currentUser?.Id_number;
const DOB = currentUser?.DOB;
const business_name = currentUser?.business_name;
const country = currentUser?.country;
const city = currentUser?.city;
const account_number = currentUser?.account_number;
const gender = currentUser?.gender;
const location = currentUser?.location;
const userID = currentUser?.id;
const successful = ref(false);
const loading = ref(false);
const messagefails = ref("");

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
  // first_name:yup.string().required('This field is required'),

  // last_name: yup.string().required(t("translation.lastnameRequired")),
  email: yup
    .string()
    .email(t("translation.errors.invalidEmail"))
    .required(t("translation.requiredText")),
});


// phone_number,
//         DOB,
//         gender,
//         Id_number,
//         business_name,
//         account_number

const handleRegister = async (values) => {
  console.log("all values", values);

  // const user = {
  //   first_name: values?.firstName,
  //   middle_name: values?.middleName,
  //   last_name: values?.lastName,
  //   email: values?.email,
  // };
  const user = {
    id: userID,
      firstname: values?.firstName,

      // middle_name: values?.middleName,
      last_name: values?.lastName,
      email: values?.email,
      phone_number: values?.phone_number,
      DOB: values?.DOB,
      business_name: values?.business_name,
      id_number: values?.id_number,
      country: values?.country,
      city: values?.city,
      account_number: values?.account_number,
      gender: values?.gender,
      location: values?.location,
    };
    console.log("user to update", user);
    const data = new FormData();
    for (const key in user) {
      data.append(key, user[key]);
    }
 
  // const data = new FormData();

  // data.append("firstName", user?.first_name);
  // data.append("middleName", user?.middle_name);
  // data.append("lastName", user?.last_name);
  // data.append("email", user?.email);

  successful.value = false;
  const token = localStorage.getItem("token");
  loading.value = true;
  axios
    .post(
      "auth/updateUser",
      user,

      {
        headers: {
          Authorization: "Bearer " + token,

          // "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )
    .then((response) => {
      const data = response.payload;
      const notification = document.querySelector(
        ".toastify-content .notification-message"
      );

      console.log(
        "my status, message, payload",
        response.data.status,
        response.data.message,
        response.data.payload
      );
      if (response.data.status == true) {
        const data = response.data.payload;
        loading.value = false;
        messagefails.value = response.data.message;

        console.log("Profile Profile Information Successfully Updated");
        Toastify({
          node: $("#successbio-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
        // this.$router.go('/dashboard/profile')
        store.commit("auth/update", { user: data, isUpdate: true });
        router.push({
          name: "side-menu-profile-overview",
        });
        document.querySelector(".closeBTN").click();
        //     this.$router.go({
        //   name: "side-menu-profile-overview",
        // });
      } else {
        loading.value = false;
        // this.messagesuccesss = response.data.message
        console.log("Profile Profile Information Failed to Update");
        Toastify({
          node: $("#failedbio-notification-content")
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
      // this.basicNonStickyNotificationToggle()
      console.log("response", response);

      return response.data.user_data;
    })
    .then((data) => {
      // Commiting to the updates to the store
      // this.$store.commit("auth/update", { user: data, isUpdate: true });
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
</script>
<style scoped>
.form-control:focus {
  border-width: 1px !important;
  box-shadow: none !important;
}
</style>
