<template>
  <div>
    <div
      id="static-backdrop-modal-delete"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="">
          <a data-dismiss="modal">
            <i data-feather="X" class="w-8 h-8 text-gray-500"></i>
          </a>

          <div class="modal-body px-10">
            <div class="">
              <div
                class="w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-transform dark:bg-darkmode-600 sm:w-[460px]"
                id="headlessui-dialog-panel-12"
              >
                <div class="p-5 text-center">
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
                    class="stroke-1.5 w-16 h-16 mx-auto mt-3 text-danger"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  <div
              v-if="message"
              class="alert alert-outline-danger show flex items-center mb-2 mt-2"
              role="alert"
            >
              {{ message }}
            </div>
                  <div class="mt-5 text-3xl">Are you sure?</div>
                  <div class="mt-2 text-slate-500">
                    Do you really want to delete the records for this product ? <br />
                    This process cannot be undone.
                  </div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button
                  @click="closeModal()"
                    data-dismiss="modal"
                    class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&amp;:hover:not(:disabled)]:bg-secondary/20 [&amp;:hover:not(:disabled)]:dark:bg-darkmode-100/10 w-24 mr-1"
                    type="button"
                  >
                    Cancel</button
                  ><button
                    class="text-white transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium 
                    cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 
                    [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-theme-34 border-theme-34  w-24"
                    type="button"
                    @click="deleteProduct()"
                  >
                    Delete
                  </button>
                </div>
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
import router from '../../router'



import ProductService from "../../service/products";
import { useI18n } from "vue-i18n";
import $ from "cash-dom";

export default defineComponent({


  props: {
    productID: String,
  },

  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user);
    },
  },

  setup(props, { emit }) {
    const { t } = useI18n({});
const message = ref(null)
const closeModal=()=>{
  message .value=null
}
    const deleteProduct = async () => {
      console.log("got productID", props.productID);
      const user = localStorage.getItem("user");
      const VendorId = JSON.parse(user)?.id;
      const data = {
        id: props.productID,
        VenderId: VendorId,
      };

      try {
        ProductService.deleteProduct(data)
          .then((response) => {
           
            message.value= response?.message
          
            console.log("my response", response)
            // Toastify({
            //   node: $("#delete-success-notification-content")
            //     .clone()
            //     .removeClass("hidden")[0],
            //   duration: 3000,
            //   newWindow: true,
            //   close: true,
            //   gravity: "top",
            //   position: "right",
            //   stopOnFocus: true,
            // }).showToast();
            if(response?.status == 'success'){
              message.value=null
              $('#static-backdrop-modal-delete').modal('hide');
              // router.push({ name: 'side-menu-view-products' });
              router.go('/allproducts')
            }
           
            // document.querySelector(".closeBTN").click();
          })
          .catch((error) => {
            console.log("got error", error);
            // Handle errors
          });
      } catch (err) {
        console.log("caught error", err);
      }
    };

    return {
      deleteProduct,
      closeModal,
      message
    };
  },
});
</script>
<style lang="scss"></style>
