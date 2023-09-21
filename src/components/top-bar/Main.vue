<template>
  <!-- BEGIN: Top Bar -->
  <div>
    <div>
      <div class="fixed top-bar">
        <!-- BEGIN: Breadcrumb -->
        <div class="intro-x breadcrumb mr-auto hidden sm:flex">
          <!-- <a href="" class="">Application</a> -->
          <div
            v-for="(crumb, index) in crumbs"
            :key="index"
            class="text-black dark:text-white"
          >
            <ChevronRightIcon class="breadcrumb__icon" v-if="index != 0" />
            <router-link
              :to="crumb.link"
              :class="
                index === crumbs.length - 1
                  ? 'breadcrumb--active'
                  : 'cursor-pointer'
              "
            >
              <!-- {{ crumb.name }} -->
              {{
                $t(
                  `translation.${crumb?.name
                    ?.toLowerCase()
                    .replace(" ", "_")}_text`
                )
              }}
            </router-link>
          </div>
        </div>
        <!-- END: Breadcrumb -->
        <!-- BEGIN: Search -->
        <div class="intro-x relative mr-3 sm:mr-6"></div>
        <!-- END: Search -->

        <!-- BEGIN: Notifications -->
        <div class="intro-x dropdown mr-auto sm:mr-6">
          <div
            class="dropdown-toggle notification cursor-pointer"
            role="button"
            aria-expanded="openstatus"
          >
            <div class>
              <a href="#" class="notification">
                <BellIcon />
                <span class="badge">{{ emailNumber }}</span>
              </a>
            </div>
          </div>
          <div class="notification-content pt-2 dropdown-menu">
            <div
              class="notification-content__box dropdown-menu__content box dark:bg-dark-6"
            >
              <div class="notification-content__title">
                <!-- {{ $t('translation.email_notifications_text') }} -->
                <div class="intro-x flex items-center h-10" >
                  <h2 class="notification-content__title">
                    {{ $t("translation.email_notifications_text") }}
                  </h2>

                  <a
                    href="javascript:;"
                    class="ml-auto mr-1 mb-2 text-red dark:text-theme-10 truncate"
                    @click="MarkAllRead()"
                  >
                    {{ $t("translation.mark_all_read_text") }}
                  </a>
                </div>
              </div>
            
              <div
                v-for="notification in notificationclientemails"
                :key="notification.id"
                class="cursor-pointer relative flex items-center"
                :class="{ 'mt-5': notification.id }"
              >



              <div class="cursor-pointer relative flex items-center">
                <div class="relative flex-none w-12 h-12 mr-1 image-fit">
                  <img
                    alt="image"
                    class="rounded-full"
                    src="../../assets/images/placeholders/placeholder.jpg"
                  />
                  <div
                    class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-auto shadow-[0px_3px_20px_#0000000b] bg-white
                 border-transparent rounded-md dark:bg-darkmode-600 dark:border-transparent w-[220px]  p-2 mt-2">
                 <!-- sm:w-[350px] -->
                  <div class="flex items-center">
                    <a href="" class="mr-5 font-medium truncate"
                      >{{ notification?.data?.from_details?.first_name }} {{ notification?.data?.from_details?.last_name }}</a
                    >
                    <div
                      class="ml-auto text-xs text-slate-400 whitespace-nowrap"
                    >
                    {{ moment(notification?.created_at).fromNow() }}
                    </div>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">
                  <!-- {{ notification?.data?.subject }} -->
                  {{ notification?.data?.subject ? notification?.data?.subject.replace(/<[^>]+>/g, '') : '' }}
                  </div>
                </div>
              </div>











                <div class="ml-2 overflow-hidden hidden" >
                  <a
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#open-notification-modal"
                    :disabled="isDisabled"
                    @click="getAppointment(notification)"
                  >
                    <div>
                      <div
                        x-show="isShow"
                        class
                        x-transition:enter="transition transform ease-out duration-300"
                        x-transition:enter-start="opacity-0 translate-y-1"
                        x-transition:enter-end="opacity-100 translate-y-0"
                        x-transition:leave="transition transform ease-in duration-300"
                        x-transition:leave-start="opacity-100 translate-y-0"
                        x-transition:leave-end="opacity-0 translate-y-1"
                      >
                        <div
                          class="w-full bg-white border-gray-300 border p-3 flex items-start shadow-lg rounded-md space-x-1"
                        >
                          <!-- <svg
                            class="flex-shrink-0 h-6 w-6 text-green-400"
                            stroke="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke-width="1"
                              d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"
                            />
                          </svg> -->
                          <!-- question -->
                          <svg
                            v-if="notification?.data?.message"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-help-circle h-6 w-6 text-theme-43"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path
                              d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                            ></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <!-- email -->
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-mail h-6 w-6 text-theme-44"
                          >
                            <path
                              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            ></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                          <div class="flex w-full">
                            <div class="font-medium" style="width: 180px">
                              {{ notification?.data?.message }}.
                            </div>
                            <div class="text-xs text-gray-500 float-left">
                              {{ moment(notification?.created_at).fromNow() }}
                            </div>
                          </div>
                          <!-- <div class="flex-1 space-y-1">
        <p class="text-base leading-5 font-medium text-gray-700">{{
                  notification.title
                }}</p>
        <p class="text-sm leading-3 text-gray-600">{{ notification.message}}</p>
        <p class="text-sm leading-1  text-gray-500">{{
                  notification.created_at
                }}</p>
                          </div>-->
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <router-link to="/dashboard/communication">
                <a
                  href
                  class="mt-4 intro-x w-full block text-center rounded-md py-3 border border-dotted border-theme-15 dark:border-dark-5 text-theme-16 dark:text-gray-600"
                  >{{ $t("translation.view_more_text") }}</a
                >
              </router-link>
            </div>
          </div>
        </div>
        <!-- END: Notifications -->

        <!-- BEGIN: Notifications -->
        <!-- <div class="intro-x dropdown mr-auto sm:mr-6" > -->
        <div class="intro-x dropdown mr-auto sm:mr-3 hidden">
          <div
            class="dropdown-toggle notification cursor-pointer"
            role="button"
            aria-expanded="false"
          >
            <div class>
              <a href="#" class="notification">
                <!-- <i class="fa fa-bell-o"></i> -->
                <MailIcon />
                <span class="badge animate-bounce">{{ emailNumber }}</span>
              </a>
            </div>
            <!--      <div class="bg-red-100 text-red-700 px-1 rounded relative">
  <strong class="font-bold"><BellIcon class="notification__icon dark:text-gray-300" />{{this.currentNotificationCount}}</strong>
            </div>-->
          </div>
          <div class="notification-content pt-2 dropdown-menu">
            <div
              class="notification-content__box dropdown-menu__content box dark:bg-dark-6"
            >
              <!-- <div class="notification-content__title">Email Notifications</div> -->
              <div class="intro-x flex items-center h-10">
                <h2 class="notification-content__title">
                  {{ $t("translation.email_notifications_text") }}
                </h2>

                <a
                  href="javascript:;"
                  class="ml-auto mr-1 mb-2 text-red dark:text-theme-10 truncate"
                  @click="MarkAllRead()"
                >
                  {{ $t("translation.mark_all_read_text") }}
                </a>
              </div>

              <div
                v-for="notificationclientemail in notificationclientemails"
                :key="notificationclientemail"
              >
                <!-- <router-link
                  class="cursor-pointer relative flex items-center mt-5"
                  :to="{
                    name: 'side-menu-open-email',
                    params: {
                      emailId: notificationclientemail.id,
                      messageId: notificationclientemail.data.message_id
                    }
                  }"
                  @click="goToEmail()"
                > -->
                <div class="flex-none image-fit mr-1">
                  <div class="cursor-pointer relative flex items-center mt-5">
                    <Avatar
                      v-if="!!notificationclientemail.data.from_details"
                      v-bind:initials="
                        notificationclientemail?.data?.from_details
                          ?.first_name +
                        notificationclientemail?.data?.from_details?.last_name
                      "
                      class="rounded-full"
                    />
                    <Avatar
                      v-if="notificationclientemail?.data?.message"
                      v-bind:initials="notificationclientemail?.data?.message"
                      class="rounded-full"
                    />
                    <div
                      class="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white"
                    ></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center">
                      <a href="javascript:;" class="font-medium truncate mr-5">
                        {{ notificationclientemail?.data?.message }}
                        <!-- {{
                          notificationclientemail?.data?.from_details?.first_name
                        }}
                        {{
                          notificationclientemail?.data?.from_details?.last_name
                        }} -->
                      </a>
                      <div
                        class="text-xs text-gray-500 ml-auto whitespace-nowrap"
                      >
                        {{
                          moment(notificationclientemail?.created_at)?.fromNow()
                        }}
                      </div>
                    </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">
                      {{ notificationclientemail?.message }}
                      <!-- {{ notificationclientemail?.data?.subject }} -->
                    </div>
                  </div>
                </div>
                <!-- </router-link> -->
              </div>

              <router-link to="/dashboard/communication">
                <a
                  href
                  class="mt-4 intro-x w-full block text-center rounded-md py-3 border border-dotted border-theme-15 dark:border-dark-5 text-theme-16 dark:text-gray-600"
                >
                  {{ $t("translation.view_more_text") }}</a
                >
              </router-link>
              <!-- <router-link to="/appointments/recalls">
                <a
                  href
                  class="mt-4 intro-x w-full block text-center rounded-md py-3 border border-dotted border-theme-15 dark:border-dark-5 text-theme-16 dark:text-gray-600"
                >
                  {{ $t('translation.view_more_text') }}</a
                >
              </router-link> -->
            </div>
          </div>
        </div>
        <!-- END: Notifications -->
        <!-- translator -->
        <a
          href="javascript:;"
          data-toggle="modal"
          data-target="#translate-modal"
          class="mr-auto sm:mr-6"
          style="display: none"
        >
          <GlobeIcon class="text-theme-36" />
        </a>

        <!-- BEGIN: Account Menu   v-if="currentUser.photo"-->
        <div class="intro-x dropdown w-8 h-8" @click="showMenu">
          <div
            class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
            role="button"
            aria-expanded="false"
          >
            <img
              v-if="currentUser.image"
              alt
              class="rounded-full"
              :src="currentUser.image"
            />
            <img
              v-else
              alt="Profile Image"
              class="rounded-full"
              :src="'https://via.placeholder.com/150'"
            />
          </div>

          <div
            class="dropdown-menu w-56"
            :class="{ hidden: !menuVisible }"
            @click="hideMenu"
          >
            <div
              class="dropdown-menu__content box bg-theme-26 dark:bg-dark-6 text-white"
            >
              <div class="p-4 border-b border-white dark:border-dark-3">
                <div v-if="currentUser" class="font-medium">
                  {{ currentUser.first_name }} {{ currentUser.last_name }}
                </div>
                <div v-if="currentUser" class="font-medium">
                  {{ currentUser.email }}
                </div>
                <div v-if="currentUser" class="font-medium">
                  +{{ currentUser.patient_phone }}
                </div>
              </div>
              <div class="p-2">
                <router-link
                  to="/dashboard/profile"
                  class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-white hover:text-theme-36 dark:hover:bg-dark-3 rounded-md"
                >
                  <UserIcon class="w-4 h-4 mr-2" />{{
                    $t("translation.profile_text")
                  }}
                </router-link>
              </div>

              <div class="p-2 border-t border-white dark:border-dark-3">
                <router-link
                  to="/"
                  @click="onLogout"
                  class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-white hover:text-theme-36 dark:hover:bg-dark-3 rounded-md close"
                >
                  <Log-outIcon class="w-4 h-4 mr-2" />{{
                    $t("translation.logout_text")
                  }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- translation -->
        <div class="text-white text-sm ml-1">
          <TomSelect
            v-model="lang"
            @change="languagechange"
            class="text-white text-sm"
          >
            <option value="en" selected="selected">
              🇺🇸 {{ $t("translation.english_text") }}
            </option>
            <option value="nl">🇳🇱 {{ $t("translation.dutch_text") }}</option>
          </TomSelect>
        </div>

        <!-- END: Account Menu -->
      </div>
      <!-- <ModalIdle v-if="isIdle"/> -->
      <!-- <ModalCheckIn /> -->
    </div>

    <TranslateModal />
  </div>
  <!-- BEGIN: Account Menu   v-if="currentUser.photo"-->
  <!-- END: Top Bar -->
</template>

<script>
import { defineComponent, ref, toRaw, nextTick, inject } from "vue";

import axios from "axios";
import moment from "moment";
// import ModalCheckIn from '@/components/checkin/CheckIn.vue'
import TranslateModal from "@/components/translate/TranslateModal.vue";
import Avatar from "@/components/avatar/Avatar.vue";
import router from "../../router";
import { useI18n } from "vue-i18n";
export default defineComponent({
  components: {
    // ModalCheckIn,
    TranslateModal,
    Avatar,
  },
  setup() {
    const { t } = useI18n({});
    const searchDropdown = ref(false);
    const lang = ref(localStorage.getItem("lang") ?? "nl");

    const languagechange = () => {
      console.log("new language");
      localStorage.setItem("lang", lang.value);
      location.reload();
    };
    const showSearchDropdown = () => {
      searchDropdown.value = true;
    };

    const hideSearchDropdown = () => {
      searchDropdown.value = false;
    };
    const menuVisible = ref(false);

    const hideMenu = () => {
      menuVisible.value = false;
      nextTick();
    };

    const showMenu = () => {
      console.log("menu", menuVisible.value);
      menuVisible.value = true;
      nextTick();
      console.log("menuafter", menuVisible.value);
    };

    return {
      t,
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown,
      currentNotificationCount: 0,
      menuVisible,
      hideMenu,
      showMenu,
      inbox: [],
      openstatus: "false",
      languagechange,
      lang,
    };
  },
  data() {
    return {
      notifications: [],
      loanRepayment: null,
      arrearStatus: "",
      notificationclientemails: "",
      emailNumber: 0,
    };
  },
  watch: {
    emailNumber: function () {
      this.getInbox();
    },
  },
  created() {},
  mounted() {
    this.getNotifications();
    this.getEmail();
    this.getInbox();
  },
  // eslint-disable-next-line no-dupe-keys
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user);
    },
    crumbs() {
      return this.$route.meta.crumbs;
    },
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    },
    timeOut() {},
  },
  // logout
  methods: {
    moment,
    onLogout: function () {
      localStorage.removeItem("tooth_sections");
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    getLoan(notification) {
      this.loanRepayment = notification;
      console.log("open notification", this.loanRepayment);
    },

    goToEmail() {
      console.log("email clicked already");
      this.getInbox();
      console.log("this.emailNumber check", this.emailNumber);

      this.openstatus = "true";
      // this.$router.push({
      //   name: 'side-menu-open-email',
      //  params: { emailId: notificationclientemail.id , messageId:notificationclientemail.data.message_id}
      // })
    },
    MarkAllRead() {
      console.log("mark all red clicked");
      this.loading = true;
      const token = localStorage.getItem("token");
      axios

        .post(
          "v2/mails/mark_all_read",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,

              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((res) => {
          this.loading = false;

          // this.inbox = res.data.payload
          // console.log('inbox', this.inbox )
          //  const notify = res.data.payload
          //   const notresponse = notify.filter(
          //   element => element.read_at === null
          // )
          //       this.notificationclientemails = notify.slice(0, 5)
          //       this.emailNumber = notify.length
          //      Object.assign(
          //  this.notificationclientemails,notify.slice(0, 5)
          //   )
          //    Object.assign(
          //  this.emailNumber,notify.length
          //   )
          router.push("/dashboard/communication");
          if (res.data.success === false) {
            console.log("expired session");
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        })
        // .catch(err => console.log(err))
        .catch(function (err) {
          console.log("expired session error new", err.response.status);
          const errorCode = err.response.status;
          if (errorCode === 401) {
            console.log("expired session");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.go("/login");
          } else {
            // Handle else
          }
        });
    },
    // Getting All inbox
    getInbox() {
      this.loading = true;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID");

      const data = {
        patientId: userId,
      };
      axios

        .post("v2/mails/notification", data, {
          headers: {
            Authorization: "Bearer " + token,

            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then((res) => {
          this.loading = false;

          this.inbox = res.data.payload;

          const notify = res.data.payload;
          // const notify = res.data.payload[0]
          //   const notresponse = notify.filter(
          //   element => element.read_at === null
          // )
          this.notificationclientemails = notify.slice(0, 5);
          this.emailNumber = notify.length;
          console.log(
            "this.notificationclientemails",
            this.notificationclientemails
          );
          Object.assign(this.notificationclientemails, notify.slice(0, 5));
          Object.assign(this.emailNumber, notify.length);
          if (res.data.success === false) {
            console.log("expired session");
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        })
        // .catch(err => console.log(err))
        .catch(function (err) {
          console.log("expired session error new", err.response.status);
          const errorCode = err.response.status;
          if (errorCode === 401) {
            console.log("expired session");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.go("/login");
          } else {
            // Handle else
          }
        });
    },
    // Getting Notifications
    getNotifications() {
      this.loading = true;

      // const token = localStorage.getItem('token')

      // try {
      //   axios
      //   //  .get('/get-specific-notifications', {
      //     .get('/get-unread-notifications', {
      //       headers: {
      //         Authorization: 'Bearer ' + token,

      //         'Content-Type': 'application/json',
      //         'X-Requested-With': 'XMLHttpRequest'
      //       }
      //     })
      //     .then((res) => {
      //       // this.notifications = res.data.data
      //       this.notifications = res.data.note_display
      //       this.currentNotificationCount = res.data.count
      //       localStorage.setItem('arrear_status', res.data.hasArrears)
      //       // this.loading = false
      //       // console.log('before notifications')
      //       console.log('before notifications', this.notifications)
      //       console.log('count', this.currentNotificationCount)
      //       console.log('res.data.success', res.data.success)

      //       if (res.data.success === false) {
      //         console.log('expired session')
      //         this.$store.dispatch('auth/logout')
      //         this.$router.push('/login')
      //         // window.location.href = '/'
      //         // localStorage.removeItem('user')
      //         // this.$router.push('/login')
      //       }
      //     })
      //     .catch((err) => console.log(err))
      // } catch (error) {
      //   console.log('try catch')
      //   console.log(error)
      // }
    },

    // Getting All email notifications
    getEmail() {
      this.loading = true;
      const token = localStorage.getItem("token");

      const userId = localStorage.getItem("userID");

      const data = {
        patientId: userId,
      };
      axios

        .post("v2/mails/patient_mail", data, {
          headers: {
            Authorization: "Bearer " + token,

            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then((res) => {
          this.loading = false;

          // const notify = res.data.payload.notifications
          // const notresponse = notify.filter(
          //         element => element.read_at === null
          //       )
          //           this.notificationclientemails = notresponse.slice(0, 5)
          //           this.emailNumber = notresponse.length
          //          Object.assign(
          //      this.notificationclientemails,notresponse.slice(0, 5)
          //       )
          //        Object.assign(
          //      this.emailNumber,notify.length
          //       )

          if (res.data.success === false) {
            console.log("expired session");
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        })
        .catch(function (err) {
          const errorCode = err.response.status;
          if (errorCode === 401) {
            console.log("expired session");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            this.$router.go("/login");
          } else {
            // Handle else
          }
        });
    },
  },
});
</script>
<style scoped>
.budgecard {
  background-color: #fff4ef;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  border-radius: 2px;
}

.notification i {
  font-size: 24px;
  color: grey;
  position: relative;
}

.notification .badge {
  right: -10px;
  position: absolute;
  top: -10px;
  background-color: #a52a2a;
  height: 20px;
  border-radius: 30px;
  display: grid;
  place-items: center;
  color: #f4f4f4;
  width: 20px;
}
.text-red {
  color: red;
}
.blink-hard {
  animation: blinker 1s step-end infinite;
}
.blink-soft {
  animation: blinker 1.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
<style lang="scss">
/* calender */
.fc .fc-button {
  background-color: #ff782e !important;
  border-color: #ff782e !important;
}
.fc .fc-toolbar-title {
  font-size: 1.25rem !important;
  margin: 0;
  font-weight: 500;
  padding: 20px 0 0px 20px;
}
.nav.nav-tabs .active {
  border-color: #ff782e !important;
}

.tom-select .ts-dropdown .option.active {
  color: inherit !important;
}
.dark .tom-select .ts-dropdown .option.active,
.tom-select .ts-dropdown .option.active {
  color: black !important;
}

a.fc-col-header-cell-cushion {
  font-size: 0.85em !important;
  line-height: 2.2rem !important;
  font-weight: 600 !important;
}

.fc .fc-daygrid-day-top {
  flex-direction: inherit !important;
  padding: 5px !important;
  font-size: 0.75em !important;
  color: #6b7280 !important;
}

.fc .fc-button-primary:disabled {
  background-color: #eeeeee !important;
  color: black !important;
  border-color: #eeeeee !important;
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  text-transform: capitalize !important;
}

/* translator */

.vg-body {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  background: lightgrey;
}

.vg-container {
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
.vg-text {
  color: black;
  padding-left: 10px;
}

.vg-items {
  display: flex;
  align-items: center;
}

.vg-flag {
  height: 40px;
}
</style>
