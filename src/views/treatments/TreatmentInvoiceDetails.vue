<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-6">
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
          <div id="editor"></div>
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button class="btn btn-outline-theme-36 shadow-md mr-2 hover:border-transparent rounded" v-print="'#printMe'">Print</button>
            <!-- <button class="btn btn btn-outline-theme-36 shadow-md mr-2 hover:border-transparent rounded" @click="printPDF()">PDF</button>
            <button class="btn outline-theme-30 shadow-md mr-2 hover:border-transparent rounded" @click="exportHTML()">Word</button> -->
          </div>
        </div>
        <div class="intro-y box overflow-hidden mt-5" id="printMe">
          <div
            class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
          >
            <div class="font-semibold text-theme-36 text-3xl">
              INVOICE
            </div>
            <div class="mt-20 lg:mt-0 lg:ml-auto lg:text-right" style="display:none;">
              <div class="text-xl text-primary font-medium">Metadent</div>
              <div class="mt-1">metadent@gmail.com</div>
              <div class="mt-1">8023 Amerige Street Harriman, NY 10926.</div>
            </div>
          </div>
          <div
            class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left"
          >
            <div>
              <div class="text-base text-slate-500">Personal Details</div>

              <div
                class="text-lg font-medium text-theme-36 mt-2"
              >{{currentUser.first_name}} {{currentUser.last_name}}</div>
              <div class="mt-1">{{currentUser.email}}</div>
              <div class="mt-1">{{currentUser.home_address}}.</div>
            </div>
            <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-left">
              <div class="text-base text-slate-500">Invoice</div>
              <div class="text-lg text-theme-36 font-medium mt-2">{{invoiceIDs}}</div>
              <div class="mt-1">{{moment(client_invoices.created_at).format("DD-MM-YYYY")}}</div>
            </div>
          </div>
          <div class="px-5 sm:px-16 py-10 sm:py-20">
            <span
              v-if="loadingservices"
              class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
            >
              <LoadingIcon icon="oval" class="w-10 h-10" />
              <span>{{ $t('translation.loading') }}..</span>
            </span>

            <div v-if="!loadingservices" class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th class="border-b-2 dark:border-darkmode-400 whitespace-nowrap">Services</th>
                    <!-- <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">QTY</th> -->
                    <!-- <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">PRICE</th> -->
                    <th
                      class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap"
                    >Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-b dark:border-darkmode-400">
                      <div
                        class="font-medium whitespace-nowrap"
                        style="display:none;"
                      >{{formatString(client_invoices.services)}}</div>
                      <div v-if="service1" class=" dark:text-white">{{service1}}</div>
                    </td>
                    <!-- <td v-if="service1" class="text-left border-b dark:border-darkmode-400 w-32">1</td> -->
                    <td
                      class="text-left border-b dark:border-darkmode-400 w-32"
                      style="display:none;"
                    >{{formatStringPrice(client_invoices.prices)}}</td>
                    <!-- <td v-if="service1" class="text-left border-b dark:border-darkmode-400 w-32">${{price1}}</td> -->
                    <td
                      v-if="service1"
                      class="text-left border-b dark:border-darkmode-400 w-32 font-medium"
                    >${{price1}}</td>
                  </tr>
                  <tr v-if="service2">
                    <td class="border-b dark:border-darkmode-400 ">
                      <div class="dark:text-white">{{service2}}</div>
                    </td>
                    <!-- <td class="text-left border-b dark:border-darkmode-400 w-32">1</td> -->
                    <!-- <td class="text-left border-b dark:border-darkmode-400 w-32" style="display:none;">{{formatStringPrice(client_invoices.prices)}}</td> -->
                    <!-- <td class="text-left border-b dark:border-darkmode-400 w-32">${{price2}}</td> -->
                    <td
                      class="text-left border-b dark:border-darkmode-400 w-32 font-medium"
                    >${{price2}}</td>
                  </tr>
                  <tr v-if="service3">
                    <td class="border-b dark:border-darkmode-400">
                      <div class="dark:text-white">{{service3}}</div>
                    </td>
                    <!-- <td class="text-left border-b dark:border-darkmode-400 w-32">1</td> -->
                    <!-- <td class="text-left border-b dark:border-darkmode-400 w-32">${{price3}}</td> -->
                    <td
                      class="text-left border-b dark:border-darkmode-400 w-32 font-medium"
                    >${{price3}}</td>
                  </tr>
                  <tr v-if="service4">
                    <td>
                      <div class="dark:text-white">{{service4}}</div>
                    </td>
                    <!-- <td class="text-left w-32">1</td> -->
                    <!-- <td class="text-left w-32">${{price4}}</td> -->
                    <td class="text-left w-32 font-medium">${{price4}}</td>
                  </tr>
                  <tr v-if="service5">
                    <td>
                      <div class="dark:text-white">{{service5}}</div>
                    </td>
                    <!-- <td class="text-left w-32">1</td> -->
                    <!-- <td class="text-left w-32">${{price5}}</td> -->
                    <td class="dark:text-white">${{price5}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
            <div class="text-center sm:text-left mt-10 sm:mt-0">
              <a
                href="javascript:;"
                data-toggle="modal"
                data-target="#payment-modal"
                :disabled="isDisabled"
                @click="makePayment"
              >
                <!-- <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  v-if="invoiceStatus===0 "
                > -->
                <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  v-if="invoiceStatus===0 || invoiceDueAmount>0 "
                >
                
                  <LoadingIcon
                    v-if="loadingbutton"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <p v-else>Make Payment</p>
                </button>
              </a>

              <!-- <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  
                >
                  <LoadingIcon
                    v-if="loading"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else>Make Payment</span>
              </button>-->
              <!-- <div class="text-base text-slate-500">Bank Transfer</div>
        <div class="text-lg text-primary font-medium mt-2">Elon Musk</div>
        <div class="mt-1">Bank Account : 098347234832</div>
              <div class="mt-1">Code : LFT133243</div>-->
            </div>
            <div class="text-center sm:text-right sm:ml-auto" v-if="!loadingservices" >
               <div class="text-base text-slate-500">Paid  Amount</div>
               <div
                class="text-xl text-primary font-medium mt-2"
              >$ {{paidamount}}</div>
              <div class="text-base text-slate-500">Due  Amount</div>
               <div
                class="text-xl text-primary font-medium mt-2"
              >$ {{client_invoices.balance_due}}</div>
              <div class="text-base text-slate-500">Total Amount</div>
              <div
                style="display:none;"
                class="text-xl text-primary font-medium mt-2"
              >$ {{formatSum(client_invoices.prices)}}</div>

              <div class="text-xl text-primary font-medium mt-2">${{totalPrice}}</div>
              <!-- <div class="mt-1 text-theme-36">
                <span v-if="invoiceStatus===0" class="text-theme-36">Pending</span>
                <span v-if="invoiceStatus===1">Paid</span>
              </div> -->
                      <div
                    class="flex mt-1 "
                    :class="{
                      'text-theme-43': invoiceStatus =='0',
                      'text-theme-42': invoiceStatus == '1'
                    }"
                  >
                    <AlertCircleIcon
                     v-if="invoiceStatus == '0'"
                     
                      class="w-4 h-4 mr-2"
                    />
                 
                    <ThumbsUpIcon
                      v-if="invoiceStatus == '1'"
                      class="w-4 h-4 mr-2"
                    />
                    <span v-if="invoiceStatus == '1'">
                   Paid</span>
                    <span v-else>
                   Pending</span>
                  </div>
            </div>
          </div>
        </div>
      </div>

      <!-- column two -->
      <div class="col-span-12 2xl:col-span-6">
        <!-- BEGIN: HTML Table Data -->

        <!-- <div class="intro-y box p-5 mt-5"> -->
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
          <h2 class="text-lg font-medium mr-auto">Transactions</h2>
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <!-- END: Super Large Modal Toggle -->
            <div class="dropdown ml-auto sm:ml-0">
              <div class="dropdown-menu w-40">
                <div class="dropdown-menu__content box dark:bg-dark-1 p-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto relative mt-5">
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
                class="display table table-report sm:mt-2"
                style="
              width: 100%;
              overflow-x: auto;
              white-space: nowrap;
              left: 0;
              right: 0;
            "
              >
                <thead>
                  <tr>
                    <th class="whitespace-nowrap">No.#</th>

                    <th class="whitespace-nowrap">Amount</th>
                    <!-- <th
                  class="whitespace-nowrap
                  "
                >
                Type
                    </th>-->
                    <th class="whitespace-nowrap">Currency</th>
                    <!-- <th class="whitespace-nowrap">Method</th> -->
                    <th class="whitespace-nowrap">Date</th>
                    <th class="whitespace-nowrap">Status</th>
                    <th class="whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody v-if="client_invoices">
                  <tr
                    v-for="invoice in client_invoicestrans"
                    :key="invoice"
                    class="intro-x hover:bg-gray-200 flex-1 zoom-in"
                  >
                    <td class="whitespace-nowrap">{{ invoice.id }}</td>
                    <td class="whitespace-nowrap">{{ invoice.currency}} {{ invoice.amount }}</td>
                    <!-- <td class="whitespace-nowrap">{{ invoice.currency}}</td> -->
                    <td class="whitespace-nowrap">{{invoice.method}}</td>
                    <td
                      class="whitespace-nowrap"
                    >{{moment(invoice.created_at).format("DD-MM-YYYY")}}</td>
  <td class="whitespace-nowrap">
      <div
                    class="flex mt-1 "
                    :class="{
                      'text-theme-44': invoice.status =='open',
                      'text-theme-42': invoice.status == 'paid'
                    }"
                  >
                    <AlertCircleIcon
                     v-if="invoice.status == 'open'"
                     
                      class="w-4 h-4 mr-2"
                    />
                 
                    <ThumbsUpIcon
                      v-if="invoice.status == 'paid'"
                      class="w-4 h-4 mr-2"
                    />
                   {{invoice.status}}
                  </div>
           





  </td>
                    <td class="whitespace-nowrap">
                      <router-link
                    :to="{
                      name: 'side-menu-transaction-details',
                      params: { invoiceId: invoice.invoice_id, transactionId:invoice.id}
                    }"
                      >
                      <a
                        class="flex items-center text-primary whitespace-nowrap mr-5"
                        href="javascript:;"
                      >
                        
                          <a
                        class="flex items-center text-primary whitespace-nowrap mr-5"
                        href="javascript:;"
                      >
                     <EyeIcon class="w-4 h-4 mr-2"/> View
                      </a>
                      </a>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- END: HTML Table Data -->
      </div>
    </div>
    <Payment
      :loanAmount="client_invoices.balance_due"
      :serviceList="servicelist"
      :patientId="currentUser.id"
      :invoiceId="client_invoices.id"
    />
    
     <!-- <Payment
     v-else
     :loanAmount="formatSum(client_invoices.prices)"
      :serviceList="servicelist"
      :patientId="currentUser.id"
      :invoiceId="client_invoices.id"
    /> -->
  </div>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import axios from 'axios'
import moment from 'moment'
import Toastify from 'toastify-js'
import Payment from '@/components/payments/Pay.vue'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
import jsPDF from 'jspdf'

import $ from 'jquery'

export default defineComponent({
  components: {
    Payment
  },
  data() {
    return {
      loading: false,
      loadingbutton: false,
      totalPrice: 0,
      client_invoices: [],
      client_invoicestrans: [],
      invoiceId: '',
      invoiceStatus: '',
      invoiceDueAmount: '',
      service1: '',
      service2: '',
      service3: '',
      service4: '',
      service5: '',
      price1: '',
      price2: '',
      price3: '',
      price4: '',
      price5: '',
      servicelist: '',
      invoiceIDs: '',
      paidamount:''
    }
  },
  setup() {},
  computed: {
    currentUser() {
      // console.log(toRaw(this.$store.state.auth.user))
      return toRaw(this.$store.state.auth.user)
    }
  },
  watch: {},
  methods: {
    moment,
       exportHTML(){
        console.log("word doc")
       var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
       var footer = "</body></html>";
       var sourceHTML = header+document.getElementById("#printMe").innerHTML+footer;
       
       var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
       var fileDownload = document.createElement("a");
       document.body.appendChild(fileDownload);
       fileDownload.href = source;
       fileDownload.download = 'document.doc';
       fileDownload.click();
       document.body.removeChild(fileDownload);
    },
    printPDF() {
        let pdfName = 'test'; 
        const specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};
    const doc = new jsPDF();
     doc.fromHTML($('#printMe').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
    // doc.text("Hello World", 10, 10);
    // doc.html($('#printMe').get(0), 10, 10, {'width': 180});
    // doc.save(pdfName + '.pdf');
    //   console.log("pdf clicked")
    // const printDoc = new jsPDF();
    // printDoc.fromHTML($('#printMe').get(0), 10, 10, {'width': 180});
    // printDoc.autoPrint();
    // printDoc.output("dataurlnewwindow"); // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled
      },
   
    makePayment() {
      console.log('button clicked')
    },
    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },
    // format sum of prices
    formatSum(value) {
      if (value) {
        console.log('price value' + value)
        const array = Number(value)
        let sum = 0

        const total = String(value)
          .split(',')
          .map(e => parseFloat(e))
          .reduce((value, element) => {
            return value + element
          })
        // .toStringAsFixed(1)
        const sum2 = 9
        this.totalPrice = total
        console.log('new total', total)
        //   console.log('array sum',sum )
        return total
      }
    },

    // separate service array
    formatString(value) {
      if (value) {
        const array = Number(value)
        let sum = 0

        const total = String(value).split(',')
        // .toStringAsFixed(1)
        const sum2 = 9

        console.log('new total string', value.trim().split(/,\s*/))
        let name = 'Tapas Adhikary'
        let [service1, service2, service3, service4, service5] = String(
          value
        ).split(',')
        this.service1 = service1
        this.service2 = service2
        this.service3 = service3
        this.service4 = service4
        this.service5 = service5
        console.log('service value', value)
        this.servicelist = value
        //   console.log('array sum',sum )
        return value
      }
    },

    // separate price array
    formatStringPrice(value) {
      if (value) {
        const array = Number(value)
        let sum = 0

        const total = String(value).split(',')
        // .toStringAsFixed(1)
        const sum2 = 9

        console.log('new total string', value.trim().split(/,\s*/))
        let [price1, price2, price3, price4, price5] = String(value).split(',')
        this.price1 = price1
        this.price2 = price2
        this.price3 = price3
        this.price4 = price4
        this.price5 = price5
        console.log('example price', price1, price2, price3, price4)
        //   console.log('array sum',sum )
        return value
      }
    },
    // Getting All Recent invoices
    getInvoiceDetails() {
      this.loadingservices = true
      const token = localStorage.getItem('token')
      axios

        .post(
          'patients/invoices/all',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,

              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then(res => {
          this.loadingservices = false

          const all_client_invoices = res.data.payload
          this.client_invoices = all_client_invoices.filter(
            invoiceDetails => invoiceDetails.id == this.$route.params.invoiceId
          )[0]
          this.invoiceStatus = this.client_invoices.status
          this.invoiceDueAmount= this.client_invoices.balance_due
          this.invoiceIDs = this.client_invoices.invoice_id
          
          this.paidamount = this.client_invoices.paidamount
          console.log('this.paidamount', this.paidamount)
          if (res.data.status === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    },
    // Getting All transactions
    getTransaction() {
      this.loading = true
      const token = localStorage.getItem('token')
      const invoiceID = this.$route.params.invoiceId
      axios
        .post(
          'patients/invoices/transactions/invoice',
          { invoiceId: invoiceID },
          {
            headers: {
              Authorization: 'Bearer ' + token,

              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then(res => {
          this.loading = false
          Object.assign(this.client_invoices, res.data.payload)
          this.client_invoicestrans = res.data.payload
          //              var data = this.client_invoices;
          // for ( var i=0 ; i<8 ; i++ ) {
          //     data.push( [ i, i, i, i, i ] );
          // }
          setTimeout(() => {
            $.extend(true, $.fn.dataTable.defaults, {
              dom:
                '<"row view-filter"<"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"<"pull-left"B><"center md:block mx-auto text-slate-500"i><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"lp>>>',
              aaSorting: [[0, 'asc']],
              order: [[0, 'desc']],
              buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5'],
              scrollX: true,
              initComplete: function() {
                var btns = $('.dt-button');
            btns.addClass('btn  bg-white btn-sm text-white dark:bg-dark-1');
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
            const table = $('table.display').DataTable()

            $('.dataTables_empty').text('No transactions yet yet.')
          })
          if (res.data.success === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    }
  },
  created() {
    this.getInvoiceDetails()
    this.getTransaction()
  },
  mounted() {
    this.getInvoiceDetails()
    this.getTransaction()
  }
})
</script>