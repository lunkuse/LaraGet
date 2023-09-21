<template>
  <div class>
    <DarkModeSwitcher />
    <LanguageSwitcher />
    <div class="container sm:px-10 dark:bg-dark-1">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href class="-intro-x flex items-center pt-5">
            <img
              alt="Metadent"
              class="w-10 h-10 font-medium"
              src="../../assets/images/logos.png"
            />
            <span class="text-4xl ml-1 font-medium leading-none text-theme-3">
              <span class="font-medium">Metadent</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="Portal"
              class="-intro-x w-1/2 -mt-16"
              src="../../assets/images/doctor.png"
            />
          </div>
        </div>

        <!-- END: Login Info -->

        <!-- BEGIN: Login Form -->
        <div
          class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0 items-center content-center"
        >
          <div
            class="my-auto mx-auto bg-white dark:bg-dark-1 xl:bg-white px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto xl:w-auto items-center content-center box"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left text-theme-32 text-white"
            >
             {{
                  $t('translation.reset_password_text')
                }}
            </h2>

            <div
              v-if="message"
              class="alert alert-outline-danger show flex items-center mb-2 mt-2"
              role="alert"
            >
              {{ message }}
            </div>
            <div
              v-if="successMessage"
              class="alert alert-outline-success show flex items-center mb-2 mt-2"
              role="alert"
            >
              {{ successMessage }}
            </div>

            <!-- Form start-->
            <Form
              @submit="handleReset"
              :validation-schema="schema"
              autocomplete="off"
              v-if="showEmailForm"
            >
              <div class="intro-x mt-8">
                <label for="crud-form-3" class="form-label"
                  >{{
                  $t('translation.enter_email_address')
                }}</label
                >
                <div
                  class="input-group p-0 border-gray-200 focus:border-theme-36"
                >
                  <Field
                    type="text"
                    name="identifier"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36"
                    v-model="identifier"
                    :placeholder="`${$t('translation.email_text')}`"
                  />
                </div>
                <ErrorMessage
                  name="identifier"
                  style="font-size: 13px"
                  class="text-theme-6"
                />

                <!-- <small class="text-theme-6 mt-2">{{ passwordError }}</small> -->
              </div>
              <!-- <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <a href="" class="text-theme-32">Forgot Password?</a>
            
              </div> -->
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  type="submit"
                >
                  <LoadingIcon
                    v-if="loading"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else>{{
                  $t('translation.reset_text')
                }}</span>
                </button>
              </div>
              <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <span>
                  <a href="" class="font-bold"> {{ $t("translation.auth.already_have_an_account_text") }}?</a
                  ><router-link
                    to="/login"
                    class="
        "
                    ><a class="text-theme-32 font-bold ml-2">
                      {{ $t("translation.auth.signIn") }}</a
                    ></router-link
                  ></span
                >
              </div>
              <small class="text-theme-6 mt-2" v-if="error.message"
                >{{ error.message }}
              </small>
            </Form>
            <Form @submit="sendCode" autocomplete="off" v-if="showCodeForm">
              <div class="intro-x mt-8">
                <label for="crud-form-3" class="form-label">Enter code</label>
                <div
                  class="input-group p-0 border-gray-200 focus:border-theme-36"
                >
                  <Field
                    type="text"
                    name="code"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36"
                    v-model="code"
                    placeholder="code"
                  />
                </div>
                <ErrorMessage
                  name="code"
                  style="font-size: 13px"
                  class="text-theme-6"
                />

                <!-- <small class="text-theme-6 mt-2">{{ passwordError }}</small> -->
              </div>

              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  type="submit"
                >
                  <LoadingIcon
                    v-if="loadingcode"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else>Send</span>
                </button>
              </div>
              <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <span>
                  <a href="" class="font-bold">Already have an account?</a
                  ><router-link
                    to="/login"
                    class="
        "
                    ><a class="text-theme-32 font-bold ml-2">
                      Sign In</a
                    ></router-link
                  ></span
                >
              </div>
              <small class="text-theme-6 mt-2" v-if="error.message"
                >{{ error.message }}
              </small>
            </Form>
            <!-- v-if="showSetNewPasswordForm" -->
            <Form
              @submit="setNewPassword"
              autocomplete="off"
              v-if="showSetNewPasswordForm"
            >
              <div class="intro-x mt-2">
                <label for="crud-form-3" class="form-label">{{
                  $t('translation.enter_new_password')
                }}</label>

                <!-- <small class="text-theme-6 mt-2">{{ passwordError }}</small> -->

                <div class="flex">
                  <div
                    class="w-full mt-1 input-group border-gray-200 focus:border-theme-36"
                  >
                    <Field
                      id="confirm_password"
                      name="newpassword"
                      class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                      v-model="newpassword"
                      :placeholder="`${$t('translation.password_text')}`"
                      :type="type"
                      value
                      style="box-shadow: 0px 3px 5px #00000007"
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
              </div>

              <div class="intro-x mt-4">
                <label for="crud-form-3" class="form-label">{{
                  $t('translation.confirm_new_password_text')
                }}</label>

                <div class="flex">
                  <div
                    class="w-full mt-1 input-group border-gray-200 focus:border-theme-36"
                  >
                    <Field
                      name="confirmpassword"
                      class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                      v-model="confirmpassword"
                      :placeholder="`${$t(
                        'translation.confirm_new_password_text'
                      )}`"
                      :type="typeconfirm"
                      value
                      style="box-shadow: 0px 3px 5px #00000007"
                      id="confirm_password_field"
                    />

                    <div
                      class="py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 rounded-none first:rounded-l last:rounded-r"
                      id="input-group-email"
                      @click="showPasswordconfirm"
                    >
                      <i
                        class="fa fa-eye"
                        aria-hidden="true"
                        id="togglerconfirm"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  type="submit"
                >
                  <LoadingIcon
                    v-if="loadingcode"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else>{{ $t('translation.save_text') }}</span>
                </button>
              </div>
              <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <span>
                  <a href="" class="font-bold">Already have an account?</a
                  ><router-link
                    to="/login"
                    class="
        "
                    ><a class="text-theme-32 font-bold ml-2">
                      Sign In</a
                    ></router-link
                  ></span
                >
              </div>
              <small class="text-theme-6 mt-2" v-if="error.message"
                >{{ error.message }}
              </small>
            </Form>
            <div id="”app”"></div>
            <div
              class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
            >
              <h4 class="font-bold">
                <span> {{ $t("translation.auth.dontHaveAnAccount") }}? </span
                ><router-link to="/register" class=""
                  ><a class="text-theme-32 font-bold ml-2">
                    {{ $t("translation.auth.signUp") }}</a
                  ></router-link
                >
              </h4>
            </div>

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
              By signing in, you agree to our <br />
              <a class="text-theme-1 dark:text-theme-10" href=""
                >Terms and Conditions</a
              >
              &
              <a class="text-theme-1 dark:text-theme-10" href=""
                >Privacy Policy</a
              >
            </div>
          </div>
        </div>
        <!-- BEGIN: Account Creation Success Notification Content -->
        <div
          id="success-notification-content"
          class="toastify-content hidden flex"
        >
          <CheckCircleIcon class="text-theme-9" />
          <div class="ml-4 mr-4">
            <div class="font-medium">Successfully sent code</div>
          </div>
        </div>
        <div
          id="fail-notification-content"
          class="toastify-content hidden flex"
        >
          <XCircleIcon class="text-theme-6" />
          <div class="ml-4 mr-4">
            <div class="font-medium">Failed</div>
          </div>
        </div>

        <div
          id="token-success-notification-content"
          class="toastify-content hidden flex"
        >
          <CheckCircleIcon class="text-theme-9" />
          <div class="ml-4 mr-4">
            <div class="font-medium">Successfully verified</div>
          </div>
        </div>
        <!-- END: Account Creation Success Notification Content -->

        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import Toastify from 'toastify-js'
import axios from 'axios'
import router from '../../router'
import $ from 'cash-dom'
// Validations
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import LanguageSwitcher from '@/components/language-switcher/LanguageSwitcher.vue'
export default defineComponent({
  components: {
    DarkModeSwitcher,
    Form,
    Field,
    ErrorMessage,
    LanguageSwitcher
  },
  setup() {
    onMounted(() => {
      $('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login')
    })
  },
  watch: {
    loginStatus: function () {
      this.statusresponse = localStorage.getItem('loginstatus')
    }
  },
  data() {
    // Define a validation schema
    const schema = yup.object().shape({
      identifier: yup.string().email().required('Email is required')
    })
    return {
      loading: false,
      loadingcode: false,
      loadingNewPassword: false,

      schema,
      error: {},
      message: '',
      successMessage: '',
      identifier: '',
      code: '',
      // logo: require('@/assets/images/logos.png'),
      statusresponse: '',
      type: 'password',
      loginfail: '',
      showEmailForm: true,
      showCodeForm: false,
      showNewPasswordForm: false,
      showSetNewPasswordForm: false,
      resetEmail: '',
      resetToken: '',
      type: 'password',
      typeconfirm: 'password',
      newpassword: '',
      confirmpassword: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {},
  methods: {
    showPassword() {
      console.log('toggle password')
      if (this.type === 'password') {
        this.type = 'text'
        document.getElementById('toggler').className = 'fa fa-eye-slash'
        //  toggler.removeClass('fa fa-eye');
        //   toggler.addClass('fa fa-eye-slash');
      } else {
        this.type = 'password'
        document.getElementById('toggler').className = 'fa fa-eye'
      }
    },
    showPasswordconfirm() {
      console.log('toggle password')
      if (this.typeconfirm === 'password') {
        this.typeconfirm = 'text'
        document.getElementById('togglerconfirm').className = 'fa fa-eye-slash'
        //  toggler.removeClass('fa fa-eye');
        //   toggler.addClass('fa fa-eye-slash');
      } else {
        this.typeconfirm = 'password'
        document.getElementById('togglerconfirm').className = 'fa fa-eye'
      }
    },
    handleReset() {
      this.message = ''
      this.successMessage = ''
      this.loading = true
      console.log('reset button pressed')
      const token = localStorage.getItem('token')

      axios
        .post(
          'patients/auth/forgot_password',
          { email: this.identifier },
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then((response) => {
          this.loading = false
          console.log('forgot password response:', response?.data?.payload)
          if (response?.data?.status == true) {
            Toastify({
              node: $('#success-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.successMessage = response?.data?.payload
            this.showEmailForm = false
            this.showCodeForm = true
          }

          if (response.data.status == false) {
            this.loading = false
            console.log('failed response:', response?.data?.error)
            Toastify({
              node: $('#fail-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.message = response?.data?.error
          }
        })
    },
    sendCode() {
      this.message = ''
      this.successMessage = ''
      this.loadingcode = true
      console.log('code button pressed')
      const token = localStorage.getItem('token')

      axios
        .post(
          'patients/auth/verify',
          { code: this.code },
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then((response) => {
          this.loadingcode = false
          console.log('send code response:', response?.data?.payload)
          if (response?.data?.status == true) {
            this.resetEmail = response?.data?.payload?.email
            this.resetToken = response?.data?.payload?.token
            console.log('email and token', this.resetEmail, this.resetToken)
            Toastify({
              node: $('#token-success-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.successMessage = response?.data?.message
            this.showEmailForm = false
            this.showCodeForm = false
            this.showSetNewPasswordForm = true
          }

          if (response.data.status == false) {
            this.loadingcode = false
            console.log('failed response:', response?.data?.error)
            Toastify({
              node: $('#fail-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.message = response?.data?.error
          }
        })
    },

    setNewPassword() {
      this.message = ''
      this.successMessage = ''
      this.loadingcode = true
      console.log('password button pressed')
      const token = localStorage.getItem('token')

      axios
        .post(
          'patients/auth/reset_password',
          {
            email: this.resetEmail,
            token: this.resetToken,
            password: this.newpassword,
            password_confirmation: this.confirmpassword
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then((response) => {
          this.loadingcode = false
          console.log('send code response:', response?.data?.payload)
          if (response?.data?.status == true) {
            Toastify({
              node: $('#token-success-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.successMessage = response?.data?.message
            this.showEmailForm = false
            this.showCodeForm = false
            this.showSetNewPasswordForm = true
            router.push({
              name: 'login'
            })
            //  this.$router.push('/dashboard').catch((msg) => console.log(msg))
          }

          if (response.data.status == false) {
            this.loadingcode = false
            console.log('failed response:', response?.data?.error)
            Toastify({
              node: $('#fail-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.message = response?.data?.error
          }
        })
    }
  }
})
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
