
<template>
  <div>
    <CustomerSupport class="position: absolute z-50" />
    <div
      class="intro-y  grid grid-cols-12 gap-5 mt-1 col-span-12 lg:col-span-9 2xl:col-span-10"
    >
      <!-- BEGIN: Chat Side Menu -->
      <div class="col-span-12 lg:col-span-12 2xl:col-span-12 ">
        <div class="intro-y pr-1">
          <div class="p-2">
            <div
              class="nav nav-tabs flex-col sm:flex-row justify-center lg:justify-start"
              role="tablist"
            >
              <a
                id="transactions-tab"
                data-toggle="tab"
                data-target="#transactions"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center active"
                role="tab"
                aria-controls="transactions"
                aria-selected="true"
              >
                <p>
                  {{ $t('translation.emails_text') }}
                </p>
              </a>
              <!-- <a
                id="overview-tab"
                data-toggle="tab"
                data-target="#overview"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="overview"
                aria-selected="false"
                ><MessageCircleIcon /> 
                <p v-if="translations.text_chat">{{translations.text_chat}}</p>
                  <p v-else>Chat</p>
                
                </a
              > -->
              <a
                id="payments-tab"
                data-toggle="tab"
                data-target="#payments"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="payments"
                aria-selected="false"
                ><BellIcon />
                <p>{{ $t('translation.notifications_text') }}</p>
              </a>
            </div>
          </div>
        </div>

        <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-20"
        >
          <LoadingIcon icon="puff" class="w-12 h-12 items-center" />
          <span>
            <p>{{
                                  $t("translation.loading_text")
                                }}</p>
          </span>
        </span>

        <div v-if="!loading" class="tab-content">
          <div
            id="overview"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <!--start chat -->
            <chat />
          </div>
          <!-- start nottification -->
          <div
            id="payments"
            class="tab-pane box"
            role="tabpanel"
            aria-labelledby="payments-tab"
          >
            <div class="pr-1">
              <div
                class="box p-5 mt-5 intro-y col-span-12 overflow-auto lg:overflow-visible"
              >
                <!-- <notification /> -->
              </div>
            </div>
          </div>
          <div
            id="transactions"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="transactions-tab"
          >
            <div class="pr-1">
              <div
                class="mt-1 intro-y col-span-12 overflow-auto lg:overflow-visible"
              >
                <Email />
              </div>
            </div>
          </div>
          <div
            id="profile"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="pr-1"></div>
          </div>
        </div>
      </div>

      <!-- END: Chat Side Menu -->
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import chat from '../chat/Main.vue'
import Email from '../communications/Emailing.vue'
import CustomerSupport from '@/components/customersupport/Chat.vue'

// import sms from '../communications/Sms.vue'
import $ from 'jquery'
export default defineComponent({
  components: {
    // chat,
    Email,
    CustomerSupport
  },
  data() {
    return {
      loading: false
    }
  },
  created() {},
  mounted() {},
  computed: {},

  methods: {},
  setup() {
    return {}
  }
})
</script>
<style scoped lang="scss">
// .nav.nav-tabs .active {
//     border-color: #FF782E;
//     color: #FF782E;
// }
</style>
