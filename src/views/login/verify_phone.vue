  <!--
  *@Author: Rino Kitimbo
  *@Email: kitimborinoemma0580@gmail.com
  *@LinkedIn: https://www.linkedin.com/in/rino-kitimbo-881090116/
  *@GitHub: https://github.com/KitimboRino
  *@Gitlab: https://gitlab.com/KRino0580
  *@Tel:+256-706-144964 / +256-778-708805
 -->
<template>
  <div class="grid">
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->
      <div
        class="
          col-span-12
          lg:col-span-4
          2xl:col-span-3
          flex
          lg:block
          flex-col-reverse
        "
      >
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
                {{ currentUser.title }} {{ currentUser.first_name }}
                {{ currentUser.last_name }}
              </div>
              <div class="text-gray-600">{{ currentUser.unique_number }}</div>
            </div>
            <div class="dropdown" style="display: none">
              <a
                class="dropdown-toggle w-5 h-5 block"
                href="javascript:;"
                aria-expanded="false"
              >
                <MoreHorizontalIcon
                  class="w-5 h-5 text-gray-600 dark:text-gray-300"
                />
              </a>
              <div class="dropdown-menu w-56">
                <div class="dropdown-menu__content box dark:bg-dark-1">
                  <div
                    class="
                      p-4
                      border-b border-gray-200
                      dark:border-dark-5
                      font-medium
                    "
                  >
                    Export Options
                  </div>
                  <div class="p-2">
                    <a
                      href=""
                      class="
                        flex
                        items-center
                        block
                        p-2
                        transition
                        duration-300
                        ease-in-out
                        bg-white
                        dark:bg-dark-1
                        hover:bg-gray-200
                        dark:hover:bg-dark-2
                        rounded-md
                      "
                    >
                      <ActivityIcon
                        class="w-4 h-4 text-gray-700 dark:text-gray-300 mr-2"
                      />
                      English
                    </a>
                    <a
                      href=""
                      class="
                        flex
                        items-center
                        block
                        p-2
                        transition
                        duration-300
                        ease-in-out
                        bg-white
                        dark:bg-dark-1
                        hover:bg-gray-200
                        dark:hover:bg-dark-2
                        rounded-md
                      "
                    >
                      <BoxIcon
                        class="w-4 h-4 text-gray-700 dark:text-gray-300 mr-2"
                      />
                      Indonesia
                      <div
                        class="
                          text-xs text-white
                          px-1
                          rounded-full
                          bg-theme-6
                          ml-auto
                        "
                      >
                        10
                      </div>
                    </a>
                    <a
                      href=""
                      class="
                        flex
                        items-center
                        block
                        p-2
                        transition
                        duration-300
                        ease-in-out
                        bg-white
                        dark:bg-dark-1
                        hover:bg-gray-200
                        dark:hover:bg-dark-2
                        rounded-md
                      "
                    >
                      <LayoutIcon
                        class="w-4 h-4 text-gray-700 dark:text-gray-300 mr-2"
                      />
                      English
                    </a>
                    <a
                      href=""
                      class="
                        flex
                        items-center
                        block
                        p-2
                        transition
                        duration-300
                        ease-in-out
                        bg-white
                        dark:bg-dark-1
                        hover:bg-gray-200
                        dark:hover:bg-dark-2
                        rounded-md
                      "
                    >
                      <SidebarIcon
                        class="w-4 h-4 text-gray-700 dark:text-gray-300 mr-2"
                      />
                      Indonesia
                    </a>
                  </div>
                  <div
                    class="
                      px-3
                      py-3
                      border-t border-gray-200
                      dark:border-dark-5
                      font-medium
                      flex
                    "
                  >
                    <button type="button" class="btn btn-primary py-1 px-2">
                      Settings
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary py-1 px-2 ml-auto"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              <!-- BEGIN: code Notification Content -->

              <div
                style="background-color: #ff0e0e"
                id="code-notification-content"
                class="toastify-content hidden flex"
              >
                <XCircleIcon class="text-theme-9" />
                <div class="ml-4 mr-4">
                  <div class="font-medium text-white">Hello,</div>
                  <div class="font-medium text-white">
                    the entered code does not match please provide the correct
                    code to verify!!
                  </div>
                </div>
              </div>
              <!-- END: Failed Notification Content -->
            </div>
          </div>
        </div>
      </div>
      <!-- END: Profile Menue -->

      <!-- END: Profile Menue -->

      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5">
          <div
            class="
              flex
              items-center
              p-5
              border-b border-gray-200
              dark:border-dark-5
            "
          >
            <h2 class="font-medium text-base mr-auto">Phone Verification</h2>
          </div>

          <div class="p-5">
            <form
              class="validate-form"
              @submit.prevent="verifyPhone"
              autocomplete="off"
            >
              <div class="flex flex-col-reverse xl:flex-row flex-col mb2">
                <div class="flex-1 mt-6 xl:mt-0">
                  <!-- Update Form -->

                  <div class="grid grid-cols-12 gap-x-5">
                    <div class="col-span-12 2xl:col-span-6">
                      <!-- <div class="col-span-12 2xl:col-span-6"> -->

                      <!-- Code -->
                      <div>
                        <label
                          for="update-profile-form-1"
                          class="form-label font-semibold"
                        >
                          Enter a verification Code we sent to your phone
                          <span class="text-theme-6">*</span>
                        </label>
                        <input
                          id="update-profile-form-1"
                          type="text"
                          class="form-control"
                          placeholder="Enter Code"
                          name=""
                          v-model="verification_code"
                          required
                        />
                      </div>
                    </div>
                    <!-- submit button -->
                    <button class="btn btn-primary w-20 mt-3" type="submit">
                      <LoadingIcon
                        v-if="loading"
                        icon="spinning-circles"
                        color="white"
                        class="w-4 h-4 ml-2"
                      />

                      <span v-else>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- END: Display Information -->
      </div>
    </div>
  </div>
  <!-- <button @click="registrationForm">
    sendData
    </button> -->
</template>

<script>
import { defineComponent, toRaw, reactive } from 'vue'
import Toastify from 'toastify-js'
import AuthService from '../../service/auth-service.js'
import $ from 'cash-dom'
export default defineComponent({
  components: {},
  data() {
    const formData = reactive({})

    const verifyPhone = () => {
      console.log('inside phone verification')
      // this.loading = true
      // We will handle form submission here
      const data = new FormData()
      data.append('verification_code', this.verification_code)
      console.log('entered code' + this.verification_code)
      console.log('user' + this.$store.state.auth.user.id)
      // const notification = document.querySelector(
      //   '.toastify-content .notification-message'
      // )
      AuthService.verifyPhoneNumber(this.$store.state.auth.user.id, data)
        .then((data) => {
          this.loading = false
          if (data.success) {
            // notification.textContent = 'Code verified successfully'
            if (this.loggedIn) {
              this.$router.push('/dashboard')
              // this.$router.go('/dashboard')
            }
          } else {
            // alert(
            //   'Hello! the entered code does not match please provide the correct code to login!!'
            // )
            Toastify({
              node: $('#code-notification-content')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            // notification.textContent = 'Code verification Failed'
          }

          // this.basicNonStickyNotificationToggle()
        })
        .catch((ex) => {
          this.loading = false
          console.log('Error', ex)
          // notification.textContent = `${ex}`
          // this.basicNonStickyNotificationToggle()
        })
      // axios
      //   .post(
      //     '/phoneVerification/' + this.$store.state.auth.user.id,
      //     data,

      //     {
      //       headers: {
      //         Authorization: 'Bearer ' + token,

      //         'Content-Type': 'multipart/form-data',
      //         'X-Requested-With': 'XMLHttpRequest'
      //       }
      //     }
      //   )
      //   .then((response) => {
      //     const data = response.data
      //     // const notification = document.querySelector(
      //     //   '.toastify-content .notification-message'
      //     // )
      //     if (data.success) {
      //       this.loading = false
      //       // notification.textContent = 'Code verified successfully'
      //       // this.$router.push('/dashboard')
      //       if (this.loggedIn) {
      //         this.$router.push('/dashboard')
      //       }
      //       this.loading = false
      //     } else {
      //       this.loading = false
      //       // notification.textContent = 'Code verification Failed'
      //     }
      //     // this.basicNonStickyNotificationToggle()
      //     console.log('response', response)
      //     return response.data.user_data
      //   })
    }

    const updateProfile = () => {}

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
      updateProfile,
      validateAge,
      verifyPhone,
      photo: '',
      files: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    userId() {
      return toRaw(this.$store.state.auth.user.id)
    },
    user: function () {
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

  methods: {
    setUpdateEmail(email) {
      this.email = email
    },
    setNotificationMessage(message) {
      this.notificationMessage = message
    },
    setCurrentUser(data) {
      console.log({ CurrentData: data })
      if (data) {
        Object.assign(this.formData, data)
      }
    },
    // Profile Photo Upload
    handlePhotoUpload() {
      this.image = event.target.files[0]
    },
    handleFrontIDUpload() {
      this.id = event.target.files[0]
    }
  },
  mounted() {}
})
</script>
