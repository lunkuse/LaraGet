<template>
  
  <div class="bg-white dark:bg-dark-1 h-full bg-transparent overflow-hidden ">
    <!-- content container header -->

    <div id="contentdiv" class="parent-container flex flex-col ">
  

      <!-- content container header -->
      <div class="min-h-full w-full mt-1 scrollContent " ref="scrollContainer">
        <div
          class="h-full gap-2 w-full text-sm text-gray-800 p-1 overflow-auto "
          ref="tableContainer"
          v-on:scroll.passive="listenToScroll"
        >
      
      
        <div v-if="emails?.length > 0">
          






          
          <EmailListItem
            v-for="email in emails"
            :key="email?.id"
            :email="email"
            :selected="emailSelected(email?.id)"
            @onSelected="onSelected"
          />

          
        
</div>
<div v-else class="flex flex-col items-center justify-center h-min-screen">
     <img  v-if="!isLoading" src="../../../assets/images/nodata.svg" alt="Image" class="w-1/2" />
    <span v-if="!isLoading" class="text-gray-600">{{ $t('translation.no_data_text') }}</span>
  </div>
<span
              v-if="isLoading"
              class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
            >
              <LoadingIcon icon="oval" class="w-10 h-10" />
              <span>
                
                <p
                  class="intro-y text-lg font-medium mr-auto mt-2"
                  
                >{{$t("translation.loading_text") }}..</p>
              </span>
            </span>   
         
          <Observer @intersect="loadMoreData" class="mb-60" />
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref,  onMounted, inject } from "vue";


import EmailListItem from "./EmailListItem.vue";
import { ArrowsExpandIcon } from "@heroicons/vue/outline";
import Observer from "./Observer.vue";

import Loader from "@/components/shared/BigLoader.vue";
export default defineComponent({
  name: "EmailList",
  props: {
    emails: Array,
    isLoading: Boolean,
    filterOption: String,
    endScope: Boolean,
    isTarget: Boolean,
    isUnchenkallstatus: Boolean
  },
  components: {
    EmailListItem,
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
      console.log("Loading more data  this.bottom", this.bottom);
      console.log("isTarget", this.isTarget);
      this.$emit("refreshEmails");
      this.scrollStatus = false;
      // this.bottom=false
    },

    getCheckedList(appointment, event) {
      this.$emit("checkedEmailList", appointment, event);
    },

    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      console.log({ visible, scrollY, pageHeight, bottomOfPage });
      return bottomOfPage || pageHeight < visible;
    },
    refreshEmails() {
      this.$emit("refreshEmails");
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
      this.checkedEmails = [];
      this.$emit("checkedEmailList", this.checkedEmails);
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
    const checkedEmails = ref([]);
    const onSelected = (email, isChecked) => {
      if (isChecked) {
        checkedEmails.value.push(email?.id);
      } else {
        checkedEmails.value.splice(
          checkedEmails.value.indexOf(email?.id),
          1
        );
      }
      emit("checkedEmailList", checkedEmails.value);
    };
    const checkedEmailAll = event => {
      console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      checkedEmails.value = [];
      if (event.target.checked) {
        const appointmentsIds = props.appointments.map(p => p.id);
        checkedEmails.value.push(...appointmentsIds);
      }
      if (props.isUnchenkallstatus) {
        console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      }
      emit("checkedEmailList", checkedEmails.value);
    };

    const emailSelected = appointmentId => {
      return (
        appointmentId ===
        checkedEmails.value.find(ele => ele === appointmentId)
      );
    };
    const translations = inject("translation_v3");

    onMounted(()=>{
   
    })

    return {
      checkedEmails,
      onSelected,
      emailSelected,
      checkedEmailAll,
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
