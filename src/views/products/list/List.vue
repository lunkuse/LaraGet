<template>
  <div class="bg-white dark:bg-dark-1 h-full bg-transparent overflow-hidden">
    <!-- content container header -->

    <div id="contentdiv" class="parent-container flex flex-col">
      <div
        class="grid grid-cols-8 2xl:grid-cols-8 xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-8 mt-2 border-b text-gray-800 dark:text-white dark:bg-dark-1 font-semibold border-gray-400 bg-gray-200 p-2 mx-1 h-14 items-center"
      >
        <div class="flex form-check custom-checkbox mx-1">
          <div>
            <input
              type="checkbox"
              class="form-check-input"
              id="checkbox1"
              :checked="checkedAppointments.length === appointments.length"
              @change="checkedAppointmentAll"
            />
          </div>
          <span class="ml-1">Image</span>
        </div>

        <div class="ml-4 2xl:ml-4 xl:ml-4 lg:ml-4 md:ml-6">Category</div>
        <div class="ml-3 ml-3 2xl:ml-3 xl:ml-3 lg:ml-3 md:ml-5">Name</div>
        <div class="ml-3 ml-3 2xl:ml-3 xl:ml-3 lg:ml-3 md:ml-5">
          Description
        </div>
        <div class="ml-2">Price</div>
        <div class="ml-4">Brand</div>
        <div class="ml-2">Availability</div>
        <div class="flex justify-between ml-2">
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
        </div>
      </div>

      <!-- content container header -->
      <div
        class="min-h-full w-full mt-1 scrollContent pb-20"
        ref="scrollContainer"
      >
        <div
          class="h-full gap-2 w-full text-sm text-gray-800 p-1 overflow-auto"
          ref="tableContainer"
          v-on:scroll.passive="listenToScroll"
        >
          <div v-if="appointments?.length > 0">
            <ListItem
              v-for="appointment in appointments"
              :key="appointment.id"
              :appointment="appointment"
              :selected="appointmentSelected(appointment.id)"
              @onSelected="onSelected"
            />
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center h-min-screen"
          >
            <img
              v-if="!isLoading"
              src="../../../assets/images/nodata.svg"
              alt="Image"
              class="w-1/2"
            />
            <span v-if="!isLoading" class="text-gray-600">{{
              $t("translation.no_data_text")
            }}</span>
          </div>
          <div class="text-center" v-if="isLoading">
            <!-- loader text -->
            <span
              class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
            >
              <LoadingIcon icon="oval" class="w-10 h-10" />
              <span>{{ $t("translation.loading_text") }}</span>
            </span>
          </div>

          <Observer @intersect="loadMoreData" class="mb-60" />
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref, onMounted } from "vue";

import ListItem from "./ListItem.vue";
import { ArrowsExpandIcon } from "@heroicons/vue/outline";
// import Observer from "./Observer.vue";
import Observer from "../../global/Observer.vue";

import Loader from "@/components/shared/BigLoader.vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "List",
  props: {
    appointments: Array,
    isLoading: Boolean,
    isPending: Boolean,
    filterOption: String,
    endScope: Boolean,
    isTarget: Boolean,
    isUnchenkallstatus: Boolean,
  },
  components: {
    ListItem,
    ArrowsExpandIcon,
    Observer,
    Loader,
  },
  data() {
    return {
      isFullscreen: false,
      listEndObserver: null,
      canloadMoreData: false,
      scrollStatus: false,
      bottom: false,
      textPleasewait: this.t("translation.please_wait_text"),
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
      this.$emit("refreshAppointments");
      this.scrollStatus = false;
      // this.bottom=false
    },

    getCheckedList(appointment, event) {
      this.$emit("checkedAppointmentList", appointment, event);
    },

    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      console.log({ visible, scrollY, pageHeight, bottomOfPage });
      return bottomOfPage || pageHeight < visible;
    },
    refreshAppointments() {
      this.$emit("refreshAppointments");
      this.bottom = false;
    },
  },
  created() {
    this.unCheckAllSelected();
  },
  watch: {
    isUnchenkallstatus(newselectall, oldselectall) {
      console.log(
        "new new newselectall",
        newselectall,
        this.isUnchenkallstatus
      );
      this.checkedAppointments = [];
      this.$emit("checkedAppointmentList", this.checkedAppointments);
    },
    textPleasewait(newtextPleasewait, oldtextPleasewait) {
      this.textPleasewait = newtextPleasewait;
    },
  },

  setup(props, { emit }) {
    const checkedAppointments = ref([]);
    const onSelected = (appointment, isChecked) => {
      if (isChecked) {
        checkedAppointments.value.push(appointment.id);
      } else {
        checkedAppointments.value.splice(
          checkedAppointments.value.indexOf(appointment.id),
          1
        );
      }
      emit("checkedAppointmentList", checkedAppointments.value);
    };
    const checkedAppointmentAll = (event) => {
      console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      checkedAppointments.value = [];
      if (event.target.checked) {
        const appointmentsIds = props.appointments.map((p) => p.id);
        checkedAppointments.value.push(...appointmentsIds);
      }
      if (props.isUnchenkallstatus) {
        console.log("isUnchenkallstatusnnnn", props.isUnchenkallstatus);
      }
      emit("checkedAppointmentList", checkedAppointments.value);
    };

    const appointmentSelected = (appointmentId) => {
      return (
        appointmentId ===
        checkedAppointments.value.find((ele) => ele === appointmentId)
      );
    };
    const { t } = useI18n({});

    onMounted(() => {});

    return {
      t,
      checkedAppointments,
      onSelected,
      appointmentSelected,
      checkedAppointmentAll,
    };
  },
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
  background-color: #ff782e !important;
  border: 1px solid #ff782e !important;
}
</style>
