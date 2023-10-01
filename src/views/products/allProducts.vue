
<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- first column -->
      <div class="col-span-12">
        <!-- table -->
        <div>
          <div>
            <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
              <h2 class="text-lg font-medium mr-auto">Products</h2>

              <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                <a
                  href="javascript:;"
                  data-toggle="modal"
                  data-target="#static-backdrop-modal-preview"
                  class="btn mr-1 mb-2 bg-theme-1 text-white"
                >
                  <PlusIcon />
                  <p>New Product</p>
                </a>

                <!-- END: Super Large Modal Toggle -->
                <div class="dropdown ml-auto sm:ml-0">
                  <div class="dropdown-menu w-40">
                    <div
                      class="dropdown-menu__content box dark:bg-dark-1 p-2"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- BEGIN: HTML Table Data -->

            <div class="intro-y box p-5 mt-5">
              <div
                class="flex flex-col sm:flex-row sm:items-end xl:items-start"
              >
                <div class="flex mt-5 sm:mt-0"></div>
              </div>
              <!-- loader text -->
              <span
                v-if="loading"
                class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
              >
                <LoadingIcon icon="oval" class="w-10 h-10" />
                <span>{{ $t("translation.loading_text") }}</span>
              </span>
              <div v-if="!loading" class="scrollbar-hidden">
                <ProductTable />
                <div
                  id="printMe intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0"
                ></div>
              </div>
            </div>

            <!-- END: HTML Table Data -->
          </div>
        </div>
        <!-- <TableAppointment /> -->
      </div>
      <!-- last column -->
      <div class="col-span-12">
        <div></div>
      </div>
      <!--end last column -->
    </div>
    <div></div>
    <div></div>
    <AddProduct />
  </div>
  <!-- END: Super Large Modal Content -->
</template>

<script>
import {
  defineComponent,
  toRaw,
  reactive,
  toRefs,
  inject,
  ref,
  provide,
} from "vue";
// import TableAppointment from '../appointments/TableAppointment.vue'
import ProductTable from "./list/Container.vue";
import AddProduct from "./AddProduct.vue";

import axios from "axios";
import Toastify from "toastify-js";
import moment from "moment";

import { required, maxValue, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import router from "../../router";
import AppointmentsService from "../../service/appointments-service";
import $ from "cash-dom";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    // TableAppointment,
    AddProduct,
    ProductTable,
  },
});
</script>
