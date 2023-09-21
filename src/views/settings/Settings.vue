<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Settings</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->
      <div class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
        <div class="intro-y box mt-5">
          <div class="relative flex items-center p-5">
            <div class="w-12 h-12 image-fit">
              <img
                alt="Profile Image"
                class="rounded-full"
                :src="
                  currentUser.photo
                    ? currentUser.photo
                    : 'https://via.placeholder.com/150'
                "
              />
            </div>

            <div class="ml-4 mr-auto">
              <div class="font-medium text-base">
                {{ currentUser.first_name }}
                {{ currentUser.last_name }}
              </div>
              <div class="text-gray-600">{{ currentUser.unique_identifier}}</div>
            </div>
            <!-- <div class="dropdown">
              <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false">
                <MoreHorizontalIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </a>
              
            </div>-->
          </div>
          <div class="p-5 border-t border-gray-200 dark:border-dark-5">
            <a class="flex items-center dark:text-theme-10 font-medium" href>
              <UserCheckIcon class="w-4 h-4 mr-2" />Account
            </a>
            <a class="flex items-center mt-5" href="/dashboard/loan-account-details">
              <CreditCardIcon class="w-4 h-4 mr-2" />Payment Methods
            </a>
            <a class="flex items-center mt-5" href="/dashboard/change-password">
              <GlobeIcon class="w-4 h-4 mr-2" />Language
            </a>
            <a class="flex items-center mt-5" href="/dashboard/change-password">
              <HelpCircleIcon class="w-4 h-4 mr-2" />Support
            </a>
            <a class="flex items-center mt-5" href>
              <LockIcon class="w-4 h-4 mr-2" />Change Password
            </a>
          </div>
          <div class="p-5 border-t border-gray-200 dark:border-dark-5 flex">
            <!-- <button type="button" class="btn btn-primary py-1 px-2">
              New Group
            </button>-->
            <!-- <button
              type="button"
              class="btn btn-outline-secondary py-1 px-2 ml-auto"
            >
              New Quick Link
            </button>-->
          </div>
        </div>
      </div>
      <!-- END: Profile Menue -->

      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5">
          <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto">Account</h2>
          </div>
          <span
            v-if="currentUser.profile_status == 'rejected'"
          >Your update profile request has been rejected</span>
          <div class="p-5">
            <form class="validate-form" @submit.prevent="updateProfile" autocomplete="off"></form>
          </div>
        </div>

        <!-- END: Display Information -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRaw, reactive, toRefs } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
// import registrationProgress from '@/components/registration-progress/Main.vue'
import { Field } from 'vee-validate'

// Validations
import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import $ from 'cash-dom'
export default defineComponent({
  components: {
    // registrationProgress,
    // Field
  },
  data() {
    const onchange = () => {
      this.myBarangay = this.villages.filter(
        village => village.id == this.selectedBarangay
      )[0]
      this.selectedVillage = this.myBarangay.barangay
      this.selectedCity = this.myBarangay.city
      this.selectedProvince = this.myBarangay.province
      // const newamount = document.getElementById('amount').value
      // document.getElementById('newamount').value = Number(newamount).toFixed(2)
      // document.getElementById('amount').value = Number(newamount).toFixed(2)
      console.log('myBarangay ', this.myBarangay)
      console.log(
        'changed',
        this.selectedBarangay,
        this.selectedVillage,
        this.selectedCity
      )
    }
    const formData = reactive({
      first_name: '',
      middle_name: '',
      last_name: '',
      title: '',
      gender: '',
      // village: '',
      street: '',
      // city: '',
      working_status: '',
      // state: '',
      country_id: '',
      zip: '',
      mobile: '',
      dob: '',
      // address: '',
      phone: '',
      // business_name: '',
      house: '',
      country_code: '+63'
    })
    const rules = {
      first_name: {
        required,
        minLength: minLength(2)
      },
      middle_name: {},
      last_name: {
        required,
        minLength: minLength(2)
      },
      title: {
        required,
        minLength: minLength(2)
      },
      gender: {
        required
      },
      // village: {
      //   required,
      //   minLength: minLength(2)
      // },
      street: {
        required,
        minLength: minLength(2)
      },
      // city: {
      //   required,
      //   minLength: minLength(2)
      // },
      working_status: {
        required
      },
      // state: {
      //   required,
      //   minLength: minLength(2)
      // },
      country_id: {},
      zip: {
        required,
        minLength: minLength(2)
      },
      mobile: {
        required,
        minLength: minLength(2)
      },
      dob: {
        required
      },
      phone: {
        minLength: minLength(2)
      },
      house: {
        required,
        minLength: minLength(2)
      },
      country_code: {}
    }
    const validate = useVuelidate(rules, toRefs(formData))

    const updateProfile = () => {
      const notification = document.querySelector(
        '.toastify-content .notification-message'
      )
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
        const token = localStorage.getItem('token')
        this.loading = true
        // We will handle form submission here
        const data = new FormData()
        data.append('first_name', this.formData.first_name)
        data.append('middle_name', this.formData.middle_name)
        data.append('last_name', this.formData.last_name)
        data.append('title', this.formData.title)
        data.append('gender', this.formData.gender)
        data.append('village', this.selectedBarangay)
        data.append('street', this.formData.street)
        data.append('city', this.selectedCity)
        data.append('state', this.selectedProvince)
        data.append('country_id', this.selectedCountry)
        data.append('zip', this.formData.zip)
        data.append('working_status', this.formData.working_status)
        data.append('phone', this.formData.phone)
        data.append('email', this.currentUser.email)
        data.append('dob', this.formData.dob)
        // data.append('address', this.formData.address)
        data.append('house', this.formData.house)
        data.append('country_code', this.formData.country_code)
        // data.append('house', this.house)
        data.append('mobile', this.formData.mobile)

        // data.append('business_name', this.formData.business_name)
        if (this.uploadFile) {
          console.log('ProfilePic', this.uploadFile)
          data.append('photo', this.image)
        }
        data.append('files', this.id)

        // const todays = new Date()
        const TODAY = new Date(Date.now())

        console.log('my date of birth' + this.formData.dob)
        console.log('my date today year' + new Date(TODAY).getFullYear())
        console.log(
          'my date birth year ' + new Date(this.formData.dob).getFullYear()
        )
        console.log(
          'my date age ' +
            (new Date(TODAY).getFullYear() -
              new Date(this.formData.dob).getFullYear())
        )

        if (
          new Date(TODAY).getFullYear() -
            new Date(this.formData.dob).getFullYear() >
          18
        ) {
          console.log('You must be above 18 years')

          // We will handle form submission here

          axios
            // .post(
            //   'http://localhost/mfi-v2/public/client/profileUpdate/' +
            .post(
              '/profileUpdate',
              data,

              {
                headers: {
                  Authorization: 'Bearer ' + token,

                  'Content-Type': 'multipart/form-data',
                  'X-Requested-With': 'XMLHttpRequest'
                }
              }
            )
            .then(response => {
              const data = response.data
              // this.replaceForm()
              // const notification = document.querySelector(
              //   '.toastify-content .notification-message'
              // )
              if (data.success == true) {
                this.loading = false
                notification.textContent =
                  'Profile Profile Information Successfully Updated'
              } else {
                this.loading = false
                notification.textContent =
                  'Profile Profile Information Failed to Update'
              }
              this.basicNonStickyNotificationToggle()
              console.log('response', response)
              return response.data.user_data
            })
            .then(data => {
              this.uploadFile = null
              // Commiting to the updates to the store
              this.$store.commit('auth/update', { user: data, isUpdate: true })
            })
            .catch(error => {
              notification.textContent = error
              this.basicNonStickyNotificationToggle()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('my date is not valid')
          // to hide
          const form = document.getElementById('eventdetail')
          form.style.display = 'none'

          this.loading = false

          // alert('You must be above 18 years!!')
          // Notification
          Toastify({
            node: $('#age-notification-content')
              .clone()
              .removeClass('hidden')[0],
            duration: -1,
            newWindow: true,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true
          }).showToast()
        }
      }
    }

    // Basic non sticky notification
    const basicNonStickyNotificationToggle = () => {
      Toastify({
        node: $('#basic-non-sticky-notification-content')
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

    const validateAge = () => {
      const TODAY = new Date(Date.now())

      console.log('my date of birth' + this.formData.dob)
      console.log('my date today year' + new Date(TODAY).getFullYear())
      console.log(
        'my date birth year ' + new Date(this.formData.dob).getFullYear()
      )
      console.log(
        'my date age ' +
          (new Date(TODAY).getFullYear() -
            new Date(this.formData.dob).getFullYear())
      )

      if (
        new Date(TODAY).getFullYear() -
          new Date(this.formData.dob).getFullYear() <
        18
      ) {
        // alert('You must be above 18 years')
        // Notification
        Toastify({
          node: $('#age-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: -1,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      }
    }

    return {
      basicNonStickyNotificationToggle,
      loading: false,
      formData,
      validate,
      updateProfile,
      validateAge,
      photo: '',
      files: '',
      uploadFile: null,
      selectedCountry: '168',
      listCountry: [],
      villages: [],
      onchange,
      selectedBarangay: '',
      selectedVillage: 'Alangilan',
      selectedCity: '',
      selectedProvince: '',
      myBarangay: ''
    }
  },
  computed: {
    userId() {
      return toRaw(this.$store.state.auth.user.id)
    },
    user: function() {
      // console.log(this.user)
      console.log(toRaw(this.$store.state.auth.user.id))
      return toRaw(this.$store.state.auth.user)
    },
    currentUser() {
      this.setUpdateEmail(this.$store.state.auth.user.email)
      // console.log(toRaw(this.$store.state.auth.user.data.user))
      this.setCurrentUser(toRaw(this.$store.state.auth.user))

      return toRaw(this.$store.state.auth.user)
    }
  },
  watch: {
    listCountry(oldList, newList) {
      this.selectedCountry = this.currentUser.country_id
      console.log('List changing...', this.selectedCountry)
    }
  },

  methods: {
    replaceForm() {
      // Three places to customize:

      // Specify the id of the form.
      const IDofForm = 'form3'

      // Specify the id of the div containing the form.
      const IDofDivWithForm = 'example3'

      // Specify the id of the div with the content to replace the form with.
      const IDforReplacement = 'for_replacement'

      // End of customizations.

      // This line submits the form. (If Ajax processed, call Ajax function, instead.)
      document.getElementById(IDofForm).submit()

      // This replaces the form with the replacement content.
      document.getElementById(
        IDofDivWithForm
      ).innerHTML = document.getElementById(IDforReplacement).innerHTML
    },
    setUpdateEmail(email) {
      this.email = email
    },
    setNotificationMessage(message) {
      this.notificationMessage = message
    },
    setCurrentUser(data) {
      console.log({ CurrentData: data })
      if (data) {
        if (data.country_code === null) {
          data.country_code = '+63'
        }
        if (data.country_id === null) {
          data.country_id = '168'
        }
        if (data.country_id != null) {
          this.selectedCountry = data.country_id
        }
        if (data.middle_name === null) {
          data.middle_name = ''
        }

        Object.assign(this.formData, data)
      }
    },

    // Getting All Villages
    getVillages() {
      const token = localStorage.getItem('token')
      axios
        .get('/get-barangaies', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(res => {
          this.villages = res.data.payload.barangayies
          console.log('before villages', this.villages)
        })
        .catch(err => console.log(err))
    },
    // Profile Photo Upload
    handlePhotoUpload() {
      this.image = event.target.files[0]
      this.uploadFile = URL.createObjectURL(this.image)
    },
    // handleFrontIDUpload() {
    //   this.id = event.target.files[0]
    // }
    getCountry() {
      const token = localStorage.getItem('token')
      axios
        .get('/get-countries', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(res => {
          this.listCountry = res.data.data
          this.$nextTick(() => {
            this.selectedCountry = this.currentUser.country_id
          })
          console.log('Country', this.selectedCountry)
        })
    },
    onchangenew(id) {
      console.log('selected Barangay')
    }
  },
  created() {
    this.getCountry()
    this.getVillages()
    this.selectedCity = this.currentUser.city
    this.selectedBarangay = this.currentUser.village
    this.selectedProvince = this.currentUser.state
    this.selectedCountry = this.currentUser.country_id
    console.log(
      'created City, Barangay',
      this.selectedCity,
      this.selectedBarangay
    )
  },
  mounted() {
    this.getVillages()
  }
})
</script>
