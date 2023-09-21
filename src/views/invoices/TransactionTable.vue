
<template>
<div>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Invoices</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <a
          href="javascript:;"
          data-toggle="modal"
          data-target="#static-backdrop-modal-previews"
          class="btn mr-1 mb-2 bg-theme-32 text-white"
          style="display:none"
          ><PlusIcon />  New invoice</a
        >

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
        <span>We are loading your transactions...</span>
      </span>
      <div v-if="!loading" class="scrollbar-hidden">
        <div id="printMe intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
          <table
            class="
              display
             table table-report sm:mt-2"
            style="
              width: 100%;
              overflow-x: auto;
              white-space: nowrap;
              left: 0;
              right: 0;"
          >
          <thead >
              <tr>
                 <th
                  class="whitespace-nowrap"
                >
                  No.#
                </th>
              
                 <th
                  class="whitespace-nowrap
                  "
                >
                  Invoice Number
                </th>
                <!-- <th
                  class="whitespace-nowrap
                  "
                >
                Type
                </th> -->
                       <th
                  class="whitespace-nowrap
                  "
                >
                 Amount Paid
                </th>
                    <th
                  class="whitespace-nowrap
                  "
                >
                 Total Amount
                </th>
                 <th
                  class="whitespace-nowrap
                  "
                >
                 Status
                </th>
                
                 <th
                  class="whitespace-nowrap
                  "
                >
                  Date Created
                </th>
                 <th
                  class="whitespace-nowrap
                  "
                >
                  Action
                </th>
     
              </tr>
            </thead>
            <tbody v-if="client_invoices">
              <tr
                v-for="invoice in client_invoices"
                :key="invoice.id"
                class="intro-x hover:bg-gray-200 flex-1 zoom-in"
              >
              <td class="whitespace-nowrap " >
                  
                    {{ invoice.id }}
                </td>
                 <td class="whitespace-nowrap ">
                  
                    {{ invoice.invoice_id }}
                </td>
                <td class="whitespace-nowrap">
                  {{ invoice.paidamount}}
                </td>
                 <td class="whitespace-nowrap">
               
                  {{formatSum(invoice.prices)}}
                </td>
                <td class="whitespace-nowrap">
                  <div
                    class="flex"
                    :class="{
                      'text-theme-12': invoice.status  === 'Waiting',
                      'text-theme-9': invoice.status === 'Confirmed',
                      'text-theme-6': invoice.status === 'Closed',
                      'text-grey-100': invoice.status === 'Pending'
                    }"
                  >
                    <AlertCircleIcon
                      v-if="invoice.status.status === 'Waiting'"
                      class="w-4 h-4 mr-2"
                    />
                    <CheckSquareIcon
                      v-if="invoice.status === 'Confirmed'"
                      class="w-4 h-4 mr-2"
                    />
                    <CheckSquareIcon
                      v-if="invoice.status === 'Closed'"
                      class="w-4 h-4 mr-2"
                    />
                    <ThumbsUpIcon
                      v-if="invoice.status === 'Pending'"
                      class="w-4 h-4 mr-2"
                    />
                    Pending
                   <!-- {{invoice.status}} -->
                  </div>
                </td>
               
               <td class="whitespace-nowrap">
                 <span style="display:none" v-if="invoice.created_at">{{invoice.created_at}}</span>{{moment(invoice.created_at).format("DD-MM-YYYY")}} 
                </td>
                <td class="whitespace-nowrap ">
                 <router-link
                    :to="{
                      name: 'side-menu-invoice-details',
                      params: { invoiceId: invoice.id }
                    }"
                  ><a class="flex items-center text-primary whitespace-nowrap mr-5" href="javascript:;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11">
                </path></svg> Open </a></router-link>
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
      client_invoices: [],
      loading: false,
      
  
     
    }
  },

  created() {
    // this.getTransaction()
  },
  computed: {
    currentUser() {
      return toRaw(this.$store.state.auth.user)
    },
    

  },
  mounted() {
   
    this.getTransaction()
  },
  methods: {
    moment,
  
    // Getting All invoices
    getTransaction() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios.post(
            'patients/invoices/transactions/invoice',
            {invoiceId:50},
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
       this.client_invoices,res.data.payload
        )
          this.client_invoices = res.data.payload
        //              var data = this.client_invoices;
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
            btns.addClass('btn  bg-theme-32 btn-sm text-white');
            btns.removeClass('dt-button');
            $('input').addClass('tablesearch');
            
            
          }

            })

            $('.dataTables_empty').text('No invoice yet.')
            
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
