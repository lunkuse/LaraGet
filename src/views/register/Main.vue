<template>
  <div
    class="h-screen py-8 overflow-y-auto 2xl:items-center 2xl:justify-center 2xl:flex py-auto"
  >
    <!--  -->
    <DarkModeSwitcher />
    <LanguageSwitcher />
    <div class="">
      <div class="block xl:grid">
        <RegisterForm />

        <!-- BEGIN: Register Info -->

        <!-- END: Register Info -->

        <!-- BEGIN: Register Form -->

        <!-- BEGIN: Account Creation Success Notification Content -->
        <div
          id="success-notification-content"
          class="toastify-content hidden flex"
        >
          <CheckCircleIcon class="text-theme-9" />
          <div class="ml-4 mr-4">
            <div class="font-medium">
              Your Account Has Been Successfully Created
            </div>
          </div>
        </div>
        <!-- END: Account Creation Success Notification Content -->

        <!-- BEGIN: Account Creation Failure Notification Content -->
        <div
          style="background-color: #ff0e0e"
          id="failure-notification-content"
          class="toastify-content hidden flex"
        >
          <XCircleIcon class="text-theme-9" />
          <div class="ml-4 mr-4">
            <div class="font-medium text-white">
              {{ this.message }}
            </div>
          </div>
        </div>
        <!-- END: Account Creation Failure Notification Content -->

        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, inject, ref } from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";

// Validations
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Toastify from "toastify-js";
import moment from "moment";
import TomSelect from "tom-select";
import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher.vue";
import $ from "cash-dom";
import { useI18n } from "vue-i18n";
// import RegisterForm from "./createPatientForm.vue"
import RegisterForm from "./createPatientForm.vue";

export default defineComponent({
  components: {
    DarkModeSwitcher,
    Form,
    Field,
    ErrorMessage,
    LanguageSwitcher,
    RegisterForm,
  },
  setup() {
    const { t } = useI18n({});
    onMounted(() => {
      $("body").removeClass("main").removeClass("error-page").addClass("login");
    });
    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "en";
    const lang = ref(defaultLang);
    return {
      t,
      lang,
    };
  },
  data() {
    // const phoneRegExp =
    //   /^([0]{1}|\+?[256]{3})([7-9]{1})([0-9]{1})([\d]{1})([\d]{6})$/g
    const phoneRegExp = /^\d{9}$/;
    // Define a validation schema
    const schema = yup.object().shape({
      first_name: yup
        .string()
        .required(this.t("translation.firstnameRequired")),
      last_name: yup.string().required(this.t("translation.lastnameRequired")),
      // phone: yup.phone().required('Phone number is required'),
      phone: yup
        .string()
        .required(this.t("translation.phonenumberRequired"))
        .matches(phoneRegExp, this.t("translation.phonenumberNotValid")),
      address: yup.string(),
      email: yup.string().email(this.t("translation.invalidEmailFormat")),
      address: yup.string().required(this.t("translation.addressRequired")),
      gender: yup.string(),
      // birthDate: yup.string().required('Date of birth is required'),
      password: yup
        .string()
        .required("Password is required")
        .min(8)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&.]{8,}$/,
          this.t("translation.containEight") +
            "," +
            this.t("translation.oneUppercase") +
            "," +
            this.t("translation.oneLowercase") +
            "," +
            this.t("translation.oneNumber") +
            "," +
            this.t("translation.oneSpecialCharacter")
        ),
      password_confirmation: yup
        .string()
        .required(this.t("translation.retypePassword"))
        .oneOf(
          [yup.ref("password"), null],
          this.t("translation.matchPassword")
        ),
    });

    return {
      successful: false,
      type: "password",
      loading: false,
      schema,
      error: {},
      // logo: require('@/assets/images/shield1.png'),
      message: "",
      typeconfirm: "password",
      gender: "Male",
      phoneCountryCode: {
        phone: "",
        countryCode: "256",
        countryCode: "31",
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    // eslint-disable-next-line vue/no-dupe-keys
    phone: {
      // getter
      get: function () {
        return `${this.countryCode}${this.phone}`;
      },
      // setter
      set: function (newValue) {
        this.phone = newValue.replace(this.countryCode, "");
      },
    },
  },
  created() {},
  mounted() {
    // if (this.loggedIn) {
    //   this.$router.push("/dashboard");
    // }
  },
  methods: {
    moment,
    showPassword() {
      console.log("toggle password");
      if (this.type === "password") {
        this.type = "text";
        document.getElementById("toggler").className = "fa fa-eye-slash";
        //  toggler.removeClass('fa fa-eye');
        //   toggler.addClass('fa fa-eye-slash');
      } else {
        this.type = "password";
        document.getElementById("toggler").className = "fa fa-eye";
      }
    },
    showPasswordconfirm() {
      console.log("toggle password");
      if (this.typeconfirm === "password") {
        this.typeconfirm = "text";
        document.getElementById("togglerconfirm").className = "fa fa-eye-slash";
        //  toggler.removeClass('fa fa-eye');
        //   toggler.addClass('fa fa-eye-slash');
      } else {
        this.typeconfirm = "password";
        document.getElementById("togglerconfirm").className = "fa fa-eye";
      }
    },
    handleRegister() {
      const user = {
        firstName: this.first_name,
        lastName: this.last_name,
        address: this.address,
        phone: `${
          this.phoneCountryCode.countryCode + this.phoneCountryCode.phone
        }`,
        // birthDate: moment(this.birthDate).format("YYYY-MM-DD"),
        birthDate: moment(this.birthDate).format("DD-MM-YYYY"),
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        gender: this.gender,
      };

      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then((response) => {
        console.log("response.status regi ", response);
        if (response.status == true) {
          this.message = response.message;
          // this.successful = true
          this.loading = false;

          // Notification
          Toastify({
            node: $("#success-notification-content")
              .clone()
              .removeClass("hidden")[0],
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
          }).showToast();

          // Redirect to login page
          this.$router.push("/dashboard").catch((msg) => console.log(msg));
        } else if (response.status == false) {
          this.message = response.error;
          // this.successful = true
          this.loading = false;
          console.log("error message 2222", this.message);
        } else {
          this.message = response.error;
          this.loading = false;

          this.loading = false;
        }
      });
    },
  },
});
</script>

<style scoped>
.xl\:mt-1 {
  margin-top: 10px;
}

.input-group .input-group-text {
  padding-top: 0rem;
  padding-bottom: 0rem;
  padding-left: 0rem;
  padding-right: 0rem;
}

select {
  text-transform: none;
  width: 120px;
  height: 45px;
}
</style>
