<template>
  <div>
    <div>
      <div class="intro-y box p-5 mt-5 overflow-auto">
        <div class="flex justify-between items-center p-1">
          <div
            @click="toggleGrid = !toggleGrid"
            class="w-16 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
            :class="{ 'bg-theme-1': !toggleGrid }"
          >
            <div
              class="bg-white w-8 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
              :class="{ 'translate-x-6': toggleGrid }"
            ></div>
          </div>
          <h2 v-if="toggleGrid" class="ml-auto p-1">
            Grid
          </h2>
          <h2 v-else class="ml-auto p-1">Table</h2>
        </div>

        <!-- loader text -->
        <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
        >
          <LoadingIcon icon="oval" class="w-10 h-10" />
          <span>loading...</span>
        </span>

        <div v-if="products?.length > 0">
          <div id="contentdiv" class="bg-white" v-if="toggleGrid">
            <table
              class="w-full text-left border-spacing-y-[10px] border-separate -mt-2"
            >
              <thead class="">
                <tr class="">
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 border-b-0 whitespace-nowrap flex"
                  >
                    <div>
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="checkbox1"
                        :checked="checkedProducts.length === products.length"
                        @change="checkedProductAll"
                      />
                    </div>
                    <span class="ml-2"> IMAGES </span>
                  </th>
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 border-b-0 whitespace-nowrap"
                  >
                    PRODUCT NAME
                  </th>
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap"
                  >
                    STOCK
                  </th>
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap"
                  >
                    PRICE
                  </th>
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap"
                  >
                    DISCOUNTED PRICE
                  </th>
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap"
                  >
                    STATUS
                  </th>
                  <th
                    class="font-medium px-5 py-3 dark:border-darkmode-300 text-center border-b-0 whitespace-nowrap flex justify-between"
                  >
                    ACTIONS
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
                  class="intro-x"
                  v-for="product in products"
                  :key="product?.id"
                >
                  <td
                    class="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  >
                    <div class="flex">
                      <input
                        class=" form-check-input transition-all duration-100 ease-in-out shadow-sm cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;[type='radio']]:checked:bg-primary [&amp;[type='radio']]:checked:border-primary [&amp;[type='radio']]:checked:border-opacity-10 [&amp;[type='checkbox']]:checked:bg-primary [&amp;[type='checkbox']]:checked:border-primary [&amp;[type='checkbox']]:checked:border-opacity-10 [&amp;:disabled:not(:checked)]:bg-slate-100 [&amp;:disabled:not(:checked)]:cursor-not-allowed [&amp;:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&amp;:disabled:checked]:opacity-70 [&amp;:disabled:checked]:cursor-not-allowed [&amp;:disabled:checked]:dark:bg-darkmode-800/50 flex-none border-slate-400 checked:border-primary"
                        type="checkbox"
                        :value="email?.id"
                        :checked="emailSelected(email?.id)"
                        @change="checkedproductMethod($event, email)"
                        @click.stop
                      />
                      <div
                        class="w-10 h-10 image-fit zoom-in ml-2"
                        v-if="product?.Images[0]"
                      >
                        <img
                          class="cursor-pointer rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          alt="Midone Tailwind HTML Admin Template"
                          :src="product?.Images[0]"
                        />
                      </div>
                      <div
                        class="w-10 h-10 -ml-5 image-fit zoom-in"
                        v-if="product?.Images[1]"
                      >
                        <img
                          class="cursor-pointer rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          alt="Midone Tailwind HTML Admin Template"
                          :src="product?.Images[1]"
                        />
                      </div>
                      <div
                        class="w-10 h-10 -ml-5 image-fit zoom-in"
                        v-if="product?.Images[2]"
                      >
                        <img
                          class="cursor-pointer rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          alt="Midone Tailwind HTML Admin Template"
                          :src="product?.Images[2]"
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  >
                    <a href="" class="font-medium whitespace-nowrap">
                      {{ product?.Category }}</a
                    >
                    <div
                      class="text-slate-500 text-xs whitespace-nowrap mt-0.5"
                    >
                      {{ product?.Name }}
                    </div>
                  </td>
                  <td
                    class="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  >
                    {{ product?.Quantity }}
                  </td>
                  <td
                    class="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  >
                    {{ product?.Price }}
                  </td>
                  <td
                    class="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  >
                    {{ product?.Discounted_Price }}
                  </td>
                  <td
                    class="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  >
                    <div
                      class="flex items-center justify-center text-theme-31"
                      v-if="product?.Availability === 'true'"
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        ></path>
                      </svg>
                      Available
                    </div>
                    <div
                      class="flex items-center justify-center text-theme-34"
                      v-else
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        ></path>
                      </svg>
                      Not Available
                    </div>
                  </td>
                  <td
                    class="px-5 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                  >
                    <div class="flex items-center justify-center">
                      <a class="flex items-center mr-3" href="#"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="stroke-1.5 w-4 h-4 mr-1"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path
                            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                          ></path>
                        </svg>
                        Edit </a
                      ><a class="flex items-center text-danger"  @click="deleteProduct(product)"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="stroke-1.5 w-4 h-4 mr-1"
                        >
                          <path d="M3 6h18"></path>
                          <path
                            d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                          ></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Delete
                      </a>

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
                                @click="openProduct(product)"
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- grid display -->
          <div class="grid grid-cols-12 gap-6 mt-5" v-if="!toggleGrid">
            <div
              class="col-span-12 intro-y md:col-span-6 lg:col-span-4 xl:col-span-3"
              v-for="product in products"
              :key="product?.id"
            >
              <div class="box">
                <div class="p-5">
                  <div
                    class="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
                  >
                    <img
                      alt="Midone - HTML Admin Template"
                      class="rounded-md"
                      :src="product?.Images[0]"
                    /><!---->
                    <div class="absolute bottom-0 z-10 px-5 pb-6 text-white">
                      <a href="" class="block text-base font-medium">{{
                        product?.Category
                      }}</a
                      ><span class="mt-3 text-xs text-white/90">
                        {{ product?.Name }}</span
                      >
                    </div>
                  </div>
                  <div class="mt-5 text-slate-600 dark:text-slate-500">
                    <div class="flex items-center">
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <path
                          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        ></path>
                        <path
                          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        ></path>
                      </svg>
                      Price: {{ product?.Price }}
                    </div>
                    <div class="flex items-center">
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <path
                          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        ></path>
                        <path
                          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        ></path>
                      </svg>
                      Discounted Price: {{ product?.Discounted_Price }}
                    </div>
                    <div class="flex items-center mt-2">
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                      Remaining Stock: {{ product?.Quantity }}
                    </div>
                    <div
                      class="flex items-center mt-2"
                      v-if="product?.Availability === 'true'"
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        ></path>
                      </svg>
                      Status: Available
                    </div>
                    <div class="flex items-center mt-2" v-else>
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
                        class="stroke-1.5 w-4 h-4 mr-2"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        ></path>
                      </svg>
                      Status: Not Available
                    </div>
                  </div>
                </div>

                <!-- deleteProduct -->
                <div
                  class="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400"
                >
                  <a
                    class="flex items-center mr-auto text-primary"
                    @click="openProduct(product)"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="stroke-1.5 w-4 h-4 mr-1"
                    >
                      <path
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Preview
                  </a>
                  <a class="flex items-center mr-3" href="#"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="stroke-1.5 w-4 h-4 mr-1"
                    >
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path
                        d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                      ></path>
                    </svg>
                    Edit
                  </a>
                  <a
                    class="flex items-center text-danger"
                    @click="deleteProduct(product)"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="stroke-1.5 w-4 h-4 mr-1"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
                  </a>
                </div>
              </div>
            </div>
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
    products: Array,
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
    const checkedProducts = ref([]);
    const checkedproductMethod = (event, email) => {
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
        checkedProducts.value.push(email?.id);
      } else {
        checkedProducts.value.splice(
          checkedProducts.value.indexOf(email?.id),
          1
        );
      }
      emit("checkedEmailList", checkedProducts.value);
    };

    const openProduct = (product) => {
      console.log("open product", product);
      const productID = product?.id;

      router.push({
        name: "side-menu-open-product",
        params: {
          productID: productID,
        },
      });
    };
    const deleteProduct = (product) => {
      console.log("delete product", product);
      // const productID = product?.id;

      // router.push({
      //   name: "side-menu-open-product",
      //   params: {
      //     productID: productID,
      //   },
      // });
    };
    const checkedProductAll = (event) => {
      checkedProducts.value = [];
      if (event.target.checked) {
        const productIds = props.emails.map((p) => p.id);

        checkedProducts.value.push(...productIds);
      }
      if (props.isUnchenkallstatus) {
        console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      }
      emit("checkedEmailList", checkedProducts.value);
    };
    const emailSelected = (emailId) => {
      console.log(
        "ggggggggg",
        emailId === checkedProducts.value.find((ele) => ele === emailId)
      );
      return emailId === checkedProducts.value.find((ele) => ele === emailId);
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
    const toggleGrid = ref(true);
    return {
      checkedproductMethod,
      StatusClassunread,
      truncateString,
      moment,
      onSelected,
      checkedProducts,
      openProduct,
      checkedProductAll,
      emailSelected,
      processText,
      isFullscreen,
      setFullScreen,
      exitFullScreen,
      toggleGrid,
      deleteProduct,
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
