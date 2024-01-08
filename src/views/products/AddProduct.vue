<template>
  <div>
    <div
      id="static-backdrop-modal-preview"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <a data-dismiss="modal">
            <i data-feather="X" class="w-8 h-8 text-gray-500"></i>
          </a>

          <div class="modal-body px-10">
            <div class="intro-y flex items-center mt-2">
              <h2 class="text-lg font-medium mr-auto">Add New Product</h2>
            </div>
            <div class="grid grid-cols-12 gap-6 mt-1 px-5 box">
              <div class="intro-y col-span-12 lg:col-span-12">
                <!-- BEGIN: Form Layout -->

                <form
                  class="validate-form"
                  @submit.prevent="handleSubmit"
                  autocomplete="off"
                >
                  <div class="grid grid-cols-12">
                    <!-- category-->
                    <div class="col-span-12 mt-2">
                      <label class="block font-bold">Product Name:</label>
                      <input
                        class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                        v-model="product_name"
                        required
                      />
                    </div>

                    <div class="col-span-12 mt-2">
                      <!-- select category-->
                      <div class="mt-2">
                        <label
                          for="update-profile-form-12"
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          Category
                          <span class="text-theme-6">*</span>
                        </label>

                        <TomSelect
                          v-model="selected_category"
                          class="w-full"
                          @change="onchange"
                          id="appointment_type_select"
                        >
                          <option value>
                            {{ $t("translation.select_appointment_type_text") }}
                          </option>
                          <option
                            v-for="(category, id) in productCategories"
                            :key="id"
                            :value="category.title"
                          >
                            {{ category.title }}
                          </option>
                        </TomSelect>
                      </div>
                    </div>

                    <div class="col-span-12 mt-2">
                      <label class="block font-bold">Description:</label>
                      <ClassicEditor
                        v-model="description"
                        :config="editorConfig"
                        @focus="changeFocus"
                      />
                    </div>

                    <div class="col-span-12 mt-2">
                      <label class="block font-bold">Price:</label>
                      <input
                        class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                        v-model="originalprice"
                        required
                      />
                    </div>

                    <div class="col-span-12 mt-2">
                      <label class="block font-bold">Discounted Price:</label>
                      <input
                        class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                        v-model="price"
                        required
                      />
                    </div>

                    <div class="col-span-12 mt-2">
                      <label class="block font-bold">Quantity:</label>
                      <input
                        class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                        v-model="quantity"
                        required
                      />
                    </div>

                    <!-- okay -->
                    <div class="col-span-12 mt-2">
                      <!-- select category-->
                      <div class="mt-2">
                        <label
                          for="update-profile-form-12"
                          class="form-label font-semibold text-black dark:!text-white"
                        >
                          Brand
                          <span class="text-theme-6">*</span>
                        </label>

                        <TomSelect
                          v-model="selected_brand"
                          class="w-full"
                          @change="onchangeBrand"
                          id="appointment_type_select"
                        >
                          <option value>
                            {{ $t("translation.select_appointment_type_text") }}
                          </option>
                          <option
                            v-for="(brand, id) in productBrands"
                            :key="id"
                            :value="brand.title"
                          >
                            {{ brand.title }}
                          </option>
                        </TomSelect>
                      </div>
                    </div>
                  </div>
                  <!-- sku -->
                  <div class="col-span-12 mt-2">
                    <label class="block font-bold">SKU:</label>
                    <input
                      class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                      v-model="SKU"
                      required
                    />
                  </div>
                  <!-- Weight-->
                  <div class="col-span-12 mt-2">
                    <label class="block font-bold">Weight:</label>
                    <input
                      class="intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
                      v-model="weight"
                      required
                    />
                  </div>


                  <!-- Image Uploader -->
                  <div class="col-span-12 mt-2">
                    <label class="block font-bold">Images:</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref="myfileRef"
                      @change="handleFileChange"
                    />
                  </div>

                  







                  <div style="height: 300px; width: 100%; border: 1px solid  position: relative;">
                    <DropZone 
      :maxFiles="Number(10000000000)"
      :uploadOnDrop="true"
      :multipleUpload="true"
      :parallelUpload="3"
      @addedfile="handleAddedFile"
      style="width: 100%; height: 100%;"
    />
    <!-- <DropZone 
        :maxFiles="Number(10000000000)"
        url="http://localhost:5000/item"
        :uploadOnDrop="true"
        :multipleUpload="true"
        :parallelUpload="3"
        style="width: 100%; height: 100%;"
        /> -->
  </div>








                  
                  <!-- <button @click="upload">upload</button> -->

                  <!-- Notification Alert Start -->
                  <div
                    id="basic-non-sticky-notification-content"
                    class="toastify-content hidden flex"
                  >
                    <CheckCircleIcon class="text-theme-9" />
                    <div class="ml-4 mr-4">
                      <div class="font-medium notification-message"></div>
                    </div>
                  </div>
                  <!-- Notification Alert End -->

                  <!-- END: Validation Form -->

                  <!-- BEGIN: Success Notification Content -->
                  <div
                    id="success-notification-content"
                    class="toastify-content hidden flex"
                  >
                    <CheckCircleIcon class="text-theme-9" />
                    <div class="ml-4 mr-4">
                      <!-- <div class="font-medium">Appointment has been Successfully created</div> -->
                      <div class="font-medium">
                        It has been successfully added
                      </div>
                    </div>
                  </div>
                  <!-- END: Success Notification Content -->

                  <!-- BEGIN: Failed Notification Content -->
                  <div
                    id="failed-notification-content"
                    class="toastify-content hidden flex"
                  >
                    <XCircleIcon class="text-theme-6" />
                    <div class="ml-4 mr-4">
                      <div class="font-medium">Product Creation Failed</div>
                      <div class="text-gray-600 mt-1">
                        Review your form and fill all fields
                      </div>
                    </div>
                  </div>

                  <div
                    class="container mx-auto justify-center mt-4"
                    style="
                      display: flex;
                      align-items: center;
                      text-align: center;
                    "
                  >
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                    >
                      <button
                        style="background-color: #ff2400"
                        type="reset"
                        data-dismiss="modal"
                        class="btn closeBTN btn-danger w-40 mr-auto text-gray-900 bg-theme-43"
                      >
                        <p class="text-white">
                          {{ $t("translation.cancel_text") }}
                        </p>
                      </button>

                      <button
                        type="reset"
                        class="btn clearBTN btn-warning w-40 mr-auto text-gray-900"
                        style="display: none"
                      >
                        {{ $t("translation.clear_text") }}
                      </button>
                      <button
                        type="submit"
                        class="btn bg-theme-32 w-40 mr-auto text-white"
                      >
                        <LoadingIcon
                          v-if="loading"
                          icon="spinning-circles"
                          color="white"
                          class="w-4 h-4 ml-2"
                        />
                        <p data-dismiss="modal" class="text-white" v-else>
                          <span>{{ $t("translation.submit_text") }}</span>
                        </p>
                      </button>
                    </div>
                  </div>
                </form>
                <!-- END: Form Layout -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- END: Super Large Modal Content -->
</template>

<script>
import { defineComponent, toRaw, reactive, toRefs, inject, ref } from "vue";
import Toastify from "toastify-js";
import moment from "moment";
import ClassicEditor from "../../global-components/ckeditor/ClassicEditor.vue";
import { DropZone } from 'dropzone-vue';
// Validations
import { required, maxValue, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import AppointmentsService from "../../service/appointments-service";
import { useI18n } from "vue-i18n";
import $ from "cash-dom";
import { Form, ErrorMessage, Field, useFormValues } from "vee-validate";

import { storage } from "../../firebase";
import {
  ref as storageRefs,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
export default defineComponent({
  components: { ClassicEditor, DropZone },

  data() {
    // Basic non sticky notification
    const basicNonStickyNotificationToggle = () => {
      Toastify({
        node: $("#basic-non-sticky-notification-content")
          .clone()
          .removeClass("hidden")[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    };

    const formData = reactive({
      // loan_product_id: '',
      selected_appointment_type: "",
      // monthly_income: '',
      appointment_date: "",
      comment: "",
      startTime: "",
    });
    const rules = {
      selected_appointment_type: {
        required,
      },
      appointment_date: {
        required,
      },
      comment: {},
      startTime: { required },
    };
    const validate = useVuelidate(rules, toRefs(formData));

    return {
      loadingSlotsdash: false,
      successMessage: this.t(
        "translation.appointment_created_successfully_text"
      ),
      
      selected_appointment_type: "",
      appointment_type: "",
      appointmentData: "",
      startDate: moment(),
      endDate: moment().add(10, "days"),
      startTime: "",
      endTime: "",
      dateRange: "",
      comment: "",
      appointment_date: "",
      timeSlotsArray: "",
      appointmentTypeIdSlots: "",
      dateSlots: "",
      facilityIdSlots: "",
      morningTimeSlotsArray: "",

      middayTimeSlotsArray: "",
      eveningTimeSlotsArray: "",
      timeInterval: "",
      selectedSlot: "",
      newStartTime: "",
      newEndTime: "",
      highlightedRange: "",

      // handleSubmit,
      formData,
      validate,
      loading: false,
      basicNonStickyNotificationToggle,
      search_term: "",
      sortBy: 1,

      pageSize: 20,
      currentPage: 1,
      printLoading: true,
      selectedButton: [],
      period: "",
      allTimeSlotsArray: "",
    };
  },
  mounted() {},
  created() {},
  props: ["endDate"],

  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user);
    },
  },
  methods: {
    moment,
    periodchange() {
      console.log("new period", this.period);
      if (this.period == "morning") {
        console.log("it is morning");
        if (this.allTimeSlotsArray?.length > 0) {
          this.timeSlotsArray = this.allTimeSlotsArray?.filter((slot) => {
            // Filter slots that fall within the morning time range (e.g., 6 AM - 11:59 AM)
            const startTime = Number(slot.start_time.split(":")[0]);
            return startTime >= 6 && startTime <= 11;
          });
          console.log("morning this.timeSlotsArray", this.timeSlotsArray);
        }
      } else if (this.period == "noon") {
        console.log("it is noon");
        if (this.allTimeSlotsArray?.length > 0) {
          this.timeSlotsArray = this.allTimeSlotsArray?.filter((slot) => {
            // Filter slots that fall within the afternoon time range (e.g., 12 PM - 5:59 PM)
            const startTime = Number(slot.start_time.split(":")[0]);
            return startTime >= 12 && startTime <= 17;
          });
        }
      } else if (this.period == "evening") {
        console.log("it is noon");
        if (this.allTimeSlotsArray?.length > 0) {
          this.timeSlotsArray = this.allTimeSlotsArray?.filter((slot) => {
            // Filter slots that fall within the evening time range (e.g., 6 PM - 11:59 PM)
            const startTime = Number(slot.start_time.split(":")[0]);
            return startTime >= 18 && startTime <= 23;
          });
        }
      } else {
        this.timeSlotsArray = this.allTimeSlotsArray;
      }
    },
    clearVariables() {
      console.log("cleared variables");
      this.timeSlotsArray = [];
      this.allTimeSlotsArray = [];
      this.appointmentTypeId = "";
      this.date = "";
    },

    onchange(id) {},

    handleImageUpload(event) {
      const selectedImages = event.target.files;
      console.log("Selected Images:", selectedImages);
      const imagePreviews = [];
      for (let i = 0; i < selectedImages.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.push(e.target.result);
          if (imagePreviews.length === selectedImages.length) {
            this.selectedImages = imagePreviews;
          }
        };
        reader.readAsDataURL(selectedImages[i]);
      }
    },

    upload: function() {
      const storageRef = storageRefs(storage, "products/myfile.gif");
      uploadBytes(storageRef, this.$refs.myfile.files[0]).then((snapshot) => {
        console.log("uploaded");
      });
    },
  },
  watch: {},
  setup() {
    const { t } = useI18n({});
    const productCategories = [
      { id: 1, title: "Product" },
      { id: 2, title: "Service" },
    ];

    const productBrands = [
      { id: 1, title: "Apple" },
      { id: 2, title: "Samsung" },
      { id: 2, title: "Sony" },
      { id: 1, title: "Nike" },
      { id: 2, title: "Adidas" },
      { id: 2, title: "Zara" },
    ];

    const storedLang = localStorage.getItem("lang");
    const defaultLang = storedLang ?? "nl";
    const lang = ref(defaultLang);
    const product_name = ref("");
    const selected_category = ref(null);
    const description = ref("");
    const price = ref("");
    const quantity = ref("");
    const selected_brand = ref(null);
    const SKU = ref("");
    const weight = ref("");
    const originalprice = ref("");
    const myfileRef = ref(null);

    const selectedFiles = ref([]);
    const myDropZone = ref(null);
    const handleFileChange = () => {
      // Access the files array using the ref
      selectedFiles.value = Array.from(myfileRef.value.files);
      console.log("Selected Files:", selectedFiles.value);
    };

    const uploadImages = async (files) => {
      const uploadPromises = files.map((file) => {
        const imageName = `products/${file.name}`;
        const storageRef = storageRefs(storage, imageName);

        return uploadBytes(storageRef, file).then((snapshot) => {
          // Get download URL after successful upload
          return getDownloadURL(storageRef);
        });
      });

      return Promise.all(uploadPromises);
    };

    const handleSubmit1 = async () => {
      // Check if files are selected
      if (selectedFiles.value.length === 0) {
        console.error("No files selected.");
        return;
      }

      try {
        const imageUrls = await uploadImages(selectedFiles.value);
        console.log("Download URLs:", imageUrls);
        // Handle the download URLs as needed
      } catch (error) {
        console.error("Upload failed:", error);
        // Handle the error
      }
    };

    // const uploadImages1 = async () => {
    //   const imageFiles = myfileRef.value.files;

    //   const uploadPromises = Array.from(imageFiles).map((file) => {
    //     const imageName = `products/${file.name}`;
    //     const storageRef = storageRefs(storage, imageName);

    //     return uploadBytes(storageRef, file).then((snapshot) => {

    //       return getDownloadURL(storageRef);
    //     });
    //   });

    //   return Promise.all(uploadPromises);
    // };
    const handleSubmit = async () => {
      if (selectedFiles.value.length === 0) {
        console.error("No files selected.");
        return;
      }

      const imageUrls = await uploadImages(selectedFiles.value);
      console.log("Download URLs:", imageUrls);

      // const imageUrls = await uploadImages();

      const user = localStorage.getItem("user");
      const Id = JSON.parse(user)?.id;
      const data = {
        Name: product_name.value,
        Description: description.value,
        Category: selected_category.value,
        Brand: selected_brand.value,
        Price: originalprice.value,
        Discounted_Price: price.value,
        Quantity: quantity.value,
        SKU: SKU.value,
        Weight: weight.value,
        VenderId: Id,
        Images: imageUrls,
      };

      try {
        AppointmentsService.createAppointments(data)
          .then((response) => {
            Toastify({
              node: $("#success-notification-content")
                .clone()
                .removeClass("hidden")[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
            }).showToast();
            // this.clearVariables()
            // router.push('/dashboard/viewappointments')
            // document.querySelector(".closeBTN").click();

            document.querySelector(".closeBTN").click();
          })
          .catch((error) => {
            // Handle errors
          });
      } catch (err) {
        // Handle unexpected errors
      }
    };
    return {
      t,
      lang,
      productCategories,
      productBrands,
      product_name,
      selected_category,
      description,
      originalprice,
      price,
      quantity,
      selected_brand,
      SKU,
      weight,
      handleSubmit,
      myfileRef,
      handleFileChange,
      selectedFiles,
    };
  },
});
</script>
<style lang="scss">
//
label:after {
  content: "+";

  position: absolute;
  right: 1em;
  color: #fff;
}

input:checked + label:after {
  content: "-";
  line-height: 0.8em;
}

.accordion__content {
  max-height: 0em;
  transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}
input[name="panel"]:checked ~ .accordion__content {
  /* Get this as close to what height you expect */

  max-height: 20em;
  overflow: auto;
}

.slottable {
  /* Get this as close to what height you expect */

  max-height: 20em;
  overflow: auto;
}

</style>
