<template>
  <div class>
    <DarkModeSwitcher />
    <LanguageSwitcher />
    <div class="container sm:px-10 ">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href class="-intro-x flex items-center pt-5">
            <img
              alt="Metadent"
              class="w-10 h-10 font-medium"
              src="../../assets/images/shield1.png"
            />
            <span class="text-white text-lg ml-3">
              <span class="font-medium"> Application</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="Portal"
              class="-intro-x w-1/2 -mt-16"
              src="../../assets/images/illustration.svg"
            />
          </div>
        </div>

        <!-- END: Login Info -->

        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto bg-white dark:bg-dark-1 xl:bg-white px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto xl:w-auto items-center content-center box"
          >
          <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              {{ $t("translation.auth.signIn") }}
            </h2>
            <div
              class="intro-x mt-5 xl:mt-8 text-center xl:text-left"
         
            >
              <button
                class="btn btn-facebook py-3 px-4 w-full xl:w-33 xl:mr-3 align-top"
              >
                <FacebookIcon class="w-5 h-5 mr-2" /> Facebook Sign In
              </button>

              <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-33 mt-3 xl:mt-1 align-top"
              >
                <img
                  alt="MFI Client"
                  class="w-5 h-5 mr-2"
                  src="../../assets/images/google.png"
                />Google Sign In
              </button>
            </div>
            <a
              href
              class="-intro-x flex items-center pt-5 2xl:hidden xl:hidden lg:flex md:flex sm:flex"
            >
              <img
                alt="Metadent"
                class="w-10 h-10 font-medium"
                src="../../assets/images/shield1.png"
              />
              <span class="text-4xl ml-1 font-medium leading-none text-theme-3">
                <span class="font-medium">Application</span>
              </span>
            </a>

            <div
              v-if="message"
              class="alert alert-outline-danger show flex items-center mb-2 mt-2"
              role="alert"
            >
              {{ message }}
            </div>

            <form
              v-if="verifyNow"
              class="validate-form"
              @submit.prevent="verifyEmail"
              autocomplete="off"
            >
              <div class="intro-x mt-8">
                <label
                  for="update-profile-form-1"
                  class="form-label font-semibold"
                >
                 {{ $t('translation.enter_verification_text') }} 
                  <span class="text-theme-6">*</span>
                </label>
                <div
                  class="input-group p-0 border-gray-200 focus:border-theme-36"
                >
                  <input
                    type="text"
                    name="identifier"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36"
                    v-model="recievedCode"
                    :placeholder="`${$t('translation.code_text')}`"
                    id="identifier_field"
                  />
                </div>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn py-3 px-4 w-full align-top btn-primary text-white"
                  type="submit"
                  id="submit_button"
                >
                  <LoadingIcon
                    v-if="loadingCode"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else> {{ $t("translation.submit_text") }}</span>
                </button>
              </div>
            </form>

            <!-- Form start-->
            <Form
              v-if="loginNow"
              @submit="handleSignIn"
              :validation-schema="schema"
              autocomplete="off"
            >
              <div class="intro-x mt-8">
                <div
                  class="input-group mt-2 p-0 border-gray-200 focus:border-theme-36"
                >
                  <Field
                    type="text"
                    name="identifier"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36"
                    v-model="identifier"
                    :placeholder="`${$t('translation.auth.email')}`"
                    id="identifier_field"
                  />
                </div>
                <ErrorMessage
                  name="identifier"
                  style="font-size: 13px"
                  class="text-theme-6"
                />

                <!-- Password -->

                <div class="flex">
                  <div
                    class="w-full mt-4 input-group border-gray-200 focus:border-theme-36"
                  >
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
                </div>

                <ErrorMessage
                  name="password"
                  style="font-size: 13px"
                  class="text-theme-6"
                />
                <!-- <small class="text-theme-6 mt-2">{{ passwordError }}</small> -->
              </div>
              <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <a href="/reset" class="text-primary"
                  >{{ $t("translation.auth.forgotPassword") }}?</a
                >
                <div class="flex items-center mr-auto" style="display: none">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me">
                    {{ $t("translation.auth.rememberMe") }}</label
                  >
                </div>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn py-3 px-4 w-full align-top btn-primary text-white"
                  type="submit"
                  id="submit_button"
                >
                  <LoadingIcon
                    v-if="loading"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else> {{ $t("translation.auth.login") }}</span>
                </button>
              </div>
              <small class="text-theme-6 mt-2" v-if="error.message">{{
                error.message
              }}</small>
            </Form>
            <div id="”app”"></div>
            <div
              class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
            >
              <h4 class="font-bold">
                <span>
                  {{ $t("translation.auth.dontHaveAnAccount") }}
                </span>
                <!-- <router-link to="/register" @click="navigateToRegister"> -->
                  <a class="text-primary font-bold ml-2" @click="navigateToRegister">
                    {{ $t("translation.auth.signUp") }}
                  </a>
                <!-- </router-link> -->
              </h4>
            </div>
            <!-- <div id="divtoshow" style="position: fixed;display:none;">test</div>
    <br><br>
    <span @mouseover="hoverdiv($event,'divtoshow')" @mouseout="hoverdiv($event,'divtoshow')">Mouse over this</span> -->

            <!-- Notification Alert Start -->
            <div
              id="basic-non-sticky-notification-content"
              class="toastify-content hidden flex flex-col sm:flex-row"
            >
              <div class="font-medium notification-message"></div>
            </div>
            <!-- Notification Alert End -->

            <!-- Form End -->
            <div
              class="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left"
              style="display: none"
            >
              By signing in, you agree to our
              <br />
              <a class="text-theme-1 dark:text-theme-10" href
                >Terms and Conditions</a
              >
              &
              <a class="text-theme-1 dark:text-theme-10" href>Privacy Policy</a>
            </div>
          </div>
        </div>

        <!-- END: Login Form -->
      </div>
    </div>
    <Toast v-if="successtoast === true" :successmeassage="successmeassage" />
    <FailToast v-if="failtoast === true" :failmessage="failmessage" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, computed } from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher.vue";
import Toast from "@/components/toast/Toast.vue";
import FailToast from "@/components/toast/FailToast.vue";
import Cash from "../../utils/cash";
import { useI18n } from "vue-i18n";
import { useStore } from 'vuex'
import AuthService from "../../service/auth-service.js";
// Validations
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  components: {
    DarkModeSwitcher,
    Form,
    Field,
    ErrorMessage,
    Toast,
    FailToast,
    LanguageSwitcher,
  },
  setup() {
  
    const { t } = useI18n({});
    onMounted(() => {
      Cash.cashDom();
    });

    return {
      t,
    };
  },
  watch: {
    loginStatus: function () {
      this.statusresponse = localStorage.getItem("loginstatus");
    },
  },
  data() {
    // Define a validation schema
    const schema = yup.object().shape({
      identifier: yup.string().email().required(this.t("translation.emailRequired") ),
      password: yup.string().required(this.t("translation.passwordRequired")),
    });

    return {
      loading: false,
      loadingCode: false,
      successtoast: false,
      failtoast: false,
      schema,
      error: {},
      message: "",
      identifier: "",

      statusresponse: "",
      type: "password",
      failmessage: "Login failed, Check your Credentials",
      successmeassage: "Successfully Logged In",
      verifyNow: false,
      loginNow: true,
      codeToken: "",
      codeReceived: "",
      recievedCode: "",
      password:""
    };
  },
  computed: {
    loggedIn() {
      console.log(
        "this.$store.state.auth.status.loggedIn",
        this.$store?.state?.auth?.status?.loggedIn
      );
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    console.log("created login: current lang", localStorage.getItem("lang"));
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    navigateToRegister() {
      this.$router.push('/register'); 
    },
    hoverdiv(e, divid) {
      console.log("hovering", e);
      var left = e.clientX + "px";
      var top = e.clientY + "px";

      var div = document.getElementById(divid);

      div.style.left = left;
      div.style.top = top;

      $("#" + divid).toggle();
      return false;
    },
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
    handleSignIn() {
      console.log("login: current lang", localStorage.getItem("lang"));
      const user = {
        identifier: this.identifier,
        password: this.password,
      };
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        (res) => {
          this.loading = false;

          if (res?.status === true) {
            // this.$router.push('/dashboard').catch((err) => console.log(err))
            const store = useStore()
const patientId = computed(() => this.$store.state.auth.user);

this.$store.dispatch('treatment/patientsFetch', patientId.value.id);
// // emailCode

if (res?.status === true){
  // console.log('inside true check code status',res?.status)
  this.message = this.t("translation.emailCode");
}


else{
  this.message = res?.message;
}
            // this.message = res?.message;
            this.codeToken = res?.payload?.token;

            console.log("code message", this.codeToken, this.codeReceived);
            (this.verifyNow = true), (this.loginNow = false);
            // this.successtoast = true
          }
        },
        (error) => {
        
          if(error==="The combination of email and password is incorrect please check your details & try again. 3 attempts remaining")
        {

          console.log('got new error', error)
          this.message = this.t("translation.wrongEmailPassword");
          this.failmessage = this.t("translation.wrongEmailPassword");
        }
        else{
          this.message = error;
          this.failmessage = error;
        }
          
          this.loading = false;
          
          
          this.failtoast = true;
        }
      );
    },

    verifyEmail() {
      console.log("inside email verification");
      this.loadingCode = true;
      this.codeReceived = this.recievedCode;
      const data = { code: this.codeReceived, token: this.codeToken };

      this.$store.dispatch("auth/verification", data).then(
        (res) => {
          this.loadingCode = false;
          console.log("final code response", res);
          
          if (res.status) {
            this.$router.push("/dashboard").catch((err) => console.log(err));
          }
        },
        (error) => {
          this.loadingCode = false;
          this.message = error;
        }
      );

      // AuthService.verifyEmail(data)
      //   .then((data) => {
      //     this.loadingCode = false
      //     console.log('data',data)
      //     if (data.success) {

      //       this.$router.push('/dashboard').catch((err) => console.log(err))

      //     } else {

      //       this.loadingCode = false
      //       console.log('verify error', data?.error)
      //       this.message = data?.error
      //       Toastify({
      //         node: $('#code-notification-content')
      //           .clone()
      //           .removeClass('hidden')[0],
      //         duration: 3000,
      //         newWindow: true,
      //         close: true,
      //         gravity: 'top',
      //         position: 'right',
      //         stopOnFocus: true
      //       }).showToast()

      //     }

      //   })
      //   .catch((ex) => {
      //     this.loading = false
      //     console.log('Error', ex)

      //   })
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
