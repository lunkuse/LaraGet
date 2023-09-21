<template>
<div>
  <div class="intro-y box overflow-hidden mt-5" id="printMe">
    <div
      class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
    >

      <div class="font-semibold text-theme-36 text-3xl"> INVOICE <PrinterIcon v-print="'#printMe'" /></div>
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
        <div class="text-lg font-medium text-theme-36 mt-2">{{currentUser.first_name}} {{currentUser.last_name}}</div>
        <div class="mt-1">{{currentUser.email}}</div>
        <div class="mt-1">{{currentUser.home_address}}.</div>
      </div>
      <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-left">
        <div class="text-base text-slate-500">Invoice</div>
        <div class="text-lg text-theme-36 font-medium mt-2">{{client_invoices.invoice_id}}</div>
        <div class="mt-1">
            {{moment(client_invoices.created_at).format("DD-MM-YYYY")}}
        </div>

      </div>
    </div>
    <div class="px-5 sm:px-16 py-10 sm:py-20" >
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-darkmode-400 whitespace-nowrap">Services</th>
              <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">QTY</th>
              <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">PRICE</th>
              <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr  >
              <td class="border-b dark:border-darkmode-400">
                <div class="font-medium whitespace-nowrap" style="display:none;">{{formatString(client_invoices.services)}}</div>
                <div v-if="service1" class="font-medium whitespace-nowrap">{{service1}}</div>
              </td>
              <td v-if="service1" class="text-left border-b dark:border-darkmode-400 w-32">1</td>
              <td v-if="service1" class="text-left border-b dark:border-darkmode-400 w-32">${{price1}}</td>
              <td v-if="service1" class="text-left border-b dark:border-darkmode-400 w-32 font-medium">${{price1}}</td>
            </tr>
            <tr  v-if="service2">
              <td class="border-b dark:border-darkmode-400">
                <div class="font-medium whitespace-nowrap">{{service2}}</div>
              </td>
              <td class="text-left border-b dark:border-darkmode-400 w-32">1</td>
              <td class="text-left border-b dark:border-darkmode-400 w-32" style="display:none;">{{formatStringPrice(client_invoices.prices)}}</td>
               <td class="text-left border-b dark:border-darkmode-400 w-32">${{price2}}</td>
              <td class="text-left border-b dark:border-darkmode-400 w-32 font-medium">${{price2}}</td>
            </tr>
            <tr  v-if="service3">
              <td class="border-b dark:border-darkmode-400">
                <div class="font-medium whitespace-nowrap">{{service3}}</div>
              </td>
              <td class="text-left border-b dark:border-darkmode-400 w-32">1</td>
              <td class="text-left border-b dark:border-darkmode-400 w-32">${{price3}}</td>
              <td class="text-left border-b dark:border-darkmode-400 w-32 font-medium">${{price3}}</td>
            </tr>
            <tr  v-if="service4">
              <td>
                <div class="font-medium whitespace-nowrap">{{service4}}</div>
              </td>
              <td class="text-left w-32">1</td>
              <td class="text-left w-32">${{price4}}</td>
              <td class="text-left w-32 font-medium">${{price4}}</td>
            </tr>
            <tr v-if="service5">
                  <td>
                <div  class="font-medium whitespace-nowrap">{{service5}}</div>
              </td>
              <td class="text-left w-32">1</td>
              <td class="text-left w-32">${{price5}}</td>
              <td class="text-left w-32 font-medium">${{price5}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
      <div class="text-center sm:text-left mt-10 sm:mt-0">
        <a href="javascript:;"
                    data-toggle="modal"
                    data-target="#payment-modal"
                    :disabled="isDisabled"
                    @click="makePayment"
                  >
                    <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"

                >
                  <LoadingIcon
                    v-if="loading"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else>Make Payment</span>
                </button></a
                  >

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
                </button> -->
        <!-- <div class="text-base text-slate-500">Bank Transfer</div>
        <div class="text-lg text-primary font-medium mt-2">Elon Musk</div>
        <div class="mt-1">Bank Account : 098347234832</div>
        <div class="mt-1">Code : LFT133243</div> -->
      </div>
      <div class="text-center sm:text-right sm:ml-auto">
        <div class="text-base text-slate-500">Total Amount</div>
        <div class="text-xl text-primary font-medium mt-2">$ {{formatSum(client_invoices.prices)}}</div>
         <div class="mt-1 text-theme-36"><!-- {{invoice.status}} -->
                          	UnPaid</div>
      </div>
    </div>
  </div>
  <Payment :loanAmount="formatSum(client_invoices.prices)" :serviceList="servicelist" :patientId='currentUser.id' :invoiceId='client_invoices.id'/>
  </div>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import axios from 'axios'
import moment from 'moment'
import Toastify from 'toastify-js'
import Payment from '@/components/payments/Pay.vue'


export default defineComponent({
  components: {
    Payment
  },
  data() {
    return {
      loading: false,
      client_invoices: [],
      invoiceId: '',
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
        servicelist: ''


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
   makePayment(){
console.log('button clicked')
 },
    // Converting Date in table
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    },
    // format sum of prices
     formatSum(value){
     if (value) {
      const array  = Number(value);
      let sum = 0;

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
   },

       // separate service array
     formatString(value){
     if (value) {
      const array  = Number(value);
      let sum = 0;

      const total= String(value)
        .split(',')
// .toStringAsFixed(1)
      const sum2 = 9

       console.log('new total string',value.trim().split(/,\s*/))
       let name = 'Tapas Adhikary';
let [service1, service2, service3 , service4, service5] = String(value)
        .split(',');
         this.service1 = service1
        this.service2 = service2
         this.service3 = service3
         this.service4 = service4
         this.service5 = service5
console.log('service value',value);
this.servicelist = value
      //   console.log('array sum',sum )
        return value
      }
   },

          // separate price array
     formatStringPrice(value){
     if (value) {
      const array  = Number(value);
      let sum = 0;

      const total= String(value)
        .split(',')
// .toStringAsFixed(1)
      const sum2 = 9

       console.log('new total string',value.trim().split(/,\s*/))
let [price1, price2, price3 , price4, price5] = String(value)
        .split(',');
         this.price1 = price1
        this.price2 = price2
         this.price3 = price3
         this.price4 = price4
         this.price5 = price5
console.log('example price',price1, price2, price3 , price4);
      //   console.log('array sum',sum )
        return value
      }
   },
        // Getting All Recent invoices
    getInvoiceDetails() {
      this.loading = true
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
          this.loading = false

          const all_client_invoices = res.data.payload
          this.client_invoices = all_client_invoices.filter(
        invoiceDetails => invoiceDetails.id == this.$route.params.invoiceId
      )[0]
 console.log('invoice details', this.client_invoices)
          if (res.data.status === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    },
  },
  created() {
    this.getInvoiceDetails()
// this.invoiceId = this.$route.params.invoiceId
// console.log('invoice id', this.invoiceId )
  },
    mounted() {
    this.getInvoiceDetails()
// this.invoiceId = this.$route.params.invoiceId
// console.log('invoice id', this.invoiceId )
  }
})
</script>
