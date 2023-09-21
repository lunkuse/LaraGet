<template>
     <div class="p-3 h-screen ">
    <div class="container mx-auto p-4 box">
      <h1 class="text-2xl font-bold mb-4">Patient Registration Form</h1>
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        <Form @submit="handleRegister" :validation-schema="schema" autocomplete="off">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold">First Name:</label>
              <input
                      class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36" 
                      v-model="formData.firstName"  required />
              <span v-if="errors.firstName">{{ errors.firstName }}</span>
            </div>
            <div>
              <label class="block font-bold">Last Name:</label>
              <input
                      class="intro-x form-control form-input py-3 px-4 block border-gray-200 focus:border-theme-36"
                       v-model="formData.lastName"  required />
              <span v-if="errors.lastName">{{ errors.lastName }}</span>
            </div>
            <div>
              <label class="block font-bold">Mobile Number:</label>
              <input
                      class="intro-x form-input form-control py-3 px-4 block border border-gray-200 focus:border-theme-36"
                       v-model="formData.mobileNumber"  required />
              <span v-if="errors.mobileNumber">{{ errors.mobileNumber }}</span>
            </div>
            <div>
              <label class="block font-bold">Telephone Number:</label>
              <input
                      class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                       v-model="formData.telephoneNumber"  />
            </div>
            <div>
              <label class="block font-bold">Date of Birth:</label>
              <input v-model="formData.dateOfBirth" type="date" class="form-input" required />
              <span v-if="errors.dateOfBirth">{{ errors.dateOfBirth }}</span>
            </div>
            <div>
              <label class="block font-bold">BSN:</label>
              <input v-model="formData.bsn"  class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                      required />
              <span v-if="errors.bsn">{{ errors.bsn }}</span>
            </div>
            <div>
              <label class="block font-bold">Gender:</label>
              <select v-model="formData.gender" class="form-select" required>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
              <span v-if="errors.gender">{{ errors.gender }}</span>
            </div>
            <div>
              <label class="block font-bold">Handicap:</label>
              <select v-model="formData.handicap" class="form-select" required>
                <option value="" disabled>Select Handicap</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span v-if="errors.handicap">{{ errors.handicap }}</span>
            </div>
            <div>
              <label class="block font-bold">Address (Postcode & House No.):</label>
              <input v-model="formData.address" class="form-input" required />
              <!-- Use Henry's API to prefill address here -->
              <span v-if="errors.address">{{ errors.address }}</span>
            </div>
            <div>
              <label class="block font-bold">ID (Document type):</label>
              <input v-model="formData.idType" class="form-input" required />
              <span v-if="errors.idType">{{ errors.idType }}</span>
            </div>
            <div>
              <label class="block font-bold">ID No. (Document Number):</label>
              <input v-model="formData.idNumber" class="form-input" required />
              <span v-if="errors.idNumber">{{ errors.idNumber }}</span>
            </div>
            <div>
              <label class="block font-bold">Geboorteplaats:</label>
              <input v-model="formData.geboorteplaats" class="form-input" required />
              <span v-if="errors.geboorteplaats">{{ errors.geboorteplaats }}</span>
            </div>
            <div>
              <label class="block font-bold">Verzekeraar van de patiënt:</label>
              <input v-model="formData.verzekeraar" class="form-input" required />
              <span v-if="errors.verzekeraar">{{ errors.verzekeraar }}</span>
            </div>
            <div>
              <label class="block font-bold">Verzekeringspolisnummer:</label>
              <input v-model="formData.verzekeringspolisnummer" class="form-input" required />
              <span v-if="errors.verzekeringspolisnummer">{{ errors.verzekeringspolisnummer }}</span>
            </div>
          </div>
          <div class="mt-4">
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div></div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";// Replace "your-form-library" with the actual library you are using for forms
  import * as yup from "yup";
  import VueTelInput from "vue-tel-input";
  import axios from "axios"; // Import Axios library
  
  export default {
    components: {
      Form,
      VueTelInput,
      Field
    },
    data() {
      return {
        formData: {
          firstName: "",
          lastName: "",
          mobileNumber: "",
          telephoneNumber: "",
          dateOfBirth: "",
          bsn: "",
          gender: "",
          handicap: "",
          address: "",
          idType: "",
          idNumber: "",
          geboorteplaats: "",
          verzekeraar: "",
          verzekeringspolisnummer: "",
        },
        errors: {},
        schema: yup.object().shape({
          firstName: yup.string().required("First Name is required"),
          lastName: yup.string().required("Last Name is required"),
          mobileNumber: yup.string().required("Mobile Number is required"),
          dateOfBirth: yup.string().required("Date of Birth is required"),
          bsn: yup.string().required("BSN is required"),
          gender: yup.string().required("Gender is required"),
          handicap: yup.string().required("Handicap is required"),
          address: yup.string().required("Address is required"),
          idType: yup.string().required("ID Type is required"),
          idNumber: yup.string().required("ID Number is required"),
          geboorteplaats: yup.string().required("Geboorteplaats is required"),
          verzekeraar: yup.string().required("Verzekeraar van de patiënt is required"),
          verzekeringspolisnummer: yup.string().required("Verzekeringspolisnummer is required"),
        }),
      };
    },
    methods: {
      handleRegister() {
        this.schema
          .validate(this.formData, { abortEarly: false })
          .then(() => {
            // Form is valid, handle form submission using Axios
            axios
              .post("/api/savePatientData", this.formData) // Replace with your server endpoint
              .then((response) => {
                // Handle success response from the server
                console.log("Form data submitted successfully!", response.data);
                // You can perform any action after successful submission
              })
              .catch((error) => {
                // Handle error from the server
                console.error("Error while submitting form data:", error);
              });
            this.errors = {};
          })
          .catch((err) => {
            // Validation failed, update the errors object with the error messages
            this.errors = {};
            err.inner.forEach((error) => {
              this.$set(this.errors, error.path, error.message);
            });
          });
      },
    },
  };
  </script>
  
  <style>
  /* Add your custom CSS styles here if needed */
  </style>
  