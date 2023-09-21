<template>
  
  <div class="bg-white dark:bg-dark-1 h-full bg-transparent overflow-hidden ">
    <!-- content container header -->

    <div id="contentdiv" class="parent-container flex flex-col ">
      <div
        class="grid grid-cols-7 2xl:grid-cols-7 xl:grid-cols-7 lg:grid-cols-7 md:grid-cols-6 mt-2 border-b 
        text-gray-800 dark:text-white dark:bg-dark-1 font-semibold border-gray-400 bg-gray-200 p-2 mx-1 h-14 items-center"
      >
        <div class="flex form-check custom-checkbox mx-1">
          <div>
            <input
              type="checkbox"
              class="form-check-input"
              id="checkbox1"
              :checked="checkedInvoices.length === invoices.length"
              @change="checkedInvoiceAll"
            />
          </div> <span class="ml-1"> {{ $t('translation.invoice_text') }}</span>
         
        </div>
       
        <div class=" ml-4">{{ $t('translation.amount_paid_text') }}</div>
        <div class="ml-2">{{ $t('translation.amount_due_text') }}</div>
        <div class="ml-2">{{ $t('translation.total_amount_text') }}</div>
        <div class="ml-2">{{ $t('translation.status_text') }}</div>
        <div class="ml-2 hidden 2xl:block xl:block lg:block">{{ $t('translation.date_text') }} </div>
        <div class="flex justify-between ml-2">
          {{ $t('translation.action_text') }} 
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
        </div>
      </div>

      <!-- content container header -->
      <div class="min-h-full w-full mt-1 scrollContent " ref="scrollContainer">
        <div
          class="h-full gap-2 w-full text-sm text-gray-800 p-1 overflow-auto "
          ref="tableContainer"
          v-on:scroll.passive="listenToScroll"
        >
    
      
        <div v-if="invoices?.length > 0">
          <InvoiceListItem
            v-for="invoice in invoices"
            :key="invoice?.id"
            :invoice="invoice"
            :selected="invoiceSelected(invoice.id)"
            @onSelected="onSelected"
          />
        
</div>
<div v-else class="flex flex-col items-center justify-center h-min-screen">
     <img  v-if="!isLoading" src="../../../assets/images/nodata.svg" alt="Image" class="w-1/2" />
    <span v-if="!isLoading" class="text-gray-600">{{ $t('translation.no_data_text') }}</span>
  </div>

          <div class="text-center" v-if="isLoading">
              <!-- loader text -->
      <span
        class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
      >
        <LoadingIcon icon="oval" class="w-10 h-10" />
        <span >{{
                                  $t("translation.loading_text")
                                }}</span>
        
      </span>
            
          </div>
          <Observer @intersect="loadMoreData" class="mb-60" />
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref,  onMounted, inject } from "vue";


import InvoiceListItem from "./InvoiceListItem.vue";
import { ArrowsExpandIcon } from "@heroicons/vue/outline";
import Observer from "./Observer.vue";

import Loader from "@/components/shared/BigLoader.vue";
export default defineComponent({
  name: "InvoiceList",
  props: {
    invoices: Array,
    isLoading: Boolean,
    isPending: Boolean,
    filterOption: String,
    endScope: Boolean,
    isTarget: Boolean,
    isUnchenkallstatus: Boolean
  },
  components: {
    InvoiceListItem,
    ArrowsExpandIcon,
    Observer,
    Loader 
  },
  data() {
    return {
      isFullscreen: false,
      listEndObserver: null,
      canloadMoreData: false,
      scrollStatus: false,
      bottom: false,
      textPleasewait: this.translations?.please_wait_text ?? "Please wait"
    };
  },
  methods: {
    unCheckAllSelected() {
      console.log("isUnchenkallstatus lower aa");
      if (this.isUnchenkallstatus === "true") {
        console.log("isUnchenkallstatus lower mm");
      } else {
        console.log("isUnchenkallstatus lower nn");
      }
    },
    // full screen mode
    setFullScreen() {
      const element = document.getElementById("contentdiv");
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
      }
      this.isFullscreen = true;
      this.$emit("fullscreenToggle", true);
    },
    //  exit fullscreen
    exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
      this.isFullscreen = false;
      this.$emit("fullscreenToggle", true);
    },

    loadMoreData() {
      this.$emit("refreshInvoices");
      this.scrollStatus = false;
      // this.bottom=false
    },

    getCheckedList(invoice, event) {
      this.$emit("checkedInvoiceList", invoice, event);
    },

    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      console.log({ visible, scrollY, pageHeight, bottomOfPage });
      return bottomOfPage || pageHeight < visible;
    },
    refreshInvoices() {
      this.$emit("refreshInvoices");
      this.bottom = false;
    }
  },
  created() {
    // this.$store.dispatch("fetchPatients");
    // this.$nextTick().then(() => {
    //   this.setUpInterSectionObserver();
    // });
    this.unCheckAllSelected();
  },
  watch: {
    isUnchenkallstatus(newselectall, oldselectall) {
      console.log(
        "new new newselectall",
        newselectall,
        this.isUnchenkallstatus
      );
      this.checkedInvoices = [];
      this.$emit("checkedInvoiceList", this.checkedInvoices);
    },
    textPleasewait(newtextPleasewait, oldtextPleasewait) {
      this.textPleasewait = newtextPleasewait;
    },
  },
  
  setup(props, { emit }) {
    // const { translations } = useTranslations();
    // const translation = inject("translation");
    // const translation = inject('translation_v3')
    // console.log('Translations new bbb', translation('Side Bar', 13));
    const checkedInvoices = ref([]);
    const onSelected = (invoice, isChecked) => {
      if (isChecked) {
        checkedInvoices.value.push(invoice?.id);
      } else {
        checkedInvoices.value.splice(
          checkedInvoices.value.indexOf(invoice?.id),
          1
        );
      }
      emit("checkedInvoiceList", checkedInvoices.value);
    };
    const checkedInvoiceAll = event => {
      console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      checkedInvoices.value = [];
      if (event.target.checked) {
        const invoicesIds = props.invoices.map(p => p.id);
        checkedInvoices.value.push(...invoicesIds);
      }
      if (props.isUnchenkallstatus) {
        console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      }
      emit("checkedInvoiceList", checkedInvoices.value);
    };

    const invoiceSelected = invoiceId => {
      return (
        invoiceId ===
        checkedInvoices.value.find(ele => ele === invoiceId)
      );
    };
    const translations = inject("translation_v3");

    onMounted(()=>{
   
    })

    return {
      checkedInvoices,
      onSelected,
      invoiceSelected,
      checkedInvoiceAll,
      translations
    };
  }
});
</script>

<style scoped>
.parent-container {
  height: calc(100% - 90px);
}
.appointments-container {
  height: calc(100% - 80px);
}
.parent-container::backdrop {
  background-color: rgb(243, 244, 246);
}
input:checked {
    background-color: 	#ff782e !important;
     border: 1px solid 	#ff782e !important;
}
</style>
