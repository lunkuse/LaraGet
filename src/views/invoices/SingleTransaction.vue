<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-12">
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
          <div id="editor"></div>
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button class="btn btn-outline-theme-36 shadow-md mr-2 hover:border-transparent rounded" v-print="'#printMe'">
              
               <p >{{ $t('translation.print_text')}}</p>
              
              </button>
            <!-- <button class="btn btn btn-outline-theme-36 shadow-md mr-2 hover:border-transparent rounded" @click="printPDF()">PDF</button>
            <button class="btn outline-theme-30 shadow-md mr-2 hover:border-transparent rounded" @click="exportHTML()">Word</button> -->
          </div>
        </div>
        <div class="intro-y box overflow-hidden mt-5" id="printMe">
          <div
            class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
          >
            <div class="font-semibold text-theme-36 text-3xl">
              RECEIPT
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
              <div class="text-base text-slate-500">{{ $t('translation.personal_information_text')}}</div>

              <div
                class="text-lg font-medium text-theme-36 mt-2"
              >{{currentUser.first_name}} {{currentUser.last_name}}</div>
              <div class="mt-1">{{currentUser.email}}</div>
              <div class="mt-1">{{currentUser.home_address}}.</div>
            </div>
            <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-left">
              <div class="text-base text-slate-500">Receipt</div>
              <div class="text-lg text-theme-36 font-medium mt-2">{{client_transaction_details.transaction_id}}</div>
              <div class="mt-1">{{moment(client_transaction_details.created_at).format("DD-MM-YYYY")}}</div>
            </div>
          </div>
          <div class="px-5 sm:px-16 py-10 sm:py-20">
            <span
              v-if="loadingservices"
              class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
            >
              <LoadingIcon icon="oval" class="w-10 h-10" />
              <span>{{ $t('translation.loading')}}..</span>
            </span>

            <div v-if="!loadingservices" class="overflow-x-auto">
                <table class="table table-report sm:mt-2"
                   style="
              width: 100%;
              overflow-x: auto;
              white-space: nowrap;
              left: 0;
              right: 0;
            ">
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
                  <tr   v-for="service in client_invoices.services"
                    :key="service.id"
                    class="intro-x hover:bg-gray-200 flex-1 zoom-in">
                    <td class="border-b dark:border-darkmode-400">
                  
                      <div  class=" dark:text-white">{{service.treatment}}</div>
                    </td>
          
                    <td
                      class="text-left border-b dark:border-darkmode-400 w-32 font-medium"
                    >${{service.price}}</td>
                  </tr>
                  
                 
                
                </tbody>
              </table>
            </div>
          </div>
          <div class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
            <div class="text-center sm:text-left mt-10 sm:mt-0">
             

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
              <div class="text-base text-slate-500">{{client_transaction_details.method}}</div>
              {{tr_cardAudience}}
        <!-- <div class="text-lg text-primary font-medium mt-2">{{client_transaction_details.tr_cardLabel}}</div> -->
        <!-- <div class="mt-1" v-if="client_transaction_details.tr_cardLabel">Bank Account : {{client_transaction_details.tr_cardLabel}}</div> -->
              <!-- <div class="mt-1">Code : LFT133243</div> -->
            </div>
            <div class="text-center sm:text-right sm:ml-auto">
                   <div
                style="display:none;"
                class="text-xl text-primary font-medium mt-2"
              >{{client_transaction_details.currency}} {{formatSum(client_invoices.prices)}}</div>
                <div class="text-base text-slate-500">Paid Amount</div>
                <div class="text-xl text-primary font-medium mt-2"
              >{{client_transaction_details.currency}} {{paidAmount}}</div>
              
              <!-- <div class="text-base text-slate-500">Total Amount</div>
           
              <div class="text-xl text-primary font-medium mt-2">${{totalPrice}}</div>-->
              <div class="mt-1 text-theme-36">
               {{client_transaction_details.status}}
              </div> 
              
            </div>
          </div>
        </div>
      </div>

    
    </div>
    <Payment
      :loanAmount="formatSum(client_invoices.prices)"
      :serviceList="servicelist"
      :patientId="currentUser.id"
      :invoiceId="client_invoices.id"
    />
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
      client_transaction_details: [],
      invoiceId: '',
     
      invoiceStatus: '',
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
      transactionID:'',
      paidAmount:'',
      tr_cardAudience:''
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
          this.invoiceIDs = this.client_invoices.invoice_id
          
          console.log('this.invoiceID', this.invoiceIDs)
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
      this.transactionID= this.$route.params.transactionId
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
          const alltransactions = res.data.payload
       this.client_transaction_details = alltransactions.filter(
            element => element.id == this.$route.params.transactionId
          )[0]
          
          this.paidAmount=this.client_transaction_details.amount
          this.tr_cardAudience=client_transaction_details.tr_cardAudience
          console.log("transact det", this.tr_cardAudience)
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