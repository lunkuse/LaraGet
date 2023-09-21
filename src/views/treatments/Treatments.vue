
<template>
  <div>
    <CustomerSupport class="position: absolute z-50"/>
    <div class="intro-y chat grid grid-cols-12 gap-5 mt-5 col-span-12 lg:col-span-9 2xl:col-span-10 box overflow-x-auto relative">
      <!-- BEGIN: Chat Side Menu -->
      <div class="col-span-12 lg:col-span-12 2xl:col-span-12  container  ">
        <div class="intro-y pr-1">
          <div class=" p-2">
            <div class="nav nav-tabs flex-col sm:flex-row justify-center lg:justify-start " role="tablist">
                 <a
                id="transactions-tab"
                data-toggle="tab"
                data-target="#transactions"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center  active"
                role="tab"
                aria-controls="transactions"
                aria-selected="true"
                >Dental Chart</a
              >
              <a
                id="overview-tab"
                data-toggle="tab"
                data-target="#overview"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="overview"
                aria-selected="false"
                >List</a
              >
              <a
                id="payments-tab"
                data-toggle="tab"
                data-target="#payments"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="payments"
                aria-selected="false"
                >
                      <p v-if="translations?.treatment_history">{{translations?.treatment_history}}</p>
                <p v-else>Treatment History</p>
                </a
              >
           
            </div>
          </div>
        </div>

        <span
          v-if="loading"
          class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-20"
        >
          <LoadingIcon icon="puff" class="w-12 h-12 items-center" />
          <span>Please Wait, As We Load your details...</span>
        </span>

        <div v-if="!loading" class="tab-content">
          <div
            id="overview"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
          <NewTreatmentList />
          <!-- <PerioChart /> -->
          </div>
          <!-- start nottification -->
          <div
            id="payments"
            class="tab-pane box"
            role="tabpanel"
            aria-labelledby="payments-tab"
          >
            <div class="pr-1">
              <div class="p-5 mt-5 intro-y col-span-12 overflow-auto lg:overflow-visible">
                 <TreatmentList />
              </div>
            </div>
          </div>
          <div
            id="transactions"
            class="tab-pane  active"
            role="tabpanel"
            aria-labelledby="transactions-tab"
          >
            <div class="pr-1">
              <div class="p-5 mt-5 intro-y col-span-12 overflow-auto lg:overflow-visible">
             <DentalChart />
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
import DentalChart from '../treatments/Chart.vue'
// import PerioChart from '../treatments/periodontal/PeriodontalComponent.vue'

import TreatmentList from "../treatments/TreatmentList.vue";

// import NewTreatmentList from "../treatments/personalTreatments/TreatmentsContainer.vue";
import NewTreatmentList from "../treatments/personalTreatments/TreatmentsContainer.vue";


// import sms from '../communications/Sms.vue'
import $ from 'jquery'
export default defineComponent({
  components: {
    DentalChart,
    // PerioChart,
     TreatmentList,
     NewTreatmentList
  
  },
  data() {
    return {
      loading: false,
      translations : '',
    }
  },
  created() {
    this.getTranslations()
  },
  mounted() {
    setTimeout(() => {
      $.extend(true, $.fn.dataTable.defaults, {
        dom: '<"row view-filter"<"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"<"pull-left"B><"center md:block mx-auto text-slate-500"i><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"lp>>>',
        aaSorting: [[0, 'asc']],
        buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5'
        ]
      })
      $('table.displaycommunicate').DataTable()
    })
  },
  setup() {
    const translations = inject('translation_v3')
    return {
      translations
    }
  },

  methods: {
      getTranslations(){
      this.translations  = JSON.parse(localStorage.getItem('translations'));
      console.log('translate treatment', this.translations)

    },
  }
})
</script>
<style scoped lang="scss">
// .nav.nav-tabs .active {
//     border-color: #FF782E;
//     color: #FF782E;
// }
</style>
