<template>
  <!-- <div class="h-full bg-transparent overflow-hidden"> -->
  <div class="bg-white dark:bg-dark-1 h-full bg-transparent overflow-hidden">
    <!-- content container header -->

    <div id="contentdiv" class="parent-container flex flex-col">
      <div
        class="grid grid-cols-2    mt-2 border-b text-gray-800 font-semibold border-gray-400 bg-gray-200 p-2 mx-1 h-14 items-center"
      >
        <div class="flex form-check custom-checkbox">
          <div class="mx-1">
            <input
              type="checkbox"
              class="form-check-input"
              id="checkbox1"
              :checked="checkedTreatments.length === treatments.length"
              @change="checkedTreatmentAll"
            />
          </div>

          {{ $t('translation.treatment_text') }}
        </div>

        <!-- <div class="hidden 2xl:block xl:block lg:block md:block sm:block">
          {{ $t('translation.by_text') }}
        </div> -->
        <!-- <div class="">{{ $t('translation.date_text') }}</div>
        <div class="hidden 2xl:block xl:block">
          {{ $t('translation.time_text') }}
        </div> -->
        <!-- <div class="hidden 2xl:block xl:block lg:block md:block sm:block">
          {{ $t('translation.invoice_text') }}
        </div> -->
        <div class="flex justify-between">
          <!-- {{ $t('translation.status_text') }} -->
          {{ $t('translation.date_text') }}
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
          <div v-if="treatments?.length > 0">
            <TreatmentListItem
              v-for="treatment in treatments"
              :key="treatment.id"
              :treatment="treatment"
              :selected="treatmentSelected(treatment.id)"
              @onSelected="onSelected"
            />
          </div>

          <div class="text-center" v-if="isLoading">
            <!-- loader text -->
            <span
              class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
            >
              <LoadingIcon icon="oval" class="w-10 h-10" />
              <p>
                {{
                                  $t("translation.loading_text")
                                }}
              </p>
            </span>
          </div>
          <Observer @intersect="loadMoreData" class="mb-60" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script >
import { defineComponent, ref, onMounted, inject } from 'vue'

import TreatmentListItem from './TreatmentListItem.vue'
import { ArrowsExpandIcon } from '@heroicons/vue/outline'
import Observer from '../../appointments/appointments/Observer.vue'

export default defineComponent({
  name: 'TreatmentList',
  props: {
    treatments: Array,
    isLoading: Boolean,
    filterOption: String,
    endScope: Boolean,
    isTarget: Boolean,
    isUnchenkallstatus: Boolean
  },
  components: {
    TreatmentListItem,
    ArrowsExpandIcon,
    Observer
  },
  data() {
    return {
      isFullscreen: false,
      listEndObserver: null,
      canloadMoreData: false,
      scrollStatus: false,
      bottom: false
    }
  },
  methods: {
    unCheckAllSelected() {
      if (this.isUnchenkallstatus === 'true') {
      } else {
      }
    },
    // full screen mode
    setFullScreen() {
      const element = document.getElementById('contentdiv')
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen()
      }
      this.isFullscreen = true
      this.$emit('fullscreenToggle', true)
    },
    //  exit fullscreen
    exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen()
      }
      this.isFullscreen = false
      this.$emit('fullscreenToggle', true)
    },

    loadMoreData() {
      this.$emit('refreshTreatment')
      this.scrollStatus = false
    },

    getCheckedList(treatments, event) {
      this.$emit('checkedTreatmentList', treatments, event)
    },

    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight

      return bottomOfPage || pageHeight < visible
    },
    refreshTreatment() {
      this.$emit('refreshTreatment')
      this.bottom = false
    }
  },
  created() {
    this.unCheckAllSelected()
  },
  watch: {
    isUnchenkallstatus(newselectall, oldselectall) {
      this.checkedTreatments = []
      this.$emit('checkedTreatmentList', this.checkedTreatments)
    }
  },

  setup(props, { emit }) {
    const checkedTreatments = ref([])
    const onSelected = (treatment, isChecked) => {
      if (isChecked) {
        checkedTreatments.value.push(treatment.id)
      } else {
        checkedTreatments.value.splice(
          checkedTreatments.value.indexOf(treatment.id),
          1
        )
      }
      emit('checkedTreatmentList', checkedTreatments.value)
    }
    const checkedTreatmentAll = (event) => {
      checkedTreatments.value = []
      if (event.target.checked) {
        const treatmentsIds = props.treatments.map((p) => p.id)
        checkedTreatments.value.push(...treatmentsIds)
      }
      if (props.isUnchenkallstatus) {
      }
      emit('checkedTreatmentList', checkedTreatments.value)
    }

    const treatmentSelected = (treatmentId) => {
      return (
        treatmentId ===
        checkedTreatments.value.find((ele) => ele === treatmentId)
      )
    }

    onMounted(() => {})

    return {
      checkedTreatments,
      onSelected,
      treatmentSelected,
      checkedTreatmentAll
    }
  }
})
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
  