<template>
  <div>
    <UpdatePersonalInfo />
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">
        {{ $t("translation.profile_text") }}
      </h2>
    </div>
    <!-- BEGIN: Profile Info -->
    <div class="intro-y box px-5 pt-5 mt-5">
      <div
        class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5"
      >
        <div
          class="flex flex-1 px-5 items-center justify-center lg:justify-start"
        >
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
          >
            <img
              alt="Profile Image"
              class="rounded-full"
              :src="
                currentUser?.profile_picture
                  ? currentUser?.profile_picture
                  : 'https://via.placeholder.com/150'
              "
            />

            <div
              class="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-theme-3 rounded-full p-2"
            >
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#update-photo-modal"
                class
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide w-4 h-4 text-white"
                >
                  <path
                    d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"
                  />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </a>
            </div>
          </div>
          <div class="ml-5">
            <div
              class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg"
            >
              {{ currentUser.firstname }}
              {{ currentUser.lastname }}
            </div>
            <div class="text-gray-600">{{ currentUser.unique_identifier }}</div>
          </div>
        </div>
        <div
          class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0"
        >
          <div class="font-medium text-center lg:text-left lg:mt-3">
            {{ $t("translation.contact_information_text") }}
          </div>

          <div
            class="flex flex-col justify-center items-center lg:items-start mt-4"
          >
            <div class="truncate sm:whitespace-normal flex items-center">
              <MailIcon class="w-4 h-4 mr-2" />
              {{ currentUser.email }}
            </div>
            <div class="truncate sm:whitespace-normal flex items-center mt-3">
              <PhoneIcon class="w-4 h-4 mr-2" />
              {{ currentUser.patient_phone }}
              <!-- +{{ currentUser.patient_phone }} -->
            </div>
          </div>
        </div>
        <div
          class="mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-gray-200 dark:border-dark-5 pt-5 lg:pt-0"
        >
          <div class="flex justify-end mt-4">
            <a
              href="javascript:;"
              data-toggle="modal"
              data-target="#update-info-modal"
              class="btn bg-theme-1 text-white w-25 mr-auto"
            >
              {{ $t("translation.update_profile_text") }}</a
            >
          </div>
        </div>
      </div>
      <div
        class="nav nav-tabs flex-col sm:flex-row justify-center lg:justify-start"
        role="tablist"
      >
        <a
          id="bio-tab"
          data-toggle="tab"
          data-target="#bio-data"
          href="javascript:;"
          class="py-4 sm:mr-8 flex items-center active"
          role="tab"
          aria-controls="bio-data"
          aria-selected="true"
        >
          <InfoIcon class="w-4 h-4 mr-2" />
          <p>{{ $t("translation.bio_data_text") }}</p>
        </a>
        <a
          id="addresss-tab"
          data-toggle="tab"
          data-target="#address_tab"
          href="javascript:;"
          class="py-4 sm:mr-8 flex items-center hidden"
          role="tab"
          aria-selected="false"
        >
          <MapPinIcon class="w-4 h-4 mr-2" />
          <p>{{ $t("translation.address_information_text") }}</p>
        </a>
        <a
          id="password-tab"
          data-toggle="tab"
          data-target="#next-of-kin"
          href="javascript:;"
          class="py-4 sm:mr-8 flex items-center"
          role="tab"
          aria-selected="false"
        >
          <KeyIcon class="w-4 h-4 mr-2" />

          <p>{{ $t("translation.change_password_text") }}</p>
        </a>

        <a
          id="language-tab"
          data-toggle="tab"
          data-target="#language"
          href="javascript:;"
          class="py-4 sm:mr-8 flex items-center"
          role="tab"
          aria-selected="false"
          style="display: none"
        >
          <GlobeIcon class="w-4 h-4 mr-2" />Language
        </a>

        <a
          id="support-tab"
          data-toggle="tab"
          data-target="#support"
          href="javascript:;"
          class="py-4 sm:mr-8 flex items-center"
          role="tab"
          aria-selected="false"
          style="display: none"
        >
          <HelpCircleIcon class="w-4 h-4 mr-2" />Support
        </a>
      </div>
    </div>
    <!-- END: Profile Info -->

    <div class="tab-content">
      <!-- Client Bio -->
      <div
        class="tab-pane active intro-y box mt-5"
        id="bio-data"
        role="tabpanel"
        aria-labelledby="bio-tab"
      >
        <div
          class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
        >
          <h2 class="font-medium text-base mr-auto">
            {{ $t("translation.bio_data_text") }}
          </h2>
        </div>

        <div class="mx-auto justify-center mt-4">
          <div class="">
            <!-- personal information -->
            <div class="p-5">
              <div
                class="grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-4 overflow-x-auto"
              >
                <!-- firstname -->
                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.first_name_text") }}
                      </p>

                      <span
                        class="form-label capitalize"
                        :class="
                          currentUser?.firstname == null
                            ? currentUser?.firstname == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser.firstname ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- lastname -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.last_name_text") }}
                      </p>

                      <span
                        class="form-label capitalize"
                        :class="
                          currentUser?.lastname == null
                            ? currentUser?.lastname == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser.lastname ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- gender -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.gender_text") }}
                      </p>

                      <span
                        class="form-label capitalize"
                        :class="
                          currentUser?.gender == null
                            ? currentUser?.gender == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          getGender(currentUser?.gender) ??
                            $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- user_Type -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        User Type
                      </p>

                      <span
                        class="form-label capitalize"
                        :class="
                          currentUser?.user_Type == null
                            ? currentUser?.user_Type == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.user_Type ?? "No user type is set"
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- dob -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.dob_text") }}
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.DOB == null
                            ? currentUser?.DOB == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          moment(currentUser.DOB, "DD-MM-YYYY").format(
                            "DD-MM-YYYY"
                          ) ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!--email -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.email_text") }}
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.email == null
                            ? currentUser?.email == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.email ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!--  phone -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.phone_text") }}
                      </p>

                      <span
                        class="form-label capitalize"
                        :class="
                          currentUser?.phone_number == null
                            ? currentUser?.phone_number == null &&
                              'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.phone_number ??
                            $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- country -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.forms.country") }}
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.country == null
                            ? currentUser?.country == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.country ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- city -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.forms.city") }}
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.city == null
                            ? currentUser?.city == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.city ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- location -->

                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.forms.location") }}
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.location == null
                            ? currentUser?.location == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.location ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- id number -->
                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        {{ $t("translation.forms.idNumber") }}
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.Id_number == null
                            ? currentUser?.Id_number == null && 'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.Id_number ?? $t("translation.notSetText")
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- business name -->
                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        Business Name
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.business_name == null
                            ? currentUser?.business_name == null &&
                              'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.business_name ??
                            "no business name is set"
                        }}</span
                      >
                    </span>
                  </label>
                </div>

                <!-- account number -->
                <div>
                  <label for="update-profile-form-7" class="form-label">
                    <span class="flex">
                      <p class="w-40 font-medium text-bold mx-1">
                        Account Number
                      </p>

                      <span
                        class="form-label"
                        :class="
                          currentUser?.account_number == null
                            ? currentUser?.account_number == null &&
                              'text-gray-500'
                            : ''
                        "
                        >{{
                          currentUser?.account_number ??
                            "no account number is set"
                        }}</span
                      >
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- password change -->
      <div
        class="tab-pane intro-y box mt-5"
        id="next-of-kin"
        role="tabpanel"
        aria-labelledby="password-tab"
      >
        <div
          class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
        >
          <h2 class="font-medium text-base mr-auto">Change Password</h2>
        </div>
        <div class="p-5">
          <passwordReset />
        </div>
      </div>

      <!-- language tab -->
      <!-- password change -->

      <!-- faq -->
    </div>

    <!-- update photo modal -->
    <div id="update-photo-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <a data-dismiss="modal">
            <i data-feather="X" class="w-8 h-8 text-black"></i>
          </a>

          <div class="modal-body p-10">
            <div class="col-span-12 lg:col-span-12 flex items-center">
              <h2 class="text-lg font-medium mr-auto">
                {{ $t("translation.update_photo_text") }}
              </h2>
            </div>
            <div class="grid grid-cols-12 justify-center flex-row mt-5">
              <div class="intro-y col-span-12 lg:col-span-12 flex items-center">
                <!-- BEGIN: Form Layout -->
                <form
                  class="validate-form"
                  @submit.prevent="updatePhoto"
                  autocomplete="off"
                >
                  <div class="flex items-center">
                    <div
                      class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
                    >
                      <div
                        class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
                      >
                        <img
                          class="rounded-full"
                          alt="Profile Image"
                          :src="
                            uploadFile
                              ? uploadFile
                              : currentUser?.image
                              ? currentUser?.image
                              : 'https://via.placeholder.com/150'
                          "
                          required
                        />
                        <Tippy
                          style="display: none"
                          tag="div"
                          content="Remove this profile photo?"
                          class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-6 right-0 top-0 -mr-2 -mt-2"
                        >
                          <xIcon class="w-4 h-4" />
                        </Tippy>
                      </div>
                      <div class="flex"></div>
                      <div class="mx-auto cursor-pointer relative mt-5">
                        <button
                          type="button"
                          class="btn btn-primary w-40 mr-auto"
                        >
                          <p>
                            {{ $t("translation.change_photo_text") }}
                          </p>
                        </button>
                        <Input
                          type="file"
                          class="w-full h-full top-0 left-0 absolute opacity-0"
                          accept="image/*"
                          v-on:change="handlePhotoUpload()"
                        />
                      </div>
                      <button
                        class="btn bg-theme-1 text-white w-40 mr-auto"
                        type="submit"
                      >
                        <LoadingIcon
                          v-if="loading"
                          icon="spinning-circles"
                          color="white"
                          class="w-4 h-4 ml-2"
                        />

                        <span v-else
                          ><p>
                            {{ $t("translation.save_text") }}
                          </p>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- BEGIN: Failed Notification Content -->
    <div
      id="passwordfailed-notification-content"
      class="toastify-content hidden flex"
    >
      <XCircleIcon class="text-theme-6" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Profile Update Failed</div>
        <div class="text-gray-600 mt-1">Please check the filled form.</div>
      </div>
    </div>
    <div id="success-notification-content" class="toastify-content hidden flex">
      <CheckCircleIcon class="text-theme-6" />
      <div class="ml-4 mr-4">
        <div class="font-medium">
          {{ $t("translation.your_password_has_been_reset_successfully_text") }}
        </div>
      </div>
    </div>
    <!-- BEGIN: Failed Notification Content -->
    <div
      id="passwordsuccess-notification-content"
      class="toastify-content hidden flex"
    >
      <CheckCircleIcon class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">
          {{
            $t("translation.profile_photo_has_been_successfully_updated_text")
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRaw, inject } from "vue";
import axios from "axios";
import moment from "moment";
import passwordReset from "../change-password/Main.vue";
import UpdatePersonalInfo from "../update-profile/Main.vue";
import languageReset from "@/components/translate/Language.vue";
import FAQ from "@/components/faq/Faq.vue";
import Toastify from "toastify-js";
import $ from "cash-dom";
import { useI18n } from "vue-i18n";
export default defineComponent({
  components: {
    passwordReset,
    UpdatePersonalInfo,
    languageReset,
    FAQ,
  },
  data() {
    const updatePhoto = () => {
      console.log("submit res uploadFile", this.uploadFile);
      const token = localStorage.getItem("token");
      this.loading = true;
      const data = new FormData();
      if (this.uploadFile) {
        console.log("ProfilePic", this.uploadFile);
        data.append("photo", this.image);
        // data.append("photo", this.uploadFile);
        axios
          .post(
            // "/profileUpdate/" + this.$store.state.auth.user.id,
            "patients/auth/update_photo",
            data,

            {
              headers: {
                Authorization: "Bearer " + token,

                "Content-Type": "multipart/form-data",
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          )
          .then((response) => {
            const data = response.data;
            const notification = document.querySelector(
              ".toastify-content .notification-message"
            );
            if (data.status == true) {
              this.loading = false;
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(data.payload));
              const updateduser = localStorage.getItem("user");
              console.log("inside success", updateduser);
              Toastify({
                node: $("#passwordsuccess-notification-content")
                  .clone()
                  .removeClass("hidden")[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();
              this.$router.go({
                name: "side-menu-profile-overview",
              });

              // notification.textContent = "Profile Photo has been Successfully Updated";
            } else {
              Toastify({
                node: $("#passwordfailed-notification-content")
                  .clone()
                  .removeClass("hidden")[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();
              this.loading = false;
            }
            this.basicNonStickyNotificationToggle();
            console.log("response", response);
            return response.data.user_data;
          })
          .then((data) => {
            this.uploadFile = null;
            // Commiting to the updates to the store

            this.$store.commit("auth/update", { user: data, isUpdate: true });
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    };
    return {
      loading: false,

      countryName: [],
      nearestDueDate: "",
      todaymoment: "",
      photo: "",
      files: "",
      uploadFile: null,
      updatePhoto,
    };
  },
  setup() {
    const { t } = useI18n({});
    // gender method
    const getGender = (gender) => {
      let translatedGender = gender;
      if (gender === "Male") {
        translatedGender = t("translation.male_text");
        return translatedGender;
      } else if (gender === "Female") {
        translatedGender = t("translation.female_text");
        return translatedGender;
      } else {
        return translatedGender;
      }
    };

    return { t, getGender };
  },
  computed: {
    currentUser() {
      // console.log(toRaw(this.$store.state.auth.user))
      return toRaw(this.$store.state.auth.user);
    },
  },
  watch: {},
  methods: {
    moment,

    // Profile Photo Upload
    handlePhotoUpload() {
      this.image = event.target.files[0];
      this.uploadFile = URL.createObjectURL(this.image);
      console.log("res image", this.image);
      console.log("res uploadFile", this.uploadFile);
    },
    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY");
      }
    },
  },
  created() {},
  mounted() {},
});
</script>

<style scoped></style>
