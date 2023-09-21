<template>
<div class="intro-y block sm:flex items-center h-10">
<h2 class="text-lg font-medium truncate mr-5">
            <!-- Loan Payment Report -->
              Loan Payment Report for <span id="myspan">{{ selectedyear }}</span>
             </h2>
<div
              class="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 dark:text-gray-300"
            >
              <select id="dYear" class="w-full tom-select"  @change="onchangeyear"><option value="0">Year</option></select></div></div>
              <div
              style="padding-top:15px; margin-top:20px;"
            >
  <Chart
    type="bar"
    :width="width"
    :height="height"
    :data="data"
    :options="options"
  /></div>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from '@/store'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery'
import TomSelect from 'tom-select'

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.getGraphdetails()
    $(function() {
      const option = function(i, j) {
        return $('<option>').append(moment().year() - j)
      }

      const options = (new Array(150) + '').split(',').map(option)

      $('#dYear').append(options)
    })
  },
  mounted() {
    this.getGraphdetails()
  },
  methods: {
    moment,
    onchangeyear() {
      this.selectedyear = document.getElementById('dYear').value
      document.getElementById('myspan').innerHTML = this.selectedyear
      console.log('selected year', this.selectedyear)
      this.getGraphdetailssearch()
    },
    // Getting All Loan Products
    getGraphdetails() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios
        .get('/loan-repayment-graph/' + this.selectedyear, {
          // .get('/loan-repayment-graph', {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
        //   this.data.graphdetails = res.data
          Object.assign(this.data.labels, res.data.labels)
          Object.assign(this.data.datasets[0].data, res.data.expectedAmountPerMonth)
          Object.assign(this.data.datasets[1].data, res.data.actualAmountPerMonth)
          new TomSelect('#dYear', {
            create: true,
            sortField: {
		          field: 'text',
		          direction: 'desc'
            }
          })
          //   this.data.labels = res.data.labels
          // this.loading = false
          //   console.log('graph details', this.graphdetails)
          console.log('graph all data', res.data.actualAmountPerMonth)
        })
        .catch((err) => console.log(err))
    },
    // Getting All Loan Products
    getGraphdetailssearch() {
      this.loading = true
      const token = localStorage.getItem('token')
      axios
        .get('/loan-repayment-graph/' + this.selectedyear, {
        // .get('/loan-repayment-graph', {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
        //   this.data.graphdetails = res.data
          Object.assign(this.data.labels, res.data.labels)
          Object.assign(this.data.datasets[0].data, res.data.expectedAmountPerMonth)
          Object.assign(this.data.datasets[1].data, res.data.actualAmountPerMonth)
          //   this.data.labels = res.data.labels
          // this.loading = false
          //   console.log('graph details', this.graphdetails)
          console.log('graph all data new', res.data.actualAmountPerMonth)
        })
        .catch((err) => console.log(err))
    }
  },
  setup() {
    const store = useStore()
    const darkMode = computed(() => store.state.main.darkMode)
    const data = reactive({
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      datasets: [
        {
          label: 'Expected Payment',
          // data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderWidth: 2,
          borderColor: '#3160D8',
          backgroundColor: '#3160D8',
          pointBorderColor: 'transparent'
        },
        {
          label: 'Actual Payment',
          // data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderWidth: 2,
          borderDash: [2, 2],
          borderColor: '#a0afbf',
          backgroundColor: '#a0afbf',
          pointBorderColor: 'transparent'
        }
      ]
    })

    const options = computed(() => {
      return {
        legend: {
          display: true,
          labels: {
            boxWidth: 50,
            color: 'black',
            font: {
              size: 24,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          cornerRadius: 0,
          caretSize: 0,
          padding: 10,
          backgroundColor: 'black',
          borderColor: 'gray',
          borderWidth: 5,
          titleMarginBottom: 4,
          titleFont: {
            weight: 'bold',
            size: 22
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: '14',
                fontColor: darkMode.value ? '#718096' : '#777777'
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: '12',
                fontColor: darkMode.value ? '#718096' : '#777777',
                callback: function(value) {
                  // return '$' + value
                  return value
                }
              },
              gridLines: {
                color: darkMode.value ? '#718096' : '#D8D8D8',
                zeroLineColor: darkMode.value ? '#718096' : '#D8D8D8',
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: true
              }
            }
          ]
        }
      }
    })

    return {
      data,
      options,
      selectedyear: moment().year()
    }
  }
})
</script>
