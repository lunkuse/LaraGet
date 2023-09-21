
<template>
<div>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Treatments</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
       

        <!-- END: Super Large Modal Toggle -->
        <div class="dropdown ml-auto sm:ml-0">
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
          
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- BEGIN: HTML Table Data -->
  
    <div class="intro-y box p-5 mt-5">
   
      <!-- loader text -->
      <span
        v-if="loading"
        class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
      >
        <LoadingIcon icon="oval" class="w-10 h-10" />
        <span>We are loading your treatments...</span>
      </span>
      <div v-if="!loading" class="scrollbar-hidden">
        <div id="printMe intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
          <table
            class="
              display
             table table-report sm:mt-2
             
            "
            style="
              width: 100%;
              overflow-x: auto;
              white-space: nowrap;
              left: 0;
              right: 0;
            "
          >
          <thead >
              <tr>
                <th
                  class="whitespace-nowrap
                  "
                >
                  No
                </th>
              
                 <th
                  class="whitespace-nowrap
                  "
                >
                  Treatment 
                </th>
             
     
                
                 <th
                  class="whitespace-nowrap
                  "
                >
                  Action
                </th>
     
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="treatment in patient_done_appointments"
                :key="treatment.id"
                class="intro-x hover:bg-gray-200 flex-1 zoom-in"
              >
               <td class="whitespace-nowrap">
               
                  {{formatSum(treatment.id)}}
                </td>
                <td class="whitespace-nowrap">
               
                  {{JSON.parse(treatment.tooth_sections).subject}}
                </td>
             
              
              
                <td class="whitespace-nowrap ">
                 <!-- <router-link
                    :to="{
                      name: 'side-menu-treatment-details',
                      params: { treatmentId: treatment.id }
                    }"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5 hover:underline hover:text-theme-36" href="javascript:;"> -->
                    <EyeIcon class="w-4 h-4 mr-2"/> View
               
                <!-- </a></router-link> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- END: HTML Table Data -->


  </div></div>
</template>

<script>
import { defineComponent, toRaw} from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import moment from 'moment'



// Datatable Modules

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'

import $ from 'jquery'
export default defineComponent({
  components: {
  },

  data() {
   
    
    

    return {
      patient_done_appointments: [],
      loading: false,
      doctorsLists: []
      
  
     
    }
  },

  created() {
    // this.getDoneTreatments()
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    },
    

  },
  mounted() {
   
    this.getDoneTreatments()
    this.fetchDoctors()
  },
  methods: {
    moment,
    DoctorOnDuty(doctorsID){
      if(doctorsID !== null){
      const doctor = this.doctorsLists.filter(
        element => element.id === doctorsID)[0]
        // console.log('doctor', doctor.first_name  + " " +   doctor.last_name)
        const name = doctor.first_name  + " " +   doctor.last_name
        return name
    }},
  fetchDoctors() {
      const token = localStorage.getItem('token')
      axios
        .post(
          '/v2/mails/drs_list',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(response => {
          // console.log(response.data.payload)
          // let emailList = []
          // response.data.payload.forEach(i => {
          //   emailList.push({
          //     first_option: i.first_name,
          //     last_option: i.last_name,
          //     email_option: i.email,
          //     photo_option: i.phone,
          //     mails: i.email
          //   })
          // })
          this.doctorsLists = response.data.payload
        })
        // .catch((error) => console.log(error));
        .catch(function(err) {
          console.log('expired session error new', err.response.status)
          const errorCode = err.response.status
          if (errorCode === 401) {
            console.log('expired session')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.go('/login')
          } else {
            // Handle else
          }
        })
    },
    // Getting All treatments
    getDoneTreatments() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios
      
       .post(
            '/v1/donetreatments/get_done_treatments_by_patient_side',
            {},
            {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
          this.loading = false
          Object.assign(
     this.patient_done_appointments,res.data.payload
      )
          this.patient_done_appointments = res.data.payload
        //              var data = this.patient_done_appointments;
        // for ( var i=0 ; i<8 ; i++ ) {
        //     data.push( [ i, i, i, i, i ] );
        // }
          setTimeout(() => {
            
            const table = $('table.display').DataTable({
              bScrollInfinite: true,
             bScrollCollapse: true,
            deferRender:    true,
            // scrollY:        400,
            scrollCollapse: true,
            scroller:       true,
            columnDefs: [{
            "defaultContent": "-",
            "targets": "_all"
               }],
            // pagingType: 'full_numbers',
            // pageLength: 10,
            // stateSave: true,
              lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
              ],
              processing: true,
              scrollX: true,
              destroy: true,
              dom: '<"row view-filter"<"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"<"pull-left"B><"center md:block mx-auto text-slate-500"i><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"lp>>>',
              aaSorting: [[0, 'desc']],
              responsive: true,
              buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5'
              ],
              initComplete: function () {
            var btns = $('.dt-button');
            btns.addClass('btn  bg-white text-white dark:bg-dark-1');
            btns.removeClass('dt-button');
            var textcolor = $('.dataTables_info');
            textcolor.addClass('text-gray-900 dark:text-white');
            textcolor.removeClass('dataTables_info');
            var textsearch = $('label');
            textsearch.addClass('text-gray-900 dark:text-white');
            var textlink = $('span');
            textlink.addClass('text-gray-900 dark:text-white');
             var textselect = $('select');
            textselect.addClass('text-gray-900 dark:text-white');
            
            
}

            })

            $('.dataTables_empty').text('No treatment yet.')
            
})
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch((err) => console.log(err))
    },
    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },

    // Coverting decimal places of numbers in table
    formatNumber(value) {
      if (value) {
        return parseFloat(value).toLocaleString()
      }
    },
    splitJoin(theText){
      const value = theText.split(',')
      console.log('split text', value)
      	return value
      },
   formatSum(value){
     if (value) {
     

      const total= String(value)
        .split(',')
        .map((e) => parseFloat(e))
        .reduce((value, element)=> {

        return value + element;
        })
// .toStringAsFixed(1)
      const sum2 = 9
 
       console.log('new total',total)
      //   console.log('array sum',sum )
        return total
      }
   }
  }
})
</script>
