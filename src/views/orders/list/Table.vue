<template>
  <div>
    <div>
      <div class="intro-y box p-5 mt-5 overflow-auto">
        <!-- loader text -->
        <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
        >
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>loading...</span>
        </span>

        <div v-if="orders?.length > 0">
          <div id="contentdiv" class="bg-white">
            <table
              class="display table table-report sm:mt-2"
              style="
				  width: 100%;
				  overflow-x: auto;
				  white-space: nowrap;
				  left: 0;
				  right: 0;
				"
            >
              <thead>
                <tr>
                  <!-- <th class="whitespace-nowrap">No.#</th> -->

                  <th class="whitespace-nowrap flex">
                    <div>
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="checkbox1"
                        :checked="
                          checkedorders.length === orders.length
                        "
                        @change="checkedOrderAll"
                      />
                    </div>
                    <span class="ml-2">Item</span>
                  </th>

                  <th class="whitespace-nowrap">
                    Price
                  </th>

                  <th class="whitespace-nowrap">
                    Quantity
                  </th>

                  <th class="whitespace-nowrap">
                    Total Amount
                  </th>

                  <th class="whitespace-nowrap">
                    Status
                  </th>
                  <th class="whitespace-nowrap">
                    Shipping Address
                  </th>
                  <th class="whitespace-nowrap">
                    Order Date
                  </th>
                  <th class="whitespace-nowrap">
                    Date Created
                  </th>
                  <th class="flex justify-between">
                    {{ $t("translation.action_text") }}
                    <div>
                      <span
                        class="fullScreenBTN cursor-pointer text-xl hover:text-yellow-650"
                        @click="setFullScreen"
                        v-if="!isFullscreen"
                      >
                        <ArrowsExpandIcon class="w-6 h-6" />
                      </span>
                      <span
                        class="exitfullScreenBTN cursor-pointer hover:text-yellow-650 pr-2"
                        @click="exitFullScreen"
                        v-if="isFullscreen"
                      >
                        <i class="fa fa-compress"></i>
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in orders"
                  :key="order?.id"
                  class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                  @click="openOrder(order)"
                  :checked="selected"
                >
                  <td class="whitespace-nowrap">
                    <div class="flex items-center">
                      <input
                        class="form-check-input transition-all duration-100 ease-in-out shadow-sm cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;[type='radio']]:checked:bg-primary [&amp;[type='radio']]:checked:border-primary [&amp;[type='radio']]:checked:border-opacity-10 [&amp;[type='checkbox']]:checked:bg-primary [&amp;[type='checkbox']]:checked:border-primary [&amp;[type='checkbox']]:checked:border-opacity-10 [&amp;:disabled:not(:checked)]:bg-slate-100 [&amp;:disabled:not(:checked)]:cursor-not-allowed [&amp;:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&amp;:disabled:checked]:opacity-70 [&amp;:disabled:checked]:cursor-not-allowed [&amp;:disabled:checked]:dark:bg-darkmode-800/50 flex-none border-slate-400 checked:border-primary"
                        type="checkbox"
                        :value="email?.id"
                        :checked="emailSelected(email?.id)"
                        @change="checkedOrderMethod($event, email)"
                        @click.stop
                      />

                      {{ order?.itemId }}
                    </div>
                  </td>

                  <td class="whitespace-nowrap"></td>
                  <td class="whitespace-nowrap">
                    {{ order?.quantity }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ order?.total_amount }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ order?.status }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ order?.shipping_address }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ moment(order?.order_date).format("DD-MM-YYYY") }}
                  </td>
                  <td>
                    {{ moment(order?.created_at).format("DD-MM-YYYY") }}
                  </td>
                  <td class="whitespace-nowrap">
                    <div class="flex items-center">
                      <Menu as="div" class="relative inline-block text-left">
                        <div>
                          <MenuButton
                            class="group inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            <DotsHorizontalIcon
                              class="h-6 w-6 cursor-pointer group-hover:text-gray-900"
                            ></DotsHorizontalIcon>
                          </MenuButton>
                        </div>

                        <transition
                          enter-active-class="transition duration-100 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-in"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <MenuItems
                            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          >
                            <div
                              class="px-1 py-1"
                              @click="showAppDetail(order)"
                            >
                              <MenuItem v-slot="{ active }">
                                <button
                                  :class="[
                                    active
                                      ? 'bg-gray-200 text-yellow-650'
                                      : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  ]"
                                >
                                  <MailOpenIcon
                                    :active="active"
                                    class="mr-2 h-5 w-5 text-yellow-650"
                                    aria-hidden="true"
                                  />
                                  {{ $t("translation.open_text") }}
                                </button>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center h-min-screen"
        >
          <img
            v-if="!isLoading"
            src="../../../assets/images/emptybox.png"
            alt="Image"
            class="w-1/2"
          />
          <span v-if="!isLoading" class="text-gray-600">{{
            $t("translation.no_data_text")
          }}</span>
        </div>
        <span
          v-if="isLoading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
        >
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>
            <p class="intro-y text-lg font-medium mr-auto mt-2">
              {{ $t("translation.loading_text") }}..
            </p>
          </span>
        </span>
      </div>
      <!-- END: HTML Table Data -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import moment from "moment";
import router from "../../../router";
import { ArrowsExpandIcon } from "@heroicons/vue/outline";
import {
  DotsHorizontalIcon,
  MailOpenIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
export default defineComponent({
  props: {
    orders: Array,
    isLoading: Boolean,
    filterOption: String,
    endScope: Boolean,
    isTarget: Boolean,
    isUnchenkallstatus: Boolean,
  },
  components: {
    DotsHorizontalIcon,
    ArrowsExpandIcon,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    QuestionMarkCircleIcon,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },

  data() {
    return {};
  },

  methods: {},
  setup(props, { emit }) {
    const checkedorders = ref([]);
    const checkedOrderMethod = (event, email) => {
      // emit("onSelected", email, event.target.checked);
      onSelected(email, event.target.checked);
    };
    const StatusClassunread = (status) => {
      console.log("read at status", status);
      return status === null
        ? "text-black font-bold !bg-slate-200 dark:text-white"
        : "";
    };
    const truncateString = (string, limit) => {
      if (string.length > limit) {
        return string.substring(0, limit) + "...";
      }
      return string;
    };
    const onSelected = (email, isChecked) => {
      if (isChecked) {
        checkedorders.value.push(email?.id);
      } else {
        checkedorders.value.splice(
          checkedorders.value.indexOf(email?.id),
          1
        );
      }
      emit("checkedOrderList", checkedorders.value);
    };

    const openOrder = (order) => {
      //   console.log("open sent email", email);
      //   const messageID = email?.id;
      //   router.push({
      //     name: "side-menu-open-email",
      //     params: {
      //       newmessageID: messageID,
      //     },
      //   });
    };
    const checkedOrderAll = (event) => {
      checkedorders.value = [];
      if (event.target.checked) {
        const OrderIds = props.emails.map((p) => p.id);
        console.log("isUnchenkallstatusnnnn first", OrderIds);
        checkedorders.value.push(...OrderIds);
      }
      if (props.isUnchenkallstatus) {
        console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      }
      emit("checkedOrderList", checkedorders.value);
    };
    const emailSelected = (emailId) => {
      console.log(
        "ggggggggg",
        emailId === checkedorders.value.find((ele) => ele === emailId)
      );
      return (
        emailId === checkedorders.value.find((ele) => ele === emailId)
      );
    };

    const processText = (string) => {
      const stringWithoutQuotes = string.replace(/"/g, "");
      return stringWithoutQuotes;
      // console.log(stringWithoutQuotes);
    };
    const isFullscreen = ref(false);

    const setFullScreen = () => {
      const element = document.getElementById("contentdiv");
      if (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          /* Safari */
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          /* IE11 */
          element.msRequestFullscreen();
        }

        isFullscreen.value = true;
        // Emit a custom event
        const fullscreenEvent = new CustomEvent("fullscreenToggle", {
          detail: true,
        });
        element.dispatchEvent(fullscreenEvent);
      }
    };
    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }

      isFullscreen.value = false; // Update the isFullscreen ref
      // Emit a custom event
      const fullscreenEvent = new CustomEvent("fullscreenToggle", {
        detail: false,
      });
      document.dispatchEvent(fullscreenEvent);
    };

    return {
      checkedOrderMethod,
      StatusClassunread,
      truncateString,
      moment,
      onSelected,
      checkedorders,
      openOrder,
      checkedOrderAll,
      emailSelected,
      processText,
      isFullscreen,
      setFullScreen,
      exitFullScreen,
    };
  },
});
</script>
<style scoped>
::v-deep input:checked {
  background-color: #ff782e !important;
  border: 1px solid #ff782e !important;
}

.bg-unread {
  background-color: #bdbcbb;
}
</style>
