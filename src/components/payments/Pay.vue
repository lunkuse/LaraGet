<template>
  <!-- BEGIN: Modal Content -->
  <!--      :placeholder="`${$t('translation.filter_by_status_text')}`" -->
  <div id="payment-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">
            <p>{{ t('translation.process_payment_text') }}</p>
          </h2>

          <div class="dropdown sm:hidden">
            <a
              class="dropdown-toggle w-5 h-5 block"
              href="javascript:;"
              aria-expanded="false"
            >
              <i
                data-feather="more-horizontal"
                class="w-5 h-5 text-gray-600 dark:text-gray-600"
              ></i>
            </a>
          </div>
        </div>

        <form
          class="validate-form"
          @submit.prevent="handlePayment"
          autocomplete="off"
        >
          <div class="modal-body grid g">
            <!-- Amount -->
            <div class="col-span-12">
              <label for="modal-form-1" class="form-label">
                <p>
                  {{ $t('translation.amount_text') }}
                  <!-- <span class="text-theme-43">(for testing, amount should be lessthan 100)</span> -->
                </p>
              </label>
              <input
                id="amount"
                class="intro-x login__input form-control py-3 px-4 block mt-4 border-gray-200 focus:border-theme-36 focus:ring-0"
                placeholder="6.00"
                v-model.trim="validate.paidAmount.$model"
              />
              <template v-if="seen">
                <div class="text-theme-6 mt-2">
                  <span>
                    <InfoIcon />
                    Your payment should not be greaterthan your due amount({{
                      loanAmount
                    }})
                  </span>
                </div>
              </template>
            </div>

            <!-- Repayment Method -->
            <div class="col-span-12" style="display: none">
              <label for="modal-form-6" class="form-label"
                >payment Method</label
              >
              <TomSelect
                name="repayment_method_id"
                id="modal-form-6"
                class="w-full"
                v-model.trim="validate.repayment_method_id.$model"
                :class="{
                  'border-theme-6': validate.repayment_method_id.$error
                }"
              >
                <option value>Select payment Method</option>
                <!-- <option value="4">Verifone</option> -->
                <option value="1" selected>iDeal</option>
                <option value="2" selected>Credit Card</option>
                <!-- <option value="5">Wire Transfer</option>
                <option value="6">Cheque</option>-->
              </TomSelect>
              <template v-if="validate.repayment_method_id.$error">
                <div
                  v-for="(error, index) in validate.repayment_method_id.$errors"
                  :key="index"
                  class="text-theme-6 mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!--due Date -->
            <div class="col-span-12" style="display: none">
              <label for="modal-form-4" class="form-label"
                >Collection Date</label
              >
              <input
                id="modal-form-4"
                type="text"
                class="form-control"
                v-model="collection_date"
              />
              <!-- <input
                id="modal-form-4"
                type="date"
                class="form-control"
                placeholder="Job, Work, Documentation"
                :class="{
                  'border-theme-6': validate.collection_date.$error
                }"
              />-->
              <!-- <template v-if="validate.collection_date.$error">
                <div
                  v-for="(error, index) in validate.collection_date.$errors"
                  :key="index"
                  class="text-theme-6 mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>-->
            </div>

            <!-- services -->
            <div class="col-span-12" style="display: none">
              <label for="modal-form-5" class="form-label">Services</label>
              <textarea
                id="modal-form-5"
                type="text"
                class="form-control"
                placeholder="services"
                v-model.trim="validate.serviceType.$model"
                :class="{
                  'border-theme-6': validate.serviceType.$error
                }"
                disabled
              />
              <template v-if="validate.serviceType.$error">
                <div
                  v-for="(error, index) in validate.serviceType.$errors"
                  :key="index"
                  class="text-theme-6 mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!-- patient id -->
            <div class="col-span-12 sm:col-span-6" style="display: none">
              <label for="modal-form-5" class="form-label">Patient Id</label>
              <input
                id="patientId"
                type="text"
                class="form-control"
                v-model.trim="validate.patientId.$model"
                :class="{
                  'border-theme-6': validate.patientId.$error
                }"
              />
              <template v-if="validate.patientId.$error">
                <div
                  v-for="(error, index) in validate.patientId.$errors"
                  :key="index"
                  class="text-theme-6 mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <!-- invoice id -->
            <div class="col-span-12 sm:col-span-6" style="display: none">
              <label for="modal-form-5" class="form-label">Invoice Id</label>
              <input
                id="invoiceId"
                type="text"
                class="form-control"
                v-model.trim="validate.invoiceId.$model"
                :class="{
                  'border-theme-6': validate.invoiceId.$error
                }"
              />
              <template v-if="validate.invoiceId.$error">
                <div
                  v-for="(error, index) in validate.invoiceId.$errors"
                  :key="index"
                  class="text-theme-6 mt-2"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>
          </div>
          <!-- END: Modal Body -->
          <!-- Notification Alert Start -->
          <div
            id="basic-non-sticky-notification-content"
            class="toastify-content hidden flex"
          >
            <CheckCircleIcon class="text-theme-9" />
            <div class="ml-4 mr-4">
              <div class="font-medium notification-message"></div>
            </div>
          </div>
          <!-- Notification Alert End -->

          <!-- END: Validation Form -->
          <!-- BEGIN: Success Notification Content -->
          <div
            id="success-notification-content"
            class="toastify-content hidden flex"
          >
            <CheckCircleIcon class="text-theme-9" />
            <div class="ml-4 mr-4">
              <div class="font-medium">SuccessfulPayment</div>
            </div>
          </div>
          <!-- END: Success Notification Content -->
          <!-- BEGIN: Failed Notification Content -->
          <div
            id="failed-notification-content"
            class="toastify-content hidden flex"
          >
            <XCircleIcon class="text-theme-6" />
            <div class="ml-4 mr-4">
              <div class="font-medium">
                {{ $t('translation.payment_failed_text') }}
              </div>
              <div class="text-gray-600 mt-1">
                {{ $t('translation.please_check_the_filled_form_text') }}.
              </div>
            </div>
          </div>
          <!-- END: Failed Notification Content -->

          <!-- BEGIN: Modal Footer -->
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn closeBTN btn-outline-secondary w-20 mr-1"
            >
              <p>{{ $t('translation.cancel_text') }}</p>
            </button>
            <button
              type="submit closeBTN"
              class="btn btn bg-theme-36 text-white w-40 mr-auto"
            >
              <LoadingIcon
                v-if="loading"
                icon="spinning-circles"
                color="white"
                class="w-4 h-4 ml-2"
              />

              <p v-else>
                <span class="text-white">
                  {{ $t('translation.submit_text') }}</span
                >
              </p>
            </button>
          </div>
          <!-- END: Modal Footer -->
        </form>
      </div>
    </div>
  </div>
  <!-- END: Modal Content -->
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import InvoiceService from '../../service/invoices-service'
// Validations
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import moment from 'moment'
import router from '../../router'
import { useI18n } from "vue-i18n"
import $ from 'cash-dom'
export default {
  name: 'loanPaymentModal',
  props: [
    'loanAmount',
    // 'serviceList',
    'patientId',
    'invoiceId',
    'id',
    'loanId',
    'loan'
  ],
  methods: {
    moment
  },
  created() {},
  mounted() {},
  data() {
    // Basic non sticky notification
    const basicNonStickyNotificationToggle = () => {
      Toastify({
        node: $('#basic-non-sticky-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    }

    const formData = reactive({
      paidAmount: '',
      //   repayment_method_id: '',
      //   collection_date: '',
      serviceType: '',
      patientId: '',
      invoiceId: ''
    })
    const rules = {
      paidAmount: {
        required
      },
      repayment_method_id: {},
      //   collection_date: {
      //   },
      serviceType: {
        // required
      },

      patientId: {
        // required
      },
      invoiceId: {
        // required
      }
    }

    const validate = useVuelidate(rules, toRefs(formData))
    const onchange = () => {
      const newamount = document.getElementById('amount').value
      document.getElementById('newamount').value = Number(newamount).toFixed(2)
      document.getElementById('amount').value = Number(newamount).toFixed(2)
    }

    const handlePayment = () => {
      console.log('getting invoices payment made')
      validate.value.$touch()
      if (validate.value.$invalid) {
        Toastify({
          node: $('#failed-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      } else if (
        parseFloat(this.formData.paidAmount) > parseFloat(this.loanAmount)
      ) {
        this.seen = true
        Toastify({
          node: $('#failed-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      } else {
        const token = localStorage.getItem('token')
        this.loading = true
        const data = {
          paidAmount: parseFloat(this.formData.paidAmount),
          // serviceList: this.formData.serviceType,
          patientId: this.formData.patientId,
          invoiceId: this.formData.invoiceId
        }

        try {
          InvoiceService.makePayment(data)
            .then((response) => {
              console.log('response url pay', response.data.url)
              if (response.status === 'SUCCESS') {
               console.log('inside success')
                window.open(response.data.url, '_blank')
                document.querySelector('.closeBTN').click()
               
                router.replace('/dashboard')
              } else {
                this.loading = false
              }

              console.log('response', response)
            })
            .catch((error) => {
              this.loading = false
              console.log('Error', error)
            })
        } catch (err) {
          this.loading = false
          console.log('error: ', err)
        }
      }
    }

    return {
      payment_request_id: '',
      repayment_method_id: '1',
      basicNonStickyNotificationToggle,
      formData,
      validate,
      handlePayment,
      onchange,
      collection_date: moment().format('DD/MM/YYYY'),
      seen: false,
      loading: false
    }
  },
  watch: {
    loanAmount: function () {
      this.formData.paidAmount = this.loanAmount
      // this.formData.serviceType = this.serviceList
      //   this.formData.repayment_method_id = this.repayment_method_id
      //   this.formData.collection_date = moment().format('DD/MM/YYYY')
      this.formData.patientId = this.patientId
      this.formData.invoiceId = this.invoiceId
      this.seen = this.seen
    }
  },
  setup() {
    const { t } = useI18n({})
    return {t}
  }
}
</script>
