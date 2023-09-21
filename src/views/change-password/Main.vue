<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <div
          v-if="message"
          class="alert alert-outline-danger show flex items-center mb-2 mt-2"
          role="alert"
        >
          {{ message }}
        </div>
        <form
          class="validate-form"
          @submit.prevent="handleSubmit"
          autocomplete="off"
        >
          <!-- BEGIN: Change Password -->
          <div class="intro-y lg:mt-5">
            <div class="">
              <!-- email -->
              <div>
                <label
                  for="change-password-form-1"
                  class="form-label font-semibold"
                  >{{ $t('translation.email_text') }}</label
                >

                <input
                  id="change-password-form-1"
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
                  name="email"
                  v-model.trim="validate.email.$model"
                />
                <template v-if="validate.email.$error">
                  <div
                    v-for="(error, index) in validate.email.$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <!-- Old Password -->
              <div class="mt-3">
                <label
                  for="change-password-form-1"
                  class="form-label font-semibold"
                  >{{ $t('translation.old_password_text') }}
                </label>

                <div class="input-group mt-2">
                  <input
                    :type="typecurrent"
                    class="intro-x login__input form-control py-3 px-4 block border-gray-200 focus:border-theme-36 focus:ring-0"
                    aria-label="Price"
                    aria-describedby="input-group-price"
                    name="old_password"
                    v-model.trim="validate.old_password.$model"
                  />

                  <div
                    class="py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 rounded-none first:rounded-l last:rounded-r"
                    id="input-group-email"
                    @click="showPasswordcurrent"
                  >
                    <i
                      class="fa fa-eye"
                      aria-hidden="true"
                      id="togglercurrent"
                    ></i>
                  </div>
                </div>

                <template v-if="validate.old_password.$error">
                  <div
                    v-for="(error, index) in validate.old_password.$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>

              <!-- New Password -->
              <div class="mt-3">
                <label
                  for="change-password-form-2"
                  class="form-label font-semibold"
                  >{{ $t('translation.global.new_password_text') }}</label
                >

                <div class="input-group mt-2 flex">
                  <input
                    id="new_password"
                    :type="typenew"
                    class="intro-x login__input form-control py-3 px-4 block m border-gray-200 focus:border-theme-36 focus:ring-0"
                     :placeholder="`${$t('translation.enter_new_password_text')}`"
                    name="new_password"
                    v-model.trim="validate.new_password.$model"
                  />
                  <!-- <div id="input-group" class="input-group-text">
                    <i
                      class="fa fa-eye px-4"
                      aria-hidden="true"
                      id="togglernew"
                      @click="showPasswordnew"
                    ></i>
                  </div> -->
                  <div
                    class="py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 rounded-none first:rounded-l last:rounded-r"
                    id="input-group-email"
                    @click="showPasswordnew"
                  >
                    <i class="fa fa-eye" aria-hidden="true" id="togglernew"></i>
                  </div>
                </div>

                <template v-if="validate.new_password.$error">
                  <div
                    v-for="(error, index) in validate.new_password.$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <!-- Confirm Password -->
              <div class="mt-3">
                <label
                  for="change-password-form-3"
                  class="form-label font-semibold"
            
                  >{{ $t('translation.confirm_new_password_text')}}</label
                >
               
                <div class="input-group mt-2">
                  <input
                    id="confirm_password"
                    class="intro-x login__input form-control py-3 px-4 block border-gray-200 focus:border-theme-36 focus:ring-0"
                  
                    :placeholder="`${$t('translation.confirm_new_password_text')}`"
                    name="confirm_new_password"
                    @change="passwordcheck"
                    v-model.trim="validate.confirm_new_password.$model"
                    :type="typeconfirm"
                  />
                  <!-- <div id="input-group-price" class="input-group-text">
                    <i
                      class="fa fa-eye px-4"
                      aria-hidden="true"
                      id="togglerconfirm"
                      @click="showPasswordconfirm"
                    ></i>
                  </div> -->
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

                <template v-if="validate.confirm_new_password.$error">
                  <div
                    v-for="(error, index) in validate.confirm_new_password
                      .$errors"
                    :key="index"
                    class="text-theme-6 mt-2"
                  >
                    {{ error.$message }}
                  </div>
                </template>
                <div v-if="this.confirm_password !== ''">
                  <!-- <template v-if="(this.minierror <= this.enteredamount) && (this.enteredamount <= this.maxerror)  && (this.enteredamount < this.doubleSalary)"> -->
                  <template>
                    <div
                      class="text-theme-6 mt-2"
                      v-if="this.confirm_password !== this.new_password"
                    >
                      <h6>
                        this value must be equal to the entered new password
                      </h6>
                    </div>
                    <div class="text-theme-6 mt-2" v-else></div>
                  </template>
                </div>
              </div>
              <button
                type="submit"
                class="btn bg-theme-32 text-white w-40 mr-auto mt-5"
              >
                <LoadingIcon
                  v-if="loading"
                  icon="spinning-circles"
                  color="white"
                  class="w-4 h-4 ml-2"
                />
                <span v-else>
                  <p>
                    {{ $t('translation.change_password_text')}}
                  </p>
                
                </span>
              </button>
            </div>
          </div>
          <!-- END: Change Password -->
        </form>
      </div>
      <!-- BEGIN: Failed Notification Content -->
      <div
        id="failed-notification-content"
        class="toastify-content hidden flex"
      >
        <XCircleIcon class="text-theme-6" />
        <div class="ml-4 mr-4">
          <div class="font-medium">
            <p >
              {{ $t('translation.password_reset_failed')}}
            </p>
      
          </div>
          <div class="text-gray-600 mt-1">
            <p >
              {{ $t('translation.please_check_form')}}
            </p>
        
          </div>
        </div>
      </div>
      <div
        id="success-notification-content"
        class="toastify-content hidden flex"
      >
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">
            <p v-if="translations?.password_reset_password">
              {{ translations?.password_reset_password }}
            </p>
            <p v-else>Your Passsword has been Reset Successfully.</p>
          </div>
        </div>
      </div>
      <!-- server error -->
      <div
        id="failed-notification-content"
        class="toastify-content hidden flex"
      >
        <XCircleIcon class="text-theme-6" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Password Update Failed</div>
          <div class="text-gray-600 mt-1">Please check the filled form.</div>
        </div>
      </div>
      <div
        id="success-notification-content"
        class="toastify-content hidden flex"
      >
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">
            <p>
              {{ $t('translation.successful_password_reset') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, toRaw, inject } from 'vue'
import Toastify from 'toastify-js'
import axios from 'axios'

// Validations
import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import $ from 'cash-dom'
export default defineComponent({
  components: {},
  data() {
    this.new_password = document.getElementById('new_password')
    const formData = reactive({
      email: '',
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    })
    const rules = {
      email: {
        required
      },
      old_password: {
        required,
        minLength: minLength(8)
      },
      new_password: {
        required,
        minLength: minLength(8)
      },
      confirm_new_password: {
        required
        // minLength: minLength(8)
        // sameAsnew_password: sameAs('new_password')
      }
    }
    const validate = useVuelidate(rules, toRefs(formData))
    const handleSubmit = () => {
      validate.value.$touch()
      if (validate.value.$invalid) {
        Toastify({
          node: $('#failed-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      } else {
        if (this.confirm_password !== '') {
          if (this.confirm_password === this.new_password) {
            const token = localStorage.getItem('token')
            this.loading = true

            // We will handle form submission here
            const data = new FormData()
            data.append('email', this.formData.email)
            data.append('currentPassword', this.formData.old_password)
            data.append('newPassword', this.formData.new_password)
            data.append(
              'new_password_confirmation',
              this.formData.confirm_new_password
            )

            // console.log
            // console.log({ data: data.get('files') })

            axios
              .post('patients/auth/change_password', data, {
                headers: {
                  Authorization: 'Bearer ' + token,

                  'Content-Type': 'multipart/form-data',
                  'X-Requested-With': 'XMLHttpRequest'
                }
              })
              .then((response) => {
                console.log('response', response)
                const notification = document.querySelector(
                  '.toastify-content .notification-message'
                )
                console.log('response got', response.data.status)
                if (response.data.status == true) {
                  this.loading = false
                  // this.message = 'Your Passsword has been Reset Successfully'
                  // document.querySelector('.closeBTN').click()
                  // notification.textContent = 'Your Passsword has been Reset Successfully'
                  // this.$router.go('/dashboard')
                  this.$router.push('/dashboard')
                  // this.$router.go(0)
                  // this.getLoans()
                  // this.$router.go('/dashboard/loan-applications')
                } else {
                  this.loading = false
                  this.message = response.data.error
                  console.log('response got', response.data.msg)
                  notification.textContent = ' Failed'
                  Toastify({
                    node: $('#failed-notification-content')
                      .clone()
                      .removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                  }).showToast()
                }
                this.basicNonStickyNotificationToggle()
                console.log('response', response)
                this.$router.push({
                  name: 'side-menu-loan-applications'
                })
              })
              .catch((error) => {
                console.log('Error', error)
                // this.message = error
                // this.message =
                // error.response.data.error
                console.log('error.response', error.message)
              })
          } else {
            Toastify({
              node: $('#failed-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
          }
        } else {
          Toastify({
            node: $('#failed-notification-content')
              .clone()
              .removeClass('hidden')[0],
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true
          }).showToast()
        }
      }
    }
    return {
      loading: false,
      formData,
      validate,
      new_password: '',
      confirm_password: '',
      handleSubmit,
      message: '',
      typecurrent: 'password',
      typenew: 'password',
      typeconfirm: 'password',
      defaultLanguageCode: 'de',
      translations: ''
    }
  },
  computed: {
    userId() {
      return toRaw(this.$store.state.auth.userid)
    },
    user: function () {
      return toRaw(this.$store.state.auth.user.data)
    },
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    }
  },

  methods: {
    passwordcheck() {
      this.new_password = document.getElementById('new_password').value
      this.confirm_password = document.getElementById('confirm_password').value
      console.log(
        'password changed new, confirm',
        this.new_password,
        this.confirm_password
      )
    },

    languageSelectedHandler(info) {
      console.log(info)
    },
    showPasswordcurrent() {
      console.log('toggle password')
      if (this.typecurrent === 'password') {
        this.typecurrent = 'text'
        document.getElementById('togglercurrent').className = 'fa fa-eye-slash'
        //  toggler.removeClass('fa fa-eye');
        //   toggler.addClass('fa fa-eye-slash');
      } else {
        this.typecurrent = 'password'
        document.getElementById('togglercurrent').className = 'fa fa-eye'
      }
    },
    showPasswordnew() {
      console.log('toggle password')
      if (this.typenew === 'password') {
        this.typenew = 'text'
        document.getElementById('togglernew').className = 'fa fa-eye-slash'
        //  toggler.removeClass('fa fa-eye');
        //   toggler.addClass('fa fa-eye-slash');
      } else {
        this.typenew = 'password'
        document.getElementById('togglernew').className = 'fa fa-eye'
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
    }
  },
  created() {},
  mounted() {},
  setup() {
    const translations = inject('translation_v3')
    console.log('my translations', translations)
    return {
      translations
    }
  }
})
</script>
