<template>
  <div>
    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12 2xl:col-span-6">
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
          <div id="editor"></div>
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0 flex">
            <Button
              :label="`${$t('translation.print_text')}`"
              @click="exportInvoice"
            ></Button>
            <div
              class="max-h-44 flex flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 bg-white"
              v-if="loadingexport"
            >
              <div
                class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                style="margin-top: 13px"
              >
                <div
                  class="flex h-auto gap-2 w-full text-sm text-gray-800 justify-center items-center p-2"
                >
                  <svg
                    class="animate-spin h-6 w-6 text-yellow-650"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FF782E"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-1"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p>
                    {{ $t('translation.printing_text') }}..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="intro-y box overflow-hidden mt-5" id="printMe">
          <div
            class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
          >
            <div class="font-semibold text-theme-36 text-3xl">
              <img alt="Metadent" class="w-20 h-20 font-medium" :src="logo" />
            </div>
            <div class="mt-20 lg:mt-0 lg:ml-auto lg:text-right">
              <div class="text-xl text-primary font-medium">
                {{ settings?.app_name ?? 'Metadent' }}
              </div>
              <div class="mt-1">{{ settings?.phone }}</div>
              <div class="mt-1">{{ settings?.email }}</div>
              <div class="mt-1">{{ settings?.address }}</div>
            </div>
          </div>

          <div
            class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left"
          >
            <div>
              <div class="text-base text-slate-500">
                <p>{{ $t('translation.personal_information_text') }}</p>
              </div>
              <div class="text-lg font-medium text-theme-36 mt-2">
                {{ currentUser.first_name }} {{ currentUser.last_name }}
              </div>
              <div class="mt-1">{{ currentUser.patient_phone }}</div>
              <div class="mt-1">{{ currentUser.email }}.</div>
            </div>
            <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-left">
              <div class="text-base text-slate-500">
                <p>{{ $t('translation.invoice_text') }}</p>
              </div>
              <div class="text-lg text-theme-36 font-medium mt-2">
                {{ invoiceIDs }}
              </div>
              <div class="mt-1">
                {{ moment(client_invoices.created_at).format('DD-MM-YYYY') }}
              </div>
            </div>
          </div>
          <div class="px-5 sm:px-16 py-10 sm:py-20">
            <span
              v-if="loadingservices"
              class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
            >
              <LoadingIcon icon="oval" class="w-10 h-10" />
              <span>
                <p>{{
                                  $t("translation.loading_text")
                                }}</p>
              </span>
            </span>

            <div v-if="!loadingservices" class="overflow-x-auto">
              <table
                class="table table-report sm:mt-2"
                style="width: 100%; left: 0; right: 0"
              >
                <thead>
                  <tr>
                    <th class="border-b-2 dark:border-darkmode-400">
                      <p>{{ $t('translation.services_text') }}</p>
                    </th>
                    <!-- <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">QTY</th> -->
                    <!-- <th class="border-b-2 dark:border-darkmode-400 text-left whitespace-nowrap">PRICE</th> -->
                    <th class="border-b-2 dark:border-darkmode-400 text-left">
                      <p>{{ $t('translation.total_text') }}</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="treatment in client_invoices.treatments"
                    :key="treatment?.id"
                    class="hover:bg-gray-200 flex-1"
                  >
                    <td
                      class="border-b dark:border-darkmode-400 word-wrap"
                      style="word-wrap: break-word"
                    >
                      <div class="dark:text-white">
                        {{ treatment?.treatment }}
                      </div>
                    </td>

                    <td
                      class="text-left border-b dark:border-darkmode-400 w-32 font-medium"
                    >
                      ${{ treatment?.price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row"
          >
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
                >-->
                <button
                  class="btn py-3 px-4 w-full align-top bg-theme-32 text-white"
                  v-if="invoiceStatus === 0 || treatment?.balance_due > 0"
                >
                  <LoadingIcon
                    v-if="loadingbutton"
                    icon="spinning-circles"
                    color="white"
                    class="w-4 h-4 ml-2"
                  />

                  <span v-else>
                    <p class="text-white">
                      {{ $t('translation.make_payment_text') }}
                    </p>
                  </span>
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
            <div
              class="text-center sm:text-right sm:ml-auto"
              v-if="!loadingservices"
            >
              <div class="text-base text-slate-500">
                <p>{{ $t('translation.paid_amount_text') }}</p>
              </div>
              <div class="text-xl text-primary font-medium mt-2">
              $ {{ client_invoices.paidamount
 }}
              </div>
              <div class="text-base text-slate-500">
                <p>{{ $t('translation.amount_due_text') }}</p>
              </div>
              <div class="text-xl text-primary font-medium mt-2">
                $ {{ client_invoices.balance_due }}
              </div>
              <div class="text-base text-slate-500">
                <p>{{ $t('translation.total_amount_text') }}</p>
              </div>
              <div
                style="display: none"
                class="text-xl text-primary font-medium mt-2"
              >
                $ {{ client_invoices.total_with_vat }}
              </div>

              <!-- {{totalPrice}} -->
              <div class="text-xl text-primary font-medium mt-2">
                $ {{ client_invoices.total_with_vat }}
              </div>
              <!-- <div class="mt-1 text-theme-36">
                <span v-if="invoiceStatus===0" class="text-theme-36">Pending</span>
                <span v-if="invoiceStatus===1">Paid</span>
              </div>-->
              <div
                class="flex mt-1"
                :class="{
                  'text-theme-43': invoiceStatus == '0',
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
                  <p>{{ $t('translation.paid_text') }}</p>
                </span>
                <span v-else>
                  <p>{{ $t('translation.pending_text') }}</p>
                </span>
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
          <h2 class="text-lg font-medium mr-auto">
            <p>{{ $t('translation.transactions_text') }}</p>
          </h2>
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <!-- END: Super Large Modal Toggle -->
            <div class="dropdown ml-auto sm:ml-0">
              <div class="dropdown-menu w-40">
                <div
                  class="dropdown-menu__content box dark:bg-dark-1 p-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto relative mt-5">
          <TransactionTable :invoiceID="this.$route.params.invoiceId" />
        </div>
        <!-- END: HTML Table Data -->
      </div>
    </div>
    <Payment
      :loanAmount="client_invoices.balance_due"
      :patientId="currentUser.id"
      :invoiceId="client_invoices.id"
    />

  
  </div>
</template>

<script>
import { defineComponent, toRaw, inject } from 'vue'
// import axios from 'axios'
import axios from '../../axios'
import moment from 'moment'
import Button from '@/components/shared/buttons/Button.vue'
import TransactionTable from './transactions/TransactionContainer.vue'
import Payment from '@/components/payments/Pay.vue'
import logo from '@/assets/images/logos.png';
export default defineComponent({
  components: {
    Payment,
    Button,
    TransactionTable
  },
  data() {
    return {
      loading: false,
      loadingbutton: false,
      loadingexport: false,
      totalPrice: 0,
      client_invoices: [],
      settings: [],

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
      paidamount: '',
      logo: logo,
      ourRequest: null
    }
  },
  setup() {},
  computed: {
    currentUser() {
      // console.log(toRaw(this.$store.state.auth.user))
      return toRaw(this.$store.state.auth.user)
    }
  },
  watch: {
    loadingexport(newloadingexport, oldloadingexport) {
      this.loadingexport = newloadingexport
      console.log('this.loadingexport', this.loadingexport)
    }
  },
  methods: {
    moment,
    async exportInvoice() {
      this.loadingexport = true
      console.log('ne invoice print', this.loadingexport)
      const config = {
        url:
          '/patients/invoices/download-invoice/' +
          `${this.$route.params.invoiceId}`,
        method: 'get',
        responseType: 'blob'
      }

      await axios(config).then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })

        // window.open(URL.createObjectURL(blob)).print();
        let iframe = document.createElement('iframe') //load content in an iframe to print later
        document.body.appendChild(iframe)

        iframe.style.display = 'none'
        iframe.src = URL.createObjectURL(blob)
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
      })
      this.loadingexport = false
    },

    async fetchSettings() {
      this.ourRequest = axios.CancelToken.source()
      await this.$store.dispatch('allinvoices/FetchSettings', {  });
       
           const mysettings =  this.$store?.state?.allinvoices?.systemsettings;
          //  console.log('mysettings', mysettings)
          this.settings = mysettings
          
      // await axios
      //   .get('patients/settings/all', { cancelToken: this.ourRequest.token })
      //   .then((response) => {
      //     this.settings = response?.data?.payload
      //     console.log('settings', this.settings)
      //   })
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
          .map((e) => parseFloat(e))
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

    // Getting All Recent invoices
    getInvoiceDetails() {
      this.loadingservices = true
      const token = localStorage.getItem('token')
      axios
        .post(
          // 'patients/invoices/all',
          'patients/invoices/show',
          { invoiceId: this.$route.params.invoiceId },
          {
            headers: {
              Authorization: 'Bearer ' + token,

              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        .then((res) => {
          this.loadingservices = false
          console.log('getting invoices')
          const all_client_invoices = res.data.payload
          // this.client_invoices = all_client_invoices.filter(
          //   invoiceDetails => invoiceDetails.id == this.$route.params.invoiceId
          // )[0]
          this.client_invoices = res.data.payload
          this.invoiceStatus = this.client_invoices?.status
          this.invoiceDueAmount = this.client_invoices?.balance_due
          this.invoiceIDs = this.client_invoices?.invoice_id

          this.paidamount = this.client_invoices?.paidamount
          console.log('this.paidamount', this.paidamount)
          if (res.data.status === false) {
            console.log('expired session')
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
          }
        })
        .catch((err) => console.log(err))
    }
  },
  created() {
    this.getInvoiceDetails()
    this.fetchSettings()
  },
  setup() {
    return {}
  },
  mounted() {
    this.getInvoiceDetails()
    this.fetchSettings()
  }
})
</script>